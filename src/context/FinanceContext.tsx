import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FreedomState,
  IncomeStream,
  ExpenseItem,
  Asset,
  Liability,
  FIREConfig,
  WealthHabit,
  CurrencyCode,
} from '../types/finance';

const STORAGE_KEY = 'freedom_os_state_v1';

const DEFAULT_STATE: FreedomState = {
  currency: 'USD',
  fireConfig: {
    currentAge: 29,
    targetRetirementAge: 45,
    safeWithdrawalRate: 4.0,
    expectedInvestmentReturn: 8.5,
    inflationRate: 2.5,
    leanFireExpenseRatio: 0.65,
    fatFireExpenseRatio: 1.5,
  },
  incomeStreams: [
    {
      id: 'inc-1',
      name: 'Primary Career / Tech Salary',
      amount: 7200,
      type: 'salary',
      isPassive: false,
      growthRateAnnual: 5,
    },
    {
      id: 'inc-2',
      name: 'Freelance & Technical Consulting',
      amount: 1400,
      type: 'freelance',
      isPassive: false,
      growthRateAnnual: 10,
    },
    {
      id: 'inc-3',
      name: 'Micro-SaaS & Digital Tools',
      amount: 650,
      type: 'business',
      isPassive: true,
      growthRateAnnual: 25,
    },
    {
      id: 'inc-4',
      name: 'Index Fund Dividend Yields',
      amount: 280,
      type: 'dividend',
      isPassive: true,
      growthRateAnnual: 7,
    },
  ],
  expenses: [
    {
      id: 'exp-1',
      name: 'Housing (Rent / Mortgage)',
      amount: 2100,
      category: 'housing',
      necessity: 'essential',
    },
    {
      id: 'exp-2',
      name: 'Groceries & Nutrition',
      amount: 650,
      category: 'food',
      necessity: 'essential',
    },
    {
      id: 'exp-3',
      name: 'Utilities & Gigabit Internet',
      amount: 240,
      category: 'utilities',
      necessity: 'essential',
    },
    {
      id: 'exp-4',
      name: 'Transport & Fuel',
      amount: 320,
      category: 'transport',
      necessity: 'essential',
    },
    {
      id: 'exp-5',
      name: 'Healthcare & Fitness',
      amount: 280,
      category: 'healthcare',
      necessity: 'essential',
    },
    {
      id: 'exp-6',
      name: 'Dining Out & Entertainment',
      amount: 450,
      category: 'entertainment',
      necessity: 'discretionary',
    },
    {
      id: 'exp-7',
      name: 'Software, Cloud & Subscriptions',
      amount: 160,
      category: 'subscriptions',
      necessity: 'discretionary',
    },
  ],
  assets: [
    {
      id: 'ast-1',
      name: 'High-Yield Cash Emergency Fund (5.0% APY)',
      value: 28000,
      category: 'cash',
      expectedReturnRate: 5.0,
      liquidity: 'liquid',
    },
    {
      id: 'ast-2',
      name: 'Total US Stock Market Index (VTI)',
      value: 95000,
      category: 'equities',
      expectedReturnRate: 9.0,
      liquidity: 'liquid',
    },
    {
      id: 'ast-3',
      name: 'Tax-Advantaged Retirement (401k / IRA)',
      value: 65000,
      category: 'equities',
      expectedReturnRate: 8.5,
      liquidity: 'semi-liquid',
    },
    {
      id: 'ast-4',
      name: 'Decentralized Digital Assets (BTC / ETH)',
      value: 14000,
      category: 'crypto',
      expectedReturnRate: 12.0,
      liquidity: 'liquid',
    },
  ],
  liabilities: [
    {
      id: 'lia-1',
      name: 'High-Interest Credit Card',
      balance: 3200,
      interestRate: 21.99,
      minimumPayment: 110,
      actualPayment: 300,
    },
    {
      id: 'lia-2',
      name: 'Student Education Loan',
      balance: 11500,
      interestRate: 5.25,
      minimumPayment: 180,
      actualPayment: 250,
    },
  ],
  habits: [
    {
      id: 'hbt-1',
      title: 'Pay Yourself First: Auto-transfer min 30% of income on 1st of month',
      category: 'investing',
      frequency: 'monthly',
      completed: true,
      streak: 7,
      impactScore: 3,
    },
    {
      id: 'hbt-2',
      title: 'Audit recurring subscriptions and eliminate unused services',
      category: 'savings',
      frequency: 'monthly',
      completed: true,
      streak: 3,
      impactScore: 2,
    },
    {
      id: 'hbt-3',
      title: 'Work 90 mins daily on side-project / leverageable asset',
      category: 'income',
      frequency: 'daily',
      completed: false,
      streak: 12,
      impactScore: 3,
    },
    {
      id: 'hbt-4',
      title: 'Read 20 pages of finance, economics, or high-value skill literature',
      category: 'mindset',
      frequency: 'daily',
      completed: true,
      streak: 18,
      impactScore: 2,
    },
    {
      id: 'hbt-5',
      title: 'Zero impulse spending: observe 48-hour rule on non-essential purchases >$50',
      category: 'savings',
      frequency: 'daily',
      completed: true,
      streak: 9,
      impactScore: 2,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

interface FinanceContextType {
  state: FreedomState;
  setCurrency: (code: CurrencyCode) => void;
  updateFireConfig: (config: Partial<FIREConfig>) => void;
  // Income
  addIncomeStream: (income: Omit<IncomeStream, 'id'>) => void;
  updateIncomeStream: (id: string, income: Partial<IncomeStream>) => void;
  deleteIncomeStream: (id: string) => void;
  // Expenses
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<ExpenseItem>) => void;
  deleteExpense: (id: string) => void;
  // Assets
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAsset: (id: string, asset: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  // Liabilities
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, liability: Partial<Liability>) => void;
  deleteLiability: (id: string) => void;
  // Habits
  toggleHabit: (id: string) => void;
  addHabit: (habit: Omit<WealthHabit, 'id' | 'streak'>) => void;
  deleteHabit: (id: string) => void;
  // System
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefault: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FreedomState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load freedom state from localStorage', e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save freedom state', e);
    }
  }, [state]);

  const setCurrency = (currency: CurrencyCode) => {
    setState((prev) => ({ ...prev, currency, lastUpdated: new Date().toISOString() }));
  };

  const updateFireConfig = (config: Partial<FIREConfig>) => {
    setState((prev) => ({
      ...prev,
      fireConfig: { ...prev.fireConfig, ...config },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Income
  const addIncomeStream = (income: Omit<IncomeStream, 'id'>) => {
    const newItem: IncomeStream = { ...income, id: 'inc-' + Date.now() };
    setState((prev) => ({
      ...prev,
      incomeStreams: [...prev.incomeStreams, newItem],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateIncomeStream = (id: string, income: Partial<IncomeStream>) => {
    setState((prev) => ({
      ...prev,
      incomeStreams: prev.incomeStreams.map((item) => (item.id === id ? { ...item, ...income } : item)),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteIncomeStream = (id: string) => {
    setState((prev) => ({
      ...prev,
      incomeStreams: prev.incomeStreams.filter((item) => item.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Expenses
  const addExpense = (expense: Omit<ExpenseItem, 'id'>) => {
    const newItem: ExpenseItem = { ...expense, id: 'exp-' + Date.now() };
    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, newItem],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateExpense = (id: string, expense: Partial<ExpenseItem>) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.map((item) => (item.id === id ? { ...item, ...expense } : item)),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteExpense = (id: string) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((item) => item.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Assets
  const addAsset = (asset: Omit<Asset, 'id'>) => {
    const newItem: Asset = { ...asset, id: 'ast-' + Date.now() };
    setState((prev) => ({
      ...prev,
      assets: [...prev.assets, newItem],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateAsset = (id: string, asset: Partial<Asset>) => {
    setState((prev) => ({
      ...prev,
      assets: prev.assets.map((item) => (item.id === id ? { ...item, ...asset } : item)),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteAsset = (id: string) => {
    setState((prev) => ({
      ...prev,
      assets: prev.assets.filter((item) => item.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Liabilities
  const addLiability = (liability: Omit<Liability, 'id'>) => {
    const newItem: Liability = { ...liability, id: 'lia-' + Date.now() };
    setState((prev) => ({
      ...prev,
      liabilities: [...prev.liabilities, newItem],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const updateLiability = (id: string, liability: Partial<Liability>) => {
    setState((prev) => ({
      ...prev,
      liabilities: prev.liabilities.map((item) => (item.id === id ? { ...item, ...liability } : item)),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteLiability = (id: string) => {
    setState((prev) => ({
      ...prev,
      liabilities: prev.liabilities.filter((item) => item.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Habits
  const toggleHabit = (id: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => {
        if (h.id === id) {
          const newCompleted = !h.completed;
          return {
            ...h,
            completed: newCompleted,
            streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
          };
        }
        return h;
      }),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const addHabit = (habit: Omit<WealthHabit, 'id' | 'streak'>) => {
    const newItem: WealthHabit = { ...habit, id: 'hbt-' + Date.now(), streak: 0 };
    setState((prev) => ({
      ...prev,
      habits: [...prev.habits, newItem],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const deleteHabit = (id: string) => {
    setState((prev) => ({
      ...prev,
      habits: prev.habits.filter((item) => item.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Backup & Restore
  const exportDataJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `freedom-os-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.fireConfig && Array.isArray(parsed.incomeStreams) && Array.isArray(parsed.assets)) {
        setState({ ...parsed, lastUpdated: new Date().toISOString() });
        return true;
      }
    } catch (e) {
      console.error('Failed to parse imported json', e);
    }
    return false;
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all financial data to demo state? This will erase custom entries.')) {
      setState(DEFAULT_STATE);
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        state,
        setCurrency,
        updateFireConfig,
        addIncomeStream,
        updateIncomeStream,
        deleteIncomeStream,
        addExpense,
        updateExpense,
        deleteExpense,
        addAsset,
        updateAsset,
        deleteAsset,
        addLiability,
        updateLiability,
        deleteLiability,
        toggleHabit,
        addHabit,
        deleteHabit,
        exportDataJSON,
        importDataJSON,
        resetToDefault,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
