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
