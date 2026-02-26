'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a concise and engaging summary of a blog post for newsletter notifications.
 *
 * - summarizePostForNewsletter - A function that handles the generation of the newsletter summary.
 * - SummarizePostForNewsletterInput - The input type for the summarizePostForNewsletter function.
 * - SummarizePostForNewsletterOutput - The return type for the summarizePostForNewsletter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePostForNewsletterInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The full content of the blog post.'),
  tags: z.array(z.string()).describe('An array of tags associated with the blog post.'),
});
export type SummarizePostForNewsletterInput = z.infer<typeof SummarizePostForNewsletterInputSchema>;

const SummarizePostForNewsletterOutputSchema = z.object({
  summary: z.string().describe('A concise and engaging summary of the blog post, suitable for a newsletter.'),
});
export type SummarizePostForNewsletterOutput = z.infer<typeof SummarizePostForNewsletterOutputSchema>;

export async function summarizePostForNewsletter(input: SummarizePostForNewsletterInput): Promise<SummarizePostForNewsletterOutput> {
  return summarizePostForNewsletterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePostForNewsletterPrompt',
  input: {schema: SummarizePostForNewsletterInputSchema},
  output: {schema: SummarizePostForNewsletterOutputSchema},
  prompt: `You are an expert content summarizer for a blog newsletter. Your goal is to create a concise, engaging, and enticing summary of a new blog post that encourages subscribers to click and read the full article.

Here is the information about the new blog post:

Title: {{{title}}}

Content: {{{content}}}

Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Based on the above, generate a summary that is 2-4 sentences long. It should highlight the core idea or an interesting aspect of the post without giving away too many details. Make it compelling and suitable for an email notification.`,
});

const summarizePostForNewsletterFlow = ai.defineFlow(
  {
    name: 'summarizePostForNewsletterFlow',
    inputSchema: SummarizePostForNewsletterInputSchema,
    outputSchema: SummarizePostForNewsletterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
