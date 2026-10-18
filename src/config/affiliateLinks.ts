/**
 * ToolPulse Affiliate Link Management
 *
 * HOW THIS WORKS:
 * 1. Sign up for free on software affiliate networks:
 *    - PartnerStack (partnerstack.com) -> Hosts Jasper, Notion, Apollo, etc.
 *    - Rewardful (rewardful.com) -> Hosts HeyGen, Descript, etc.
 *    - Impact.com -> Hosts ElevenLabs, Perplexity, etc.
 * 2. When accepted, replace the placeholder IDs below with your real referral links.
 * 3. Every visitor who clicks and subscribes pays you recurring commissions automatically!
 */

export const AFFILIATE_CONFIG: Record<string, { partnerNetwork: string; commissionRate: string; url: string }> = {
  heygen: {
    partnerNetwork: 'Rewardful',
    commissionRate: '30% recurring monthly',
    url: 'https://heygen.com/?ref=YOUR_AFFILIATE_ID',
  },
  runway: {
    partnerNetwork: 'Direct Partner',
    commissionRate: '25% revenue share',
    url: 'https://runwayml.com/?ref=YOUR_AFFILIATE_ID',
  },
  descript: {
    partnerNetwork: 'PartnerStack',
    commissionRate: '15% recurring',
    url: 'https://descript.com/?ref=YOUR_AFFILIATE_ID',
  },
  cursor: {
    partnerNetwork: 'Direct Partner',
    commissionRate: '20% recurring',
    url: 'https://cursor.com/?ref=YOUR_AFFILIATE_ID',
  },
  jasper: {
    partnerNetwork: 'PartnerStack',
    commissionRate: '30% recurring for life',
    url: 'https://jasper.ai/?ref=YOUR_AFFILIATE_ID',
  },
  elevenlabs: {
    partnerNetwork: 'Rewardful',
    commissionRate: '22% recurring',
    url: 'https://elevenlabs.io/?ref=YOUR_AFFILIATE_ID',
  },
  perplexity: {
    partnerNetwork: 'Impact',
    commissionRate: '$10 - $25 per subscriber',
    url: 'https://perplexity.ai/?ref=YOUR_AFFILIATE_ID',
  },
  instantly: {
    partnerNetwork: 'Rewardful',
    commissionRate: '30% recurring monthly',
    url: 'https://instantly.ai/?ref=YOUR_AFFILIATE_ID',
  },
};
