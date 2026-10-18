export interface AIDeal {
  id: string;
  toolSlug: string;
  toolName: string;
  discountBadge: string;
  dealDescription: string;
  couponCode: string;
  expiryDate: string;
  verifiedSavings: string;
  affiliateUrl: string;
}

export const AI_DEALS: AIDeal[] = [
  {
    id: 'deal-heygen',
    toolSlug: 'heygen',
    toolName: 'HeyGen Video',
    discountBadge: '20% OFF ANNUAL + 5 CREDITS',
    dealDescription: 'Get 20% off any annual creator tier plus 5 free photorealistic avatar generation credits.',
    couponCode: 'TOOLPULSE20',
    expiryDate: 'December 2026',
    verifiedSavings: '$70.00',
    affiliateUrl: 'https://heygen.com/?ref=toolpulse',
  },
  {
    id: 'deal-elevenlabs',
    toolSlug: 'elevenlabs',
    toolName: 'ElevenLabs Voice',
    discountBadge: '10,000 BONUS CHARACTERS',
    dealDescription: 'Exclusive starter perk: 10,000 bonus text-to-speech characters with instant voice cloning access.',
    couponCode: 'PULSEVOICE',
    expiryDate: 'December 2026',
    verifiedSavings: '$22.00',
    affiliateUrl: 'https://elevenlabs.io/?ref=toolpulse',
  },
  {
    id: 'deal-instantly',
    toolSlug: 'instantly-ai',
    toolName: 'Instantly.ai',
    discountBadge: '25% OFF FIRST 3 MONTHS',
    dealDescription: 'Save 25% on Hypergrowth cold email outreach with unlimited warmup email accounts included.',
    couponCode: 'OUTREACH25',
    expiryDate: 'November 2026',
    verifiedSavings: '$58.00',
    affiliateUrl: 'https://instantly.ai/?ref=toolpulse',
  },
  {
    id: 'deal-perplexity',
    toolSlug: 'perplexity',
    toolName: 'Perplexity Pro',
    discountBadge: '$10 OFF PRO TIER',
    dealDescription: 'Unlock Claude 3.5 Sonnet & GPT-4o search engines with unlimited file uploads at a discounted rate.',
    couponCode: 'RESEARCH10',
    expiryDate: 'December 2026',
    verifiedSavings: '$10.00',
    affiliateUrl: 'https://perplexity.ai/?ref=toolpulse',
  },
  {
    id: 'deal-jasper',
    toolSlug: 'jasper-ai',
    toolName: 'Jasper AI',
    discountBadge: '7-DAY FREE TRIAL + 10K WORDS',
    dealDescription: 'Extended enterprise test trial with full SEO mode, brand voice library, and team collaboration.',
    couponCode: 'JASPERPULSE',
    expiryDate: 'December 2026',
    verifiedSavings: '$49.00',
    affiliateUrl: 'https://jasper.ai/?ref=toolpulse',
  },
];
