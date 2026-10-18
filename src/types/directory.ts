export type PricingTier = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export type ToolCategory =
  | 'Copywriting'
  | 'Image & Art'
  | 'Video & Animation'
  | 'Coding & Dev'
  | 'Productivity'
  | 'Voice & Audio'
  | 'Sales & Outreach'
  | 'Research & Search';

export interface AITool {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: ToolCategory;
  pricingTier: PricingTier;
  startingPrice: string;
  rating: number; // e.g. 4.8
  reviewsCount: number;
  websiteUrl: string;
  affiliateUrl: string;
  logoUrl?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  description: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  verifiedMonthYear: string;
  alternatives: string[]; // IDs or names of alternative tools
}

export interface ComparisonPair {
  toolA: AITool;
  toolB: AITool;
  verdict: string;
  winner: string;
}

export interface SubmissionPayload {
  toolName: string;
  websiteUrl: string;
  category: ToolCategory;
  pricingTier: PricingTier;
  tagline: string;
  email: string;
  isSponsored: boolean;
}
