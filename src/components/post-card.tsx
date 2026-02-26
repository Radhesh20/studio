import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.content.split('</p>')[0].replace('<p>', '') + '...';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/posts/${post.slug}`} className="block">
          <Image
            src={post.image}
            alt={post.imageDescription}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={post.imageHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <p className="text-sm text-muted-foreground mb-2">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
        <CardTitle className="font-headline text-xl mb-3 leading-snug">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-3">
            {excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
        <div className="flex-grow w-full">
            <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                {tag}
                </Badge>
            ))}
            </div>
        </div>
        <Link href={`/posts/${post.slug}`} className="text-sm font-semibold text-primary inline-flex items-center gap-2 group">
            Read more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
