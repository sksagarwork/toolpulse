export interface OutreachLead {
  id: string;
  toolName: string;
  category: string;
  founderName: string;
  founderRole: string;
  contactEmail: string;
  website: string;
  pitchAngle: string;
  monthlyRevenueEstimate: string;
  customPitchSubject: string;
  customPitchBody: string;
}

export const OUTREACH_LEADS: OutreachLead[] = [
  {
    id: 'lead-1',
    toolName: 'Klap.app',
    category: 'Video & Animation',
    founderName: 'Alexandre',
    founderRole: 'Founder & CEO',
    contactEmail: 'alex@klap.app',
    website: 'https://klap.app',
    pitchAngle: 'Competing with OpusClip & Descript for short-form viral TikTok/Reels generation',
    monthlyRevenueEstimate: '$45,000 MRR',
    customPitchSubject: 'Featured placement for Klap on ToolPulse AI (50k+ monthly creators)',
    customPitchBody: `Hi Alexandre,\n\nLoved what you've built with Klap—the automated captions and face-tracking are noticeably crisper than OpusClip.\n\nWe run ToolPulse (https://toolpulse.ai), an independent directory & comparison platform indexing over 40+ top AI tools across 12 categories, currently getting thousands of high-intent search queries from creators looking for "best AI video repurposing".\n\nWe would love to feature Klap in our Video & Animation category with a "Featured Spotlight" pinned at the top + include you in our upcoming "Top AI Video Tools 2026" benchmark guide.\n\nWould you be open to claiming your listing or exploring a featured sponsorship ($149/mo)?\n\nBest,\nToolPulse Partnerships Team`,
  },
  {
    id: 'lead-2',
    toolName: 'Cursorless / Aider',
    category: 'Coding & Dev',
    founderName: 'Paul',
    founderRole: 'Lead Maintainer',
    contactEmail: 'paul@aider.chat',
    website: 'https://aider.chat',
    pitchAngle: 'Terminal-based AI pair programming competing with Cursor and Copilot',
    monthlyRevenueEstimate: '$25,000 MRR',
    customPitchSubject: 'Featuring Aider alongside Cursor on ToolPulse (Dev audience)',
    customPitchBody: `Hi Paul,\n\nHuge fan of Aider—the terminal-native git commit integration and benchmark score on SWE-bench are incredible.\n\nWe run ToolPulse (https://toolpulse.ai), where our "Cursor vs Windsurf vs Copilot" comparison guide is currently driving substantial dev traffic from engineers looking for high-autonomy coding tools.\n\nWe want to add Aider as the top recommended open-source alternative for developers who prefer CLI workflows.\n\nWould you like us to set up your verified profile and featured spotlight?\n\nCheers,\nToolPulse Team`,
  },
  {
    id: 'lead-3',
    toolName: 'Taplio',
    category: 'Sales & Outreach',
    founderName: 'Tom',
    founderRole: 'Co-Founder',
    contactEmail: 'tom@taplio.com',
    website: 'https://taplio.com',
    pitchAngle: 'AI LinkedIn growth and outbound lead generation',
    monthlyRevenueEstimate: '$120,000 MRR',
    customPitchSubject: 'ToolPulse feature placement: Taplio for LinkedIn B2B Founders',
    customPitchBody: `Hi Tom,\n\nWe've been tracking Taplio's growth and love how smoothly it handles viral post hooks and analytics for founders.\n\nOn ToolPulse (https://toolpulse.ai), our B2B Sales & Outreach hub connects thousands of solopreneurs with growth software. We are currently featuring Instantly and Apollo, and Taplio is the missing piece for our LinkedIn lead-gen comparisons.\n\nWe can lock in a Featured Spotlight badge for Taplio to capture outbound intent directly.\n\nLet me know if you'd like to feature Taplio this month!\n\nBest,\nToolPulse Partnerships`,
  },
  {
    id: 'lead-4',
    toolName: 'AudioPen',
    category: 'Productivity',
    founderName: 'Louis',
    founderRole: 'Founder',
    contactEmail: 'louis@audiopen.ai',
    website: 'https://audiopen.ai',
    pitchAngle: 'Voice-to-text notes and structured brain-dump summaries',
    monthlyRevenueEstimate: '$30,000 MRR',
    customPitchSubject: 'Adding AudioPen to ToolPulse Voice & Productivity Directory',
    customPitchBody: `Hi Louis,\n\nAudioPen is genuinely one of the cleanest, highest-utility AI voice tools we've tested—the summarization accuracy turns unstructured rambling into pristine essays.\n\nWe would love to feature AudioPen on ToolPulse (https://toolpulse.ai) in our Voice & Audio and Productivity directories, including a dedicated review page and comparison against standard speech-to-text apps.\n\nWould you be open to a featured founder spotlight to drive targeted organic search traffic to AudioPen?\n\nBest,\nToolPulse Growth Team`,
  },
  {
    id: 'lead-5',
    toolName: 'Bolt.new by StackBlitz',
    category: 'Coding & Dev',
    founderName: 'Eric',
    founderRole: 'CEO',
    contactEmail: 'eric@stackblitz.com',
    website: 'https://bolt.new',
    pitchAngle: 'In-browser full-stack AI app development competing with Lovable and v0',
    monthlyRevenueEstimate: 'Seed funded / Rapid Growth',
    customPitchSubject: 'Featuring Bolt.new in ToolPulse AI Developer Directory',
    customPitchBody: `Hi Eric,\n\nBolt.new's WebContainers in-browser execution has completely changed how quickly developers scaffold full-stack Node/React applications.\n\nWe're expanding the Coding & Dev directory on ToolPulse (https://toolpulse.ai) with an upcoming benchmark: "Bolt.new vs Lovable vs v0: Which AI Full-Stack Builder is Best?".\n\nWe'd love to make sure Bolt.new has an official verified badge, accurate pricing tiers, and direct trial links.\n\nLet us know if you'd like to claim your listing!\n\nBest,\nToolPulse Engineering`,
  },
];
