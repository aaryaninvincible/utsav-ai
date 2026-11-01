import React, { useState, useEffect } from 'react';
import {
  Search,
  User,
  ChevronDown,
  Calendar,
  Sparkles,
  Menu,
  X,
  LogOut,
  Layers,
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
    <header className="sticky top-0 z-40 w-full bg-[#0D0709]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo (Eventara / Utsav AI Style) */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 group focus-visible:outline-none text-left"
          aria-label="Eventara Event Planner"
        >
          {/* Gold Lotus Emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5A855]/20 to-[#D97736]/10 border border-[#E5A855]/40 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(229,168,85,0.2)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 3c1.5 2.5 1.5 5 0 8-1.5-3-1.5-5.5 0-8z" />
              <path d="M12 11c-2.5-3-6-4-9-3 1 3 3.5 5.5 9 3z" />
              <path d="M12 11c2.5-3 6-4 9-3-1 3-3.5 5.5-9 3z" />
              <path d="M6 18c3-1.5 9-1.5 12 0" />
            </svg>
          </div>

          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
              Eventara
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-[#E5A855] block mt-1">
              Event Planner
            </span>
          </div>
        </button>

        {/* Center: Frosted Glass Navigation Pill (as in reference image) */}
        <nav
          className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#180E13]/80 border border-white/10 shadow-inner"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'landing'
                ? 'bg-[#3A1E27] text-white shadow-sm border border-white/10'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Home
          </button>

          {/* Events Dropdown */}
          <div className="relative">
            <button
              onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors"
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5" />
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
                  <span>Corporate Galas</span>
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
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-[#3A1E27] text-white shadow-sm border border-white/10'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={onOpenCalendar}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E5A855]" />
            <span>Calendar</span>
          </button>

          <button
            onClick={() => onNavigate('inspiration')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'inspiration'
                ? 'bg-[#3A1E27] text-white shadow-sm border border-white/10'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Gallery
          </button>
        </nav>

        {/* Right: Search, Auth & Luxury "Plan Your Event" Button */}
        <div className="flex items-center gap-3">
          
          {/* Circular Frosted Search Button */}
          <button
            onClick={onOpenCalendar}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Search Occasions"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Sign In / Profile Button */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-[#E5A855]/40 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D97736] to-[#E5A855] text-white text-[10px] font-bold flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline">{currentUser.name}</span>
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
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white/90 hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Primary "Plan Your Event →" Luxury Pill Button */}
          <button
            onClick={onPlanYourEvent}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-xs shadow-[0_0_20px_rgba(229,168,85,0.4)] hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#12080D] p-5 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-semibold text-white/80"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-semibold text-white/80"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onOpenCalendar();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-semibold text-[#E5A855] flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Auspicious Calendar</span>
          </button>
          <button
            onClick={() => {
              onNavigate('inspiration');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-sm font-semibold text-white/80"
          >
            Gallery & Themes
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
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-xs text-center block"
          >
            Plan Your Event Now
          </button>
        </div>
      )}
    </header>
  );
};
