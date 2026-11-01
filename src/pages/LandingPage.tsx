import React, { useEffect, useRef, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Wallet,
  Clock,
  Store,
  Bot,
  CheckCircle2,
  ChevronRight,
  PartyPopper,
  Compass,
  Heart,
  Palette,
  Lightbulb,
  Search,
  Zap,
  Flame,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventCategory, EventData } from '../types';
import { formatINR } from '../services/aiService';
import { MarigoldPetals } from '../components/MarigoldPetals';
import { Festive3DCanvas } from '../components/Festive3DCanvas';
import { prefersReducedMotion, EASE } from '../motion/motionHelpers';
import {
  FestivalId,
  FestivalTheme,
  FESTIVAL_THEMES,
  getActiveFestivalTheme,
  setFestivalTheme,
} from '../services/festivalThemeService';
import { getTokenMetrics, MODEL_PROFILES } from '../services/multiAgentRouter';

interface LandingPageProps {
  onStartPlanning: (category?: EventCategory) => void;
  onExploreDemo: (eventId?: string) => void;
  onOpenInspiration: () => void;
  onAskAI?: (prompt: string) => void;
  onOpenCalendar?: () => void;
  onOpenBannerStudio?: () => void;
  events: EventData[];
  currentFestival?: FestivalTheme;
  onFestivalChange?: (theme: FestivalTheme) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlanning,
  onExploreDemo,
  onOpenInspiration,
  onAskAI,
  onOpenCalendar,
  onOpenBannerStudio,
  events,
  currentFestival,
  onFestivalChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroEyebrowRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const heroPreviewRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'decor' | 'menu' | 'budget'>('decor');
  const [heroSearch, setHeroSearch] = useState('');
  const [activeFestival, setActiveFestival] = useState<FestivalTheme>(
    currentFestival || getActiveFestivalTheme()
  );

  const primarySample = events[0] || null;
  const tokenMetrics = getTokenMetrics();

  // Synchronize active festival with parent or localStorage
  useEffect(() => {
    if (currentFestival) {
      setActiveFestival(currentFestival);
    }
  }, [currentFestival]);

  const handleSelectFestivalTheme = (id: FestivalId) => {
    setFestivalTheme(id);
    const updated = FESTIVAL_THEMES[id];
    setActiveFestival(updated);
    if (onFestivalChange) {
      onFestivalChange(updated);
    }
  };

  // Coordinated GSAP Entrance
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.luxuryOut } });

      if (heroImageRef.current) {
        tl.fromTo(
          heroImageRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4 }
        );
      }

      if (heroEyebrowRef.current) {
        tl.fromTo(
          heroEyebrowRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=1.0'
        );
      }

      if (heroTitleRef.current) {
        tl.fromTo(
          heroTitleRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
      }

      if (heroSubtitleRef.current) {
        tl.fromTo(
          heroSubtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.5'
        );
      }

      if (heroCtasRef.current) {
        tl.fromTo(
          heroCtasRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );
      }

      if (heroPreviewRef.current) {
        tl.fromTo(
          heroPreviewRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.4'
        );
      }

      const sections = containerRef.current?.querySelectorAll('.scroll-reveal-section') ?? [];
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: EASE.editorial,
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories: {
    id: EventCategory;
    title: string;
    tagline: string;
    image: string;
    guestRange: string;
    budgetRange: string;
  }[] = [
    {
      id: 'wedding',
      title: 'Royal Heritage Weddings',
      tagline: 'Mandap florals, royal welcome processions, Shehnai & Kesar feasts.',
      image: '/assets/events/wedding-couple-640.webp',
      guestRange: '150 – 1,200 Guests',
      budgetRange: '₹15L – ₹1.5Cr',
    },
    {
      id: 'cultural',
      title: 'Diwali & Festival Mahotsav',
      tagline: 'Clay diyas, Lakshmi-Ganesh puja, family sweets gifting & light displays.',
      image: '/assets/events/community-festival-640.webp',
      guestRange: '20 – 500 Guests',
      budgetRange: '₹25K – ₹15L',
    },
    {
      id: 'birthday',
      title: 'Milestone Birthdays & Anniversaries',
      tagline: '1st birthday fiestas, 50th golden jubilee soirees & themed banquets.',
      image: '/assets/events/birthday-celebration-640.webp',
      guestRange: '30 – 250 Guests',
      budgetRange: '₹50K – ₹8L',
    },
    {
      id: 'fest',
      title: 'College & Cultural Fests',
      tagline: 'Line-array concert rigs, pro-night celebrity riders & sound curfews.',
      image: '/assets/events/folk-musicians-640.webp',
      guestRange: '500 – 3,500 Guests',
      budgetRange: '₹5L – ₹40L',
    },
  ];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim() && onAskAI) {
      onAskAI(`Help me plan: ${heroSearch}`);
    } else {
      onStartPlanning();
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Floating Marigold & Rose Petals */}
      <MarigoldPetals count={16} />

      {/* Dynamic Ambient Fluid Mesh for Liquid Glass Depth */}
      <div className="ambient-mesh-utsav pointer-events-none" aria-hidden="true">
        <div
          className="liquid-orb orb-festival-1"
          style={{ background: `radial-gradient(circle, ${activeFestival.primaryColor} 0%, transparent 70%)` }}
        />
        <div
          className="liquid-orb orb-festival-2"
          style={{ background: `radial-gradient(circle, ${activeFestival.accentGold} 0%, transparent 70%)` }}
        />
        <div
          className="liquid-orb orb-festival-3"
          style={{ background: `radial-gradient(circle, ${activeFestival.secondaryColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* =========================================================================
          GRAND FESTIVE HERO BANNER (Modeled after User's Uploaded Diwali Reference)
          ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-20 overflow-hidden">
        <div className="shell relative z-10 max-w-6xl mx-auto space-y-8">
          
          {/* Top Quick Festival Theme Switcher Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl liquid-glass-pill bg-surface/75 border border-line">
            <div className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span className="p-1 rounded-lg bg-gold/20 text-gold-ink">
                <Flame className="w-4 h-4 text-gold" />
              </span>
              <span className="hidden sm:inline">Celebration Mode:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(Object.keys(FESTIVAL_THEMES) as FestivalId[]).map((fId) => {
                const item = FESTIVAL_THEMES[fId];
                const isActive = item.id === activeFestival.id;
                return (
                  <button
                    key={fId}
                    onClick={() => handleSelectFestivalTheme(fId)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-sm scale-105'
                        : 'bg-surface-2 text-ink-2 hover:text-ink hover:bg-surface'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Banner Studio Shortcut */}
            {onOpenBannerStudio && (
              <button
                onClick={onOpenBannerStudio}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold/20 border border-gold/40 text-gold-ink text-xs font-bold hover:brightness-110 transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-gold" />
                <span>AI Banner Studio</span>
              </button>
            )}
          </div>

          {/* MAIN HERO BANNER CARD (Liquid Glass + Festive Palette) */}
          <div
            className="relative rounded-3xl overflow-hidden liquid-glass-card border border-white/25 shadow-2xl p-6 sm:p-10 lg:p-12 text-white"
            style={{
              background: `linear-gradient(135deg, ${activeFestival.bgDark} 0%, #200830 50%, #0F0218 100%)`,
            }}
          >
            {/* Background Decorative Festive Image with Soft Fade */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-25 mix-blend-screen">
              <img
                ref={heroImageRef}
                src={activeFestival.bannerImage}
                alt={`${activeFestival.name} celebration background`}
                className="w-full h-full object-cover object-center filter blur-[1px]"
              />
            </div>

            {/* Glowing Corner Accents */}
            <div
              className="absolute -top-24 -left-24 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none opacity-50"
              style={{ background: activeFestival.primaryColor }}
            />
            <div
              className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full filter blur-[80px] pointer-events-none opacity-40"
              style={{ background: activeFestival.accentGold }}
            />

            {/* Banner Header: Search Bar & Navigation Links */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/15">
              
              {/* Integrated Search Bar (as shown in reference banner) */}
              <form onSubmit={handleHeroSearchSubmit} className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  placeholder="Search rituals, themes, decor..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </form>

              {/* Quick Links inside Banner */}
              <div className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/80">
                <button
                  onClick={() => onStartPlanning()}
                  className="hover:text-gold transition-colors focus-visible:outline-none"
                >
                  Plan Event
                </button>
                <button
                  onClick={onOpenCalendar}
                  className="hover:text-gold transition-colors focus-visible:outline-none"
                >
                  Muhurats & Calendar
                </button>
                <button
                  onClick={onOpenInspiration}
                  className="hover:text-gold transition-colors focus-visible:outline-none"
                >
                  Traditions Special
                </button>
                <button
                  onClick={onOpenBannerStudio}
                  className="hover:text-gold transition-colors focus-visible:outline-none text-gold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini Studio</span>
                </button>
              </div>
            </div>

            {/* Banner Main Grid: Typography & 3D Interactive Canvas */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
              
              {/* Left Column: Festival Copy & CTAs (7 Cols) */}
              <div className="lg:col-span-7 space-y-5 text-left">
                
                {/* Date & Tradition Badge */}
                <div ref={heroEyebrowRef} className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gold text-[#120524] shadow-sm">
                    {activeFestival.dateStr}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
                    {activeFestival.muhurat.title}
                  </span>
                </div>

                {/* Festival Headline */}
                <h1
                  ref={heroTitleRef}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
                >
                  {activeFestival.bannerTitle} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-yellow-400">
                    {activeFestival.bannerSubtitle}
                  </span>
                </h1>

                {/* Description */}
                <p
                  ref={heroSubtitleRef}
                  className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed"
                >
                  {activeFestival.greeting} Celebrate with authentic Vedic muhurat timings, zero-waste decor blueprints, curated prasad & feast menus, and deterministic INR budget planning.
                </p>

                {/* Tags Pill Row (Diyas, Sweets, Fireworks, Puja) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeFestival.bannerTags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl text-xs font-medium bg-white/10 backdrop-blur-md border border-white/15 text-white/90 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Primary CTA Buttons */}
                <div ref={heroCtasRef} className="flex flex-wrap items-center gap-3.5 pt-3">
                  <button
                    onClick={() => onStartPlanning()}
                    className="px-7 py-3.5 rounded-xl bg-gold text-[#120524] text-sm font-bold flex items-center gap-2 hover:brightness-110 shadow-lg transition-transform active:scale-95"
                  >
                    <span>Plan {activeFestival.name} Celebration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenCalendar}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>View Muhurat Timings</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Interactive 3D WebGL Diya Canvas & Auspicious Card (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-sm rounded-2xl p-4 bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden group">
                  
                  {/* Subtle top pill */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="font-semibold text-gold flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-gold animate-bounce" />
                      <span>Live 3D Celebration Artifact</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono text-white/60">
                      WebGL Three.js
                    </span>
                  </div>

                  {/* 3D Canvas Element */}
                  <Festive3DCanvas
                    festivalGlow={activeFestival.accentGold}
                    isInteractive={true}
                  />

                  {/* Auspicious Muhurat Time Bar */}
                  <div className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-left">
                    <div className="flex items-center justify-between text-gold font-semibold">
                      <span>{activeFestival.muhurat.title}</span>
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-white font-mono text-sm font-bold mt-0.5">
                      {activeFestival.muhurat.time}
                    </div>
                    <div className="text-[11px] text-white/70 mt-1 leading-snug">
                      {activeFestival.muhurat.significance}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Bottom Bar: Token Saver & Multi-Model Guarantee */}
            <div className="relative z-10 pt-4 mt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold" />
                <span>
                  Multi-Agent Engine: Gemini 3.6 Flash + Local Gemma offline routing enabled.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span>Deterministic INR Budgets</span>
                <span>•</span>
                <span>Vedic Muhurat Engine</span>
                <span>•</span>
                <span>100% Free Browser Storage</span>
              </div>
            </div>
          </div>

          {/* Real Blueprint Preview Card (Jaipur Palace Sample) */}
          {primarySample && (
            <div ref={heroPreviewRef} className="text-left pt-2">
              <div className="card p-5 sm:p-6 shadow-lift liquid-glass-card border border-gold/30 relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="chip text-[11px] font-semibold text-gold-ink">
                        Active Celebration Blueprint
                      </span>
                      <span className="text-xs text-ink-2 font-mono">Jaipur, Rajasthan</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-ink mt-0.5">
                      {primarySample.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onExploreDemo(primarySample.id)}
                    className="btn-secondary btn-sm self-start sm:self-auto"
                  >
                    <span>Open Full Event</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3 Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4">
                  <div className="p-3.5 rounded-xl bg-surface-2/80 border border-line">
                    <div className="flex items-center justify-between text-xs text-ink-2">
                      <span>Total Budget</span>
                      <Wallet className="w-4 h-4 text-gold-ink" />
                    </div>
                    <div className="text-lg font-bold text-ink mt-1 tabular font-display">
                      {formatINR(primarySample.totalBudget)}
                    </div>
                    <div className="text-[11px] text-forest font-medium mt-0.5">
                      10% buffer ({formatINR(primarySample.totalBudget * 0.1)}) reserved
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-2/80 border border-line">
                    <div className="flex items-center justify-between text-xs text-ink-2">
                      <span>Guest Count</span>
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-lg font-bold text-ink mt-1 tabular font-display">
                      {primarySample.guestCount} Guests
                    </div>
                    <div className="text-[11px] text-ink-2 mt-0.5">
                      ~{formatINR(Math.round(primarySample.totalBudget / primarySample.guestCount))}/guest average
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-2/80 border border-line">
                    <div className="flex items-center justify-between text-xs text-ink-2">
                      <span>Vendor Progress</span>
                      <Store className="w-4 h-4 text-forest" />
                    </div>
                    <div className="text-lg font-bold text-ink mt-1 font-display">
                      {primarySample.vendors.filter((v) => v.status === 'confirmed').length} / {primarySample.vendors.length} Confirmed
                    </div>
                    <div className="text-[11px] text-gold-ink font-semibold mt-0.5">
                      Catering & Venue booked
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* EVENT CATEGORIES SELECTION */}
      <section className="scroll-reveal-section py-16 border-t border-line bg-surface-2/40">
        <div className="shell space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="eyebrow">End-to-End Orchestration</span>
            <h2 className="text-display-md font-bold tracking-tight text-ink font-display">
              Curated for Every Indian Celebration
            </h2>
            <p className="text-sm sm:text-base text-ink-2">
              Every tradition has its nuances. Pick your celebration type for tailored muhurat calculators, vegetarian/halal feast menus, and vendor timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onStartPlanning(cat.id)}
                className="card group cursor-pointer overflow-hidden hover:border-gold/60 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="media-frame aspect-video">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                    {cat.guestRange}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-display text-lg font-bold text-ink group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {cat.tagline}
                  </p>
                  <div className="pt-2 border-t border-line flex items-center justify-between text-xs">
                    <span className="text-ink-2">Typical Budget:</span>
                    <span className="font-semibold text-ink">{cat.budgetRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MULTI-AGENT & TOKEN-SAVER ARCHITECTURE SHOWCASE */}
      <section className="scroll-reveal-section py-16 border-t border-line bg-surface">
        <div className="shell space-y-8">
          <div className="p-8 rounded-3xl liquid-glass-card border border-white/20 bg-gradient-to-r from-surface to-surface-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-forest/15 text-forest border border-forest/30">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Multi-Agent Token Optimization Layer</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Maximum Intelligence. Zero Token Waste.
                </h2>
                <p className="text-sm text-ink-2 leading-relaxed">
                  Utsav AI dynamically routes workloads between <strong>Google Gemini 3.6 Flash</strong> for sub-second responses, <strong>Gemini Pro</strong> for multi-day itineraries, and the <strong>Local Gemma Worker (100% Offline)</strong> for zero-token document parsing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-surface border border-line">
                    <div className="text-xs text-ink-2 font-medium">Flash Speed</div>
                    <div className="text-lg font-bold text-ink mt-0.5">85% Savings</div>
                    <div className="text-[11px] text-forest">Sub-second generation</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-line">
                    <div className="text-xs text-ink-2 font-medium">Local Gemma</div>
                    <div className="text-lg font-bold text-ink mt-0.5">₹0.00 Cost</div>
                    <div className="text-[11px] text-forest">Offline privacy & speed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-line">
                    <div className="text-xs text-ink-2 font-medium">Vedic Astrology</div>
                    <div className="text-lg font-bold text-ink mt-0.5">Muhurat Synced</div>
                    <div className="text-[11px] text-gold-ink">Exact astronomical panchang</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-2 border border-line text-center space-y-3">
                <Bot className="w-12 h-12 text-gold animate-bounce" />
                <h3 className="font-display text-lg font-bold text-ink">
                  Tokens Preserved Live
                </h3>
                <div className="font-mono text-3xl font-extrabold text-forest">
                  {tokenMetrics.tokensSavedByFlash.toLocaleString()}+
                </div>
                <p className="text-xs text-ink-2 max-w-xs">
                  Equivalent to ~₹{tokenMetrics.estimatedInrSaved.toFixed(1)} saved across active planner sessions via smart local caching and Gemini Flash routing.
                </p>
                {onOpenBannerStudio && (
                  <button
                    onClick={onOpenBannerStudio}
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:brightness-110 shadow-sm"
                  >
                    Open AI Banner & Agent Studio
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
