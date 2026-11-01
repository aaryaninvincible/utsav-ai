import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Music,
  Utensils,
  X,
  ArrowUpRight,
  Film,
} from 'lucide-react';
import { EventCategory } from '../types';

interface InspirationPageProps {
  onPlanTheme: (themeName: string, category: EventCategory) => void;
}

type FilterCategory = 'all' | 'wedding' | 'birthday' | 'cultural' | 'corporate' | 'family';

interface ThemeArchetype {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  filterGroup: FilterCategory;
  categoryLabel: string;
  vibe: string;
  image: string;
  fallbackImage: string;
  description: string;
  colors: { name: string; hex: string }[];
  decorHighlights: string[];
  musicMood: string;
  culinaryVibe: string;
  tag: string;
}

const THEMES: ThemeArchetype[] = [
  {
    id: 'royal-rajputana',
    title: 'Royal Rajputana & Marigold Splendor',
    subtitle: 'Timeless Palace Grandeur with Heritage Flair',
    category: 'wedding',
    filterGroup: 'wedding',
    categoryLabel: 'WEDDING',
    vibe: 'Opulent • Regal • Traditional',
    image: '/assets/gallery/royal-rajputana.webp',
    fallbackImage: '/assets/events/marigold-mandap-1200.webp',
    description:
      'Inspired by the grand palace courtyards of Jaipur and Udaipur. Heavy marigold floral cascades, vintage brass urlis with floating rose petals, jaali-patterned ambient lanterns, and live Shehnai melodies.',
    colors: [
      { name: 'Royal Crimson', hex: '#541925' },
      { name: 'Genda Marigold', hex: '#E69A37' },
      { name: 'Antique Gold', hex: '#C59A53' },
      { name: 'Ivory Silk', hex: '#FFF8EE' },
    ],
    decorHighlights: [
      'Multi-tiered marigold & mogra floral chandeliers',
      'Hand-beaten brass urlis with floating candles',
      'Backlit Jaali arches with warm amber uplighting',
      'Velvet bolster seating & block-printed drapes',
    ],
    musicMood:
      'Live classical Rajasthani folk fusion, Manganiyar vocalists, and royal Shehnai welcome.',
    culinaryVibe:
      'Live Dal Baati Churma counters, saffron-infused Ghevar, and kulhad masala chai.',
    tag: 'Signature Wedding Theme',
  },
  {
    id: 'minimalist-pastel',
    title: 'Minimalist Pastel Chic & Fairy Sundowner',
    subtitle: 'Airy Ivory Drapes, Blush Florals & Sunset Garden Glow',
    category: 'wedding',
    filterGroup: 'wedding',
    categoryLabel: 'WEDDING',
    vibe: 'Modern • Airy • Romantic',
    image: '/assets/gallery/pastel-sundowner.webp',
    fallbackImage: '/assets/hero/eventara-night-venue.jpg',
    description:
      'Clean contemporary silhouettes paired with blush pinks, sage greens, and warm champagne lighting. Ideal for sunset ceremonies, intimate outdoor vows, and modern garden banquets.',
    colors: [
      { name: 'Blush Rose', hex: '#C98F91' },
      { name: 'Sage Foliage', hex: '#315847' },
      { name: 'Warm Peach', hex: '#F3E0D0' },
      { name: 'Champagne Gold', hex: '#D4AF6C' },
    ],
    decorHighlights: [
      'Floating fairy-light canopy creating a starlit ceiling',
      'White pampas grass & blush rose table runners',
      'Brushed gold cutlery & calligraphed place cards',
      'Wooden garden pergola draped in airy ivory chiffon',
    ],
    musicMood:
      'Acoustic indie covers, mellow saxophone solos, and golden-hour sunset grooves.',
    culinaryVibe:
      'Artisanal grazing tables, wood-fired gourmet flatbreads, and botanical mocktails.',
    tag: 'Trending for Sundowners',
  },
  {
    id: 'monsoon-mehndi',
    title: 'Monsoon Mehndi Garden',
    subtitle: 'Lush Foliage, Henna Lounge & Sunlight Yellow Florals',
    category: 'family',
    filterGroup: 'family',
    categoryLabel: 'FAMILY CELEBRATION',
    vibe: 'Lush • Intimate • Botanical',
    image: '/assets/gallery/monsoon-mehndi.webp',
    fallbackImage: '/assets/events/mehndi-lounge-1200.webp',
    description:
      'An intimate daytime courtyard celebration surrounded by tropical palms, marigold and sunflower swings, vibrant mirror-work cushions, and live organic henna stations.',
    colors: [
      { name: 'Emerald Leaf', hex: '#2D5A43' },
      { name: 'Turmeric Gold', hex: '#EAB338' },
      { name: 'Bougainvillea Pink', hex: '#C84B68' },
      { name: 'Raw Linen', hex: '#F9F3E8' },
    ],
    decorHighlights: [
      'Floral jhoola (swing) wrapped in yellow marigolds & ferns',
      'Rajasthani mirror-work umbrellas & low diwan seating',
      'Bespoke henna & flower-jewelry favour bar',
      'Hanging cane baskets with cascading tropical greens',
    ],
    musicMood:
      'Dholki folk songs, upbeat acoustic dhol beats, and breezy daytime celebratory playlists.',
    culinaryVibe:
      'Chaat carts, chilled Aam Panna & Jamun shots, kulfi falooda, and bite-sized finger foods.',
    tag: 'Intimate Courtyard',
  },
  {
    id: 'modern-cocktail',
    title: 'Modern Cocktail Soirée',
    subtitle: 'Deep Wine Tones, Candlelit Tablescapes & Velvet Lounge',
    category: 'corporate',
    filterGroup: 'corporate',
    categoryLabel: 'CORPORATE',
    vibe: 'Sophisticated • Candlelit • Chic',
    image: '/assets/gallery/modern-cocktail.webp',
    fallbackImage: '/assets/events/banquet-hall-1200.webp',
    description:
      'Tailored for black-tie receptions, executive galas, and milestone evening soirées. Rich burgundy velvet drapery, tall brass taper holders, crystal glassware, and moody architectural lighting.',
    colors: [
      { name: 'Bordeaux Wine', hex: '#4A1625' },
      { name: 'Burnished Brass', hex: '#C89B54' },
      { name: 'Obsidian Plum', hex: '#180B11' },
      { name: 'Champagne Cream', hex: '#F5E9DC' },
    ],
    decorHighlights: [
      'Long banquet tables with tall brass taper candles',
      'Deep crimson orchid & dark calla lily floral runners',
      'Custom-lit marble bar counter with monogram backdrop',
      'Warm pin-spot lighting on every table centerpiece',
    ],
    musicMood:
      'Live jazz quartet during welcome hour followed by curated deep-house and lounge sets.',
    culinaryVibe:
      'Plated five-course tasting menu, truffle dim sum pass-arounds, and craft zero-proof elixirs.',
    tag: 'Evening Gala & Soirée',
  },
  {
    id: 'diwali-glow',
    title: 'Festive Diwali Glow',
    subtitle: 'Hundreds of Earthen Diyas, Rangoli & Amber Lanterns',
    category: 'cultural',
    filterGroup: 'cultural',
    categoryLabel: 'CULTURAL EVENT',
    vibe: 'Radiant • Auspicious • Warm',
    image: '/assets/gallery/diwali-glow.webp',
    fallbackImage: '/assets/events/community-festival-1200.webp',
    description:
      'A radiant celebration of light and togetherness. Courtyards lined with hundreds of flickering brass and terracotta diyas, fresh flower petal rangolis, golden torans, and warm family dining.',
    colors: [
      { name: 'Diya Amber', hex: '#F29F38' },
      { name: 'Kumkum Red', hex: '#8C2332' },
      { name: 'Kansa Bronze', hex: '#B68642' },
      { name: 'Saffron Ivory', hex: '#FFF6E6' },
    ],
    decorHighlights: [
      'Pathways lined with hand-lit terracotta & brass diyas',
      'Fresh rose, marigold & mango-leaf doorway torans',
      'Central lotus urli surrounded by geometric flower rangoli',
      'Warm hanging paper & brass star lanterns',
    ],
    musicMood:
      'Soulful sitar and flute instrumentals transitioning into festive celebratory classics.',
    culinaryVibe:
      'Artisanal mithai platters with pistachio barfi, saffron rasmalai, and festivechaat stations.',
    tag: 'Festival of Lights',
  },
  {
    id: 'contemporary-birthday',
    title: 'Contemporary Birthday Party',
    subtitle: 'Sculptural Cake Table, Floral Arches & Joyful Lighting',
    category: 'birthday',
    filterGroup: 'birthday',
    categoryLabel: 'BIRTHDAY',
    vibe: 'Joyful • Polished • Celebratory',
    image: '/assets/gallery/contemporary-birthday.webp',
    fallbackImage: '/assets/events/birthday-cake-luxury.jpg',
    description:
      'Designed for milestone 1st, 21st, 30th, or 50th birthdays. A sculptural cake pedestal framed by asymmetric floral and pastel arches, custom neon/gold signage, and interactive guest stations.',
    colors: [
      { name: 'Champagne Gold', hex: '#E5A855' },
      { name: 'Coral Rose', hex: '#D75C75' },
      { name: 'Soft Cream', hex: '#FFF8F2' },
      { name: 'Espresso Ink', hex: '#2A1A20' },
    ],
    decorHighlights: [
      'Spotlighted multi-tier cake plinth with fresh floral cascade',
      'Custom acrylic & brushed-brass milestone backdrop arch',
      'Curated Polaroid guestbook & keepsake favour wall',
      'Warm bistro string lights & candlelit dessert bar',
    ],
    musicMood:
      'Upbeat celebratory mixes, live acoustic requests, and high-energy dance floor favourites.',
    culinaryVibe:
      'Custom tiered celebration cake, artisanal sliders, gourmet pasta bar, and signature mocktails.',
    tag: 'Milestone Celebration',
  },
];

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'All Themes' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'cultural', label: 'Cultural Events' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'family', label: 'Family Celebrations' },
];

export const InspirationPage: React.FC<InspirationPageProps> = ({ onPlanTheme }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [activeTheme, setActiveTheme] = useState<ThemeArchetype | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [revealedHexes, setRevealedHexes] = useState<Record<string, boolean>>({});
  const [imgFallbacks, setImgFallbacks] = useState<Record<string, boolean>>({});

  const filteredThemes =
    selectedFilter === 'all'
      ? THEMES
      : THEMES.filter((t) => t.filterGroup === selectedFilter);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeTheme) {
        setActiveTheme(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTheme]);

  const handleCopyColor = (hex: string) => {
    try {
      navigator.clipboard.writeText(hex);
    } catch {}
    setCopiedHex(hex);
    setRevealedHexes((prev) => ({ ...prev, [hex]: true }));
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getThemeImage = (theme: ThemeArchetype) =>
    imgFallbacks[theme.id] ? theme.fallbackImage : theme.image;

  return (
    <div className="relative min-h-screen bg-bg text-ink py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* =====================================================================
            CONCISE CENTERED PAGE INTRO + SIMPLIFIED FILTER CHIPS
            ===================================================================== */}
        <header className="text-center max-w-2xl mx-auto space-y-3.5">
          <span className="eyebrow">CURATED CELEBRATION IDEAS</span>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-semibold text-ink tracking-tight leading-[1.08]">
            Find a Theme That Feels Like You
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-2 leading-relaxed">
            Explore visual ideas for weddings, birthdays, cultural celebrations, and more.
          </p>

          {/* Simplified Filter Chips */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 pt-3"
            role="tablist"
            aria-label="Filter themes by celebration type"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                    isActive
                      ? 'bg-gradient-to-r from-[#571B32] to-[#3B1222] dark:from-[#E07A5F] dark:to-[#F2B866] text-[#FFF8F2] dark:text-[#241015] font-semibold border border-gold/50 shadow-sm'
                      : 'bg-surface-2/80 dark:bg-white/[0.04] hover:bg-surface-2 dark:hover:bg-white/[0.09] border border-line text-ink-2 hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {/* =====================================================================
            IMAGE-FIRST VISUAL GALLERY GRID (Desktop: 3, Tablet: 2, Mobile: 1)
            ===================================================================== */}
        <div
          key={selectedFilter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 animate-fadeIn"
        >
          {filteredThemes.map((theme) => (
            <article
              key={theme.id}
              onClick={() => setActiveTheme(theme)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveTheme(theme);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${theme.title} — ${theme.vibe}. Click to view theme details.`}
              className="group relative aspect-[4/5] w-full rounded-[26px] overflow-hidden cursor-pointer border border-gold/25 hover:border-gold/75 shadow-[0_14px_36px_-12px_rgba(42,26,32,0.18)] dark:shadow-[0_18px_42px_-12px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold bg-[#160B11]"
            >
              {/* Primary Visual Image */}
              <img
                src={getThemeImage(theme)}
                alt={`${theme.title} — ${theme.subtitle}`}
                onError={() =>
                  setImgFallbacks((prev) => ({ ...prev, [theme.id]: true }))
                }
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom-Only Dark Gradient Overlay for Crisp Readability in Both Themes */}
              <div
                className="absolute inset-x-0 bottom-0 h-[58%] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(16, 8, 12, 0.94) 0%, rgba(16, 8, 12, 0.68) 48%, transparent 100%)',
                }}
              />

              {/* Minimal Card Content: Category Chip + Title + Short Mood Line + View Affordance */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                <div className="space-y-1.5 text-left">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 group-hover:bg-[#F1C27D]/25 backdrop-blur-md border border-[#F1C27D]/40 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F1C27D] transition-colors">
                    {theme.categoryLabel}
                  </span>

                  <h2 className="font-display text-2xl sm:text-[26px] font-semibold text-[#F8F0E9] leading-tight">
                    {theme.title}
                  </h2>

                  <p className="font-sans text-xs text-[#F7EEE9]/78 tracking-wide">
                    {theme.vibe}
                  </p>
                </div>

                {/* Small Arrow Affordance Button */}
                <span
                  className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#E07A5F] group-hover:to-[#F2B866] border border-white/25 group-hover:border-[#FCE1B2] flex items-center justify-center text-[#F8F0E9] group-hover:text-[#241015] flex-shrink-0 transition-all duration-200 shadow-md"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* =======================================================================
          THEME DETAIL MODAL (Progressive Disclosure: Palette, Decor, Music, Food)
          ======================================================================= */}
      {activeTheme && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="theme-detail-title"
          onClick={() => setActiveTheme(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface text-ink border border-gold/35 shadow-2xl transition-all"
          >
            {/* Top Image Banner inside Modal */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#160B11]">
              <img
                src={getThemeImage(activeTheme)}
                alt={activeTheme.title}
                onError={() =>
                  setImgFallbacks((prev) => ({ ...prev, [activeTheme.id]: true }))
                }
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(18, 9, 14, 0.92) 0%, rgba(18, 9, 14, 0.35) 55%, rgba(18, 9, 14, 0.3) 100%)',
                }}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveTheme(null)}
                aria-label="Close theme details"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Ambient Video Teaser Slot Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-medium text-[#F1C27D]">
                <Film className="w-3.5 h-3.5" />
                <span>{activeTheme.tag}</span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-5 left-6 right-6 space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F1C27D]/20 border border-[#F1C27D]/45 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F1C27D]">
                    {activeTheme.categoryLabel}
                  </span>
                  <span className="text-xs text-[#F7EEE9]/80 font-medium">
                    {activeTheme.vibe}
                  </span>
                </div>
                <h2
                  id="theme-detail-title"
                  className="font-display text-2xl sm:text-4xl font-semibold text-[#F8F0E9]"
                >
                  {activeTheme.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#F1C27D] font-medium">
                  {activeTheme.subtitle}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-7">
              
              {/* Overview Description */}
              <p className="font-sans text-sm sm:text-base text-ink-2 leading-relaxed">
                {activeTheme.description}
              </p>

              {/* Visual Color Swatches (Hex hidden by default, shown on hover or Copy click) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[11px]">Color Palette</span>
                  <span className="text-[11px] text-ink-2">
                    Hover or click a swatch to copy color
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeTheme.colors.map((color) => {
                    const isCopied = copiedHex === color.hex;
                    const isRevealed = revealedHexes[color.hex];
                    return (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => handleCopyColor(color.hex)}
                        className="group p-2.5 rounded-2xl bg-surface-2/80 border border-line hover:border-gold/60 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        <div
                          className="h-14 w-full rounded-xl mb-2 border border-black/10 shadow-inner transition-transform group-hover:scale-[1.02]"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-semibold text-ink truncate">
                            {color.name}
                          </span>
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                          ) : (
                            <Copy className="w-3 h-3 text-ink-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          )}
                        </div>
                        <div
                          className={`text-[10px] font-mono text-gold-ink mt-0.5 transition-opacity ${
                            isCopied || isRevealed
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                          }`}
                        >
                          {isCopied ? `Copied ${color.hex}` : color.hex}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Icon-Led Compact Sections: Decor Highlights, Atmosphere, Food & Drinks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Sparkles: Decor Highlights */}
                <div className="p-4 rounded-2xl bg-surface-2/70 border border-line space-y-2.5">
                  <div className="flex items-center gap-2 text-gold-ink font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Decor Highlights</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-ink-2 leading-relaxed">
                    {activeTheme.decorHighlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gold font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Music: Atmosphere */}
                <div className="p-4 rounded-2xl bg-surface-2/70 border border-line space-y-2.5">
                  <div className="flex items-center gap-2 text-gold-ink font-semibold text-xs uppercase tracking-wider">
                    <Music className="w-4 h-4 text-gold" />
                    <span>Atmosphere</span>
                  </div>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {activeTheme.musicMood}
                  </p>
                </div>

                {/* 3. Utensils: Food & Drinks */}
                <div className="p-4 rounded-2xl bg-surface-2/70 border border-line space-y-2.5">
                  <div className="flex items-center gap-2 text-gold-ink font-semibold text-xs uppercase tracking-wider">
                    <Utensils className="w-4 h-4 text-gold" />
                    <span>Food and Drinks</span>
                  </div>
                  <p className="text-xs text-ink-2 leading-relaxed">
                    {activeTheme.culinaryVibe}
                  </p>
                </div>

              </div>

              {/* Action Row: Strong Primary CTA + Secondary Close Control */}
              <div className="pt-4 border-t border-line flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTheme(null)}
                  className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 rounded-full bg-surface-2 hover:bg-line/60 border border-line text-xs sm:text-sm font-semibold text-ink transition-colors"
                >
                  Back to Gallery
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const chosen = activeTheme;
                    setActiveTheme(null);
                    onPlanTheme(chosen.title, chosen.category);
                  }}
                  className="btn-sheen w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-xs sm:text-sm border border-[#FCE1B2]/60 shadow-lg"
                >
                  <span>Plan Celebration with This Theme</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
