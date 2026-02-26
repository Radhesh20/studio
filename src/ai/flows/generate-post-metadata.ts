'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate metadata for blog posts.
 *
 * - generatePostMetadata - A function that handles the generation of blog post metadata.
 * - GeneratePostMetadataInput - The input type for the generatePostMetadata function.
 * - GeneratePostMetadataOutput - The return type for the generatePostMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePostMetadataInputSchema = z.object({
  postContent: z
    .string()
    .describe('The full content of the blog post, including text and any relevant details.'),
});
export type GeneratePostMetadataInput = z.infer<
  typeof GeneratePostMetadataInputSchema
>;

const GeneratePostMetadataOutputSchema = z.object({
  title: z
    .string()
    .describe('A compelling and SEO-friendly title for the blog post (under 60 characters).'),
  metaDescription: z
    .string()
    .describe(
      'A concise and engaging meta description (150-160 characters) for the blog post, optimized for search engines.'
    ),
  socialMediaText: z
    .string()
    .describe(
      'Short and catchy text suitable for sharing the blog post on social media platforms, including relevant hashtags (under 200 characters).'
    ),
});
export type GeneratePostMetadataOutput = z.infer<
  typeof GeneratePostMetadataOutputSchema
>;

export async function generatePostMetadata(
  input: GeneratePostMetadataInput
): Promise<GeneratePostMetadataOutput> {
  return generatePostMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostMetadataPrompt',
  input: {schema: GeneratePostMetadataInputSchema},
  output: {schema: GeneratePostMetadataOutputSchema},
  prompt: `You are an expert SEO specialist and social media manager. Your task is to generate optimal metadata for a given blog post.

Based on the following blog post content, please provide:
1. A compelling and SEO-friendly title (under 60 characters).
2. A concise and engaging meta description (150-160 characters) for search engines.
3. Short and catchy text suitable for sharing on social media platforms, including relevant hashtags (under 200 characters).

Blog Post Content:
---
{{{postContent}}}
---

Remember to keep the title and social media text concise as specified.`,
});

const generatePostMetadataFlow = ai.defineFlow(
  {
    name: 'generatePostMetadataFlow',
    inputSchema: GeneratePostMetadataInputSchema,
    outputSchema: GeneratePostMetadataOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
