import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  CalendarCheck,
  PlayCircle,
  ArrowRight,
  Sparkles,
  Users,
  Wand2,
  Headset,
  Gem,
  Cake,
  Briefcase,
  GraduationCap,
  Sun,
  Wine,
  Wallet,
  Store,
  Palette,
  Share2,
  Download,
  Sliders,
  PartyPopper,
  PenTool,
  Check,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  HeartHandshake,
  Info,
} from 'lucide-react';
import { EventCategory, EventData } from '../types';
import { Festive3DCanvas } from '../components/Festive3DCanvas';
import { FullInteractiveCalendar } from '../components/FullInteractiveCalendar';

interface LandingPageProps {
  onStartPlanning: (category?: EventCategory) => void;
  onExploreDemo: (eventId?: string) => void;
  onOpenInspiration: () => void;
  onOpenServices?: () => void;
  onOpenCalendar: () => void;
  onOpenAIAssistant?: (prompt?: string) => void;
  onPlanEventFromCalendar: (details: {
    name: string;
    date: string;
    category: EventCategory;
    guestCount?: number;
    budget?: number;
  }) => void;
  events: EventData[];
}

interface CategoryItem {
  id: string;
  label: string;
  category: EventCategory;
  icon: React.ComponentType<{ className?: string }>;
}

const EVENT_CATEGORIES: CategoryItem[] = [
  { id: 'weddings', label: 'Weddings', category: 'wedding', icon: Gem },
  { id: 'birthdays', label: 'Birthday Parties', category: 'birthday', icon: Cake },
  { id: 'corporate', label: 'Corporate Events', category: 'corporate', icon: Briefcase },
  { id: 'college', label: 'College Fests', category: 'fest', icon: GraduationCap },
  { id: 'festivals', label: 'Festivals & Cultural', category: 'cultural', icon: Sun },
  { id: 'social', label: 'Social Gatherings', category: 'family', icon: Wine },
  { id: 'custom', label: 'Custom Events', category: 'anniversary', icon: Sparkles },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlanning,
  onExploreDemo,
  onOpenInspiration,
  onOpenServices,
  onOpenCalendar,
  onOpenAIAssistant,
  onPlanEventFromCalendar,
}) => {
  const [heroImgSrc, setHeroImgSrc] = useState('/assets/eventara/hero-wedding-evening.webp');
  const [showcaseImgSrc, setShowcaseImgSrc] = useState('/assets/events/marigold-mandap-1200.webp');
  const [activeCategoryId, setActiveCategoryId] = useState<string>('weddings');
  const [activeDot, setActiveDot] = useState<number>(0);
  const [show3DPreview, setShow3DPreview] = useState(false);
  const [activeTabletTab, setActiveTabletTab] = useState('Dashboard');
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: 'Book Venue & Heritage Lawn', done: true },
    { id: 2, label: 'Finalize Caterer & Tasting', done: true },
    { id: 3, label: 'Send Digital & Print Invites', done: true },
    { id: 4, label: 'Confirm Floral Mandap Decor', done: true },
  ]);

  const pageRef = useRef<HTMLDivElement>(null);

  // Staggered viewport reveal using lightweight IntersectionObserver (respects prefers-reduced-motion)
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>('.reveal-up'));
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreDemo();
    }
  };

  const openAIStarterPrompt = () => {
    const starterPrompt = 'Help me create a wedding budget, timeline, and vendor checklist.';
    if (onOpenAIAssistant) {
      onOpenAIAssistant(starterPrompt);
    } else {
      onStartPlanning('wedding');
    }
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-bg text-ink overflow-x-hidden transition-colors duration-300 selection:bg-gold selection:text-bg"
    >
      {/* =========================================================================
          FIRST VIEWPORT STAGE (Target: 1672×941 Editorial Composition)
          ========================================================================= */}
      <div className="relative -mt-[70px] sm:-mt-[76px] pt-[70px] sm:pt-[76px] pb-7 lg:pb-8 overflow-hidden bg-gradient-to-b from-[#FFF8F2] via-[#F7E9DF]/65 to-[#FFF8F2] dark:from-[#12090E] dark:via-[#160D12] dark:to-[#12090E] transition-colors duration-300">
        
        {/* Subtle Warm Wine / Champagne Ambient Washes */}
        <div
          className="absolute top-16 left-0 w-[560px] h-[460px] rounded-full pointer-events-none opacity-45 dark:opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(183, 122, 43, 0.16) 0%, transparent 72%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="hidden dark:block absolute top-16 left-0 w-[560px] h-[460px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(68, 26, 38, 0.42) 0%, transparent 72%)',
            filter: 'blur(70px)',
          }}
        />
        <div
          className="absolute bottom-6 left-1/3 w-[680px] h-[320px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(242, 166, 74, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Optional Warm Bokeh Overlay Near Hero Edges */}
        <img
          src="/assets/eventara/hero-bokeh-overlay.webp"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none opacity-35 dark:opacity-65 mix-blend-screen z-[2]"
        />

        {/* Muted Gold Botanical Line Art — Lower Left */}
        <img
          src="/assets/eventara/botanical-left.svg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="hidden md:block absolute left-0 bottom-8 w-[150px] lg:w-[195px] pointer-events-none opacity-60 dark:opacity-75 z-[2]"
        />

        {/* Muted Gold Botanical Line Art — Lower Right */}
        <img
          src="/assets/eventara/botanical-right.svg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="hidden md:block absolute right-0 bottom-4 w-[145px] lg:w-[185px] pointer-events-none opacity-60 dark:opacity-75 z-[2]"
        />

        {/* =====================================================================
            1. EDITORIAL SPLIT HERO SECTION (~500–530px below navbar)
            ===================================================================== */}
        <section
          aria-label="Eventara Hero"
          className="relative w-full lg:min-h-[505px] xl:min-h-[520px] flex items-center"
        >
          {/* Desktop / Tablet Right-Side Wedding Mandap Photography (58–62% width) */}
          <div className="hidden md:block absolute -top-[76px] bottom-0 right-0 w-[60%] lg:w-[61%] z-0 pointer-events-none overflow-hidden">
            <img
              src={heroImgSrc}
              alt="Luxury outdoor evening wedding canopy with ivory drapes, floral garlands, and warm lantern lighting"
              onError={() => {
                if (heroImgSrc !== '/assets/hero/eventara-night-venue.jpg') {
                  setHeroImgSrc('/assets/hero/eventara-night-venue.jpg');
                }
              }}
              className="w-full h-full object-cover object-[58%_42%]"
            />

            {/* Dark Mode Left Blend Vignette */}
            <div
              className="hidden dark:block absolute inset-y-0 left-0 w-[34%]"
              style={{
                background:
                  'linear-gradient(90deg, #12090E 0%, rgba(18,9,14,0.86) 38%, rgba(18,9,14,0.28) 74%, transparent 100%)',
              }}
            />
            {/* Light Mode Left Blend Vignette */}
            <div
              className="block dark:hidden absolute inset-y-0 left-0 w-[36%]"
              style={{
                background:
                  'linear-gradient(90deg, #FFF8F2 0%, rgba(255,248,242,0.88) 40%, rgba(255,248,242,0.24) 76%, transparent 100%)',
              }}
            />

            {/* Top & Bottom Edge Vignettes */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg/75 via-bg/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg via-bg/45 to-transparent" />
          </div>

          {/* Sweeping Curved Gold/Rose SVG Divider (Desktop & Tablet) */}
          <svg
            className="hidden md:block absolute -top-[76px] bottom-0 left-0 w-full h-[calc(100%+76px)] pointer-events-none z-[1]"
            viewBox="0 0 1672 600"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="eventaraCurveBandDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B0D14" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#2A141E" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#12090E" stopOpacity="0.68" />
              </linearGradient>
              <linearGradient id="eventaraCurveStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D75C75" stopOpacity="0.4" />
                <stop offset="32%" stopColor="#F1C27D" stopOpacity="0.95" />
                <stop offset="72%" stopColor="#F2A64A" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#B77A2B" stopOpacity="0.5" />
              </linearGradient>
              <filter id="eventaraSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Translucent crescent glass veil between left copy region and right photo */}
            <path
              d="M 815 0 C 625 180, 650 435, 965 595 L 885 595 C 585 430, 575 185, 760 0 Z"
              fill="url(#eventaraCurveBandDark)"
              className="opacity-25 dark:opacity-95"
            />

            {/* Secondary faint outer hairline */}
            <path
              d="M 762 0 C 578 185, 588 430, 890 595"
              stroke="#F1C27D"
              strokeOpacity="0.22"
              strokeWidth="1"
            />

            {/* Primary luminous gold/rose sweeping arc */}
            <path
              d="M 815 0 C 625 180, 650 435, 965 595"
              stroke="url(#eventaraCurveStroke)"
              strokeWidth="1.85"
              filter="url(#eventaraSoftGlow)"
              className="hero-arc-animate"
            />
          </svg>

          {/* Foreground Hero Content Container */}
          <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7 lg:pt-6 pb-8 lg:pb-14">
            <div className="max-w-[560px] lg:max-w-[590px] space-y-4 sm:space-y-5 text-left">
              
              {/* Eyebrow */}
              <p className="font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.28em] text-gold-ink">
                PLAN <span className="mx-2 opacity-70">&bull;</span> ORGANIZE{' '}
                <span className="mx-2 opacity-70">&bull;</span> CELEBRATE
              </p>

              {/* Editorial Display Headline */}
              <h1 className="font-display text-[42px] sm:text-[52px] md:text-[54px] lg:text-[68px] xl:text-[74px] font-semibold text-ink leading-[1.03] tracking-[-0.015em]">
                Make Every
                <br />
                Occasion{' '}
                <span className="relative inline-block italic font-normal bg-gradient-to-r from-[#B77A2B] via-[#C95770] to-[#9A5B20] dark:from-[#F6D39E] dark:via-[#F2A64A] dark:to-[#DF7859] bg-clip-text text-transparent pr-1">
                  Special
                  {/* Subtle Gold Underline Flourish */}
                  <svg
                    viewBox="0 0 210 14"
                    fill="none"
                    className="absolute -bottom-1 left-0 w-full h-3 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 10 C 68 2, 142 2, 206 7"
                      stroke="url(#specialUnderline)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="specialUnderline" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F1C27D" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#F2A64A" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#D75C75" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              {/* Supporting Copy in Manrope */}
              <p className="font-sans text-[14px] sm:text-[15.5px] text-ink-2 max-w-[495px] leading-[1.62] font-normal">
                A one-stop event planning platform to design, organize and manage unforgettable
                events — from intimate gatherings to grand celebrations.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onStartPlanning('wedding')}
                  className="btn-sheen group min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-sans font-semibold text-[13.5px] sm:text-[14px] border border-[#FCE1B2]/60 shadow-[0_10px_28px_rgba(242,166,74,0.34),inset_0_1px_0_rgba(255,255,255,0.55)] active:translate-y-px"
                >
                  <Calendar className="w-4 h-4 text-[#241015] stroke-[2]" />
                  <span>Plan Your Event</span>
                  <ArrowRight className="w-4 h-4 text-[#241015] stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={scrollToHowItWorks}
                  className="min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface/85 dark:bg-[#211219]/75 hover:bg-surface-2 dark:hover:bg-[#2C1822]/90 border border-line dark:border-[#F7EEE9]/25 hover:border-gold text-ink font-sans font-medium text-[13.5px] sm:text-[14px] backdrop-blur-md transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-gold stroke-[1.75]" />
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Mobile-Only 16:10 Hero Image (Stacked cleanly without clipping) */}
              <div className="md:hidden pt-3">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-gold/30 shadow-xl">
                  <img
                    src={heroImgSrc}
                    alt="Outdoor evening wedding canopy decorated with flowers and warm lights"
                    onError={() => {
                      if (heroImgSrc !== '/assets/hero/eventara-night-venue.jpg') {
                        setHeroImgSrc('/assets/hero/eventara-night-venue.jpg');
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================================
            2. FOUR-CELL FROSTED GLASS FEATURE STRIP
            ===================================================================== */}
        <div className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 -mt-2 lg:-mt-9">
          <div className="rounded-[24px] lg:rounded-full eventara-feature-strip px-5 sm:px-8 py-4 lg:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-line dark:lg:divide-[#F7EEE9]/12">
              {[
                {
                  icon: CalendarCheck,
                  title: 'Complete Planning',
                  subtitle: 'From idea to execution',
                  onClick: () => onStartPlanning('wedding'),
                },
                {
                  icon: Users,
                  title: 'Trusted Vendors',
                  subtitle: 'Verified & reliable partners',
                  onClick: () => (onOpenServices ? onOpenServices() : onExploreDemo()),
                },
                {
                  icon: Wand2,
                  title: 'Personalized Experience',
                  subtitle: 'Tailored to your style',
                  onClick: () => onOpenInspiration(),
                },
                {
                  icon: Headset,
                  title: 'Dedicated Support',
                  subtitle: 'We’re with you at every step',
                  onClick: () => openAIStarterPrompt(),
                },
              ].map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={feature.onClick}
                    className="group min-h-[48px] flex items-center justify-start lg:justify-center gap-3.5 px-3 lg:px-6 text-left transition-colors"
                  >
                    <span className="w-10 h-10 rounded-xl bg-surface-2/70 dark:bg-white/[0.03] border border-gold/25 flex items-center justify-center text-gold group-hover:text-saffron group-hover:scale-105 group-hover:border-gold/55 transition-all duration-200 flex-shrink-0">
                      <Icon className="w-[22px] h-[22px] stroke-[1.65]" />
                    </span>
                    <div>
                      <span className="block font-sans text-[14px] sm:text-[14.5px] font-semibold text-ink group-hover:text-gold-ink transition-colors leading-snug">
                        {feature.title}
                      </span>
                      <span className="block font-sans text-[12px] text-ink-2 leading-snug mt-0.5">
                        {feature.subtitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. EDITORIAL EVENT CATEGORIES SECTION (7 Equal Icon-Only Glass Cards)
            ===================================================================== */}
        <section
          id="event-categories"
          aria-labelledby="event-categories-heading"
          className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-7"
        >
          {/* Lotus Mark + Section Heading with Flanking Gold Rules */}
          <div className="flex flex-col items-center text-center mb-5 lg:mb-6">
            <svg
              viewBox="0 0 36 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-5 mb-1.5 text-gold opacity-90"
              aria-hidden="true"
            >
              <path d="M18 2 C20.5 7, 21 12.5, 18 17.5 C15 12.5, 15.5 7, 18 2 Z" />
              <path d="M18 17.5 C14 14.5, 10.5 10, 10.5 5.5 C14 6.5, 16.5 10, 18 17.5 Z" />
              <path d="M18 17.5 C22 14.5, 25.5 10, 25.5 5.5 C22 6.5, 19.5 10, 18 17.5 Z" />
              <path d="M16.5 18 C11 17, 6.5 14, 4.5 10 C9 10, 13 12.5, 16.5 18 Z" />
              <path d="M19.5 18 C25 17, 29.5 14, 31.5 10 C27 10, 23 12.5, 19.5 18 Z" />
              <path d="M11 21.5 C15 20, 21 20, 25 21.5" />
            </svg>

            <div className="flex items-center justify-center gap-4 sm:gap-6 w-full">
              <span
                className="h-px w-12 sm:w-24 lg:w-28"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgb(var(--c-gold) / 0.55))',
                }}
                aria-hidden="true"
              />
              <h2
                id="event-categories-heading"
                className="font-display text-[26px] sm:text-[32px] lg:text-[35px] font-medium text-ink tracking-[0.005em]"
              >
                Explore Our Event Categories
              </h2>
              <span
                className="h-px w-12 sm:w-24 lg:w-28"
                style={{
                  background: 'linear-gradient(90deg, rgb(var(--c-gold) / 0.55), transparent)',
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 7 Equal Icon-Only Frosted Glass Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-3.5 lg:gap-4 max-w-[1300px] mx-auto">
            {EVENT_CATEGORIES.map((item) => {
              const Icon = item.icon;
              const isHighlighted = activeCategoryId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveCategoryId(item.id)}
                  onFocus={() => setActiveCategoryId(item.id)}
                  onClick={() => onStartPlanning(item.category)}
                  className={`group relative w-full h-[126px] sm:h-[135px] rounded-[22px] p-4 flex flex-col items-center justify-center text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isHighlighted
                      ? 'eventara-category-card eventara-category-card-active'
                      : 'eventara-category-card'
                  }`}
                >
                  {isHighlighted && (
                    <span
                      className="absolute -top-px left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={`mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 ${
                      isHighlighted
                        ? 'text-gold-ink dark:text-[#F6D39E] drop-shadow-[0_0_10px_rgba(242,166,74,0.35)]'
                        : 'text-gold group-hover:text-gold-ink'
                    }`}
                  >
                    <Icon className="w-7 h-7 stroke-[1.5]" />
                  </span>

                  <span className="font-sans text-[13px] sm:text-[13.5px] font-medium text-ink leading-snug max-w-[120px]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Three Interactive Pagination Dots */}
          <div
            className="flex items-center justify-center gap-2.5 pt-5"
            role="tablist"
            aria-label="Category highlight presets"
          >
            {[
              { index: 0, targetId: 'weddings', label: 'Weddings & Celebrations' },
              { index: 1, targetId: 'corporate', label: 'Corporate & College Events' },
              { index: 2, targetId: 'festivals', label: 'Festivals & Custom Gatherings' },
            ].map((dot) => (
              <button
                key={dot.index}
                type="button"
                role="tab"
                aria-selected={activeDot === dot.index}
                aria-label={dot.label}
                onClick={() => {
                  setActiveDot(dot.index);
                  setActiveCategoryId(dot.targetId);
                }}
                className="p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full"
              >
                <span
                  className={`block rounded-full transition-all ${
                    activeDot === dot.index
                      ? 'w-2.5 h-2.5 bg-saffron shadow-[0_0_8px_rgba(242,166,74,0.8)]'
                      : 'w-2 h-2 bg-ink/25 hover:bg-ink/45'
                  }`}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Decorative Silk-Ribbon Waves */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-[115px] pointer-events-none z-[1] opacity-55 dark:opacity-100"
          viewBox="0 0 1672 120"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="leftSilkFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6D2337" stopOpacity="0.46" />
              <stop offset="55%" stopColor="#3D1724" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#12090E" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="leftSilkStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D75C75" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#F1C27D" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F1C27D" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rightSilkStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F1C27D" stopOpacity="0" />
              <stop offset="55%" stopColor="#F2A64A" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#F1C27D" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          <path d="M 0 15 C 145 10, 255 68, 420 118 L 0 120 Z" fill="url(#leftSilkFill)" />
          <path d="M 0 15 C 145 10, 255 68, 420 118" stroke="url(#leftSilkStroke)" strokeWidth="1.4" />
          <path d="M 0 58 C 120 55, 210 88, 330 120" stroke="#D75C75" strokeOpacity="0.3" strokeWidth="1" />

          <path d="M 1050 120 C 1210 72, 1395 66, 1672 114 L 1672 120 Z" fill="url(#leftSilkFill)" />
          <path d="M 1050 120 C 1210 72, 1395 66, 1672 114" stroke="url(#rightSilkStroke)" strokeWidth="1.6" />
        </svg>
      </div>

      {/* =========================================================================
          BELOW-THE-FOLD EDITORIAL SECTIONS
          ========================================================================= */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 space-y-20">
        
        {/* =======================================================================
            SECTION A: “Plan with confidence” Six-Card Feature Grid + GenAI Guidance
            ======================================================================= */}
        <section
          aria-labelledby="plan-confidence-heading"
          className="reveal-up space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow">Every Detail Accounted For</span>
            <h2
              id="plan-confidence-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink"
            >
              Plan with confidence
            </h2>
            <p className="text-sm sm:text-base text-ink-2">
              Practical planning tools designed to keep your celebration organized, transparent, and calm from first sketch to final toast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Wallet,
                title: 'Smart Budget Planner',
                desc: 'Allocate your budget across core categories with deterministic INR calculations and contingency reserves.',
                actionLabel: 'Inspect sample budget',
                onClick: () => onExploreDemo('sample-wedding-1'),
              },
              {
                icon: CalendarCheck,
                title: 'Timeline & Task Checklist',
                desc: 'Follow date-aware milestones from ninety days out down to the final event-day run of show.',
                actionLabel: 'Open event calendar',
                onClick: () => onOpenCalendar(),
              },
              {
                icon: Store,
                title: 'Trusted Vendor Discovery',
                desc: 'Organize venue, catering, decor, and photography requirements with structured shortlist tracking.',
                actionLabel: 'Browse service categories',
                onClick: () => (onOpenServices ? onOpenServices() : onExploreDemo()),
              },
              {
                icon: Users,
                title: 'Guest List & RSVP Tracking',
                desc: 'Coordinate guest headcounts, dietary preferences, and hospitality logistics in one calm workspace.',
                actionLabel: 'Configure guest scale',
                onClick: () => onStartPlanning('wedding'),
              },
              {
                icon: Palette,
                title: 'Theme & Decor Inspiration',
                desc: 'Explore curated celebration palettes, floral concepts, and lighting directions for every venue.',
                actionLabel: 'Explore moodboards',
                onClick: () => onOpenInspiration(),
              },
              {
                icon: Share2,
                title: 'Collaboration for Family and Teams',
                desc: 'Share schedules, delegate tasks, and consult the AI planning assistant for structured checklists.',
                actionLabel: 'Ask AI planning assistant',
                onClick: () => openAIStarterPrompt(),
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={card.onClick}
                  className="group eventara-editorial-card eventara-editorial-card-interactive rounded-2xl p-6 text-left flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="space-y-3.5">
                    <div className="w-11 h-11 rounded-xl bg-surface-2 dark:bg-white/[0.04] border border-gold/25 flex items-center justify-center text-gold group-hover:scale-110 group-hover:text-saffron transition-all duration-200">
                      <Icon className="w-5 h-5 stroke-[1.65]" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink group-hover:text-gold-ink transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-line/70 flex items-center justify-between text-xs font-semibold text-gold-ink">
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Honest GenAI Planning Assistant Entry Bar */}
          <div className="eventara-editorial-card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/35 flex items-center justify-center text-gold flex-shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-ink">
                    AI Planning Assistant
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-2 text-[11px] font-medium text-gold-ink border border-gold/25">
                    Guided Starter Prompt
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-2">
                  Need a starting point? Launch the assistant with{' '}
                  <span className="italic text-ink font-medium">
                    “Help me create a wedding budget, timeline, and vendor checklist.”
                  </span>
                </p>
                <p className="text-[11px] text-ink-2 flex items-center gap-1.5 pt-0.5">
                  <Info className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>
                    AI suggestions are planning guidance — users should confirm final vendor availability, prices, dates, and contracts themselves.
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={openAIStarterPrompt}
              className="btn-sheen min-h-[44px] px-5 py-2.5 rounded-full bg-gradient-to-r from-[#571B32] to-[#702435] dark:from-[#E07A5F] dark:to-[#F2B866] text-[#FFF8F2] dark:text-[#241015] text-xs sm:text-sm font-semibold flex items-center gap-2 flex-shrink-0 shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open AI Assistant</span>
            </button>
          </div>
        </section>

        {/* =======================================================================
            SECTION B: “How Eventara works” Four-Step Horizontal Journey + Workspace Preview
            ======================================================================= */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="reveal-up space-y-10"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow">A Clear Path From Vision to Celebration</span>
            <h2
              id="how-it-works-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink"
            >
              How Eventara works
            </h2>
            <p className="text-sm sm:text-base text-ink-2">
              Four structured steps that replace scattered spreadsheets with a single organized event blueprint.
            </p>
          </div>

          {/* Horizontal Desktop Timeline / Vertical Mobile Layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                icon: PenTool,
                title: 'Tell us about your occasion',
                desc: 'Select your celebration category, preferred date, city, guest count, and target INR budget.',
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'Receive your personalized plan',
                desc: 'Get an organized blueprint with deterministic budget allocations, milestone dates, and theme concepts.',
              },
              {
                step: '03',
                icon: Sliders,
                title: 'Manage budgets, tasks, and vendors',
                desc: 'Track committed spend, check off preparation tasks, and organize vendor shortlists at your pace.',
              },
              {
                step: '04',
                icon: PartyPopper,
                title: 'Celebrate with confidence',
                desc: 'Export your master schedule, share timelines with family, and enjoy a stress-free celebration.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative eventara-editorial-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-surface-2 dark:bg-white/[0.04] border border-gold/30 flex items-center justify-center text-gold">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="font-display text-2xl font-semibold text-gold/75">
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {idx < 3 && (
                    <div
                      className="hidden lg:flex items-center gap-1 text-[11px] text-gold-ink pt-4 mt-4 border-t border-line/60"
                      aria-hidden="true"
                    >
                      <span>Next phase</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                  {idx === 3 && (
                    <div className="pt-4 mt-4 border-t border-line/60">
                      <button
                        type="button"
                        onClick={() => onStartPlanning('wedding')}
                        className="text-xs font-semibold text-gold-ink hover:underline flex items-center gap-1"
                      >
                        <span>Start your plan now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Workspace Preview & 3D Ambience Toggle */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
            <div className="lg:col-span-8">
              {show3DPreview ? (
                <div className="h-full min-h-[320px] eventara-editorial-card rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-xl font-semibold text-ink">
                      Interactive 3D Ambience Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => setShow3DPreview(false)}
                      className="text-xs font-semibold text-gold-ink hover:underline"
                    >
                      Return to Workspace Preview
                    </button>
                  </div>
                  <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden bg-[#12090E]">
                    <Festive3DCanvas festivalGlow="#F1C27D" isInteractive={true} />
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-2xl eventara-editorial-card overflow-hidden">
                  <div className="grid grid-cols-12 h-full min-h-[310px]">
                    {/* Sidebar */}
                    <div className="col-span-12 sm:col-span-3 bg-surface-2/75 dark:bg-[#11080D] border-b sm:border-b-0 sm:border-r border-line p-3.5 flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-1.5 border-b border-line pb-2">
                          <Sparkles className="w-3.5 h-3.5 text-gold" />
                          <span className="font-display text-sm font-semibold text-ink">
                            Eventara Workspace
                          </span>
                        </div>

                        <div className="flex sm:flex-col gap-1 overflow-x-auto no-scrollbar">
                          {[
                            'Dashboard',
                            'My Event',
                            'Budget',
                            'Timeline',
                            'Checklist',
                            'Vendors',
                          ].map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setActiveTabletTab(tab)}
                              className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                                activeTabletTab === tab
                                  ? 'bg-maroon text-[#FFF8F2] dark:bg-[#3C1B27] dark:text-[#F7EEE9]'
                                  : 'text-ink-2 hover:text-ink hover:bg-surface'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                              <span>{tab}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onExploreDemo()}
                        className="mt-3 sm:mt-0 w-full py-2 rounded-lg bg-gold/15 text-gold-ink text-xs font-semibold text-center hover:bg-gold/25 transition-colors"
                      >
                        Open Sample Event
                      </button>
                    </div>

                    {/* Main Preview Content */}
                    <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                        <div className="flex items-center gap-2">
                          <Gem className="w-4 h-4 text-gold" />
                          <h3 className="font-display text-lg font-semibold text-ink">
                            Sample Blueprint: Royal Heritage Wedding
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-gold/15 border border-gold/35 text-[10px] font-semibold text-gold-ink">
                            Demo Plan
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onExploreDemo()}
                            className="px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-line/50 border border-line text-xs text-ink-2 flex items-center gap-1"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Share</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onExploreDemo()}
                            className="px-2.5 py-1 rounded-lg bg-surface-2 hover:bg-line/50 border border-line text-xs text-ink-2 flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Export</span>
                          </button>
                        </div>
                      </div>

                      {/* 4 Mini Metric Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line">
                          <div className="text-xs font-bold text-ink">₹ 12,50,000</div>
                          <div className="text-[10px] text-ink-2">Planned Budget</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line">
                          <div className="text-xs font-bold text-gold-ink">₹ 8,90,000</div>
                          <div className="text-[10px] text-ink-2">Allocated</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line">
                          <div className="text-xs font-bold text-forest">₹ 3,60,000</div>
                          <div className="text-[10px] text-ink-2">Remaining Buffer</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-2/60 border border-gold/30 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center text-[10px] font-bold text-gold-ink">
                            71%
                          </div>
                          <div>
                            <div className="text-xs font-bold text-ink">Milestones</div>
                            <div className="text-[10px] text-ink-2 leading-none">On Track</div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline & Interactive Checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                        <div className="md:col-span-7 p-3 rounded-xl bg-surface-2/50 border border-line space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-ink">
                              Preparation Timeline
                            </span>
                            <div className="flex gap-2 text-[10px] text-ink-2">
                              <span>90d</span>
                              <span>60d</span>
                              <span>30d</span>
                              <span>7d</span>
                            </div>
                          </div>

                          <div className="space-y-2 text-[11px]">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-ink-2 truncate w-28">Venue Booking</span>
                              <div className="flex-1 h-2 rounded-full bg-line/50 overflow-hidden">
                                <div className="w-2/3 h-full rounded-full bg-gold" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-ink-2 truncate w-28">Vendor Shortlist</span>
                              <div className="flex-1 h-2 rounded-full bg-line/50 overflow-hidden">
                                <div className="w-3/5 ml-4 h-full rounded-full bg-rose" />
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-ink-2 truncate w-28">Menu & Decor</span>
                              <div className="flex-1 h-2 rounded-full bg-line/50 overflow-hidden">
                                <div className="w-1/2 ml-8 h-full rounded-full bg-gold" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-5 p-3 rounded-xl bg-surface-2/50 border border-line space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-ink">
                              Interactive Checklist
                            </span>
                            <span className="text-[10px] text-gold-ink font-semibold">
                              {checklistItems.filter((i) => i.done).length} / {checklistItems.length}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {checklistItems.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleChecklist(item.id)}
                                className="w-full flex items-center justify-between text-xs text-ink-2 hover:text-ink py-0.5"
                              >
                                <span className="flex items-center gap-2 truncate">
                                  <span
                                    className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                                      item.done
                                        ? 'bg-gold text-bg'
                                        : 'border border-line'
                                    }`}
                                  >
                                    {item.done && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </span>
                                  <span className="truncate">{item.label}</span>
                                </span>
                                <ChevronRight className="w-3 h-3 text-ink-2 flex-shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Columns: Launch Event Wizard CTA Card */}
            <div className="lg:col-span-4 eventara-editorial-card rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="eyebrow">Ready in Minutes</span>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Build your custom event blueprint
                </h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  Customize your guest count, venue style, culinary preferences, and contingency reserve in our guided four-step wizard.
                </p>
              </div>

              <div className="space-y-2.5 pt-6">
                <button
                  type="button"
                  onClick={() => onStartPlanning('wedding')}
                  className="btn-sheen w-full min-h-[46px] py-3 px-5 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Start Planning Your Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShow3DPreview((prev) => !prev)}
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-surface-2 hover:bg-line/50 border border-line text-xs font-semibold text-ink flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>{show3DPreview ? 'Show Workspace View' : 'Preview 3D Stage Lighting'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION C: “Made for every celebration” Editorial Split Showcase
            ======================================================================= */}
        <section
          id="community-section"
          aria-labelledby="every-celebration-heading"
          className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left 6 Columns: Single Large Framed Editorial Image with Subtle Hover Zoom */}
          <div className="lg:col-span-6 group">
            <div className="media-frame rounded-3xl border border-gold/25 shadow-xl aspect-[16/11] bg-surface-2">
              <img
                src={showcaseImgSrc}
                alt="Warmly illuminated celebration courtyard with floral garlands and dining tables"
                onError={() => {
                  if (showcaseImgSrc !== '/assets/hero/eventara-night-venue.jpg') {
                    setShowcaseImgSrc('/assets/hero/eventara-night-venue.jpg');
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[#FFF8F2]">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#F1C27D] block">
                    Curated Atmospheres
                  </span>
                  <span className="font-display text-xl font-medium">
                    Heritage Courtyards, Intimate Soirées & Grand Galas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Three Concise Highlight Rows + Explore Ideas Action */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="eyebrow">Versatile by Design</span>
              <h2
                id="every-celebration-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink"
              >
                Made for every celebration
              </h2>
              <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                Whether you are hosting fifty close relatives or a thousand festival attendees, Eventara adapts budgets, schedules, and checklists to the scale of your occasion.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  icon: Cake,
                  title: 'Birthdays & Milestone Anniversaries',
                  desc: 'Plan intimate family dinners, themed milestone parties, custom patisserie orders, and keepsake photography.',
                  category: 'birthday' as EventCategory,
                },
                {
                  icon: Sun,
                  title: 'Cultural & Community Gatherings',
                  desc: 'Coordinate festive pujas, college cultural fests, stage performances, and crowd hospitality with clear time slots.',
                  category: 'cultural' as EventCategory,
                },
                {
                  icon: Briefcase,
                  title: 'Corporate Events & Galas',
                  desc: 'Structure executive summits, annual awards nights, AV production checklists, and catering timelines.',
                  category: 'corporate' as EventCategory,
                },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.title}
                    onClick={() => onStartPlanning(row.category)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onStartPlanning(row.category);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    className="group eventara-editorial-card eventara-editorial-card-interactive rounded-2xl p-4 flex items-start gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <span className="w-10 h-10 rounded-xl bg-surface-2 dark:bg-white/[0.04] border border-gold/25 flex items-center justify-center text-gold flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-ink group-hover:text-gold-ink transition-colors">
                        {row.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-2 mt-0.5 leading-relaxed">
                        {row.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenInspiration}
                className="btn-sheen min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-2 hover:bg-line/60 border border-gold/40 text-ink font-semibold text-xs sm:text-sm transition-all"
              >
                <Palette className="w-4 h-4 text-gold" />
                <span>Explore ideas</span>
                <ArrowRight className="w-4 h-4 text-gold" />
              </button>
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION D: Testimonials & Trust Row (Honest Illustrative Stories)
            ======================================================================= */}
        <section
          aria-labelledby="testimonials-heading"
          className="reveal-up space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="eyebrow">Calm, Organized Hosting</span>
            <h2
              id="testimonials-heading"
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-ink"
            >
              Designed for thoughtful hosts
            </h2>
            <p className="text-xs sm:text-sm text-ink-2">
              Illustrative scenarios showing how hosts use Eventara to keep budgets and timelines under control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                initials: 'AM',
                name: 'Ananya M.',
                role: 'Wedding host (Sample scenario)',
                quote:
                  'Having our ceremony timeline, family checklist, and catering budget in one calm workspace kept everyone aligned without juggling ten spreadsheets.',
              },
              {
                initials: 'RK',
                name: 'Rohan K.',
                role: 'Birthday planner (Sample scenario)',
                quote:
                  'We mapped out my parents’ milestone celebration in an evening. The contingency buffer and task reminders made sure nothing was overlooked.',
              },
              {
                initials: 'SN',
                name: 'Sneha N.',
                role: 'Community organizer (Sample scenario)',
                quote:
                  'Coordinating our cultural fest across decor, stage sound, and food stalls felt structured and transparent for the entire organizing committee.',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="eventara-editorial-card rounded-2xl p-6 flex flex-col justify-between space-y-4"
              >
                <p className="font-sans text-xs sm:text-sm text-ink leading-relaxed italic">
                  “{item.quote}”
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-line/60">
                  <div
                    className="w-10 h-10 rounded-full bg-surface-2 border border-gold/35 flex items-center justify-center font-display text-sm font-bold text-gold-ink"
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-ink">{item.name}</div>
                    <div className="text-[11px] text-ink-2">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Small Trust Row */}
          <div className="rounded-2xl eventara-editorial-card px-6 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-line">
              {[
                {
                  icon: HeartHandshake,
                  label: 'Personalized planning',
                  sub: 'Tailored to your celebration category & cultural traditions',
                },
                {
                  icon: SlidersHorizontal,
                  label: 'Flexible budgets',
                  sub: 'Deterministic INR allocations with adjustable contingency reserves',
                },
                {
                  icon: ShieldCheck,
                  label: 'Your plans stay in your control',
                  sub: 'Edit every line item, export anytime, and verify vendors directly',
                },
              ].map((trust) => {
                const Icon = trust.icon;
                return (
                  <div
                    key={trust.label}
                    className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4 first:pt-0 first:pl-0"
                  >
                    <Icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-ink">
                        {trust.label}
                      </div>
                      <div className="text-[11px] text-ink-2">{trust.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION E: Restrained Full-Width Closing CTA
            ======================================================================= */}
        <section
          aria-labelledby="closing-cta-heading"
          className="reveal-up"
        >
          <div className="relative rounded-3xl eventara-editorial-card p-8 sm:p-12 lg:p-14 text-center overflow-hidden">
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[240px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgb(var(--c-gold) / 0.16) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-5">
              <span className="eyebrow">Begin With Clarity</span>
              <h2
                id="closing-cta-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink"
              >
                Your celebration starts with a plan.
              </h2>
              <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
                Turn your ideas into an organized event with structured budgets, date-aware checklists, and curated design inspiration.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onStartPlanning('wedding')}
                  className="btn-sheen min-h-[46px] inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-xs sm:text-sm border border-[#FCE1B2]/60 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan Your Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenInspiration}
                  className="min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-surface-2 hover:bg-line/60 border border-line hover:border-gold text-ink font-medium text-xs sm:text-sm transition-all"
                >
                  <Palette className="w-4 h-4 text-gold" />
                  <span>Explore Inspiration</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openAIStarterPrompt}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-ink hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>
                    Or ask the AI assistant: “Help me create a wedding budget, timeline, and vendor checklist.”
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* =========================================================================
          FULL INTERACTIVE CALENDAR WITH UPCOMING EVENTS & CUSTOM EVENT SCHEDULER
          ========================================================================= */}
      <FullInteractiveCalendar onPlanEvent={onPlanEventFromCalendar} />
    </div>
  );
};
