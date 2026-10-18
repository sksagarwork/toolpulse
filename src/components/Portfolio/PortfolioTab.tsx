import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateTotals, formatCurrency } from '../../utils/calculations';
import {
  PieChart as PieChartIcon,
  Plus,
  Trash2,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AssetCategory } from '../../types/finance';

const CATEGORY_COLORS: Record<AssetCategory, string> = {
  cash: '#38bdf8', // Sky
  equities: '#10b981', // Emerald
  real_estate: '#f59e0b', // Amber
  crypto: '#8b5cf6', // Purple
  fixed_income: '#64748b', // Slate
  business: '#ec4899', // Pink
  other: '#94a3b8',
};

const CATEGORY_LABELS: Record<AssetCategory, string> = {
  cash: 'Cash & Equivalents',
  equities: 'Stocks & Index Funds',
  real_estate: 'Real Estate',
  crypto: 'Crypto & Digital Assets',
  fixed_income: 'Bonds & Fixed Income',
  business: 'Private Business & Equity',
  other: 'Other Assets',
};

export const PortfolioTab: React.FC = () => {
  const { state, addAsset, deleteAsset } = useFinance();
  const totals = calculateTotals(state);

  const [showAddAsset, setShowAddAsset] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [assetCategory, setAssetCategory] = useState<AssetCategory>('equities');
  const [expectedReturn, setExpectedReturn] = useState('8');
  const [liquidity, setLiquidity] = useState<'liquid' | 'semi-liquid' | 'illiquid'>('liquid');

  // Compute category breakdown
  const categoryData = Object.entries(
    state.assets.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.value;
      return acc;
    }, {} as Record<AssetCategory, number>)
  ).map(([category, value]) => ({
    name: CATEGORY_LABELS[category as AssetCategory] || category,
    category: category as AssetCategory,
    value,
  }));

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !assetValue) return;
    addAsset({
      name: assetName,
      value: parseFloat(assetValue),
      category: assetCategory,
      expectedReturnRate: parseFloat(expectedReturn) || 0,
      liquidity,
    });
    setAssetName('');
    setAssetValue('');
    setShowAddAsset(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <PieChartIcon className="w-6 h-6 text-teal-400" />
          <span>Asset Allocation & Net Worth Ledger</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Diversify across high-yield cash buffers, compounding equities, and asymmetric growth assets.
        </p>
      </div>

      {/* Net Worth Balance Sheet Topline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold mb-1">
            Total Assets (Gross Wealth)
          </span>
          <div className="text-2xl font-black text-white">
            {formatCurrency(totals.totalAssets, state.currency)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Liquid: {formatCurrency(totals.liquidAssets, state.currency)} ({totals.totalAssets > 0 ? ((totals.liquidAssets / totals.totalAssets) * 100).toFixed(0) : 0}%)
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-rose-400 block font-semibold mb-1">
            Total Liabilities (Debt)
          </span>
          <div className="text-2xl font-black text-rose-400">
            -{formatCurrency(totals.totalLiabilities, state.currency)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Debt-to-Asset Ratio: {totals.totalAssets > 0 ? ((totals.totalLiabilities / totals.totalAssets) * 100).toFixed(1) : 0}%
          </p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
          <span className="text-xs uppercase tracking-wider text-emerald-300 block font-semibold mb-1">
            Net Worth (True Freedom Capital)
          </span>
          <div className="text-2xl font-black text-emerald-400">
            {formatCurrency(totals.netWorth, state.currency)}
          </div>
          <p className="text-xs text-emerald-300/80 mt-1">
            Assets minus Liabilities
          </p>
        </div>
      </div>

      {/* Asset Allocation Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center">
          <h3 className="font-bold text-white text-base mb-1 self-start">Portfolio Allocation</h3>
          <p className="text-xs text-slate-400 mb-4 self-start">Visual distribution of capital.</p>

          <div className="h-60 w-60 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  formatter={(val: number) => [formatCurrency(val, state.currency), 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Total</span>
              <span className="text-base font-extrabold text-white">{formatCurrency(totals.totalAssets, state.currency)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 w-full text-xs">
            {categoryData.map((item) => (
              <div key={item.category} className="flex items-center space-x-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                <span className="text-slate-300 truncate">{item.name}</span>
                <span className="text-slate-500 text-[11px] ml-auto">
                  {totals.totalAssets > 0 ? ((item.value / totals.totalAssets) * 100).toFixed(0) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Inventory List (Spans 2 cols) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-white text-base">Asset Ledger</h3>
              <p className="text-xs text-slate-400">Manage individual holdings, bank deposits, and investment accounts.</p>
            </div>
            <button
              onClick={() => setShowAddAsset(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Asset</span>
            </button>
          </div>

          {/* Add Asset Form */}
          {showAddAsset && (
            <form onSubmit={handleCreateAsset} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">New Wealth Holding</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Asset Name (e.g. Vanguard Total World ETF)"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
                <input
                  type="number"
                  placeholder="Current Value ($)"
                  value={assetValue}
                  onChange={(e) => setAssetValue(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={assetCategory}
                  onChange={(e) => setAssetCategory(e.target.value as AssetCategory)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                >
                  <option value="equities">Equities / Stocks</option>
                  <option value="cash">Cash / Emergency Fund</option>
                  <option value="real_estate">Real Estate</option>
                  <option value="crypto">Crypto</option>
                  <option value="fixed_income">Bonds / Fixed Income</option>
                  <option value="business">Private Business</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  step="0.5"
                  placeholder="Expected Return %"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
                <select
                  value={liquidity}
                  onChange={(e) => setLiquidity(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-300"
                >
                  <option value="liquid">Liquid (&lt; 2 days)</option>
                  <option value="semi-liquid">Semi-Liquid (401k/IRA)</option>
                  <option value="illiquid">Illiquid (Property/Equity)</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddAsset(false)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-lg bg-teal-500 text-xs text-slate-950 font-bold hover:bg-teal-400"
                >
                  Save Asset
                </button>
              </div>
            </form>
          )}

          {/* List of Assets */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {state.assets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: CATEGORY_COLORS[asset.category] || '#94a3b8' }}
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{asset.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 capitalize">
                        {asset.liquidity}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Category: {CATEGORY_LABELS[asset.category]} | Exp Return: {asset.expectedReturnRate}%/yr
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm font-black text-white">
                    {formatCurrency(asset.value, state.currency)}
                  </span>
                  <button
                    onClick={() => deleteAsset(asset.id)}
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
