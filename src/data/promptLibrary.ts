export interface AIPromptTemplate {
  id: string;
  title: string;
  category: 'Coding & Dev' | 'Video & Animation' | 'Copywriting' | 'Sales & Outreach';
  toolTarget: string;
  difficulty: 'Beginner' | 'Advanced' | 'Master';
  description: string;
  promptText: string;
  estimatedTimeSaved: string;
}

export const PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'prompt-cursor-composer',
    title: 'Cursor Composer: Full-Stack Feature Architect',
    category: 'Coding & Dev',
    toolTarget: 'Cursor / Windsurf',
    difficulty: 'Master',
    description: 'Instructs Cursor Composer to implement multi-file features with TypeScript strict types, error handling, and unit test stubs.',
    promptText: `Act as a principal software architect. Implement [FEATURE_NAME] across our codebase following these strict guidelines:
1. First, list all files you plan to modify or create and explain the dependency hierarchy.
2. Maintain strict TypeScript types (no 'any'). Reuse existing interfaces in /types wherever possible.
3. Handle all async edge cases, loading states, and network errors gracefully.
4. Add comprehensive docstrings and inline explanatory comments for non-obvious business logic.
5. Create a dedicated test file with happy path and boundary condition tests.
Provide clean diffs without deleting unrelated methods.`,
    estimatedTimeSaved: '4.5 hours',
  },
  {
    id: 'prompt-heygen-video-script',
    title: 'HeyGen / Runway: High-Converting Video Ad Script',
    category: 'Video & Animation',
    toolTarget: 'HeyGen / Runway',
    difficulty: 'Advanced',
    description: 'Generates a 45-second direct-response video ad script optimized for AI avatar lip-syncing and high retention hooks.',
    promptText: `Write a 45-second direct-response video script for [PRODUCT_NAME], targeted at [AUDIENCE]. Follow this retention structure:
- [0:00 - 0:04] Pattern Interrupt Hook: State a painful, relatable frustration without intro fluff.
- [0:05 - 0:15] Agitation & Villain: Show why traditional solutions cost too much time/money.
- [0:16 - 0:30] The Mechanism: Introduce [PRODUCT_NAME] as the automated shortcut. Detail 2 specific features.
- [0:31 - 0:40] Social Proof & Risk Reversal: Mention [METRIC/RESULT] + free trial.
- [0:41 - 0:45] Concrete Call to Action: Explicit instruction on where to click.
Keep sentences under 14 words for natural cadence in HeyGen text-to-speech.`,
    estimatedTimeSaved: '3.0 hours',
  },
  {
    id: 'prompt-cold-email-instantly',
    title: 'Instantly.ai: 3-Sentence High-Response Cold Email',
    category: 'Sales & Outreach',
    toolTarget: 'Instantly / Apollo',
    difficulty: 'Beginner',
    description: 'Cold outreach email template that avoids spam filters and achieves 40%+ open rates and 12%+ reply rates.',
    promptText: `Write a 3-sentence B2B cold email to [PROSPECT_TITLE] at [COMPANY_TYPE] regarding [VALUE_PROPOSITION]:
Sentence 1: Mention a specific observation about their recent growth, hiring, or product announcement.
Sentence 2: Explain how we helped [SIMILAR_COMPANY] achieve [SPECIFIC_OUTCOME] in [TIMEFRAME] without [COMMON_HEADACHE].
Sentence 3: Low-friction call to action asking if they are open to seeing a 2-minute Loom breakdown.
Rules: Zero corporate buzzwords (no "synergy", "paradigm", "streamline"). Under 75 words total. Plain text formatting.`,
    estimatedTimeSaved: '2.5 hours',
  },
  {
    id: 'prompt-midjourney-flux',
    title: 'Flux.1 / Midjourney: Hyper-Realistic Editorial Photography',
    category: 'Copywriting',
    toolTarget: 'Flux.1 / Midjourney',
    difficulty: 'Advanced',
    description: 'Generates photo-studio quality images with exact camera lenses, lighting ratios, and human skin textures.',
    promptText: `Cinematic editorial portrait of [SUBJECT/PROFESSIONAL], captured on 35mm Kodak Portra 400, Leica M6 with 50mm f/1.4 Summilux lens, soft window directional lighting from camera left, subtle rim light, shallow depth of field with creamy bokeh, natural skin texture, visible pores, unretouched aesthetic, hyper-detailed, photorealistic, 8k resolution, neutral color grading, professional studio backdrop --ar 16:9 --style raw`,
    estimatedTimeSaved: '2.0 hours',
  },
  {
    id: 'prompt-seo-buying-guide',
    title: 'Perplexity: Programmatic SEO Comparison Research',
    category: 'Copywriting',
    toolTarget: 'Perplexity / Claude 3.5',
    difficulty: 'Master',
    description: 'Extracts real competitor pricing, feature trade-offs, and user complaints for comparative software review guides.',
    promptText: `Deeply analyze and benchmark [TOOL_A] vs [TOOL_B] for [USE_CASE]:
1. Exact pricing breakdown (entry tier, pro tier, hidden fees, free trial limitations).
2. Side-by-side feature matrix with checkboxes for core capabilities.
3. Top 3 verified complaints from verified Reddit/G2 reviews for each tool.
4. Clear verdict: In which specific scenario should a buyer choose Tool A over Tool B, and vice-versa?
5. List 2 alternative tools that offer superior pricing or open-source self-hosting.
Include direct sources and citation links for every pricing figure.`,
    estimatedTimeSaved: '5.0 hours',
  },
];
