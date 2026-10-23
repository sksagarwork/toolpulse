import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { Navbar } from './components/Navbar';
import { OverviewTab } from './components/Dashboard/OverviewTab';
import { FireSimulatorTab } from './components/FIRE/FireSimulatorTab';
import { CashFlowTab } from './components/CashFlow/CashFlowTab';
import { DebtPlannerTab } from './components/Debt/DebtPlannerTab';
import { PortfolioTab } from './components/Portfolio/PortfolioTab';
import { ActionRoadmapTab } from './components/Roadmap/ActionRoadmapTab';
import { EarnWhileYouSleepTab } from './components/Passive/EarnWhileYouSleepTab';
import { OrganicGrowthTab } from './components/Organic/OrganicGrowthTab';
import { ToolPulseApp } from './components/Directory/ToolPulseApp';
import { TradesOSApp } from './components/TradesOS/TradesOSApp';
import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tradesos');

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none bg-radial-glow opacity-80" />

      {/* Persistent Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {activeTab === 'tradesos' && <TradesOSApp />}
        {activeTab === 'overview' && <OverviewTab onNavigateTab={setActiveTab} />}
        {activeTab === 'toolpulse' && <ToolPulseApp />}
        {activeTab === 'organic' && <OrganicGrowthTab />}
        {activeTab === 'passive' && <EarnWhileYouSleepTab />}
        {activeTab === 'simulator' && <FireSimulatorTab />}
        {activeTab === 'cashflow' && <CashFlowTab />}
        {activeTab === 'debt' && <DebtPlannerTab />}
        {activeTab === 'portfolio' && <PortfolioTab />}
        {activeTab === 'roadmap' && <ActionRoadmapTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 relative z-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              <strong>100% Private & Local-First:</strong> All financial telemetry is saved locally on your device.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Built for Uncompromising Financial Independence</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">FreedomOS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
