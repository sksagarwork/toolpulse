export interface ProgrammaticPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  targetKeyword: string;
  monthlySearchVolume: number;
  keywordDifficulty: number; // 0 - 100
  sampleData: Record<string, string | number>;
}

export interface SEODataset {
  id: string;
  name: string;
  description: string;
  totalEntities: number;
  estimatedMonthlyTraffic: string;
  monetizationType: 'affiliate' | 'display_ads' | 'saas_freemium' | 'sponsored_listing';
  pages: ProgrammaticPage[];
}

export interface TrafficProjectionPoint {
  month: number;
  organicVisits: number;
  adRevenue: number;
  affiliateRevenue: number;
  saasRevenue: number;
  totalMonthlyRevenue: number;
  cumulativeAssetValuation: number; // Estimated 35x monthly multiple
}

export interface ViralTool {
  id: string;
  name: string;
  purpose: string;
  backlinkHook: string;
  embedCode: string;
  estimatedSharesPerMonth: number;
}
