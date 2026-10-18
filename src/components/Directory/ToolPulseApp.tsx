import React, { useState, useMemo } from 'react';
import { AITool, SubmissionPayload } from '../../types/directory';
import { AI_TOOLS, AI_CATEGORIES } from '../../data/aiToolsData';
import {
  Search,
  Sparkles,
  ExternalLink,
  Star,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowRight,
  Scale,
  FileCode,
  Copy,
  Check,
} from 'lucide-react';

export const ToolPulseApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  // Modals state
  const [activeToolDetail, setActiveToolDetail] = useState<AITool | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareToolA, setCompareToolA] = useState<AITool>(AI_TOOLS[0]);
  const [compareToolB, setCompareToolB] = useState<AITool>(AI_TOOLS[1]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSitemapModal, setShowSitemapModal] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  // Submit tool form state
  const [submission, setSubmission] = useState<SubmissionPayload>({
    toolName: '',
    websiteUrl: '',
    category: 'Productivity',
    pricingTier: 'Freemium',
    tagline: '',
    email: '',
    isSponsored: false,
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Deep-linking & Dynamic SEO Meta Tags Sync
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toolParam = params.get('tool');
    const catParam = params.get('category');

    if (toolParam) {
      const match = AI_TOOLS.find((t) => t.slug === toolParam || t.id === toolParam);
      if (match) setActiveToolDetail(match);
    } else if (catParam) {
      setSelectedCategory(catParam);
    }
  }, []);

  // Update Document Title & JSON-LD Rich Snippet Schema
  React.useEffect(() => {
    let scriptTag = document.getElementById('toolpulse-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'toolpulse-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (activeToolDetail) {
      document.title = `${activeToolDetail.name} Review, Pricing & Alternatives (2026) — ToolPulse`;
      const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: activeToolDetail.name,
        applicationCategory: activeToolDetail.category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: activeToolDetail.startingPrice.replace(/[^0-9.]/g, '') || '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: activeToolDetail.rating,
          ratingCount: activeToolDetail.reviewsCount,
        },
        description: activeToolDetail.description,
      };
      scriptTag.text = JSON.stringify(schemaData);
    } else {
      document.title = 'ToolPulse — The Autonomous AI Software Directory & Comparison Hub';
      const directorySchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ToolPulse',
        url: 'https://toolpulse.ai',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://toolpulse.ai/?search={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      };
      scriptTag.text = JSON.stringify(directorySchema);
    }
  }, [activeToolDetail]);

  const handleOpenTool = (tool: AITool) => {
    setActiveToolDetail(tool);
    const url = new URL(window.location.href);
    url.searchParams.set('tool', tool.slug);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseTool = () => {
    setActiveToolDetail(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('tool');
    window.history.pushState({}, '', url.toString());
  };

  // Filter & Search Logic
  const filteredTools = useMemo(() => {
    return AI_TOOLS.filter((tool) => {
      const matchesSearch =
        searchQuery === '' ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricingTier === selectedPricing;

      return matchesSearch && matchesCategory && matchesPricing;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, selectedPricing, sortBy]);

  const handleSubmitTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission.toolName || !submission.websiteUrl) return;
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setSubmission({
        toolName: '',
        websiteUrl: '',
        category: 'Productivity',
        pricingTier: 'Freemium',
        tagline: '',
        email: '',
        isSponsored: false,
      });
    }, 2500);
  };

  // Generate XML Sitemap string for all programmatic pages
  const generatedSitemap = useMemo(() => {
    const urls = [
      'https://toolpulse.ai/',
      ...AI_CATEGORIES.map((cat) => `https://toolpulse.ai/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`),
      ...AI_TOOLS.map((tool) => `https://toolpulse.ai/tool/${tool.slug}`),
    ];
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map(
        (url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`
      )
      .join('\n')}\n</urlset>`;
  }, []);

  const copySitemap = () => {
    navigator.clipboard.writeText(generatedSitemap);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Public Platform Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 p-6 sm:p-12 text-center shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-24 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Over 850+ Verified AI Tools Indexed</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Discover & Benchmark the World's Best AI Software
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Independent evaluations, pricing breakdowns, and direct comparisons. Updated daily to help you find the exact AI tools to automate your workflow.
          </p>

          {/* Master Search Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search AI tools by name, feature, or use-case (e.g. video, copy, coding)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
            <button
              onClick={() => setShowCompareModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <Scale className="w-3.5 h-3.5 text-sky-400" />
              <span>Versus Comparison Tool</span>
            </button>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 font-bold hover:opacity-90 transition shadow-md shadow-sky-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Submit Your Tool (Founder Portal)</span>
            </button>

            <button
              onClick={() => setShowSitemapModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>XML Sitemap & SEO Schema</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            selectedCategory === 'All'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All Categories ({AI_TOOLS.length})
        </button>
        {AI_CATEGORIES.map((cat) => {
          const count = AI_TOOLS.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Filters & Results Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800 text-xs">
        <div className="text-slate-400">
          Showing <strong className="text-white">{filteredTools.length}</strong> AI tools
          {selectedCategory !== 'All' && <span> in <span className="text-sky-400 font-semibold">{selectedCategory}</span></span>}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Pricing:</span>
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="All">All Pricing Tiers</option>
              <option value="Free">Free Only</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid Only</option>
              <option value="Free Trial">Free Trial</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Popular</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Card Top: Badges & Rating */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-sky-300 border border-slate-700">
                  {tool.category}
                </span>

                <div className="flex items-center space-x-2">
                  {tool.isTrending && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                      Trending
                    </span>
                  )}
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
                    <span className="text-slate-500 text-[10px]">({tool.reviewsCount.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition">
                {tool.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                {tool.tagline}
              </p>

              {/* Pricing Pill */}
              <div className="flex items-center space-x-2 mt-3 text-xs">
                <span className="font-semibold text-slate-400">Starting at:</span>
                <span className="font-extrabold text-white">{tool.startingPrice}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400">
                  {tool.pricingTier}
                </span>
              </div>
            </div>

            {/* Card Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => handleOpenTool(tool)}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center space-x-1 transition"
              >
                <span>Full Review & Pros/Cons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>Visit Tool</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* TOOL DETAIL MODAL */}
      {activeToolDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={handleCloseTool}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 text-xs text-sky-400 font-bold uppercase mb-1">
                <span>{activeToolDetail.category}</span>
                <span>•</span>
                <span>Verified {activeToolDetail.verifiedMonthYear}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{activeToolDetail.name}</h2>
              <p className="text-sm text-slate-300 mt-1">{activeToolDetail.tagline}</p>

              <div className="flex items-center space-x-4 mt-3 text-xs">
                <span className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{activeToolDetail.rating} / 5.0</span>
                </span>
                <span className="text-slate-400">Pricing: <strong className="text-white">{activeToolDetail.startingPrice}</strong> ({activeToolDetail.pricingTier})</span>
              </div>
            </div>

            {/* Description & Best For */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeToolDetail.description}
              </p>
              <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200">
                <strong>Best For:</strong> {activeToolDetail.bestFor}
              </div>
            </div>

            {/* Pros & Cons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/15 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Pros</span>
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {activeToolDetail.pros.map((p, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/15 border border-rose-500/20 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <XCircle className="w-4 h-4" />
                  <span>Verified Cons</span>
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {activeToolDetail.cons.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Core Architectural Features
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeToolDetail.keyFeatures.map((f, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Affiliate CTA Box */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">Official vendor partner link with exclusive bonus access.</span>
              <a
                href={activeToolDetail.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-sky-500/25 transition text-center"
              >
                Visit Official Site & Claim Free Trial →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* VERSUS COMPARISON MODAL */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowCompareModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>

            <div>
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase mb-1">
                <Scale className="w-4 h-4" />
                <span>Programmatic Versus Comparison Engine</span>
              </div>
              <h2 className="text-2xl font-black text-white">Side-by-Side Tool Showdown</h2>
              <p className="text-xs text-slate-300 mt-1">
                Compare ratings, pricing, and pros/cons between any two tools.
              </p>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Select Tool A</label>
                <select
                  value={compareToolA.id}
                  onChange={(e) => setCompareToolA(AI_TOOLS.find((t) => t.id === e.target.value) || AI_TOOLS[0])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  {AI_TOOLS.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Select Tool B</label>
                <select
                  value={compareToolB.id}
                  onChange={(e) => setCompareToolB(AI_TOOLS.find((t) => t.id === e.target.value) || AI_TOOLS[1])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                >
                  {AI_TOOLS.map((t) => (
                    <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden text-xs">
              <div className="grid grid-cols-3 bg-slate-950 p-3 font-bold border-b border-slate-800 text-slate-400">
                <span>Criteria</span>
                <span className="text-sky-400">{compareToolA.name}</span>
                <span className="text-indigo-400">{compareToolB.name}</span>
              </div>

              <div className="grid grid-cols-3 p-3 border-b border-slate-800/60 bg-slate-900/40">
                <span className="font-semibold text-slate-400">User Rating</span>
                <span className="font-bold text-white">⭐ {compareToolA.rating} / 5.0</span>
                <span className="font-bold text-white">⭐ {compareToolB.rating} / 5.0</span>
              </div>

              <div className="grid grid-cols-3 p-3 border-b border-slate-800/60 bg-slate-900/20">
                <span className="font-semibold text-slate-400">Pricing Model</span>
                <span className="font-bold text-white">{compareToolA.startingPrice} ({compareToolA.pricingTier})</span>
                <span className="font-bold text-white">{compareToolB.startingPrice} ({compareToolB.pricingTier})</span>
              </div>

              <div className="grid grid-cols-3 p-3 border-b border-slate-800/60 bg-slate-900/40">
                <span className="font-semibold text-slate-400">Primary Strength</span>
                <span className="text-slate-300">{compareToolA.bestFor}</span>
                <span className="text-slate-300">{compareToolB.bestFor}</span>
              </div>

              <div className="grid grid-cols-3 p-3 bg-slate-900/20">
                <span className="font-semibold text-slate-400">Official Link</span>
                <a
                  href={compareToolA.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline font-bold"
                >
                  Visit {compareToolA.name} →
                </a>
                <a
                  href={compareToolB.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline font-bold"
                >
                  Visit {compareToolB.name} →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOUNDER SUBMIT TOOL MODAL (MONETIZATION HOOK) */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">Founder Submissions</span>
              <h3 className="text-xl font-bold text-white mt-1">Get Your AI Tool Indexed on ToolPulse</h3>
              <p className="text-xs text-slate-300 mt-1">
                Reach thousands of early tech adopters looking for AI solutions every day.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Submission Received!</h4>
                <p className="text-xs text-slate-300">
                  Our indexing crawler will review and publish your tool profile within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitTool} className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VideoSynth AI"
                    value={submission.toolName}
                    onChange={(e) => setSubmission({ ...submission, toolName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">Website URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://yourproduct.com"
                    value={submission.websiteUrl}
                    onChange={(e) => setSubmission({ ...submission, websiteUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Category</label>
                    <select
                      value={submission.category}
                      onChange={(e) => setSubmission({ ...submission, category: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      {AI_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1">Pricing Model</label>
                    <select
                      value={submission.pricingTier}
                      onChange={(e) => setSubmission({ ...submission, pricingTier: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Free">Free</option>
                      <option value="Freemium">Freemium</option>
                      <option value="Paid">Paid</option>
                      <option value="Free Trial">Free Trial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">One-Line Tagline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Generate 4K video ads from text scripts in 60 seconds"
                    value={submission.tagline}
                    onChange={(e) => setSubmission({ ...submission, tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>

                {/* Sponsorship Tier Selection (How this directory monetizes) */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 pt-2">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Listing Placement</span>
                  <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="radio"
                      name="sponsorship"
                      checked={!submission.isSponsored}
                      onChange={() => setSubmission({ ...submission, isSponsored: false })}
                      className="accent-sky-500"
                    />
                    <span>Standard Community Listing — <strong>Free ($0)</strong></span>
                  </label>
                  <label className="flex items-center space-x-2 text-xs text-sky-300 font-bold cursor-pointer">
                    <input
                      type="radio"
                      name="sponsorship"
                      checked={submission.isSponsored}
                      onChange={() => setSubmission({ ...submission, isSponsored: true })}
                      className="accent-sky-500"
                    />
                    <span>Featured Spotlight (Pinned at Top for 30 Days) — <strong>$149</strong></span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-sky-500/20"
                >
                  Submit AI Tool for Indexation →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SITEMAP & TECHNICAL SEO MODAL */}
      {showSitemapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowSitemapModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Technical SEO Feed</span>
              <h3 className="text-xl font-bold text-white mt-1">Google XML Sitemap & JSON-LD Schema</h3>
              <p className="text-xs text-slate-300 mt-1">
                This exact XML sitemap file is what you submit to Google Search Console to index hundreds of pages in bulk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300">Generated /sitemap.xml ({AI_TOOLS.length + AI_CATEGORIES.length + 1} URLs)</span>
                <button
                  onClick={copySitemap}
                  className="flex items-center space-x-1 text-xs text-sky-400 hover:text-white"
                >
                  {copiedSitemap ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSitemap ? 'Copied XML' : 'Copy Sitemap'}</span>
                </button>
              </div>
              <pre className="text-[11px] text-slate-400 font-mono overflow-x-auto max-h-64 leading-tight">
                {generatedSitemap}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
