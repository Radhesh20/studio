'use client';

import Link from 'next/link';
import { Feather } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MainNav } from './main-nav';
import { ThemeToggle } from './theme-toggle';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center justify-center p-2 rounded-lg bg-primary text-primary-foreground">
                <Feather className="h-6 w-6" />
            </div>
            <span className="font-headline text-xl font-bold group-data-[collapsible=icon]:hidden">
              Inkwell Musings
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
            <div className="group-data-[collapsible=icon]:hidden text-xs text-muted-foreground">© 2024</div>
            <ThemeToggle />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-start p-2 border-b md:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <SidebarTrigger />
            <Link href="/" className="ml-2 font-headline text-lg font-bold">
                Inkwell Musings
            </Link>
        </header>
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
