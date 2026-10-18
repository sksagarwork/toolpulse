import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateTotals, calculateDebtPayoff, formatCurrency, formatPercent } from '../../utils/calculations';
import {
  ShieldAlert,
  Flame,
  Snowflake,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const DebtPlannerTab: React.FC = () => {
  const { state, addLiability, deleteLiability } = useFinance();
  const totals = calculateTotals(state);

  const [extraPayment, setExtraPayment] = useState<number>(200);
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  // Form state
  const [showAddDebt, setShowAddDebt] = useState(false);
  const [debtName, setDebtName] = useState('');
  const [balance, setBalance] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [minPayment, setMinPayment] = useState('');

  // Calculations for both strategies
  const avalancheResult = useMemo(
    () => calculateDebtPayoff(state.liabilities, extraPayment, 'avalanche'),
    [state.liabilities, extraPayment]
  );

  const snowballResult = useMemo(
    () => calculateDebtPayoff(state.liabilities, extraPayment, 'snowball'),
    [state.liabilities, extraPayment]
  );

  // Baseline without extra payment for interest saved calculation
  const baselineResult = useMemo(
    () => calculateDebtPayoff(state.liabilities, 0, strategy),
    [state.liabilities, strategy]
  );

  const interestSaved = Math.max(0, baselineResult.totalInterestPaid - (strategy === 'avalanche' ? avalancheResult.totalInterestPaid : snowballResult.totalInterestPaid));
  const monthsSaved = Math.max(0, baselineResult.monthsToDebtFree - (strategy === 'avalanche' ? avalancheResult.monthsToDebtFree : snowballResult.monthsToDebtFree));

  const activeResult = strategy === 'avalanche' ? avalancheResult : snowballResult;

  const handleCreateDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtName || !balance || !interestRate || !minPayment) return;
    addLiability({
      name: debtName,
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate),
      minimumPayment: parseFloat(minPayment),
      actualPayment: parseFloat(minPayment),
    });
    setDebtName('');
    setBalance('');
    setInterestRate('');
    setMinPayment('');
    setShowAddDebt(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          <span>The Debt Slayer (Snowball vs Avalanche)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          High-interest debt is an anchor on your wealth velocity. Slaying debt yields a guaranteed, risk-free return equal to the interest rate.
        </p>
      </div>

      {totals.totalLiabilities === 0 ? (
        <div className="glass-panel p-10 rounded-2xl border border-emerald-500/30 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl">
            🛡️
          </div>
          <h3 className="text-xl font-bold text-white">Zero Debt Obligations!</h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            You are completely debt free. 100% of your surplus cash flow goes directly towards compounding your freedom nest egg.
          </p>
        </div>
      ) : (
        <>
          {/* Strategy Toggle & Comparison KPIs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-2">
                Active Strategy
              </span>
              <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                <button
                  onClick={() => setStrategy('avalanche')}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-bold transition ${
                    strategy === 'avalanche'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Avalanche</span>
                </button>
                <button
                  onClick={() => setStrategy('snowball')}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-bold transition ${
                    strategy === 'snowball'
                      ? 'bg-sky-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Snowball</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {strategy === 'avalanche'
                  ? 'Mathematical maximum: attacks highest interest rate first.'
                  : 'Psychological momentum: attacks smallest balance first for quick wins.'}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                Time to 100% Debt Free
              </span>
              <div className="text-2xl font-black text-white">
                {activeResult.monthsToDebtFree} Months
                <span className="text-xs text-slate-400 font-normal"> ({(activeResult.monthsToDebtFree / 12).toFixed(1)} yrs)</span>
              </div>
              <div className="text-xs text-emerald-400 font-semibold mt-1">
                {monthsSaved > 0 ? `⚡ ${monthsSaved} months faster with extra payments` : 'Standard minimum schedule'}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                Total Interest Under Strategy
              </span>
              <div className="text-2xl font-black text-rose-400">
                {formatCurrency(activeResult.totalInterestPaid, state.currency)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Principal: {formatCurrency(activeResult.totalPrincipalPaid, state.currency)}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
              <span className="text-xs text-emerald-300 uppercase tracking-wider block font-semibold mb-1">
                Guaranteed Interest Saved
              </span>
              <div className="text-2xl font-black text-emerald-400">
                +{formatCurrency(interestSaved, state.currency)}
              </div>
              <div className="text-xs text-emerald-300/80 mt-1">
                Direct wealth retained in your pocket!
              </div>
            </div>
          </div>

          {/* Extra Payment Slider & Payoff Simulation Chart */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Accelerated Monthly Payoff Boost</h3>
                <p className="text-xs text-slate-400">
                  Funneling discretionary cash flow towards debt cuts payoff timelines exponentially.
                </p>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2 px-3 rounded-xl">
                <span className="text-xs text-slate-400 font-semibold">Extra Allocation:</span>
                <span className="text-sm font-extrabold text-emerald-400">+{formatCurrency(extraPayment, state.currency)}/mo</span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={extraPayment}
              onChange={(e) => setExtraPayment(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            {/* Payoff Curve Area Chart */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeResult.monthlyHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradDebt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(m) => `M${m}`}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={11}
                    tickFormatter={(val) => formatCurrency(val, state.currency)}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                    formatter={(val: number) => [formatCurrency(val, state.currency), 'Remaining Debt']}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="remainingBalance"
                    name="Remaining Debt"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#gradDebt)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Debt Inventory List & Add Form */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-white text-base">Debt Balances & Interest Rates</h3>
                <p className="text-xs text-slate-400">Order is prioritized based on your selected strategy ({strategy}).</p>
              </div>
              <button
                onClick={() => setShowAddDebt(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Liability</span>
              </button>
            </div>

            {/* Form */}
            {showAddDebt && (
              <form onSubmit={handleCreateDebt} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">New Liability Record</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Liability Name (e.g. Visa Platinum)"
                    value={debtName}
                    onChange={(e) => setDebtName(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Total Current Balance ($)"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Interest Rate APR % (e.g. 19.99)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Minimum Monthly Payment ($)"
                    value={minPayment}
                    onChange={(e) => setMinPayment(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddDebt(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-rose-500 text-xs text-white font-bold hover:bg-rose-400"
                  >
                    Save Liability
                  </button>
                </div>
              </form>
            )}

            {/* List */}
            <div className="space-y-2">
              {state.liabilities
                .slice()
                .sort((a, b) => (strategy === 'avalanche' ? b.interestRate - a.interestRate : a.balance - b.balance))
                .map((debt, index) => (
                  <div
                    key={debt.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-bold">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{debt.name}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                            {formatPercent(debt.interestRate)} APR
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Min Monthly: {formatCurrency(debt.minimumPayment, state.currency)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-sm font-black text-white block">
                          {formatCurrency(debt.balance, state.currency)}
                        </span>
                        <span className="text-[10px] text-rose-400">
                          ~{formatCurrency((debt.balance * (debt.interestRate / 100)) / 12, state.currency)} interest/mo
                        </span>
                      </div>
                      <button
                        onClick={() => deleteLiability(debt.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
