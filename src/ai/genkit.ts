import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization for JobIndians AI Services.
 * Natively delegates to GEMINI_API_KEY at execution time.
 */
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
