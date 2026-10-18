import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateTotals, formatCurrency, formatPercent } from '../../utils/calculations';
import {
  TrendingUp,
  Plus,
  Trash2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { IncomeType, ExpenseCategoryType, ExpenseNecessity } from '../../types/finance';

export const CashFlowTab: React.FC = () => {
  const {
    state,
    addIncomeStream,
    deleteIncomeStream,
    addExpense,
    deleteExpense,
  } = useFinance();
  const totals = calculateTotals(state);

  // Forms states
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [incomeName, setIncomeName] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeType, setIncomeType] = useState<IncomeType>('side_hustle');
  const [isPassive, setIsPassive] = useState(false);
  const [growthRate, setGrowthRate] = useState('5');

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState<ExpenseCategoryType>('subscriptions');
  const [expenseNecessity, setExpenseNecessity] = useState<ExpenseNecessity>('discretionary');

  const handleCreateIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeName || !incomeAmount) return;
    addIncomeStream({
      name: incomeName,
      amount: parseFloat(incomeAmount),
      type: incomeType,
      isPassive,
      growthRateAnnual: parseFloat(growthRate) || 0,
    });
    setIncomeName('');
    setIncomeAmount('');
    setShowAddIncome(false);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseName || !expenseAmount) return;
    addExpense({
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      necessity: expenseNecessity,
    });
    setExpenseName('');
    setExpenseAmount('');
    setShowAddExpense(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-emerald-400" />
          <span>Cash Flow & High-Leverage Income Engine</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Your savings rate and high-leverage revenue streams are the primary accelerators of financial independence.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Monthly Inflow</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
              {state.incomeStreams.length} Streams
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatCurrency(totals.totalMonthlyIncome, state.currency)}
            <span className="text-xs font-normal text-slate-400">/mo</span>
          </div>
          <div className="text-xs text-emerald-400 font-medium mt-1">
            {formatCurrency(totals.totalPassiveIncome, state.currency)} passive ({totals.totalMonthlyIncome > 0 ? ((totals.totalPassiveIncome / totals.totalMonthlyIncome) * 100).toFixed(0) : 0}%)
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Monthly Burn</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-medium">
              {state.expenses.length} Items
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatCurrency(totals.totalMonthlyExpenses, state.currency)}
            <span className="text-xs font-normal text-slate-400">/mo</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Essential: {formatCurrency(totals.essentialMonthlyExpenses, state.currency)} | Discretionary: {formatCurrency(totals.discretionaryMonthlyExpenses, state.currency)}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Monthly Surplus</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            +{formatCurrency(totals.monthlyNetCashFlow, state.currency)}
            <span className="text-xs font-normal text-emerald-300">/mo</span>
          </div>
          <div className="text-xs text-emerald-300/80 mt-1">
            Injected into investments: {formatCurrency(totals.monthlyNetCashFlow * 12, state.currency)}/year
          </div>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Savings Velocity</span>
            <span className="text-xs font-bold text-teal-400">Target: 50%+</span>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {formatPercent(totals.savingsRate)}
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div
              className="bg-teal-400 h-full rounded-full"
              style={{ width: `${Math.min(100, totals.savingsRate)}%` }}
            />
          </div>
        </div>
      </div>

      {/* The Mr. Money Mustache Savings Rate Ladder */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-slate-900/40">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>The Mathematical Law of Financial Independence</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Assuming an average 5% real investment return, every percentage point increase in your savings rate directly replaces working years with freedom years.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className={`p-3 rounded-xl border ${totals.savingsRate >= 10 && totals.savingsRate < 25 ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
            <span className="block text-slate-300 font-semibold">15% Savings</span>
            <span className="text-base font-extrabold text-rose-400 block my-1">43 Years</span>
            <span className="text-[10px] text-slate-500">Standard Career</span>
          </div>
          <div className={`p-3 rounded-xl border ${totals.savingsRate >= 25 && totals.savingsRate < 45 ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
            <span className="block text-slate-300 font-semibold">30% Savings</span>
            <span className="text-base font-extrabold text-amber-400 block my-1">28 Years</span>
            <span className="text-[10px] text-slate-500">Disciplined Saver</span>
          </div>
          <div className={`p-3 rounded-xl border ${totals.savingsRate >= 45 && totals.savingsRate < 60 ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
            <span className="block text-slate-300 font-semibold">50% Savings</span>
            <span className="text-base font-extrabold text-emerald-400 block my-1">16.6 Years</span>
            <span className="text-[10px] text-slate-500">Hyper-Saver FIRE</span>
          </div>
          <div className={`p-3 rounded-xl border ${totals.savingsRate >= 60 && totals.savingsRate < 75 ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
            <span className="block text-slate-300 font-semibold">65% Savings</span>
            <span className="text-base font-extrabold text-teal-300 block my-1">10.5 Years</span>
            <span className="text-[10px] text-slate-500">Extreme Independence</span>
          </div>
          <div className={`p-3 rounded-xl border col-span-2 sm:col-span-1 ${totals.savingsRate >= 75 ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-400'}`}>
            <span className="block text-slate-300 font-semibold">80% Savings</span>
            <span className="text-base font-extrabold text-sky-400 block my-1">5.5 Years</span>
            <span className="text-[10px] text-slate-500">SaaS / High Leverage</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Income Streams vs Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Streams */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Income Portfolios</h3>
              <p className="text-xs text-slate-400">Active compensation, side hustles, and automated passive streams.</p>
            </div>
            <button
              onClick={() => setShowAddIncome(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Stream</span>
            </button>
          </div>

          {/* Add Income Form Modal/Drawer */}
          {showAddIncome && (
            <form onSubmit={handleCreateIncome} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">New Revenue Stream</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Stream Name (e.g. Freelance Client)"
                  value={incomeName}
                  onChange={(e) => setIncomeName(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
                <input
                  type="number"
                  placeholder="Monthly Amount ($)"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={incomeType}
                  onChange={(e) => setIncomeType(e.target.value as IncomeType)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                >
                  <option value="salary">Career / Salary</option>
                  <option value="business">Business / SaaS</option>
                  <option value="freelance">Freelance / Consulting</option>
                  <option value="dividend">Dividends</option>
                  <option value="rental">Real Estate Rental</option>
                  <option value="side_hustle">Side Hustle</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  placeholder="Annual Growth % (e.g. 10)"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPassive}
                    onChange={(e) => setIsPassive(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>100% Passive (Requires no direct labor)</span>
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAddIncome(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-lg bg-emerald-500 text-xs text-slate-950 font-bold hover:bg-emerald-400"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* List of Income Streams */}
          <div className="space-y-2">
            {state.incomeStreams.map((stream) => (
              <div
                key={stream.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">{stream.name}</span>
                    {stream.isPassive && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
                        Passive
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 capitalize">
                      {stream.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Est. growth: +{stream.growthRateAnnual}%/yr
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-bold text-white text-sm">
                    {formatCurrency(stream.amount, state.currency)}/mo
                  </span>
                  <button
                    onClick={() => deleteIncomeStream(stream.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Manager */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Monthly Cash Outflow</h3>
              <p className="text-xs text-slate-400">Essential living costs vs discretionary lifestyle spending.</p>
            </div>
            <button
              onClick={() => setShowAddExpense(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Add Expense Form Modal/Drawer */}
          {showAddExpense && (
            <form onSubmit={handleCreateExpense} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">New Monthly Expense</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Expense Item (e.g. Gym Membership)"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
                <input
                  type="number"
                  placeholder="Monthly Amount ($)"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value as ExpenseCategoryType)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                >
                  <option value="housing">Housing (Rent/Mortgage)</option>
                  <option value="food">Groceries & Food</option>
                  <option value="utilities">Utilities & Internet</option>
                  <option value="transport">Transport / Vehicle</option>
                  <option value="healthcare">Healthcare & Insurance</option>
                  <option value="entertainment">Dining & Entertainment</option>
                  <option value="subscriptions">Subscriptions / SaaS</option>
                  <option value="other">Other</option>
                </select>
                <select
                  value={expenseNecessity}
                  onChange={(e) => setExpenseNecessity(e.target.value as ExpenseNecessity)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                >
                  <option value="essential">Essential (Required for survival)</option>
                  <option value="discretionary">Discretionary (Comfort / Luxury)</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddExpense(false)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-rose-500 text-xs text-white font-bold hover:bg-rose-400"
                >
                  Save Expense
                </button>
              </div>
            </form>
          )}

          {/* List of Expenses */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {state.expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white text-sm">{expense.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        expense.necessity === 'essential'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                      }`}
                    >
                      {expense.necessity === 'essential' ? 'Essential' : 'Discretionary'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 capitalize">{expense.category}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="font-bold text-white text-sm">
                    {formatCurrency(expense.amount, state.currency)}/mo
                  </span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
