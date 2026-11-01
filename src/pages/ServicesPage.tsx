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
    <div className="relative min-h-screen bg-[#0D0709] text-white selection:bg-[#E5A855] selection:text-black pb-24">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#E5A855]/10 filter blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full bg-[#702435]/15 filter blur-[160px] pointer-events-none" />

      {/* Hero Header */}
      <div className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A855]/15 border border-[#E5A855]/30 text-xs font-semibold text-[#E5A855] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Event Services</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Bespoke Craftsmanship for <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E5A855] via-[#F5C27E] to-[#E58235]">
            Unforgettable Celebrations
          </span>
        </h1>

        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          From palace mandap architecture to gourmet culinary banquets, discover how Eventara transforms your special day into a seamless work of art.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => onPlanEvent('wedding')}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white font-semibold text-xs shadow-[0_0_25px_rgba(229,168,85,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Inquire for Your Date</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenCalendar}
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs transition-colors"
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
              className="p-6 sm:p-7 rounded-3xl bg-[#140B10]/90 border border-white/10 hover:border-[#E5A855]/60 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E5A855]/15 text-[#E5A855] border border-[#E5A855]/30">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E5A855] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed">
                  {srv.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-white/80 flex items-start gap-2">
                        <span className="text-[#E5A855] text-xs">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-white/50 block">Investment Guide</span>
                  <span className="text-xs font-bold text-[#E5A855]">{srv.priceGuide}</span>
                </div>
                <button
                  onClick={() => onPlanEvent(srv.categoryKey)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#E5A855] hover:text-black border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
                >
                  <span>Select</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing / Packages Comparison Section */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="font-serif text-3xl font-bold text-white">
              Signature Planning Tiers
            </h2>
            <p className="text-xs sm:text-sm text-white/60">
              Clear, transparent milestone fees with no agency kickbacks. You pay vendors directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-3xl transition-all ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-[#2A151F] to-[#140B10] border-2 border-[#E5A855] shadow-[0_0_40px_rgba(229,168,85,0.3)] relative'
                    : 'bg-[#140B10]/90 border border-white/10'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-gradient-to-r from-[#D97736] to-[#E5A855] text-white text-[10px] font-bold uppercase tracking-widest shadow-md">
                    Most Requested
                  </div>
                )}
                <h4 className="font-serif text-2xl font-bold text-white">{pkg.name}</h4>
                <p className="text-xs text-white/60 mt-1 min-h-[36px]">{pkg.tagline}</p>

                <div className="my-6 py-4 border-y border-white/10">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest block">Starting At</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E5A855]">
                    {pkg.price}
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-white/80 mb-8">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#E5A855] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onPlanEvent('wedding')}
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#D97736] via-[#E5A855] to-[#C87A32] text-white shadow-[0_0_20px_rgba(229,168,85,0.4)] hover:brightness-110'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/20'
                  }`}
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

