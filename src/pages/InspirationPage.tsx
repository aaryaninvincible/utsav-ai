import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Music, 
  Palette, 
  Flame, 
  Crown,
  Compass
} from 'lucide-react';
import { EventCategory } from '../types';

interface InspirationPageProps {
  onPlanTheme: (themeName: string, category: EventCategory) => void;
}

interface ThemeArchetype {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  vibe: string;
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
    vibe: 'Opulent, Regal, Traditional',
    description: 'Inspired by the grand palace courtyards of Jaipur and Udaipur. Heavy marigold floral cascades, vintage brass urlis with floating rose petals, jaali-patterned ambient lanterns, and live Shehnai melodies.',
    colors: [
      { name: 'Royal Crimson', hex: '#541925' },
      { name: 'Genda Marigold', hex: '#E69A37' },
      { name: 'Antique Gold', hex: '#C59A53' },
      { name: 'Ivory Silk', hex: '#FFF8EE' },
    ],
    decorHighlights: [
      'Multi-tiered marigold and mogra floral chandeliers',
      'Hand-beaten brass urlis with floating candles and camphor',
      'Intricate Jaali arches backlit with warm amber glow',
      'Velvet bolster cushions and block-printed floor drapes',
    ],
    musicMood: 'Live classical Rajasthani folk fusion, Manganiyar vocalists, and royal Shehnai welcome.',
    culinaryVibe: 'Live Dal Baati Churma counters, saffron-infused Ghevar, and kulhad masala chai.',
    tag: 'Signature Wedding Theme',
  },
  {
    id: 'minimalist-pastel',
    title: 'Minimalist Pastel Chic & Fairy Sundowner',
    subtitle: 'Understated Elegance with Ambient Drapes',
    category: 'wedding',
    vibe: 'Modern, Airy, Romantic',
    description: 'Clean contemporary silhouettes paired with blush pinks, sage greens, and warm champagne lighting. Ideal for sunset ceremonies, intimate cocktails, and modern terrace banquets.',
    colors: [
      { name: 'Muted Rose', hex: '#C98F91' },
      { name: 'Sage Linen', hex: '#315847' },
      { name: 'Warm Peach', hex: '#F3E0D0' },
      { name: 'Burgundy Shadow', hex: '#702435' },
    ],
    decorHighlights: [
      'Floating fairy-light canopy creating a starlit illusion',
      'White pampas grass and dry floral table runners',
      'Matte gold cutlery and personalized calligraphy place-cards',
      'Geometric wooden pergola draped in raw organic ivory chiffon',
    ],
    musicMood: 'Acoustic indie pop covers, mellow saxophone solos, and lo-fi chill sunset grooves.',
    culinaryVibe: 'Artisanal sourdough bruschetta, wood-fired gourmet pizzas, and signature botanical mocktails.',
    tag: 'Trending for Sundowners',
  },
  {
    id: 'south-indian-temple',
    title: 'South Indian Temple Classical Elegance',
    subtitle: 'Sacred Brass, Mogra & Kanjeevaram Radiance',
    category: 'cultural',
    vibe: 'Devotional, Serene, Auspicious',
    description: 'A sensory celebration steeped in Carnatic grandeur. The intoxicating fragrance of fresh jasmine and vettiver, towering brass Kuthuvilakku oil lamps, lotus ponds, and hand-woven banana leaf tables.',
    colors: [
      { name: 'Deep Maroon', hex: '#541925' },
      { name: 'Kuthu Brass', hex: '#C59A53' },
      { name: 'Pure Jasmine', hex: '#FFF8EE' },
      { name: 'Tender Coconut Green', hex: '#315847' },
    ],
    decorHighlights: [
      'Twin brass Kuthuvilakku lamps standing 6 feet high at the entrance',
      'Intricate Kolam rice-flour rangoli at the sanctum walkway',
      'Strands of aromatic Madurai Malli (jasmine) and vettiver screens',
      'Carved wooden temple pillars with suspended copper bells',
    ],
    musicMood: 'Live Nadaswaram and Thavil welcome, Veena classical recitals during meals.',
    culinaryVibe: 'Traditional 24-dish plantain leaf Sadhya with Elaneer Payasam and freshly pressed filter coffee.',
    tag: 'Auspicious Rituals',
  },
  {
    id: 'cyberpunk-neon',
    title: 'Prism Bass & Cyberpunk Glow',
    subtitle: 'High Voltage Visuals for Youth Summits',
    category: 'fest',
    vibe: 'Electric, Energetic, Futuristic',
    description: 'Designed for college tech and cultural fests. Dynamic LED truss arches, UV blacklight zones, heavy sub-bass rigging, laser projection mapping, and digital photo experiential booths.',
    colors: [
      { name: 'Neon Electric', hex: '#E69A37' },
      { name: 'Deep Midnight', hex: '#1C2133' },
      { name: 'Laser Violet', hex: '#702435' },
      { name: 'Pure Platinum', hex: '#FFF8EE' },
    ],
    decorHighlights: [
      'High-resolution P3 LED stage walls with reactive audio visuals',
      'UV reactive graffiti corridors and photobooths',
      'Industrial scaffolding trussing with moving beam headlights',
      'Silent disco headphones zone for after 10 PM sound curfew',
    ],
    musicMood: 'Progressive EDM, Bollywood bass remix sets, indie rock bands, and battle of the bands.',
    culinaryVibe: 'Food truck street festival: loaded sliders, momos, bubble teas, and nitrogen ice cream.',
    tag: 'Best for Campus Fests',
  },
  {
    id: 'eco-earthy-garden',
    title: 'Earth & Clay Eco-Conscious Gathering',
    subtitle: 'Zero Plastic, Organic Greens & Handcrafted Terracotta',
    category: 'family',
    vibe: 'Grounded, Sustainable, Warm',
    description: 'A celebration that honors sustainability without sacrificing beauty. Terracotta kulhads, potted plant return gifts, seed-paper stationery, and zero single-use plastics.',
    colors: [
      { name: 'Terracotta Clay', hex: '#E69A37' },
      { name: 'Earthy Forest', hex: '#315847' },
      { name: 'Warm Ivory', hex: '#FFF8EE' },
      { name: 'Deep Bark', hex: '#35221F' },
    ],
    decorHighlights: [
      'Potted herbs and ferns as table centerpieces (taken home by guests)',
      'Hand-painted terracotta lamps and jute hangings',
      'Upcycled fabric bunting and banana fiber table runners',
      'Solar-powered ambient fairy bulbs along garden trees',
    ],
    musicMood: 'Acoustic guitar duets, bamboo flute melodies, and bird-chirp garden ambiance.',
    culinaryVibe: 'Farm-to-table organic harvest buffet with millet rotis and raw jaggery desserts.',
    tag: '100% Sustainable',
  },
];

export const InspirationPage: React.FC<InspirationPageProps> = ({ onPlanTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const filteredThemes = selectedCategory === 'all' 
    ? THEMES 
    : THEMES.filter(t => t.category === selectedCategory);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="shell py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="eyebrow">Aesthetic Archetypes</span>
        <h1 className="text-display-md font-bold text-ink font-display">
          Celebration Themes & Moodboards
        </h1>
        <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
          Explore curated design archetypes crafted for Indian celebrations. Click any theme to launch the event wizard pre-loaded with its distinct palette, decor, and culinary pairings.
        </p>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {[
            { id: 'all', label: 'All Moodboards' },
            { id: 'wedding', label: 'Weddings & Sangeet' },
            { id: 'cultural', label: 'Cultural & Poojas' },
            { id: 'fest', label: 'Campus Fests' },
            { id: 'family', label: 'Eco & Family' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedCategory(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === f.id
                  ? 'bg-maroon text-on-primary shadow-sm'
                  : 'bg-surface-2 border border-line text-ink-2 hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredThemes.map((theme) => (
          <div
            key={theme.id}
            className="card p-6 flex flex-col justify-between hover:border-gold/60 hover:shadow-lift transition-all space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <span className="chip text-[10px] font-bold text-gold-ink">
                  {theme.tag}
                </span>
                <span className="text-xs text-ink-2 font-medium">
                  {theme.vibe}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {theme.title}
                </h3>
                <div className="text-xs text-gold-ink font-semibold mt-0.5">
                  {theme.subtitle}
                </div>
              </div>

              <p className="text-xs text-ink-2 leading-relaxed">
                {theme.description}
              </p>

              {/* Color Harmonies */}
              <div className="space-y-2">
                <span className="eyebrow text-[10px]">Color Palette (Click to copy)</span>
                <div className="grid grid-cols-4 gap-2">
                  {theme.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => copyColor(c.hex)}
                      className="p-2 rounded-xl bg-surface-2 border border-line hover:border-gold/50 text-left transition-colors"
                    >
                      <div
                        className="h-8 w-full rounded-lg mb-1 border border-black/10 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="text-[10px] font-semibold text-ink truncate">{c.name}</div>
                      <div className="text-[9px] text-ink-2 font-mono">
                        {copiedColor === c.hex ? 'Copied!' : c.hex}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Decor Elements */}
              <div className="p-3.5 rounded-xl bg-surface-2 border border-line space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-ink uppercase tracking-wider block">
                  Key Decor Elements
                </span>
                {theme.decorHighlights.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-ink-2 text-xs">
                    <span className="text-gold-ink font-bold">•</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Music & Food Pairing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-surface-2 border border-line space-y-1">
                  <div className="flex items-center gap-1.5 text-gold-ink font-semibold">
                    <Music className="w-3.5 h-3.5" />
                    <span>Atmosphere</span>
                  </div>
                  <p className="text-[11px] text-ink-2 leading-relaxed">{theme.musicMood}</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-2 border border-line space-y-1">
                  <div className="flex items-center gap-1.5 text-forest font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Feast Pairing</span>
                  </div>
                  <p className="text-[11px] text-ink-2 leading-relaxed">{theme.culinaryVibe}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onPlanTheme(theme.title, theme.category)}
              className="btn-primary w-full py-3 text-xs shadow-sm"
            >
              <span>Plan Celebration with This Theme</span>
              <ArrowRight className="w-4 h-4 text-gold" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
