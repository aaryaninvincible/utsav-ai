import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Calendar, 
  Sparkles, 
  PieChart, 
  Briefcase, 
  Palette, 
  MessageCircle, 
  Settings, 
  Bell, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  Heart, 
  Star, 
  MapPin, 
  Search, 
  Send,
  PartyPopper,
  Plus,
  X,
  Brain,
  Wallet,
  Clock,
  Store,
  ClipboardList,
  Lightbulb,
  Mail,
  Users,
  CheckCircle2,
  AlertCircle,
  Play,
  Share2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EventCategory, EventData } from '../types';
import { MarigoldPetals } from '../components/MarigoldPetals';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface MasterDesignPageProps {
  onPlanEvent: (category?: EventCategory) => void;
  onOpenEvent: (eventId: string) => void;
  onOpenBudget: () => void;
  onOpenTimeline: () => void;
  onOpenInspiration: () => void;
  onAskAI: (initialPrompt?: string) => void;
  events: EventData[];
}

export const MasterDesignPage: React.FC<MasterDesignPageProps> = ({
  onPlanEvent,
  onOpenEvent,
  onOpenBudget,
  onOpenTimeline,
  onOpenInspiration,
  onAskAI,
  events
}) => {
  const [activeNav, setActiveNav] = useState('home');
  const [quickPrompt, setQuickPrompt] = useState('');
  const [selectedBudgetEvent, setSelectedBudgetEvent] = useState("Ananya's Wedding");
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    vendor: true,
    rec: true,
    mehndi: true,
    favours: false,
    music: true,
  });

  const [inquiredVendor, setInquiredVendor] = useState<string | null>(null);

  // GSAP Animation Element Refs
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLImageElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroBtnRef = useRef<HTMLButtonElement>(null);
  const heroScriptRef = useRef<HTMLDivElement>(null);

  const sidebarMandalaRef = useRef<HTMLImageElement>(null);
  const mainMandalaRef = useRef<HTMLImageElement>(null);
  const mandalaSvgRef = useRef<SVGSVGElement>(null);
  const diyaGlowRef = useRef<HTMLDivElement>(null);

  const categorySectionRef = useRef<HTMLDivElement>(null);
  const featureSectionRef = useRef<HTMLDivElement>(null);
  const componentSectionRef = useRef<HTMLDivElement>(null);
  const inspirationSectionRef = useRef<HTMLDivElement>(null);
  const statusSectionRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP Animations on Mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. HERO STAGGERED TEXT REVEAL
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (heroBadgeRef.current) {
        heroTl.from(heroBadgeRef.current, { y: 20, opacity: 0, duration: 0.6 });
      }
      if (heroTitleRef.current) {
        heroTl.from(heroTitleRef.current, { y: 28, opacity: 0, duration: 0.8 }, '-=0.4');
      }
      if (heroSubtitleRef.current) {
        heroTl.from(heroSubtitleRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');
      }
      if (heroBtnRef.current) {
        heroTl.from(heroBtnRef.current, { scale: 0.9, opacity: 0, duration: 0.6 }, '-=0.3');
      }
      if (heroScriptRef.current) {
        heroTl.from(heroScriptRef.current, { opacity: 0, rotation: -3, duration: 0.8 }, '-=0.4');
      }

      // 2. HERO PARALLAX BACKGROUND
      if (heroBgRef.current && heroCardRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          }
        });
      }

      // 3. MANDALA SLOW ROTATION (Sidebar & Main Medallions)
      if (sidebarMandalaRef.current) {
        gsap.to(sidebarMandalaRef.current, {
          rotation: 360,
          duration: 90,
          repeat: -1,
          ease: 'linear'
        });
      }
      if (mainMandalaRef.current) {
        gsap.to(mainMandalaRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: 'linear'
        });
      }

      // 4. MANDALA SVG STROKE REVEAL
      if (mandalaSvgRef.current) {
        const paths = mandalaSvgRef.current.querySelectorAll('circle, path');
        paths.forEach((path) => {
          gsap.fromTo(path, 
            { strokeDasharray: 600, strokeDashoffset: 600, opacity: 0.2 },
            {
              strokeDashoffset: 0,
              opacity: 1,
              duration: 2.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: mandalaSvgRef.current,
                start: 'top 85%',
              }
            }
          );
        });
      }

      // 5. DIYA & GOLD GLOW PULSATION WITH OPACITY CHANGES
      if (diyaGlowRef.current) {
        gsap.to(diyaGlowRef.current, {
          opacity: 0.95,
          scale: 1.18,
          duration: 2.0,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Sparkles around Diya with subtle opacity and drift changes
      const sparkles = document.querySelectorAll('.diya-sparkle');
      if (sparkles.length > 0) {
        sparkles.forEach((sparkle, idx) => {
          gsap.to(sparkle, {
            opacity: 0.9,
            scale: 1.3,
            y: '-=6',
            duration: 1.5 + (idx * 0.4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: idx * 0.2
          });
        });
      }

      // 6. CATEGORY BANNERS SCROLL ENTRANCE
      if (categorySectionRef.current) {
        const banners = categorySectionRef.current.querySelectorAll('.cat-banner-item');
        gsap.fromTo(banners, 
          { y: 25, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: categorySectionRef.current,
              start: 'top 95%',
            }
          }
        );
      }

      // 7. FEATURE ICONS ENTRANCE
      if (featureSectionRef.current) {
        const icons = featureSectionRef.current.querySelectorAll('.feature-icon-item');
        gsap.fromTo(icons, 
          { scale: 0.9, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: featureSectionRef.current,
              start: 'top 95%',
            }
          }
        );
      }

      // 8. CARDS & COMPONENTS SCROLL REVEAL (Subtle entrance & hover lift)
      if (componentSectionRef.current) {
        const cards = componentSectionRef.current.querySelectorAll('.component-card-item');
        gsap.fromTo(cards, 
          { y: 25, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: componentSectionRef.current,
              start: 'top 95%',
            }
          }
        );
      }

      // 9. INSPIRATION & TRADITIONS SECTION SCROLL REVEAL
      if (inspirationSectionRef.current) {
        const inspCards = inspirationSectionRef.current.querySelectorAll('.inspiration-card-item');
        gsap.fromTo(inspCards, 
          { y: 25, opacity: 0.2 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: inspirationSectionRef.current,
              start: 'top 95%',
            }
          }
        );
      }

      // Refresh ScrollTrigger after DOM setup
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskAISubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (quickPrompt.trim()) {
      onAskAI(quickPrompt.trim());
      setQuickPrompt('');
    } else {
      onAskAI();
    }
  };

  const handleInquire = (vendorName: string, category: string) => {
    setInquiredVendor(`${vendorName} (${category})`);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#2C1810] flex overflow-x-hidden relative selection:bg-[#4A121A] selection:text-white">
      
      {/* GSAP FLOATING MARIGOLD & ROSE PETALS (Respects prefers-reduced-motion) */}
      <MarigoldPetals count={16} />

      {/* ========================================================
          1. LEFT MAROON SIDEBAR
      ======================================================== */}
      <aside className="w-60 shrink-0 min-h-screen bg-[#350B12] text-[#E8D5C4] flex flex-col justify-between p-4 border-r border-[#4A141E] select-none sticky top-0 h-screen overflow-y-auto z-20">
        <div>
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 px-2 py-3 mb-4 border-b border-[#4F1924]/80 pb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#24060B] border border-[#F5BE6B]/50 flex items-center justify-center shrink-0 shadow-md p-0.5">
              <img 
                ref={sidebarMandalaRef}
                src="/assets/mandala.jpg" 
                alt="Gold Lotus Mandala" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="font-royal text-xl font-bold tracking-wider text-[#FBF1E6] leading-none">Utsav AI</h1>
              <p className="text-[10px] text-[#D8B092] font-medium tracking-tight mt-1">Your Celebration Partner</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 text-xs font-medium">
            {[
              { id: 'home', label: 'Home', icon: Home, action: () => setActiveNav('home') },
              { id: 'my-events', label: 'My Events', icon: Calendar, action: () => onOpenEvent('sample-wedding-1') },
              { id: 'plan', label: 'Plan with AI', icon: Sparkles, action: () => onPlanEvent() },
              { id: 'budget', label: 'Budget', icon: PieChart, action: () => onOpenBudget() },
              { id: 'vendors', label: 'Vendors', icon: Briefcase, action: () => onOpenEvent('sample-wedding-1') },
              { id: 'inspiration', label: 'Inspiration', icon: Palette, action: () => onOpenInspiration() },
              { id: 'community', label: 'Community', icon: MessageCircle, action: () => onAskAI("Trending Sangeet concepts in the Utsav community") },
              { id: 'settings', label: 'Settings', icon: Settings, action: () => onAskAI("Configure event currency and vendor preferences") },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#551922] text-[#FFF6ED] font-semibold shadow-inner border border-[#6F232F]'
                      : 'text-[#D0B5A1] hover:text-white hover:bg-[#43121B]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5BE6B]' : 'text-[#B08970]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Animated Gold Lotus Mandala & Ceremonial Elephant */}
        <div className="pt-3 border-t border-[#4A141E]/80 text-center relative">
          <div className="p-2 rounded-xl bg-[#28070D]/90 border border-[#541C25] overflow-hidden relative">
            
            {/* GSAP Rotating Mandala in Background */}
            <div className="relative w-24 h-24 mx-auto mb-2 overflow-hidden flex items-center justify-center">
              <img 
                ref={sidebarMandalaRef}
                src="/assets/mandala.jpg" 
                alt="Gold Lotus Mandala" 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            <img 
              src="/assets/elephant.jpg" 
              alt="Royal Decorated Elephant" 
              className="w-full h-24 object-cover rounded-lg shadow-inner"
            />
            <div className="mt-2 text-[10px] text-[#E8CDB5] font-serif tracking-wider font-semibold">
              Shubh Aarambh 🪔
            </div>
            <div className="text-[9px] text-[#A67F65]">Every ritual celebrated with grace</div>
          </div>
        </div>
      </aside>

      {/* ========================================================
          2. CENTER MAIN DASHBOARD CANVAS
      ======================================================== */}
      <main className="flex-1 p-5 lg:p-7 space-y-7 max-w-[1040px]">
        
        {/* HERO BANNER SECTION (GSAP Parallax & Staggered Reveal) */}
        <div 
          ref={heroCardRef}
          className="relative rounded-2xl overflow-hidden border border-[#E5D7C5] shadow-lg min-h-[310px] flex items-center"
        >
          {/* Palace Jharokha Sunset Background with GSAP Parallax */}
          <img 
            ref={heroBgRef}
            src="/assets/hero_palace.jpg" 
            alt="Royal Rajasthani Palace Jharokha" 
            className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFBF7]/95 via-[#FFFBF7]/85 to-transparent/30" />

          {/* Hero Content (Staggered Entrance) */}
          <div className="relative z-10 p-7 sm:p-10 max-w-xl space-y-3.5">
            <div 
              ref={heroBadgeRef}
              className="inline-block text-[11px] font-semibold text-[#8B481D] tracking-widest uppercase"
            >
              Plan &bull; Celebrate &bull; Make Memories
            </div>

            <h2 
              ref={heroTitleRef}
              className="font-royal text-2xl sm:text-4xl font-extrabold text-[#2F1117] leading-tight"
            >
              Your Special<br />
              Moments, Beautifully<br />
              Planned with AI
            </h2>

            <p 
              ref={heroSubtitleRef}
              className="text-xs sm:text-[13px] text-[#5C3A2E] leading-relaxed max-w-md"
            >
              Weddings, Birthdays, Community Events &mdash; All in one place.
            </p>

            {/* Gradient Primary Button with Hover Lift */}
            <button
              ref={heroBtnRef}
              onClick={() => onPlanEvent()}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-md bg-gradient-to-r from-[#C86D1A] via-[#D97706] to-[#E59838] hover:scale-[1.03] active:scale-[0.98] hover:shadow-lg transition-transform duration-200"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Calligraphic Script Banner on Top Right */}
          <div 
            ref={heroScriptRef}
            className="hidden sm:block absolute right-8 top-10 text-right select-none"
          >
            <span className="font-script text-3xl sm:text-4xl text-[#B84E1C] drop-shadow-sm">
              Har Utsav<br />
              Khaas Hai ✨
            </span>
          </div>
        </div>

        {/* ========================================================
            CATEGORY BANNERS (GSAP ScrollTrigger Entrance)
        ======================================================== */}
        <div ref={categorySectionRef} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-royal text-base font-bold text-[#2E1217] flex items-center space-x-2">
              <span className="text-[#C05621]">✦</span>
              <span>Category Banners</span>
            </h3>
            <span className="text-[11px] text-[#8C624E]">Choose your celebration category</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wedding Card with Hover Lift */}
            <div className="cat-banner-item relative rounded-2xl overflow-hidden border border-[#ECDCCB] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group h-44 flex flex-col justify-end p-4">
              <img 
                src="/assets/cat_wedding.jpg" 
                alt="Wedding Banner" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A060C]/90 via-[#2A060C]/40 to-transparent" />
              
              <div className="relative z-10 text-white space-y-1">
                <div className="font-royal text-base font-bold text-[#FDE8D4]">Wedding</div>
                <div className="text-[11px] text-[#ECD5C0]">Plan your dream wedding with AI</div>
                <button 
                  onClick={() => onPlanEvent('wedding')}
                  className="mt-1 px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#E58B24] hover:bg-[#F59E0B] text-slate-950 transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Plan Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Birthday Card with Hover Lift */}
            <div className="cat-banner-item relative rounded-2xl overflow-hidden border border-[#ECDCCB] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group h-44 flex flex-col justify-end p-4">
              <img 
                src="/assets/cat_birthday.jpg" 
                alt="Birthday Banner" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A060C]/90 via-[#2A060C]/40 to-transparent" />
              
              <div className="relative z-10 text-white space-y-1">
                <div className="font-royal text-base font-bold text-[#FDE8D4]">Birthday</div>
                <div className="text-[11px] text-[#ECD5C0]">Make every birthday special</div>
                <button 
                  onClick={() => onPlanEvent('birthday')}
                  className="mt-1 px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#E58B24] hover:bg-[#F59E0B] text-slate-950 transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Plan Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Community Event Card with Hover Lift */}
            <div className="cat-banner-item relative rounded-2xl overflow-hidden border border-[#ECDCCB] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group h-44 flex flex-col justify-end p-4">
              <img 
                src="/assets/cat_community.jpg" 
                alt="Community Event Banner" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A060C]/90 via-[#2A060C]/40 to-transparent" />
              
              <div className="relative z-10 text-white space-y-1">
                <div className="font-royal text-base font-bold text-[#FDE8D4]">Community Event</div>
                <div className="text-[11px] text-[#ECD5C0]">Organize memorable events together</div>
                <button 
                  onClick={() => onPlanEvent('fest')}
                  className="mt-1 px-4 py-1.5 rounded-full text-[11px] font-bold bg-[#E58B24] hover:bg-[#F59E0B] text-slate-950 transition flex items-center space-x-1.5 shadow-sm"
                >
                  <span>Plan Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FEATURE ICONS ROW (GSAP Staggered Entrance)
        ======================================================== */}
        <div ref={featureSectionRef} className="utsav-card p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-royal text-xs font-bold text-[#351219] uppercase tracking-wider flex items-center space-x-1.5">
              <span>✦</span>
              <span>Feature Icons (Quick Planning Tools)</span>
            </h4>
            <span className="text-[11px] text-[#8C624E]">Instant access tools</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5 text-center">
            {[
              { id: 'ai', label: 'AI Planning', icon: Brain, action: () => onPlanEvent() },
              { id: 'budget', label: 'Budget', icon: Wallet, action: () => onOpenBudget() },
              { id: 'timeline', label: 'Timeline', icon: Clock, action: () => onOpenTimeline() },
              { id: 'vendors', label: 'Vendors', icon: Store, action: () => onOpenEvent('sample-wedding-1') },
              { id: 'checklist', label: 'Checklist', icon: ClipboardList, action: () => onOpenTimeline() },
              { id: 'ideas', label: 'Ideas', icon: Lightbulb, action: () => onOpenInspiration() },
              { id: 'invitations', label: 'Invitations', icon: Mail, action: () => onOpenEvent('sample-wedding-1') },
              { id: 'guests', label: 'Guest List', icon: Users, action: () => onAskAI("How should I categorize our Indian wedding guest list into VIP, close family, and friends?") },
            ].map((tool) => {
              const ToolIcon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={tool.action}
                  className="feature-icon-item p-2.5 rounded-xl bg-[#FFFDF9] border border-[#ECDCCB] hover:border-[#D6A97A] hover:bg-[#FAF3EA] hover:-translate-y-1 hover:shadow-md transition-all duration-200 flex flex-col items-center group shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0E4] text-[#8B481D] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <ToolIcon className="w-4 h-4 text-[#8B481D]" />
                  </div>
                  <span className="text-[10px] font-semibold text-[#48281D] truncate w-full">{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            MIDDLE ROW (Cards & Components with GSAP Scroll Trigger)
        ======================================================== */}
        <div ref={componentSectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* COMPONENT 1: Royal Orchid Banquets Vendor Card with Hover Lift */}
          <div className="component-card-item utsav-card p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="relative rounded-xl overflow-hidden mb-3 border border-[#EADECF]">
                <img 
                  src="/assets/royal_orchid_banquet.jpg" 
                  alt="Royal Orchid Banquets" 
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-500"
                />
                <button 
                  onClick={(e) => toggleFavorite('vendor', e)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-red-500 shadow-sm"
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites.vendor ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="font-royal text-sm font-bold text-[#2A0E14]">Royal Orchid Banquets</h4>
                <div className="text-[11px] text-[#7A5B4E] flex items-center space-x-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
                  <span className="font-semibold text-[#3E1A22]">4.8</span>
                  <span>(120 reviews) &bull; Bhopal, MP</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFE3D5] flex items-center justify-between mt-3">
              <div>
                <div className="text-[10px] text-[#8C624E]">Starting from</div>
                <div className="text-sm font-bold text-[#2A0E14] font-mono">₹1,20,000</div>
              </div>

              <button
                onClick={() => handleInquire('Royal Orchid Banquets', 'Venue')}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#B45309] to-[#D97706] hover:opacity-95 shadow-sm transition"
              >
                View Details &rarr;
              </button>
            </div>
          </div>

          {/* COMPONENT 2: Budget Overview Card */}
          <div className="component-card-item utsav-card p-4 sm:p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-royal text-xs font-bold text-[#351219]">Budget Overview</h4>
                <span className="text-[10px] text-[#8C624E]">Total Budget</span>
              </div>

              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F0E4D5]">
                <div>
                  <div className="text-xl font-extrabold text-[#2D1016]">₹12,50,000</div>
                  <div className="text-[10px] text-[#7A5B4F]">of ₹20,00,000</div>
                </div>

                {/* 62% Spent Progress Donut */}
                <div className="relative w-13 h-13 flex items-center justify-center">
                  <svg className="w-13 h-13 transform -rotate-90">
                    <circle cx="26" cy="26" r="20" stroke="#E6D3C1" strokeWidth="4" fill="none" />
                    <circle 
                      cx="26" 
                      cy="26" 
                      r="20" 
                      stroke="#E58B24" 
                      strokeWidth="4" 
                      strokeDasharray={125} 
                      strokeDashoffset={125 * (1 - 0.62)} 
                      strokeLinecap="round" 
                      fill="none" 
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] font-bold text-[#36131A]">62%</span>
                    <span className="text-[7px] text-[#8C624E] -mt-0.5">Spent</span>
                  </div>
                </div>
              </div>

              {/* Breakdown list */}
              <div className="space-y-1.5 text-[11px]">
                {[
                  { dot: '#F59E0B', label: 'Venue', pct: '35%', amount: '₹4,37,500' },
                  { dot: '#FBBF24', label: 'Catering', pct: '25%', amount: '₹3,12,500' },
                  { dot: '#10B981', label: 'Decoration', pct: '15%', amount: '₹1,87,500' },
                  { dot: '#3B82F6', label: 'Attire', pct: '10%', amount: '₹1,25,000' },
                  { dot: '#8B5CF6', label: 'Miscellaneous', pct: '15%', amount: '₹1,87,500' },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[#4D2E22]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.dot }} />
                      <span className="font-medium text-[11px]">{row.label}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] text-[#795B4E]">
                      <span className="font-semibold">{row.pct}</span>
                      <span className="font-mono text-[#2E1217]">{row.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenBudget}
              className="mt-3 text-[11px] font-semibold text-[#8B481D] hover:underline text-center w-full"
            >
              Open Full Budget Planner &rarr;
            </button>
          </div>

          {/* COMPONENT 3: AI Recommendation Floral Theme with Marigolds */}
          <div className="component-card-item utsav-card p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="flex items-center space-x-1 text-[#8B481D] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Recommendation</span>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-2.5 border border-[#EADECF]">
                <img 
                  src="/assets/floral_theme_marigold.jpg" 
                  alt="Floral Theme with Marigolds" 
                  className="w-full h-28 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h4 className="font-royal text-xs font-bold text-[#2A0E14]">Floral Theme with Marigolds</h4>
              <p className="text-[10px] text-[#7C5D50] leading-relaxed mt-1">
                A traditional yet elegant theme perfect for your budget and season.
              </p>
            </div>

            <button
              onClick={() => onPlanEvent('wedding')}
              className="mt-3 w-full py-2 rounded-full text-xs font-bold text-white bg-[#4A121A] hover:bg-[#601923] transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>Use This Idea</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ========================================================
            INSPIRATION & TRADITIONS ROW (Diya Soft Glow & Sacred Mandala)
        ======================================================== */}
        <div ref={inspirationSectionRef} className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#2A0E14] flex items-center space-x-2">
                <span>✦</span>
                <span>Auspicious Traditions & Decor Showcase</span>
              </h3>
              <p className="text-xs text-[#7A5B4E] mt-0.5">
                Sacred ceremonies, glowing diyas, and authentic cultural heritage for your celebration
              </p>
            </div>
            <button
              onClick={onOpenInspiration}
              className="text-xs font-semibold text-[#8B481D] hover:underline flex items-center space-x-1"
            >
              <span>Explore All Ideas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Diya Lighting Ceremony with Soft Glow & Twinkling Gold Particles */}
            <div className="inspiration-card-item utsav-card p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 border border-[#EADECF]">
                  <img 
                    src="/assets/lady_diya.jpg" 
                    alt="Diya Lighting Ceremony" 
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Pulsating Diya Soft Gold Aura Glow */}
                  <div 
                    ref={diyaGlowRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 65% 55%, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.25) 30%, transparent 65%)',
                      mixBlendMode: 'screen'
                    }}
                  />

                  {/* Gold Twinkling Particles around Diya flame */}
                  <div className="diya-sparkle absolute top-16 right-16 w-2 h-2 rounded-full bg-amber-200 pointer-events-none shadow-[0_0_8px_#FBBF24]" />
                  <div className="diya-sparkle absolute top-20 right-24 w-1.5 h-1.5 rounded-full bg-amber-300 pointer-events-none shadow-[0_0_6px_#F59E0B]" />
                  <div className="diya-sparkle absolute top-14 right-10 w-2.5 h-2.5 rounded-full bg-yellow-100 pointer-events-none shadow-[0_0_10px_#FCD34D]" />

                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#380C14]/85 text-[#FDE68A] backdrop-blur-xs border border-amber-500/30">
                    🪔 Shubh Deepam
                  </span>
                </div>

                <h4 className="font-royal text-sm font-bold text-[#2A0E14]">Auspicious Diya Ritual</h4>
                <p className="text-[11px] text-[#7C5D50] leading-relaxed mt-1">
                  Gentle brass lamp lighting to evoke prosperity, warmth, and positive spiritual energy.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE3D5] flex items-center justify-between mt-3 text-xs">
                <span className="text-[10px] font-semibold text-[#8B481D]">Evening Aarti & Lighting</span>
                <button
                  onClick={() => onAskAI("How to organize an authentic traditional Indian Diya lighting welcome ceremony?")}
                  className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF0E4] hover:bg-[#F3E2CF] text-[#8B481D] transition"
                >
                  Plan Ritual &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: Sacred Lotus Mandala with SVG Stroke Reveal & Rotation */}
            <div className="inspiration-card-item utsav-card p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 border border-[#EADECF] bg-gradient-to-br from-[#380C14] to-[#25060C] h-36 flex items-center justify-center">
                  
                  {/* SVG Stroke Reveal Mandala Background */}
                  <svg 
                    ref={mandalaSvgRef}
                    className="absolute inset-0 w-full h-full p-2 opacity-50 pointer-events-none" 
                    viewBox="0 0 200 200"
                  >
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#F5BE6B" strokeWidth="1.5" strokeDasharray="6 4" />
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#E59838" strokeWidth="1.2" />
                    <circle cx="100" cy="100" r="50" fill="none" stroke="#FBBF24" strokeWidth="1" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const x1 = 100 + 30 * Math.cos(angle);
                      const y1 = 100 + 30 * Math.sin(angle);
                      const x2 = 100 + 70 * Math.cos(angle);
                      const y2 = 100 + 70 * Math.sin(angle);
                      return (
                        <path key={i} d={`M${x1} ${y1} Q${100 + 50 * Math.cos(angle + 0.2)} ${100 + 50 * Math.sin(angle + 0.2)} ${x2} ${y2}`} fill="none" stroke="#F5BE6B" strokeWidth="1" />
                      );
                    })}
                  </svg>

                  {/* Rotating Gold Lotus Mandala Center */}
                  <img 
                    ref={mainMandalaRef}
                    src="/assets/mandala.jpg" 
                    alt="Sacred Lotus Mandala" 
                    className="w-24 h-24 object-contain filter drop-shadow-xl z-10"
                  />

                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#380C14]/85 text-[#FDE68A] backdrop-blur-xs border border-amber-500/30 z-20">
                    ✨ Sacred Mandala
                  </span>
                </div>

                <h4 className="font-royal text-sm font-bold text-[#2A0E14]">Sacred Lotus Mandala</h4>
                <p className="text-[11px] text-[#7C5D50] leading-relaxed mt-1">
                  Intricate geometrical sacred art invoking balance, spiritual sanctity, and divine blessings.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE3D5] flex items-center justify-between mt-3 text-xs">
                <span className="text-[10px] font-semibold text-[#8B481D]">Rangoli & Decor Motifs</span>
                <button
                  onClick={() => onAskAI("Suggest floor rangoli and backdrop mandala ideas for wedding reception")}
                  className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF0E4] hover:bg-[#F3E2CF] text-[#8B481D] transition"
                >
                  View Motifs &rarr;
                </button>
              </div>
            </div>

            {/* Card 3: Mehndi & Royal Sangeet Lounge */}
            <div className="inspiration-card-item utsav-card p-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 border border-[#EADECF]">
                  <img 
                    src="/assets/mehndi_decor.jpg" 
                    alt="Royal Mehndi & Sangeet Lounge" 
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#380C14]/85 text-[#FDE68A] backdrop-blur-xs border border-amber-500/30">
                    🌿 Mehndi Vibes
                  </span>
                </div>

                <h4 className="font-royal text-sm font-bold text-[#2A0E14]">Sangeet & Henna Decor</h4>
                <p className="text-[11px] text-[#7C5D50] leading-relaxed mt-1">
                  Lush marigold festoons, colorful cushions, and jhula setups tailored for joyful laughter.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EFE3D5] flex items-center justify-between mt-3 text-xs">
                <span className="text-[10px] font-semibold text-[#8B481D]">Garlands & Textiles</span>
                <button
                  onClick={() => onPlanEvent('wedding')}
                  className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF0E4] hover:bg-[#F3E2CF] text-[#8B481D] transition"
                >
                  Apply Theme &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            STATUS BADGES & UI ELEMENTS ROW
        ======================================================== */}
        <div ref={statusSectionRef} className="utsav-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-[#8C624E] mr-1">Status Badges:</span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 font-semibold text-[11px]">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Active</span>
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-800 font-semibold text-[11px]">
                <Check className="w-3 h-3 text-green-600" />
                <span>Completed</span>
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 font-semibold text-[11px]">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Pending</span>
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-800 font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3 text-red-600" />
                <span>Overdue</span>
              </span>
            </div>

            {/* Circular Progress & Quick Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <svg className="w-8 h-8 transform -rotate-90">
                    <circle cx="16" cy="16" r="12" stroke="#E6D3C1" strokeWidth="2.5" fill="none" />
                    <circle cx="16" cy="16" r="12" stroke="#10B981" strokeWidth="2.5" strokeDasharray={75} strokeDashoffset={75 * (1 - 0.75)} strokeLinecap="round" fill="none" />
                  </svg>
                  <span className="absolute text-[8px] font-bold text-slate-800">75%</span>
                </div>
                <span className="text-[10px] text-[#7A5B4E] font-semibold">Done</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center space-x-1.5 text-xs text-[#8B481D]">
                <span className="p-1.5 rounded-full bg-[#FAF0E4] hover:bg-[#F3E2CF] transition cursor-pointer">📸</span>
                <span className="p-1.5 rounded-full bg-[#FAF0E4] hover:bg-[#F3E2CF] transition cursor-pointer">📘</span>
                <span className="p-1.5 rounded-full bg-[#FAF0E4] hover:bg-[#F3E2CF] transition cursor-pointer">▶️</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* ========================================================
          3. RIGHT COMPANION / MOBILE PANEL
      ======================================================== */}
      <aside className="w-80 shrink-0 min-h-screen bg-[#FFFDF9] p-5 border-l border-[#EADECF] flex flex-col justify-between shadow-sm sticky top-0 h-screen overflow-y-auto z-20">
        <div className="space-y-6">
          
          {/* Header with Bell */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F0E4D5]">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-[#8B481D] flex items-center justify-center font-bold">
                🪔
              </div>
              <span className="font-royal font-bold text-base text-[#2C1016]">Utsav AI</span>
            </div>

            <div className="flex items-center space-x-2 text-[#7A5B4D]">
              <button 
                onClick={() => onAskAI()}
                className="p-1.5 rounded-full hover:bg-[#F3E7D9] transition relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1" />
              </button>
            </div>
          </div>

          {/* User Welcome */}
          <div>
            <h3 className="font-royal text-lg font-bold text-[#2A0D13]">Namaste, Priya! 👋</h3>
            <p className="text-xs text-[#7B5B4E] mt-0.5">Let's plan something beautiful today.</p>
          </div>

          {/* Search / AI Planner Input */}
          <form onSubmit={handleAskAISubmit} className="relative">
            <input 
              type="text" 
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
              placeholder="Ask your AI planner anything..."
              className="w-full pl-3.5 pr-10 py-2.5 rounded-full bg-[#FAF4EB] border border-[#E6D4C2] text-xs text-[#2A0D13] placeholder-[#957464] focus:outline-none focus:border-[#8B481D]"
            />
            <button
              type="submit"
              className="w-7 h-7 rounded-full bg-[#4A121A] text-white flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 hover:bg-[#601923] transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Category Icons */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { id: 'wedding', label: 'Wedding', icon: '💍' },
              { id: 'birthday', label: 'Birthday', icon: '🎂' },
              { id: 'fest', label: 'Community', icon: '🪔' },
              { id: 'family', label: 'Other', icon: '🎁' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onPlanEvent(cat.id as EventCategory)}
                className="p-2 rounded-xl bg-[#FAF3EA] border border-[#ECDCCB] hover:border-[#D29E6F] transition flex flex-col items-center hover:-translate-y-0.5"
              >
                <span className="text-lg mb-0.5">{cat.icon}</span>
                <span className="text-[10px] font-semibold text-[#48281D]">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Recent Events List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-royal text-xs font-bold text-[#2E1217]">Recent Events</h4>
              <button 
                onClick={() => onOpenEvent('sample-wedding-1')}
                className="text-[11px] text-[#8B481D] font-medium hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'sample-wedding-1',
                  name: "Ananya's Wedding",
                  date: '12 Feb 2026',
                  daysLeft: '120 days left',
                  progress: 65,
                  img: '/assets/vector_couple.jpg'
                },
                {
                  id: 'sample-birthday-1',
                  name: "Aarav's Birthday",
                  date: '5 Mar 2026',
                  daysLeft: '45 days left',
                  progress: 40,
                  img: '/assets/cat_birthday.jpg'
                },
                {
                  id: 'sample-fest-1',
                  name: 'Community Fest',
                  date: '20 Jan 2026',
                  daysLeft: '20 days left',
                  progress: 86,
                  img: '/assets/cat_community.jpg'
                }
              ].map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onOpenEvent(ev.id)}
                  className="p-2.5 rounded-xl border border-[#ECDCCB] hover:border-[#D5A374] bg-[#FAF5EE] hover:bg-[#F7EFE4] hover:shadow-md transition-all duration-200 cursor-pointer flex items-center space-x-3 group"
                >
                  <img 
                    src={ev.img} 
                    alt={ev.name}
                    className="w-11 h-11 rounded-lg object-cover shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-[#2C1016] group-hover:text-[#8B481D] transition truncate">
                      {ev.name}
                    </div>
                    <div className="text-[10px] text-[#7C5C4F]">{ev.date} &bull; {ev.daysLeft}</div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-[#E5D2BF] rounded-full h-1 mt-1.5 overflow-hidden">
                      <div 
                        className="bg-[#D97706] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${ev.progress}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#B58D76] group-hover:translate-x-0.5 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick New Event Action */}
        <div className="pt-4 border-t border-[#F0E4D5]">
          <button
            onClick={() => onPlanEvent()}
            className="w-full py-2.5 rounded-full utsav-maroon-btn text-xs font-bold flex items-center justify-center space-x-2 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Plan New Celebration</span>
          </button>
        </div>
      </aside>

      {/* Inquiry Feedback Toast */}
      {inquiredVendor && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#380C14] text-white p-4 rounded-xl shadow-2xl border border-[#F5BE6B]/40 flex items-center space-x-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold">Inquiry Sent to {inquiredVendor}</div>
            <div className="text-[11px] text-[#D2B5A0]">Coordinator will share verified packages within 2 hours.</div>
          </div>
          <button 
            onClick={() => setInquiredVendor(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
