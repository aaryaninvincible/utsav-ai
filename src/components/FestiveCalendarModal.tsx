import React, { useState, useEffect } from 'react';
import {
  Calendar,
  X,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { FESTIVAL_THEMES, FestivalId } from '../services/festivalThemeService';

export interface CalendarEvent {
  id: string;
  festivalId?: FestivalId;
  name: string;
  dateStr: string;
  targetDate: string; // ISO
  category: 'Major Festival' | 'Muhurat' | 'Ritual' | 'National';
  muhuratTime?: string;
  muhuratTitle?: string;
  description: string;
  rituals: string[];
  icon: string;
  accentColor: string;
}

export const CULTURAL_CALENDAR: CalendarEvent[] = [
  {
    id: 'dhanteras-2026',
    festivalId: 'diwali',
    name: 'Dhanteras & Dhantrayodashi',
    dateStr: '10th November 2026',
    targetDate: '2026-11-10T17:30:00',
    category: 'Major Festival',
    muhuratTitle: 'Gold & Utensil Purchase Muhurat',
    muhuratTime: '06:02 PM to 08:00 PM',
    description: 'Inaugural day of Diwali celebrating Lord Dhanvantari and Goddess Lakshmi with auspicious brass & precious metal purchases.',
    rituals: ['Purchasing brass or gold items', 'Lighting first Yamadeep diya', 'Lakshmi-Kuber invocation'],
    icon: '🪙',
    accentColor: '#FFB800',
  },
  {
    id: 'diwali-2026',
    festivalId: 'diwali',
    name: 'Diwali (Lakshmi-Ganesh Deepawali)',
    dateStr: '12th November 2026',
    targetDate: '2026-11-12T18:00:00',
    category: 'Major Festival',
    muhuratTitle: 'Pradosh Kaal Lakshmi Puja',
    muhuratTime: '05:39 PM to 07:35 PM',
    description: 'The supreme Festival of Lights commemorating victory of light over dark, return of Shri Ram to Ayodhya, and worship of Goddess Lakshmi.',
    rituals: ['Lighting 21 or 51 terracotta diyas', 'Floral rangoli at entrance', 'Family feast & gifting handmade sweets', 'Eco-friendly fireworks'],
    icon: '🪔',
    accentColor: '#7928CA',
  },
  {
    id: 'govardhan-2026',
    festivalId: 'diwali',
    name: 'Govardhan Puja & Annakut',
    dateStr: '13th November 2026',
    targetDate: '2026-11-13T09:00:00',
    category: 'Ritual',
    muhuratTitle: 'Govardhan Sayankal Puja',
    muhuratTime: '03:15 PM to 05:25 PM',
    description: 'Offering 56 varieties of delicacies (Chhappan Bhog) in gratitude to mother nature and divine sustenance.',
    rituals: ['Annakut 56-dish culinary feast', 'Cow and nature blessings', 'Communal sweet distribution'],
    icon: '⛰️',
    accentColor: '#E69A37',
  },
  {
    id: 'bhai-dooj-2026',
    festivalId: 'diwali',
    name: 'Bhai Dooj (Yama Dwitiya)',
    dateStr: '14th November 2026',
    targetDate: '2026-11-14T13:10:00',
    category: 'Major Festival',
    muhuratTitle: 'Bhai Dooj Aparahna Muhurat',
    muhuratTime: '01:10 PM to 03:22 PM',
    description: 'Affectionate celebration honoring the sacred bond between brothers and sisters with aarti and tilak ceremony.',
    rituals: ['Tilak & Aarti ritual', 'Exchanging coconut and sweets', 'Special sibling feast'],
    icon: '🎁',
    accentColor: '#D91B5C',
  },
  {
    id: 'chhath-2026',
    festivalId: 'diwali',
    name: 'Chhath Puja Mahaparv',
    dateStr: '17th - 20th November 2026',
    targetDate: '2026-11-17T06:00:00',
    category: 'Major Festival',
    muhuratTitle: 'Sandhya & Usha Arghya',
    muhuratTime: 'Sunset: 05:27 PM | Sunrise: 06:48 AM',
    description: 'Ancient Vedic reverence of Surya Dev (Sun God) and Chhathi Maiya along pristine riverbanks.',
    rituals: ['Nahay Khay & Kharna kheer', 'Offering Thekua prasad in bamboo soop', 'Standing in river for arghya'],
    icon: '☀️',
    accentColor: '#F59E0B',
  },
  {
    id: 'dev-deepawali-2026',
    festivalId: 'diwali',
    name: 'Dev Deepawali (Varanasi Ghats)',
    dateStr: '26th November 2026',
    targetDate: '2026-11-26T17:45:00',
    category: 'Ritual',
    muhuratTitle: 'Pradosh Kaal Dev Deepawali',
    muhuratTime: '05:08 PM to 07:48 PM',
    description: 'Millions of earthen lamps illuminate the 84 ghats of Kashi, welcoming the gods who descend to bathe in the holy Ganges.',
    rituals: ['Floating deepdaan in water', 'Ganga Maha Aarti viewing', 'Vedic chanting'],
    icon: '✨',
    accentColor: '#FFD700',
  },
  {
    id: 'wedding-season-2026',
    festivalId: 'wedding',
    name: 'Royal Winter Vivah Muhurats',
    dateStr: '1st - 15th December 2026',
    targetDate: '2026-12-05T19:00:00',
    category: 'Muhurat',
    muhuratTitle: 'Godhuli Vela Saat Phere',
    muhuratTime: 'Auspicious dates: Dec 2, 4, 7, 8, 9, 14',
    description: 'Peak winter wedding season with ideal weather, palace banquets, and starlit open-air sangeet ceremonies.',
    rituals: ['Hastamelap & Saat Phere', 'Baraat royal procession', 'Grand Sangeet performance', 'Kanyadaan'],
    icon: '👑',
    accentColor: '#800020',
  },
  {
    id: 'new-year-2027',
    festivalId: 'newyear',
    name: 'New Year 2027 Grand Gala',
    dateStr: '31st December 2026',
    targetDate: '2026-12-31T23:59:59',
    category: 'National',
    muhuratTitle: 'Midnight Toast Countdown',
    muhuratTime: '11:59 PM to 12:05 AM',
    description: 'Welcoming the new year with starlit rooftop banquets, live acoustic music, and countdown fireworks.',
    rituals: ['Midnight countdown toast', 'Corporate year-end awards', 'Gala buffet dinner'],
    icon: '🎉',
    accentColor: '#6366F1',
  },
  {
    id: 'makar-sankranti-2027',
    festivalId: 'navratri',
    name: 'Makar Sankranti & Pongal / Lohri',
    dateStr: '14th January 2027',
    targetDate: '2027-01-14T08:00:00',
    category: 'Major Festival',
    muhuratTitle: 'Punya Kaal Muhurat',
    muhuratTime: '07:15 AM to 12:30 PM',
    description: 'Harvest celebration marking the sun entering Capricorn (Makara), celebrated with kite-flying and til-gul sweets.',
    rituals: ['Kite flying competitions', 'Til-gul and jaggery sweets', 'Bonfire and bhangra on Lohri night'],
    icon: '🪁',
    accentColor: '#FF6B00',
  },
  {
    id: 'holi-2027',
    festivalId: 'holi',
    name: 'Holi (Rangwali Holi & Holika Dahan)',
    dateStr: '23rd - 24th March 2027',
    targetDate: '2027-03-24T10:00:00',
    category: 'Major Festival',
    muhuratTitle: 'Holika Dahan Pradosh',
    muhuratTime: '06:35 PM to 08:52 PM',
    description: 'Ecstatic Festival of Colors celebrating the arrival of spring, friendship, and organic herbal gulal play.',
    rituals: ['Holika bonfire lighting', 'Playing with herbal organic colors', 'Kesaria Thandai & Gujiya feast', 'Dhol beats'],
    icon: '🎨',
    accentColor: '#E11D48',
  },
  {
    id: 'eid-2027',
    festivalId: 'eid',
    name: 'Eid-ul-Fitr Milan',
    dateStr: '10th April 2027',
    targetDate: '2027-04-10T08:30:00',
    category: 'Major Festival',
    muhuratTitle: 'Eid Namaz & Greeting Time',
    muhuratTime: '06:45 AM to 08:30 AM',
    description: 'Communal celebration concluding the holy month of Ramadan with warm hugs, charity, and rich feasts.',
    rituals: ['Congregational prayer', 'Distributing Eidi to children', 'Enjoying Sheer Khurma & Biryani with guests'],
    icon: '🌙',
    accentColor: '#065F46',
  }
];

interface FestiveCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFestivalForPlanning: (festivalName: string) => void;
}

export const FestiveCalendarModal: React.FC<FestiveCalendarModalProps> = ({
  isOpen,
  onClose,
  onSelectFestivalForPlanning,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 11,
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  // Countdown timer to Diwali
  useEffect(() => {
    const diwaliTarget = new Date('2026-11-12T18:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = diwaliTarget - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const categories = ['All', 'Major Festival', 'Muhurat', 'Ritual', 'National'];

  const filteredEvents = CULTURAL_CALENDAR.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dateStr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calendar-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl liquid-glass-card border border-white/20 bg-surface/95 text-ink shadow-2xl overflow-hidden">
        
        {/* Header with Diwali Countdown Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-line bg-surface-2/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gold/20 text-gold-ink">
                <Calendar className="w-5 h-5 text-gold" />
              </span>
              <h2 id="calendar-modal-title" className="font-display text-2xl font-bold text-ink">
                Indian Cultural & Festive Calendar
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 mt-1">
              Vedic muhurats, ritual guides & one-click AI planning for all upcoming Indian celebrations.
            </p>
          </div>

          {/* Live Diwali Countdown Widget */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <span className="text-xl">🪔</span>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-primary">
                Diwali Countdown
              </div>
              <div className="font-mono text-sm font-bold flex items-center gap-1">
                <span>{timeLeft.days}d</span>:
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
                <span className="text-gold-ink">{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-ink-2 hover:bg-surface hover:text-ink focus-visible:outline-none"
            aria-label="Close Calendar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-line bg-surface/40">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-ink-2/60" />
            <input
              type="text"
              placeholder="Search festival, muhurat, or ritual..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm border border-line bg-surface/80 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-2 text-ink-2 hover:text-ink hover:bg-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Festival List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-5 rounded-xl border border-line bg-surface/60 hover:bg-surface hover:border-gold/50 transition-all duration-200 shadow-sm group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-surface-2 border border-line shadow-inner flex-shrink-0">
                    {event.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink group-hover:text-primary transition-colors">
                        {event.name}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold/15 text-gold-ink border border-gold/30">
                        {event.dateStr}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-2 mt-1.5 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Muhurat info badge */}
                    {event.muhuratTime && (
                      <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-surface-2/80 border border-line text-xs font-medium text-ink">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span className="font-semibold text-gold-ink">{event.muhuratTitle}:</span>
                        <span>{event.muhuratTime}</span>
                      </div>
                    )}

                    {/* Ritual Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {event.rituals.map((r, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[11px] bg-surface-2 text-ink-2 border border-line"
                        >
                          ✓ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Plan Button */}
                <div className="flex sm:flex-col items-center justify-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      onSelectFestivalForPlanning(event.name);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary text-on-primary hover:brightness-110 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Plan with AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-ink-2">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No festivals found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-surface-2/60 flex items-center justify-between text-xs text-ink-2">
          <span>Hindu, Islamic & Regional Panchang Synced • 2026-2027</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-line bg-surface hover:bg-surface-2 text-ink font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

