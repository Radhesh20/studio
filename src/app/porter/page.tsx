'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const PRESET_TAGS = ['Projects', 'Thoughts', 'Articles', 'Stories'];

export default function VaultPorter() {
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

  const generateCode = () => {
    const id = Date.now().toString();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const date = new Date().toISOString().split('T')[0];
    const finalTags = manualTag ? [...selectedTags, manualTag] : selectedTags;
    const finalImage = imageName ? `/${imageName}` : `/${slug}.jpg`;

    // Smarter content processing (The Janitor)
    const processedContent = content
      .split('\n\n') // Paragraph break
      .filter(p => p.trim())
      .map(p => {
        let formatted = p.trim()
          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
          .replace(/\*(.*?)\*/g, '<i>$1</i>');

        // Poem detection: If the paragraph contains single line breaks
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
    alert(`Formatted for the Vault! 
1. Paste into data.ts.
2. Ensure image is in /public as "${finalImage.replace('/', '')}"`);
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 font-body pb-20">
      <h1 className="text-3xl font-headline font-bold mb-8">Vault Porter</h1>
      
      <label className="block mb-2 text-sm font-bold">Title</label>
      <input 
        placeholder="Midnight Musings..."
        className="w-full p-4 mb-6 border rounded-lg bg-background border-primary/20"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="block mb-2 text-sm font-bold">Categories</label>
      <div className="flex flex-wrap gap-2 mb-4">
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
        className="w-full p-2 mb-6 border-b bg-transparent outline-none"
        onChange={(e) => setManualTag(e.target.value)}
      />

      <label className="block mb-2 text-sm font-bold">Image Filename</label>
      <input 
        placeholder="e.g. cover.jpg"
        className="w-full p-4 mb-6 border rounded-lg bg-background border-primary/20"
        onChange={(e) => setImageName(e.target.value)}
      />

      <label className="block mb-2 text-sm font-bold">Content (**bold**, *italic*, single-enter for poems)</label>
      <textarea 
        placeholder="Write your heart out..."
        className="w-full h-80 p-4 mb-6 border rounded-lg bg-background border-primary/20 leading-relaxed"
        onChange={(e) => setContent(e.target.value)}
      />

      <Button className="w-full py-8 text-xl font-bold shadow-lg" onClick={generateCode}>
        Clean & Copy Object
      </Button>
    </div>
  );
}