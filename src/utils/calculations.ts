import {
  FreedomState,
  Liability,
  Milestone,
} from '../types/finance';

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'A$',
  INR: '₹',
  JPY: '¥',
};

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  
  if (absAmount >= 1_000_000) {
    return `${isNegative ? '-' : ''}${symbol}${(absAmount / 1_000_000).toFixed(2)}M`;
  }
  if (absAmount >= 100_000) {
    return `${isNegative ? '-' : ''}${symbol}${(absAmount / 1_000).toFixed(1)}k`;
  }
  return `${isNegative ? '-' : ''}${symbol}${absAmount.toLocaleString('en-US', {
    maximumFractionDigits: 0,
  })}`;
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Aggregation calculations
export function calculateTotals(state: FreedomState) {
  const totalMonthlyIncome = state.incomeStreams.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPassiveIncome = state.incomeStreams
    .filter((stream) => stream.isPassive)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalActiveIncome = totalMonthlyIncome - totalPassiveIncome;

  const totalMonthlyExpenses = state.expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const essentialMonthlyExpenses = state.expenses
    .filter((exp) => exp.necessity === 'essential')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const discretionaryMonthlyExpenses = totalMonthlyExpenses - essentialMonthlyExpenses;

  const monthlyNetCashFlow = Math.max(0, totalMonthlyIncome - totalMonthlyExpenses);
  const savingsRate = totalMonthlyIncome > 0 ? (monthlyNetCashFlow / totalMonthlyIncome) * 100 : 0;

  const totalAssets = state.assets.reduce((acc, curr) => acc + curr.value, 0);
  const liquidAssets = state.assets
    .filter((a) => a.liquidity === 'liquid')
    .reduce((acc, curr) => acc + curr.value, 0);
  const investedAssets = state.assets
    .filter((a) => a.category === 'equities' || a.category === 'crypto' || a.category === 'fixed_income')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalLiabilities = state.liabilities.reduce((acc, curr) => acc + curr.balance, 0);
  const netWorth = totalAssets - totalLiabilities;

  const monthlyRunway = totalMonthlyExpenses > 0 ? liquidAssets / totalMonthlyExpenses : 999;

  // FIRE Targets
  const swr = state.fireConfig.safeWithdrawalRate / 100;
  const annualExpenses = totalMonthlyExpenses * 12;
  const annualEssentialExpenses = essentialMonthlyExpenses * 12;

  // Standard FIRE: 25x annual expenses (assuming 4% SWR)
  const fullFireNumber = swr > 0 ? annualExpenses / swr : 0;
  // Lean FIRE: Essential expenses covered
  const leanFireNumber = swr > 0 ? annualEssentialExpenses / swr : 0;
  // Fat FIRE: 150% standard expenses
  const fatFireNumber = fullFireNumber * (state.fireConfig.fatFireExpenseRatio || 1.5);

  // Coast FIRE: Amount needed right now so that without any further savings,
  // compound interest alone reaches full FIRE at target retirement age.
  const yearsToRetirement = Math.max(1, state.fireConfig.targetRetirementAge - state.fireConfig.currentAge);
  const realReturnRate = (state.fireConfig.expectedInvestmentReturn - state.fireConfig.inflationRate) / 100;
  const coastFireNumber = realReturnRate > 0
    ? fullFireNumber / Math.pow(1 + realReturnRate, yearsToRetirement)
    : fullFireNumber;

  // Percentage progress to Full FIRE
  const fireProgress = fullFireNumber > 0 ? Math.min(100, Math.max(0, (netWorth / fullFireNumber) * 100)) : 0;
  const leanFireProgress = leanFireNumber > 0 ? Math.min(100, Math.max(0, (netWorth / leanFireNumber) * 100)) : 0;
  const coastFireProgress = coastFireNumber > 0 ? Math.min(100, Math.max(0, (netWorth / coastFireNumber) * 100)) : 0;

  // Years until full FIRE with ongoing monthly contributions
  const yearsToFire = calculateYearsToTarget({
    currentNetWorth: Math.max(0, netWorth),
    targetAmount: fullFireNumber,
    monthlyContribution: monthlyNetCashFlow,
    annualReturnRate: state.fireConfig.expectedInvestmentReturn,
    inflationRate: state.fireConfig.inflationRate,
  });

  return {
    totalMonthlyIncome,
    totalPassiveIncome,
    totalActiveIncome,
    totalMonthlyExpenses,
    essentialMonthlyExpenses,
    discretionaryMonthlyExpenses,
    monthlyNetCashFlow,
    savingsRate,
    totalAssets,
    liquidAssets,
    investedAssets,
    totalLiabilities,
    netWorth,
    monthlyRunway,
    annualExpenses,
    annualEssentialExpenses,
    fullFireNumber,
    leanFireNumber,
    fatFireNumber,
    coastFireNumber,
    fireProgress,
    leanFireProgress,
    coastFireProgress,
    yearsToFire,
    yearsToRetirement,
  };
}

// Numerical / analytical compound interest solver to find years to reach target
export function calculateYearsToTarget({
  currentNetWorth,
  targetAmount,
  monthlyContribution,
  annualReturnRate,
  inflationRate,
}: {
  currentNetWorth: number;
  targetAmount: number;
  monthlyContribution: number;
  annualReturnRate: number;
  inflationRate: number;
}): number {
  if (currentNetWorth >= targetAmount) return 0;
  if (monthlyContribution <= 0 && annualReturnRate <= 0) return 99;

  // Real return (Fisher equation or approximation)
  const realRate = (annualReturnRate - inflationRate) / 100;
  const monthlyRealRate = Math.pow(1 + Math.max(-0.5, realRate), 1 / 12) - 1;

  let balance = currentNetWorth;
  let months = 0;
  const maxMonths = 1200; // 100 years cap

  while (balance < targetAmount && months < maxMonths) {
    balance = balance * (1 + monthlyRealRate) + monthlyContribution;
    months++;
  }

  return +(months / 12).toFixed(1);
}

// Trajectory projection array for charts (Year by Year)
export interface ProjectionPoint {
  year: number;
  age: number;
  standardBalance: number;
  acceleratedBalance: number;
  freedomThreshold: number;
  passiveAnnualIncome: number;
}

export function generateProjections(
  state: FreedomState,
  yearsToProject: number = 30,
  acceleratedExtraMonthly: number = 500
): ProjectionPoint[] {
  const totals = calculateTotals(state);
  const realRate = (state.fireConfig.expectedInvestmentReturn - state.fireConfig.inflationRate) / 100;
  const monthlyRealRate = Math.pow(1 + Math.max(-0.5, realRate), 1 / 12) - 1;

  let standardBal = Math.max(0, totals.netWorth);
  let acceleratedBal = Math.max(0, totals.netWorth);
  const standardContribution = totals.monthlyNetCashFlow;
  const acceleratedContribution = standardContribution + acceleratedExtraMonthly;

  const points: ProjectionPoint[] = [];

  for (let y = 0; y <= yearsToProject; y++) {
    const age = state.fireConfig.currentAge + y;
    points.push({
      year: y,
      age,
      standardBalance: Math.round(standardBal),
      acceleratedBalance: Math.round(acceleratedBal),
      freedomThreshold: Math.round(totals.fullFireNumber),
      passiveAnnualIncome: Math.round(standardBal * (state.fireConfig.safeWithdrawalRate / 100)),
    });

    for (let m = 0; m < 12; m++) {
      standardBal = standardBal * (1 + monthlyRealRate) + standardContribution;
      acceleratedBal = acceleratedBal * (1 + monthlyRealRate) + acceleratedContribution;
    }
  }

  return points;
}

// Monte Carlo Simulation
export interface MonteCarloScenario {
  percentile: 'p10_bear' | 'p50_median' | 'p90_bull';
  values: number[];
}

export function runMonteCarloSimulations(
  state: FreedomState,
  years: number = 25,
  simulationsCount: number = 300
): {
  successRate: number;
  bearPath: number[];
  medianPath: number[];
  bullPath: number[];
} {
  const totals = calculateTotals(state);
  const meanReturn = state.fireConfig.expectedInvestmentReturn / 100;
  const stdDev = 0.15; // 15% standard deviation for diversified equity portfolio
  const inflation = state.fireConfig.inflationRate / 100;
  const startCapital = Math.max(1000, totals.netWorth);
  const annualSavings = totals.monthlyNetCashFlow * 12;
  const target = totals.fullFireNumber;

  const allSims: number[][] = [];
  let successfulSims = 0;

  for (let s = 0; s < simulationsCount; s++) {
    const trajectory = [startCapital];
    let capital = startCapital;
    let hitTarget = false;

    for (let y = 1; y <= years; y++) {
      // Box-Muller transform for normal distribution
      const u1 = Math.random();
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
      const simulatedReturn = meanReturn + z0 * stdDev;
      const realReturn = (1 + simulatedReturn) / (1 + inflation) - 1;

      capital = capital * (1 + realReturn) + annualSavings;
      if (capital < 0) capital = 0;
      trajectory.push(capital);

      if (capital >= target) hitTarget = true;
    }

    if (hitTarget || capital >= target) {
      successfulSims++;
    }
    allSims.push(trajectory);
  }

  // Calculate percentiles at each year
  const bearPath: number[] = [];
  const medianPath: number[] = [];
  const bullPath: number[] = [];

  for (let y = 0; y <= years; y++) {
    const valuesAtYear = allSims.map((sim) => sim[y]).sort((a, b) => a - b);
    const p10 = valuesAtYear[Math.floor(simulationsCount * 0.1)];
    const p50 = valuesAtYear[Math.floor(simulationsCount * 0.5)];
    const p90 = valuesAtYear[Math.floor(simulationsCount * 0.9)];

    bearPath.push(Math.round(p10));
    medianPath.push(Math.round(p50));
    bullPath.push(Math.round(p90));
  }

  return {
    successRate: Math.round((successfulSims / simulationsCount) * 100),
    bearPath,
    medianPath,
    bullPath,
  };
}

// Debt Payoff (Avalanche vs Snowball)
export interface DebtPayoffResult {
  strategy: 'avalanche' | 'snowball';
  monthsToDebtFree: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  monthlyHistory: {
    month: number;
    remainingBalance: number;
    interestPaidMonth: number;
  }[];
}

export function calculateDebtPayoff(
  debts: Liability[],
  extraMonthlyPayment: number = 0,
  strategy: 'avalanche' | 'snowball' = 'avalanche'
): DebtPayoffResult {
  if (debts.length === 0) {
    return {
      strategy,
      monthsToDebtFree: 0,
      totalInterestPaid: 0,
      totalPrincipalPaid: 0,
      monthlyHistory: [],
    };
  }

  // Clone debt list
  const activeDebts = debts.map((d) => ({
    ...d,
    currentBalance: d.balance,
  }));

  // Sort: Avalanche = Highest APR first; Snowball = Lowest balance first
  activeDebts.sort((a, b) => {
    if (strategy === 'avalanche') {
      return b.interestRate - a.interestRate;
    }
    return a.currentBalance - b.currentBalance;
  });

  const totalMinPayments = activeDebts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalBudget = totalMinPayments + extraMonthlyPayment;

  let totalInterest = 0;
  let totalPrincipal = activeDebts.reduce((sum, d) => sum + d.balance, 0);
  let month = 0;
  const maxMonths = 360; // 30 years cap
  const monthlyHistory: { month: number; remainingBalance: number; interestPaidMonth: number }[] = [];

  while (activeDebts.some((d) => d.currentBalance > 0.01) && month < maxMonths) {
    month++;
    let monthInterest = 0;
    let availableCash = totalBudget;

    // 1. Accrue interest & pay minimums
    for (const debt of activeDebts) {
      if (debt.currentBalance <= 0) continue;

      const monthlyRate = debt.interestRate / 100 / 12;
      const interest = debt.currentBalance * monthlyRate;
      debt.currentBalance += interest;
      monthInterest += interest;
      totalInterest += interest;

      const minToPay = Math.min(debt.currentBalance, debt.minimumPayment);
      debt.currentBalance -= minToPay;
      availableCash -= minToPay;
    }

    // 2. Direct extra cash towards target debt in sorted priority order
    for (const debt of activeDebts) {
      if (debt.currentBalance <= 0 || availableCash <= 0) continue;

      const extraPay = Math.min(debt.currentBalance, availableCash);
      debt.currentBalance -= extraPay;
      availableCash -= extraPay;
    }

    const currentTotalBalance = activeDebts.reduce((sum, d) => sum + Math.max(0, d.currentBalance), 0);
    monthlyHistory.push({
      month,
      remainingBalance: Math.round(currentTotalBalance),
      interestPaidMonth: Math.round(monthInterest),
    });
  }

  return {
    strategy,
    monthsToDebtFree: month,
    totalInterestPaid: Math.round(totalInterest),
    totalPrincipalPaid: Math.round(totalPrincipal),
    monthlyHistory,
  };
}

// 7 Stages of Financial Freedom definition
export function getFreedomLadderMilestones(state: FreedomState): Milestone[] {
  const totals = calculateTotals(state);
  const currentNetWorth = totals.netWorth;
  const emergencyFundTarget = totals.essentialMonthlyExpenses * 6; // 6 months emergency fund

  return [
    {
      id: 'clarity',
      level: 1,
      title: 'Financial Clarity',
      tagline: 'Awareness of Cash Flow',
      description: 'Know your exact net worth, all income streams, and stop money leaks.',
      thresholdFormula: 'Active tracking & positive monthly cash flow',
      targetAmount: 0,
      isReached: totals.monthlyNetCashFlow > 0,
      icon: 'Eye',
    },
    {
      id: 'debt_free',
      level: 2,
      title: 'Debt Elimination',
      tagline: 'Breaking the Chains of Interest',
      description: 'Pay off all non-mortgage, high-interest consumer debt (>6% APR).',
      thresholdFormula: 'High-interest consumer debt = $0',
      targetAmount: totals.totalLiabilities,
      isReached: totals.totalLiabilities === 0,
      icon: 'ShieldCheck',
    },
    {
      id: 'runway',
      level: 3,
      title: 'Ironclad Runway',
      tagline: '6 Months of F-You Money',
      description: 'A fully funded liquid emergency reserve that buys time and peace of mind.',
      thresholdFormula: '6x Essential Monthly Expenses',
      targetAmount: emergencyFundTarget,
      isReached: totals.liquidAssets >= emergencyFundTarget,
      icon: 'Anchor',
    },
    {
      id: 'coast_fire',
      level: 4,
      title: 'Coast FIRE',
      tagline: 'Compound Growth Takeover',
      description: 'Your existing investments will grow to fund full retirement at age 65 without saving another penny.',
      thresholdFormula: 'Target FIRE / (1 + r)^Years',
      targetAmount: Math.round(totals.coastFireNumber),
      isReached: currentNetWorth >= totals.coastFireNumber,
      icon: 'Sailboat',
    },
    {
      id: 'lean_fire',
      level: 5,
      title: 'Lean FIRE',
      tagline: 'Basic Survival Security',
      description: 'Investments generate enough passive income to cover basic living needs forever.',
      thresholdFormula: '25x Annual Essential Expenses',
      targetAmount: Math.round(totals.leanFireNumber),
      isReached: currentNetWorth >= totals.leanFireNumber,
      icon: 'BatteryCharging',
    },
    {
      id: 'full_fire',
      level: 6,
      title: 'Financial Independence',
      tagline: 'Work Becomes 100% Optional',
      description: 'Investments cover 100% of your current standard of living perpetually at a 4% safe withdrawal rate.',
      thresholdFormula: '25x Current Total Annual Expenses',
      targetAmount: Math.round(totals.fullFireNumber),
      isReached: currentNetWorth >= totals.fullFireNumber,
      icon: 'Award',
    },
    {
      id: 'fat_fire',
      level: 7,
      title: 'Abundance & Fat FIRE',
      tagline: 'Generational Wealth & Luxury',
      description: 'Complete abundance with 150%+ of your standard lifestyle, philanthropy, and freedom to fund any ambition.',
      thresholdFormula: '1.5x Full FIRE Number',
      targetAmount: Math.round(totals.fatFireNumber),
      isReached: currentNetWorth >= totals.fatFireNumber,
      icon: 'Crown',
    },
  ];
}
