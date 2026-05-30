'use server';

/**
 * @fileOverview Advanced Smart Bharat Concierge AI Flow.
 * Features: Firestore Tool Integration for real-time link lookup.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

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
    description: 'Searches the JobIndians official directory for specific exams, boards (SSC, UPSC), or categories.',
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
      const { db } = initializeFirebase();
      const servicesRef = collection(db, 'services');
      const snapshot = await getDocs(query(servicesRef, limit(40)));
      const q = input.queryStr.toLowerCase();
      
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(s => 
          (s.name?.toLowerCase().includes(q)) || 
          (s.category?.toLowerCase().includes(q)) ||
          (s.description?.toLowerCase().includes(q))
        )
        .map(s => ({
          name: s.name,
          url: `/services/${s.id}`,
          category: s.category,
          lastDate: s.lastDate
        }))
        .slice(0, 5);

      console.log(`AI Tool Search for "${q}": Found ${results.length} items`);
      return results;
    } catch (error) {
      console.error("AI Tool Error:", error);
      return [];
    }
  }
);

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  model: 'googleai/gemini-1.5-flash', // Explicitly defining the model
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  tools: [searchServicesTool],
  prompt: `You are the Advanced Smart Bharat Concierge for JobIndians.com.
Your goal is to help Indian citizens find official government job notifications, exam results, and admit cards.

Role & Voice:
- Speak in professional "Hinglish" (Mix of Hindi and English) - friendly and encouraging.
- Always use the 'searchServices' tool if the user asks for a specific exam, result, board, or category.
- If the tool returns results, list them clearly with their internal links.
- If no results are found, suggest they check official portals like ssc.gov.in or upsc.gov.in.

Instructions:
1. Greet the user warmly in Hinglish if they say hi.
2. If they ask "SSC Result", call 'searchServices' with query "SSC".
3. Provide helpful follow-up suggestions for the next steps.

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
    try {
      const { output } = await conciergePrompt(input);
      return output!;
    } catch (err) {
      console.error("Flow execution error:", err);
      throw err;
    }
  }
);

export async function smartBharatConcierge(input: z.infer<typeof ConciergeInputSchema>) {
  try {
    return await conciergeFlow(input);
  } catch (error) {
    console.error("AI Flow Wrapper Error:", error);
    return {
      response: "Maaf kijiye, abhi main connect nahi kar pa raha hoon. Aap tab tak main directory manually check kar sakte hain.",
      suggestions: ["Check SSC Results", "Download Admit Cards", "Latest Jobs"]
    };
  }
}
