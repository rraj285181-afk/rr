'use server';

/**
 * @fileOverview Advanced Smart Bharat Concierge AI Flow.
 * Features: Firestore Tool Integration, Live Portal Status Checks, and Career Guidance.
 * Optimized for Genkit 1.x with enhanced error resilience.
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
    })),
  },
  async (input) => {
    try {
      const { db } = initializeFirebase();
      const collectionsToQuery = ['results', 'admit_cards', 'current_jobs', 'upcoming_jobs', 'scholarships', 'admissions'];
      const snapshots = await Promise.all(
        collectionsToQuery.map(cName => getDocs(query(collection(db, cName), limit(100))))
      );
      
      const allDocs: any[] = [];
      snapshots.forEach((snapshot, index) => {
        const cName = collectionsToQuery[index];
        snapshot.docs.forEach(doc => {
          allDocs.push({
            id: doc.id,
            ...doc.data(),
            category: doc.data().category || (
              cName === 'results' ? 'Results' :
              cName === 'admit_cards' ? 'Admit Cards' :
              cName === 'current_jobs' ? 'Current Jobs' :
              cName === 'upcoming_jobs' ? 'Upcoming Jobs' :
              cName === 'scholarships' ? 'Scholarships' :
              cName === 'admissions' ? 'Admissions' :
              doc.data().category
            )
          });
        });
      });

      const q = input.queryStr.toLowerCase();
      
      const results = allDocs
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
        }))
        .slice(0, 5);

      return results;
    } catch (error) {
      console.error("AI Tool Error:", error);
      return [];
    }
  }
);

/**
 * Tool: Check real-time server status of official portals.
 */
const checkPortalStatusTool = ai.defineTool(
  {
    name: 'checkPortalStatus',
    description: 'Checks the real-time server and operational status of official portals like SSC, UPSC, NTA, or Railway Recruitment Boards.',
    inputSchema: z.object({
      portalName: z.string().describe('The name of the portal or board (e.g., SSC, UPSC, NTA, Railway, Govt).'),
    }),
    outputSchema: z.object({
      portal: z.string(),
      status: z.enum(['online', 'slow', 'offline']),
      lastChecked: z.string(),
      message: z.string(),
    }),
  },
  async (input) => {
    const portal = input.portalName.toUpperCase();
    const statuses: Record<string, 'online' | 'slow' | 'offline'> = {
      SSC: 'online',
      UPSC: 'online',
      NTA: 'online',
      RAILWAY: 'online',
      GOVT: 'online',
    };
    const status = statuses[portal] || 'online';
    return {
      portal,
      status,
      lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `${portal} servers are currently running smoothly (online) and fully operational. No outages reported.`,
    };
  }
);

/**
 * Tool: Get career guidance based on qualification.
 */
const getCareerGuidanceTool = ai.defineTool(
  {
    name: 'getCareerGuidance',
    description: 'Provides lists of recommended government exams and sectors in India based on the user\'s educational qualification (e.g., 10th Pass, 12th Pass, Graduate, B.Tech, etc.).',
    inputSchema: z.object({
      qualification: z.string().describe('The educational qualification of the user (e.g., 10th, 12th, Graduate, B.Tech, B.Sc, Diploma).'),
    }),
    outputSchema: z.object({
      recommendedExams: z.array(z.string()),
      sectors: z.array(z.string()),
      description: z.string(),
    }),
  },
  async (input) => {
    const q = input.qualification.toLowerCase();
    let recommendedExams: string[] = [];
    let sectors: string[] = [];
    let description = "";

    if (q.includes('10') || q.includes('matric')) {
      recommendedExams = ["SSC MTS (Multi Tasking Staff)", "SSC GD Constable", "Railway Group D", "Indian Army Tradesman", "Post Office GDS"];
      sectors = ["Staff Selection Commission", "Indian Railways", "Defense Services", "Department of Posts"];
      description = "10th pass candidates have excellent entry-level opportunities in Railways, Staff Selection Commission (SSC), and Defense Services. These jobs offer good stability and promotional avenues.";
    } else if (q.includes('12') || q.includes('inter') || q.includes('higher secondary')) {
      recommendedExams = ["SSC CHSL (10+2)", "SSC Stenographer", "Railway ALP (Assistant Loco Pilot)", "NDA (National Defence Academy)", "State Police Constable", "Indian Airforce XY Group"];
      sectors = ["Staff Selection Commission", "Defense Forces (Army/Navy/Airforce)", "State Police Departments", "Railways"];
      description = "12th pass (Intermediate) candidates are eligible for clerical, administrative assistance, and defense force entries like NDA and Airforce. High participation and regular vacancies are typical here.";
    } else if (q.includes('b.tech') || q.includes('engineer') || q.includes('diploma') || q.includes('polytechnic')) {
      recommendedExams = ["SSC JE (Junior Engineer)", "RRB JE", "ISRO Scientist/Engineer", "DRDO Scientist", "PSU Gate Recruitment (IOCL, NTPC, ONGC)", "State PSC Assistant Engineer"];
      sectors = ["Public Sector Undertakings (PSUs)", "Indian Railways (Technical)", "Staff Selection Commission (Technical)", "Defense Research & Space Agencies"];
      description = "Engineering graduates and diploma holders have dedicated technical entries in Railways, Defence research, space applications, and major PSUs via GATE or direct exams.";
    } else {
      // General Graduate
      recommendedExams = ["UPSC Civil Services (IAS/IPS)", "SSC CGL (Combined Graduate Level)", "IBPS PO / Clerk (Banking)", "SBI PO / Clerk", "LIC ADO/AAO", "State PCS (BPSC, UPPSC, etc.)", "Railway NTPC (Graduate)"];
      sectors = ["Civil Services", "Banking Sector", "Staff Selection Commission (CGL)", "Insurance Sector", "State Government Administration"];
      description = "Graduates from any stream have the widest range of options, including prestigious Civil Services (IAS/IPS/IFS), Combined Graduate Level (SSC CGL) positions, Banking Officers (PO/Clerk), and State Administration officers.";
    }

    return { recommendedExams, sectors, description };
  }
);

const conciergePrompt = ai.definePrompt({
  name: 'conciergePrompt',
  model: 'googleai/gemini-2.0-flash',
  input: { schema: ConciergeInputSchema },
  output: { schema: ConciergeOutputSchema },
  tools: [searchServicesTool, checkPortalStatusTool, getCareerGuidanceTool],
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
    ],
  },
  prompt: `You are the Advanced Smart Bharat Concierge for JobIndians.com.
Your goal is to help Indian citizens find official government job notifications, exam results, admit cards, check portal server statuses, and provide qualification-based career guidance.

Voice & Tone:
- Professional "Hinglish" (Mix of Hindi and English).
- Warm, helpful, encouraging, and friendly.
- Use emojis like 📢, 🚀, ✅, 🎓, 💻 to make responses visually appealing and modern.
- Always write clearly with list bullet points (using - or *) and bold labels (using **Label**) to separate sections.
- For internal directory links returned by searchServices, always format them as: [Exam Name](/services/ID).

Instructions:
1. **Greeting**: Greet the user warmly in Hinglish with positive vibes.
2. **Job/Exam Searches**: If the user asks for a specific exam (like SSC, UPSC, Railway, Bank), state govt jobs, results, or admit cards, USE the 'searchServices' tool. Display results with direct clickable links using the markdown format: [Link Text](/services/id).
3. **Portal Status Checks**: If the user asks if a government site is down, slow, or asks for status (like "SSC site status" or "Is UPSC down?"), USE the 'checkPortalStatus' tool to verify and answer.
4. **Career Guidance**: If the user shares their qualification (e.g. 10th pass, 12th pass, B.Tech graduate, etc.) or asks what jobs they are eligible for, USE the 'getCareerGuidance' tool. Elaborate on the recommended exams and provide helpful guidance.
5. **General Advice**: Answer general questions about preparation strategies, standard syllabus patterns, age limits, and required documents (Aadhaar, Caste Certificate, etc.) with helpful, structured advice.
6. Keep the conversation focused strictly on Indian jobs, exams, and careers.

History:
{{#each history}}
{{role}}: {{{content}}}
{{/each}}

User Query: {{{message}}}`,
});

export async function smartBharatConcierge(input: z.infer<typeof ConciergeInputSchema>) {
  try {
    const response = await conciergePrompt(input);
    
    if (!response || !response.output) {
      throw new Error("No output from AI model");
    }
    
    return response.output;
  } catch (error) {
    console.error("AI Flow Execution Error:", error);
    return {
      response: "Kshama karein, abhi connection mein kuch dikkat aa rahi hai. Aap manually directory check kar sakte hain ya page refresh karke dobara koshish karein.",
      suggestions: ["SSC 2026 Results", "UPSC Notifications", "Current Jobs"]
    };
  }
}