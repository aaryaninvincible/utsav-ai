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
  Bell,
  Wallet,
  Clock,
  Store,
  CheckSquare,
  Users,
  Wand2,
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
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      {/* Single Floating Capsule Navbar */}
      <header className="max-w-[1360px] mx-auto rounded-full bg-[#150A12]/90 backdrop-blur-2xl border border-white/15 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_12px_45px_rgba(0,0,0,0.75)] pointer-events-auto transition-all">
        
        {/* Left: Brand Logo (Eventara AI) */}
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 group focus-visible:outline-none text-left flex-shrink-0"
          aria-label="Eventara AI Home"
        >
          {/* Glowing Lotus + Sparkle Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E14D77]/25 via-[#E5A855]/20 to-transparent border border-[#E5A855]/50 flex items-center justify-center text-[#E5A855] group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(229,168,85,0.25)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 3c1.5 2.5 1.5 5 0 8-1.5-3-1.5-5.5 0-8z" stroke="#E5A855" />
              <path d="M12 11c-2.5-3-6-4-9-3 1 3 3.5 5.5 9 3z" stroke="#E14D77" />
              <path d="M12 11c2.5-3 6-4 9-3-1 3-3.5 5.5-9 3z" stroke="#E5A855" />
              <path d="M6 18c3-1.5 9-1.5 12 0" stroke="#E5A855" />
            </svg>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Eventara
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#E5A855]">
                AI
              </span>
            </div>
            <span className="text-[9px] tracking-[0.06em] text-white/60 block mt-0.5 font-sans">
              AI Event Planning Assistant
            </span>
          </div>
        </button>

        {/* Center: Clean Menu Links directly in navbar (NO inner capsule outline) */}
        <nav
          className="hidden lg:flex items-center gap-5 xl:gap-6"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => onNavigate('landing')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'landing'
                ? 'bg-gradient-to-r from-[#591C33] to-[#3B1424] text-white border border-[#E14D77]/45 shadow-[0_0_15px_rgba(225,77,119,0.3)]'
                : 'text-white/75 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              if (onOpenAIAssistant) {
                onOpenAIAssistant();
              } else {
                onPlanYourEvent();
              }
            }}
            className="flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-[#E5A855] transition-colors py-1"
          >
            <span>AI Planner</span>
            <Sparkles className="w-3.5 h-3.5 text-[#E5A855]" />
          </button>

          {/* Events Dropdown */}
          <div
            className="relative"
            onMouseLeave={() => setEventsDropdownOpen(false)}
          >
            <button
              onClick={() => {
                setEventsDropdownOpen(!eventsDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-semibold text-white/75 hover:text-white transition-colors py-1"
            >
              <span>Events</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </button>

            {eventsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-52 z-50 animate-fadeIn">
                <div className="rounded-2xl p-2 bg-[#1A0D15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl">
                  <button
                    onClick={() => {
                      onPlanYourEvent();
                      setEventsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span>Weddings</span>
                    <span className="text-[#E5A855]">💍</span>
                  </button>
                  <button
                    onClick={() => {
                      onPlanYourEvent();
                      setEventsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span>Birthdays</span>
                    <span className="text-[#E5A855]">🎂</span>
                  </button>
                  <button
                    onClick={() => {
                      onPlanYourEvent();
                      setEventsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center justify-between"
                  >
                    <span>Community Events</span>
                    <span className="text-[#E5A855]">👥</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenCalendar();
                      setEventsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#E5A855] hover:bg-white/10 flex items-center justify-between border-t border-white/10 mt-1 pt-2"
                  >
                    <span>Auspicious Calendar</span>
                    <span>📅</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setEventsDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-semibold text-white/75 hover:text-white transition-colors py-1"
            >
              <span>Tools</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/50" />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50 animate-fadeIn">
                <div className="rounded-2xl p-2 bg-[#1A0D15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl space-y-0.5">
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <Wallet className="w-3.5 h-3.5 text-[#E5A855]" />
                    <span>Budget Planner</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#E5A855]" />
                    <span>Timeline & Schedule</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <Store className="w-3.5 h-3.5 text-[#E5A855]" />
                    <span>Vendor Management</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-[#E5A855]" />
                    <span>Checklist & Tasks</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('inspiration');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-white/90 hover:bg-white/10 flex items-center gap-2.5"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-[#E5A855]" />
                    <span>AI Ideas & Themes</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('services')}
            className={`text-xs font-semibold transition-colors py-1 ${
              currentTab === 'services'
                ? 'text-[#E5A855] font-bold'
                : 'text-white/75 hover:text-white'
            }`}
          >
            Vendors
          </button>

          <button
            onClick={() => onNavigate('inspiration')}
            className={`text-xs font-semibold transition-colors py-1 ${
              currentTab === 'inspiration'
                ? 'text-[#E5A855] font-bold'
                : 'text-white/75 hover:text-white'
            }`}
          >
            Templates
          </button>

          <button
            onClick={onOpenCalendar}
            className="text-xs font-semibold text-white/75 hover:text-white transition-colors py-1"
          >
            Community
          </button>
        </nav>

        {/* Right Action Cluster: Search + Bell + User Avatar + Plan Your Event */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Circular Search Button */}
          <button
            onClick={onOpenCalendar}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Search Events"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Notification Bell with Red Dot */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E14D77] ring-2 ring-[#150A12]" />
          </button>

          {/* User Avatar / Auth Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                if (currentUser) {
                  setUserDropdownOpen(!userDropdownOpen);
                } else {
                  onOpenAuth();
                }
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#E14D77] to-[#E5A855] flex items-center justify-center overflow-hidden shadow-md hover:scale-105 transition-transform"
              title={currentUser ? currentUser.name : 'Sign In / Sign Up'}
            >
              <div className="w-full h-full rounded-full bg-[#1C0F17] flex items-center justify-center text-white text-xs font-bold">
                {currentUser ? currentUser.name.charAt(0).toUpperCase() : '👤'}
              </div>
            </button>

            {currentUser && userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl p-2 bg-[#1A0D15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl z-50 animate-fadeIn text-left">
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-[#E5A855]">{currentUser.tier || 'VIP Host'}</p>
                </div>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10"
                >
                  My Events Dashboard
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

          {/* Primary "Plan Your Event →" Pink-to-Gold Pill Button */}
          <button
            onClick={onPlanYourEvent}
            className="hidden sm:flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E04F7A] via-[#EA7B5C] to-[#E5A855] text-white font-semibold text-xs shadow-[0_0_25px_rgba(224,79,122,0.45)] hover:brightness-110 active:scale-95 transition-all"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-sm mx-auto rounded-3xl border border-white/15 bg-[#150A12]/95 backdrop-blur-2xl p-5 space-y-2.5 shadow-2xl pointer-events-auto animate-fadeIn">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white"
          >
            Home
          </button>
          <button
            onClick={() => {
              if (onOpenAIAssistant) onOpenAIAssistant();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-[#E5A855] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Planner</span>
          </button>
          <button
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            Vendors & Services
          </button>
          <button
            onClick={() => {
              onNavigate('inspiration');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            Templates & Gallery
          </button>
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-white/80"
          >
            My Events Dashboard
          </button>
          <button
            onClick={() => {
              onOpenCalendar();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-xs font-semibold text-[#E5A855] flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Community & Calendar</span>
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
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#E04F7A] via-[#EA7B5C] to-[#E5A855] text-white font-semibold text-xs text-center block"
          >
            Plan Your Event →
          </button>
        </div>
      )}
    </div>
  );
};
