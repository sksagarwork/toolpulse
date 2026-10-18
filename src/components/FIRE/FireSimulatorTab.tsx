import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import {
  calculateTotals,
  calculateYearsToTarget,
  generateProjections,
  runMonteCarloSimulations,
  formatCurrency,
  formatPercent,
} from '../../utils/calculations';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Sparkles, Sliders, Dices } from 'lucide-react';

export const FireSimulatorTab: React.FC = () => {
  const { state, updateFireConfig } = useFinance();
  const totals = calculateTotals(state);

  const [extraMonthly, setExtraMonthly] = useState<number>(500);
  const [projectionYears, setProjectionYears] = useState<number>(30);
  const [mcRuns, setMcRuns] = useState<number>(0); // Trigger for Monte Carlo re-run

  // Projection data
  const projections = useMemo(() => {
    return generateProjections(state, projectionYears, extraMonthly);
  }, [state, projectionYears, extraMonthly]);

  // Monte Carlo simulation
  const monteCarlo = useMemo(() => {
    return runMonteCarloSimulations(state, 25, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, mcRuns]);

  // Accelerated years to FIRE calculation
  const acceleratedMonthlyNet = totals.monthlyNetCashFlow + extraMonthly;
  const acceleratedYearsToFire = useMemo(() => {
    if (totals.netWorth >= totals.fullFireNumber) return 0;
    const realRate = (state.fireConfig.expectedInvestmentReturn - state.fireConfig.inflationRate) / 100;
    const monthlyRealRate = Math.pow(1 + Math.max(-0.5, realRate), 1 / 12) - 1;
    let bal = Math.max(0, totals.netWorth);
    let m = 0;
    while (bal < totals.fullFireNumber && m < 1200) {
      bal = bal * (1 + monthlyRealRate) + acceleratedMonthlyNet;
      m++;
    }
    return +(m / 12).toFixed(1);
  }, [totals.netWorth, totals.fullFireNumber, state.fireConfig, acceleratedMonthlyNet]);

  const yearsSaved = Math.max(0, +(totals.yearsToFire - acceleratedYearsToFire).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <span>The FIRE Simulation Lab</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Model compound growth, stress-test macroeconomic conditions, and discover how extra monthly capital cuts years off your working life.
          </p>
        </div>

        {/* Accelerated Impact Badge */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 px-4 flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 block font-semibold">
              Extra +{formatCurrency(extraMonthly, state.currency)}/mo Impact
            </span>
            <span className="text-base sm:text-lg font-black text-white">
              Saves {yearsSaved} Years of Work!
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="glass-panel p-5 rounded-2xl space-y-5">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Macro & Parameter Controls</h3>
          </div>

          {/* Current Age & Retirement Age */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Current Age</label>
              <input
                type="number"
                min="18"
                max="90"
                value={state.fireConfig.currentAge}
                onChange={(e) => updateFireConfig({ currentAge: parseInt(e.target.value) || 25 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Age</label>
              <input
                type="number"
                min="25"
                max="100"
                value={state.fireConfig.targetRetirementAge}
                onChange={(e) => updateFireConfig({ targetRetirementAge: parseInt(e.target.value) || 50 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Safe Withdrawal Rate Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Safe Withdrawal Rate (SWR)</span>
              <span className="font-bold text-emerald-400">{formatPercent(state.fireConfig.safeWithdrawalRate, 1)}</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="5.0"
              step="0.1"
              value={state.fireConfig.safeWithdrawalRate}
              onChange={(e) => updateFireConfig({ safeWithdrawalRate: parseFloat(e.target.value) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">Standard Trinity Study baseline is 4.0%. 3.5% provides near 100% historical safety.</p>
          </div>

          {/* Expected Return Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Nominal Market Return</span>
              <span className="font-bold text-teal-400">{formatPercent(state.fireConfig.expectedInvestmentReturn, 1)}</span>
            </div>
            <input
              type="range"
              min="4.0"
              max="12.0"
              step="0.5"
              value={state.fireConfig.expectedInvestmentReturn}
              onChange={(e) => updateFireConfig({ expectedInvestmentReturn: parseFloat(e.target.value) })}
              className="w-full accent-teal-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">S&P 500 historical 50-year nominal average is ~9.8%.</p>
          </div>

          {/* Inflation Rate Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Expected Long-Term Inflation</span>
              <span className="font-bold text-rose-400">{formatPercent(state.fireConfig.inflationRate, 1)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.2"
              value={state.fireConfig.inflationRate}
              onChange={(e) => updateFireConfig({ inflationRate: parseFloat(e.target.value) })}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 mt-1">Real Return = Nominal ({(state.fireConfig.expectedInvestmentReturn - state.fireConfig.inflationRate).toFixed(1)}%).</p>
          </div>

          {/* Extra Monthly Investment Simulator */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-semibold">Side Hustle Extra Contribution</span>
              <span className="font-bold text-emerald-400">+{formatCurrency(extraMonthly, state.currency)}/mo</span>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Projection Chart Column (Spans 2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Net Worth Wealth Projections (Inflation-Adjusted)</h3>
                  <p className="text-xs text-slate-400">Comparing current baseline vs boosted savings pace.</p>
                </div>
                <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {[15, 25, 35].map((y) => (
                    <button
                      key={y}
                      onClick={() => setProjectionYears(y)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        projectionYears === y
                          ? 'bg-emerald-500 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {y}y
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center space-x-1.5 text-teal-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
                  <span>Current Pace</span>
                </span>
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Boosted Pace (+{formatCurrency(extraMonthly, state.currency)})</span>
                </span>
                <span className="flex items-center space-x-1.5 text-rose-400">
                  <span className="w-2.5 h-0.5 bg-rose-400 inline-block" />
                  <span>Freedom Number</span>
                </span>
              </div>

            {/* Recharts Area Chart */}
            <div className="h-72 sm:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradStandard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="gradAccelerated" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="age"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(age) => `Age ${age}`}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(val) => formatCurrency(val, state.currency)}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: number) => [formatCurrency(val, state.currency), '']}
                    labelFormatter={(label) => `Age ${label}`}
                  />
                  <ReferenceLine
                    y={totals.fullFireNumber}
                    stroke="#f43f5e"
                    strokeDasharray="4 4"
                    label={{
                      value: `Target: ${formatCurrency(totals.fullFireNumber, state.currency)}`,
                      fill: '#f43f5e',
                      fontSize: 11,
                      position: 'top',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="standardBalance"
                    name="Current Pace"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#gradStandard)"
                  />
                  <Area
                    type="monotone"
                    dataKey="acceleratedBalance"
                    name="Boosted Pace"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#gradAccelerated)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timeline Summary Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 mt-4 text-center">
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Current Freedom Age</span>
              <span className="text-base font-bold text-white">
                Age {totals.yearsToFire <= 0 ? state.fireConfig.currentAge : Math.round(state.fireConfig.currentAge + totals.yearsToFire)}
              </span>
            </div>
            <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-[11px] text-emerald-400 block font-semibold">Boosted Freedom Age</span>
              <span className="text-base font-black text-emerald-300">
                Age {acceleratedYearsToFire <= 0 ? state.fireConfig.currentAge : Math.round(state.fireConfig.currentAge + acceleratedYearsToFire)}
              </span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Lean FIRE Horizon</span>
              <span className="text-base font-bold text-teal-300">
                {calculateYearsToTarget({
                  currentNetWorth: Math.max(0, totals.netWorth),
                  targetAmount: totals.leanFireNumber,
                  monthlyContribution: totals.monthlyNetCashFlow,
                  annualReturnRate: state.fireConfig.expectedInvestmentReturn,
                  inflationRate: state.fireConfig.inflationRate,
                })} yrs
              </span>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Passive SWR Income</span>
              <span className="text-base font-bold text-amber-300">
                {formatCurrency(totals.fullFireNumber * (state.fireConfig.safeWithdrawalRate / 100) / 12, state.currency)}/mo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Monte Carlo Stress-Test Panel */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Dices className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Monte Carlo Probabilistic Engine (300 Scenarios)</h3>
              <p className="text-xs text-slate-400">
                Simulates real-world market volatility, recessions, bull runs, and sequence of returns risk over 25 years.
              </p>
            </div>
          </div>

          <button
            onClick={() => setMcRuns((c) => c + 1)}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Re-Roll 300 Simulations</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Success Probability */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold mb-1">
              FIRE Success Probability
            </span>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {monteCarlo.successRate}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {monteCarlo.successRate >= 90
                ? 'Extremely robust portfolio resilient to bear markets.'
                : 'Moderate certainty. Increase savings rate to buffer against prolonged recessions.'}
            </p>
          </div>

          {/* Bear Market Scenario */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <span className="text-xs uppercase tracking-wider text-rose-400 block font-semibold mb-1">
              Worst 10% (Prolonged Bear)
            </span>
            <div className="text-xl font-bold text-white">
              {formatCurrency(monteCarlo.bearPath[monteCarlo.bearPath.length - 1], state.currency)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Stagnant market returns with elevated inflation.</p>
          </div>

          {/* Median Market Scenario */}
          <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/20">
            <span className="text-xs uppercase tracking-wider text-teal-400 block font-semibold mb-1">
              Median 50% (Expected Market)
            </span>
            <div className="text-xl font-bold text-white">
              {formatCurrency(monteCarlo.medianPath[monteCarlo.medianPath.length - 1], state.currency)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Normal cyclical business cycles with historical average.</p>
          </div>

          {/* Bull Market Scenario */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <span className="text-xs uppercase tracking-wider text-emerald-400 block font-semibold mb-1">
              Top 10% (Hyper Growth)
            </span>
            <div className="text-xl font-bold text-white">
              {formatCurrency(monteCarlo.bullPath[monteCarlo.bullPath.length - 1], state.currency)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Strong compound returns and tech tailwinds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
