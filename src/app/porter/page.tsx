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
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');

  // Check if already authenticated in this session
  useEffect(() => {
    if (sessionStorage.getItem('vault_unlocked') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Your password is 'ashen' (change this string if you want something else)
    if (passInput === 'ashen') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vault_unlocked', 'true');
    } else {
      alert("The Vault remains sealed.");
    }
  };

  // Skip password on localhost for faster development
  const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const showLogin = !isAuthenticated && !isLocal;

  if (showLogin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background font-body">
        <div className="w-full max-w-sm p-8 border rounded-2xl shadow-xl bg-card border-primary/10">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/5 text-primary">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-2xl font-headline font-bold text-center mb-2">The Vault is Sealed</h1>
          <p className="text-muted-foreground text-center text-sm mb-8">Identify yourself to wake the Porter.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Enter password..."
              autoFocus
              className="w-full p-4 border rounded-lg bg-background border-primary/20 outline-none focus:border-primary text-center"
              onChange={(e) => setPassInput(e.target.value)}
            />
            <Button type="submit" className="w-full py-6 font-bold uppercase tracking-widest">
              Unlock
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- LOGIC FOR FORMATTING & ARCHIVING ---
  const processFormatting = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>');
  };

  const generateCode = () => {
    const id = Date.now().toString();
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const formattedContent = processFormatting(content).replace(/\n/g, '<br />');
    
    const contentBlock = isPoemMode 
      ? `    <p className="whitespace-pre-line italic text-center font-serif py-6 leading-loose">\n      ${formattedContent}\n    </p>`
      : `    <p className="whitespace-pre-line">\n      ${formattedContent}\n    </p>`;

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
          <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">Logged in as Ashen</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2 border-primary/20">
          <FileText className="h-4 w-4" /> Archive PDF
        </Button>
      </header>
      
      <div className="space-y-8 print:hidden">
        {/* Title & Tags Inputs */}
        <input className="w-full p-4 border rounded-lg bg-background border-primary/20 outline-none" placeholder="Midnight Title..." onChange={(e) => setTitle(e.target.value)} />
        
        <div className="flex flex-wrap gap-2">
          {PRESET_TAGS.map(tag => (
            <Button key={tag} variant={selectedTags.includes(tag) ? 'default' : 'outline'} onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])} className="rounded-full h-8 text-xs">{tag}</Button>
          ))}
        </div>

        <div className="flex items-center justify-between bg-primary/5 p-4 rounded-lg border border-primary/10">
          <Label htmlFor="poem-mode" className="text-xs font-bold uppercase tracking-widest">Poem Mode Styling</Label>
          <Switch id="poem-mode" onCheckedChange={(val) => setIsPoemMode(val)} />
        </div>

        <textarea className="w-full h-64 p-4 border rounded-lg bg-background border-primary/20 leading-relaxed outline-none" placeholder="Pour your thoughts..." onChange={(e) => setContent(e.target.value)} />

        <Button className="w-full py-8 text-xl font-bold shadow-xl gap-2" onClick={generateCode}>
          <Copy className="h-6 w-6" /> Copy for data.ts
        </Button>
      </div>

      {/* --- LIVE PREVIEW AREA (This is what becomes the PDF) --- */}
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