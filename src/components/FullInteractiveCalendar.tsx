import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  PlusCircle,
  ArrowRight,
  Flame,
  CheckCircle2,
  Bookmark,
  Users,
  Wallet,
} from 'lucide-react';
import { EventCategory } from '../types';

export interface CalendarOccasion {
  id: string;
  name: string;
  dateStr: string; // YYYY-MM-DD
  displayDate: string;
  category: EventCategory;
  muhurat?: string;
  description: string;
  rituals?: string[];
  icon: string;
  accent: string;
}

export const UPCOMING_OCCASIONS: CalendarOccasion[] = [
  {
    id: 'dhanteras-2026',
    name: 'Dhanteras & Dhantrayodashi',
    dateStr: '2026-11-10',
    displayDate: 'Nov 10, 2026',
    category: 'cultural',
    muhurat: '06:02 PM – 08:00 PM (Pradosh Kaal)',
    description: 'Auspicious day for purchasing precious brass, gold, and commencing Diwali festivities.',
    rituals: ['Lighting Yamadeep', 'Brass & Gold buying', 'Lakshmi-Kuber puja'],
    icon: '🪙',
    accent: '#E5A855',
  },
  {
    id: 'diwali-2026',
    name: 'Diwali (Festival of Lights)',
    dateStr: '2026-11-12',
    displayDate: 'Nov 12, 2026',
    category: 'cultural',
    muhurat: '05:39 PM – 07:35 PM (Lakshmi-Ganesh Muhurat)',
    description: 'The supreme festival of lights, joy, home illumination with clay diyas, and sweets gifting.',
    rituals: ['Lighting 21 terracotta diyas', 'Floral marigold rangoli', 'Family sweet feast', 'Eco fireworks'],
    icon: '🪔',
    accent: '#D97736',
  },
  {
    id: 'govardhan-2026',
    name: 'Govardhan Puja & Annakut',
    dateStr: '2026-11-13',
    displayDate: 'Nov 13, 2026',
    category: 'cultural',
    muhurat: '03:15 PM – 05:25 PM',
    description: 'Offering 56 culinary delicacies (Chhappan Bhog) in devotion to divine sustenance and nature.',
    rituals: ['Annakut 56-dish feast', 'Cow and nature blessings', 'Communal prasad'],
    icon: '⛰️',
    accent: '#E5A855',
  },
  {
    id: 'bhai-dooj-2026',
    name: 'Bhai Dooj (Yama Dwitiya)',
    dateStr: '2026-11-14',
    displayDate: 'Nov 14, 2026',
    category: 'cultural',
    muhurat: '01:10 PM – 03:22 PM',
    description: 'Sacred occasion celebrating the cherished lifelong bond between brothers and sisters.',
    rituals: ['Tilak & Aarti ritual', 'Exchanging coconut and sweets', 'Special sibling feast'],
    icon: '🎁',
    accent: '#D97736',
  },
  {
    id: 'chhath-puja-2026',
    name: 'Chhath Puja Mahaparv',
    dateStr: '2026-11-18',
    displayDate: 'Nov 18, 2026',
    category: 'cultural',
    muhurat: 'Sunset 05:27 PM | Sunrise 06:48 AM',
    description: 'Ancient Vedic reverence of Surya Dev (Sun God) and Chhathi Maiya along holy riverbanks.',
    rituals: ['Nahay Khay & Kharna kheer', 'Offering Thekua in bamboo soop', 'Arghya in river'],
    icon: '☀️',
    accent: '#E5A855',
  },
  {
    id: 'wedding-muhurat-1',
    name: 'Auspicious Royal Vivah Muhurat',
    dateStr: '2026-12-04',
    displayDate: 'Dec 4, 2026',
    category: 'wedding',
    muhurat: '07:15 PM – 09:45 PM (Godhuli Vela)',
    description: 'Peak winter wedding alignment ideal for palace banquets and royal mandap ceremonies.',
    rituals: ['Saat Phere', 'Hastamelap', 'Baraat procession', 'Royal Sangeet'],
    icon: '💍',
    accent: '#D97736',
  },
  {
    id: 'wedding-muhurat-2',
    name: 'Heritage Palace Sangeet & Vivah',
    dateStr: '2026-12-08',
    displayDate: 'Dec 8, 2026',
    category: 'wedding',
    muhurat: '06:45 PM – 09:15 PM',
    description: 'High-energy starlit sangeet and grand courtyard wedding celebrations.',
    rituals: ['Sangeet dance performances', 'Cocktails & Kesar dinner', 'Phere'],
    icon: '👑',
    accent: '#E5A855',
  },
  {
    id: 'new-year-gala-2027',
    name: 'Grand New Year 2027 Gala',
    dateStr: '2026-12-31',
    displayDate: 'Dec 31, 2026',
    category: 'fest',
    muhurat: '11:59 PM to 12:05 AM (Midnight Countdown)',
    description: 'Welcoming 2027 with starlit rooftop banquets, live acoustic band, and champagne toasts.',
    rituals: ['Midnight countdown toast', 'Gala buffet dinner', 'Live DJ'],
    icon: '🎉',
    accent: '#D97736',
  },
];

interface FullInteractiveCalendarProps {
  onPlanEvent: (details: { name: string; date: string; category: EventCategory; guestCount?: number; budget?: number }) => void;
}

export const FullInteractiveCalendar: React.FC<FullInteractiveCalendarProps> = ({ onPlanEvent }) => {
  // Current calendar month view (default November 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 0-indexed: 10 = November
  const [selectedDateStr, setSelectedDateStr] = useState('2026-11-12'); // Defaults to Diwali

  // Custom User Event Form state for open dates
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState<EventCategory>('wedding');
  const [customGuests, setCustomGuests] = useState('250');
  const [customBudget, setCustomBudget] = useState('1500000');
  const [savedUserEvents, setSavedUserEvents] = useState<CalendarOccasion[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('utsav_user_occasions');
        return stored ? JSON.parse(stored) : [];
      } catch {}
    }
    return [];
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // Helper: number of days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Find occasion for selected date
  const allOccasions = [...UPCOMING_OCCASIONS, ...savedUserEvents];
  const activeOccasion = allOccasions.find((o) => o.dateStr === selectedDateStr);

  const handleSaveCustomOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newOccasion: CalendarOccasion = {
      id: `user-event-${Date.now()}`,
      name: customTitle,
      dateStr: selectedDateStr,
      displayDate: selectedDateStr,
      category: customCategory,
      description: `Personal celebration planned on ${selectedDateStr} for ${customGuests} guests.`,
      icon: customCategory === 'wedding' ? '💍' : customCategory === 'birthday' ? '🎂' : '✨',
      accent: '#E5A855',
    };

    const updated = [...savedUserEvents, newOccasion];
    setSavedUserEvents(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('utsav_user_occasions', JSON.stringify(updated));
    }
    setCustomTitle('');
  };

  return (
    <section id="calendar-section" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-[1380px] mx-auto text-ink">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs font-semibold text-gold-ink uppercase tracking-widest mb-3">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Interactive Celebration Calendar</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight">
          Plan By Date & <span className="italic font-normal text-gold-ink">Sacred Muhurats</span>
        </h2>
        <p className="text-xs sm:text-sm text-ink-2 mt-2">
          Select any date to view festivals, auspicious windows, or schedule your own celebration with one-click planning.
        </p>
      </div>

      {/* Main Grid: Calendar on Left, Event Detail / Action Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full Month Calendar Grid (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 eventara-editorial-card">
          
          {/* Calendar Header with Month Selector */}
          <div className="flex items-center justify-between pb-6 border-b border-line">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <span className="text-xs text-gold-ink">
                {allOccasions.filter((o) => {
                  const [y, m] = o.dateStr.split('-');
                  return Number(y) === currentYear && Number(m) === currentMonth + 1;
                }).length} Upcoming Occasions this month
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-surface-2 hover:bg-line/50 border border-line text-ink-2 hover:text-ink transition-colors"
                aria-label="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-surface-2 hover:bg-line/50 border border-line text-ink-2 hover:text-ink transition-colors"
                aria-label="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center py-3 text-xs font-semibold text-ink-2 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Date Cells */}
          <div className="grid grid-cols-7 gap-2 pt-2">
            {/* Empty slots before first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12 sm:h-14 rounded-2xl bg-surface-2/40" />
            ))}

            {/* Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const formattedDay = String(day).padStart(2, '0');
              const formattedMonth = String(currentMonth + 1).padStart(2, '0');
              const dateKey = `${currentYear}-${formattedMonth}-${formattedDay}`;

              const isSelected = selectedDateStr === dateKey;
              const eventOnDate = allOccasions.find((o) => o.dateStr === dateKey);

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() => setSelectedDateStr(dateKey)}
                  className={`relative h-12 sm:h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#E5A855] to-[#D97736] text-[#12090E] font-bold shadow-md scale-105 z-10'
                      : eventOnDate
                      ? 'bg-gold/15 hover:bg-gold/25 text-ink border border-gold/45 font-semibold'
                      : 'bg-surface-2/60 hover:bg-surface-2 text-ink-2 hover:text-ink'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{day}</span>
                  {eventOnDate && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        isSelected ? 'bg-[#12090E]' : 'bg-gold'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Legend */}
          <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between text-xs text-ink-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>Auspicious Festival / Muhurat</span>
            </div>
            <span>Click any day to schedule</span>
          </div>
        </div>

        {/* Right Column: Selected Date Interactive Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 eventara-editorial-card space-y-6">
          
          {/* Active Date Header */}
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <span className="text-xs text-ink-2 uppercase tracking-widest font-mono">
                Selected Date
              </span>
              <h4 className="font-display text-2xl font-semibold text-ink mt-0.5">
                {selectedDateStr}
              </h4>
            </div>
            <div className="p-2.5 rounded-2xl bg-gold/15 text-gold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* SCENARIO A: An event exists on this date */}
          {activeOccasion ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 rounded-2xl bg-surface-2 border border-line">
                  {activeOccasion.icon}
                </span>
                <div>
                  <h5 className="font-display text-xl font-semibold text-ink">
                    {activeOccasion.name}
                  </h5>
                  <span className="text-xs text-gold-ink uppercase tracking-wider font-semibold">
                    {activeOccasion.category.toUpperCase()} • Auspicious Day
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                {activeOccasion.description}
              </p>

              {activeOccasion.muhurat && (
                <div className="p-3.5 rounded-2xl bg-surface-2 border border-line text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-gold-ink font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Auspicious Window (Muhurat)</span>
                  </div>
                  <div className="font-mono text-sm text-ink font-bold">
                    {activeOccasion.muhurat}
                  </div>
                </div>
              )}

              {activeOccasion.rituals && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-ink-2">Traditions & Rituals:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeOccasion.rituals.map((r, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] bg-surface-2 border border-line text-ink"
                      >
                        ✓ {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prominent User Prompt */}
              <div className="pt-4 border-t border-line space-y-3">
                <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-center">
                  <p className="text-sm font-display font-semibold text-gold-ink">
                    Do you want to plan it from here now?
                  </p>
                  <p className="text-[11px] text-ink-2 mt-0.5">
                    Load structured menus, guest budgets & decor checklists for {activeOccasion.name}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onPlanEvent({
                      name: activeOccasion.name,
                      date: activeOccasion.dateStr,
                      category: activeOccasion.category,
                    })
                  }
                  className="btn-sheen w-full py-3.5 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <span>Yes, Plan This Event Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* SCENARIO B: No event exists on this date - Let user add their own! */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-surface-2 border border-line text-xs text-ink-2">
                <span>No preset festival on this date. Schedule your personal occasion below.</span>
              </div>

              <form onSubmit={handleSaveCustomOccasion} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-ink mb-1">
                    Your Event Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Sangeet or Anniversary Dinner"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Event Category
                    </label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value as EventCategory)}
                      className="input text-xs"
                    >
                      <option value="wedding">Royal Wedding</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="cultural">Festival & Pooja</option>
                      <option value="fest">College & Gala Fest</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink mb-1">
                      Guest Count
                    </label>
                    <input
                      type="number"
                      value={customGuests}
                      onChange={(e) => setCustomGuests(e.target.value)}
                      className="input text-xs"
                    />
                  </div>
                </div>

                {/* Prominent Prompt */}
                <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-center mt-3">
                  <p className="text-sm font-display font-semibold text-gold-ink">
                    Do you want to plan it from here now?
                  </p>
                  <p className="text-[11px] text-ink-2 mt-0.5">
                    Launch budget calculation and vendor checklist directly for {selectedDateStr}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onPlanEvent({
                      name: customTitle.trim() || `Celebration on ${selectedDateStr}`,
                      date: selectedDateStr,
                      category: customCategory,
                      guestCount: Number(customGuests) || 200,
                      budget: Number(customBudget) || 1000000,
                    })
                  }
                  className="btn-sheen w-full py-3.5 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <span>Yes, Plan This Event Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-surface-2 hover:bg-line/50 border border-line text-xs font-semibold text-ink-2 hover:text-ink transition-colors"
                >
                  Save to Calendar Only
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

