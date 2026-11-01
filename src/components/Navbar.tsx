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
} from 'lucide-react';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, eventId?: string) => void;
  onOpenAuth: () => void;
  onOpenCalendar: () => void;
  onPlanYourEvent: () => void;
  currentUser: UserProfile | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenAuth,
  onOpenCalendar,
  onPlanYourEvent,
  currentUser,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-none">
      {/* Floating Capsule Container */}
      <header className="max-w-6xl mx-auto rounded-full bg-[#160D12]/85 backdrop-blur-2xl border border-white/12 px-5 sm:px-7 py-2.5 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.65)] pointer-events-auto transition-all">
        
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group focus-visible:outline-none text-left"
          aria-label="Eventara Event Planner"
        >
          {/* Gold Lotus Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5A855]/25 to-[#D97736]/10 border border-[#E5A855]/50 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(229,168,85,0.3)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 3c1.5 2.5 1.5 5 0 8-1.5-3-1.5-5.5 0-8z" />
              <path d="M12 11c-2.5-3-6-4-9-3 1 3 3.5 5.5 9 3z" />
              <path d="M12 11c2.5-3 6-4 9-3-1 3-3.5 5.5-9 3z" />
              <path d="M6 18c3-1.5 9-1.5 12 0" />
            </svg>
          </div>

          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
              Eventara
            </span>
            <span className="text-[9px] tracking-[0.25em] uppercase font-medium text-[#E5A855] block mt-0.5">
              Event Planner
            </span>
          </div>
        </button>

        {/* Center: Frosted Capsule Pill Links */}
        <nav
          className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-[#1F1218]/70 border border-white/10"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'landing'
                ? 'bg-[#4A1E29] text-white shadow-sm border border-white/15'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Home
          </button>

          {/* Events Dropdown */}
          <div className="relative">
            <button
              onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl p-2 bg-[#1A0F15] border border-white/15 shadow-2xl z-50 animate-fadeIn">
                <button
                  onClick={() => {
                    onNavigate('create');
                    setEventsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Royal Weddings</span>
                  <span className="text-[#E5A855]">💍</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('create');
                    setEventsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Birthday Parties</span>
                  <span className="text-[#E5A855]">🎂</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('create');
                    setEventsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Corporate Events</span>
                  <span className="text-[#E5A855]">💼</span>
                </button>
                <button
                  onClick={() => {
                    onNavigate('create');
                    setEventsDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                >
                  <span>Festivals & Cultural</span>
                  <span className="text-[#E5A855]">🪔</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-[#4A1E29] text-white shadow-sm border border-white/15'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Services
          </button>

          <button
            onClick={() => onNavigate('inspiration')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'inspiration'
                ? 'bg-[#4A1E29] text-white shadow-sm border border-white/15'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Gallery
          </button>

          <button
            onClick={onOpenCalendar}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors"
          >
            About
          </button>
        </nav>

        {/* Right Action Cluster: Search + Sign In + Plan Your Event */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Circular Search Pill */}
          <button
            onClick={onOpenCalendar}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Search Occasions"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* User Sign In / Profile */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#E5A855]/40 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#D97736] to-[#E5A855] text-white text-[9px] font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs">{currentUser.name}</span>
                <ChevronDown className="w-3 h-3 text-white/60" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl p-2 bg-[#1A0F15] border border-white/15 shadow-2xl z-50 animate-fadeIn text-left">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-xs font-bold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-[#E5A855]">{currentUser.tier || 'VIP Host'}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10"
                  >
                    My Events
                  </button>
                  <button
                    onClick={() => {
                      onSignOut();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-semibold text-white/90 hover:text-white px-3 py-1.5 transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Primary "Plan Your Event →" Luxury Pill Button */}
          <button
            onClick={onPlanYourEvent}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-xs shadow-[0_0_20px_rgba(229,168,85,0.45)] hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto rounded-3xl border border-white/15 bg-[#140B10]/95 backdrop-blur-2xl p-5 space-y-3 shadow-2xl pointer-events-auto animate-fadeIn">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            Services & Dashboard
          </button>
          <button
            onClick={() => {
              onOpenCalendar();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-[#E5A855] flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Auspicious Calendar</span>
          </button>
          <button
            onClick={() => {
              onNavigate('inspiration');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            Gallery
          </button>
          {!currentUser && (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 rounded-full bg-white/10 text-xs font-semibold text-white"
            >
              Sign In / Sign Up
            </button>
          )}
          <button
            onClick={() => {
              onPlanYourEvent();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-xs text-center block"
          >
            Plan Your Event Now
          </button>
        </div>
      )}
    </div>
  );
};
