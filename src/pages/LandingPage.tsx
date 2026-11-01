import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Play,
  ArrowRight,
  Sparkles,
  Users,
  Wand2,
  Headphones,
} from 'lucide-react';
import { EventCategory, EventData } from '../types';
import { Festive3DCanvas } from '../components/Festive3DCanvas';
import { FullInteractiveCalendar } from '../components/FullInteractiveCalendar';

interface LandingPageProps {
  onStartPlanning: (category?: EventCategory) => void;
  onExploreDemo: (eventId?: string) => void;
  onOpenInspiration: () => void;
  onOpenCalendar: () => void;
  onPlanEventFromCalendar: (details: {
    name: string;
    date: string;
    category: EventCategory;
    guestCount?: number;
    budget?: number;
  }) => void;
  events: EventData[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlanning,
  onOpenCalendar,
  onPlanEventFromCalendar,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('weddings');
  const [show3DVisualizer, setShow3DVisualizer] = useState(false);

  const categories = [
    { id: 'weddings', label: 'Weddings', icon: '💍', categoryKey: 'wedding' as EventCategory },
    { id: 'birthdays', label: 'Birthday Parties', icon: '🎂', categoryKey: 'birthday' as EventCategory },
    { id: 'corporate', label: 'Corporate Events', icon: '💼', categoryKey: 'fest' as EventCategory },
    { id: 'college', label: 'College Fests', icon: '🎓', categoryKey: 'fest' as EventCategory },
    { id: 'festivals', label: 'Festivals & Cultural', icon: '🪔', categoryKey: 'cultural' as EventCategory },
    { id: 'social', label: 'Social Gatherings', icon: '🥂', categoryKey: 'birthday' as EventCategory },
    { id: 'custom', label: 'Custom Events', icon: '✨', categoryKey: 'wedding' as EventCategory },
  ];

  return (
    <div className="relative min-h-screen bg-[#0D0709] text-white overflow-hidden selection:bg-[#E5A855] selection:text-black">
      
      {/* =========================================================================
          BACKGROUND GRAPHICS: Flowing Silk Ribbons & Botanical Foliage (Image 3)
          ========================================================================= */}
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#E5A855]/10 filter blur-[150px] pointer-events-none" />
      <div className="absolute top-48 right-10 w-[600px] h-[600px] rounded-full bg-[#D97736]/12 filter blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] rounded-full bg-[#702435]/15 filter blur-[160px] pointer-events-none" />

      {/* Botanical Leaf Foliage Engravings (Bottom Left & Bottom Right) */}
      <div className="absolute bottom-16 left-0 opacity-25 pointer-events-none hidden md:block z-0">
        <svg width="340" height="420" viewBox="0 0 340 420" fill="none" stroke="#E5A855" strokeWidth="1.2">
          {/* Main graceful stem */}
          <path d="M-20 420 C40 360 80 280 60 160 C50 100 20 40 0 0" strokeDasharray="1 0" />
          {/* Delicate botanical leaves */}
          <path d="M60 160 C100 130 160 150 180 190 C150 200 90 190 60 160Z" />
          <path d="M70 210 C120 190 180 220 190 260 C150 270 100 250 70 210Z" />
          <path d="M75 270 C130 260 180 300 170 340 C130 340 90 310 75 270Z" />
          <path d="M50 110 C80 80 130 90 150 120 C120 130 70 120 50 110Z" />
          <path d="M30 60 C60 30 100 40 110 70 C80 80 50 70 30 60Z" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-0 opacity-25 pointer-events-none hidden md:block z-0">
        <svg width="340" height="420" viewBox="0 0 340 420" fill="none" stroke="#E5A855" strokeWidth="1.2">
          <path d="M360 420 C300 360 260 280 280 160 C290 100 320 40 340 0" strokeDasharray="1 0" />
          <path d="M280 160 C240 130 180 150 160 190 C190 200 250 190 280 160Z" />
          <path d="M270 210 C220 190 160 220 150 260 C190 270 240 250 270 210Z" />
          <path d="M265 270 C210 260 160 300 170 340 C210 340 250 310 265 270Z" />
          <path d="M290 110 C260 80 210 90 190 120 C220 130 270 120 290 110Z" />
        </svg>
      </div>

      {/* Silky Wave Ribbons flowing at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 180" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="silkRibbon1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#702435" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E58235" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#702435" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="silkRibbon2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E5A855" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#D97736" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E5A855" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M-50 120 C300 40, 600 180, 1000 60 C1200 10, 1400 90, 1500 140 L1500 180 L-50 180 Z"
            fill="url(#silkRibbon1)"
          />
          <path
            d="M-50 150 C200 90, 500 190, 900 110 C1200 50, 1350 130, 1500 160 L1500 180 L-50 180 Z"
            fill="url(#silkRibbon2)"
          />
          {/* Delicate luminous crest line */}
          <path
            d="M-50 120 C300 40, 600 180, 1000 60 C1200 10, 1400 90, 1500 140"
            stroke="#E5A855"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* =========================================================================
          HERO SECTION WITH THE ILLUMINATED GOLDEN CRESCENT ARC
          ========================================================================= */}
      <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Hero Container with Curved Golden Arc Framing Venue Image on Right */}
        <div className="relative rounded-3xl overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center">
          
          {/* THE GOLDEN ARC SWOOP & VENUE BACKGROUND */}
          <div className="absolute inset-0 z-0">
            {/* The right side venue image uploaded by user */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[65%] h-full overflow-hidden">
              <img
                src="/assets/hero/eventara-night-venue.jpg"
                alt="Enchanting evening royal wedding venue with fairy lights and hanging lanterns"
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* Inner darkening gradient on the left of image for smooth blending */}
              <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#0D0709] via-[#0D0709]/70 to-transparent" />
            </div>

            {/* Dark solid backdrop on the left for crisp typography contrast */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[48%] bg-[#0D0709] z-0" />

            {/* The Elegant Curved Golden Arc Line (as seen in Image 3) */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block z-10">
              <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="goldenArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5A855" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#F5C07A" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C87A32" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {/* Glowing Golden Arc Path swooping from top down and curving to frame the right side */}
                <path
                  d="M 520 0 C 440 180, 430 380, 720 540 C 850 600, 1050 600, 1200 600"
                  stroke="url(#goldenArcGrad)"
                  strokeWidth="2.5"
                  filter="url(#arcGlow)"
                />
              </svg>
            </div>
          </div>

          {/* Left Hero Typography (placed on dark left column for 100% legibility) */}
          <div className="relative z-10 w-full lg:w-[50%] p-6 sm:p-10 lg:pl-12 lg:pr-6 space-y-6 text-left">
            
            {/* Spaced Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#E5A855] font-sans">
                PLAN &nbsp;•&nbsp; ORGANIZE &nbsp;•&nbsp; CELEBRATE
              </span>
            </div>

            {/* Headline matching Image 3 with Gold Script Flourish on "Special" */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-tight text-white leading-[1.05]">
              Make Every <br />
              Occasion{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E5A855] via-[#F5C27E] to-[#E58235] drop-shadow-md">
                Special
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-white/75 max-w-md font-sans font-light leading-relaxed">
              A one-stop event planning platform to design, organize and manage unforgettable events — from intimate gatherings to grand celebrations.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              
              {/* Primary "Plan Your Event →" Button with glowing outline */}
              <button
                onClick={() => onStartPlanning('wedding')}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-sm shadow-[0_0_30px_rgba(229,168,85,0.45)] hover:brightness-110 active:scale-95 transition-all"
              >
                <CalendarIcon className="w-4 h-4 text-white" />
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary "See How It Works" Pill */}
              <button
                onClick={() => setShow3DVisualizer(!show3DVisualizer)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1C1216]/80 hover:bg-[#281A20] border border-white/20 hover:border-[#E5A855]/60 text-white text-sm font-semibold transition-all shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#E5A855]">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>{show3DVisualizer ? 'View Venue Photo' : 'See How It Works'}</span>
              </button>
            </div>
          </div>

          {/* Optional Interactive 3D WebGL Overlay when clicked */}
          {show3DVisualizer && (
            <div className="absolute inset-y-0 right-0 w-full lg:w-[50%] bg-[#12080D]/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-6 border-l border-[#E5A855]/50 animate-fadeIn">
              <div className="w-full h-[320px] flex items-center justify-center">
                <Festive3DCanvas festivalGlow="#E5A855" isInteractive={true} />
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs font-mono text-[#E5A855] px-3 py-1 rounded-full bg-black/60 border border-[#E5A855]/40">
                  Interactive 3D Celebration Diya • Drag to Orbit
                </span>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            FLOATING LIQUID FROSTED GLASS FEATURE BAR (as in Image 3)
            ========================================================================= */}
        <div className="mt-10 sm:mt-12 w-full rounded-full p-4 sm:p-5 bg-[#180E13]/80 backdrop-blur-2xl border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.65)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 px-4 py-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <CalendarIcon className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Complete Planning</h4>
                <p className="text-[11px] text-white/50">From idea to execution</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 px-4 py-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <Users className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Trusted Vendors</h4>
                <p className="text-[11px] text-white/50">Verified & reliable partners</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 px-4 py-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <Wand2 className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Personalized Experience</h4>
                <p className="text-[11px] text-white/50">Tailored to your style</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 px-4 py-1">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <Headphones className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Dedicated Support</h4>
                <p className="text-[11px] text-white/50">We're with you at every step</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXPLORE OUR EVENT CATEGORIES (Exact match to Image 3)
            ========================================================================= */}
        <div className="mt-16 sm:mt-20 text-center">
          
          {/* Header with Gold Lotus and Dividers */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#E5A855]/60" />
            <div className="flex items-center gap-2">
              <span className="text-[#E5A855] text-lg">🪷</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Explore Our Event Categories
              </h2>
            </div>
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#E5A855]/60" />
          </div>

          {/* Horizontal Frosted Glass Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    onStartPlanning(cat.categoryKey);
                  }}
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-300 min-h-[115px] ${
                    isActive
                      ? 'bg-[#2A161E]/95 border border-[#E5A855] shadow-[0_0_25px_rgba(229,168,85,0.4)] scale-105'
                      : 'bg-[#180E13]/60 hover:bg-[#22131A] border border-white/10 hover:border-white/25 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span
                    className={`text-xs font-semibold tracking-wide ${
                      isActive ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-[#E5A855]" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL INTERACTIVE CALENDAR WITH UPCOMING EVENTS & CUSTOM EVENT SCHEDULER
          ========================================================================= */}
      <FullInteractiveCalendar onPlanEvent={onPlanEventFromCalendar} />
    </div>
  );
};
