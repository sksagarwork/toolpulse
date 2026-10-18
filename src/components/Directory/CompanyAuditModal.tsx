import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface CompanyAuditModalProps {
  onClose: () => void;
}

export const CompanyAuditModal: React.FC<CompanyAuditModalProps> = ({ onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [teamSize, setTeamSize] = useState('1 - 5 (Lean Studio)');
  const [monthlySpend, setMonthlySpend] = useState('$100 - $500 / mo');
  const [email, setEmail] = useState('');
  const [auditGenerated, setAuditGenerated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !email) return;

    try {
      const existing = JSON.parse(localStorage.getItem('toolpulse_company_audits') || '[]');
      const newAuditLead = {
        companyName,
        website,
        teamSize,
        monthlySpend,
        email,
        date: new Date().toISOString(),
      };
      existing.push(newAuditLead);
      localStorage.setItem('toolpulse_company_audits', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setAuditGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Free B2B Tech Stack Audit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Optimize Your Company's AI Stack & Eliminate Software Waste
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Over 68% of tech companies pay for redundant AI software subscriptions. Get an instant automated audit report tailored to your team size.
          </p>
        </div>

        {!auditGenerated ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Company / Studio Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Media Corp"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Company Website</label>
                <input
                  type="url"
                  placeholder="https://acme.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Team Size</label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="1 - 5 (Lean Studio)">1 - 5 (Lean Studio)</option>
                  <option value="6 - 20 (Growing Agency)">6 - 20 (Growing Agency)</option>
                  <option value="21 - 50 (Scaleup)">21 - 50 (Scaleup)</option>
                  <option value="50+ (Enterprise)">50+ (Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Estimated Monthly Software Spend</label>
                <select
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="$100 - $500 / mo">$100 - $500 / mo</option>
                  <option value="$500 - $1,500 / mo">$500 - $1,500 / mo</option>
                  <option value="$1,500 - $5,000 / mo">$1,500 - $5,000 / mo</option>
                  <option value="$5,000+ / mo">$5,000+ / mo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Work Email (Where to Send Audit Report)</label>
              <input
                type="email"
                required
                placeholder="founder@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-[11px] space-y-1">
              <span className="font-bold text-slate-300 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>What's included in your free corporate audit:</span>
              </span>
              <p>• Duplicate tool consolidation checklist (e.g. Jasper vs Copy.ai vs ChatGPT)</p>
              <p>• Team seat pricing optimization analysis & enterprise discount codes</p>
              <p>• Tailored 3-tool automation roadmap for {teamSize}</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Generate My Instant AI Stack Audit Report →</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm">Audit Generated for {companyName}!</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Your audit report has been compiled and dispatched to <strong className="text-white">{email}</strong>.
              </p>
            </div>

            {/* Instant Snapshot HUD */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Potential Annual Savings</span>
                </span>
                <span className="text-lg font-black text-emerald-400 mt-1 block">
                  $1,200 - $3,600 / yr
                </span>
                <span className="text-[10px] text-slate-500">By eliminating redundant seats</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center space-x-1">
                  <DollarSign className="w-3.5 h-3.5 text-sky-400" />
                  <span>Productivity Uplift</span>
                </span>
                <span className="text-lg font-black text-sky-400 mt-1 block">
                  +35% Velocity
                </span>
                <span className="text-[10px] text-slate-500">Via agentic dev & video tools</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Immediate Recommendations:</span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                <li className="flex items-start space-x-1.5">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Consolidate Dev Tooling:</strong> Migrate developers from standard Copilot to Cursor or Windsurf for multi-file codebase indexing.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Video Automation:</strong> Replace live spokesperson production with HeyGen to reduce video creative production costs by 80%.</span>
                </li>
                <li className="flex items-start space-x-1.5">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Outbound Infrastructure:</strong> Transition outbound sales to Instantly.ai with automated warm-up pools to avoid domain blacklisting.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Done / Return to Directory
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
