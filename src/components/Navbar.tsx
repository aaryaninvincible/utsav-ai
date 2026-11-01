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

type NavItemKey = 'home' | 'events' | 'services' | 'gallery' | 'about';

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
  const [landingAnchor, setLandingAnchor] = useState<'home' | 'events' | 'about'>('home');
  const [hoveredKey, setHoveredKey] = useState<NavItemKey | null>(null);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<NavItemKey, HTMLElement | null>>({
    home: null,
    events: null,
    services: null,
    gallery: null,
    about: null,
  });

  const isDark = theme === 'dark';

  // Determine which nav item is currently active based on route/tab & landing anchor
  const activeKey: NavItemKey = (() => {
    if (currentTab === 'services') return 'services';
    if (currentTab === 'inspiration') return 'gallery';
    if (currentTab === 'create' || currentTab === 'dashboard' || currentTab === 'details') {
      return 'events';
    }
    return landingAnchor;
  })();

  // Reset landing anchor to 'home' when switching away from landing or clicking Home
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
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  }, [targetKey]);

  useLayoutEffect(() => {
    updatePillPosition();
  }, [updatePillPosition, currentTab, theme]);

  useEffect(() => {
    const handleResize = () => updatePillPosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePillPosition]);

  const scrollToSection = (sectionId: string, anchorKey: 'home' | 'events' | 'about') => {
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
      <header className="max-w-[1480px] mx-auto h-[58px] sm:h-[62px] rounded-full eventara-nav-glass px-4 sm:px-6 lg:px-7 flex items-center justify-between pointer-events-auto">
        
        {/* Left: Brand — Outlined Lotus Mark + Eventara + EVENT PLANNER */}
        <button
          type="button"
          onClick={() => {
            setLandingAnchor('home');
            onNavigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-full pr-2 text-left flex-shrink-0 min-h-[44px]"
          aria-label="Eventara Event Planner Home"
        >
          {/* Outlined Gold Lotus Mark */}
          <span className="w-9 h-9 flex items-center justify-center text-gold group-hover:text-saffron transition-colors duration-200">
            <svg
              viewBox="0 0 36 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-7"
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
            <span className="block font-display text-[24px] sm:text-[27px] font-semibold tracking-[0.01em] text-ink transition-colors duration-200">
              Eventara
            </span>
            <span className="block font-sans text-[8.5px] sm:text-[9px] font-medium uppercase tracking-[0.26em] text-gold-ink mt-0.5 transition-colors duration-200">
              EVENT PLANNER
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links with Cursor-Following Sliding Capsule */}
        <nav
          ref={navRef}
          onMouseLeave={() => {
            setHoveredKey(null);
            setEventsDropdownOpen(false);
          }}
          className="relative hidden lg:flex items-center gap-1.5 xl:gap-2 py-1"
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
            className="pointer-events-none absolute top-1/2 left-0 h-[36px] rounded-full bg-gradient-to-b from-[#571B32] to-[#3B1222] dark:from-[#49232E]/95 dark:to-[#2D151D]/98 border border-gold/55 shadow-[0_4px_16px_rgba(242,166,74,0.25),inset_0_1px_0_rgba(255,255,255,0.22)] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-0"
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
            }}
            onFocus={() => setHoveredKey('home')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => {
              setLandingAnchor('home');
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative z-10 px-4 xl:px-5 py-1.5 rounded-full text-[13.5px] transition-colors duration-200 ${getItemTextClass('home')}`}
          >
            Home
          </button>

          {/* 2. Events with Chevron */}
          <div
            ref={(el) => {
              itemRefs.current.events = el;
            }}
            className="relative z-10"
            onMouseEnter={() => {
              setHoveredKey('events');
              setEventsDropdownOpen(true);
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
              className={`flex items-center gap-1.5 px-4 xl:px-5 py-1.5 rounded-full text-[13.5px] transition-colors duration-200 ${getItemTextClass('events')}`}
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 w-60 z-50">
                <div className="rounded-2xl p-2 bg-surface/95 dark:bg-[#1B0E14]/95 backdrop-blur-2xl border border-line shadow-2xl space-y-0.5">
                  {[
                    { label: 'Weddings', icon: Gem },
                    { label: 'Birthday Parties', icon: Cake },
                    { label: 'Corporate Events', icon: Briefcase },
                    { label: 'College Fests', icon: GraduationCap },
                    { label: 'Festivals & Cultural', icon: Sun },
                    { label: 'Social Gatherings', icon: Wine },
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
                      <span>Event Calendar</span>
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
                    {onOpenAIAssistant && (
                      <button
                        type="button"
                        onClick={() => {
                          onOpenAIAssistant(
                            'Help me create a wedding budget, timeline, and vendor checklist.'
                          );
                          setEventsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                      >
                        <span>AI Planning Assistant</span>
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (currentUser) {
                          onNavigate('dashboard');
                        } else {
                          onOpenAuth();
                        }
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center justify-between transition-colors"
                    >
                      <span>{currentUser ? `Account (${currentUser.name})` : 'Sign In / Register'}</span>
                      <User className="w-3.5 h-3.5 text-gold" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Services */}
          <button
            ref={(el) => {
              itemRefs.current.services = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('services');
              setEventsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('services')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => onNavigate('services')}
            className={`relative z-10 px-4 xl:px-5 py-1.5 rounded-full text-[13.5px] transition-colors duration-200 ${getItemTextClass('services')}`}
          >
            Services
          </button>

          {/* 4. Gallery */}
          <button
            ref={(el) => {
              itemRefs.current.gallery = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('gallery');
              setEventsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('gallery')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => onNavigate('inspiration')}
            className={`relative z-10 px-4 xl:px-5 py-1.5 rounded-full text-[13.5px] transition-colors duration-200 ${getItemTextClass('gallery')}`}
          >
            Gallery
          </button>

          {/* 5. About */}
          <button
            ref={(el) => {
              itemRefs.current.about = el;
            }}
            type="button"
            onMouseEnter={() => {
              setHoveredKey('about');
              setEventsDropdownOpen(false);
            }}
            onFocus={() => setHoveredKey('about')}
            onBlur={() => setHoveredKey(null)}
            onClick={() => scrollToSection('how-it-works', 'about')}
            className={`relative z-10 px-4 xl:px-5 py-1.5 rounded-full text-[13.5px] transition-colors duration-200 ${getItemTextClass('about')}`}
          >
            About
          </button>
        </nav>

        {/* Right: Search Icon + Theme Toggle + Primary "Plan Your Event →" CTA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenCalendar}
            title="Search events & auspicious dates"
            className="w-10 h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink-2 hover:text-gold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Search Events and Dates"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Accessible Light / Dark Theme Toggle */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to warm editorial light mode' : 'Switch to luxury dark mode'}
              className="w-10 h-10 rounded-full bg-surface-2/60 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink-2 hover:text-gold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F1C27D] transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Moon className="w-4 h-4 text-[#571B32] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onPlanYourEvent}
            className="btn-sheen hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8526C] via-[#DD7A5B] to-[#F0AA59] text-[#FFF9F4] font-medium text-[13px] border border-[#F8D59E]/45 shadow-[0_6px_22px_rgba(221,122,91,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          {/* Tablet / Mobile Menu Button (≥44px tap target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-full bg-surface-2/60 dark:bg-white/[0.05] border border-line/80 dark:border-[#F7EEE9]/15 flex items-center justify-center text-ink hover:text-gold transition-colors duration-200"
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
          <button
            type="button"
            onClick={() => {
              setLandingAnchor('home');
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
              activeKey === 'home'
                ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                : 'text-ink hover:bg-surface-2/70'
            }`}
          >
            <span>Home</span>
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('event-categories', 'events');
              setMobileMenuOpen(false);
            }}
            className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
              activeKey === 'events'
                ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                : 'text-ink-2 hover:text-ink hover:bg-surface-2/70'
            }`}
          >
            <span>Events</span>
            <ChevronDown className="w-4 h-4 text-gold" />
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
              activeKey === 'services'
                ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                : 'text-ink-2 hover:text-ink hover:bg-surface-2/70'
            }`}
          >
            <span>Services</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('inspiration');
              setMobileMenuOpen(false);
            }}
            className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
              activeKey === 'gallery'
                ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                : 'text-ink-2 hover:text-ink hover:bg-surface-2/70'
            }`}
          >
            <span>Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => {
              scrollToSection('how-it-works', 'about');
              setMobileMenuOpen(false);
            }}
            className={`w-full min-h-[44px] px-4 rounded-full text-left text-sm font-medium flex items-center justify-between ${
              activeKey === 'about'
                ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] text-[#FFF8F2] border border-gold/45'
                : 'text-ink-2 hover:text-ink hover:bg-surface-2/70'
            }`}
          >
            <span>About</span>
          </button>

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
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center gap-2.5"
            >
              <LayoutDashboard className="w-4 h-4 text-gold" />
              <span>My Events Dashboard</span>
            </button>

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

            {onOpenAIAssistant && (
              <button
                type="button"
                onClick={() => {
                  onOpenAIAssistant(
                    'Help me create a wedding budget, timeline, and vendor checklist.'
                  );
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-ink-2 hover:text-ink hover:bg-surface-2/70 flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-gold" />
                <span>AI Planning Assistant</span>
              </button>
            )}

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
