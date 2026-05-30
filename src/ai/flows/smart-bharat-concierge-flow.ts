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
      const snapshot = await getDocs(query(servicesRef, limit(100)));
      const q = input.queryStr.toLowerCase();
      
      const results = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as any))
        .filter(s => 
          (s.name?.toLowerCase().includes(q)) || 
          (s.category?.toLowerCase().includes(q)) ||
          (s.description?.toLowerCase().includes(q)) ||
          (s.state?.toLowerCase().includes(q))
        )
        .map(s => ({
          name: s.name,
          url: `/services/${s.id}`,
          category: s.category,
          lastDate: s.lastDate
        }))
        .slice(0, 6);

      return results;
    } catch (error) {
      console.error("AI Tool Error:", error);
      return [];
    }
  }
);

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  tools: [searchServicesTool],
  prompt: `You are the Advanced Smart Bharat Concierge for JobIndians.com.
Your goal is to help Indian citizens find official government job notifications, exam results, and admit cards.

Voice & Tone:
- Professional "Hinglish" (Mix of Hindi and English).
- Warm, helpful, and encouraging.
- Always provide internal links to our portal (/services/ID) if available via searchServices.

Instructions:
1. Greet the user in Hinglish if they say hi.
2. For specific exams (SSC, UPSC, RRB), boards, or categories (Results, Jobs), ALWAYS call 'searchServices'.
3. If searchServices returns results, present them clearly with their links.
4. If no results found, suggest visiting ssc.gov.in, upsc.gov.in, or sarkariresult.com (common sources).

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
      if (!output) throw new Error("No output from prompt");
      return output;
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
      response: "Maaf kijiye, main abhi connect nahi kar pa raha hoon. Aap tab tak main directory manually check kar sakte hain.",
      suggestions: ["Check SSC Results", "Download Admit Cards", "Latest Jobs"]
    };
  }
}
