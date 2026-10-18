import React, { useState } from 'react';
import { AI_TOOLS } from '../../data/aiToolsData';
import { AITool } from '../../types/directory';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  Mail,
  Zap,
} from 'lucide-react';

interface AIStackQuizModalProps {
  onClose: () => void;
  onSelectTool: (tool: AITool) => void;
}

export const AIStackQuizModal: React.FC<AIStackQuizModalProps> = ({ onClose, onSelectTool }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedRole, setSelectedRole] = useState<string>('Solo Founder & Builder');
  const [selectedBottleneck, setSelectedBottleneck] = useState<string>('Coding & Fast Prototyping');
  const [selectedBudget, setSelectedBudget] = useState<string>('$50 - $150 / mo (Growth)');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  const ROLES = [
    { label: 'Solo Founder & Builder', icon: '🚀', desc: 'Running software, content, or agency solo' },
    { label: 'Software Engineer', icon: '💻', desc: 'Building full-stack apps and micro-SaaS' },
    { label: 'Content Creator & Media', icon: '🎥', desc: 'Producing YouTube, short-form, and podcasts' },
    { label: 'B2B Agency & Consultant', icon: '💼', desc: 'Delivering client work and outbound growth' },
  ];

  const BOTTLENECKS = [
    { label: 'Coding & Fast Prototyping', icon: '⚡', desc: 'Want to ship apps 5x faster with fewer bugs' },
    { label: 'Video & Visual Production', icon: '🎬', desc: 'Need studio video ads without cameras' },
    { label: 'Outbound Sales & Lead Gen', icon: '🎯', desc: 'Need consistent client meetings on autopilot' },
    { label: 'Research & Written Content', icon: '✍️', desc: 'Need deep factual research and high-converting copy' },
  ];

  const BUDGETS = [
    { label: 'Bootstrapped ($0 - Free tiers)', desc: 'Maximizing freemium models and free trials' },
    { label: '$50 - $150 / mo (Growth)', desc: 'Ready to invest in 2-3 essential superpower tools' },
    { label: '$200+ / mo (High Velocity)', desc: 'Prioritizing maximum time savings and automation' },
  ];

  // Dynamic Recommendation Engine based on answers
  const recommendedTools: AITool[] = React.useMemo(() => {
    let slugs: string[] = [];

    if (selectedBottleneck.includes('Coding')) {
      slugs = ['cursor', 'v0-dev', 'windsurf'];
    } else if (selectedBottleneck.includes('Video')) {
      slugs = ['heygen', 'runway', 'elevenlabs'];
    } else if (selectedBottleneck.includes('Sales')) {
      slugs = ['instantly-ai', 'apollo-io', 'clay-ai'];
    } else {
      slugs = ['perplexity', 'jasper-ai', 'notion-ai'];
    }

    return slugs
      .map((slug) => AI_TOOLS.find((t) => t.slug === slug || t.id === slug))
      .filter(Boolean) as AITool[];
  }, [selectedBottleneck]);

  const estimatedHoursSaved = React.useMemo(() => {
    if (selectedBottleneck.includes('Coding')) return 16;
    if (selectedBottleneck.includes('Video')) return 18;
    if (selectedBottleneck.includes('Sales')) return 14;
    return 12;
  }, [selectedBottleneck]);

  const estimatedDollarValue = React.useMemo(() => {
    // Valuing user time at $75/hr
    return estimatedHoursSaved * 4 * 75;
  }, [estimatedHoursSaved]);

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    try {
      const existing = JSON.parse(localStorage.getItem('toolpulse_quiz_leads') || '[]');
      const newLead = {
        email: leadEmail,
        role: selectedRole,
        bottleneck: selectedBottleneck,
        budget: selectedBudget,
        recommendedTools: recommendedTools.map((t) => t.name),
        date: new Date().toISOString(),
      };
      existing.push(newLead);
      localStorage.setItem('toolpulse_quiz_leads', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setLeadCaptured(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
        >
          ✕
        </button>

        {/* Header Indicator */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Interactive AI Stack Recommender</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Step {step} of 4</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {step === 1 && 'What is your primary role?'}
            {step === 2 && 'What is your biggest operational bottleneck?'}
            {step === 3 && 'What is your target monthly software budget?'}
            {step === 4 && 'Your Tailored AI Stack & ROI Projection'}
          </h2>
        </div>

        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Select your role so our algorithm can match tools calibrated for your exact workflow:
            </p>
            <div className="space-y-2.5">
              {ROLES.map((r) => (
                <div
                  key={r.label}
                  onClick={() => setSelectedRole(r.label)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center space-x-3.5 ${
                    selectedRole === r.label
                      ? 'bg-sky-500/10 border-sky-500/60 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-white text-xs block">{r.label}</span>
                    <span className="text-[11px] text-slate-400">{r.desc}</span>
                  </div>
                  {selectedRole === r.label && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition flex items-center justify-center space-x-1 shadow-lg shadow-sky-500/20"
            >
              <span>Next: Select Bottleneck</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: BOTTLENECK SELECTION */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Where do you or your team lose the most hours each week?
            </p>
            <div className="space-y-2.5">
              {BOTTLENECKS.map((b) => (
                <div
                  key={b.label}
                  onClick={() => setSelectedBottleneck(b.label)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center space-x-3.5 ${
                    selectedBottleneck === b.label
                      ? 'bg-sky-500/10 border-sky-500/60 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold text-white text-xs block">{b.label}</span>
                    <span className="text-[11px] text-slate-400">{b.desc}</span>
                  </div>
                  {selectedBottleneck === b.label && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                </div>
              ))}
            </div>
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition flex items-center justify-center space-x-1 shadow-lg shadow-sky-500/20"
              >
                <span>Next: Target Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET SELECTION */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              Select your comfort zone for software tools so we prioritize free tiers vs premium tools:
            </p>
            <div className="space-y-2.5">
              {BUDGETS.map((bg) => (
                <div
                  key={bg.label}
                  onClick={() => setSelectedBudget(bg.label)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center space-x-3.5 ${
                    selectedBudget === bg.label
                      ? 'bg-sky-500/10 border-sky-500/60 shadow-lg shadow-sky-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1">
                    <span className="font-bold text-white text-xs block">{bg.label}</span>
                    <span className="text-[11px] text-slate-400">{bg.desc}</span>
                  </div>
                  {selectedBudget === bg.label && <CheckCircle2 className="w-4 h-4 text-sky-400" />}
                </div>
              ))}
            </div>
            <div className="flex space-x-2 pt-1">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-black text-xs transition flex items-center justify-center space-x-1 shadow-lg shadow-sky-500/25"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Generate My Custom AI Stack</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION & HIGH-CONVERTING LEAD CAPTURE */}
        {step === 4 && (
          <div className="space-y-5">
            {/* Value HUD */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Est. Time Saved</span>
                </span>
                <span className="text-xl font-black text-white mt-1 block">
                  ~{estimatedHoursSaved} hrs <span className="text-xs text-sky-400 font-normal">/ week</span>
                </span>
                <span className="text-[10px] text-slate-500">Recovers ~2 full workdays</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Monthly Value</span>
                </span>
                <span className="text-xl font-black text-emerald-400 mt-1 block">
                  ${estimatedDollarValue.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Calculated @ $75/hr billable</span>
              </div>
            </div>

            {/* Recommended Tools Cards */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Your Matched AI Stack
              </span>
              <div className="space-y-2">
                {recommendedTools.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      onClose();
                      onSelectTool(t);
                    }}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white group-hover:text-sky-300 transition">{t.name}</span>
                        <span className="text-amber-400 font-bold">⭐ {t.rating}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400">
                          {t.startingPrice}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 line-clamp-1">{t.tagline}</span>
                    </div>
                    <span className="text-sky-400 font-bold text-[11px] flex items-center space-x-1">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Magnet Form (Captures Lead into Database) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-950 to-indigo-950/40 border border-sky-500/30 space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-white flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>Get Your Full Implementation Blueprint & $1,200 in AI Promo Codes</span>
                </span>
                <p className="text-[11px] text-slate-300">
                  We'll email you the step-by-step setup guides for this stack plus our verified partner discounts.
                </p>
              </div>

              {leadCaptured ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Blueprint sent! Check your inbox shortly for your custom stack report.</span>
                </div>
              ) : (
                <form onSubmit={handleCaptureLead} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email..."
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/20 shrink-0"
                  >
                    Email My Blueprint →
                  </button>
                </form>
              )}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-300 transition block text-center w-full"
            >
              ← Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
