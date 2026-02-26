import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Author',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <header className="py-12 text-center">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          About the Author
        </h1>
      </header>
      <main className="prose dark:prose-invert max-w-none mx-auto lg:prose-lg font-body prose-headings:font-headline">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/3">
                <Image
                    src="https://picsum.photos/seed/author/400/400"
                    alt="Portrait of the author"
                    width={400}
                    height={400}
                    className="rounded-full aspect-square object-cover shadow-lg mx-auto"
                    data-ai-hint="author portrait"
                />
            </div>
            <div className="md:w-2/3">
                <p className="lead">
                Hello, I'm an aspiring author with a passion for weaving tales, exploring new ideas, and building digital experiences. This blog, Inkwell Musings, is my personal canvas.
                </p>
            </div>
        </div>
        
        <h2>My Journey</h2>
        <p>
          From a young age, I was captivated by the power of stories. I spent countless hours lost in books, exploring fantasy realms, and pondering the complexities of the human condition. This love for narrative naturally evolved into a desire to create my own worlds and share my own voice.
        </p>
        <p>
          My professional life has been a blend of technology and creativity. I've worked on various software projects, always drawn to the challenge of solving problems and building useful tools. This blog is where these two worlds collide—a place to document my technical projects, share fictional stories, and post articles on the art of writing itself.
        </p>
        <h2>The Mission of This Blog</h2>
        <p>
          Inkwell Musings serves a few purposes. It is a portfolio of my work, a diary of my thoughts, and an open invitation for connection. Whether you're a fellow writer, a tech enthusiast, or simply a curious reader, I hope you find something here that resonates with you. Thank you for joining me on this journey.
        </p>
      </main>
    </div>
  );
}
