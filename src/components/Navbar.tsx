import React, { useRef } from 'react';
import { useFinance } from '../context/FinanceContext';
import { calculateTotals, formatCurrency, formatPercent } from '../utils/calculations';
import {
  Sparkles,
  Download,
  Upload,
  RotateCcw,
  TrendingUp,
  ShieldAlert,
  Compass,
  Moon,
  Rocket,
  Globe,
  Hammer,
} from 'lucide-react';
import { CurrencyCode } from '../types/finance';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { state, setCurrency, exportDataJSON, importDataJSON, resetToDefault } = useFinance();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totals = calculateTotals(state);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importDataJSON(content);
        if (success) {
          alert('Financial data successfully restored!');
        } else {
          alert('Failed to parse file. Please provide a valid FreedomOS JSON backup.');
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const navItems = [
    { id: 'overview', label: 'Command Center', icon: Compass },
    { id: 'tradesos', label: 'TradesOS (Billionaire Trades) 🏗️', icon: Hammer },
    { id: 'toolpulse', label: 'ToolPulse AI Site 🌐', icon: Globe },
    { id: 'organic', label: 'Organic Flywheel 🚀', icon: Rocket },
    { id: 'passive', label: 'Earn While Sleeping 🌙', icon: Moon },
    { id: 'simulator', label: 'FIRE Engine', icon: Sparkles },
    { id: 'cashflow', label: 'Cash Flow & Income', icon: TrendingUp },
    { id: 'debt', label: 'Debt Slayer', icon: ShieldAlert },
    { id: 'portfolio', label: 'Asset Allocation', icon: RotateCcw },
    { id: 'roadmap', label: 'Freedom Ladder', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand + Quick Telemetry + Utilities */}
        <div className="flex items-center justify-between h-16 border-b border-slate-800/40">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  ⚡
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">FREEDOM</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OS v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">The Autonomous Wealth & FIRE Engine</p>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Net Worth</span>
              <span className="text-base font-bold text-white">
                {formatCurrency(totals.netWorth, state.currency)}
              </span>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Savings Rate</span>
              <span className="text-base font-bold text-emerald-400">
                {formatPercent(totals.savingsRate)}
              </span>
            </div>
            <div className="h-7 w-px bg-slate-800" />
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">To Freedom</span>
              <span className="text-base font-bold text-teal-300">
                {totals.yearsToFire <= 0 ? 'Achieved!' : `${totals.yearsToFire} yrs`}
              </span>
            </div>
          </div>

          {/* Controls: Currency + Export/Import */}
          <div className="flex items-center space-x-2">
            <select
              value={state.currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Currency Selector"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (CA$)</option>
              <option value="AUD">AUD (A$)</option>
              <option value="INR">INR (₹)</option>
              <option value="JPY">JPY (¥)</option>
            </select>

            <button
              onClick={exportDataJSON}
              title="Backup Data to JSON"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Restore Data from JSON"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={resetToDefault}
              title="Reset Demo Data"
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
