import React from 'react';
import { Sparkles, Flame, Calendar, Award } from 'lucide-react';
import { FestivalTheme } from '../services/festivalThemeService';

interface FestiveMarqueeTickerProps {
  festival: FestivalTheme;
  onOpenCalendar?: () => void;
  onExploreDiwali?: () => void;
}

export const FestiveMarqueeTicker: React.FC<FestiveMarqueeTickerProps> = ({
  festival,
  onOpenCalendar,
  onExploreDiwali,
}) => {
  const items = festival.marqueeItems || [
    '🪔 Shubh Deepawali 2026: 500+ Curated Sweet & Savory Menus Ready',
    '✨ Eco-Friendly Terracotta Diya & Floral Rangoli Decor Guide Live',
    '🎆 Auspicious Lakshmi Puja Muhurat: 05:39 PM – 07:35 PM',
    '🌟 14,800+ Festivities Planned on Utsav AI across India',
  ];

  return (
    <div
      className="relative w-full overflow-hidden border-y border-line bg-surface-2/75 backdrop-blur-md py-2.5 z-20 group"
      role="region"
      aria-label="Live Festival Announcements and Auspicious Muhurats"
    >
      <div className="marquee-track flex items-center">
        {/* Track 1 */}
        <div className="marquee-content flex items-center gap-8 text-xs sm:text-sm font-medium text-ink">
          {items.map((text, idx) => (
            <div key={`m1-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold text-xs">
                {idx % 2 === 0 ? '🪔' : '✨'}
              </span>
              <span>{text}</span>
              <span className="text-gold/60">•</span>
            </div>
          ))}
          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Open Auspicious Calendar</span>
          </button>
        </div>

        {/* Track 2 duplicate for infinite seamless loop */}
        <div
          className="marquee-content flex items-center gap-8 text-xs sm:text-sm font-medium text-ink"
          aria-hidden="true"
        >
          {items.map((text, idx) => (
            <div key={`m2-${idx}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold text-xs">
                {idx % 2 === 0 ? '🪔' : '✨'}
              </span>
              <span>{text}</span>
              <span className="text-gold/60">•</span>
            </div>
          ))}
          <button
            onClick={onOpenCalendar}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-on-primary text-xs font-semibold transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Open Auspicious Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
