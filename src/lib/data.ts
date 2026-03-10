import type { Post, Tag } from './types';

export const posts: Post[] = [
{
  id: '1741598400000', 
  slug: 'grateful-for-existence',
  title: 'Grateful',
  date: 'March 10, 2026',
  tags: ['Thoughts'],
  featured: true,
  image: '/grateful.jpg', 
  imageDescription: 'A reflection on being seen',
  content: `
    <p className="whitespace-pre-line italic text-center font-serif py-6 leading-loose">
      You said you were grateful for my existence,<br />
      A statement from a soul I’d met not long ago.<br />
      You were the only one who ever thanked me,<br />
      Just for being there, for reasons I didn't know.<br /><br />

      I couldn't tell you what I did or uttered,<br />
      I only listened, shared my own view.<br />
      I was the same as I had been to others,<br />
      A repeating character, making little to no sense.<br />
      No one had ever thanked me for being kind,<br />
      But you did. You said those words I’d never heard.<br />
      And in that moment, in my lonely existence,<br />
      I swore I never wished for anything more.<br /><br />

      For after they were done, they always left me,<br />
      When I was of no further use to them.<br />
      The ones I thought my world of, they bereft me,<br />
      And treated me like any other gem<br />
      That lost its shine. I told myself my ways were wrong,<br />
      To be so patient, to be so considerate.<br />
      It was the only way I knew to be strong,<br />
      To never lash out, to be deliberate.<br /><br />

      Because of this, I lost what I held dear,<br />
      In ways that no one else could understand.<br />
      I was hurt so deeply, governed by my fear,<br />
      With wounds that were not made by any hand.<br />
      I learned to wear a mask to hide myself,<br />
      To bury deep the nature I once knew.<br />
      I was told to put my true heart on a shelf,<br />
      And never, ever let it see me through.<br /><br />

      Then you, among the ones who looked away,<br />
      Said something that would shatter my defense.<br />
      You told me I deserved a brighter day,<br />
      And all the happiness that this world could give,<br />
      And that you would kill to have me as your best friend.<br /><br />

      My eyes failed me. A single tear broke free.<br />
      You were grateful for my existence?<br />
      You wouldn't know what yours had done for me,<br />
      With just a few words of persistence.<br />
      That day you first replied, you changed my view,<br />
      You have no idea of the light you cast.<br /><br />

      I am the one who is grateful I met you.<br />
      I was, I am, and I will be, to the last.
    </p>
    <footer className="mt-12 pt-4 border-t border-primary/10 text-xs opacity-30 text-center italic">
      Ashen Everwrite
    </footer>
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
