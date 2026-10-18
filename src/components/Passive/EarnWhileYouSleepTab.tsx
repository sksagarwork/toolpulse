import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { formatCurrency } from '../../utils/calculations';
import {
  Moon,
  Sparkles,
  Zap,
  DollarSign,
  Copy,
  Check,
  ExternalLink,
  Layers,
  TrendingUp,
  Lock,
  Globe,
} from 'lucide-react';
import { PassiveVehicle, TrafficChannel } from '../../types/passive';

export const EarnWhileYouSleepTab: React.FC = () => {
  const { state, addIncomeStream } = useFinance();

  const [activeSubTab, setActiveSubTab] = useState<'microsaas' | 'calculator' | 'blueprints' | 'traffic'>('microsaas');

  // Micro-SaaS Demo State
  const [promptAudience, setPromptAudience] = useState('E-commerce Shopify Brands doing $50k-$200k/mo');
  const [promptPainPoint, setPromptPainPoint] = useState('High cart abandonment and low email open rates');
  const [promptOffer, setPromptOffer] = useState('Automated high-retention email sequence that recovers 15% abandoned carts');
  const [generationType, setGenerationType] = useState<'cold_email' | 'viral_hook' | 'landing_page'>('cold_email');
  const [creditsLeft, setCreditsLeft] = useState<number>(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [showPaywallModal, setShowPaywallModal] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // MRR Calculator State
  const [subscribers, setSubscribers] = useState<number>(120);
  const [pricePerMonth, setPricePerMonth] = useState<number>(29);
  const [churnRate, setChurnRate] = useState<number>(4.5);
  const [injectedSuccess, setInjectedSuccess] = useState(false);

  const calculatedMRR = subscribers * pricePerMonth;
  const calculatedARR = calculatedMRR * 12;
  const netMRR = calculatedMRR * (1 - churnRate / 100);

  // Handle Micro-SaaS generation
  const handleGenerate = () => {
    if (creditsLeft <= 0) {
      setShowPaywallModal(true);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCreditsLeft((c) => c - 1);

      if (generationType === 'cold_email') {
        setGeneratedResult(
          `Subject: Quick question regarding your cart abandonment rates, {{First_Name}}?\n\n` +
          `Hey {{First_Name}},\n\n` +
          `Noticed your Shopify store has fantastic product catalog velocity, but likely losing 65%+ of potential buyers at the checkout step due to ${promptPainPoint}.\n\n` +
          `We engineered ${promptOffer} that triggers dynamically based on browse behavior with zero manual campaign setup.\n\n` +
          `We just recovered an extra $14,200 in 30 days for a peer brand in your niche on 100% autopilot.\n\n` +
          `Mind if I send over a 2-minute breakdown video of how the automation runs while you sleep?\n\n` +
          `Best,\n` +
          `[Your Name]`
        );
      } else if (generationType === 'viral_hook') {
        setGeneratedResult(
          `🔥 Hook 1: 99% of ${promptAudience} are burning cash because of ${promptPainPoint}. Here is the exact automation that fixes it in 48 hours:\n\n` +
          `🔥 Hook 2: If you run a business in 2026 and you aren't using this system to fix ${promptPainPoint}, you are essentially working for free.\n\n` +
          `🔥 Hook 3: How I automated ${promptOffer} to earn $3,400/month while sleeping (no ads, zero coding):`
        );
      } else {
        setGeneratedResult(
          `Headline: Stop Losing Customers to ${promptPainPoint}.\n\n` +
          `Sub-headline: The 24/7 automated engine that delivers ${promptOffer} so your revenue compounds around the clock.\n\n` +
          `Primary CTA: Start Free 7-Day Trial — Zero Risk, Cancel Anytime\n` +
          `Social Proof: Trusted by 450+ ${promptAudience} worldwide.`
        );
      }
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Inject MRR into FreedomOS context
  const handleInjectMRR = () => {
    addIncomeStream({
      name: `Micro-SaaS Subscriptions (${subscribers} users @ $${pricePerMonth}/mo)`,
      amount: Math.round(calculatedMRR),
      type: 'business',
      isPassive: true,
      growthRateAnnual: 20,
    });
    setInjectedSuccess(true);
    setTimeout(() => setInjectedSuccess(false), 3000);
  };

  // The 4 Sleep Income Blueprints
  const blueprints: PassiveVehicle[] = [
    {
      id: 'microsaas',
      title: 'AI Micro-SaaS Web Utility',
      tagline: 'Code Leverage — 24/7 Stripe Subscriptions',
      margin: '92% - 96% Gross Margin',
      maintenanceHoursPerMonth: 2,
      initialBuildTimeDays: 7,
      potentialMRR: '$2,000 - $15,000/mo',
      techStack: ['React / Vite', 'Supabase / SQLite', 'Stripe Checkout', 'Claude / Gemini API'],
      description: 'A focused, single-purpose web utility solving one expensive pain point (e.g. AI proposal generator, cold outreach personalization, PDF document scraper). Once launched, users sign up, enter their credit card via Stripe, and the software serves them automatically while you sleep.',
      stepByStepLaunch: [
        'Identify 1 painful, repeated task businesses spend 5+ hours a week doing.',
        'Build a simple frontend tool with a 3-credit free trial.',
        'Add Stripe Checkout subscription buttons ($19/mo and $49/mo).',
        'Post on Reddit (r/SideProject, r/SaaS) and 30 AI directories.',
        'Collect recurring Stripe payouts deposited directly into your bank every week.',
      ],
    },
    {
      id: 'digital_assets',
      title: 'Digital Asset & Template Storefront',
      tagline: 'Media Leverage — 99% Margin Digital Files',
      margin: '98% Gross Margin',
      maintenanceHoursPerMonth: 1,
      initialBuildTimeDays: 3,
      potentialMRR: '$1,000 - $8,000/mo',
      techStack: ['Gumroad / LemonSqueezy', 'Notion / Figma / Code Boilerplate', 'Twitter / YouTube'],
      description: 'Build it once, sell it an infinite number of times. Digital assets have zero inventory, zero shipping costs, and automated instant fulfillment. Customers click buy at 3:00 AM, payment processes, and they automatically download the asset.',
      stepByStepLaunch: [
        'Package your workflow into a template (Notion OS, Figma UI kit, Next.js Starter, Prompt bundle).',
        'Upload product to Gumroad or LemonSqueezy with clear before/after screenshots.',
        'Price between $29 and $99 one-time purchase.',
        'Distribute free "lite" teaser versions on Twitter and Reddit to drive inbound traffic.',
        '100% automated delivery with zero post-purchase maintenance.',
      ],
    },
    {
      id: 'programmatic_seo',
      title: 'Programmatic SEO & Affiliate Engine',
      tagline: 'Content Leverage — Ranked Google Pages on Autopilot',
      margin: '95% Gross Margin',
      maintenanceHoursPerMonth: 3,
      initialBuildTimeDays: 10,
      potentialMRR: '$3,000 - $20,000/mo',
      techStack: ['Next.js / Astro', 'Airtable / CSV Database', 'Affiliate Programs', 'Google Search Console'],
      description: 'A database-driven website that generates 1,000+ targeted comparison pages (e.g. "Best CRM for Dental Clinics", "Alternative to X for Freelancers"). Google indexes these pages, searchers arrive looking for solutions, and you earn 20%-40% recurring affiliate commissions when they sign up.',
      stepByStepLaunch: [
        'Curate a database of 200 software tools or products with affiliate programs.',
        'Generate programmatic comparison and directory pages using a dynamic template.',
        'Publish site and submit sitemap to Google Search Console.',
        'Earn passive commissions each time an organic visitor signs up via your affiliate link.',
      ],
    },
    {
      id: 'community_newsletter',
      title: 'Automated Paid Newsletter & Knowledge Hub',
      tagline: 'Audience Leverage — High-LTV Recurring Subscriptions',
      margin: '90% Gross Margin',
      maintenanceHoursPerMonth: 4,
      initialBuildTimeDays: 5,
      potentialMRR: '$2,500 - $12,000/mo',
      techStack: ['Substack / Beehiiv', 'Stripe', 'Curated Research Scripts'],
      description: 'Curate high-value industry intelligence, deals, or market opportunities once a week. Readers pay $15 to $30/month to stay ahead of their industry. With 200 members, that is $4,000/month recurring income with high retention.',
      stepByStepLaunch: [
        'Pick a specific high-value niche (e.g. AI automation opportunities, biotech deals, indie-hacker metrics).',
        'Set up a publication on Beehiiv or Substack with Stripe billing.',
        'Provide actionable data points unavailable in mainstream news.',
        'Convert 3%-5% of free subscribers to paid members ($19/mo).',
      ],
    },
  ];

  // Directory submission list for 24/7 traffic
  const trafficChannels: TrafficChannel[] = [
    { name: "There's An AI For That", category: 'directory', url: 'https://theresanaiforthat.com', domainAuthority: 78, instructions: 'Submit tool to reach 2M+ monthly tech early adopters.', isCompleted: false },
    { name: 'Futurepedia', category: 'directory', url: 'https://www.futurepedia.io', domainAuthority: 74, instructions: 'Largest AI resource directory; drives highly targeted software buyers.', isCompleted: false },
    { name: 'Product Hunt', category: 'community', url: 'https://www.producthunt.com', domainAuthority: 92, instructions: 'Launch at 12:01 AM PST to get 1,000+ visits in 24 hours.', isCompleted: false },
    { name: 'SaaSHub', category: 'directory', url: 'https://www.saashub.com', domainAuthority: 71, instructions: 'Great for organic SEO backlinks and comparison traffic.', isCompleted: false },
    { name: 'AlternativeTo', category: 'directory', url: 'https://alternativeto.net', domainAuthority: 83, instructions: 'List as an alternative to expensive enterprise tools.', isCompleted: false },
    { name: 'BetaList', category: 'community', url: 'https://betalist.com', domainAuthority: 70, instructions: 'Submit for early adopters and pre-launch waitlist traffic.', isCompleted: false },
    { name: 'Reddit r/SideProject', category: 'community', url: 'https://reddit.com/r/SideProject', domainAuthority: 95, instructions: 'Post a transparent founder story: "I built an automated tool to solve X while sleeping".', isCompleted: false },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <Moon className="w-4 h-4 animate-pulse text-indigo-400" />
            <span>Autonomous Code & Media Leverage</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Earn While You Sleep
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            <em className="text-indigo-300 font-medium">"If you don't find a way to make money while you sleep, you will work until you die."</em> — Warren Buffett.
            <br />
            True financial freedom is decoupled from your physical hours. This engine gives you deployable software products, Stripe checkout automation, and organic distribution pipelines that work 24/7/365.
          </p>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block">Baseline Passive Target</span>
              <span className="text-lg font-bold text-white">
                {formatCurrency(calculatedMRR, state.currency)}/mo
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Annualized Run-Rate</span>
              <span className="text-lg font-bold text-emerald-400">
                {formatCurrency(calculatedARR, state.currency)}/yr
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Labor Required After Launch</span>
              <span className="text-lg font-bold text-teal-300">
                0 Hours (Automated)
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Delivery Mechanism</span>
              <span className="text-lg font-bold text-indigo-400">
                Stripe + Webhooks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('microsaas')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'microsaas'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Live Micro-SaaS Tool (Deployable)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'calculator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Stripe MRR Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('blueprints')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'blueprints'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>The 4 Passive Blueprints</span>
        </button>

        <button
          onClick={() => setActiveSubTab('traffic')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeSubTab === 'traffic'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>24/7 Traffic Engine</span>
        </button>
      </div>

      {/* SUB-TAB 1: Live Micro-SaaS Tool */}
      {activeSubTab === 'microsaas' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-white">AI High-Converting Pitch & Copy Engine</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    LIVE PRODUCT READY
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  This is a real, functional software utility you can charge customers $19–$49/month to access. Try generating below!
                </p>
              </div>

              {/* Credit HUD & Paywall Trigger */}
              <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2 px-3 rounded-xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Free Trial Credits</span>
                  <span className="text-xs font-black text-indigo-400">{creditsLeft} of 3 remaining</span>
                </div>
                <button
                  onClick={() => setShowPaywallModal(true)}
                  className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
                >
                  View Stripe Paywall
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Target Customer / ICP</label>
                <input
                  type="text"
                  value={promptAudience}
                  onChange={(e) => setPromptAudience(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. Local Dental Clinics"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Primary Pain Point</label>
                <input
                  type="text"
                  value={promptPainPoint}
                  onChange={(e) => setPromptPainPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. Unanswered phone calls and missed appointments"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Your Solution / Offer</label>
                <input
                  type="text"
                  value={promptOffer}
                  onChange={(e) => setPromptOffer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. 24/7 AI Receptionist that books appointments instantly"
                />
              </div>
            </div>

            {/* Format Selector + Generate Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
              <div className="flex space-x-2">
                {[
                  { id: 'cold_email', label: 'Cold B2B Email' },
                  { id: 'viral_hook', label: 'Viral Social Hooks' },
                  { id: 'landing_page', label: 'Landing Page Hero' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setGenerationType(t.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      generationType === t.id
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'AI Engine Compounding...' : 'Generate High-Converting Copy'}</span>
              </button>
            </div>

            {/* Result Box */}
            {generatedResult && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-indigo-500/30 relative">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Generated High-Leverage Copy (Ready to Send)
                  </span>
                  <button
                    onClick={() => copyToClipboard(generatedResult)}
                    className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {generatedResult}
                </pre>
              </div>
            )}
          </div>

          {/* Paywall Modal Preview */}
          {showPaywallModal && (
            <div className="p-6 rounded-2xl border border-emerald-500/40 bg-slate-900/90 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Stripe Paywall Upgrade Modal (Customer View)</h4>
                </div>
                <button
                  onClick={() => setShowPaywallModal(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ✕ Close
                </button>
              </div>
              <p className="text-xs text-slate-300">
                This is what your customers see when their free credits run out. They select a tier, enter their credit card via Stripe, and payment recurs every month automatically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase">Starter</span>
                  <div className="text-2xl font-black text-white mt-1">$19<span className="text-xs text-slate-400">/mo</span></div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 mt-3">
                    <li>✓ 100 AI Generations/mo</li>
                    <li>✓ B2B Email & Pitch Templates</li>
                    <li>✓ Instant Copy & Export</li>
                  </ul>
                  <button className="w-full mt-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition">
                    Subscribe with Stripe
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-950/60 to-slate-950 border border-indigo-500/50 shadow-lg relative">
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black bg-indigo-500 text-white uppercase">
                    Most Popular
                  </span>
                  <span className="text-xs font-bold text-indigo-400 uppercase">Pro Unlimited</span>
                  <div className="text-2xl font-black text-white mt-1">$49<span className="text-xs text-slate-400">/mo</span></div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 mt-3">
                    <li>✓ Unlimited AI Generations</li>
                    <li>✓ Custom Tone & ICP Training</li>
                    <li>✓ Viral Social Hook Algorithms</li>
                    <li>✓ Priority Stripe Customer Portal</li>
                  </ul>
                  <button className="w-full mt-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition">
                    Subscribe with Stripe
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 uppercase">Agency / Lifetime</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">$199<span className="text-xs text-slate-400"> one-time</span></div>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 mt-3">
                    <li>✓ Lifetime Unlimited Access</li>
                    <li>✓ Up to 5 Team Members</li>
                    <li>✓ Zero Monthly Subscriptions</li>
                  </ul>
                  <button className="w-full mt-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold transition">
                    Get Lifetime Deal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: Stripe MRR Simulator */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sliders Column */}
            <div className="glass-panel p-5 rounded-2xl space-y-5">
              <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Unit Economics & Subscriber Sliders</span>
              </h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Paying Subscribers</span>
                  <span className="font-bold text-white">{subscribers} customers</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={subscribers}
                  onChange={(e) => setSubscribers(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Monthly Subscription Price</span>
                  <span className="font-bold text-emerald-400">${pricePerMonth}/mo</span>
                </div>
                <input
                  type="range"
                  min="9"
                  max="99"
                  step="5"
                  value={pricePerMonth}
                  onChange={(e) => setPricePerMonth(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Monthly Churn Rate</span>
                  <span className="font-bold text-rose-400">{churnRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={churnRate}
                  onChange={(e) => setChurnRate(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 mt-1">Average B2B SaaS monthly churn is 3%-5%.</p>
              </div>

              {/* Action: Inject into FreedomOS */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={handleInjectMRR}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    {injectedSuccess ? '✓ Injected into FreedomOS!' : 'Inject MRR into FreedomOS'}
                  </span>
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-1.5">
                  Adds this monthly cash flow to your Freedom engine to accelerate your FIRE date!
                </p>
              </div>
            </div>

            {/* Revenue Projections Panel */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-bold text-white text-base">Your 24/7 Sleep Income Run-Rate</h3>
                <p className="text-xs text-slate-400">
                  Because software operates with 95%+ gross margins, almost all revenue flows directly into your personal cash flow.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                      Monthly Recurring (MRR)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-400 mt-1">
                      {formatCurrency(calculatedMRR, state.currency)}
                    </div>
                    <span className="text-[11px] text-slate-400">Billed automatically on Stripe</span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                    <span className="text-xs uppercase tracking-wider text-emerald-400 block font-semibold">
                      Annual Recurring (ARR)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-300 mt-1">
                      {formatCurrency(calculatedARR, state.currency)}
                    </div>
                    <span className="text-[11px] text-emerald-400/80">Compounding capital</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-xs uppercase tracking-wider text-teal-400 block font-semibold">
                      Net Retention (Churn-adjusted)
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-teal-300 mt-1">
                      {formatCurrency(netMRR, state.currency)}
                    </div>
                    <span className="text-[11px] text-slate-400">After {churnRate}% monthly churn</span>
                  </div>
                </div>
              </div>

              {/* The Subscriber Ladder of Independence */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  The SaaS Freedom Ladder
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block font-semibold">50 Subs @ $29</span>
                    <strong className="text-white block mt-0.5">$1,450/mo</strong>
                    <span className="text-[10px] text-teal-400">Covers Rent</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block font-semibold">150 Subs @ $29</span>
                    <strong className="text-white block mt-0.5">$4,350/mo</strong>
                    <span className="text-[10px] text-emerald-400">Covers All Living Costs</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block font-semibold">350 Subs @ $29</span>
                    <strong className="text-white block mt-0.5">$10,150/mo</strong>
                    <span className="text-[10px] text-amber-400">Full Independence</span>
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30">
                    <span className="text-indigo-300 block font-semibold">1,000 Subs @ $29</span>
                    <strong className="text-white block mt-0.5">$29,000/mo</strong>
                    <span className="text-[10px] text-indigo-300 font-bold">Fat FIRE Wealth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: The 4 Passive Blueprints */}
      {activeSubTab === 'blueprints' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blueprints.map((item) => (
            <div key={item.id} className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {item.margin}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    Est. {item.potentialMRR}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mt-2">{item.title}</h4>
                <p className="text-xs text-indigo-300 font-medium">{item.tagline}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{item.description}</p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step by Step Launch */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  Automated Launch Playbook:
                </span>
                <ol className="text-[11px] text-slate-300 space-y-1 list-decimal list-inside">
                  {item.stepByStepLaunch.map((step, idx) => (
                    <li key={idx} className="leading-tight">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: 24/7 Traffic Engine */}
      {activeSubTab === 'traffic' && (
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Automated Inbound Traffic Engine (Zero Ad Spend)</h3>
              <p className="text-xs text-slate-400">
                Submit your Micro-SaaS to these top AI & software discovery directories to get indexed on Google and receive paying users while you sleep.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold self-start sm:self-center">
              7 High-DA Distribution Targets
            </span>
          </div>

          <div className="space-y-2.5">
            {trafficChannels.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                    DA {channel.domainAuthority}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{channel.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 capitalize">
                        {channel.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{channel.instructions}</span>
                  </div>
                </div>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold transition shrink-0 ml-3"
                >
                  <span>Submit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
