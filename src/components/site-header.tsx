'use client';

import Link from 'next/link';
import { Feather, Menu, X, Tags, Projector, MessageSquareText, Newspaper, BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';
import { getAllTags, type Tag } from '@/lib/data';


export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  const tagIcons: Record<Tag, React.ElementType> = {
    Projects: Projector,
    Thoughts: MessageSquareText,
    Articles: Newspaper,
    Stories: BookOpen,
  };
  const tags = getAllTags();

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={cn('transition-all duration-300', scrolled ? 'py-2' : 'py-4')}>
        <div
          className={cn(
            'container flex h-16 items-center transition-all duration-300',
            scrolled ? 'max-w-5xl rounded-full border bg-background/80 shadow-lg backdrop-blur-sm' : ''
          )}
        >
          <Link href="/" className="flex items-center gap-2 mr-6">
              <div className="flex items-center justify-center p-2 rounded-lg bg-primary text-primary-foreground">
                  <Feather className="h-6 w-6" />
              </div>
              <span className="font-headline text-xl font-bold hidden sm:inline-block">
                Radhesh "Ashen" Everwrite
              </span>
          </Link>
          
          <MainNav />

          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b p-4">
                    <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
                      <Feather className="h-6 w-6 text-primary" />
                      <span className="font-headline text-xl font-bold">Radhesh "Ashen" Everwrite</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <nav className="flex flex-col space-y-2 p-4 mt-4 flex-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'text-lg font-medium rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                          pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t my-4"></div>
                    <h4 className="px-2 font-medium text-muted-foreground">Categories</h4>
                    <Link
                        href="/tags"
                        className={cn(
                            'flex items-center gap-3 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground',
                            pathname === '/tags' && 'bg-accent text-accent-foreground'
                        )}
                    >
                        <Tags className="h-5 w-5" />
                        <span className="text-base font-medium">All Tags</span>
                    </Link>
                    {tags.map((tag) => {
                        const TagIcon = tagIcons[tag] || Feather;
                        const href = `/tags/${tag.toLowerCase()}`;
                        return (
                            <Link
                                key={tag}
                                href={href}
                                className={cn(
                                    'flex items-center gap-3 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground',
                                    pathname === href && 'bg-accent text-accent-foreground'
                                )}
                            >
                                <TagIcon className="h-5 w-5" />
                                <span className="text-base font-medium">{tag}</span>
                            </Link>
                        )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
