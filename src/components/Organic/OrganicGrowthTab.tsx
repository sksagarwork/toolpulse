import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/calculations';
import {
  Rocket,
  Database,
  Layers,
  TrendingUp,
  Copy,
  Check,
  BarChart3,
  Code2,
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
import { SEODataset, ProgrammaticPage, TrafficProjectionPoint } from '../../types/organic';

export const OrganicGrowthTab: React.FC = () => {
  const { state, addIncomeStream } = useFinance();

  const [activeSubTab, setActiveSubTab] = useState<'programmatic' | 'tools' | 'simulator' | 'playbook'>('programmatic');

  // Sample Datasets for Programmatic SEO demonstration
  const datasets: SEODataset[] = [
    {
      id: 'ai_tools',
      name: 'AI Tools & Alternatives Directory',
      description: 'Programmatic pages comparing 800+ AI software utilities (e.g. "Best Copy.ai Alternatives", "Midjourney vs Stable Diffusion").',
      totalEntities: 850,
      estimatedMonthlyTraffic: '120k - 250k visits/mo',
      monetizationType: 'affiliate',
      pages: [
        {
          id: 'p-1',
          slug: 'best-copy-ai-alternatives',
          title: 'Top 7 Copy.ai Alternatives for Marketers (2026 Comparison)',
          metaDescription: 'Looking for a Copy.ai alternative? We tested the top 7 AI copywriting tools comparing pricing, API limits, and output quality.',
          category: 'Copywriting AI',
          targetKeyword: 'copy ai alternatives',
          monthlySearchVolume: 6400,
          keywordDifficulty: 24,
          sampleData: {
            topAlternative: 'Jasper AI',
            priceRange: '$19 - $49/mo',
            verdict: 'Best for long-form SEO articles',
          },
        },
        {
          id: 'p-2',
          slug: 'midjourney-vs-stable-diffusion',
          title: 'Midjourney vs Stable Diffusion: Which AI Image Tool is Better?',
          metaDescription: 'In-depth benchmark comparing Midjourney v7 and Stable Diffusion on realism, prompt adherence, and commercial licensing.',
          category: 'Image AI',
          targetKeyword: 'midjourney vs stable diffusion',
          monthlySearchVolume: 14200,
          keywordDifficulty: 32,
          sampleData: {
            winner: 'Midjourney for artistic speed, SD for local control',
            cost: '$10/mo vs Free (open source)',
            verdict: 'Midjourney is 3x faster for commercial design',
          },
        },
        {
          id: 'p-3',
          slug: 'free-chatgpt-prompts-for-real-estate',
          title: '45 High-Converting ChatGPT Prompts for Real Estate Agents',
          metaDescription: 'Copy-pasteable AI prompts for luxury listings, client follow-up emails, and neighborhood property guides.',
          category: 'Prompts & Templates',
          targetKeyword: 'chatgpt prompts for real estate',
          monthlySearchVolume: 4800,
          keywordDifficulty: 18,
          sampleData: {
            promptCount: 45,
            targetNiche: 'Real Estate Brokers',
            verdict: 'Saves 6 hours/week on property descriptions',
          },
        },
      ],
    },
    {
      id: 'cost_of_living',
      name: 'Nomad Cities & Cost of Living Matrix',
      description: 'Programmatic database of 400 global tech hubs and digital nomad cities with internet speeds, rent costs, and visa guides.',
      totalEntities: 420,
      estimatedMonthlyTraffic: '80k - 180k visits/mo',
      monetizationType: 'display_ads',
      pages: [
        {
          id: 'p-4',
          slug: 'cost-of-living-in-lisbon-portugal',
          title: 'Cost of Living in Lisbon, Portugal (2026 Complete Guide)',
          metaDescription: 'How much does it cost to live in Lisbon in 2026? Rent, groceries, coworking spaces, and taxes for remote workers.',
          category: 'Southern Europe',
          targetKeyword: 'cost of living in lisbon',
          monthlySearchVolume: 9200,
          keywordDifficulty: 28,
          sampleData: {
            avgRent: '$1,200/mo',
            coffee: '$1.50',
            internetSpeed: '250 Mbps',
            safetyScore: '9.2 / 10',
          },
        },
        {
          id: 'p-5',
          slug: 'da-nang-vietnam-digital-nomad-guide',
          title: 'Da Nang, Vietnam for Digital Nomads: Rent, Cafes & Costs',
          metaDescription: 'The complete remote worker guide to Da Nang: beachside apartments under $450/mo and top coworking cafes.',
          category: 'Southeast Asia',
          targetKeyword: 'da nang digital nomad guide',
          monthlySearchVolume: 5100,
          keywordDifficulty: 19,
          sampleData: {
            avgRent: '$420/mo',
            coffee: '$1.20',
            internetSpeed: '120 Mbps',
            safetyScore: '9.5 / 10',
          },
        },
      ],
    },
  ];

  const [selectedDataset, setSelectedDataset] = useState<SEODataset>(datasets[0]);
  const [selectedPage, setSelectedPage] = useState<ProgrammaticPage>(datasets[0].pages[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  // Simulator Sliders
  const [pagesCount, setPagesCount] = useState<number>(850);
  const [avgDailyClicksPerPage, setAvgDailyClicksPerPage] = useState<number>(5);
  const [adRpm, setAdRpm] = useState<number>(28); // $28 per 1,000 views
  const [affiliateConversionRate, setAffiliateConversionRate] = useState<number>(1.2); // %
  const [injectedSuccess, setInjectedSuccess] = useState(false);

  // 24-Month Projection Model
  const projections: TrafficProjectionPoint[] = useMemo(() => {
    const points: TrafficProjectionPoint[] = [];
    const maxMonthlyVisits = pagesCount * avgDailyClicksPerPage * 30;

    for (let m = 1; m <= 24; m++) {
      // S-Curve (Sigmoid) progression simulating Google indexation & sandbox
      // Month 1-3: slow crawl
      // Month 4-12: steep organic hockey-stick acceleration
      // Month 13-24: compounding domain authority
      const progress = 1 / (1 + Math.exp(-0.35 * (m - 9)));
      const visits = Math.round(maxMonthlyVisits * progress);

      // Ad revenue: (Visits / 1000) * RPM
      const adRev = Math.round((visits / 1000) * adRpm);

      // Affiliate revenue: Visits * (conversionRate / 100) * $35 avg commission
      const affRev = Math.round(visits * (affiliateConversionRate / 100) * 0.08 * 35);

      // SaaS / Digital tool upsell: Visits * 0.005 * $29/mo
      const saasRev = Math.round(visits * 0.003 * 29);

      const totalMonthlyRev = adRev + affRev + saasRev;
      const valuation = totalMonthlyRev * 35; // Standard 35x monthly EBITDA valuation multiple

      points.push({
        month: m,
        organicVisits: visits,
        adRevenue: adRev,
        affiliateRevenue: affRev,
        saasRevenue: saasRev,
        totalMonthlyRevenue: totalMonthlyRev,
        cumulativeAssetValuation: valuation,
      });
    }

    return points;
  }, [pagesCount, avgDailyClicksPerPage, adRpm, affiliateConversionRate]);

  const month24Result = projections[projections.length - 1];

  const handleInjectRevenue = () => {
    addIncomeStream({
      name: `Organic Flywheel Asset (${pagesCount} Programmatic Pages)`,
      amount: month24Result.totalMonthlyRevenue,
      type: 'business',
      isPassive: true,
      growthRateAnnual: 15,
    });
    setInjectedSuccess(true);
    setTimeout(() => setInjectedSuccess(false), 3000);
  };

  const copyEmbedCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-sky-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Rocket className="w-4 h-4 animate-pulse text-sky-400" />
            <span>Compounding Zero-Ad-Spend Flywheel</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Organic Growth Machine
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Paid ads are a treadmill: stop paying, and traffic dies. <strong className="text-white">Organic growth systems build permanent digital real estate</strong>. Using Programmatic SEO and Engineering-as-Marketing, thousands of pages rank on Google 24/7, compounding into massive multi-million dollar assets on autopilot.
          </p>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block">Projected Organic Visits</span>
              <span className="text-lg font-bold text-sky-300">
                {month24Result.organicVisits.toLocaleString()} visits/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Ad & Affiliate Cash Flow</span>
              <span className="text-lg font-bold text-emerald-400">
                {formatCurrency(month24Result.totalMonthlyRevenue, state.currency)}/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Estimated Asset Valuation</span>
              <span className="text-lg font-bold text-amber-300">
                {formatCurrency(month24Result.cumulativeAssetValuation, state.currency)}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Customer Acquisition Cost</span>
              <span className="text-lg font-bold text-teal-400">
                $0.00 (Pure SEO)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('programmatic')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'programmatic'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Programmatic SEO Generator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tools')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'tools'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Engineering-as-Marketing (Free Tools)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'simulator'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Hockey-Stick Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('playbook')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'playbook'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>0 to 100k Playbook</span>
        </button>
      </div>

      {/* SUB-TAB 1: Programmatic SEO Generator */}
      {activeSubTab === 'programmatic' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Database className="w-5 h-5 text-sky-400" />
                  <span>The Programmatic Page Engine (1 Dataset $\rightarrow$ 1,000+ Pages)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Instead of writing one manual blog post at a time, you design 1 high-converting template, connect a database of entities, and generate thousands of indexable Google landing pages instantly.
                </p>
              </div>

              {/* Dataset Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Dataset:</span>
                <select
                  value={selectedDataset.id}
                  onChange={(e) => {
                    const ds = datasets.find((d) => d.id === e.target.value) || datasets[0];
                    setSelectedDataset(ds);
                    setSelectedPage(ds.pages[0]);
                  }}
                  className="bg-slate-900 border border-slate-700 text-xs font-semibold rounded-lg p-2 text-white"
                >
                  {datasets.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.totalEntities} entities)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Split View: Dataset Pages List vs Live Google Page Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              {/* Left Column: Sample Generated Pages in Dataset */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Generated Long-Tail Pages ({selectedDataset.pages.length} samples shown)
                </span>
                {selectedDataset.pages.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPage(p)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition ${
                      selectedPage.id === p.id
                        ? 'bg-sky-950/40 border-sky-500/60 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-sky-400 font-semibold">{p.category}</span>
                      <span className="text-emerald-400 font-bold">{p.monthlySearchVolume.toLocaleString()} searches/mo</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block truncate">/{p.slug}</span>
                  </div>
                ))}

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 text-center">
                  + {selectedDataset.totalEntities - selectedDataset.pages.length} more pages generated automatically from database records.
                </div>
              </div>

              {/* Right Column: Live Simulated Google SERP & Page Template Preview */}
              <div className="lg:col-span-2 space-y-4">
                {/* Google SERP Snippet Preview */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">🌐</span>
                    <span>https://yourbrand.com › {selectedPage.slug}</span>
                  </div>
                  <h4 className="text-sm font-bold text-sky-400 hover:underline cursor-pointer">
                    {selectedPage.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedPage.metaDescription}
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 pt-1">
                    <span>Keyword: <strong className="text-slate-300">{selectedPage.targetKeyword}</strong></span>
                    <span>•</span>
                    <span>KD Score: <strong className="text-emerald-400">{selectedPage.keywordDifficulty}/100 (Easy)</strong></span>
                  </div>
                </div>

                {/* Rendered Template Preview */}
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white">Live Rendered Programmatic Page</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      SCHEMA OPTIMIZED
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-white">{selectedPage.title}</h2>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Comprehensive 2026 data analysis for <strong>{selectedPage.targetKeyword}</strong>. Automatically synchronized via dynamic database API.
                    </p>
                  </div>

                  {/* Dynamic Entity Data Table */}
                  <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Structured Dataset Telemetry:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedPage.sampleData).map(([key, val]) => (
                        <div key={key} className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold block">{key}</span>
                          <span className="text-xs font-bold text-white">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monetization Hook */}
                  <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">Want to try the #1 recommended solution?</span>
                      <p className="text-[11px] text-slate-400">Exclusive 30-day trial for our organic readers.</p>
                    </div>
                    <button className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition whitespace-nowrap">
                      Claim Offer (Affiliate CTA)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: Engineering-as-Marketing (Free Tools) */}
      {activeSubTab === 'tools' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                <span>Engineering-as-Marketing: Free Viral Utility Widgets</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Free tools generate 10x more backlinks and social bookmarks than articles. When other websites embed your tool, you gain permanent high-authority backlinks that push your site to #1 on Google.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Tool 1: Break-Even & Profit Calculator Widget */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    HIGH-VIRALITY WIDGET
                  </span>
                  <span className="text-xs text-slate-400">Est. 120+ natural backlinks/yr</span>
                </div>
                <h4 className="text-sm font-bold text-white">SaaS Unit Economics & Break-Even Calculator</h4>
                <p className="text-xs text-slate-300">
                  A free, clean widget that founders bookmark and embed in their blogs. Includes the built-in "Powered by [Your Brand]" viral backlink loop.
                </p>

                {/* Embed Code Snippet */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Embeddable Iframe Code</span>
                    <button
                      onClick={() =>
                        copyEmbedCode(
                          `<iframe src="https://yourbrand.com/embed/calculator" width="100%" height="450" frameborder="0"></iframe>\n<p style="font-size:11px;">Powered by <a href="https://yourbrand.com">FreedomOS</a></p>`
                        )
                      }
                      className="flex items-center space-x-1 text-[11px] text-sky-400 hover:text-white"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Embed'}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] text-slate-400 font-mono overflow-x-auto">
                    {`<iframe src="https://yourbrand.com/embed/calculator" width="100%" height="450" frameborder="0"></iframe>\n<p>Powered by <a href="https://yourbrand.com">YourBrand</a></p>`}
                  </pre>
                </div>
              </div>

              {/* Tool 2: The Viral Hook Scorer */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    SOCIAL VIRALITY WIDGET
                  </span>
                  <span className="text-xs text-slate-400">Gets shared on Twitter & LinkedIn</span>
                </div>
                <h4 className="text-sm font-bold text-white">Social Media Headline & Hook Analyzer</h4>
                <p className="text-xs text-slate-300">
                  Scores headlines 1-100 based on curiosity, emotional trigger words, and length. Content creators tweet their score, driving exponential referral loops back to your site.
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Viral Loop Mechanism</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Every time a user tests a headline, they can click <em>"Share My Score on X"</em>:
                    <br />
                    <span className="text-sky-300 font-mono mt-1 block">
                      "My hook scored 94/100 on @YourBrand! Test yours free: yourbrand.com/hook"
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Hockey-Stick Simulator */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sliders */}
            <div className="glass-panel p-5 rounded-2xl space-y-5">
              <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                <span>Organic Scale Levers</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Total Programmatic Pages</span>
                  <span className="font-bold text-white">{pagesCount} pages</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={pagesCount}
                  onChange={(e) => setPagesCount(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Average Daily Clicks / Page</span>
                  <span className="font-bold text-sky-400">{avgDailyClicksPerPage} clicks/day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={avgDailyClicksPerPage}
                  onChange={(e) => setAvgDailyClicksPerPage(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 mt-1">Long-tail keywords average 3-10 clicks per day each.</p>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Display Ad RPM</span>
                  <span className="font-bold text-emerald-400">${adRpm} / 1k views</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="1"
                  value={adRpm}
                  onChange={(e) => setAdRpm(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Affiliate Conversion Rate</span>
                  <span className="font-bold text-teal-400">{affiliateConversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={affiliateConversionRate}
                  onChange={(e) => setAffiliateConversionRate(parseFloat(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={handleInjectRevenue}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-sky-500/20"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    {injectedSuccess ? '✓ Injected into FreedomOS!' : 'Inject Organic Cash Flow'}
                  </span>
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-1.5">
                  Adds ${month24Result.totalMonthlyRevenue.toLocaleString()}/mo to your FreedomOS wealth timeline!
                </p>
              </div>
            </div>

            {/* Projection Chart & Summary */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">24-Month Organic Compounding Hockey-Stick</h3>
                    <p className="text-xs text-slate-400">Notice the explosion in traffic between Months 6 and 18 as Google authority matures.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-semibold">Month 24 Run-Rate</span>
                    <span className="text-xl font-black text-emerald-400">
                      {formatCurrency(month24Result.totalMonthlyRevenue, state.currency)}/mo
                    </span>
                  </div>
                </div>

                {/* Recharts Area Chart */}
                <div className="h-64 sm:h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
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
                        tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        formatter={(val: number) => [`${val.toLocaleString()} visits`, 'Monthly Organic Traffic']}
                        labelFormatter={(m) => `Month ${m}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="organicVisits"
                        name="Organic Traffic"
                        stroke="#38bdf8"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#gradVisits)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Asset Valuation Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800 text-center">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Ad Revenue</span>
                  <span className="text-sm font-bold text-white">
                    {formatCurrency(month24Result.adRevenue, state.currency)}/mo
                  </span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Affiliate Commissions</span>
                  <span className="text-sm font-bold text-teal-300">
                    {formatCurrency(month24Result.affiliateRevenue, state.currency)}/mo
                  </span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Software / Pro Upsells</span>
                  <span className="text-sm font-bold text-indigo-300">
                    {formatCurrency(month24Result.saasRevenue, state.currency)}/mo
                  </span>
                </div>
                <div className="bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/30">
                  <span className="text-[11px] text-amber-400 block font-semibold">Exit Asset Value (35x)</span>
                  <span className="text-sm font-black text-amber-300">
                    {formatCurrency(month24Result.cumulativeAssetValuation, state.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: 0 to 100k Playbook */}
      {activeSubTab === 'playbook' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <span>The 0 to 100,000 Visitors Roadmap (Step-by-Step)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              How to execute an organic flywheel with zero capital, zero ad spend, and compounding permanence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Phase 1: Database & Entity Curation (Weeks 1–2)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Pick a high-intent niche (AI tools, B2B software, remote work cities, finance benchmarks).</li>
                <li>Curate 500 to 1,000 rows in a CSV or Airtable with 10–15 columns of factual data (pricing, features, pros, cons, ratings).</li>
                <li>Ensure data is structured cleanly so it can be queried by a template.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                Phase 2: Template Architecture & SEO Schema (Weeks 3–4)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Create dynamic Next.js / Astro routes (e.g. <code>/tool/[slug]</code> and <code>/compare/[toolA]-vs-[toolB]</code>).</li>
                <li>Inject JSON-LD structured schema (SoftwareApplication, FAQPage, Review schema).</li>
                <li>Build an automated XML sitemap generator that outputs all URLs for Google Search Console.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Phase 3: The Google Crawl & Indexation Wave (Months 2–4)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Submit sitemap to Google Search Console and Bing Webmaster.</li>
                <li>Launch on Product Hunt and Reddit r/SideProject to generate initial domain authority (DA 15+).</li>
                <li>Google begins indexing long-tail pages; initial impressions start appearing in search analytics.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Phase 4: Monetization Activation & Compounding (Months 6–12)
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>At 20,000 monthly visits: Activate recurring SaaS affiliate programs ($30–$50/sale).</li>
                <li>At 50,000 monthly visits: Apply to premium ad networks (Mediavine / Raptive / Monumetric) for $25–$40 RPM.</li>
                <li>At 100,000+ monthly visits: Sell direct sponsorships ($1,500–$5,000/month) or launch your own proprietary Pro tier.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
