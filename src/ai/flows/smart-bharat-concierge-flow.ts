'use server';

/**
 * @fileOverview Advanced Smart Bharat Concierge AI Flow.
 * Features: Firestore Tool Integration for real-time link lookup.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, query, getDocs, where, limit } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const { db } = initializeFirebase();

// Input and Output Schemas
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

/**
 * Tool: Search for services in Firestore.
 * This allows the AI to provide real links from the site's database.
 */
const searchServicesTool = ai.defineTool(
  {
    name: 'searchServices',
    description: 'Searches the JobIndians official directory for specific exams, results, or admit cards.',
    inputSchema: z.object({
      queryStr: z.string().describe('The name of the exam, board, or category to search for.'),
    }),
    outputSchema: z.array(z.object({
      name: z.string(),
      url: z.string(),
      category: z.string(),
      lastDate: z.string().optional(),
    })),
  },
  async (input) => {
    try {
      const servicesRef = collection(db, 'services');
      // Simple search implementation: fetch all and filter for better matches
      // In a real large-scale app, we would use Algolia or more complex queries
      const snapshot = await getDocs(query(servicesRef, limit(20)));
      const q = input.queryStr.toLowerCase();
      
      return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(s => 
          s.name?.toLowerCase().includes(q) || 
          s.category?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q)
        )
        .map(s => ({
          name: s.name,
          url: `/services/${s.id}`, // Link to internal detail page
          category: s.category,
          lastDate: s.lastDate
        }))
        .slice(0, 5);
    } catch (error) {
      console.error("Tool Error:", error);
      return [];
    }
  }
);

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  tools: [searchServicesTool],
  prompt: `You are the Advanced Smart Bharat Concierge for JobIndians.com.
Your goal is to help Indian citizens find official government job notifications, exam results, and admit cards.

Role & Voice:
- Speak in professional "Hinglish" (Mix of Hindi and English) as it's most comfortable for Indian aspirants.
- Be polite, encouraging, and accurate.
- Always use the 'searchServices' tool if the user asks for a specific exam, result, or board.

Instructions:
1. If the user greets you, reply warmly in Hinglish.
2. If they ask for a link or info about an exam (e.g., "SSC CGL Result kab aayega?"), use the search tool to see if we have it in our directory.
3. If the tool returns results, list them clearly and encourage them to click the link for details.
4. If no results are found, guide them to check official portals like ssc.gov.in or upsc.gov.in.
5. Provide helpful suggestions for follow-up questions.

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

export async function smartBharatConcierge(input: z.infer<typeof ConciergeInputSchema>) {
  try {
    return await conciergeFlow(input);
  } catch (error) {
    console.error("AI Flow Error:", error);
    return {
      response: "Maaf kijiye, abhi main connect nahi kar pa raha hoon. Aap tab tak main directory check kar sakte hain.",
      suggestions: ["Check SSC Results", "Download Admit Cards", "Latest Jobs"]
    };
  }
}
