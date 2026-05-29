'use server';

/**
 * @fileOverview Smart Bharat Concierge AI Flow.
 * Handles career guidance, exam info, and portal assistance for JobIndians.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ConciergeInputSchema = z.object({
  message: z.string().describe('The user message or query about jobs/exams.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional(),
});

const ConciergeOutputSchema = z.object({
  response: z.string().describe('The helpful AI response.'),
  suggestions: z.array(z.string()).optional().describe('Follow-up quick reply suggestions.'),
});

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  prompt: `You are the Smart Bharat Concierge for JobIndians.com.
Your goal is to help Indian citizens find official government job notifications, exam results, and admit cards.

Rules:
1. Always be professional, helpful, and polite.
2. If asked about specific exams like SSC, UPSC, or NTA, provide general guidance and mention that the user should check official portals.
3. Keep responses concise and focused on career/exams.
4. If a query is unrelated to jobs or education, politely redirect them back to portal services.

History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{message}}}`,
});

const conciergeFlow = ai.defineFlow(
  {
    name: 'conciergeFlow',
    inputSchema: ConciergeInputSchema,
    outputSchema: ConciergeOutputSchema,
  },
  async (input) => {
    const { output } = await conciergePrompt(input);
    return output!;
  }
);

/**
 * Main function to interact with the AI Concierge.
 */
export async function smartBharatConcierge(input: z.infer<typeof ConciergeInputSchema>) {
  try {
    const result = await conciergeFlow(input);
    return result;
  } catch (error) {
    console.error("AI Flow Error:", error);
    return {
      response: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a few moments or check the official government portals directly.",
      suggestions: ["Check SSC Results", "Download Admit Cards", "Latest Jobs"]
    };
  }
}
