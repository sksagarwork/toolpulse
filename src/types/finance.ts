export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'INR' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateToUSD: number; // For multi-currency conversion if needed
}

export type IncomeType = 'salary' | 'business' | 'freelance' | 'dividend' | 'rental' | 'side_hustle' | 'other';

export interface IncomeStream {
  id: string;
  name: string;
  amount: number; // monthly
  type: IncomeType;
  isPassive: boolean;
  growthRateAnnual: number; // expected % growth per year
}

export type ExpenseCategoryType = 'housing' | 'food' | 'transport' | 'utilities' | 'healthcare' | 'entertainment' | 'subscriptions' | 'debt_payment' | 'other';
export type ExpenseNecessity = 'essential' | 'discretionary';

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number; // monthly
  category: ExpenseCategoryType;
  necessity: ExpenseNecessity; // For calculating Lean FIRE (essential only) vs Fat FIRE
}

export type AssetCategory = 'cash' | 'equities' | 'real_estate' | 'crypto' | 'fixed_income' | 'business' | 'other';

export interface Asset {
  id: string;
  name: string;
  value: number;
  category: AssetCategory;
  expectedReturnRate: number; // annual % (e.g. 8 for S&P 500)
  liquidity: 'liquid' | 'semi-liquid' | 'illiquid';
}

export interface Liability {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // APR %
  minimumPayment: number; // monthly
  actualPayment: number; // monthly payment user is making
}

export interface FIREConfig {
  currentAge: number;
  targetRetirementAge: number;
  safeWithdrawalRate: number; // e.g. 4.0%
  expectedInvestmentReturn: number; // e.g. 8.0%
  inflationRate: number; // e.g. 2.5%
  leanFireExpenseRatio: number; // e.g. 0.7 (70% of standard expenses)
  fatFireExpenseRatio: number; // e.g. 1.5 (150% of standard expenses)
  targetAnnualExpenseInRetirement?: number; // optional custom retirement spend
}

export interface Milestone {
  id: string;
  level: number;
  title: string;
  tagline: string;
  description: string;
  thresholdFormula: string;
  targetAmount: number;
  isReached: boolean;
  reachedDate?: string;
  icon: string;
}

export interface WealthHabit {
  id: string;
  title: string;
  category: 'income' | 'savings' | 'investing' | 'mindset' | 'tax';
  frequency: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  streak: number;
  impactScore: 1 | 2 | 3; // 1 = good, 3 = massive wealth accelerant
}

export interface FreedomState {
  currency: CurrencyCode;
  fireConfig: FIREConfig;
  incomeStreams: IncomeStream[];
  expenses: ExpenseItem[];
  assets: Asset[];
  liabilities: Liability[];
  habits: WealthHabit[];
  lastUpdated: string;
}
