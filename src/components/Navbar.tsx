import React, { useState } from 'react';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenCalendar,
  onPlanYourEvent,
  onOpenAIAssistant,
  currentUser,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
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

  return (
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-3.5 px-3 sm:px-6 lg:px-8 pointer-events-none">
      {/* Centered Floating Frosted Capsule Navbar (~1480px max-width, ~62px height) */}
      <header className="max-w-[1480px] mx-auto h-[58px] sm:h-[62px] rounded-full eventara-nav-glass px-4 sm:px-6 lg:px-7 flex items-center justify-between pointer-events-auto transition-all">
        
        {/* Left: Brand — Outlined Lotus Mark + Eventara + EVENT PLANNER */}
        <button
          onClick={() => {
            onNavigate('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus-visible:outline-none text-left flex-shrink-0 min-h-[44px]"
          aria-label="Eventara Event Planner Home"
        >
          {/* Outlined Gold Lotus Mark */}
          <span className="w-9 h-9 flex items-center justify-center text-[#F1C27D] group-hover:text-[#F2A64A] transition-colors">
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
              {/* Center petal */}
              <path d="M18 3 C21 8.5, 21.5 14.5, 18 20 C14.5 14.5, 15 8.5, 18 3 Z" />
              {/* Inner left & right petals */}
              <path d="M18 20 C13.5 16.5, 9.5 11.5, 9.5 6.5 C13.5 7.5, 16.2 11.5, 18 20 Z" />
              <path d="M18 20 C22.5 16.5, 26.5 11.5, 26.5 6.5 C22.5 7.5, 19.8 11.5, 18 20 Z" />
              {/* Outer left & right petals */}
              <path d="M16.5 20.5 C10.5 19.5, 5.5 16, 3.5 11.5 C8.5 11.5, 13 14.5, 16.5 20.5 Z" />
              <path d="M19.5 20.5 C25.5 19.5, 30.5 16, 32.5 11.5 C27.5 11.5, 23 14.5, 19.5 20.5 Z" />
              {/* Base curve & stem dot */}
              <path d="M10 24.5 C14.5 22.8, 21.5 22.8, 26 24.5" />
              <path d="M18 24.5 L18 28" />
            </svg>
          </span>

          <div className="leading-none">
            <span className="block font-display text-[24px] sm:text-[27px] font-semibold tracking-[0.01em] text-[#F7EEE9]">
              Eventara
            </span>
            <span className="block font-sans text-[8.5px] sm:text-[9px] font-medium uppercase tracking-[0.26em] text-[#F1C27D]/85 mt-0.5">
              EVENT PLANNER
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation Links (Home, Events v, Services, Gallery, About) */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8"
          aria-label="Primary Navigation"
        >
          {/* 1. Home (active capsule) */}
          <button
            onClick={() => {
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`px-5 py-1.5 rounded-full text-[13.5px] font-medium transition-all ${
              currentTab === 'landing'
                ? 'bg-gradient-to-b from-[#49232E]/90 to-[#2D151D]/95 text-[#F7EEE9] border border-[#F1C27D]/45 shadow-[0_4px_16px_rgba(242,166,74,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]'
                : 'text-[#F7EEE9]/78 hover:text-[#F7EEE9]'
            }`}
          >
            Home
          </button>

          {/* 2. Events with Chevron */}
          <div
            className="relative"
            onMouseEnter={() => setEventsDropdownOpen(true)}
            onMouseLeave={() => setEventsDropdownOpen(false)}
          >
            <button
              onClick={() => {
                setEventsDropdownOpen((prev) => !prev);
                scrollToSection('event-categories');
              }}
              aria-expanded={eventsDropdownOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-[13.5px] font-medium text-[#F7EEE9]/82 hover:text-[#F1C27D] transition-colors py-2"
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#F7EEE9]/65" />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-60 z-50">
                <div className="rounded-2xl p-2 bg-[#1B0E14]/95 backdrop-blur-2xl border border-[#F7EEE9]/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-0.5">
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
                        onClick={() => {
                          onPlanYourEvent();
                          setEventsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#F7EEE9]/88 hover:text-[#F1C27D] hover:bg-white/5 flex items-center justify-between transition-colors"
                      >
                        <span>{item.label}</span>
                        <Icon className="w-3.5 h-3.5 text-[#F1C27D]/80" />
                      </button>
                    );
                  })}

                  <div className="border-t border-white/10 my-1 pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        onOpenCalendar();
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#F1C27D] hover:bg-white/5 flex items-center justify-between transition-colors"
                    >
                      <span>Event Calendar</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#F7EEE9]/80 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                    >
                      <span>My Events Workspace</span>
                      <LayoutDashboard className="w-3.5 h-3.5 text-[#F1C27D]/80" />
                    </button>
                    {onOpenAIAssistant && (
                      <button
                        onClick={() => {
                          onOpenAIAssistant();
                          setEventsDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#F7EEE9]/80 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                      >
                        <span>Planning Concierge</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#F1C27D]/80" />
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (currentUser) {
                          onNavigate('dashboard');
                        } else {
                          onOpenAuth();
                        }
                        setEventsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#F7EEE9]/80 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                    >
                      <span>{currentUser ? `Account (${currentUser.name})` : 'Sign In / Register'}</span>
                      <User className="w-3.5 h-3.5 text-[#F1C27D]/80" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Services */}
          <button
            onClick={() => onNavigate('services')}
            className={`text-[13.5px] font-medium transition-colors py-2 ${
              currentTab === 'services'
                ? 'text-[#F1C27D]'
                : 'text-[#F7EEE9]/82 hover:text-[#F1C27D]'
            }`}
          >
            Services
          </button>

          {/* 4. Gallery */}
          <button
            onClick={() => onNavigate('inspiration')}
            className={`text-[13.5px] font-medium transition-colors py-2 ${
              currentTab === 'inspiration'
                ? 'text-[#F1C27D]'
                : 'text-[#F7EEE9]/82 hover:text-[#F1C27D]'
            }`}
          >
            Gallery
          </button>

          {/* 5. About */}
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-[13.5px] font-medium text-[#F7EEE9]/82 hover:text-[#F1C27D] transition-colors py-2"
          >
            About
          </button>
        </nav>

        {/* Right: Single Circular Search Icon + Primary "Plan Your Event →" CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
          <button
            onClick={onOpenCalendar}
            className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-[#F7EEE9]/15 flex items-center justify-center text-[#F7EEE9]/85 hover:text-[#F1C27D] transition-colors"
            aria-label="Search Events and Dates"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={onPlanYourEvent}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C8526C] via-[#DD7A5B] to-[#F0AA59] text-[#FFF9F4] font-medium text-[13px] border border-[#F8D59E]/45 shadow-[0_6px_22px_rgba(221,122,91,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] hover:brightness-105 active:translate-y-px transition-all"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>

          {/* Tablet / Mobile Menu Button (≥44px tap target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-full bg-white/[0.05] border border-[#F7EEE9]/15 flex items-center justify-center text-[#F7EEE9] hover:text-[#F1C27D] transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Tablet & Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2.5 max-w-md mx-auto rounded-3xl border border-[#F7EEE9]/15 bg-[#160B11]/95 backdrop-blur-2xl p-5 space-y-2 shadow-[0_24px_60px_rgba(0,0,0,0.9)] pointer-events-auto">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9] hover:bg-white/5 flex items-center justify-between"
          >
            <span>Home</span>
          </button>
          <button
            onClick={() => {
              scrollToSection('event-categories');
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center justify-between"
          >
            <span>Events</span>
            <ChevronDown className="w-4 h-4 text-[#F1C27D]" />
          </button>
          <button
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center justify-between"
          >
            <span>Services</span>
          </button>
          <button
            onClick={() => {
              onNavigate('inspiration');
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center justify-between"
          >
            <span>Gallery</span>
          </button>
          <button
            onClick={() => {
              scrollToSection('how-it-works');
              setMobileMenuOpen(false);
            }}
            className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center justify-between"
          >
            <span>About</span>
          </button>

          <div className="border-t border-white/10 pt-2 space-y-1.5">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center gap-2.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#F1C27D]" />
              <span>My Events Dashboard</span>
            </button>

            <button
              onClick={() => {
                onOpenCalendar();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F1C27D] hover:bg-white/5 flex items-center gap-2.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Event Calendar</span>
            </button>

            {onOpenAIAssistant && (
              <button
                onClick={() => {
                  onOpenAIAssistant();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] px-3 rounded-xl text-left text-sm font-medium text-[#F7EEE9]/85 hover:bg-white/5 flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#F1C27D]" />
                <span>Planning Concierge</span>
              </button>
            )}

            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5">
                <div>
                  <p className="text-xs font-semibold text-[#F7EEE9]">{currentUser.name}</p>
                  <p className="text-[10px] text-[#F1C27D]">{currentUser.tier || 'Host'}</p>
                </div>
                <button
                  onClick={() => {
                    onSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="min-h-[44px] px-3 text-xs text-red-300 hover:text-red-200 flex items-center gap-1.5"
                >
                  <span>Sign Out</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-[#F7EEE9] flex items-center justify-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-[#F1C27D]" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                onPlanYourEvent();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] rounded-full bg-gradient-to-r from-[#C8526C] via-[#DD7A5B] to-[#F0AA59] text-[#FFF9F4] font-semibold text-xs flex items-center justify-center gap-2 shadow-lg"
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
