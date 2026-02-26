import { getPostsByTag, getAllTags, type Tag } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/post-card';
import type { Metadata } from 'next';

type Props = {
  params: { tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = params.tag.charAt(0).toUpperCase() + params.tag.slice(1);
  return {
    title: `Posts tagged "${tag}"`,
  };
}


export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tagName = params.tag.charAt(0).toUpperCase() + params.tag.slice(1) as Tag;
  
  if (!getAllTags().includes(tagName)) {
    notFound();
  }

  const posts = getPostsByTag(tagName);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-12">
        <p className="text-center text-primary font-semibold">Tag</p>
        <h1 className="text-center font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {tagName}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found.
        </p>
      </header>
      <main>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No posts found for this tag yet.</p>
        )}
      </main>
    </div>
  );
}
