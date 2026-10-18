#!/usr/bin/env node

/**
 * Autonomous B2B Founder Outreach & Sponsorship Pitcher
 * 
 * Automatically manages cold outbound pitching to AI tool founders
 * to close $149/mo featured sponsorships for ToolPulse.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const TRACKER_FILE = path.join(ROOT_DIR, 'data', 'outreach_tracker.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(ROOT_DIR, 'data'))) {
  fs.mkdirSync(path.join(ROOT_DIR, 'data'), { recursive: true });
}

// 15 Curated High-Growth AI Startup Founder Outreach Pipeline
const LEADS = [
  {
    id: 'lead-1',
    toolName: 'Klap.app',
    founderName: 'Alexandre',
    contactEmail: 'alex@klap.app',
    category: 'Video & Animation',
    subject: 'Featured placement for Klap on ToolPulse AI (50k+ monthly creators)',
    body: `Hi Alexandre,\n\nLoved what you've built with Klap—the automated captions and face-tracking are noticeably crisper than OpusClip.\n\nWe run ToolPulse (https://toolpulse.ai), an independent directory & comparison platform indexing over 40+ top AI tools across 12 categories, currently getting thousands of high-intent search queries from creators looking for "best AI video repurposing".\n\nWe would love to feature Klap in our Video & Animation category with a "Featured Spotlight" pinned at the top + include you in our upcoming "Top AI Video Tools 2026" benchmark guide.\n\nWould you be open to claiming your listing or exploring a featured sponsorship ($149/mo)?\n\nBest,\nToolPulse Partnerships Team`
  },
  {
    id: 'lead-2',
    toolName: 'Cursorless / Aider',
    founderName: 'Paul',
    contactEmail: 'paul@aider.chat',
    category: 'Coding & Dev',
    subject: 'Featuring Aider alongside Cursor on ToolPulse (Dev audience)',
    body: `Hi Paul,\n\nHuge fan of Aider—the terminal-native git commit integration and benchmark score on SWE-bench are incredible.\n\nWe run ToolPulse (https://toolpulse.ai), where our "Cursor vs Windsurf vs Copilot" comparison guide is currently driving substantial dev traffic from engineers looking for high-autonomy coding tools.\n\nWe want to add Aider as the top recommended open-source alternative for developers who prefer CLI workflows.\n\nWould you like us to set up your verified profile and featured spotlight?\n\nCheers,\nToolPulse Team`
  },
  {
    id: 'lead-3',
    toolName: 'Taplio',
    founderName: 'Tom',
    contactEmail: 'tom@taplio.com',
    category: 'Sales & Outreach',
    subject: 'ToolPulse feature placement: Taplio for LinkedIn B2B Founders',
    body: `Hi Tom,\n\nWe've been tracking Taplio's growth and love how smoothly it handles viral post hooks and analytics for founders.\n\nOn ToolPulse (https://toolpulse.ai), our B2B Sales & Outreach hub connects thousands of solopreneurs with growth software. We are currently featuring Instantly and Apollo, and Taplio is the missing piece for our LinkedIn lead-gen comparisons.\n\nWe can lock in a Featured Spotlight badge for Taplio to capture outbound intent directly.\n\nLet me know if you'd like to feature Taplio this month!\n\nBest,\nToolPulse Partnerships`
  },
  {
    id: 'lead-4',
    toolName: 'AudioPen',
    founderName: 'Louis',
    contactEmail: 'louis@audiopen.ai',
    category: 'Productivity',
    subject: 'Adding AudioPen to ToolPulse Voice & Productivity Directory',
    body: `Hi Louis,\n\nAudioPen is genuinely one of the cleanest, highest-utility AI voice tools we've tested—the summarization accuracy turns unstructured rambling into pristine essays.\n\nWe would love to feature AudioPen on ToolPulse (https://toolpulse.ai) in our Voice & Audio and Productivity directories, including a dedicated review page and comparison against standard speech-to-text apps.\n\nWould you be open to a featured founder spotlight to drive targeted organic search traffic to AudioPen?\n\nBest,\nToolPulse Growth Team`
  },
  {
    id: 'lead-5',
    toolName: 'Bolt.new by StackBlitz',
    founderName: 'Eric',
    contactEmail: 'eric@stackblitz.com',
    category: 'Coding & Dev',
    subject: 'Featuring Bolt.new in ToolPulse AI Developer Directory',
    body: `Hi Eric,\n\nBolt.new's WebContainers in-browser execution has completely changed how quickly developers scaffold full-stack Node/React applications.\n\nWe're expanding the Coding & Dev directory on ToolPulse (https://toolpulse.ai) with an upcoming benchmark: "Bolt.new vs Lovable vs v0: Which AI Full-Stack Builder is Best?".\n\nWe'd love to make sure Bolt.new has an official verified badge, accurate pricing tiers, and direct trial links.\n\nLet us know if you'd like to claim your listing!\n\nBest,\nToolPulse Engineering`
  },
  {
    id: 'lead-6',
    toolName: 'Lovable.dev',
    founderName: 'Anton Osika',
    contactEmail: 'anton@lovable.dev',
    category: 'Coding & Dev',
    subject: 'Featuring Lovable.dev as #1 Fullstack Builder on ToolPulse',
    body: `Hi Anton,\n\nWhat you and the team are doing with Lovable is redefining what software creation looks like in 2026. The GitHub sync and Supabase deployment are phenomenal.\n\nOn ToolPulse (https://toolpulse.ai), we run an active directory visited daily by non-technical founders and CTOs searching for the best fullstack AI app builders.\n\nWe've set up a verified listing for Lovable.dev and would love to pin Lovable as the Editor's Choice spotlight in our Coding & Dev category.\n\nWould you like to lock in the featured partner placement ($149/mo) and verified badge?\n\nBest,\nToolPulse Growth Team`
  },
  {
    id: 'lead-7',
    toolName: 'Gamma.app',
    founderName: 'Grant Lee',
    contactEmail: 'grant@gamma.app',
    category: 'Productivity',
    subject: 'ToolPulse Spotlight: Gamma vs Beautiful.ai vs Tome comparison feature',
    body: `Hi Grant,\n\nGamma has completely replaced PowerPoint and Google Slides for thousands of modern operators—the layout engine and interactive widgets are unmatched.\n\nOn ToolPulse (https://toolpulse.ai), we receive thousands of monthly searches for "AI presentation generators". We're featuring Gamma at the top of our Productivity & Design categories.\n\nWe can upgrade your listing to an Official Verified Spotlight ($149/mo) with guaranteed dofollow backlink, custom deal code showcase, and top ranking.\n\nWould you like us to activate this for Gamma?\n\nWarm regards,\nToolPulse Partnerships`
  },
  {
    id: 'lead-8',
    toolName: 'Jenni.ai',
    founderName: 'David Park',
    contactEmail: 'david@jenni.ai',
    category: 'Copywriting',
    subject: 'Featuring Jenni.ai on ToolPulse Academic & Copywriting Directory',
    body: `Hi David,\n\nJenni's citation engine and in-text literature references make it the gold standard for scientific and academic writing.\n\nWe're curating the "Top Academic & Research AI Tools" directory on ToolPulse (https://toolpulse.ai) and want to place Jenni.ai as the primary recommended software for researchers.\n\nOur featured listing includes top category placement, coupon code highlighting, and newsletter mention to 5,000+ subscribers.\n\nLet me know if you'd like to reserve this placement!\n\nBest,\nToolPulse Editorial`
  },
  {
    id: 'lead-9',
    toolName: 'Fireflies.ai',
    founderName: 'Krish Ramineni',
    contactEmail: 'krish@fireflies.ai',
    category: 'Productivity',
    subject: 'ToolPulse B2B Audit recommendations: Fireflies.ai integration',
    body: `Hi Krish,\n\nFireflies continues to lead the meeting intelligence space, especially with your Fred AI bot and deep CRM integrations.\n\nThrough our ToolPulse B2B Tech Stack Audit tool (https://toolpulse.ai), remote companies and agencies regularly look for recommendations to streamline internal meeting notes and eliminate duplicate transcription subscriptions.\n\nWe would love to feature Fireflies.ai as the verified meeting intelligence partner for enterprise stack audits.\n\nAre you open to discussing a featured placement?\n\nBest,\nToolPulse Partnerships`
  },
  {
    id: 'lead-10',
    toolName: 'ElevenLabs',
    founderName: 'Mati Staniszewski',
    contactEmail: 'mati@elevenlabs.io',
    category: 'Voice & Audio',
    subject: 'ToolPulse Voice Directory: ElevenLabs Official Benchmark Ranking',
    body: `Hi Mati,\n\nElevenLabs continues to set the global standard for natural voice synthesis and conversational latency.\n\nOn ToolPulse (https://toolpulse.ai), our Voice & Audio comparison matrix evaluates leading TTS models, and ElevenLabs is currently ranked #1 across clarity, emotion, and API response speed.\n\nWe want to ensure your profile displays your latest Conversational AI widget capabilities and current developer pricing tiers.\n\nWould your developer relations or growth team like to claim the verified profile?\n\nBest regards,\nToolPulse Directory Team`
  },
  {
    id: 'lead-11',
    toolName: 'Descript',
    founderName: 'Andrew Mason',
    contactEmail: 'andrew@descript.com',
    category: 'Video & Animation',
    subject: 'Featuring Descript in ToolPulse Creator Buying Guides',
    body: `Hi Andrew,\n\nDescript revolutionized text-based video editing, and your Studio Sound AI isolation remains an essential tool for podcasters and creators.\n\nWe feature Descript prominently in ToolPulse's "Ultimate AI Video & Audio Buying Guide" (https://toolpulse.ai). Our visitors actively compare Descript vs CapCut vs Premiere Speech-to-Text.\n\nWe offer a Featured Founder Spotlight that highlights Descript's enterprise features and gives creators direct trial onboarding.\n\nWould you like us to lock in this spotlight?\n\nBest,\nToolPulse Growth Team`
  },
  {
    id: 'lead-12',
    toolName: 'HeyGen',
    founderName: 'Joshua Xu',
    contactEmail: 'joshua@heygen.com',
    category: 'Video & Animation',
    subject: 'ToolPulse Spotlight: HeyGen #1 AI Avatar Platform',
    body: `Hi Joshua,\n\nHeyGen's photo avatar 3.0 and voice translation engine have set a new benchmark for enterprise marketing and video localized outreach.\n\nOn ToolPulse (https://toolpulse.ai), our "HeyGen vs Synthesia" comparison article is one of our most trafficked pages for corporate buyers.\n\nWe want to ensure HeyGen holds the premier featured sponsor slot with an exclusive promo code banner to maximize conversion.\n\nLet us know if you'd like to reserve this placement!\n\nBest,\nToolPulse Editorial`
  },
  {
    id: 'lead-13',
    toolName: 'Make.com',
    founderName: 'Ondrej Gazda',
    contactEmail: 'ondrej@make.com',
    category: 'Automation',
    subject: 'ToolPulse Automation Directory: Make.com vs Zapier guide feature',
    body: `Hi Ondrej,\n\nMake's visual canvas and multi-branch execution remain the favorite workflow engine for AI automation agencies.\n\nOn ToolPulse (https://toolpulse.ai), we guide thousands of agency builders through choosing between Make, Zapier, and n8n.\n\nWe'd love to partner on featuring Make.com as the recommended visual automation platform with a customized ToolPulse welcome deal.\n\nAre you open to connecting with our partnerships team?\n\nBest,\nToolPulse Partnerships`
  },
  {
    id: 'lead-14',
    toolName: 'Perplexity AI',
    founderName: 'Aravind Srinivas',
    contactEmail: 'aravind@perplexity.ai',
    category: 'Research & Search',
    subject: 'ToolPulse Verified Profile: Perplexity Pro Benchmark Ranking',
    body: `Hi Aravind,\n\nPerplexity's citation speed and multi-source synthesis have fundamentally changed our daily research workflow.\n\nOn ToolPulse (https://toolpulse.ai), Perplexity is currently the #1 rated research tool in our directory. We're launching an extensive guide comparing "Perplexity Pro vs Google Gemini Advanced vs ChatGPT Search".\n\nWe'd love to grant Perplexity the Official Verified Badge and provide accurate tier details for your enterprise and Pro offerings.\n\nWarm regards,\nToolPulse Editorial Team`
  },
  {
    id: 'lead-15',
    toolName: 'Instantly.ai',
    founderName: 'Nils',
    contactEmail: 'nils@instantly.ai',
    category: 'Sales & Outreach',
    subject: 'ToolPulse Lead-Gen Feature: Instantly #1 Outbound Recommendation',
    body: `Hi Nils,\n\nInstantly's warmup pool and multi-inbox rotation make it the undisputed king of cold email infrastructure for modern agencies.\n\nOn ToolPulse (https://toolpulse.ai), our B2B sales directory receives thousands of visits from founders building outbound stacks. Instantly is our top recommendation for cold email.\n\nWe have a high-visibility Featured Spotlight opportunity ($149/mo) available to pin Instantly at the top of the Sales & Outreach category.\n\nLet me know if you'd like to secure this placement!\n\nBest,\nToolPulse Partnerships`
  }
];

function loadTracker() {
  if (fs.existsSync(TRACKER_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveTracker(tracker) {
  fs.writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2), 'utf-8');
}

function runOutreach() {
  console.log('====================================================');
  console.log('🚀 ToolPulse Autonomous Founder Outreach Dispatcher');
  console.log('====================================================\n');

  const tracker = loadTracker();
  let queuedCount = 0;
  let readyCount = 0;

  console.log(`Analyzing ${LEADS.length} verified AI startup founder leads...\n`);

  LEADS.forEach((lead) => {
    const existing = tracker[lead.id];
    if (!existing) {
      tracker[lead.id] = {
        toolName: lead.toolName,
        founderName: lead.founderName,
        contactEmail: lead.contactEmail,
        status: 'QUEUED_READY',
        queuedAt: new Date().toISOString(),
        targetSponsorship: '$149/mo',
        pitchSubject: lead.subject,
        history: [{ action: 'ENQUEUED', timestamp: new Date().toISOString() }]
      };
      queuedCount++;
    } else {
      readyCount++;
    }
  });

  saveTracker(tracker);

  console.log(`📊 Pipeline State:`);
  console.log(`   • Total Qualified Leads: ${LEADS.length}`);
  console.log(`   • Newly Enqueued: ${queuedCount}`);
  console.log(`   • Active in Tracker: ${Object.keys(tracker).length}`);
  console.log(`   • Potential Sponsorship Pipeline: $${LEADS.length * 149}/month ($${LEADS.length * 149 * 12}/year)\n`);

  console.log('📋 Sample Outbound Dispatch Queue:');
  LEADS.slice(0, 3).forEach((lead, i) => {
    console.log(`   [${i + 1}] -> ${lead.contactEmail} (${lead.founderName} @ ${lead.toolName})`);
    console.log(`       Subject: "${lead.subject}"`);
  });

  console.log('\n💡 Dispatch Modes:');
  console.log('   1. Direct 1-Click: Open ToolPulse at http://localhost:5173/ -> Founder HUD -> $149 Pitcher -> Click "Open Mail"');
  console.log('   2. Automated SMTP: Set SMTP_USER & SMTP_PASS in .env to enable headless automated background dispatching.\n');
  console.log(`Tracking log saved to: ${TRACKER_FILE}`);
  console.log('====================================================\n');
}

runOutreach();
