import { getPostBySlug, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.content.substring(0, 150),
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="py-8">
        <div className="space-y-4 text-center">
            <div className="flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight">
                {post.title}
            </h1>
            <p className="text-base text-muted-foreground">
                Posted on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
        </div>
      </header>
      
      <Image
        src={post.image}
        alt={post.imageDescription}
        width={1200}
        height={600}
        className="w-full aspect-video object-cover rounded-lg my-8 shadow-lg"
        priority
        data-ai-hint={post.imageHint}
      />

      <div 
        className="prose dark:prose-invert max-w-none mx-auto lg:prose-lg font-body prose-headings:font-headline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
