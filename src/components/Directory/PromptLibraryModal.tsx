import React, { useState } from 'react';
import { PROMPT_TEMPLATES, AIPromptTemplate } from '../../data/promptLibrary';
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  Download,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface PromptLibraryModalProps {
  onClose: () => void;
}

export const PromptLibraryModal: React.FC<PromptLibraryModalProps> = ({ onClose }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(false);

  const categories = ['All', 'Coding & Dev', 'Video & Animation', 'Copywriting', 'Sales & Outreach'];

  const filteredPrompts = PROMPT_TEMPLATES.filter(
    (p) => selectedCat === 'All' || p.category === selectedCat
  );

  const copyPromptText = (prompt: AIPromptTemplate) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  const handleCaptureLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    try {
      const existing = JSON.parse(localStorage.getItem('toolpulse_prompt_leads') || '[]');
      existing.push({ email: leadEmail, date: new Date().toISOString() });
      localStorage.setItem('toolpulse_prompt_leads', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setLeadCaptured(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-xs text-sky-400 font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Curated AI Prompts & Workflow Templates</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            High-Performance AI Prompts for Creators & Engineers
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Copy-paste production prompts tested across Cursor, HeyGen, Midjourney, and Instantly.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCat === c
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Prompts Cards List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {filteredPrompts.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div>
                  <span className="font-bold text-white text-sm block">{p.title}</span>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="text-sky-400 font-semibold">{p.toolTarget}</span>
                    <span>•</span>
                    <span className="text-amber-400 font-medium">Saves ~{p.estimatedTimeSaved}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
                      {p.difficulty}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => copyPromptText(p)}
                  className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold text-xs transition flex items-center space-x-1 shrink-0 w-fit"
                >
                  {copiedPromptId === p.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPromptId === p.id ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">{p.description}</p>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
                {p.promptText}
              </div>
            </div>
          ))}
        </div>

        {/* Lead Magnet Box: 100+ Master Notion Library */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-slate-950 to-indigo-950/40 border border-sky-500/30 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Unlock the Complete 100+ Master Prompt Database (Notion & PDF)</span>
            </span>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Free Download</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Get instant access to our master database of 100+ prompts for system architecture, cold outreach sequences, Midjourney styles, and viral video scripts.
          </p>

          {leadCaptured ? (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Template link dispatched! Check your inbox for your Notion template invite.</span>
            </div>
          ) : (
            <form onSubmit={handleCaptureLead} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter work email for instant Notion access..."
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition shadow-md shadow-sky-500/20 shrink-0 flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get Notion Pack →</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
