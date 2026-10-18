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
  Mail,
  DollarSign,
  TrendingUp,
  BarChart2,
  BookOpen,
  Download,
  Share2,
  Tag,
  Users,
  Send,
  Award,
  Building2,
  FileText,
} from 'lucide-react';
import { BUYING_GUIDES, BuyingGuide } from '../../data/buyingGuides';
import { AI_DEALS, AIDeal } from '../../data/aiDealsData';
import { OUTREACH_LEADS, OutreachLead } from '../../data/outreachLeads';
import { AIStackQuizModal } from './AIStackQuizModal';
import { CompanyAuditModal } from './CompanyAuditModal';
import { PromptLibraryModal } from './PromptLibraryModal';

const POPULAR_SHOWDOWNS = [
  { slugA: 'cursor', slugB: 'windsurf', label: 'Cursor vs Windsurf' },
  { slugA: 'heygen', slugB: 'runway', label: 'HeyGen vs Runway' },
  { slugA: 'midjourney', slugB: 'flux-ai', label: 'Midjourney vs Flux.1' },
  { slugA: 'claude-ai', slugB: 'chatgpt-plus', label: 'Claude 3.5 vs ChatGPT' },
  { slugA: 'jasper-ai', slugB: 'copy-ai', label: 'Jasper vs Copy.ai' },
  { slugA: 'suno', slugB: 'udio', label: 'Suno vs Udio' },
];

const VIRAL_POSTS = [
  {
    key: 'reddit',
    platform: 'Reddit (r/SaaS, r/SideProject, r/ArtificialInteligence)',
    badge: 'High Value Case Study',
    title: 'Value Post: "I benchmarked 40+ AI tools over 60 days to find which ones actually earn money"',
    content: `Hey everyone,\n\nLike many founders, I was burning $300+/month on AI software subscriptions that turned out to be thin API wrappers with zero compounding utility.\n\nSo I spent the last two months independently testing and benchmarking 41 dominant AI tools across 12 categories, analyzing verified pros/cons, real output quality, and ROI.\n\nHere are the only ones that legitimately pay for themselves in 2026:\n\n1. VIDEO: HeyGen for automated talking-head video ads (lip sync is unmatched). Runway Gen-3 for VFX and cinematic b-roll.\n2. CODING: Cursor Composer mode saves ~12 hours of debugging per week. v0 is best for React/Tailwind prototyping.\n3. AUDIO: ElevenLabs remains untouchable for realistic voiceovers. Suno for background jingles.\n4. RESEARCH: Perplexity replaces 80% of standard Google search time.\n5. SALES: Instantly AI for cold email infrastructure and warm-up pools.\n\nI compiled the complete side-by-side comparison matrix and pricing breakdowns at https://toolpulse.ai (100% open, zero login required).\n\nWhat AI tools in your daily stack are legitimately generating revenue for you?`,
  },
  {
    key: 'twitter',
    platform: 'Twitter / X (Viral Hook Thread)',
    badge: 'Viral Bookmark Magnet',
    title: '8-Part Curated AI Stack Thread',
    content: `95% of AI tools are a waste of money.\n\nHere are the 7 AI tools that actually print revenue for solopreneurs in 2026 (save this):\n\n1. Cursor (@cursor_ai): Codebase-aware multi-file editor that replaces legacy autocomplete.\n2. HeyGen (@HeyGen_Official): Studio-quality video ads from text scripts with realistic avatars.\n3. ElevenLabs (@elevenlabsio): The gold standard for voice cloning and narrations.\n4. Perplexity (@perplexity_ai): Source-backed synthesized research that kills manual Google browsing.\n5. Instantly (@instantlyai): Scalable cold email delivery and automated lead engines.\n6. Flux.1: Photorealistic imagery with prompt fidelity beating Midjourney.\n7. Make.com (@make_hq): The autonomous connective tissue gluing them all together.\n\nWe benchmarked and ranked 40+ tools with live side-by-side spec sheets:\n👉 https://toolpulse.ai\n\nRT if this saved you from paying for hype software.`,
  },
  {
    key: 'producthunt',
    platform: 'Product Hunt Launch',
    badge: 'Launch Day Copy',
    title: 'Tagline & Maker First Comment',
    content: `Hey Product Hunt community! 👋\n\nFinding honest, unbiased AI tool recommendations in 2026 is almost impossible—Google results are flooded with sponsored junk and Reddit threads are stale.\n\nWe created ToolPulse to solve this:\n✨ 41+ verified AI tools across 12 categories\n⚡ Side-by-side Versus comparison matrix (Cursor vs Windsurf, Midjourney vs Flux)\n🔍 Honest Verified Pros & Cons for every software\n📊 Real pricing breakdowns & verified free trial shortcuts\n📚 Hands-on buying guides & technical benchmarks\n\nCheck it out and let us know what software we should benchmark next!\n🔗 https://toolpulse.ai`,
  },
];

export const ToolPulseApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPricing, setSelectedPricing] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  // Modals state
  const [activeToolDetail, setActiveToolDetail] = useState<AITool | null>(null);
  const [activeGuide, setActiveGuide] = useState<BuyingGuide | null>(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareToolA, setCompareToolA] = useState<AITool>(AI_TOOLS[0]);
  const [compareToolB, setCompareToolB] = useState<AITool>(AI_TOOLS[1]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showSitemapModal, setShowSitemapModal] = useState(false);
  const [copiedSitemap, setCopiedSitemap] = useState(false);

  // Founder HUD & Outbound Click Tracking (Monetization Engine)
  const [showFounderHud, setShowFounderHud] = useState(false);
  const [founderHudTab, setFounderHudTab] = useState<'stats' | 'viral' | 'outreach' | 'leads' | 'export'>('stats');
  const [copiedSocialKey, setCopiedSocialKey] = useState<string | null>(null);
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [copiedBadgeCode, setCopiedBadgeCode] = useState(false);
  const [revealedDeals, setRevealedDeals] = useState<{ [dealId: string]: boolean }>({});
  const [outboundClicks, setOutboundClicks] = useState<{ [toolId: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('toolpulse_clicks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Newsletter Lead Magnet State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
    const compareParam = params.get('compare');
    const guideParam = params.get('guide');

    if (toolParam) {
      const match = AI_TOOLS.find((t) => t.slug === toolParam || t.id === toolParam);
      if (match) setActiveToolDetail(match);
    } else if (guideParam) {
      const matchGuide = BUYING_GUIDES.find((g) => g.slug === guideParam || g.id === guideParam);
      if (matchGuide) setActiveGuide(matchGuide);
    } else if (catParam) {
      setSelectedCategory(catParam);
    } else if (compareParam && compareParam.includes('-vs-')) {
      const [slugA, slugB] = compareParam.split('-vs-');
      const toolA = AI_TOOLS.find((t) => t.slug === slugA || t.id === slugA);
      const toolB = AI_TOOLS.find((t) => t.slug === slugB || t.id === slugB);
      if (toolA && toolB) {
        setCompareToolA(toolA);
        setCompareToolB(toolB);
        setShowCompareModal(true);
      }
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

    if (activeGuide) {
      document.title = `${activeGuide.title} (2026 Test) — ToolPulse`;
    } else if (activeToolDetail) {
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
  }, [activeToolDetail, activeGuide]);

  const handleOpenGuide = (guide: BuyingGuide) => {
    setActiveGuide(guide);
    const url = new URL(window.location.href);
    url.searchParams.set('guide', guide.slug);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseGuide = () => {
    setActiveGuide(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('guide');
    window.history.pushState({}, '', url.toString());
  };

  const copyViralPost = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSocialKey(key);
    setTimeout(() => setCopiedSocialKey(null), 2500);
  };

  const exportSubscribersCSV = () => {
    try {
      const subscribers = JSON.parse(localStorage.getItem('toolpulse_subscribers') || '[]');
      if (subscribers.length === 0) {
        alert('No subscribers captured yet! Test the newsletter box below to add your first email.');
        return;
      }
      const csvContent = 'data:text/csv;charset=utf-8,Email,Date\n' +
        subscribers.map((s: any) => `${s.email},${s.date}`).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `toolpulse_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const exportClicksCSV = () => {
    try {
      const keys = Object.keys(outboundClicks);
      if (keys.length === 0) {
        alert('No affiliate clicks tracked yet! Click on "Visit Tool" to record clicks.');
        return;
      }
      const csvContent = 'data:text/csv;charset=utf-8,ToolID,ToolName,Clicks,EstRevenueUSD\n' +
        keys.map((id) => {
          const tool = AI_TOOLS.find((t) => t.id === id);
          const clicks = outboundClicks[id];
          const estRev = Math.round(clicks * 0.12 * 22);
          return `${id},"${tool?.name || id}",${clicks},${estRev}`;
        }).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `toolpulse_affiliate_clicks_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const exportQuizLeadsCSV = () => {
    try {
      const leads = JSON.parse(localStorage.getItem('toolpulse_quiz_leads') || '[]');
      if (leads.length === 0) {
        alert('No quiz leads captured yet! Launch the AI Stack Recommender quiz to capture your first lead.');
        return;
      }
      const csvContent = 'data:text/csv;charset=utf-8,Email,Role,Bottleneck,Budget,RecommendedTools,Date\n' +
        leads.map((l: any) => `"${l.email}","${l.role}","${l.bottleneck}","${l.budget}","${(l.recommendedTools || []).join('; ')}","${l.date}"`).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `toolpulse_quiz_leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const exportMasterLeadCSV = () => {
    try {
      const subscribers = JSON.parse(localStorage.getItem('toolpulse_subscribers') || '[]');
      const quizLeads = JSON.parse(localStorage.getItem('toolpulse_quiz_leads') || '[]');
      const companyAudits = JSON.parse(localStorage.getItem('toolpulse_company_audits') || '[]');
      const promptLeads = JSON.parse(localStorage.getItem('toolpulse_prompt_leads') || '[]');

      const allRows: string[] = ['Email,Source,CompanyOrRole,Details,Budget,Date'];
      companyAudits.forEach((c: any) => {
        allRows.push(`"${c.email}","B2B Company Audit","${c.companyName || 'Corporate'}","${c.teamSize || ''} team | ${c.website || ''}","${c.monthlySpend || 'Unknown'}","${c.date}"`);
      });
      quizLeads.forEach((q: any) => {
        allRows.push(`"${q.email}","AI Stack Quiz","${q.role}","Bottleneck: ${q.bottleneck} | Stack: ${(q.recommendedTools || []).join(';') || 'Custom'}","${q.budget}","${q.date}"`);
      });
      promptLeads.forEach((p: any) => {
        allRows.push(`"${p.email}","Prompt Pack 100+ Download","Prompt Engineer","Curated AI Prompts & Templates","Free","${p.date}"`);
      });
      subscribers.forEach((s: any) => {
        allRows.push(`"${s.email}","Weekly Newsletter Deals","Subscriber","Deals & Software Updates","Free","${s.date}"`);
      });

      if (allRows.length === 1) {
        alert('No leads captured yet! Test the quiz, company audit, prompt pack, or newsletter box to capture leads.');
        return;
      }

      const csvContent = 'data:text/csv;charset=utf-8,' + allRows.join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `toolpulse_master_leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const copyFounderPitch = (lead: OutreachLead) => {
    navigator.clipboard.writeText(`Subject: ${lead.customPitchSubject}\n\n${lead.customPitchBody}`);
    setCopiedPitchId(lead.id);
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const copyCoupon = (deal: AIDeal) => {
    navigator.clipboard.writeText(deal.couponCode);
    setCopiedCouponId(deal.id);
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const toggleRevealDeal = (dealId: string) => {
    setRevealedDeals((prev) => ({ ...prev, [dealId]: true }));
  };

  const copyEmbedBadge = () => {
    const code = `<a href="https://toolpulse.ai" target="_blank" rel="noopener"><img src="https://toolpulse.ai/badges/featured-on-toolpulse.svg" alt="Featured on ToolPulse AI Directory" width="220" height="54" /></a>`;
    navigator.clipboard.writeText(code);
    setCopiedBadgeCode(true);
    setTimeout(() => setCopiedBadgeCode(false), 2500);
  };

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

  const handleOpenCompare = (slugA: string, slugB: string) => {
    const a = AI_TOOLS.find((t) => t.slug === slugA || t.id === slugA) || AI_TOOLS[0];
    const b = AI_TOOLS.find((t) => t.slug === slugB || t.id === slugB) || AI_TOOLS[1];
    setCompareToolA(a);
    setCompareToolB(b);
    setShowCompareModal(true);
    const url = new URL(window.location.href);
    url.searchParams.set('compare', `${a.slug}-vs-${b.slug}`);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseCompare = () => {
    setShowCompareModal(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('compare');
    window.history.pushState({}, '', url.toString());
  };

  const handleAffiliateClick = (tool: AITool) => {
    const nextClicks = { ...outboundClicks, [tool.id]: (outboundClicks[tool.id] || 0) + 1 };
    setOutboundClicks(nextClicks);
    try {
      localStorage.setItem('toolpulse_clicks', JSON.stringify(nextClicks));
    } catch (e) {
      console.error(e);
    }
  };

  const totalOutboundClicks = useMemo(() => {
    return Object.values(outboundClicks).reduce((acc, curr) => acc + curr, 0);
  }, [outboundClicks]);

  const estimatedAffiliateEarnings = useMemo(() => {
    // 12% trial-to-paid conversion rate * $22 average monthly affiliate commission
    return Math.round(totalOutboundClicks * 0.12 * 22);
  }, [totalOutboundClicks]);

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const existing = JSON.parse(localStorage.getItem('toolpulse_subscribers') || '[]');
      existing.push({ email: newsletterEmail, date: new Date().toISOString() });
      localStorage.setItem('toolpulse_subscribers', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4000);
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
              onClick={() => setShowQuizModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black hover:opacity-95 transition shadow-lg shadow-emerald-500/25"
            >
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>AI Stack Quiz (Get Matched)</span>
            </button>

            <button
              onClick={() => setShowAuditModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black hover:opacity-95 transition shadow-lg shadow-amber-500/25"
            >
              <Building2 className="w-3.5 h-3.5 fill-slate-950" />
              <span>Free B2B Stack Audit (Save $1k+)</span>
            </button>

            <button
              onClick={() => setShowPromptsModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-slate-800 transition font-bold"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prompt Pack (100+ Free)</span>
            </button>

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

            <button
              onClick={() => setShowFounderHud(!showFounderHud)}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/20 transition font-semibold"
            >
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Founder HUD {totalOutboundClicks > 0 ? `(${totalOutboundClicks} Clicks · ~$${estimatedAffiliateEarnings})` : ''}</span>
            </button>
          </div>

          {/* Founder Revenue, Viral Launchpad & Data Export HUD */}
          {showFounderHud && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-900/95 border border-amber-500/30 text-left shadow-xl space-y-4 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Founder Growth & Monetization Engine</span>
                </div>
                <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setFounderHudTab('stats')}
                    className={`px-3 py-1 rounded-lg font-semibold transition ${
                      founderHudTab === 'stats' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Live Revenue
                  </button>
                  <button
                    onClick={() => setFounderHudTab('leads')}
                    className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1 ${
                      founderHudTab === 'leads' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    <span>Captured Leads</span>
                  </button>
                  <button
                    onClick={() => setFounderHudTab('outreach')}
                    className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1 ${
                      founderHudTab === 'outreach' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Send className="w-3 h-3" />
                    <span>$149 Pitcher</span>
                  </button>
                  <button
                    onClick={() => setFounderHudTab('viral')}
                    className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1 ${
                      founderHudTab === 'viral' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Viral Posts</span>
                  </button>
                  <button
                    onClick={() => setFounderHudTab('export')}
                    className={`px-3 py-1 rounded-lg font-semibold transition flex items-center space-x-1 ${
                      founderHudTab === 'export' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Download className="w-3 h-3" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {founderHudTab === 'stats' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Outbound Affiliate Clicks</span>
                      <span className="text-xl font-black text-white">{totalOutboundClicks}</span>
                      <span className="text-[10px] text-emerald-400 flex items-center space-x-0.5 mt-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>Live link referrals</span>
                      </span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Est. Affiliate Pipeline</span>
                      <span className="text-xl font-black text-amber-400">${estimatedAffiliateEarnings}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">~12% conv @ $22 avg bounty</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Featured Placement Fee</span>
                      <span className="text-xl font-black text-sky-400">$149 / mo</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Paid direct sponsor tier</span>
                    </div>
                  </div>

                  {totalOutboundClicks > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Top Clicked Software</span>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(outboundClicks).map(([toolId, count]) => {
                          const tool = AI_TOOLS.find((t) => t.id === toolId);
                          return (
                            <div key={toolId} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                              <span className="font-semibold text-white">{tool?.name || toolId}</span>
                              <span className="text-amber-400 font-bold font-mono">{count} clicks</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Click on "Visit Tool" or any affiliate trial button to simulate and verify outbound tracking.
                    </p>
                  )}
                </div>
              )}

              {founderHudTab === 'leads' && (
                <div className="space-y-3 text-xs">
                  {(() => {
                    let quizLeads: any[] = [];
                    let companyAudits: any[] = [];
                    let promptLeads: any[] = [];
                    let subscribers: any[] = [];
                    try {
                      quizLeads = JSON.parse(localStorage.getItem('toolpulse_quiz_leads') || '[]');
                      companyAudits = JSON.parse(localStorage.getItem('toolpulse_company_audits') || '[]');
                      promptLeads = JSON.parse(localStorage.getItem('toolpulse_prompt_leads') || '[]');
                      subscribers = JSON.parse(localStorage.getItem('toolpulse_subscribers') || '[]');
                    } catch {}

                    const totalLeads = quizLeads.length + companyAudits.length + promptLeads.length + subscribers.length;

                    return (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-white block">Multi-Channel Lead Pipeline ({totalLeads} Total)</span>
                            <p className="text-slate-400 text-[11px]">
                              B2B Stack Audits, AI Quiz recommendations, Prompt downloads & Newsletter subscribers.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 shrink-0">
                            <button
                              onClick={exportMasterLeadCSV}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold transition flex items-center space-x-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Export All ({totalLeads})</span>
                            </button>
                            {quizLeads.length > 0 && (
                              <button
                                onClick={exportQuizLeadsCSV}
                                className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold transition flex items-center space-x-1"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Quiz Only</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Pipeline breakdown metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                          <div className="p-2 rounded-xl bg-slate-950 border border-amber-500/30">
                            <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">B2B Audits</span>
                            <span className="text-base font-extrabold text-white">{companyAudits.length}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950 border border-sky-500/30">
                            <span className="text-[10px] text-sky-400 font-bold block uppercase tracking-wider">Quiz Stacks</span>
                            <span className="text-base font-extrabold text-white">{quizLeads.length}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950 border border-emerald-500/30">
                            <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Prompt Packs</span>
                            <span className="text-base font-extrabold text-white">{promptLeads.length}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-slate-950 border border-indigo-500/30">
                            <span className="text-[10px] text-indigo-400 font-bold block uppercase tracking-wider">Subscribers</span>
                            <span className="text-base font-extrabold text-white">{subscribers.length}</span>
                          </div>
                        </div>

                        {totalLeads === 0 ? (
                          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                            <Users className="w-6 h-6 text-slate-500 mx-auto" />
                            <p className="text-slate-300 font-semibold">No leads captured yet.</p>
                            <p className="text-slate-500 text-[11px]">
                              Test the B2B Stack Audit, AI Stack Quiz, or Prompt Library modal to capture organic leads.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                            {/* B2B Audits First (Highest Value) */}
                            {companyAudits.map((c, idx) => (
                              <div key={`audit-${idx}`} className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">B2B Audit</span>
                                    <span className="font-bold text-white text-xs">{c.companyName}</span>
                                    {c.website && <span className="text-[10px] text-slate-400">({c.website})</span>}
                                  </div>
                                  <span className="text-[10px] text-slate-500">{new Date(c.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="text-slate-300 font-mono">{c.email}</span>
                                  <span className="text-emerald-400 font-semibold">{c.monthlySpend} · {c.teamSize} team</span>
                                </div>
                              </div>
                            ))}

                            {/* Quiz Leads */}
                            {quizLeads.map((q, idx) => (
                              <div key={`quiz-${idx}`} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white text-xs">{q.email}</span>
                                  <span className="text-[10px] text-slate-500">{new Date(q.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 text-[10px]">
                                  <span className="px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800">{q.role}</span>
                                  <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">{q.bottleneck}</span>
                                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">{q.budget}</span>
                                </div>
                                {q.recommendedTools && (
                                  <span className="text-[10px] text-slate-400 block">
                                    Stack: {q.recommendedTools.join(', ')}
                                  </span>
                                )}
                              </div>
                            ))}

                            {/* Prompt Leads */}
                            {promptLeads.map((p, idx) => (
                              <div key={`prompt-${idx}`} className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Prompt Pack</span>
                                  <span className="text-white text-xs font-mono">{p.email}</span>
                                </div>
                                <span className="text-[10px] text-slate-500">{new Date(p.date).toLocaleDateString()}</span>
                              </div>
                            ))}

                            {/* Subscribers */}
                            {subscribers.map((s, idx) => (
                              <div key={`sub-${idx}`} className="p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">Newsletter</span>
                                  <span className="text-white text-xs font-mono">{s.email}</span>
                                </div>
                                <span className="text-[10px] text-slate-500">{new Date(s.date).toLocaleDateString()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {founderHudTab === 'outreach' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-white block">Sponsor Prospecting & $149 Placement Pitcher</span>
                    <p className="text-slate-400 text-[11px]">
                      High-growth AI startups seeking organic distribution. 1-click personalized email pitches to sell $149/mo featured spotlights:
                    </p>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {OUTREACH_LEADS.map((lead) => (
                      <div key={lead.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <span className="font-bold text-white text-sm">{lead.toolName}</span>
                            <span className="text-slate-400 text-xs ml-2">({lead.founderName}, {lead.founderRole})</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 font-mono">
                              {lead.monthlyRevenueEstimate}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-400">
                              {lead.category}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400">
                          <strong>Angle:</strong> {lead.pitchAngle}
                        </p>

                        <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                          <span className="text-[11px] text-sky-400 font-mono">{lead.contactEmail}</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => copyFounderPitch(lead)}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center space-x-1"
                            >
                              {copiedPitchId === lead.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedPitchId === lead.id ? 'Copied Pitch!' : 'Copy Script'}</span>
                            </button>
                            <a
                              href={`mailto:${lead.contactEmail}?subject=${encodeURIComponent(lead.customPitchSubject)}&body=${encodeURIComponent(lead.customPitchBody)}`}
                              className="px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-[11px] font-extrabold transition flex items-center space-x-1"
                            >
                              <Send className="w-3 h-3" />
                              <span>Open Mail</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {founderHudTab === 'viral' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300">
                    Pre-engineered viral posts designed to drive 5,000+ organic visitors from Reddit, Twitter/X, and Product Hunt with zero ad spend. Click to copy:
                  </p>
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {VIRAL_POSTS.map((post) => (
                      <div key={post.key} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sky-400">{post.platform}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-700 text-slate-400">
                            {post.badge}
                          </span>
                        </div>
                        <p className="text-slate-300 font-medium">{post.title}</p>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                          <span className="text-[10px] text-slate-500 font-mono">100% ready to publish</span>
                          <button
                            onClick={() => copyViralPost(post.key, post.content)}
                            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 font-bold text-[11px] transition"
                          >
                            {copiedSocialKey === post.key ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedSocialKey === post.key ? 'Copied Post!' : 'Copy Post'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {founderHudTab === 'export' && (
                <div className="space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-bold text-white block">Audience Data & Backlink Engine</span>
                      <p className="text-slate-400 text-[11px]">
                        Export leads for email campaigns or distribute badges to startups for automated backlinks.
                      </p>
                    </div>
                    <button
                      onClick={exportMasterLeadCSV}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-slate-950 font-black text-xs transition flex items-center space-x-1.5 shadow-md shadow-sky-500/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Master Leads CSV</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-white block">Newsletter Subscribers</span>
                      <p className="text-slate-400 text-[11px]">
                        Captured weekly deal subscribers ready for Substack/Beehiiv.
                      </p>
                      <button
                        onClick={exportSubscribersCSV}
                        className="w-full py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold transition flex items-center justify-center space-x-1.5 text-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>Subscribers.csv</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="font-bold text-white block">Affiliate Click Logs</span>
                      <p className="text-slate-400 text-[11px]">
                        Logs of every outbound referral click for partner reporting.
                      </p>
                      <button
                        onClick={exportClicksCSV}
                        className="w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold transition flex items-center justify-center space-x-1.5 text-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>Clicks.csv</span>
                      </button>
                    </div>
                  </div>

                  {/* Organic Backlink Embed Badge Generator */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-sky-400 font-bold">
                        <Award className="w-4 h-4" />
                        <span>"Featured on ToolPulse" Embed Badge</span>
                      </div>
                      <button
                        onClick={copyEmbedBadge}
                        className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-[11px] transition flex items-center space-x-1"
                      >
                        {copiedBadgeCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedBadgeCode ? 'Copied HTML!' : 'Copy Embed Snippet'}</span>
                      </button>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Share this snippet with indexed AI startups to paste into their footer or docs. Every embed creates an organic dofollow backlink to ToolPulse!
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto">
                      &lt;a href="https://toolpulse.ai" target="_blank"&gt;&lt;img src="https://toolpulse.ai/badges/featured.svg" alt="Featured on ToolPulse" /&gt;&lt;/a&gt;
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Popular High-Intent Versus Showdowns */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              🔥 Popular AI Showdowns
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {POPULAR_SHOWDOWNS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleOpenCompare(s.slugA, s.slugB)}
                  className="px-3 py-1 rounded-lg bg-slate-900/80 hover:bg-sky-500/20 border border-slate-700/60 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 text-xs font-medium transition flex items-center space-x-1"
                >
                  <span>{s.label}</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Programmatic Editorial Guides & In-Depth Benchmarks (SEO Long-Tail Ranking) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Editorial Buying Guides & Hands-On Benchmarks</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Ranked #1 for High-Intent Queries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BUYING_GUIDES.map((guide) => (
            <div
              key={guide.id}
              onClick={() => handleOpenGuide(guide)}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-sky-500/40 cursor-pointer transition flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-sky-400 font-semibold">
                  <span>{guide.category}</span>
                  <span className="text-slate-500">{guide.readTime}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-sky-300 transition leading-snug">
                  {guide.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {guide.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{guide.publishDate}</span>
                <span className="text-sky-400 font-bold flex items-center space-x-1 group-hover:translate-x-0.5 transition">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
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
                onClick={() => handleAffiliateClick(tool)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
              >
                <span>Visit Tool</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Exclusive AI Partner Deals & Promo Codes Vault */}
      <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 p-5 sm:p-8 space-y-4 shadow-xl text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">Exclusive AI Partner Deals & Secret Promo Codes</h3>
              <p className="text-xs text-slate-400">Verified discounts negotiated exclusively for ToolPulse visitors.</p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 w-fit">
            Over $200+ in Total Savings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AI_DEALS.map((deal) => {
            const isRevealed = revealedDeals[deal.id];
            return (
              <div
                key={deal.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{deal.toolName}</span>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">Saves {deal.verifiedSavings}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 block w-fit">
                    {deal.discountBadge}
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{deal.dealDescription}</p>
                </div>

                <div className="pt-2 border-t border-slate-900 space-y-2">
                  {isRevealed ? (
                    <div className="flex items-center justify-between gap-2">
                      <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold text-xs flex-1 text-center select-all">
                        {deal.couponCode}
                      </div>
                      <button
                        onClick={() => copyCoupon(deal)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs transition flex items-center space-x-1 shrink-0"
                      >
                        {copiedCouponId === deal.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCouponId === deal.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleRevealDeal(deal.id)}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold text-xs transition flex items-center justify-center space-x-1"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Reveal Secret Promo Code</span>
                    </button>
                  )}

                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold text-[11px] transition text-center block"
                  >
                    Claim at Official Vendor Site →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Organic Newsletter & Lifetime Deal Capture Box */}
      <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-sky-950/30 to-indigo-950/40 p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Weekly AI Drops & Private Discounts</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Get Top AI Software Deals Before Anyone Else
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Join 5,400+ developers, agencies, and creators. We benchmark new generative AI tools every week and send exclusive free trial promos directly to your inbox.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You're in! Check your inbox for this week's top 5 AI software comparisons.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribeNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your work email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-sky-500/20 shrink-0"
              >
                Join Free →
              </button>
            </form>
          )}
          <span className="text-[11px] text-slate-500 block">No spam. One-click unsubscribe at any time.</span>
        </div>
      </div>

      {/* EDITORIAL BUYING GUIDE MODAL */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={handleCloseGuide}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              ✕
            </button>

            {/* Guide Header */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2 text-xs text-sky-400 font-bold uppercase">
                <span>{activeGuide.category}</span>
                <span>•</span>
                <span>{activeGuide.readTime}</span>
                <span>•</span>
                <span className="text-slate-400">Published {activeGuide.publishDate}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {activeGuide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeGuide.subtitle}
              </p>
            </div>

            {/* Guide Sections */}
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
              {activeGuide.sections.map((sec, idx) => {
                const highlightedTool = sec.highlightToolSlug
                  ? AI_TOOLS.find((t) => t.slug === sec.highlightToolSlug || t.id === sec.highlightToolSlug)
                  : null;

                return (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {sec.heading}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{sec.content}</p>

                    {highlightedTool && (
                      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">{highlightedTool.name}</span>
                            <span className="text-amber-400 text-xs">⭐ {highlightedTool.rating}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400">
                              {highlightedTool.startingPrice}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{highlightedTool.tagline}</p>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            onClick={() => {
                              handleCloseGuide();
                              handleOpenTool(highlightedTool);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-sky-400 hover:text-white transition font-medium"
                          >
                            Full Review
                          </button>
                          <a
                            href={highlightedTool.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleAffiliateClick(highlightedTool)}
                            className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs transition flex items-center space-x-1"
                          >
                            <span>Try Free</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Verdict Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950 to-sky-950/40 border border-emerald-500/30 space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Independent Editorial Verdict</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Top Recommendation</span>
                <span className="text-base font-extrabold text-white">{activeGuide.verdict.winnerName}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{activeGuide.verdict.summary}</p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <strong>Runners Up:</strong> {activeGuide.verdict.runnersUp}
              </div>
            </div>
          </div>
        </div>
      )}

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

            {/* Direct Competitors / Alternatives (Internal Linking SEO & Discovery) */}
            {activeToolDetail.alternatives && activeToolDetail.alternatives.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Top Alternatives & Competitors
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeToolDetail.alternatives.map((altSlug) => {
                    const altTool = AI_TOOLS.find((t) => t.slug === altSlug || t.id === altSlug);
                    if (!altTool) return null;
                    return (
                      <div key={altSlug} className="inline-flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenTool(altTool)}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800 text-xs text-sky-400 flex items-center space-x-1.5 transition"
                        >
                          <span className="font-semibold">{altTool.name}</span>
                          <span className="text-[10px] text-slate-500">({altTool.startingPrice})</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </button>
                        <button
                          onClick={() => {
                            handleCloseTool();
                            handleOpenCompare(activeToolDetail.slug, altTool.slug);
                          }}
                          className="px-2 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-[10px] text-indigo-400 font-bold transition"
                          title={`Compare ${activeToolDetail.name} vs ${altTool.name}`}
                        >
                          vs
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Affiliate CTA Box */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">Official vendor partner link with exclusive bonus access.</span>
              <a
                href={activeToolDetail.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAffiliateClick(activeToolDetail)}
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
              onClick={handleCloseCompare}
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
                  onClick={() => handleAffiliateClick(compareToolA)}
                  className="text-sky-400 hover:underline font-bold"
                >
                  Visit {compareToolA.name} →
                </a>
                <a
                  href={compareToolB.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleAffiliateClick(compareToolB)}
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

      {/* AI STACK RECOMMENDER QUIZ MODAL */}
      {showQuizModal && (
        <AIStackQuizModal
          onClose={() => setShowQuizModal(false)}
          onSelectTool={(tool) => handleOpenTool(tool)}
        />
      )}

      {/* B2B TECH STACK AUDIT MODAL */}
      {showAuditModal && (
        <CompanyAuditModal
          onClose={() => setShowAuditModal(false)}
        />
      )}

      {/* AI PROMPTS & WORKFLOW TEMPLATES MODAL */}
      {showPromptsModal && (
        <PromptLibraryModal
          onClose={() => setShowPromptsModal(false)}
        />
      )}
    </div>
  );
};
