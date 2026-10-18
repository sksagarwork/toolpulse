export type PricingModel = 'subscription' | 'one_time' | 'usage';

export interface SubscriptionTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  stripePaymentUrl?: string;
  isPopular?: boolean;
}

export interface SaaSProduct {
  id: string;
  name: string;
  tagline: string;
  niche: string;
  monthlyPricing: number;
  churnRateMonthly: number; // e.g. 5%
  tiers: SubscriptionTier[];
}

export interface GeneratedAssetOutput {
  id: string;
  type: 'cold_email' | 'viral_hook' | 'linkedin_pitch' | 'landing_page_headline';
  title: string;
  content: string;
  metricsEstimated: string;
}

export interface TrafficChannel {
  name: string;
  category: 'directory' | 'community' | 'seo' | 'social';
  url: string;
  domainAuthority?: number;
  instructions: string;
  isCompleted: boolean;
}

export interface PassiveVehicle {
  id: string;
  title: string;
  tagline: string;
  margin: string;
  maintenanceHoursPerMonth: number;
  initialBuildTimeDays: number;
  potentialMRR: string;
  techStack: string[];
  description: string;
  stepByStepLaunch: string[];
}
