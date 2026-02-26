'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Tags, Newspaper, MessageSquareText, Projector, BookOpen, Feather } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { getAllTags, type Tag } from '@/lib/data';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/tags', label: 'Tags', icon: Tags },
];

const tagIcons: Record<Tag, React.ElementType> = {
    Projects: Projector,
    Thoughts: MessageSquareText,
    Articles: Newspaper,
    Stories: BookOpen,
};

export function MainNav() {
  const pathname = usePathname();
  const tags = getAllTags();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={{ children: item.label }}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
      <div className="px-3 pt-4 pb-2 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
        Categories
      </div>
      {tags.map((tag) => {
        const TagIcon = tagIcons[tag] || Feather;
        const href = `/tags/${tag.toLowerCase()}`;
        return (
          <SidebarMenuItem key={tag}>
             <Link href={href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === href}
                tooltip={{ children: tag }}
              >
                <TagIcon />
                <span>{tag}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
