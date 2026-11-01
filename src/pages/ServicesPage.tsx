import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Wand2,
  Headphones,
  Music,
  Utensils,
  Camera,
  Gem,
  Award,
  Clock,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { EventCategory } from '../types';

interface ServicesPageProps {
  onPlanEvent: (category?: EventCategory) => void;
  onOpenCalendar: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onPlanEvent, onOpenCalendar }) => {
  const [selectedService, setSelectedService] = useState<string>('weddings');

  const services = [
    {
      id: 'weddings',
      title: 'Full-Service Royal Wedding Production',
      icon: '💍',
      tagline: 'From Saat Phere to Sangeet choreography, tailored down to the last flower petal.',
      badge: 'Signature Service',
      description:
        'End-to-end orchestration of multi-day Indian heritage weddings. We oversee venue scouting across palaces and luxury resorts, Vedic priest coordination, bespoke bridal hospitality, and minute-by-minute execution.',
      highlights: [
        'Palace & heritage resort acquisition with zero hidden markups',
        'Vedic Muhurat alignment & authentic ritual samagri curation',
        'Bridal suite concierge, Baraat brass band & royal elephant welcome',
        'Customized digital invitations & guest RSVP management',
      ],
      priceGuide: '₹15L – ₹1.5Cr+',
      categoryKey: 'wedding' as EventCategory,
    },
    {
      id: 'decor',
      title: 'Bespoke Floral & 3D Stage Architecture',
      icon: '🪷',
      tagline: 'Transforming venues into timeless starlit wonderlands with 3D CAD blueprints.',
      badge: 'Visual Craftsmanship',
      description:
        'Our design team models custom 3D venue visualizations before a single flower is cut. From fresh Dutch rose and marigold mandaps to crystal chandelier ceilings, fairy-lit courtyards, and fragrant mogra arches.',
      highlights: [
        'Interactive 3D WebGL pre-visualization of stage & seating',
        'Fresh flower procurement directly from Bangalore & Kolkata growers',
        'Custom structural trusses, warm ambient uplighting & fairy light canopies',
        'Sustainable, zero-waste eco floral recycling post-celebration',
      ],
      priceGuide: '₹3L – ₹40L',
      categoryKey: 'wedding' as EventCategory,
    },
    {
      id: 'catering',
      title: 'Gourmet Culinary Curation & Mixology',
      icon: '🍽️',
      tagline: 'Culinary journeys celebrating regional royal cuisines and molecular gastronomy.',
      badge: 'Master Chefs',
      description:
        'Food is the heartbeat of every celebration. We partner with India’s foremost master chefs and regional culinary artisans to craft unforgettable vegetarian, Jain, royal Awadhi, and multi-cuisine feasts.',
      highlights: [
        'Authentic regional live counters (Kolkata Chaat, Amritsari Kulcha, Chettinad)',
        'Traditional silver thali banquets & royal Dastarkhwan setups',
        'Artisanal dessert stations, dry-fruit halwas & modern sweet carts',
        'Craft mocktail bars with fresh botanicals, saffron, and edible gold leaf',
      ],
      priceGuide: '₹1,500 – ₹6,500 / plate',
      categoryKey: 'wedding' as EventCategory,
    },
    {
      id: 'entertainment',
      title: 'Celebrity Artists & Live Entertainment',
      icon: '🎶',
      tagline: 'High-energy Sangeet performances, soulful Sufi nights, and top DJs.',
      badge: 'Curated Talent',
      description:
        'Curating unforgettable entertainment tailored to your family and guests. From booking renowned playback singers and Bollywood choreographers to traditional Shehnai masters and high-octane live bands.',
      highlights: [
        'Bollywood celebrity & artist booking with verified technical riders',
        'Custom Sangeet choreography with rehearsal tracks & video guides',
        'Line-array audio systems, concert-grade intelligent moving heads',
        'Folk troupes (Rajasthani Kalbelia, Punjabi Dhol, Gujarati Garba Raas)',
      ],
      priceGuide: '₹2L – ₹35L',
      categoryKey: 'fest' as EventCategory,
    },
    {
      id: 'vendors',
      title: 'Transparent Vendor Audits & Contracting',
      icon: '🛡️',
      tagline: 'Deterministic INR budgeting with zero vendor kickbacks or surprise fees.',
      badge: '100% Transparent',
      description:
        'We vet, negotiate, and audit every photographer, makeup artist, sound engineer, and florist. Every contract includes milestone deliverables, cancellation terms, and verified insurance.',
      highlights: [
        'Comprehensive vendor contract review & milestone escrow terms',
        'Deterministic INR budgeting with automated contingency buffers',
        'Direct-to-client payment routing with zero secret agency commissions',
        'Emergency backup vendor protocol for all critical assignments',
      ],
      priceGuide: 'Included with all planning tiers',
      categoryKey: 'wedding' as EventCategory,
    },
    {
      id: 'corporate',
      title: 'Corporate Galas & Leadership Summits',
      icon: '💼',
      tagline: 'Flawless production for year-end award nights and international summits.',
      badge: 'Enterprise Grade',
      description:
        'Sophisticated corporate event management blending prestige with precise logistical coordination. Multi-camera livestreaming, VIP green rooms, keynote staging, and gala banquets.',
      highlights: [
        'High-resolution LED video walls & teleprompter systems',
        'VIP keynote speaker logistics, airport transfers & security',
        'Custom corporate branding, stage fabrication & collateral',
        'Post-event analytical reporting & attendee satisfaction tracking',
      ],
      priceGuide: '₹8L – ₹80L',
      categoryKey: 'fest' as EventCategory,
    },
  ];

  const packages = [
    {
      name: 'Intimate Soiree',
      tagline: 'For intimate milestones, birthdays & sacred poojas (20 – 100 guests)',
      price: '₹1.5 Lakhs onwards',
      features: [
        'Complete timeline & vendor coordination',
        'Curated menu planning & seating blueprint',
        'Floral decor design & ambient lighting',
        'Single lead coordinator on event day',
      ],
      popular: false,
    },
    {
      name: 'Royal Heritage Signature',
      tagline: 'Our premier service for grand Indian weddings & luxury multi-day festivities',
      price: '₹5.5 Lakhs onwards',
      features: [
        'End-to-end wedding production & palace logistics',
        'Custom 3D CAD stage visualization & floral mandap',
        'Master chef tasting sessions & mixology bar',
        'Sangeet choreography & artist rider management',
        'Full 6-member coordinator team on-site 24/7',
        'Guest hospitality desk & airport concierge',
      ],
      popular: true,
    },
    {
      name: 'Grand Gala Production',
      tagline: 'High-production corporate award nights, cultural fests & concerts',
      price: '₹4.0 Lakhs onwards',
      features: [
        'Concert audio/visual rig & intelligent lighting',
        'Celebrity artist booking & security riders',
        'Multi-angle 4K livestreaming & drone coverage',
        'VIP hospitality & catering management',
      ],
      popular: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-bg text-ink selection:bg-gold selection:text-bg pb-24 transition-colors duration-300">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-gold/10 filter blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-maroon/10 filter blur-[160px] pointer-events-none" />

      {/* Hero Header */}
      <div className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-xs font-semibold text-gold-ink uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Event Services</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight leading-tight">
          Bespoke Craftsmanship for <br />
          <span className="italic font-normal text-gold-ink">
            Unforgettable Celebrations
          </span>
        </h1>

        <p className="text-sm sm:text-base text-ink-2 max-w-2xl mx-auto leading-relaxed">
          From heritage mandap architecture to gourmet culinary banquets, explore service categories and planning guidance tailored to your occasion.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onPlanEvent('wedding')}
            className="btn-sheen px-7 py-3 rounded-full bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] font-semibold text-xs shadow-md flex items-center gap-2"
          >
            <span>Plan for Your Date</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onOpenCalendar}
            className="px-6 py-3 rounded-full bg-surface-2 hover:bg-line/50 border border-line text-ink font-semibold text-xs transition-colors"
          >
            Check Auspicious Muhurats
          </button>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-6 sm:p-7 rounded-3xl eventara-editorial-card eventara-editorial-card-interactive group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 rounded-2xl bg-surface-2 border border-line group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold/15 text-gold-ink border border-gold/30">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-gold-ink transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-ink-2 leading-relaxed">
                  {srv.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-line">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-2">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-ink flex items-start gap-2">
                        <span className="text-gold-ink text-xs">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-ink-2 block">Estimated Allocation Guide</span>
                  <span className="text-xs font-bold text-gold-ink">{srv.priceGuide}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onPlanEvent(srv.categoryKey)}
                  className="px-4 py-2 rounded-full bg-surface-2 hover:bg-gold hover:text-bg border border-line text-xs font-semibold text-ink transition-all flex items-center gap-1.5"
                >
                  <span>Select</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing / Packages Comparison Section */}
        <div className="mt-20 pt-10 border-t border-line">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Sample Planning Tiers
            </h2>
            <p className="text-xs sm:text-sm text-ink-2">
              Illustrative planning tiers for budgeting reference. Always confirm final vendor availability, quotes, and contracts directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-3xl transition-all ${
                  pkg.popular
                    ? 'eventara-editorial-card border-2 border-gold shadow-lg relative'
                    : 'eventara-editorial-card'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#D97736] to-[#E5A855] text-[#12090E] text-[10px] font-bold uppercase tracking-widest shadow-md">
                    Popular Tier
                  </div>
                )}
                <h4 className="font-display text-2xl font-semibold text-ink">{pkg.name}</h4>
                <p className="text-xs text-ink-2 mt-1 min-h-[36px]">{pkg.tagline}</p>

                <div className="my-6 py-4 border-y border-line">
                  <span className="text-[10px] text-ink-2 uppercase tracking-widest block">Reference Guide</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-gold-ink">
                    {pkg.price}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-ink mb-8">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gold-ink font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onPlanEvent('wedding')}
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all ${
                    pkg.popular
                      ? 'btn-sheen bg-gradient-to-r from-[#E07A5F] via-[#EEA862] to-[#F5C97B] text-[#241015] shadow-md'
                      : 'bg-surface-2 hover:bg-line/50 text-ink border border-line'
                  }`}
                >
                  Start Planning With This Tier
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

