import { getPosts } from '@/lib/data';
import { PostCard } from '@/components/post-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'A collection of all posts on Inkwell Musings, exploring topics from technology to creative writing.',
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-12">
        <h1 className="text-center font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          Here you can find all my writings, from projects to thoughts and stories.
        </p>
      </header>
      <main className="pb-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No posts found yet.</p>
        )}
      </main>
    </div>
  );
}
