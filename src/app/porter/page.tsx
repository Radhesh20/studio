'use client';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import html2pdf from 'html2pdf.js'; // You'll need: npm install html2pdf.js

const PRESET_TAGS = ['Projects', 'Thoughts', 'Articles', 'Stories'];

export default function VaultPorter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageName, setImageName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Thoughts']);
  const [manualTag, setManualTag] = useState('');
  const [isPoem, setIsPoem] = useState(false);
  
  const previewRef = useRef(null);

  // 1. Security: Simple Password
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const masterKey = process.env.NEXT_PUBLIC_VAULT_PASS; 
    if (passInput === masterKey) {
      setIsAuthenticated(true);
    } else {
      alert("The Vault remains sealed.");
    }
  };

  // 2. Content Processor
  const processContent = (text: string) => {
    let formatted = text.trim()
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>');

    if (isPoem) {
      return `<p className="whitespace-pre-line italic text-center font-serif py-6 leading-loose">\n  ${formatted.replace(/\n/g, '<br />')}\n</p>`;
    }
    return formatted.split('\n').filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join('\n');
  };

  const generateCode = () => {
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const finalImage = imageName ? `/${imageName}` : `/${slug}.jpg`;
    const finalTags = manualTag ? [...selectedTags, manualTag] : selectedTags;

    const code = `{
  id: '${Date.now()}',
  slug: '${slug}',
  title: '${title}',
  date: '${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}',
  tags: ${JSON.stringify(finalTags)},
  featured: false,
  image: '${finalImage}',
  imageDescription: '${title}',
  content: \`
${processContent(content)}
  \`,
},`;

    navigator.clipboard.writeText(code);
    alert('Code copied for data.ts!');
  };

  // 3. PDF Export
  const downloadPDF = () => {
    const element = previewRef.current;
    const opt = {
      margin: 1,
      filename: `${title || 'midnight-thought'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter Master Key"
            className="p-3 border rounded-lg bg-background"
            onChange={(e) => setPassInput(e.target.value)}
          />
          <Button type="submit" className="w-full">Unlock Vault</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 font-body pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-headline font-bold">Vault Porter</h1>
        <Button variant="outline" onClick={downloadPDF}>Archive PDF</Button>
      </div>

      <input 
        placeholder="Your Title..."
        className="w-full p-4 mb-4 border rounded-lg bg-background"
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        {PRESET_TAGS.map(tag => (
          <Button 
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'} 
            onClick={() => setSelectedTags([tag])}
            className="rounded-full"
          >{tag}</Button>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg mb-4 bg-muted/20">
        <span className="text-sm font-bold uppercase tracking-wider">Poem Mode Styling</span>
        <Switch checked={isPoem} onCheckedChange={setIsPoem} />
      </div>

      <input 
        placeholder="Image Filename (e.g., cover.png)"
        className="w-full p-4 mb-4 border rounded-lg bg-background"
        onChange={(e) => setImageName(e.target.value)}
      />

      <textarea 
        placeholder="Pour your thoughts..."
        className="w-full h-64 p-4 mb-6 border rounded-lg bg-background"
        onChange={(e) => setContent(e.target.value)}
      />

      <Button className="w-full py-8 text-xl font-bold mb-10" onClick={generateCode}>
        Copy for data.ts
      </Button>

      {/* LIVE PREVIEW AREA */}
      <div className="border-t pt-10">
        <h2 className="text-sm font-bold opacity-50 mb-4 uppercase">Live Preview</h2>
        <div 
          ref={previewRef}
          className="p-8 border rounded-xl bg-card shadow-sm min-h-[400px]"
        >
          <h1 className="text-4xl font-headline font-bold mb-2">{title || "Title"}</h1>
          <p className="text-sm opacity-60 mb-8">{new Date().toDateString()}</p>
          
          <div 
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: processContent(content) }} 
          />
          
          <footer className="mt-20 pt-4 border-t text-xs opacity-40 text-center italic">
            Captured by Radhesh Kumar — Ashen Everwrite
          </footer>
        </div>
      </div>
    </div>
  );
}