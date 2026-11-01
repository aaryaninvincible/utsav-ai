import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Play,
  ArrowRight,
  Sparkles,
  Users,
  Wand2,
  Send,
  Star,
  Wallet,
  Clock,
  Store,
  CheckSquare,
  Lightbulb,
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

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartPlanning,
  onExploreDemo,
  onOpenInspiration,
  onOpenCalendar,
  onOpenAIAssistant,
  onPlanEventFromCalendar,
}) => {
  const [aiInput, setAiInput] = useState('');
  const [show3DModal, setShow3DModal] = useState(false);
  const [activeTabletTab, setActiveTabletTab] = useState('Dashboard');
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: 'Book Venue', done: true },
    { id: 2, label: 'Finalize Caterer', done: true },
    { id: 3, label: 'Send Invitations', done: true },
    { id: 4, label: 'Plan Decor', done: true },
  ]);

  const handleAssistantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim() && onOpenAIAssistant) {
      onOpenAIAssistant(aiInput.trim());
      setAiInput('');
    } else {
      onStartPlanning('wedding');
    }
  };

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0D060B] text-white overflow-hidden selection:bg-[#E5A855] selection:text-black">
      
      {/* =========================================================================
          AMBIENT GLOWS & SILK RIBBON WAVES (Exact match to Eventara AI screenshot)
          ========================================================================= */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[550px] rounded-full bg-[#E14D77]/12 filter blur-[160px] pointer-events-none" />
      <div className="absolute top-32 right-10 w-[550px] h-[550px] rounded-full bg-[#E5A855]/12 filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[600px] h-[500px] rounded-full bg-[#801B40]/15 filter blur-[160px] pointer-events-none" />

      {/* Right-Edge & Bottom-Left Glowing Silk Ribbon Waves */}
      <div className="absolute top-[340px] right-0 w-[420px] h-[420px] pointer-events-none opacity-60 z-0 hidden lg:block">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="pinkGoldWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E14D77" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#E5A855" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B1424" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M400 20 C260 80, 320 240, 140 310 C60 340, 20 380, 0 400 L400 400 Z"
            fill="url(#pinkGoldWave)"
          />
          <path
            d="M400 20 C260 80, 320 240, 140 310 C60 340, 20 380, 0 400"
            stroke="#E5A855"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      {/* =========================================================================
          MAIN CONTENT CONTAINER
          ========================================================================= */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-3 sm:px-6 pt-3 pb-16 space-y-6">
        
        {/* =======================================================================
            1. HERO SECTION: Left Copy + Center Mandap Scene + Right AI Assistant Card
            ======================================================================= */}
        <section className="relative rounded-3xl overflow-hidden min-h-[470px] lg:min-h-[500px] flex items-center border border-white/10 bg-[#11070E] shadow-[0_20px_70px_rgba(0,0,0,0.8)]">
          
          {/* Background Layer: Night Wedding Mandap on Right + Sweeping Golden Crescent Arc */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* High-Res Mandap Photo on Center-Right */}
            <div className="absolute inset-y-0 right-0 w-full lg:w-[70%] h-full">
              <img
                src="/assets/hero/eventara-night-venue.jpg"
                alt="Evening wedding mandap illuminated with fairy lights and floral garlands"
                className="w-full h-full object-cover object-center"
              />
              {/* Soft vignette blending left side and right side */}
              <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#11070E] via-[#11070E]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11070E] via-transparent to-black/30" />
            </div>

            {/* Solid Dark Velvet Backdrop on Left for crisp text */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[40%] bg-[#11070E]" />

            {/* Sweeping Golden Crescent Arc (matching screenshot curve) */}
            <svg
              className="hidden lg:block absolute inset-0 w-full h-full"
              viewBox="0 0 1360 520"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroArcGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E5A855" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#F5C27E" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#E14D77" stopOpacity="0.7" />
                </linearGradient>
                <filter id="heroArcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              {/* Outer subtle arc */}
              <path
                d="M 530 -10 C 400 180, 410 380, 580 530"
                stroke="#E5A855"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              {/* Main luminous golden crescent arc */}
              <path
                d="M 555 -10 C 425 180, 435 380, 615 530"
                stroke="url(#heroArcGrad)"
                strokeWidth="2.5"
                filter="url(#heroArcGlow)"
              />
            </svg>
          </div>

          {/* Foreground Grid: Left Hero Copy + Center Visual Space + Right AI Assistant Card */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:px-10 lg:py-8">
            
            {/* Left Column (5 Cols): Headline, Subtitle, CTAs & Stats */}
            <div className="lg:col-span-5 space-y-4 text-left">
              
              {/* Pill Badge: AI-Powered Event Planning */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#4A182B]/90 to-[#2C101D]/90 border border-[#E5A855]/45 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
                <span className="text-xs font-semibold text-[#F5C27E] tracking-wide">
                  AI-Powered Event Planning
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl xl:text-[54px] font-bold tracking-tight text-white leading-[1.08]">
                Plan, Organize & <br />
                Celebrate with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5A855] via-[#F7CE8B] to-[#E58235]">
                  AI
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-white/80 max-w-md font-sans leading-relaxed">
                Your smart event planning assistant for weddings, birthdays, and community events — with budgets, timelines, vendor checklists and personalized ideas.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onStartPlanning('wedding')}
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E04F7A] via-[#EA7B5C] to-[#E5A855] text-white font-semibold text-xs sm:text-sm shadow-[0_0_30px_rgba(224,79,122,0.5)] hover:brightness-110 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Start Planning with AI</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShow3DModal(!show3DModal)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1C0E16]/85 hover:bg-[#2A1521] border border-white/25 hover:border-[#E5A855]/60 text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>{show3DModal ? 'Hide 3D Demo' : 'Watch Demo'}</span>
                </button>
              </div>

              {/* 3 Stats Counters: 10K+ Events, 2K+ Vendors, 4.9 Rating */}
              <div className="pt-3 flex items-center gap-5 sm:gap-7 border-t border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855]">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white leading-tight">10K+</div>
                    <div className="text-[10px] text-white/60">Events Planned</div>
                  </div>
                </div>

                <div className="h-7 w-[1px] bg-white/10" />

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white leading-tight">2K+</div>
                    <div className="text-[10px] text-white/60">Trusted Vendors</div>
                  </div>
                </div>

                <div className="h-7 w-[1px] bg-white/10" />

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A855]">
                    <Star className="w-4 h-4 fill-[#E5A855] text-[#E5A855]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white leading-tight flex items-center gap-1">
                      <span>4.9</span>
                      <Star className="w-3 h-3 fill-[#E5A855] text-[#E5A855]" />
                    </div>
                    <div className="text-[10px] text-white/60">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Spacer (3 Cols): Lets the glowing wedding mandap shine through */}
            <div className="hidden lg:flex lg:col-span-3 items-center justify-center">
              {show3DModal && (
                <div className="w-full h-72 rounded-2xl bg-[#140A12]/90 backdrop-blur-xl border border-[#E5A855]/50 p-3 shadow-2xl">
                  <Festive3DCanvas festivalGlow="#E5A855" isInteractive={true} />
                </div>
              )}
            </div>

            {/* Right Column (4 Cols): Floating Eventara AI Assistant Chat Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-[#1A0D16]/88 backdrop-blur-2xl border border-[#E5A855]/45 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.85)] space-y-4">
                
                {/* Card Header */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Sparkles className="w-4 h-4 text-[#E5A855]" />
                  <h2 className="font-serif text-base sm:text-lg font-bold text-white">
                    Eventara AI Assistant
                  </h2>
                </div>

                {/* Greeting Message Bubble */}
                <div className="rounded-xl bg-[#261420]/90 border border-white/10 p-3.5 text-xs text-white/90 leading-relaxed shadow-inner">
                  <p className="font-medium text-white mb-1">
                    Hi! I'm your AI event planner 👋
                  </p>
                  <p className="text-white/75">
                    Tell me about your event, and I'll help you with ideas, budget, timeline and more.
                  </p>
                </div>

                {/* Quick Action Prompt Pills */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onStartPlanning('wedding')}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#24121D] hover:bg-[#381B2C] border border-[#E5A855]/30 text-xs font-medium text-white transition-all"
                    >
                      <span>💍</span>
                      <span>Plan a wedding</span>
                    </button>

                    <button
                      onClick={() => onStartPlanning('birthday')}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#24121D] hover:bg-[#381B2C] border border-[#E5A855]/30 text-xs font-medium text-white transition-all"
                    >
                      <span>🎂</span>
                      <span>Plan a birthday</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onStartPlanning('cultural')}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#24121D] hover:bg-[#381B2C] border border-[#E5A855]/30 text-xs font-medium text-white transition-all"
                  >
                    <span>👥</span>
                    <span>Organize a community event</span>
                  </button>
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleAssistantSubmit} className="relative pt-1">
                  <input
                    type="text"
                    placeholder="Describe your event..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className="w-full pl-4 pr-11 py-2.5 rounded-full bg-[#12080E]/90 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#E5A855]"
                  />
                  <button
                    type="submit"
                    aria-label="Send prompt"
                    className="absolute right-1.5 top-2.5 w-7 h-7 rounded-full bg-gradient-to-r from-[#E04F7A] to-[#E5A855] flex items-center justify-center text-white shadow-md hover:brightness-110 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* =======================================================================
            2. 6-ITEM HORIZONTAL FEATURE PILL BAR
            ======================================================================= */}
        <div className="rounded-2xl lg:rounded-full bg-[#190D16]/90 backdrop-blur-2xl border border-[#E5A855]/30 px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.65)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 divide-y sm:divide-y-0 lg:divide-x divide-white/10">
            {[
              { icon: Wallet, label: 'Budget Planner', action: () => onExploreDemo() },
              { icon: CalendarIcon, label: 'Timeline & Schedule', action: () => onOpenCalendar() },
              { icon: Store, label: 'Vendor Management', action: () => onExploreDemo() },
              { icon: CheckSquare, label: 'Checklist & Tasks', action: () => onExploreDemo() },
              { icon: Sparkles, label: 'AI Ideas & Themes', action: () => onOpenInspiration() },
              { icon: Users, label: 'Guest Management', action: () => onExploreDemo() },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="flex items-center justify-center gap-2.5 px-3 py-1.5 text-xs font-semibold text-white/85 hover:text-[#E5A855] transition-colors group"
                >
                  <Icon className="w-4 h-4 text-[#E5A855] group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================================================================
            3. MIDDLE ROW: Explore Event Types (8 Cols) + GenAI Magic Card (4 Cols)
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          
          {/* Left 8 Columns: Explore Event Types */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-3">
            
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Explore Event Types
                </h2>
                <div className="h-[1px] w-16 bg-gradient-to-r from-[#E5A855]/60 to-transparent" />
              </div>

              <button
                onClick={() => onStartPlanning()}
                className="text-xs font-semibold text-white/70 hover:text-[#E5A855] flex items-center gap-1 transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Rich Photo Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              
              {/* Card 1: Weddings */}
              <div
                onClick={() => onStartPlanning('wedding')}
                className="group relative rounded-2xl overflow-hidden border border-[#E5A855]/35 bg-[#160B12] cursor-pointer min-h-[195px] flex flex-col justify-end p-4 shadow-lg hover:border-[#E5A855] transition-all"
              >
                <img
                  src="/assets/hero/eventara-night-venue.jpg"
                  alt="Weddings"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10060C] via-[#10060C]/55 to-transparent" />

                <div className="relative z-10 flex items-end justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl mt-0.5">💍</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">
                        Weddings
                      </h3>
                      <p className="text-[11px] text-white/75 mt-0.5">
                        Plan your dream wedding with AI
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#E5A855] group-hover:text-black border border-white/20 flex items-center justify-center text-white transition-all flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 2: Birthdays */}
              <div
                onClick={() => onStartPlanning('birthday')}
                className="group relative rounded-2xl overflow-hidden border border-[#E5A855]/35 bg-[#160B12] cursor-pointer min-h-[195px] flex flex-col justify-end p-4 shadow-lg hover:border-[#E5A855] transition-all"
              >
                <img
                  src="/assets/events/birthday-cake-luxury.jpg"
                  alt="Birthdays"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10060C] via-[#10060C]/55 to-transparent" />

                <div className="relative z-10 flex items-end justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl mt-0.5">🎂</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">
                        Birthdays
                      </h3>
                      <p className="text-[11px] text-white/75 mt-0.5">
                        Create memorable birthday celebrations
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#E5A855] group-hover:text-black border border-white/20 flex items-center justify-center text-white transition-all flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 3: Community Events */}
              <div
                onClick={() => onStartPlanning('cultural')}
                className="group relative rounded-2xl overflow-hidden border border-[#E5A855]/35 bg-[#160B12] cursor-pointer min-h-[195px] flex flex-col justify-end p-4 shadow-lg hover:border-[#E5A855] transition-all"
              >
                <img
                  src="/assets/events/community-concert-luxury.jpg"
                  alt="Community Events"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10060C] via-[#10060C]/55 to-transparent" />

                <div className="relative z-10 flex items-end justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl mt-0.5">👥</span>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">
                        Community Events
                      </h3>
                      <p className="text-[11px] text-white/75 mt-0.5">
                        Organize college, cultural & social events
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#E5A855] group-hover:text-black border border-white/20 flex items-center justify-center text-white transition-all flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right 4 Columns: GenAI Magic for Your Event Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#1A0D16]/90 backdrop-blur-2xl border border-[#E5A855]/35 p-5 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient pink/gold glow on right */}
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#E14D77]/25 filter blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-[#E5A855]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                GenAI Magic for Your Event
              </h3>
            </div>

            <div className="grid grid-cols-12 gap-2 items-center my-auto py-2">
              {/* 3 Features List (8 cols) */}
              <div className="col-span-8 space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Personalized Ideas</h4>
                    <p className="text-[11px] text-white/60">Themes, decor, food & more</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Smart Recommendations</h4>
                    <p className="text-[11px] text-white/60">Vendors, venues, and packages</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#E5A855]/30 flex items-center justify-center text-[#E5A855] flex-shrink-0">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Auto Planning</h4>
                    <p className="text-[11px] text-white/60">Get a full plan in seconds</p>
                  </div>
                </div>
              </div>

              {/* 3D Glowing AI Chip Emblem (4 cols) */}
              <div className="col-span-4 flex items-center justify-center">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E14D77]/40 via-[#4A182B] to-[#E5A855]/40 border-2 border-[#E14D77]/70 shadow-[0_0_30px_rgba(225,77,119,0.6)] flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform">
                  <div className="absolute -inset-1 rounded-2xl border border-[#E5A855]/40 animate-pulse pointer-events-none" />
                  <span className="font-serif text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5C27E] to-[#E14D77]">
                    AI
                  </span>
                  <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-[#E5A855]" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =======================================================================
            4. BOTTOM ROW: How It Works (3 Cols) + Live Dashboard Tablet (5 Cols) + Add More Checklist (4 Cols)
            ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-4">
          
          {/* Left 3 Columns: How It Works (4 Simple Steps) */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-5 p-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-white">How It Works</h2>
              <p className="text-xs text-white/65 mt-0.5">Plan your event in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-4 gap-1.5 items-start text-center">
              {[
                { icon: PenTool, step: '1. Tell Us', sub: 'About Your Event' },
                { icon: Sparkles, step: '2. Get an', sub: 'AI Plan' },
                { icon: Sliders, step: '3. Customize', sub: '& Manage' },
                { icon: PartyPopper, step: '4. Celebrate', sub: 'Stress-Free' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex flex-col items-center relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#2A1420] to-[#170A12] border border-[#E5A855]/40 shadow-[0_0_20px_rgba(229,168,85,0.2)] flex items-center justify-center text-[#E5A855] mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">{s.step}</div>
                    <div className="text-[10px] text-white/60 leading-tight mt-0.5">{s.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onStartPlanning('wedding')}
                className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#E5A855]/30 text-xs font-semibold text-[#E5A855] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Try 60-Second AI Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center 5 Columns: Interactive Dashboard Tablet Mockup */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#130910] border-2 border-[#E5A855]/45 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              
              {/* Tablet Inner Grid */}
              <div className="grid grid-cols-12 min-h-[300px]">
                
                {/* Left Sidebar inside Tablet (3 cols) */}
                <div className="col-span-3 bg-[#0E060B] border-r border-white/10 p-2.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Mini Logo */}
                    <div className="flex items-center gap-1.5 px-1 py-1 border-b border-white/10 pb-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
                      <span className="font-serif text-xs font-bold text-white">
                        Eventara <span className="text-[#E5A855]">AI</span>
                      </span>
                    </div>

                    {/* Sidebar Nav Items */}
                    <div className="space-y-0.5">
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
                          onClick={() => setActiveTabletTab(tab)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5 ${
                            activeTabletTab === tab
                              ? 'bg-gradient-to-r from-[#651E38] to-[#3B1323] text-white font-semibold shadow-sm'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5A855]" />
                          <span className="truncate">{tab}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onExploreDemo()}
                    className="w-full py-1 rounded bg-[#E5A855]/15 text-[#E5A855] text-[9px] font-semibold text-center hover:bg-[#E5A855]/25"
                  >
                    Full View ↗
                  </button>
                </div>

                {/* Main Content inside Tablet (9 cols) */}
                <div className="col-span-9 p-3.5 space-y-3 bg-[#160B12]">
                  
                  {/* Top Bar: My Wedding Plan + In Progress + Share/Export */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-sm font-bold text-white">
                        My Wedding Plan 💍
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#E14D77]/20 border border-[#E14D77]/40 text-[9px] font-semibold text-[#F5C27E]">
                        In Progress
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onExploreDemo()}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-white/80 flex items-center gap-1"
                      >
                        <Share2 className="w-2.5 h-2.5" />
                        <span>Share</span>
                      </button>
                      <button
                        onClick={() => onExploreDemo()}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] text-white/80 flex items-center gap-1"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>

                  {/* 4 Mini Metric Cards */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 rounded-xl bg-[#21111B] border border-white/10">
                      <div className="text-[11px] font-bold text-white">₹ 12,50,000</div>
                      <div className="text-[9px] text-white/55">Total Budget</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#21111B] border border-white/10">
                      <div className="text-[11px] font-bold text-[#F5C27E]">₹ 8,90,000</div>
                      <div className="text-[9px] text-white/55">Spent</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#21111B] border border-white/10">
                      <div className="text-[11px] font-bold text-emerald-400">₹ 3,60,000</div>
                      <div className="text-[9px] text-white/55">Remaining</div>
                    </div>
                    <div className="p-2 rounded-xl bg-[#21111B] border border-[#E5A855]/30 flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full border-2 border-[#E5A855] flex items-center justify-center text-[8px] font-bold text-[#E5A855]">
                        71%
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-white">71%</div>
                        <div className="text-[8px] text-white/55 leading-none">Complete</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Split: Event Timeline Gantt + Task Checklist */}
                  <div className="grid grid-cols-12 gap-2.5 pt-1">
                    
                    {/* Event Timeline (7 cols) */}
                    <div className="col-span-7 p-2.5 rounded-xl bg-[#1D0E17] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white">Event Timeline</span>
                        <div className="flex gap-2 text-[8px] text-white/45">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-[9px]">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white/75 truncate w-24">Venue Booking</span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="w-1/2 h-full rounded-full bg-gradient-to-r from-[#E5A855] to-[#D97736]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white/75 truncate w-24">Vendor Finalization</span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="w-2/3 ml-4 h-full rounded-full bg-gradient-to-r from-[#E14D77] to-[#E5A855]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white/75 truncate w-24">Invitations</span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="w-1/2 ml-8 h-full rounded-full bg-[#E14D77]" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white/75 truncate w-24">Decor & Setup</span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="w-1/3 ml-12 h-full rounded-full bg-[#E5A855]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Task Checklist (5 cols) */}
                    <div className="col-span-5 p-2.5 rounded-xl bg-[#1D0E17] border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white">Task Checklist</span>
                        <span className="text-[8px] text-[#E5A855]">12 / 17</span>
                      </div>

                      <div className="space-y-1">
                        {checklistItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => toggleChecklist(item.id)}
                            className="w-full flex items-center justify-between text-[9px] text-white/85 hover:text-white py-0.5"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <span
                                className={`w-3 h-3 rounded flex items-center justify-center ${
                                  item.done
                                    ? 'bg-[#E5A855] text-black'
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
          </div>

          {/* Right 4 Columns: Add More to Make It Even Better Card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#1A0D16]/90 backdrop-blur-2xl border border-[#E5A855]/35 p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Crown className="w-4 h-4 text-[#E5A855]" />
              <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                Add More to Make It Even Better
              </h3>
            </div>

            <ul className="space-y-2 my-auto py-2">
              {[
                { bold: 'AI Theme & Decor Generator', sub: '(with mood boards)' },
                { bold: 'Real-time Budget Tracking & Cost Optimization', sub: '' },
                { bold: 'Smart Vendor Matching', sub: '(based on budget & location)' },
                { bold: 'Guest List & RSVP Management', sub: '' },
                { bold: 'Collaboration', sub: '(family & team planning)' },
                { bold: 'Event Templates', sub: '(customizable)' },
                { bold: 'Post-Event Gallery & Feedback', sub: '' },
                { bold: 'Sustainability Suggestions', sub: '(eco-friendly events)' },
              ].map((feat, i) => (
                <li
                  key={i}
                  onClick={() => onStartPlanning()}
                  className="flex items-center gap-2.5 text-xs cursor-pointer group"
                >
                  <span className="w-4 h-4 rounded-full bg-[#E5A855]/20 border border-[#E5A855]/50 flex items-center justify-center text-[#E5A855] flex-shrink-0 group-hover:bg-[#E5A855] group-hover:text-black transition-colors">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span className="text-white/90 group-hover:text-[#E5A855] transition-colors">
                    <strong className="font-semibold text-white">{feat.bold}</strong>{' '}
                    {feat.sub && <span className="text-white/60 text-[11px]">{feat.sub}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* =========================================================================
          FULL INTERACTIVE CALENDAR WITH UPCOMING EVENTS & CUSTOM EVENT SCHEDULER
          ========================================================================= */}
      <FullInteractiveCalendar onPlanEvent={onPlanEventFromCalendar} />
    </div>
  );
};
