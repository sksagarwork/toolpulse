import React, { useState } from 'react';
import { Award, Copy, Check, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { AI_TOOLS } from '../../data/aiToolsData';

interface BacklinkBadgeModalProps {
  onClose: () => void;
  initialToolSlug?: string;
}

export const BacklinkBadgeModal: React.FC<BacklinkBadgeModalProps> = ({
  onClose,
  initialToolSlug,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string>(initialToolSlug || AI_TOOLS[0].slug);
  const [badgeTheme, setBadgeTheme] = useState<'obsidian' | 'gold' | 'emerald' | 'shield'>('obsidian');
  const [format, setFormat] = useState<'html' | 'markdown' | 'react'>('markdown');
  const [copied, setCopied] = useState(false);
  const [founderEmail, setFounderEmail] = useState('');
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const selectedTool = AI_TOOLS.find((t) => t.slug === selectedSlug) || AI_TOOLS[0];
  const targetUrl = `https://toolpulse.ai/tool/${selectedTool.slug}`;

  // Generated badge images / SVG URLs
  const badgeSvgs: Record<string, string> = {
    obsidian: `https://img.shields.io/badge/Featured_on-ToolPulse_AI-0f172a?style=for-the-badge&logo=sparkles&logoColor=38bdf8&labelColor=020617`,
    gold: `https://img.shields.io/badge/Top_AI_Tool_2026-ToolPulse_Verified-b45309?style=for-the-badge&logo=checkmarx&logoColor=fde047&labelColor=451a03`,
    emerald: `https://img.shields.io/badge/Community_Choice-ToolPulse_AI-065f46?style=for-the-badge&logo=target&logoColor=34d399&labelColor=022c22`,
    shield: `https://img.shields.io/badge/ToolPulse-Verified_AI_Software-38bdf8?style=flat-square&logo=shield`,
  };

  const currentBadgeImg = badgeSvgs[badgeTheme];

  const getEmbedCode = () => {
    if (format === 'markdown') {
      return `[![Featured on ToolPulse AI](${currentBadgeImg})](${targetUrl})`;
    }
    if (format === 'html') {
      return `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${currentBadgeImg}" alt="Featured on ToolPulse AI" style="height: 38px;" />\n</a>`;
    }
    return `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${currentBadgeImg}" alt="Featured on ToolPulse AI" className="h-9 hover:opacity-90 transition" />\n</a>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaimListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!founderEmail) return;

    try {
      const existing = JSON.parse(localStorage.getItem('toolpulse_badge_claims') || '[]');
      existing.push({
        tool: selectedTool.name,
        slug: selectedTool.slug,
        email: founderEmail,
        theme: badgeTheme,
        date: new Date().toISOString(),
      });
      localStorage.setItem('toolpulse_badge_claims', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setVerifiedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
        >
          ✕
        </button>

        {/* Header */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-sky-400" />
            <span>Official Backlink & Recognition Badges</span>
          </div>
          <h2 className="text-xl font-black text-white">Embed "Featured on ToolPulse" Badge</h2>
          <p className="text-xs text-slate-400">
            Show off your independent verified ranking, boost brand trust, and generate continuous dofollow SEO authority.
          </p>
        </div>

        {/* Tool Selector & Badge Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1.5">Select Software to Feature</label>
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {AI_TOOLS.map((tool) => (
                <option key={tool.slug} value={tool.slug}>
                  {tool.name} ({tool.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1.5">Badge Aesthetic</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'obsidian', label: 'Dark Obsidian' },
                { id: 'gold', label: 'Gold Top Pick' },
                { id: 'emerald', label: 'Community Choice' },
                { id: 'shield', label: 'Flat Minimal' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setBadgeTheme(style.id as any)}
                  className={`p-2 rounded-xl text-center border font-semibold transition ${
                    badgeTheme === style.id
                      ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Live Badge Preview */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Live Landing Page Preview
          </span>
          <div className="flex items-center justify-center p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition transform">
              <img src={currentBadgeImg} alt="Featured on ToolPulse AI" className="h-10 cursor-pointer" />
            </a>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center justify-center space-x-1">
            <span>Links directly to</span>
            <span className="text-sky-400 font-mono">{targetUrl}</span>
            <ExternalLink className="w-3 h-3 text-sky-400 inline" />
          </p>
        </div>

        {/* 1-Click Code Embed Box */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {(['markdown', 'html', 'react'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`px-3 py-1 rounded-lg font-bold uppercase text-[10px] transition ${
                    format === fmt
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
            <button
              onClick={copyCode}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-black hover:opacity-95 transition flex items-center space-x-1.5 shadow-md shadow-sky-500/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Embed Code!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-300 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {getEmbedCode()}
          </pre>
        </div>

        {/* Lead Magnet: Founder Badge Verification */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-sky-500/30 text-xs space-y-3">
          <div className="flex items-center space-x-2 text-sky-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Are you a Maker or Founder of {selectedTool.name}?</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Claim your verified checkmark badge to boost CTR by 42% on ToolPulse and receive weekly organic click reports directly to your inbox.
          </p>

          {!verifiedSuccess ? (
            <form onSubmit={handleClaimListing} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="founder@company.com"
                value={founderEmail}
                onChange={(e) => setFounderEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/20 whitespace-nowrap"
              >
                Claim Verified Badge
              </button>
            </form>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Claim submitted! Verification token generated for {founderEmail}. Checkmark will activate upon badge embed detection.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
