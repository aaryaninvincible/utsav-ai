import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import {
  Search,
  ChevronDown,
  Calendar,
  Sparkles,
  Menu,
  X,
  LogOut,
  ArrowRight,
  Gem,
  Cake,
  Briefcase,
  GraduationCap,
  Sun,
  Moon,
  Wine,
  LayoutDashboard,
  User,
  Bell,
  Wallet,
  CheckSquare,
  Users,
  FileText,
  Clock,
  Check,
} from 'lucide-react';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, eventId?: string) => void;
  onOpenAuth: () => void;
  onOpenCalendar: () => void;
  onPlanYourEvent: () => void;
  onOpenAIAssistant?: (prompt?: string) => void;
  currentUser: UserProfile | null;
  onSignOut: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export type NavItemKey =
  | 'home'
  | 'aiPlanner'
  | 'events'
  | 'tools'
  | 'vendors'
  | 'templates'
  | 'community';

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenCalendar,
  onPlanYourEvent,
  onOpenAIAssistant,
  currentUser,
  onSignOut,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [landingAnchor, setLandingAnchor] = useState<'home' | 'events' | 'community' | 'about'>('home');
  const [hoveredKey, setHoveredKey] = useState<NavItemKey | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<NavItemKey, HTMLElement | null>>({
    home: null,
    aiPlanner: null,
    events: null,
    tools: null,
    vendors: null,
    templates: null,
    community: null,
  });

  const isDark = theme === 'dark';

  // Determine which nav item is active based on currentTab & landing anchor
  const activeKey: NavItemKey = (() => {
    if (currentTab === 'services') return 'vendors';
    if (currentTab === 'inspiration') return 'templates';
    if (currentTab === 'dashboard') return 'tools';
    if (currentTab === 'create' || currentTab === 'details') return 'events';
    if (landingAnchor === 'community') return 'community';
    if (landingAnchor === 'events') return 'events';
    return 'home';
  })();

  // Reset landing anchor when leaving landing page
  useEffect(() => {
    if (currentTab !== 'landing') {
      setLandingAnchor('home');
    }
  }, [currentTab]);

  const targetKey: NavItemKey = hoveredKey ?? activeKey;

  const updatePillPosition = useCallback(() => {
    const navEl = navRef.current;
    const targetEl = itemRefs.current[targetKey];
    if (!navEl || !targetEl) return;

    const navRect = navEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    setPillStyle({
      left: Math.round(targetRect.left - navRect.left),
      width: Math.round(targetRect.width),
      opacity: 1,
    });
  }, [targetKey]);

  useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, currentTab, theme, targetKey]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      updatePillPosition();
    });
    const handleResize = () => updatePillPosition();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [updatePillPosition]);

  const scrollToSection = (sectionId: string, anchorKey: 'home' | 'events' | 'community' | 'about') => {
    setLandingAnchor(anchorKey);
    if (currentTab !== 'landing') {
      onNavigate('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getItemTextClass = (key: NavItemKey) => {
    const isHighlighted = targetKey === key;
    return isHighlighted
      ? 'text-[#FFF8F2] dark:text-[#F7EEE9] font-medium'
      : 'text-ink-2 hover:text-ink font-medium';
  };

  return (
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-3.5 px-3 sm:px-6 lg:px-8 pointer-events-none">
      {/* Centered Floating Frosted Capsule Navbar (~1480px max-width, ~62px height) */}
      <header className="max-w-[1480px] mx-auto h-[58px] sm:h-[62px] rounded-full eventara-nav-glass px-4 sm:px-5 lg:px-6 flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand — Outlined Lotus Mark + Eventara AI + AI EVENT PLANNING ASSISTANT */}
        <button
          type="button"
          onClick={() => {
            setLandingAnchor('home');
            onNavigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full pr-2 text-left flex-shrink-0 min-h-[44px]"
          aria-label="Eventara AI Event Planning Assistant Home"
        >
          {/* Outlined Gold Lotus Mark */}
          <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gold group-hover:text-saffron transition-colors duration-200">
            <svg
              viewBox="0 0 36 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-6 sm:w-8 sm:h-7"
              aria-hidden="true"
            >
              <path d="M18 3 C21 8.5, 21.5 14.5, 18 20 C14.5 14.5, 15 8.5, 18 3 Z" />
              <path d="M18 20 C13.5 16.5, 9.5 11.5, 9.5 6.5 C13.5 7.5, 16.2 11.5, 18 20 Z" />
              <path d="M18 20 C22.5 16.5, 26.5 11.5, 26.5 6.5 C22.5 7.5, 19.8 11.5, 18 20 Z" />
              <path d="M16.5 20.5 C10.5 19.5, 5.5 16, 3.5 11.5 C8.5 11.5, 13 14.5, 16.5 20.5 Z" />
              <path d="M19.5 20.5 C25.5 19.5, 30.5 16, 32.5 11.5 C27.5 11.5, 23 14.5, 19.5 20.5 Z" />
              <path d="M10 24.5 C14.5 22.8, 21.5 22.8, 26 24.5" />
              <path d="M18 24.5 L18 28" />
            </svg>
          </span>

          <div className="leading-none">
            <div className="flex items-center gap-1">
              <span className="font-display text-[22px] sm:text-[25px] font-semibold tracking-[0.01em] text-ink transition-colors duration-200">
                Eventara
              </span>
              <span className="font-display text-[22px] sm:text-[25px] font-medium text-gold">
                AI
              </span>
            </div>
            <span className="block font-sans text-[7.5px] sm:text-[8px] font-medium uppercase tracking-[0.22em] text-gold-ink mt-0.5 transition-colors duration-200">
              AI EVENT PLANNING ASSISTANT
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links with Smooth Cursor-Following Sliding Capsule */}
        <nav
          ref={navRef}
          onMouseLeave={() => {
            setHoveredKey(null);
            setEventsDropdownOpen(false);
            setToolsDropdownOpen(false);
          }}
          className="relative hidden lg:flex items-center gap-1 xl:gap-1.5 py-1"
          aria-label="Primary Navigation"
        >
          {/* Cursor-Following & Active-Tab Sliding Capsule Pill */}
          <span
            aria-hidden="true"
            style={{
              transform: `translate3d(${pillStyle.left}px, -50%, 0)`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
            className="pointer-events-none absolute top-1/2 left-0 h-[36px] rounded-full bg-gradient-to-b from-[#571B32] to-[#3B1222] dark:from-[#49232E]/95 dark:to-[#2D151D]/98 border border-gold/55 shadow-[0_4px_16px_rgba(242,166,74,0.25),0_0_12px_rgba(198,161,91,0.2),inset_0_1px_0_rgba(255,255,255,0.22)] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
          />

          {/* 1. Home */}
          <button
            ref={(el) => {
              itemRefs.current.home = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('home');
              setEventsDropdownOpen(false);
              setToolsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('home')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => {
              setLandingAnchor('home');
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative z-10 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('home')}`}
          >
            Home
          </button>

          {/* 2. AI Planner ✨ */}
          <button
            ref={(el) => {
              itemRefs.current.aiPlanner = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('aiPlanner');
              setEventsDropdownOpen(false);
              setToolsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('aiPlanner')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => {
              if (onOpenAIAssistant) {
                onOpenAIAssistant('Help me plan my event with ideas, budget, timeline, and vendor checklists.');
              }
            }}
            className={`relative z-10 flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('aiPlanner')}`}
          >
            <span>AI Planner</span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </button>

          {/* 3. Events ⌄ */}
          <div
            ref={(el) => {
              itemRefs.current.events = el;
            }}
            className="relative z-10"
            onMouseEnter={() => {
              setHoveredKey('events');
              setEventsDropdownOpen(true);
              setToolsDropdownOpen(false);
            }}
          >
            <button
              type="button"
              onFocus={() => setHoveredKey('events')}
              onBlur={() => setHoveredKey(null)}
              onClick={() => {
                setEventsDropdownOpen((prev) => !prev);
                scrollToSection('event-categories', 'events');
              }}
              aria-expanded={eventsDropdownOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('events')}`}
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-64 z-50">
                <div className="rounded-2xl p-2 bg-surface/95 dark:bg-[#1B0E14]/95 backdrop-blur-2xl border border-line shadow-2xl space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-ink">
                    Occasion Types
                  </div>
                  {[
                    { label: 'Weddings & Celebrations', icon: Gem },
                    { label: 'Birthday Parties', icon: Cake },
                    { label: 'Corporate Events & Summits', icon: Briefcase },
                    { label: 'College Cultural Fests', icon: GraduationCap },
                    { label: 'Festivals & Shubh Muhurat', icon: Sun },
                    { label: 'Social & Private Gatherings', icon: Wine },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          onPlanYourEvent();
                          setEventsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-ink hover:text-gold hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                      >
                        <span>{item.label}</span>
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </button>
                    );
                  })}

                  <div className="border-t border-line my-1 pt-1 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        onOpenCalendar();
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-gold-ink hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                    >
                      <span>Auspicious Dates Calendar</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate('dashboard');
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                    >
                      <span>My Events Workspace</span>
                      <LayoutDashboard className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Tools ⌄ */}
          <div
            ref={(el) => {
              itemRefs.current.tools = el;
            }}
            className="relative z-10"
            onMouseEnter={() => {
              setHoveredKey('tools');
              setToolsDropdownOpen(true);
              setEventsDropdownOpen(false);
            }}
          >
            <button
              type="button"
              onFocus={() => setHoveredKey('tools')}
              onBlur={() => setHoveredKey(null)}
              onClick={() => {
                setToolsDropdownOpen((prev) => !prev);
              }}
              aria-expanded={toolsDropdownOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('tools')}`}
            >
              <span>Tools</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-64 z-50">
                <div className="rounded-2xl p-2 bg-surface/95 dark:bg-[#1B0E14]/95 backdrop-blur-2xl border border-line shadow-2xl space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold-ink">
                    Planning Toolkit
                  </div>
                  {[
                    { label: 'Budget Planner & Allocator', icon: Wallet, tab: 'dashboard' },
                    { label: 'Timeline & Milestone Schedule', icon: Clock, tab: 'dashboard' },
                    { label: 'Vendor Directory & Quotations', icon: Users, tab: 'services' },
                    { label: 'Checklist & Task Manager', icon: CheckSquare, tab: 'dashboard' },
                    { label: 'Guest List & RSVP Manager', icon: Users, tab: 'dashboard' },
                  ].map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.label}
                        type="button"
                        onClick={() => {
                          onNavigate(tool.tab);
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-ink hover:text-gold hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                      >
                        <span>{tool.label}</span>
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </button>
                    );
                  })}
                  <div className="border-t border-line my-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenAIAssistant) {
                          onOpenAIAssistant('Generate custom theme concepts, mood boards, and decor palettes for my event.');
                        }
                        setToolsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-gold-ink hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                    >
                      <span>AI Ideas & Themes Generator</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. Vendors */}
          <button
            ref={(el) => {
              itemRefs.current.vendors = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('vendors');
              setEventsDropdownOpen(false);
              setToolsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('vendors')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => onNavigate('services')}
            className={`relative z-10 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('vendors')}`}
          >
            Vendors
          </button>

          {/* 6. Templates */}
          <button
            ref={(el) => {
              itemRefs.current.templates = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('templates');
              setEventsDropdownOpen(false);
              setToolsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('templates')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => onNavigate('inspiration')}
            className={`relative z-10 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('templates')}`}
          >
            Templates
          </button>

          {/* 7. Community */}
          <button
            ref={(el) => {
              itemRefs.current.community = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('community');
              setEventsDropdownOpen(false);
              setToolsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('community')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => scrollToSection('community-section', 'community')}
            className={`relative z-10 px-3.5 xl:px-4 py-1.5 rounded-full text-[13px] xl:text-[13.5px] transition-colors duration-200 ${getItemTextClass('community')}`}
          >
            Community
          </button>
        </nav>

        {/* Right: Search + Notifications Bell + User Avatar + Theme Toggle + Primary CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          
          {/* Search Icon */}
          <button
            type="button"
            onClick={onOpenCalendar}
            title="Search events & auspicious dates"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink-2 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Search Events and Dates"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Bell Icon with Red Notification Dot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen((prev) => !prev);
                setProfileDropdownOpen(false);
              }}
              title="Notifications"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink-2 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 stroke-[1.75]" />
              {/* Vibrant Notification Badge Dot */}
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E05368] ring-2 ring-surface animate-pulse" />
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full pt-2.5 w-80 sm:w-88 z-50">
                <div className="rounded-2xl p-4 bg-surface/98 dark:bg-[#1B0E14]/98 backdrop-blur-2xl border border-line shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-line pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-semibold text-ink">Notifications</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#E05368]/20 text-[#E05368]">
                        3 New
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-gold-ink hover:underline"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line/70 space-y-1">
                      <div className="flex items-center justify-between text-ink font-medium">
                        <span className="flex items-center gap-1.5 text-gold-ink">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Ideas & Themes</span>
                        </span>
                        <span className="text-[10px] text-ink-2">Just now</span>
                      </div>
                      <p className="text-ink-2 text-[11px] leading-relaxed">
                        3 bespoke palace mandap concepts created for Royal Rajputana theme.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line/70 space-y-1">
                      <div className="flex items-center justify-between text-ink font-medium">
                        <span className="flex items-center gap-1.5 text-gold-ink">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Shubh Muhurat</span>
                        </span>
                        <span className="text-[10px] text-ink-2">2h ago</span>
                      </div>
                      <p className="text-ink-2 text-[11px] leading-relaxed">
                        Auspicious dates for Nov–Dec 2026 wedding season now updated.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-2/60 border border-line/70 space-y-1">
                      <div className="flex items-center justify-between text-ink font-medium">
                        <span className="flex items-center gap-1.5 text-gold-ink">
                          <Wallet className="w-3.5 h-3.5" />
                          <span>Budget Milestone</span>
                        </span>
                        <span className="text-[10px] text-ink-2">1d ago</span>
                      </div>
                      <p className="text-ink-2 text-[11px] leading-relaxed">
                        ₹8,90,000 allocated across venue, catering, and floral decor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (currentUser) {
                  setProfileDropdownOpen((prev) => !prev);
                  setNotificationsOpen(false);
                } else {
                  onOpenAuth();
                }
              }}
              title={currentUser ? currentUser.name : 'Sign in / Profile'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold/45 p-0.5 bg-gradient-to-br from-[#571B32] to-[#2D121B] flex items-center justify-center transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="User Profile"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#3B1222] flex items-center justify-center text-[#F8D59E] font-medium text-xs">
                  {currentUser?.name ? (
                    currentUser.name.charAt(0).toUpperCase()
                  ) : (
                    /* Elegant Eventara Planner Avatar (matches reference photo) */
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      className="w-full h-full rounded-full"
                    >
                      <circle cx="16" cy="16" r="16" fill="#241017" />
                      {/* Stylized Planner Silhouette with Gold Hairline */}
                      <path
                        d="M16 6 C12 6 9.5 9 9.5 12.5 C9.5 16 12 18.5 16 18.5 C20 18.5 22.5 16 22.5 12.5 C22.5 9 20 6 16 6 Z"
                        fill="#F3C49B"
                      />
                      {/* Dark hair */}
                      <path
                        d="M9.5 12 C9.5 8 12.5 5.5 16 5.5 C19.5 5.5 22.5 8 22.5 12 C21.5 10 19 8.5 16 8.5 C13 8.5 10.5 10 9.5 12 Z"
                        fill="#12090E"
                      />
                      {/* Collar / Attire */}
                      <path
                        d="M6.5 28 C6.5 22.5 11 20.5 16 20.5 C21 20.5 25.5 22.5 25.5 28 Z"
                        fill="#571B32"
                        stroke="#C6A15B"
                        strokeWidth="0.75"
                      />
                    </svg>
                  )}
                </div>
              )}
            </button>

            {/* Profile Menu Popover */}
            {profileDropdownOpen && currentUser && (
              <div className="absolute right-0 top-full pt-2.5 w-60 z-50">
                <div className="rounded-2xl p-3 bg-surface/98 dark:bg-[#1B0E14]/98 backdrop-blur-2xl border border-line shadow-2xl space-y-2">
                  <div className="px-2 py-1.5 border-b border-line">
                    <p className="text-xs font-semibold text-ink">{currentUser.name}</p>
                    <p className="text-[10px] text-ink-2 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-ink hover:text-gold hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                  >
                    <span>My Workspace</span>
                    <LayoutDashboard className="w-3.5 h-3.5 text-gold" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium text-danger hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Accessible Light / Dark Theme Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to warm editorial light mode' : 'Switch to luxury dark mode'}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink-2 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F1C27D] transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Moon className="w-4 h-4 text-[#571B32] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          )}

          {/* Primary "Plan Your Event →" CTA */}
          <button
            type="button"
            onClick={onPlanYourEvent}
            className="btn-sheen hidden sm:inline-flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8526C] via-[#DD7A5B] to-[#F0AA59] text-[#FFF9F4] font-medium text-[13px] border border-[#F8D59E]/45 shadow-[0_6px_22px_rgba(221,122,91,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          {/* Tablet / Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.05] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink hover:text-gold transition-colors duration-200"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Tablet & Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2.5 max-w-md mx-auto rounded-3xl border border-line bg-surface/95 dark:bg-[#160B11]/95 backdrop-blur-2xl p-5 space-y-2 shadow-2xl pointer-events-auto">
          {[
            { key: 'home', label: 'Home', action: () => { setLandingAnchor('home'); onNavigate('landing'); } },
            { key: 'aiPlanner', label: 'AI Planner ✨', action: () => { if (onOpenAIAssistant) onOpenAIAssistant(); } },
            { key: 'events', label: 'Events', action: () => scrollToSection('event-categories', 'events') },
            { key: 'tools', label: 'Tools', action: () => onNavigate('dashboard') },
            { key: 'vendors', label: 'Vendors', action: () => onNavigate('services') },
            { key: 'templates', label: 'Templates', action: () => onNavigate('inspiration') },
            { key: 'community', label: 'Community', action: () => scrollToSection('community-section', 'community') },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                item.action();
                setMobileMenuOpen(false);
              }}
              className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
                activeKey === item.key
                  ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                  : 'text-ink-2 hover:text-ink hover:bg-surface-2/70'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          <div className="border-t border-line pt-2 space-y-1.5">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center justify-between"
              >
                <span className="flex items-center gap-2.5">
                  {isDark ? (
                    <Sun className="w-4 h-4 text-gold" />
                  ) : (
                    <Moon className="w-4 h-4 text-maroon" />
                  )}
                  <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </span>
                <span className="text-xs text-gold-ink capitalize">{theme}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onOpenCalendar();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-gold-ink hover:bg-surface-2/70 flex items-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Event Calendar</span>
            </button>

            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-2/70">
                <div>
                  <p className="text-xs font-semibold text-ink">{currentUser.name}</p>
                  <p className="text-[10px] text-gold-ink">{currentUser.tier || 'Host'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] px-3 text-xs text-danger hover:underline flex items-center gap-1.5"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] rounded-full bg-surface-2 hover:bg-line/50 text-xs font-semibold text-ink flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-gold" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onPlanYourEvent();
                setMobileMenuOpen(false);
              }}
              className="btn-sheen w-full min-h-[44px] rounded-full bg-gradient-to-r from-[#C8526C] via-[#DD7A5B] to-[#F0AA59] text-[#FFF9F4] font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
