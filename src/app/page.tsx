import { PostCard } from '@/components/post-card';
import { getFeaturedPosts } from '@/lib/data';
import { NewsletterSignup } from '@/components/newsletter-signup';

export default function Home() {
  const featuredPosts = getFeaturedPosts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-16 sm:py-24 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          Inkwell Musings
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          An aspiring author's collection of projects, thoughts, articles, and stories.
        </p>
      </header>

      <main>
        <section className="mb-24">
          <h2 className="font-headline text-3xl font-bold mb-8 text-center sm:text-left">Featured Writings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="py-16 bg-muted/50 rounded-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
