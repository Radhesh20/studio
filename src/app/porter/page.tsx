'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; // Ensure you have this shadcn component or use a checkbox
import { Label } from '@/components/ui/label';

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
  const [isPoemMode, setIsPoemMode] = useState(false);

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

      if (isPoemMode) {
        return (
          <p key={i} className="whitespace-pre-line italic text-center font-serif py-6 leading-loose opacity-90" 
             dangerouslySetInnerHTML={{ __html: formatted.replace(/\n/g, '<br />') }} />
        );
      }
      return <p key={i} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted.replace(/\n/g, ' ') }} />;
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

        if (isPoemMode) {
          return `    <p className="whitespace-pre-line italic text-center font-serif py-6 leading-loose">\n      ${formatted.replace(/\n/g, '<br />')}\n    </p>`;
        }
        return `    <p>${formatted.replace(/\n/g, ' ')}</p>`;
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
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-headline font-bold">Vault Porter</h1>
        <p className="text-muted-foreground text-sm">The digital janitor for your midnight thoughts.</p>
      </header>
      
      <div className="space-y-8">
        {/* Title Input */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold">Title</label>
          <input 
            className="w-full p-4 border rounded-lg bg-background border-primary/20 focus:ring-2 ring-primary/10 outline-none"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Midnight Musings..."
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold">Categories</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_TAGS.map(tag => (
              <Button 
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'} 
                onClick={() => toggleTag(tag)}
                className="rounded-full h-8 text-xs"
              >{tag}</Button>
            ))}
          </div>
          <input 
            placeholder="Custom tag..."
            className="w-full p-2 border-b bg-transparent outline-none text-sm"
            onChange={(e) => setManualTag(e.target.value)}
          />
        </div>

        {/* Image Filename */}
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold">Image Name</label>
          <input 
            placeholder="e.g. city-lights.jpg"
            className="w-full p-4 border rounded-lg bg-background border-primary/20 text-sm"
            onChange={(e) => setImageName(e.target.value)}
          />
        </div>

        {/* Content & Toggle */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-widest font-bold">Content</label>
            <div className="flex items-center space-x-2">
              <Label htmlFor="poem-mode" className="text-[10px] font-bold uppercase tracking-tighter">Poem Mode</Label>
              <Switch id="poem-mode" onCheckedChange={(val) => setIsPoemMode(val)} />
            </div>
          </div>
          <textarea 
            className="w-full h-80 p-4 border rounded-lg bg-background border-primary/20 leading-relaxed font-serif italic text-lg"
            placeholder="Pour your thoughts here..."
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="mt-2 text-[10px] text-muted-foreground">Use **bold** for emphasis and *italics* for style. Double enter for new paragraphs.</p>
        </div>

        <Button className="w-full py-8 text-xl font-bold shadow-xl hover:scale-[1.01] transition-transform" onClick={generateCode}>
          Clean & Copy Object
        </Button>

        {/* --- LIVE PREVIEW --- */}
        <div className="mt-16 border-t border-primary/10 pt-10">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">Live Vault Preview</h2>
          <div className="p-8 border rounded-2xl bg-muted/20 min-h-[300px] prose dark:prose-invert max-w-none shadow-inner">
            <h1 className="font-headline text-3xl font-bold mb-4">{title || 'A Silent Whisper'}</h1>
            <div className="flex gap-2 mb-8">
              {[...selectedTags, manualTag].filter(Boolean).map(t => (
                <span key={t} className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/5">
                  #{t}
                </span>
              ))}
            </div>
            <div className="border-l-2 border-primary/10 pl-6">
              {content ? formatContentForPreview(content) : <p className="text-muted-foreground italic">Waiting for the spark...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}