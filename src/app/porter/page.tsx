'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; 
import { Label } from '@/components/ui/label';
import { FileText, Copy, Lock } from 'lucide-react';

const PRESET_TAGS = ['Projects', 'Thoughts', 'Articles', 'Stories'];

export default function VaultPorter() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Stories']);
  const [manualTag, setManualTag] = useState('');
  const [imageName, setImageName] = useState('');
  const [isPoemMode, setIsPoemMode] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('vault_unlocked') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const masterKey = process.env.NEXT_PUBLIC_VAULT_PASS || 'ashen'; 
    if (passInput === masterKey) {
      setIsAuthenticated(true);
      sessionStorage.setItem('vault_unlocked', 'true');
    } else {
      alert("The Vault remains sealed.");
    }
  };

  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  if (!isAuthenticated && !isLocal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background font-body">
        <div className="w-full max-w-sm p-8 border rounded-2xl shadow-xl bg-card border-primary/10">
          <div className="flex justify-center mb-6"><div className="p-4 rounded-full bg-primary/5 text-primary"><Lock className="h-8 w-8" /></div></div>
          <h1 className="text-2xl font-headline font-bold text-center mb-2">The Vault is Sealed</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Enter password..." autoFocus className="w-full p-4 border rounded-lg bg-background border-primary/20 outline-none text-center" onChange={(e) => setPassInput(e.target.value)} />
            <Button type="submit" className="w-full py-6 font-bold uppercase tracking-widest">Unlock</Button>
          </form>
        </div>
      </div>
    );
  }

  const processFormatting = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>');
  };

  const generateCode = () => {
    const id = Date.now().toString();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const formattedContent = processFormatting(content).replace(/\n/g, '<br />');
    const contentBlock = isPoemMode 
      ? `    <p className="whitespace-pre-line italic text-center font-serif py-6 leading-loose">\\n      ${formattedContent}\\n    </p>`
      : `    <p className="whitespace-pre-line">\\n      ${formattedContent}\\n    </p>`;

    const code = `{
  id: '${id}',
  slug: '${slug}',
  title: '${title}',
  date: '${new Date().toISOString().split('T')[0]}',
  tags: ${JSON.stringify([...selectedTags, manualTag].filter(Boolean))},
  featured: false,
  image: '${imageName ? `/${imageName}` : `/${slug}.jpg`}',
  imageDescription: '${title}',
  content: \`
${contentBlock}
  \`,
},`;

    navigator.clipboard.writeText(code);
    alert("Vault Object Copied!");
  };

  return (
    <div className="container mx-auto max-w-2xl p-6 font-body pb-32 print:p-0">
      <header className="mb-10 flex justify-between items-end border-b border-primary/10 pb-6 print:hidden">
        <div>
          <h1 className="text-3xl font-headline font-bold">Vault Porter</h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1 italic">Logged in as Ashen</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2 border-primary/20 shadow-sm">
          <FileText className="h-4 w-4" /> Archive PDF
        </Button>
      </header>
      
      <div className="space-y-8 print:hidden">
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold text-primary/60">Title</label>
          <input className="w-full p-4 border rounded-lg bg-background border-primary/20 outline-none focus:border-primary transition-colors" placeholder="Midnight Title..." onChange={(e) => setTitle(e.target.value)} />
        </div>
        
        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold text-primary/60">Categories</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_TAGS.map(tag => (
              <Button key={tag} variant={selectedTags.includes(tag) ? 'default' : 'outline'} onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])} className="rounded-full h-8 text-xs">{tag}</Button>
            ))}
          </div>
          <input placeholder="Add a custom tag..." className="w-full p-2 border-b bg-transparent outline-none text-sm border-primary/10 focus:border-primary" onChange={(e) => setManualTag(e.target.value)} />
        </div>

        <div>
          <label className="block mb-2 text-xs uppercase tracking-widest font-bold text-primary/60">Image Filename (Optional)</label>
          <input className="w-full p-4 border rounded-lg bg-background border-primary/20 outline-none focus:border-primary text-sm" placeholder="e.g. cover-art.jpg (points to /public)" onChange={(e) => setImageName(e.target.value)} />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs uppercase tracking-widest font-bold text-primary/60">Content</label>
            <div className="flex items-center space-x-3 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Label htmlFor="poem-mode" className="text-[10px] font-bold uppercase tracking-widest">Poem Mode Styling</Label>
              <Switch id="poem-mode" onCheckedChange={(val) => setIsPoemMode(val)} />
            </div>
          </div>
          <textarea className="w-full h-80 p-4 border rounded-lg bg-background border-primary/20 leading-relaxed outline-none focus:border-primary transition-colors" placeholder="One enter for a new line..." onChange={(e) => setContent(e.target.value)} />
          {/* RESTORED FORMATTING NOTES */}
          <p className="mt-2 text-[10px] text-muted-foreground uppercase tracking-tight">
            Use **<b>bold</b>**, *<i>italic</i>*, and single-enter for new lines.
          </p>
        </div>

        <Button className="w-full py-8 text-xl font-bold shadow-xl gap-2 bg-primary text-primary-white" onClick={generateCode}>
          <Copy className="h-6 w-6" /> Copy for data.ts
        </Button>
      </div>

      <div className="mt-16 print:mt-0">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center print:hidden underline underline-offset-8 decoration-primary/20">Live Vault Preview</h2>
        <div className="p-12 border rounded-2xl bg-white text-black dark:bg-zinc-950 dark:text-white min-h-[500px] shadow-sm print:border-none print:shadow-none print:p-0">
          <h1 className="font-headline text-4xl font-bold mb-4">{title || 'A Fragment of Time'}</h1>
          <p className="text-xs uppercase tracking-widest text-primary mb-8">{new Date().toLocaleDateString('en-GB')}</p>
          <div className={`mb-12 ${isPoemMode ? 'text-center italic font-serif py-10 leading-loose' : 'leading-relaxed'}`}>
            <p className="whitespace-pre-line text-lg" dangerouslySetInnerHTML={{ __html: processFormatting(content).replace(/\n/g, '<br />') }} />
          </div>
          <div className="mt-20 pt-8 border-t border-primary/10 text-center">
             <p className="font-headline text-sm font-bold tracking-widest opacity-40 uppercase">Radhesh "Ashen" Everwrite</p>
             <p className="text-[10px] uppercase tracking-tighter opacity-30 mt-1 italic">Retrieved from the Vault</p>
          </div>
        </div>
      </div>
    </div>
  );
}