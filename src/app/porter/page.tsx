'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const PRESET_TAGS = ['Projects', 'Thoughts', 'Articles', 'Stories'];

export default function VaultPorter() {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && !window.location.search.includes('key=ashen')) {
    return <div className="p-20 text-center">Unauthorized. Move along.</div>;
  }
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Stories']);
  const [manualTag, setManualTag] = useState('');
  const [imageName, setImageName] = useState('');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const formatContentForPreview = (raw: string) => {
    return raw.split('\n\n').filter(p => p.trim()).map((p, i) => {
      let formatted = p.trim()
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>');

      if (p.includes('\n')) {
        return (
          <p key={i} className="whitespace-pre-line italic text-center font-serif py-4 leading-loose opacity-80" 
             dangerouslySetInnerHTML={{ __html: formatted.replace(/\n/g, '<br />') }} />
        );
      }
      return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  const generateCode = () => {
    const id = Date.now().toString();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const date = new Date().toISOString().split('T')[0];
    const finalTags = manualTag ? [...selectedTags, manualTag] : selectedTags;
    const finalImage = imageName ? `/${imageName}` : `/${slug}.jpg`;

    const processedContent = content
      .split('\n\n')
      .filter(p => p.trim())
      .map(p => {
        let formatted = p.trim()
          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
          .replace(/\*(.*?)\*/g, '<i>$1</i>');

        if (p.includes('\n')) {
          return `    <p className="whitespace-pre-line italic text-center font-serif py-4 leading-loose">\n      ${formatted.replace(/\n/g, '<br />')}\n    </p>`;
        }
        return `    <p>${formatted}</p>`;
      })
      .join('\n');

    const code = `{
  id: '${id}',
  slug: '${slug}',
  title: '${title}',
  date: '${date}',
  tags: ${JSON.stringify(finalTags)},
  featured: false,
  image: '${finalImage}',
  imageDescription: '${title}',
  content: \`
${processedContent}
  \`,
},`;

    navigator.clipboard.writeText(code);
    alert(`Code Copied! Save your image as "${finalImage.replace('/', '')}" in the public folder.`);
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 font-body pb-32">
      <h1 className="text-3xl font-headline font-bold mb-8">Vault Porter</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-bold">Title</label>
          <input 
            className="w-full p-4 border rounded-lg bg-background border-primary/20"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold">Categories</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {PRESET_TAGS.map(tag => (
              <Button 
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'} 
                onClick={() => toggleTag(tag)}
                className="rounded-full"
              >{tag}</Button>
            ))}
          </div>
          <input 
            placeholder="Add manual tag..."
            className="w-full p-2 border-b bg-transparent outline-none text-sm"
            onChange={(e) => setManualTag(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold">Image Filename (Optional)</label>
          <input 
            placeholder="e.g. blog-hero.jpg"
            className="w-full p-4 border rounded-lg bg-background border-primary/20"
            onChange={(e) => setImageName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-bold">Content (**bold**, *italic*, single-enter for poems)</label>
          <textarea 
            className="w-full h-64 p-4 border rounded-lg bg-background border-primary/20 leading-relaxed"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Button className="w-full py-8 text-xl font-bold shadow-lg" onClick={generateCode}>
          Clean & Copy Object
        </Button>

        {/* --- PREVIEW --- */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Live Preview</h2>
          <div className="p-6 border rounded-xl bg-muted/30 min-h-[200px] prose dark:prose-invert max-w-none">
            <h1 className="font-headline text-2xl font-bold mb-4">{title || 'Your Title'}</h1>
            <div className="flex gap-2 mb-6">
              {[...selectedTags, manualTag].filter(Boolean).map(t => (
                <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">#{t}</span>
              ))}
            </div>
            {content ? formatContentForPreview(content) : <p className="text-muted-foreground italic">Waiting for your thoughts...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}