import { getAllTags } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Tags',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="py-12 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          All Tags
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore posts by category to find what interests you most.
        </p>
      </header>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tags.map((tag) => (
            <Link href={`/tags/${tag.toLowerCase()}`} key={tag} legacyBehavior>
              <a className="block">
                <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="font-headline text-2xl">{tag}</CardTitle>
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </CardHeader>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
