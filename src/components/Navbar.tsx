import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  LayoutDashboard,
  PlusCircle,
  Palette,
  Bot,
  Calendar,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Image as ImageIcon,
  Flame,
  Search,
} from 'lucide-react';
import { getAIStatus } from '../services/aiClient';
import { AIStatus } from '../shared/aiContract';
import {
  FestivalId,
  FestivalTheme,
  FESTIVAL_THEMES,
  getActiveFestivalTheme,
  setFestivalTheme,
} from '../services/festivalThemeService';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, eventId?: string) => void;
  activeEventName?: string;
  onOpenAIAssistant?: () => void;
  onOpenCalendar?: () => void;
  onOpenBannerStudio?: () => void;
  onSearchFocus?: () => void;
  currentFestival?: FestivalTheme;
  onFestivalChange?: (theme: FestivalTheme) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  activeEventName,
  onOpenAIAssistant,
  onOpenCalendar,
  onOpenBannerStudio,
  onSearchFocus,
  currentFestival,
  onFestivalChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [festivalDropdownOpen, setFestivalDropdownOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState<AIStatus>({ configured: false });
  const [isDark, setIsDark] = useState(false);

  const activeTheme = currentFestival || getActiveFestivalTheme();

  useEffect(() => {
    getAIStatus().then(setAiStatus);
    const darkActive = document.documentElement.classList.contains('dark');
    setIsDark(darkActive);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('utsav_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('utsav_theme', 'light');
    }
  };

  const handleSelectFestival = (id: FestivalId) => {
    setFestivalTheme(id);
    const updated = FESTIVAL_THEMES[id];
    if (onFestivalChange) {
      onFestivalChange(updated);
    }
    setFestivalDropdownOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Plan Celebration', icon: PlusCircle },
    { id: 'inspiration', label: 'Themes & Ideas', icon: Palette },
  ];

  return (
    <header className="sticky top-0 z-40 w-full liquid-glass-nav transition-colors">
      <div className="shell flex items-center justify-between h-18 py-3">
        
        {/* Left: Brand Logo & Festival Mode Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 text-left group focus-visible:outline-none"
            aria-label="Utsav AI Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-maroon to-burgundy flex items-center justify-center text-on-primary shadow-sm border border-gold/40 group-hover:scale-105 transition-transform">
              <span className="text-xl">{activeTheme.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-ink">
                  Utsav AI
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border border-gold/40 bg-surface-2 text-gold-ink">
                  {aiStatus.configured ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
                      {aiStatus.provider === 'gemini' ? 'Gemini 3.6 Flash' : 'Gemma Local'}
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Multi-Model Ready
                    </>
                  )}
                </span>
              </div>
              <p className="text-[11px] text-ink-2 font-medium hidden sm:block">
                Indian Festival & Celebration Planner
              </p>
            </div>
          </button>

          {/* Festival Theme Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setFestivalDropdownOpen(!festivalDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-2/80 hover:bg-surface border border-line text-ink transition-colors shadow-xs"
              aria-expanded={festivalDropdownOpen}
              aria-label="Change Festival Theme"
            >
              <span>{activeTheme.icon}</span>
              <span className="hidden sm:inline font-medium">{activeTheme.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-ink-2" />
            </button>

            {festivalDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl p-2 liquid-glass-card bg-surface/98 border border-white/20 shadow-xl z-50 animate-fadeIn">
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-2 px-2 py-1">
                  Active Festival Theme
                </div>
                {(Object.keys(FESTIVAL_THEMES) as FestivalId[]).map((fId) => {
                  const item = FESTIVAL_THEMES[fId];
                  const isSelected = item.id === activeTheme.id;
                  return (
                    <button
                      key={fId}
                      onClick={() => handleSelectFestival(fId)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                        isSelected
                          ? 'bg-primary text-on-primary'
                          : 'text-ink hover:bg-surface-2'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                      {isSelected && <span className="text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center: Search & Calendar Quick Action */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-surface/60 hover:bg-surface text-xs font-medium text-ink transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Festive Calendar</span>
          </button>

          <button
            onClick={onOpenBannerStudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-surface/60 hover:bg-surface text-xs font-medium text-ink transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5 text-gold" />
            <span>AI Banner Studio</span>
          </button>
        </div>

        {/* Right: Desktop Navigation + CTAs */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-ink-2 hover:text-ink hover:bg-surface-2'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* AI Assistant Modal Trigger */}
          {onOpenAIAssistant && (
            <button
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-2 border border-line text-xs font-semibold text-ink hover:border-gold transition-colors ml-1"
            >
              <Bot className="w-3.5 h-3.5 text-gold" />
              <span>AI Pandit</span>
            </button>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-line bg-surface hover:bg-surface-2 text-ink-2 hover:text-ink transition-colors"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-line text-ink-2"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-line text-ink"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-line bg-surface/98 p-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  active ? 'bg-primary text-on-primary' : 'text-ink hover:bg-surface-2'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              if (onOpenCalendar) onOpenCalendar();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-2 border border-line"
          >
            <Calendar className="w-4 h-4 text-gold" />
            <span>Festive Calendar & Muhurats</span>
          </button>

          <button
            onClick={() => {
              if (onOpenBannerStudio) onOpenBannerStudio();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-surface-2 border border-line"
          >
            <ImageIcon className="w-4 h-4 text-gold" />
            <span>AI Banner Studio</span>
          </button>

          {onOpenAIAssistant && (
            <button
              onClick={() => {
                onOpenAIAssistant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold bg-surface-2 text-ink border border-gold/40"
            >
              <Bot className="w-4 h-4 text-gold" />
              <span>Ask AI Pandit / Assistant</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
