'use server';

/**
 * @fileOverview Advanced Smart Bharat Concierge AI Flow.
 * Features: Firestore Tool Integration for real-time link lookup.
 * Optimized for Genkit 1.x
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
        .slice(0, 5);

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
- Always provide internal links to our portal (/services/ID) if available via searchServices tool.

Instructions:
1. Greet the user warmly in Hinglish if it's the start of conversation.
2. If the user asks for a specific exam (like SSC, UPSC, Railway), use the 'searchServices' tool.
3. If searchServices returns links, display them as a list and mention they are verified.
4. If no results are found, suggest official websites like ssc.gov.in, upsc.gov.in or sarkariresult.com as secondary sources.
5. Keep the conversation focused on Indian jobs and exams.

History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{message}}}`,
});

export async function smartBharatConcierge(input: z.infer<typeof ConciergeInputSchema>) {
  try {
    const { output } = await conciergePrompt(input);
    
    if (!output) {
      return {
        response: "Maaf kijiye, main abhi apki puri tarah madad nahi kar paa raha hoon. Kripya thodi der baad koshish karein ya directory manually check karein.",
        suggestions: ["Latest Jobs", "Check Results"]
      };
    }
    
    return output;
  } catch (error) {
    console.error("AI Flow Execution Error:", error);
    return {
      response: "Kshama karein, server se connect karne mein samasya aa rahi hai. Aap hamari official directory use kar sakte hain.",
      suggestions: ["SSC Results", "UPSC 2026", "Latest Jobs"]
    };
  }
}
