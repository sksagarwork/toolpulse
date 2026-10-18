import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateTotals, formatCurrency, formatPercent } from '../../utils/calculations';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Clock,
  Coins,
  Flame,
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { state } = useFinance();
  const totals = calculateTotals(state);

  const passiveCoverageRatio =
    totals.totalMonthlyExpenses > 0 ? (totals.totalPassiveIncome / totals.totalMonthlyExpenses) * 100 : 0;

  // Determine dynamic "CFO Recommendation"
  const highestAprDebt = [...state.liabilities].sort((a, b) => b.interestRate - a.interestRate)[0];
  let recommendation = {
    title: 'Scale High-Leverage Income & Capital Accumulation',
    description: `You have no high-interest debt and an emergency runway of ${totals.monthlyRunway.toFixed(1)} months. Focus on expanding side-hustle revenue and dollar-cost averaging into diversified index funds.`,
    actionText: 'Tune FIRE Projection',
    targetTab: 'simulator',
    type: 'success',
  };

  if (highestAprDebt && highestAprDebt.interestRate > 10) {
    recommendation = {
      title: `Eliminate High-Interest Debt: ${highestAprDebt.name}`,
      description: `Paying off this ${highestAprDebt.interestRate}% APR balance delivers an immediate, guaranteed, risk-free return of ${highestAprDebt.interestRate}%. Funnel extra monthly cash flow here first.`,
      actionText: 'Execute Debt Payoff',
      targetTab: 'debt',
      type: 'warning',
    };
  } else if (totals.monthlyRunway < 3) {
    recommendation = {
      title: 'Strengthen Liquid Emergency Buffer',
      description: `Your emergency reserve covers ${totals.monthlyRunway.toFixed(1)} months. Build this to at least 3 to 6 months ($${Math.round(totals.essentialMonthlyExpenses * 3).toLocaleString()}) to prevent forced liquidation during market downturns.`,
      actionText: 'Inspect Liquid Assets',
      targetTab: 'portfolio',
      type: 'warning',
    };
  } else if (totals.savingsRate < 35) {
    recommendation = {
      title: 'Accelerate Monthly Savings Rate',
      description: `Current savings rate is ${formatPercent(totals.savingsRate)}. Increasing your savings rate to 50% can cut your retirement horizon by over 5 to 10 years!`,
      actionText: 'Optimize Cash Flow',
      targetTab: 'cashflow',
      type: 'info',
    };
  }

  return (
    <div className="space-y-6">
      {/* Hero Freedom Progress Card */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs tracking-wider uppercase mb-1">
                <Flame className="w-4 h-4 animate-pulse" />
                <span>The Freedom Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatPercent(totals.fireProgress)} To Financial Freedom
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Freedom Number: <span className="font-semibold text-white">{formatCurrency(totals.fullFireNumber, state.currency)}</span> (based on {formatCurrency(totals.annualExpenses, state.currency)}/yr spend & {state.fireConfig.safeWithdrawalRate}% SWR)
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-950/60 border border-slate-800 rounded-xl p-3 px-4 backdrop-blur-md">
              <Clock className="w-8 h-8 text-teal-400" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Estimated Time Left</span>
                <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">
                  {totals.yearsToFire <= 0 ? '0 Years — Free!' : `${totals.yearsToFire} Years`}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Current Net Worth: <strong className="text-white">{formatCurrency(totals.netWorth, state.currency)}</strong></span>
              <span>Target: <strong className="text-emerald-400">{formatCurrency(totals.fullFireNumber, state.currency)}</strong></span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-4 p-0.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 via-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/30"
                style={{ width: `${Math.max(2, Math.min(100, totals.fireProgress))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>$0 (Start)</span>
              <span>Lean FIRE: {formatCurrency(totals.leanFireNumber, state.currency)}</span>
              <span>Coast FIRE: {formatCurrency(totals.coastFireNumber, state.currency)}</span>
              <span>Full FIRE: {formatCurrency(totals.fullFireNumber, state.currency)}</span>
            </div>
          </div>

          {/* Freedom Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/60">
            <div>
              <span className="text-xs text-slate-400 block">Monthly Cash Flow</span>
              <span className="text-lg font-bold text-white">
                +{formatCurrency(totals.monthlyNetCashFlow, state.currency)}/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Passive Income</span>
              <span className="text-lg font-bold text-emerald-400">
                {formatCurrency(totals.totalPassiveIncome, state.currency)}/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Living Cost Coverage</span>
              <span className="text-lg font-bold text-teal-300">
                {formatPercent(passiveCoverageRatio)}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Emergency Buffer</span>
              <span className="text-lg font-bold text-sky-400">
                {totals.monthlyRunway >= 999 ? '∞' : `${totals.monthlyRunway.toFixed(1)} mos`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Autonomous CFO Advice Banner */}
      <div className={`p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        recommendation.type === 'warning'
          ? 'bg-amber-950/20 border-amber-500/30 text-amber-200'
          : recommendation.type === 'info'
          ? 'bg-blue-950/20 border-blue-500/30 text-blue-200'
          : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
      }`}>
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-emerald-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Next Best Dollar Strategy</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">{recommendation.title}</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">{recommendation.description}</p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab(recommendation.targetTab)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition whitespace-nowrap self-end sm:self-center shadow-md shadow-emerald-500/20"
        >
          <span>{recommendation.actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Savings Rate */}
        <div
          onClick={() => onNavigateTab('cashflow')}
          className="glass-panel glass-panel-hover p-5 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Savings Velocity</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatPercent(totals.savingsRate)}</div>
          <p className="text-xs text-slate-400 leading-normal">
            {totals.savingsRate >= 50
              ? '🔥 Supercharged: Saving >50% puts retirement within 15 years!'
              : totals.savingsRate >= 25
              ? 'Solid rate. An extra 10% will accelerate your goal by 4 years.'
              : 'Room to optimize. Focus on cutting wants and expanding side income.'}
          </p>
        </div>

        {/* Card 2: Debt Shield */}
        <div
          onClick={() => onNavigateTab('debt')}
          className="glass-panel glass-panel-hover p-5 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Debt</span>
            <div className={`p-2 rounded-lg ${totals.totalLiabilities === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatCurrency(totals.totalLiabilities, state.currency)}</div>
          <p className="text-xs text-slate-400 leading-normal">
            {totals.totalLiabilities === 0
              ? '🛡️ Debt Free! 100% of your cash flow works directly for your wealth.'
              : `Across ${state.liabilities.length} liabilities. Click to view Avalanche plan.`}
          </p>
        </div>

        {/* Card 3: Invested Capital */}
        <div
          onClick={() => onNavigateTab('portfolio')}
          className="glass-panel glass-panel-hover p-5 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compounding Assets</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatCurrency(totals.investedAssets, state.currency)}</div>
          <p className="text-xs text-slate-400 leading-normal">
            Generating est. <strong className="text-emerald-400">{formatCurrency(totals.investedAssets * (state.fireConfig.expectedInvestmentReturn / 100), state.currency)}/yr</strong> in expected compound wealth.
          </p>
        </div>

        {/* Card 4: Coast FIRE Status */}
        <div
          onClick={() => onNavigateTab('roadmap')}
          className="glass-panel glass-panel-hover p-5 rounded-xl cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Coast FIRE Target</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatCurrency(totals.coastFireNumber, state.currency)}</div>
          <p className="text-xs text-slate-400 leading-normal">
            {totals.netWorth >= totals.coastFireNumber
              ? '🎉 Coast FIRE Unlocked! Your current investments alone will fund full retirement.'
              : `${formatPercent(totals.coastFireProgress)} reached. Once reached, future contributions are optional.`}
          </p>
        </div>
      </div>

      {/* Quick Launchpad to Deep Dive Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('simulator')}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-sm">Interactive Monte Carlo Simulator</h3>
            <p className="text-xs text-slate-400 mt-1">Stress test your timeline against 300 market cycles.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 ml-3" />
        </div>

        <div
          onClick={() => onNavigateTab('cashflow')}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-sm">Add High-Leverage Income</h3>
            <p className="text-xs text-slate-400 mt-1">Plug in freelance, consulting, or digital product revenue.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 ml-3" />
        </div>

        <div
          onClick={() => onNavigateTab('roadmap')}
          className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/40 transition cursor-pointer flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-sm">Wealth Habits & Action Checklist</h3>
            <p className="text-xs text-slate-400 mt-1">Execute daily high-ROI actions to shorten your horizon.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 ml-3" />
        </div>
      </div>
    </div>
  );
};
