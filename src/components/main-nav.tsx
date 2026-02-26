'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getAllTags, type Tag } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ChevronDown, Tags, Feather, Projector, MessageSquareText, Newspaper, BookOpen } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

const tagIcons: Record<Tag, React.ElementType> = {
    Projects: Projector,
    Thoughts: MessageSquareText,
    Articles: Newspaper,
    Stories: BookOpen,
};

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const tags = getAllTags();

  return (
    <nav className={cn('hidden md:flex items-center space-x-1', className)}>
      {navItems.map((item) => (
        <Button key={item.href} variant="ghost" asChild>
          <Link
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            {item.label}
          </Link>
        </Button>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:text-primary">
            Categories
            <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem asChild>
             <Link href="/tags" className="w-full">
                <Tags className="mr-2 h-4 w-4" />
                <span>All Tags</span>
              </Link>
          </DropdownMenuItem>
          {tags.map((tag) => {
            const TagIcon = tagIcons[tag] || Feather;
            return (
              <DropdownMenuItem key={tag} asChild>
                <Link href={`/tags/${tag.toLowerCase()}`} className="w-full">
                  <TagIcon className="mr-2 h-4 w-4" />
                  <span>{tag}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
