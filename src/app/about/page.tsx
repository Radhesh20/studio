import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Instagram } from 'lucide-react';

export const metadata: Metadata = {
  title: "About the Author | Radhesh \"Ashen\" Everwrite",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="py-12 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          About the Author
        </h1>
      </header>
      <main className="prose dark:prose-invert max-w-none mx-auto lg:prose-lg font-body prose-headings:font-headline">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/3">
                <Image
                    src="/radhesh-portrait.jpg" 
                    alt="Portrait of Radhesh Kumar"
                    width={400}
                    height={400}
                    className="rounded-full aspect-square object-cover shadow-lg mx-auto"
                    priority
                />
            </div>
            <div className="md:w-2/3">
                <p className="lead">
                Hello, I'm <strong>Radhesh Kumar</strong>. I am a Computer Science student and the co-founder of <strong>SCAPLET</strong>. Under the pen name <strong>Ashen Everwrite</strong>, I chronicle the stories that emerge from the intersection of technology and fiction.
                </p>
                <div className="mt-6 flex justify-center md:justify-start gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://github.com/Radhesh20" target="_blank" rel="noopener noreferrer" aria-label="Github">
                            <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.linkedin.com/in/radheshkumarkm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <Link href="https://www.instagram.com/rxdhssh__" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        
        <h2>My Journey</h2>
        <p>
          I picked up my first pen in the fifth grade. I didn’t do it just to tell a story; I did it to build a sanctuary.</p>
        <p>
          For me, writing has never been a hobby. It is a survival mechanism. The characters I create and the universes I map out are the only places where I retain absolute control. Every other move I make in the real world is purely designed to fund, protect, and eventually unleash this literary universe.           
        </p>
        <h2>The Mission of This Vault</h2>
        <p>
          This site as I call, <strong>The Rad's Vault</strong> is more than just a portfolio; it's a stockpile of ideas. Whether I'm documenting my new project or sharing a chapter of a new story, my goal is to provide an open invitation for connection with fellow developers and readers alike. 
        </p>
      </main>
    </div>
  );
}