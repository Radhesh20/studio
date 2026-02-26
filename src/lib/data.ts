import type { Post, Tag } from './types';

export const posts: Post[] = [
  {
    id: '1',
    slug: 'the-genesis-of-project-aurora',
    title: 'The Genesis of Project Aurora',
    date: '2024-07-15',
    tags: ['Projects'],
    featured: true,
    image: 'https://picsum.photos/seed/103/600/400',
    imageDescription: 'A blueprint of a complex project on a wooden table.',
    imageHint: 'project blueprint',
    content: `
<p>Every great project begins with a single spark of an idea. For me, Project Aurora was that spark. It started not in a boardroom, but on a quiet afternoon, staring at a blank page. The question was simple: how can technology tell a story in a way that feels both ancient and entirely new?</p>
<p>This post chronicles the early days of Project Aurora, from the initial concept sketches to the first lines of code. It’s a journey of trial and error, of late-night epiphanies and frustrating roadblocks. I'll delve into the core technologies we chose and, more importantly, *why* we chose them. This isn't just a technical diary; it's a story about building something from nothing and the passion that fuels creation.</p>
<p>Join me as I pull back the curtain on the creative and technical process behind my most ambitious project to date.</p>
    `,
  },
  {
    id: '2',
    slug: 'reflections-on-solitude',
    title: 'Reflections on Solitude',
    date: '2024-06-28',
    tags: ['Thoughts'],
    featured: true,
    image: 'https://picsum.photos/seed/105/600/400',
    imageDescription: 'A person looking thoughtfully out of a window.',
    imageHint: 'thoughtful person',
    content: `
<p>In our hyper-connected world, solitude is often mistaken for loneliness. But in the quiet moments, away from the digital noise, I've found a space for profound reflection and creativity. This isn't a call to disconnect entirely, but an exploration of the power that can be found in being alone with your thoughts.</p>
<p>I share my personal experiences with carving out moments of solitude and how it has impacted my writing and my perspective on life. From silent walks in nature to simply sitting with a cup of tea and a notebook, these practices have become essential to my well-being. This article is an invitation to find your own quiet corner and discover what awaits you there.</p>
    `,
  },
  {
    id: '3',
    slug: 'world-building-a-guide-for-aspiring-authors',
    title: 'World-Building: A Guide for Aspiring Authors',
    date: '2024-05-19',
    tags: ['Articles', 'Stories'],
    featured: true,
    image: 'https://picsum.photos/seed/102/600/400',
    imageDescription: 'An open book with a fantasy landscape emerging from its pages.',
    imageHint: 'fantasy book',
    content: `
<p>The worlds we create for our stories are as important as the characters who inhabit them. A living, breathing world can immerse a reader completely, making the unbelievable feel real. But where do you start? How do you build a world that is both unique and believable?</p>
<p>This guide breaks down the art of world-building into manageable steps. We'll cover everything from geography and climate to culture, politics, and magic systems. I'll provide practical tips, exercises, and examples from my own work to help you craft a rich and compelling setting for your next story. Whether you're writing epic fantasy or a subtle character drama, these principles will help you build a world your readers will never want to leave.</p>
    `,
  },
  {
    id: '4',
    slug: 'the-librarian-of-whispering-halls',
    title: 'The Librarian of Whispering Halls',
    date: '2024-04-05',
    tags: ['Stories'],
    image: 'https://picsum.photos/seed/104/600/400',
    imageDescription: 'A quiet library with shelves full of old books.',
    imageHint: 'library books',
    content: `
<p>The city of Aethelgard was built on secrets, and its Great Library was the lockbox where they were kept. Elias was its keeper, the latest in a long line of librarians tasked with guarding not just books, but the memories bound within their pages. He was a young man for such a role, his face still unlined by the weight of the histories he protected.</p>
<p>One rain-slicked evening, a cloaked figure arrived, seeking a tome that wasn't on any catalog. It was a book of whispers, said to contain the one truth the city was founded to forget. Elias knew that to grant the request was to break his oath, but to deny it felt like a betrayal of a different kind—a betrayal of knowledge itself. The choice he made that night would unravel the city's past and rewrite its future, starting with a single, dusty volume pulled from the darkest corner of the Whispering Halls.</p>
    `,
  },
  {
    id: '5',
    slug: 'the-simple-act-of-writing',
    title: 'The Simple Act of Writing',
    date: '2024-03-21',
    tags: ['Thoughts', 'Articles'],
    image: 'https://picsum.photos/seed/101/600/400',
    imageDescription: 'A person writing in a notebook at a sunlit desk.',
    imageHint: 'writing desk',
    content: `
<p>Putting pen to paper, or fingers to keyboard, is a simple act. Yet, it holds the power to create universes, to heal wounds, to connect souls across time and space. We often get lost in the pursuit of perfection—the perfect plot, the perfect sentence—and forget the simple joy of the act itself.</p>
<p>This is a reflection on that joy. It's about the feeling of a story unfolding, the satisfaction of finding the right word, and the quiet magic of bringing a thought into existence. It's a reminder to myself, and to any other writer who might need it, to sometimes let go of the grand ambitions and just enjoy the simple, beautiful act of writing.</p>
    `,
  },
];

export function getPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getPosts().filter((post) => post.featured);
}

export function getPostsByTag(tag: Tag): Post[] {
  return getPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): Tag[] {
    return ['Projects', 'Thoughts', 'Articles', 'Stories'];
}
