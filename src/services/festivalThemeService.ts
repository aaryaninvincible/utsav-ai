export type FestivalId = 'diwali' | 'navratri' | 'wedding' | 'holi' | 'eid' | 'newyear';

export interface FestivalTheme {
  id: FestivalId;
  name: string;
  tagline: string;
  greeting: string;
  dateStr: string;
  targetDate: string; // ISO format for countdown timer
  primaryColor: string;
  secondaryColor: string;
  accentGold: string;
  glowColor: string;
  bgDark: string;
  bgLight: string;
  icon: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerTags: string[];
  bannerImage: string;
  muhurat: {
    title: string;
    time: string;
    significance: string;
  };
  marqueeItems: string[];
}

export const FESTIVAL_THEMES: Record<FestivalId, FestivalTheme> = {
  diwali: {
    id: 'diwali',
    name: 'Diwali',
    tagline: 'Festival of Lights & Prosperity',
    greeting: 'Shubh Deepawali! May lights illuminate your path.',
    dateStr: '12th November',
    targetDate: '2026-11-12T18:00:00',
    primaryColor: '#7928CA',
    secondaryColor: '#FF0080',
    accentGold: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.35)',
    bgDark: '#120524',
    bgLight: '#FAF5FF',
    icon: '🪔',
    bannerTitle: 'Happy Diwali',
    bannerSubtitle: 'Festival of Lights & Divine Blessings',
    bannerTags: ['Diyas & Candles', 'Traditional Sweets', 'Lakshmi Puja', 'Eco-Fireworks'],
    bannerImage: '/assets/hero/diwali-banner.png',
    muhurat: {
      title: 'Lakshmi-Ganesh Puja Muhurat',
      time: '05:39 PM to 07:35 PM (Pradosh Kaal)',
      significance: 'Most auspicious window for invocation of prosperity and light.'
    },
    marqueeItems: [
      '🪔 Diwali Mahotsav 2026: 500+ Curated Sweet & Savory Menus Ready',
      '✨ Eco-Friendly Fireworks & Terracotta Diya Decor Guide Live',
      '🎆 Auspicious Lakshmi Puja Muhurat: 05:39 PM – 07:35 PM',
      '🌟 14,800+ Festivities and Family Gatherings Planned on Utsav AI',
      '🎁 AI Automated Sangeet & Diwali Party Playlist Generators Active'
    ]
  },
  navratri: {
    id: 'navratri',
    name: 'Navratri & Garba',
    tagline: '9 Nights of Sacred Rhythm & Joy',
    greeting: 'Joyous Navratri & Subho Bijoya!',
    dateStr: 'October Festivities',
    targetDate: '2026-10-15T20:00:00',
    primaryColor: '#D91B5C',
    secondaryColor: '#FF6B00',
    accentGold: '#FFD700',
    glowColor: 'rgba(217, 27, 92, 0.35)',
    bgDark: '#1E0614',
    bgLight: '#FFF5F8',
    icon: '💃',
    bannerTitle: 'Joyous Navratri',
    bannerSubtitle: '9 Nights of Dance, Garba Raas & Devotion',
    bannerTags: ['Garba Raas', 'Dandiya Sticks', 'Chaniya Choli', 'Fasting Thali'],
    bannerImage: '/assets/hero/navratri-banner.jpg',
    muhurat: {
      title: 'Ghatasthapana & Aarti Muhurat',
      time: '06:15 AM to 08:22 AM',
      significance: 'Consecration of holy kalash initiating 9 days of Shakti worship.'
    },
    marqueeItems: [
      '💃 Navratri Garba Nights: AI Choreography & Music Mixes Active',
      '✨ Traditional Chaniya Choli & Dandiya Styling Lookbooks Generated',
      '🍛 Satvik Fasting Feasts & 9-Day Prasad Menu Recommendations',
      '🎉 9 Days of Color & Festive Themes Planned Seamlessly'
    ]
  },
  wedding: {
    id: 'wedding',
    name: 'Royal Indian Wedding',
    tagline: 'Timeless Grandeur & Heritage Celebrations',
    greeting: 'Shubh Vivaah! Celebrations of Eternal Union.',
    dateStr: 'Peak Wedding Season',
    targetDate: '2026-12-05T19:30:00',
    primaryColor: '#800020',
    secondaryColor: '#B8860B',
    accentGold: '#C59A53',
    glowColor: 'rgba(197, 154, 83, 0.35)',
    bgDark: '#1C0B10',
    bgLight: '#FFFBF5',
    icon: '👑',
    bannerTitle: 'Royal Vivaah',
    bannerSubtitle: 'Imperial Palaces, Sangeet & Heritage Rituals',
    bannerTags: ['Sangeet Night', 'Mehndi Lounge', 'Baraat Brass Band', 'Royal Mandap'],
    bannerImage: '/assets/hero/royal-wedding-banner.jpg',
    muhurat: {
      title: 'Hastamelap & Saat Phere Muhurat',
      time: '07:15 PM to 09:45 PM (Godhuli Vela)',
      significance: 'Celestial alignment for enduring companionship and prosperity.'
    },
    marqueeItems: [
      '👑 Royal Indian Wedding Season: 1,200+ Palace Venues Curated',
      '🎶 AI Sangeet Scripting & Custom Wedding Invitation Poetry Generator',
      '💐 Fresh Marigold & Jasmine Floral Architecture Blueprints',
      '💰 Smart Budget Optimizer: Saving average families ₹2.4 Lakhs on Vendor Quotes'
    ]
  },
  holi: {
    id: 'holi',
    name: 'Holi Colors',
    tagline: 'Vibrant Colors, Music & Sweet Joy',
    greeting: 'Bura Na Mano, Holi Hai! Colors of Togetherness.',
    dateStr: 'March 2027',
    targetDate: '2027-03-24T10:00:00',
    primaryColor: '#E11D48',
    secondaryColor: '#06B6D4',
    accentGold: '#F59E0B',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    bgDark: '#0D131F',
    bgLight: '#FDF4F8',
    icon: '🎨',
    bannerTitle: 'Rangotsav Holi',
    bannerSubtitle: 'Organic Gulal, Dhol Beats & Spring Celebration',
    bannerTags: ['Organic Gulal', 'Kesaria Thandai', 'Dhol Tasha', 'Floral Holi'],
    bannerImage: '/assets/hero/holi-banner.jpg',
    muhurat: {
      title: 'Holika Dahan Pradosh Muhurat',
      time: '06:35 PM to 08:52 PM',
      significance: 'Triumph of righteousness and dispelling of negativity.'
    },
    marqueeItems: [
      '🎨 Rangotsav Special: Organic Skin-Safe Flower Petal & Gulal Sourcing',
      '🥛 Royal Kesaria Thandai & Gujiya Artisan Recipe Kits',
      '🥁 High-Energy Rain Dance & Dhol Troupe Booking Directory',
      '🌿 Eco-Friendly Zero-Waste Holi Community Guide Available'
    ]
  },
  eid: {
    id: 'eid',
    name: 'Eid Milan',
    tagline: 'Peace, Grace & Festivities',
    greeting: 'Eid Mubarak! May joy and warmth fill your home.',
    dateStr: 'Festive Season',
    targetDate: '2027-04-10T08:00:00',
    primaryColor: '#065F46',
    secondaryColor: '#10B981',
    accentGold: '#E5E7EB',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    bgDark: '#051912',
    bgLight: '#F0FDF8',
    icon: '🌙',
    bannerTitle: 'Eid Mubarak',
    bannerSubtitle: 'Feasts of Harmony, Kindness & Family Reunions',
    bannerTags: ['Sheer Khurma', 'Iftar Banquet', 'Eidi Gift Envelopes', 'Henna Night'],
    bannerImage: '/assets/events/banquet-hall-1200.webp',
    muhurat: {
      title: 'Eid-ul-Fitr Morning Prayer',
      time: '06:45 AM to 07:30 AM',
      significance: 'Congregational gratitude, unity, and communal feast blessing.'
    },
    marqueeItems: [
      '🌙 Eid Milan Celebrations: Royal Dastarkhwan & Sheer Khurma Menu Blueprints',
      '🎁 AI Curated Eidi Gifting & Sustainable Artisan Hampers',
      '✨ Moonlit Banquet Styling & Arabic Calligraphy Backdrop Concepts',
      '🕊️ Community Dastarkhwan & Charity Drive Coordination Tools'
    ]
  },
  newyear: {
    id: 'newyear',
    name: 'New Year & Gala',
    tagline: 'Fresh Beginnings & Dazzling Toasts',
    greeting: 'Happy New Year! Here is to new horizons.',
    dateStr: '31st Dec - 1st Jan',
    targetDate: '2026-12-31T23:59:59',
    primaryColor: '#1E293B',
    secondaryColor: '#6366F1',
    accentGold: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    bgDark: '#0A0E1A',
    bgLight: '#F8FAFC',
    icon: '🎉',
    bannerTitle: 'Grand New Year Gala',
    bannerSubtitle: 'Midnight Countdown, Live DJ & Starlit Elegance',
    bannerTags: ['Midnight Countdown', 'Sparkler Toast', 'Live Band', 'Canapés Buffet'],
    bannerImage: '/assets/hero/palace-sunset-1200.webp',
    muhurat: {
      title: 'Midnight Toast Countdown',
      time: '11:59:50 PM',
      significance: 'Welcoming the upcoming annum with shared joy and resolution.'
    },
    marqueeItems: [
      '🎉 New Year 2027 Gala: Dynamic Midnight Pyro & Drone Show Coordination',
      '🥂 Starlit Rooftop & Banquet Booking Discounts Live',
      '🎵 Seamless 4-Hour Live Band & Electro-Swing DJ Master Playlist',
      '🌟 Exclusive Corporate Year-End Award Night Templates'
    ]
  }
};

/**
 * Automatically detects the current or upcoming Indian festival based on the calendar date.
 * Allows user override via localStorage ('utsav_festival_theme').
 */
export function getActiveFestivalTheme(): FestivalTheme {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('utsav_festival_theme') as FestivalId | null;
    if (saved && FESTIVAL_THEMES[saved]) {
      return FESTIVAL_THEMES[saved];
    }
  }

  // Automatic date-based detection
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 10 = Nov, etc.
  const day = now.getDate();

  // October & November -> Diwali season
  if (month === 9 || month === 10) {
    return FESTIVAL_THEMES.diwali;
  }
  // September -> Navratri
  if (month === 8) {
    return FESTIVAL_THEMES.navratri;
  }
  // December -> Wedding Season / New Year
  if (month === 11) {
    return day > 20 ? FESTIVAL_THEMES.newyear : FESTIVAL_THEMES.wedding;
  }
  // March -> Holi
  if (month === 2) {
    return FESTIVAL_THEMES.holi;
  }
  // Default to Diwali as the premier festival
  return FESTIVAL_THEMES.diwali;
}

export function setFestivalTheme(id: FestivalId) {
  if (typeof window !== 'undefined' && FESTIVAL_THEMES[id]) {
    localStorage.setItem('utsav_festival_theme', id);
    // Apply festival theme CSS variables to document root
    applyThemeVariables(FESTIVAL_THEMES[id]);
  }
}

export function applyThemeVariables(theme: FestivalTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--fest-primary', theme.primaryColor);
  root.style.setProperty('--fest-secondary', theme.secondaryColor);
  root.style.setProperty('--fest-gold', theme.accentGold);
  root.style.setProperty('--fest-glow', theme.glowColor);
  root.style.setProperty('--fest-bg-dark', theme.bgDark);
}
