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
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        
        <h2>My Journey</h2>
        <p>
          My professional journey is rooted in Computer Science and entrepreneurship. As a co-founder of <strong>SCAPLET</strong>, I focus on delivering high-quality web and app development services, bridging the gap between complex code and user-focused digital marketing solutions.
        </p>
        <p>
          Beyond the terminal, I am a storyteller. I have a deep passion for writing novels and developing screenplays for short, story-based indie games. This "Vault" is where these two worlds coexist—a personal archive of my technical builds and my fictional musings as Ashen Everwrite.
        </p>
        <h2>The Mission of This Vault</h2>
        <p>
          <strong>The Rad's Vault</strong> is more than just a portfolio; it's a stockpile of ideas. Whether I'm documenting a new project at SCAPLET or sharing a chapter of a new story, my goal is to provide an open invitation for connection with fellow developers and readers alike. 
        </p>
      </main>
    </div>
  );
}