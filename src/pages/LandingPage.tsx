import React, { useState } from 'react';
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
  Share2,
  Download,
  Sliders,
  PartyPopper,
  PenTool,
  Crown,
  Check,
  ChevronRight,
} from 'lucide-react';
import { EventCategory, EventData } from '../types';
import { Festive3DCanvas } from '../components/Festive3DCanvas';
import { FullInteractiveCalendar } from '../components/FullInteractiveCalendar';

interface LandingPageProps {
  onStartPlanning: (category?: EventCategory) => void;
  onExploreDemo: (eventId?: string) => void;
  onOpenInspiration: () => void;
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
  onOpenCalendar,
  onOpenAIAssistant,
  onPlanEventFromCalendar,
}) => {
  const [heroImgSrc, setHeroImgSrc] = useState('/assets/eventara/hero-wedding-evening.webp');
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

  return (
    <div className="relative min-h-screen bg-[#12090E] text-[#F7EEE9] overflow-x-hidden selection:bg-[#F1C27D] selection:text-[#12090E]">
      
      {/* =========================================================================
          FIRST VIEWPORT STAGE (Target: 1672×941 Editorial Composition)
          ========================================================================= */}
      <div className="relative -mt-[70px] sm:-mt-[76px] pt-[70px] sm:pt-[76px] pb-7 lg:pb-8 overflow-hidden bg-gradient-to-b from-[#12090E] via-[#160D12] to-[#12090E]">
        
        {/* Subtle Warm Wine Ambient Washes (Restrained, Non-Neon) */}
        <div
          className="absolute top-16 left-0 w-[560px] h-[460px] rounded-full pointer-events-none"
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
          className="hidden lg:block absolute inset-0 w-full h-full object-cover pointer-events-none opacity-65 mix-blend-screen z-[2]"
        />

        {/* Muted Gold Botanical Line Art — Lower Left */}
        <img
          src="/assets/eventara/botanical-left.svg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="hidden md:block absolute left-0 bottom-8 w-[150px] lg:w-[195px] pointer-events-none opacity-75 z-[2]"
        />

        {/* Muted Gold Botanical Line Art — Lower Right */}
        <img
          src="/assets/eventara/botanical-right.svg"
          alt=""
          aria-hidden="true"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
          className="hidden md:block absolute right-0 bottom-4 w-[145px] lg:w-[185px] pointer-events-none opacity-75 z-[2]"
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

            {/* Soft Left Blend Vignette for Seamless Transition into Dark Burgundy Copy Area */}
            <div
              className="absolute inset-y-0 left-0 w-[34%]"
              style={{
                background:
                  'linear-gradient(90deg, #12090E 0%, rgba(18,9,14,0.86) 38%, rgba(18,9,14,0.28) 74%, transparent 100%)',
              }}
            />
            {/* Top & Bottom Edge Vignettes */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#12090E]/75 via-[#12090E]/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#12090E] via-[#12090E]/45 to-transparent" />
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
              <linearGradient id="eventaraCurveBand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B0D14" stopOpacity="0.82" />
                <stop offset="50%" stopColor="#2A141E" stopOpacity="0.46" />
                <stop offset="100%" stopColor="#12090E" stopOpacity="0.88" />
              </linearGradient>
              <linearGradient id="eventaraCurveStroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D75C75" stopOpacity="0.35" />
                <stop offset="32%" stopColor="#F1C27D" stopOpacity="0.95" />
                <stop offset="72%" stopColor="#F2A64A" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#F1C27D" stopOpacity="0.45" />
              </linearGradient>
              <filter id="eventaraSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Translucent crescent glass veil between dark left region and right photo */}
            <path
              d="M 815 0 C 625 180, 650 435, 965 595 L 885 595 C 585 430, 575 185, 760 0 Z"
              fill="url(#eventaraCurveBand)"
            />

            {/* Secondary faint outer hairline */}
            <path
              d="M 762 0 C 578 185, 588 430, 890 595"
              stroke="#F1C27D"
              strokeOpacity="0.18"
              strokeWidth="1"
            />

            {/* Primary luminous gold/rose sweeping arc */}
            <path
              d="M 815 0 C 625 180, 650 435, 965 595"
              stroke="url(#eventaraCurveStroke)"
              strokeWidth="1.85"
              filter="url(#eventaraSoftGlow)"
            />
          </svg>

          {/* Foreground Hero Content Container */}
          <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7 lg:pt-6 pb-8 lg:pb-14">
            <div className="max-w-[560px] lg:max-w-[590px] space-y-4 sm:space-y-5 text-left">
              
              {/* Eyebrow */}
              <p className="font-sans text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.28em] text-[#F1C27D]">
                PLAN <span className="mx-2 text-[#F1C27D]/70">&bull;</span> ORGANIZE{' '}
                <span className="mx-2 text-[#F1C27D]/70">&bull;</span> CELEBRATE
              </p>

              {/* Editorial Display Headline */}
              <h1 className="font-display text-[42px] sm:text-[52px] md:text-[54px] lg:text-[68px] xl:text-[74px] font-semibold text-[#F8F0E9] leading-[1.03] tracking-[-0.015em]">
                Make Every
                <br />
                Occasion{' '}
                <span className="relative inline-block italic font-normal bg-gradient-to-r from-[#F6D39E] via-[#F2A64A] to-[#DF7859] bg-clip-text text-transparent pr-1">
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
              <p className="font-sans text-[14px] sm:text-[15.5px] text-[#F7EEE9]/76 max-w-[495px] leading-[1.62] font-normal">
                A one-stop event planning platform to design, organize and manage unforgettable
                events — from intimate gatherings to grand celebrations.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onStartPlanning('wedding')}
                  className="group min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-sans font-semibold text-[13.5px] sm:text-[14px] border border-[#FCE1B2]/60 shadow-[0_10px_28px_rgba(242,166,74,0.34),inset_0_1px_0_rgba(255,255,255,0.55)] hover:brightness-105 active:translate-y-px transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#241015] stroke-[2]" />
                  <span>Plan Your Event</span>
                  <ArrowRight className="w-4 h-4 text-[#241015] stroke-[2] group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={scrollToHowItWorks}
                  className="min-h-[46px] inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#211219]/75 hover:bg-[#2C1822]/90 border border-[#F7EEE9]/25 hover:border-[#F1C27D]/55 text-[#F7EEE9] font-sans font-medium text-[13.5px] sm:text-[14px] backdrop-blur-md transition-all"
                >
                  <PlayCircle className="w-4 h-4 text-[#F1C27D] stroke-[1.75]" />
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Mobile-Only 16:10 Hero Image (Stacked cleanly without clipping) */}
              <div className="md:hidden pt-3">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#F1C27D]/25 shadow-xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12090E]/70 via-transparent to-transparent" />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-[#F7EEE9]/12">
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
                  onClick: () => onExploreDemo(),
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
                  onClick: () => (onOpenAIAssistant ? onOpenAIAssistant() : onOpenCalendar()),
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
                    <span className="w-10 h-10 rounded-xl bg-white/[0.03] border border-[#F1C27D]/20 flex items-center justify-center text-[#F1C27D] group-hover:text-[#F2A64A] group-hover:border-[#F1C27D]/45 transition-colors flex-shrink-0">
                      <Icon className="w-[22px] h-[22px] stroke-[1.65]" />
                    </span>
                    <div>
                      <span className="block font-sans text-[14px] sm:text-[14.5px] font-semibold text-[#F7EEE9] group-hover:text-[#F1C27D] transition-colors leading-snug">
                        {feature.title}
                      </span>
                      <span className="block font-sans text-[12px] text-[#F7EEE9]/70 leading-snug mt-0.5">
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
            {/* Small Outlined Gold Lotus Mark */}
            <svg
              viewBox="0 0 36 26"
              fill="none"
              stroke="#F1C27D"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-5 mb-1.5 opacity-90"
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
                  background: 'linear-gradient(90deg, transparent, rgba(241, 194, 125, 0.55))',
                }}
                aria-hidden="true"
              />
              <h2
                id="event-categories-heading"
                className="font-display text-[26px] sm:text-[32px] lg:text-[35px] font-medium text-[#F7EEE9] tracking-[0.005em]"
              >
                Explore Our Event Categories
              </h2>
              <span
                className="h-px w-12 sm:w-24 lg:w-28"
                style={{
                  background: 'linear-gradient(90deg, rgba(241, 194, 125, 0.55), transparent)',
                }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* 7 Equal Icon-Only Frosted Glass Cards
              - Desktop (≥1024px): 7 across 1 row (~155–170px × 135px)
              - Tablet (768–1023px): 4+3 grid
              - Mobile (<768px): 2-column grid */}
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
                  className={`group relative w-full h-[126px] sm:h-[135px] rounded-[22px] p-4 flex flex-col items-center justify-center text-center focus-visible:outline-none ${
                    isHighlighted
                      ? 'eventara-category-card eventara-category-card-active'
                      : 'eventara-category-card'
                  }`}
                >
                  {/* Top-Left Specular Rim Glow on Active/Weddings Card */}
                  {isHighlighted && (
                    <span
                      className="absolute -top-px left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#F6D39E] to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={`mb-3 transition-transform duration-200 group-hover:scale-105 ${
                      isHighlighted
                        ? 'text-[#F6D39E] drop-shadow-[0_0_10px_rgba(242,166,74,0.45)]'
                        : 'text-[#F1C27D] group-hover:text-[#F6D39E]'
                    }`}
                  >
                    <Icon className="w-7 h-7 stroke-[1.5]" />
                  </span>

                  <span className="font-sans text-[13px] sm:text-[13.5px] font-medium text-[#F7EEE9] leading-snug max-w-[120px]">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Three Small Pagination Dots (First Dot Gold) */}
          <div
            className="flex items-center justify-center gap-2.5 pt-5"
            role="tablist"
            aria-label="Category highlight presets"
          >
            {[
              { index: 0, targetId: 'weddings', label: 'Weddings & Celebrations' },
              { index: 1, targetId: 'corporate', label: 'Corporate & College Events' },
              { index: 2, targetId: 'cultural', label: 'Festivals & Custom Gatherings' },
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
                className="p-1.5 focus-visible:outline-none"
              >
                <span
                  className={`block rounded-full transition-all ${
                    activeDot === dot.index
                      ? 'w-2.5 h-2.5 bg-[#F2A64A] shadow-[0_0_8px_rgba(242,166,74,0.8)]'
                      : 'w-2 h-2 bg-[#F7EEE9]/25 hover:bg-[#F7EEE9]/45'
                  }`}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Decorative Silk-Ribbon Waves (Burgundy & Champagne Gold) */}
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-[115px] pointer-events-none z-[1]"
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

          {/* Left silk ribbon wave */}
          <path
            d="M 0 15 C 145 10, 255 68, 420 118 L 0 120 Z"
            fill="url(#leftSilkFill)"
          />
          <path
            d="M 0 15 C 145 10, 255 68, 420 118"
            stroke="url(#leftSilkStroke)"
            strokeWidth="1.4"
          />
          <path
            d="M 0 58 C 120 55, 210 88, 330 120"
            stroke="#D75C75"
            strokeOpacity="0.3"
            strokeWidth="1"
          />

          {/* Right champagne-gold silk ribbon wave */}
          <path
            d="M 1050 120 C 1210 72, 1395 66, 1672 114 L 1672 120 Z"
            fill="url(#leftSilkFill)"
          />
          <path
            d="M 1050 120 C 1210 72, 1395 66, 1672 114"
            stroke="url(#rightSilkStroke)"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      {/* =========================================================================
          BELOW-THE-FOLD EDITORIAL SECTIONS (Preserved Functionality & Workspace)
          ========================================================================= */}
      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 space-y-14">
        
        {/* How It Works + Interactive Workspace Preview + Planning Capabilities */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Left 3 Columns: How It Works (4 Simple Steps) */}
          <div className="lg:col-span-3 rounded-2xl bg-[#1A0E15]/80 border border-[#F7EEE9]/12 p-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#F1C27D]">
                Effortless Workflow
              </span>
              <h2
                id="how-it-works-heading"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#F7EEE9] mt-1"
              >
                How It Works
              </h2>
              <p className="text-xs text-[#F7EEE9]/70 mt-1">
                From your first vision to a stress-free celebration in four steps.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6">
              {[
                { icon: PenTool, step: '1. Tell Us', sub: 'About Your Event' },
                { icon: Sparkles, step: '2. Curate', sub: 'Tailored Blueprint' },
                { icon: Sliders, step: '3. Customize', sub: 'Vendors & Budget' },
                { icon: PartyPopper, step: '4. Celebrate', sub: 'Stress-Free' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl bg-[#24131C]/75 border border-[#F7EEE9]/10 p-3 flex flex-col items-start"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#2E1823] border border-[#F1C27D]/30 flex items-center justify-center text-[#F1C27D] mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-semibold text-[#F7EEE9] leading-tight">
                      {s.step}
                    </div>
                    <div className="text-[11px] text-[#F7EEE9]/65 leading-tight mt-0.5">
                      {s.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onStartPlanning('wedding')}
                className="w-full min-h-[44px] py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-[#F1C27D]/35 text-xs font-semibold text-[#F1C27D] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Event Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShow3DPreview((prev) => !prev)}
                className="w-full min-h-[40px] py-2 rounded-full text-[11px] font-medium text-[#F7EEE9]/70 hover:text-[#F1C27D] transition-colors"
              >
                {show3DPreview ? 'Hide 3D Stage Preview' : 'Preview 3D Stage Lighting'}
              </button>
            </div>
          </div>

          {/* Center 5 Columns: Interactive Event Workspace Preview */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {show3DPreview ? (
              <div className="h-full min-h-[320px] rounded-2xl bg-[#160B11] border border-[#F1C27D]/35 p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-lg text-[#F7EEE9]">
                    Interactive 3D Ambience Preview
                  </span>
                  <button
                    type="button"
                    onClick={() => setShow3DPreview(false)}
                    className="text-xs text-[#F1C27D] hover:underline"
                  >
                    Back to Planner View
                  </button>
                </div>
                <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden">
                  <Festive3DCanvas festivalGlow="#F1C27D" isInteractive={true} />
                </div>
              </div>
            ) : (
              <div className="h-full rounded-2xl bg-[#160B11] border border-[#F1C27D]/30 shadow-[0_20px_50px_rgba(0,0,0,0.75)] overflow-hidden">
                <div className="grid grid-cols-12 h-full min-h-[320px]">
                  {/* Sidebar */}
                  <div className="col-span-3 bg-[#11080D] border-r border-white/10 p-3 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#F1C27D]" />
                        <span className="font-display text-sm font-semibold text-[#F7EEE9]">
                          Eventara
                        </span>
                      </div>

                      <div className="space-y-1">
                        {[
                          'Dashboard',
                          'My Event',
                          'Budget',
                          'Timeline',
                          'Checklist',
                          'Vendors',
                          'Guest List',
                        ].map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTabletTab(tab)}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5 ${
                              activeTabletTab === tab
                                ? 'bg-[#3C1B27] text-[#F7EEE9] border border-[#F1C27D]/30'
                                : 'text-[#F7EEE9]/60 hover:text-[#F7EEE9] hover:bg-white/5'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F1C27D]" />
                            <span className="truncate">{tab}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onExploreDemo()}
                      className="w-full py-1.5 rounded-lg bg-[#F1C27D]/15 text-[#F1C27D] text-[10px] font-semibold text-center hover:bg-[#F1C27D]/25 transition-colors"
                    >
                      Open Workspace
                    </button>
                  </div>

                  {/* Main Preview Content */}
                  <div className="col-span-9 p-4 space-y-3.5 bg-[#180C13]">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Gem className="w-3.5 h-3.5 text-[#F1C27D]" />
                        <h3 className="font-display text-base font-semibold text-[#F7EEE9]">
                          Royal Heritage Wedding Plan
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#D75C75]/20 border border-[#D75C75]/40 text-[9px] font-semibold text-[#F1C27D]">
                          In Progress
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onExploreDemo()}
                          className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-[#F7EEE9]/80 flex items-center gap-1"
                        >
                          <Share2 className="w-2.5 h-2.5" />
                          <span>Share</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onExploreDemo()}
                          className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-[#F7EEE9]/80 flex items-center gap-1"
                        >
                          <Download className="w-2.5 h-2.5" />
                          <span>Export</span>
                        </button>
                      </div>
                    </div>

                    {/* 4 Mini Metric Cards */}
                    <div className="grid grid-cols-4 gap-2">
                      <div className="p-2 rounded-xl bg-[#22121B] border border-white/10">
                        <div className="text-[11px] font-bold text-[#F7EEE9]">₹ 12,50,000</div>
                        <div className="text-[9px] text-[#F7EEE9]/60">Total Budget</div>
                      </div>
                      <div className="p-2 rounded-xl bg-[#22121B] border border-white/10">
                        <div className="text-[11px] font-bold text-[#F1C27D]">₹ 8,90,000</div>
                        <div className="text-[9px] text-[#F7EEE9]/60">Allocated</div>
                      </div>
                      <div className="p-2 rounded-xl bg-[#22121B] border border-white/10">
                        <div className="text-[11px] font-bold text-emerald-400">₹ 3,60,000</div>
                        <div className="text-[9px] text-[#F7EEE9]/60">Remaining</div>
                      </div>
                      <div className="p-2 rounded-xl bg-[#22121B] border border-[#F1C27D]/30 flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full border border-[#F1C27D] flex items-center justify-center text-[8px] font-bold text-[#F1C27D]">
                          71%
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#F7EEE9]">71%</div>
                          <div className="text-[8px] text-[#F7EEE9]/60 leading-none">Ready</div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Checklist Split */}
                    <div className="grid grid-cols-12 gap-2.5 pt-1">
                      <div className="col-span-7 p-2.5 rounded-xl bg-[#1E1018] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#F7EEE9]">
                            Event Timeline
                          </span>
                          <div className="flex gap-2 text-[8px] text-[#F7EEE9]/50">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-[9px]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[#F7EEE9]/75 truncate w-24">Venue Booking</span>
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="w-1/2 h-full rounded-full bg-gradient-to-r from-[#F1C27D] to-[#D97736]" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[#F7EEE9]/75 truncate w-24">Vendor Lock</span>
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="w-2/3 ml-4 h-full rounded-full bg-gradient-to-r from-[#D75C75] to-[#F1C27D]" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[#F7EEE9]/75 truncate w-24">Guest Invites</span>
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="w-1/2 ml-8 h-full rounded-full bg-[#D75C75]" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[#F7EEE9]/75 truncate w-24">Decor & Floral</span>
                            <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                              <div className="w-1/3 ml-12 h-full rounded-full bg-[#F1C27D]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-5 p-2.5 rounded-xl bg-[#1E1018] border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#F7EEE9]">
                            Checklist
                          </span>
                          <span className="text-[8px] text-[#F1C27D]">12 / 17</span>
                        </div>

                        <div className="space-y-1">
                          {checklistItems.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleChecklist(item.id)}
                              className="w-full flex items-center justify-between text-[9px] text-[#F7EEE9]/85 hover:text-[#F7EEE9] py-0.5"
                            >
                              <span className="flex items-center gap-1.5 truncate">
                                <span
                                  className={`w-3 h-3 rounded flex items-center justify-center ${
                                    item.done
                                      ? 'bg-[#F1C27D] text-[#12090E]'
                                      : 'border border-white/30'
                                  }`}
                                >
                                  {item.done && <Check className="w-2 h-2 stroke-[3]" />}
                                </span>
                                <span className="truncate">{item.label}</span>
                              </span>
                              <ChevronRight className="w-2.5 h-2.5 text-white/40 flex-shrink-0" />
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

          {/* Right 4 Columns: Complete Event Planning Suite */}
          <div className="lg:col-span-4 rounded-2xl bg-[#1A0E15]/80 border border-[#F7EEE9]/12 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Crown className="w-4 h-4 text-[#F1C27D]" />
                <h3 className="font-display text-xl font-semibold text-[#F7EEE9]">
                  Bespoke Planning Suite
                </h3>
              </div>

              <ul className="space-y-2.5 my-4">
                {[
                  { bold: 'Curated Theme & Decor Moodboards', sub: 'tailored to your venue' },
                  { bold: 'Real-Time Budget & Milestone Tracking', sub: '' },
                  { bold: 'Verified Vendor Shortlists', sub: 'by city & budget tier' },
                  { bold: 'Guest List, RSVP & Hospitality', sub: '' },
                  { bold: 'Family & Team Collaboration', sub: 'shared checklists' },
                  { bold: 'Customizable Run-of-Show Timelines', sub: '' },
                ].map((feat, i) => (
                  <li
                    key={i}
                    onClick={() => onStartPlanning()}
                    className="flex items-center gap-2.5 text-xs cursor-pointer group"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#F1C27D]/15 border border-[#F1C27D]/45 flex items-center justify-center text-[#F1C27D] flex-shrink-0 group-hover:bg-[#F1C27D] group-hover:text-[#12090E] transition-colors">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                    <span className="text-[#F7EEE9]/85 group-hover:text-[#F1C27D] transition-colors">
                      <strong className="font-medium text-[#F7EEE9]">{feat.bold}</strong>{' '}
                      {feat.sub && (
                        <span className="text-[#F7EEE9]/55 text-[11px]">({feat.sub})</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {onOpenAIAssistant && (
              <button
                type="button"
                onClick={() => onOpenAIAssistant()}
                className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#3D1B28] to-[#28121B] hover:from-[#4D2233] hover:to-[#341723] border border-[#F1C27D]/40 text-xs font-medium text-[#F7EEE9] flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F1C27D]" />
                <span>Consult Eventara Planning Concierge</span>
              </button>
            )}
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
