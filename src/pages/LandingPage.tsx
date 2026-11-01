import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Play,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Users,
  Wand2,
  Headphones,
  CheckCircle2,
  Flame,
  Cake,
  Briefcase,
  GraduationCap,
  GlassWater,
  PartyPopper,
  Compass,
} from 'lucide-react';
import { EventCategory, EventData } from '../types';
import { Festive3DCanvas } from '../components/Festive3DCanvas';
import { FullInteractiveCalendar } from '../components/FullInteractiveCalendar';

interface LandingPageProps {
  onStartPlanning: (category?: EventCategory) => void;
  onExploreDemo: (eventId?: string) => void;
  onOpenInspiration: () => void;
  onOpenCalendar: () => void;
  onPlanEventFromCalendar: (details: { name: string; date: string; category: EventCategory; guestCount?: number; budget?: number }) => void;
  events: EventData[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlanning,
  onExploreDemo,
  onOpenInspiration,
  onOpenCalendar,
  onPlanEventFromCalendar,
  events,
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
      
      {/* Background Ambient Glows & Ethereal Floral Foliage */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#E5A855]/10 filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#D97736]/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-full bg-[#7928CA]/10 filter blur-[130px] pointer-events-none" />

      {/* Decorative Floral Watermark Corners (matching screenshot) */}
      <div className="absolute top-28 left-0 opacity-15 pointer-events-none hidden lg:block">
        <svg width="220" height="300" viewBox="0 0 220 300" fill="none" stroke="#E5A855" strokeWidth="1.2">
          <path d="M10 20C40 60 70 120 40 220M40 220C90 180 140 190 180 260M40 220C10 180 15 110 50 70M70 120C120 110 160 140 170 180" />
          <path d="M10 60C50 90 80 150 90 240M90 140C130 130 170 160 190 220" />
        </svg>
      </div>
      <div className="absolute bottom-40 right-0 opacity-15 pointer-events-none hidden lg:block">
        <svg width="220" height="300" viewBox="0 0 220 300" fill="none" stroke="#E5A855" strokeWidth="1.2">
          <path d="M210 280C180 240 150 180 180 80M180 80C130 120 80 110 40 40M180 80C210 120 205 190 170 230" />
        </svg>
      </div>

      {/* =========================================================================
          HERO SECTION (Exact match to uploaded luxury reference image)
          ========================================================================= */}
      <section className="relative pt-6 pb-12 lg:pt-12 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Luxury Typography & Buttons (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">
            
            {/* Spaced Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#E5A855] font-sans">
                PLAN &nbsp;•&nbsp; ORGANIZE &nbsp;•&nbsp; CELEBRATE
              </span>
            </div>

            {/* Headline with Italic "Special" Flourish */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Make Every <br />
              Occasion{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E5A855] via-[#F3C47C] to-[#E58235] drop-shadow-sm">
                Special
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/70 max-w-lg font-sans font-light leading-relaxed">
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
                <span>{show3DVisualizer ? 'View Venue Photo' : 'Interactive 3D Preview'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Majestic Curved Crescent Arch Frame (6 cols) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            
            {/* The Curved Illuminated Frame */}
            <div className="relative w-full max-w-lg h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-[#E5A855]/60 shadow-[0_0_50px_rgba(229,168,85,0.25)] group">
              
              {!show3DVisualizer ? (
                /* Photorealistic Luxury Mandap Scene (From User Reference) */
                <div className="relative w-full h-full">
                  <img
                    src="/assets/hero/eventara-hero.jpg"
                    alt="Luxury evening wedding celebration venue with fairy lights and floral mandap"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Subtle 3D Tag Pill on bottom right */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] text-[#E5A855] font-medium">
                    <Sparkles className="w-3 h-3 text-[#E5A855]" />
                    <span>Royal Palace Mandap</span>
                  </div>
                </div>
              ) : (
                /* Three.js Interactive 3D WebGL Canvas */
                <div className="relative w-full h-full bg-[#160B10] flex flex-col items-center justify-center p-4">
                  <Festive3DCanvas festivalGlow="#E5A855" isInteractive={true} />
                  <div className="absolute top-4 left-4 text-xs font-mono text-[#E5A855] bg-black/50 px-2.5 py-1 rounded-full border border-[#E5A855]/30">
                    WebGL Three.js 3D Interactive
                  </div>
                </div>
              )}

              {/* Glowing Rim Gradient Overlay */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none border border-[#E5A855]/40 shadow-inner" />
            </div>
          </div>
        </div>

        {/* =========================================================================
            FLOATING LIQUID FROSTED GLASS FEATURE BAR (as in user screenshot)
            ========================================================================= */}
        <div className="mt-12 sm:mt-16 w-full rounded-2xl p-4 sm:p-5 bg-[#180E13]/70 backdrop-blur-xl border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 px-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <CalendarIcon className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Complete Planning</h4>
                <p className="text-[11px] text-white/50">From idea to execution</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 px-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <Users className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Trusted Vendors</h4>
                <p className="text-[11px] text-white/50">Verified & reliable partners</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 px-3 py-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                <Wand2 className="w-5 h-5 text-[#E5A855]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-white">Personalized Experience</h4>
                <p className="text-[11px] text-white/50">Tailored to your style</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 px-3 py-2">
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
            EXPLORE OUR EVENT CATEGORIES (Exact match to reference carousel)
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
                  className={`group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-300 min-h-[110px] ${
                    isActive
                      ? 'bg-[#2A161E]/90 border border-[#E5A855] shadow-[0_0_25px_rgba(229,168,85,0.35)] scale-105'
                      : 'bg-[#180E13]/60 hover:bg-[#22131A] border border-white/10 hover:border-white/25 shadow-sm'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <span
                    className={`text-xs font-semibold tracking-wide ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
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
