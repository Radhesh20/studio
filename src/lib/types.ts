export type Tag = 'Projects' | 'Thoughts' | 'Articles' | 'Stories';

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO 8601 format 'YYYY-MM-DD'
  tags: Tag[];
  content: string;
  featured?: boolean;
  image: string;
  imageDescription: string;
  imageHint: string;
};
