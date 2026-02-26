import Link from 'next/link';
import { Github, Linkedin, Twitter, Feather } from 'lucide-react';
import { Button } from './ui/button';

export function SiteFooter() {
  return (
    <footer className="border-t mt-16 py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
             <div className="flex items-center justify-center p-2 rounded-lg bg-primary text-primary-foreground">
                <Feather className="h-6 w-6" />
            </div>
            <span className="font-headline text-xl font-bold">
              Radhesh "Ashen" Everwrite
            </span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Github">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Radhesh "Ashen" Everwrite. All rights reserved.</p>
            <p className="mt-2">A place for projects, thoughts, and stories by an aspiring author.</p>
        </div>
      </div>
    </footer>
  );
}
