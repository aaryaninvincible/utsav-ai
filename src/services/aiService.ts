import { EventCategory, EventData, EventPlan, BudgetItem, TimelineTask, VendorItem, DietaryPreference, VenuePreference, EventPriority, ScheduleSlot, PlanMeta, ChatMessage } from '../types';
import { requestPlan } from './aiClient';

// NOTE: This module runs in the browser. It never talks to an LLM provider directly —
// live AI calls go through the server-side `/api/ai` endpoint (see aiClient.ts).
// Everything here is deterministic planning logic + the clearly-labelled offline demo planner.

export interface PlanGenerationInput {
  name: string;
  category: EventCategory;
  date: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  themePreference: string;
  venuePreference: VenuePreference;
  dietaryPreference: DietaryPreference;
  culturalRequirements: string;
  accessibilityNeeds?: string;
  priority: EventPriority;
  additionalNotes: string;
}

/**
 * Format Indian Rupee currency
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Deterministic, domain-specific budget allocator based on celebration category
 */
export const generateDeterministicBudget = (totalBudget: number, category: EventCategory, guestCount: number): BudgetItem[] => {
  // Category allocation ratios
  let ratios: { name: string; category: string; pct: number; notes: string; color: string }[] = [];

  switch (category) {
    case 'wedding':
    case 'anniversary':
      ratios = [
        { name: 'Catering & Beverages', category: 'Catering', pct: 0.35, notes: `Estimated ₹${Math.round((totalBudget * 0.35) / Math.max(1, guestCount))} per guest for multiple courses`, color: '#F59E0B' },
        { name: 'Venue & Lawn Rental', category: 'Venue', pct: 0.22, notes: 'Stage, mandap area, lighting infrastructure', color: '#8B5CF6' },
        { name: 'Decor, Florals & Mandap', category: 'Decor', pct: 0.16, notes: 'Fresh floral entrance, stage backdrop, ambient fairy lights', color: '#EC4899' },
        { name: 'Photography & Cinematic Video', category: 'Media', pct: 0.10, notes: 'Traditional & candid coverage, drone footage, teaser album', color: '#3B82F6' },
        { name: 'Music, DJ & Entertainment', category: 'Entertainment', pct: 0.06, notes: 'Sound system, console, live dhol, choreographer support', color: '#10B981' },
        { name: 'Attire, Mehendi & Styling', category: 'Personal', pct: 0.05, notes: 'Bridal/groom makeup, henna artists', color: '#6366F1' },
        { name: 'Logistics, Transport & Invites', category: 'Logistics', pct: 0.03, notes: 'Guest coordination, digital WhatsApp video cards', color: '#14B8A6' },
        { name: 'Contingency & Miscellaneous', category: 'Contingency', pct: 0.03, notes: 'Buffer reserve for unexpected extra guests/requests', color: '#94A3B8' },
      ];
      break;

    case 'birthday':
      ratios = [
        { name: 'Catering & Snacks', category: 'Catering', pct: 0.38, notes: `Buffet / live counter for ${guestCount} guests`, color: '#F59E0B' },
        { name: 'Venue / Party Hall', category: 'Venue', pct: 0.20, notes: 'Party space rental, seating, basic AC/audio', color: '#8B5CF6' },
        { name: 'Theme Decor & Balloons', category: 'Decor', pct: 0.14, notes: 'Custom photobooth, organic balloon arch, LED number sign', color: '#EC4899' },
        { name: 'Custom Tier Cake & Bakery', category: 'Bakery', pct: 0.07, notes: 'Designer themed birthday cake + cupcakes', color: '#F43F5E' },
        { name: 'Entertainment & Games Host', category: 'Entertainment', pct: 0.09, notes: 'Emcee, magician/tattoo artist, party sound setup', color: '#10B981' },
        { name: 'Photography', category: 'Media', pct: 0.05, notes: 'Event highlights and digital photo album', color: '#3B82F6' },
        { name: 'Return Gifts & Favors', category: 'Gifts', pct: 0.04, notes: 'Curated customized return gift boxes', color: '#6366F1' },
        { name: 'Contingency Reserve', category: 'Contingency', pct: 0.03, notes: 'Miscellaneous emergency reserve', color: '#94A3B8' },
      ];
      break;

    case 'fest':
    case 'corporate':
      ratios = [
        { name: 'Sound, Stage & Lighting Rigging', category: 'Production', pct: 0.28, notes: 'Pro audio line-array, LED walls, trussing, concert lights', color: '#8B5CF6' },
        { name: 'Artist / Celebrity / Band Fee', category: 'Entertainment', pct: 0.30, notes: 'Headline performer, emcee, hospitality rider', color: '#F59E0B' },
        { name: 'Venue Setup & Permissions', category: 'Venue', pct: 0.14, notes: 'Auditorium/Ground, police/sound permissions, generator backup', color: '#10B981' },
        { name: 'Food Stalls & Refreshments', category: 'Catering', pct: 0.12, notes: 'Food trucks, participant snack boxes, VIP catering', color: '#EC4899' },
        { name: 'Branding, Merchandise & Badges', category: 'Branding', pct: 0.06, notes: 'Standees, ID cards, passes, merchandise t-shirts', color: '#3B82F6' },
        { name: 'Security, First Aid & Bouncers', category: 'Security', pct: 0.05, notes: 'Crowd management, barricades, emergency medical kit', color: '#EF4444' },
        { name: 'Contingency Buffer', category: 'Contingency', pct: 0.05, notes: 'Rain protection, emergency equipment replacement', color: '#94A3B8' },
      ];
      break;

    case 'cultural':
    case 'family':
    default:
      ratios = [
        { name: 'Traditional Catering & Prasad', category: 'Catering', pct: 0.40, notes: 'Authentic festive menu, traditional sweet distribution', color: '#F59E0B' },
        { name: 'Community Hall / Mandir Hall', category: 'Venue', pct: 0.20, notes: 'Community space, cleaning, chairs and carpets', color: '#8B5CF6' },
        { name: 'Festive Florals & Traditional Decor', category: 'Decor', pct: 0.16, notes: 'Marigold malas, brass diyas, rangoli powders, torans', color: '#EC4899' },
        { name: 'Traditional Musicians & Sound', category: 'Entertainment', pct: 0.09, notes: 'Microphones, traditional instrument performers/bhajan mandali', color: '#10B981' },
        { name: 'Pooja Materials & Honorarium', category: 'Rituals', pct: 0.06, notes: 'Samagri, priest dakshina, incense', color: '#F97316' },
        { name: 'Gifts & Souvenirs for Elders', category: 'Gifts', pct: 0.05, notes: 'Shawls, festive dry fruit boxes', color: '#6366F1' },
        { name: 'Contingency Reserve', category: 'Contingency', pct: 0.04, notes: 'Buffer for last minute family requirements', color: '#94A3B8' },
      ];
      break;
  }

  // Calculate integer INR amounts strictly ensuring total sum matches totalBudget exactly
  let runningSum = 0;
  const items: BudgetItem[] = ratios.map((r, i) => {
    let allocated = Math.round(totalBudget * r.pct);
    if (i === ratios.length - 1) {
      // Rounding balance adjustment on final item
      allocated = Math.max(0, totalBudget - runningSum);
    } else {
      runningSum += allocated;
    }

    return {
      id: `budget-${i + 1}`,
      category: r.category,
      name: r.name,
      estimatedCost: allocated,
      actualCost: 0,
      notes: r.notes,
      color: r.color,
    };
  });

  return items;
};

/**
 * Generate a date-aware preparation timeline based on event date
 */
export const generateDateAwareTimeline = (eventDateStr: string, category: EventCategory): TimelineTask[] => {
  const eventDate = new Date(`${eventDateStr}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diffDays = Math.max(1, Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  void category;

  const formatDateOffset = (daysBefore: number) => {
    const target = new Date(eventDate.getTime() - daysBefore * 24 * 60 * 60 * 1000);
    // Short planning windows compress milestones; anything that would land in the past becomes "today".
    const adjusted = target < today ? today : target;
    return toISODate(adjusted);
  };

  const tasks: TimelineTask[] = [
    // 90-60 Days
    {
      id: 'task-1',
      title: 'Finalize Event Concept & Lock Venue',
      description: 'Visit top 3 shortlisted venues, inspect parking, AC/power backup, and pay advance deposit.',
      dueDate: formatDateOffset(Math.min(75, Math.round(diffDays * 0.8))),
      daysBefore: 75,
      priority: 'critical',
      status: diffDays < 60 ? 'in_progress' : 'pending',
      category: 'Venue',
      phase: '90-60 Days',
    },
    {
      id: 'task-2',
      title: 'Appoint Primary Caterer & Food Tasting',
      description: 'Schedule tasting session, confirm live food counters, and freeze per-plate pricing contract.',
      dueDate: formatDateOffset(Math.min(65, Math.round(diffDays * 0.7))),
      daysBefore: 65,
      priority: 'high',
      status: 'pending',
      category: 'Catering',
      phase: '90-60 Days',
    },
    // 60-30 Days
    {
      id: 'task-3',
      title: 'Book Photographer & Videography Crew',
      description: 'Review portfolio of recent events in the city. Sign agreement for raw footage + edited reel delivery timeline.',
      dueDate: formatDateOffset(Math.min(45, Math.round(diffDays * 0.5))),
      daysBefore: 45,
      priority: 'high',
      status: 'pending',
      category: 'Media',
      phase: '60-30 Days',
    },
    {
      id: 'task-4',
      title: 'Send Digital Invitations & Collect RSVPs',
      description: 'Design WhatsApp interactive invite card and Google RSVP link. Send to out-of-town guests first.',
      dueDate: formatDateOffset(Math.min(35, Math.round(diffDays * 0.4))),
      daysBefore: 35,
      priority: 'critical',
      status: 'pending',
      category: 'Guest Relations',
      phase: '60-30 Days',
    },
    // 30-14 Days
    {
      id: 'task-5',
      title: 'Confirm Decor Concept & Stage Elevation',
      description: 'Review 3D/color sketch of stage backdrop, entrance arch, floral arrangement, and ambient lighting.',
      dueDate: formatDateOffset(Math.min(21, Math.round(diffDays * 0.25))),
      daysBefore: 21,
      priority: 'medium',
      status: 'pending',
      category: 'Decor',
      phase: '30-14 Days',
    },
    {
      id: 'task-6',
      title: 'Curate Music Playlist & Audio Briefing',
      description: 'Provide DJ / sound team with must-play entry track, celebration song, and background ambience playlist.',
      dueDate: formatDateOffset(Math.min(15, Math.round(diffDays * 0.18))),
      daysBefore: 15,
      priority: 'medium',
      status: 'pending',
      category: 'Entertainment',
      phase: '30-14 Days',
    },
    // 14-7 Days
    {
      id: 'task-7',
      title: 'Freeze Guest Headcount with Caterer',
      description: 'Update caterer with exact confirmed RSVP numbers (+ 5% buffer) to avoid food wastage or shortage.',
      dueDate: formatDateOffset(Math.min(7, Math.round(diffDays * 0.08))),
      daysBefore: 7,
      priority: 'high',
      status: 'pending',
      category: 'Catering',
      phase: '14-7 Days',
    },
    // Final 48 Hours
    {
      id: 'task-8',
      title: 'Dry Run Audio/Visual & Venue Walkthrough',
      description: 'Test wireless microphones, projector screens, generator fuel capacity, and air conditioning cooling.',
      dueDate: formatDateOffset(2),
      daysBefore: 2,
      priority: 'critical',
      status: 'pending',
      category: 'Logistics',
      phase: 'Final 48 Hours',
    },
    // Event Day
    {
      id: 'task-9',
      title: 'Event Day Master Execution & Stage Welcome',
      description: 'Designated coordinator arrives 3 hours prior to oversee floral delivery, sound check, and welcome host desk.',
      dueDate: formatDateOffset(0),
      daysBefore: 0,
      priority: 'critical',
      status: 'pending',
      category: 'Coordination',
      phase: 'Event Day',
    },
  ];

  return tasks;
};

/**
 * Generate vendor research checklist with Indian market estimates
 */
export const generateVendorChecklist = (totalBudget: number, category: EventCategory): VendorItem[] => {
  const vendors: VendorItem[] = [
    {
      id: 'v-1',
      category: 'Venue & Banquet Hall',
      name: 'To be shortlisted',
      requirements: 'Capacity for planned guest count, AC, power backup DG set, parking for 30+ cars, green room.',
      estimatedCost: Math.round(totalBudget * 0.22),
      status: 'to_research',
      priority: 'high',
      notes: 'Check if in-house catering is mandatory or outside caterers allowed.',
    },
    {
      id: 'v-2',
      category: 'Catering & Beverages',
      name: 'To be shortlisted',
      requirements: 'Live counters (Chaat / Mocktail bar), multi-course main buffet, dessert counter with traditional sweets.',
      estimatedCost: Math.round(totalBudget * 0.35),
      status: 'to_research',
      priority: 'high',
      notes: 'Request detailed per-plate rate card and waiter-to-guest ratio (1:15 minimum).',
    },
    {
      id: 'v-3',
      category: 'Decor & Theme Production',
      name: 'To be shortlisted',
      requirements: 'Custom entrance arch, thematic stage backdrop, dining tables centerpieces, warm ambient fairy lights.',
      estimatedCost: Math.round(totalBudget * 0.15),
      status: 'to_research',
      priority: 'high',
      notes: 'Specify fresh seasonal flowers vs eco-friendly artificial fabric combinations.',
    },
    {
      id: 'v-4',
      category: 'Photography & Cinema',
      name: 'To be shortlisted',
      requirements: '2 traditional cameras + 1 candid photographer, 4K video reel, edited highlight film within 2 weeks.',
      estimatedCost: Math.round(totalBudget * 0.10),
      status: 'to_research',
      priority: 'medium',
      notes: 'Check drone permission status at the venue.',
    },
    {
      id: 'v-5',
      category: 'DJ & Sound System',
      name: 'To be shortlisted',
      requirements: 'JBL/RCF line array speakers, cordless mics, console, fog machine, ambient LED par lights.',
      estimatedCost: Math.round(totalBudget * 0.07),
      status: 'to_research',
      priority: 'medium',
      notes: 'Clarify local municipal 10:00 PM loudspeaker cutoff rules.',
    },
    {
      id: 'v-6',
      category: 'Bakery / Cake Designer',
      name: 'To be shortlisted',
      requirements: 'Custom tiered celebration cake, safe refrigerated transport to venue, cake table presentation.',
      estimatedCost: Math.round(totalBudget * 0.04),
      status: 'to_research',
      priority: 'medium',
      notes: 'Specify eggless / gluten-free preference in writing.',
    },
    {
      id: 'v-7',
      category: 'Invitations & Favors',
      name: 'To be shortlisted',
      requirements: 'Digital animated video card for WhatsApp, RSVP tracking dashboard, curated return gift hampers.',
      estimatedCost: Math.round(totalBudget * 0.04),
      status: 'to_research',
      priority: 'low',
      notes: 'Digital invites save printing cost and can be dispatched immediately.',
    },
  ];

  if (!['birthday', 'anniversary', 'family'].includes(category)) {
    // Cakes are minor for weddings/fests/cultural events; guest logistics matter more.
    const idx = vendors.findIndex((v) => v.id === 'v-6');
    vendors[idx] = {
      id: 'v-6',
      category: 'Transportation & Guest Logistics',
      name: 'To be shortlisted',
      requirements: 'Guest shuttles or cabs between hotel and venue, airport/station pickups for outstation guests, parking attendants.',
      estimatedCost: Math.round(totalBudget * 0.03),
      status: 'to_research',
      priority: 'medium',
      notes: 'Collect arrival details with RSVPs so pickups can be scheduled in batches.',
    };
  }

  return vendors;
};

/** Local-time YYYY-MM-DD (toISOString would shift dates for IST users). */
export const toISODate = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/** Default event-day run-of-show, editable by the user. */
export const generateDaySchedule = (category: EventCategory): ScheduleSlot[] => {
  const base: Record<string, [string, string, string][]> = {
    wedding: [
      ['14:00', 'Vendor arrival & décor check', 'Florists, lighting and sound complete setup; coordinator walks the venue.'],
      ['16:30', 'Family photographs', 'Formal portraits before guests arrive while light is soft.'],
      ['18:00', 'Guest welcome', 'Tilak, welcome drinks and seating guidance at the entrance.'],
      ['19:00', 'Baraat / entry', 'Dhol and procession; keep the walkway clear.'],
      ['20:00', 'Varmala & ceremony', 'Priest briefed in advance; muhurat timing confirmed.'],
      ['21:00', 'Dinner service', 'Live counters open; elders served first.'],
      ['22:30', 'Vidaai & send-off', 'Transport ready at the gate.'],
    ],
    birthday: [
      ['15:00', 'Setup & balloon décor', 'Photobooth, cake table and seating ready.'],
      ['17:00', 'Guests arrive', 'Welcome snacks and kids’ activity corner open.'],
      ['17:45', 'Games & entertainment', 'Host or entertainer leads the first activity block.'],
      ['18:45', 'Cake cutting', 'Photographer positioned; candles and knife ready.'],
      ['19:15', 'Dinner', 'Buffet opens; return gifts staged near exit.'],
      ['20:30', 'Thank-you & return gifts', 'Hand out favours as guests leave.'],
    ],
    fest: [
      ['08:00', 'Crew call & security briefing', 'Volunteers, security and first aid in position.'],
      ['10:00', 'Inauguration', 'Chief guest, lamp lighting and opening address.'],
      ['11:00', 'Competitions & workshops', 'Parallel tracks across venues; registration desk staffed.'],
      ['14:00', 'Food street opens', 'Stalls checked for hygiene and fire safety.'],
      ['18:30', 'Pro-night sound check', 'Line check complete before gates reopen.'],
      ['19:30', 'Headline performance', 'Crowd barriers and exits manned.'],
      ['22:00', 'Wrap-up', 'Comply with the local sound curfew; staged exit.'],
    ],
  };
  const rows = base[category] ?? [
    ['09:00', 'Setup & decoration', 'Rangoli, florals and seating arranged.'],
    ['11:00', 'Guests arrive', 'Welcome and seating for elders.'],
    ['11:30', 'Main ceremony / programme', 'Pooja, speeches or performances.'],
    ['13:00', 'Meal service', 'Traditional menu served.'],
    ['15:00', 'Closing & thank-you', 'Prasad or favours distributed.'],
  ];
  return rows.map(([time, title, detail], i) => ({ id: `slot-${i + 1}`, time, title, detail }));
};

/**
 * Intelligent Fallback & Local Knowledge Generator
 * Produces rich, highly personalized celebration plans without calling cloud APIs
 */
export const generateSmartCelebrationPlan = (input: PlanGenerationInput): EventPlan => {
  const { name, category, city, guestCount, totalBudget, themePreference, dietaryPreference, priority, venuePreference } = input;

  const perGuest = Math.round(totalBudget / Math.max(1, guestCount));

  let concept = '';
  let theme = themePreference || 'Contemporary Elegance';
  let overview = '';
  let colorPalette = [
    { name: 'Warm Royal Gold', hex: '#F59E0B' },
    { name: 'Deep Midnight Indigo', hex: '#1E1B4B' },
    { name: 'Imperial Violet', hex: '#7C3AED' },
    { name: 'Ivory Cream', hex: '#FFFBEB' },
  ];
  let decorIdeas: string[] = [];
  let activities: { title: string; timing: string; description: string }[] = [];
  let catering: string[] = [];
  let guestExp: string[] = [];
  let risks: { risk: string; contingency: string }[] = [];
  let ecoFriendly: string[] = [];

  switch (category) {
    case 'wedding':
    case 'anniversary':
      concept = `An opulent yet intimate celebration honoring tradition, modern aesthetics, and familial warmth in ${city}.`;
      theme = themePreference || (priority === 'luxury' ? 'Royal Rajasthani Heritage' : 'Ethereal Pastel Garden');
      overview = `Designed for ${guestCount} cherished guests with a total financial allocation of ${formatINR(totalBudget)} (${formatINR(perGuest)} per guest). The blueprint balances majestic visuals with seamless hospitality and zero rush.`;
      colorPalette = [
        { name: 'Imperial Gold', hex: '#F59E0B' },
        { name: 'Crimson Rose', hex: '#E11D48' },
        { name: 'Pastel Peach', hex: '#FED7AA' },
        { name: 'Rich Emerald', hex: '#047857' },
      ];
      decorIdeas = [
        'Grand floral entrance walkway framed by brass urli bowls with floating marigolds and rose petals.',
        'Sleek circular Mandap/Stage with cascading wisteria and warm edison filament bulbs for soft ambient photography.',
        'Velvet lounge seating with gold metallic accents and customized family crest monogram cushions.',
        'Ambient warm-white fairy lights canopy ceiling transforming the dinner area at dusk.',
      ];
      activities = [
        { title: 'Royal Baraat / Welcome Gate Procession', timing: '05:30 PM – 06:30 PM', description: 'Energetic dhol beats, rose water misting, and traditional sandalwood tilak greeting for guests.' },
        { title: 'Varmala & Ring Exchange', timing: '06:45 PM – 07:30 PM', description: 'Central elevated stage reveal with synchronized cold-pyro fountains and instrumental violin music.' },
        { title: 'Gourmet Feast & Live Acoustic Band', timing: '07:30 PM – 09:30 PM', description: 'Interactive culinary stations accompanied by live Sufi-Bollywood acoustic singers.' },
        { title: 'Sacred Rituals & Pheras', timing: '09:30 PM – 11:30 PM', description: 'Chanting of Vedic verses with comfortable seating cushions provided for close elders and family.' },
      ];
      catering = [
        `Strict adherence to ${dietaryPreference.replace(/_/g, ' ').toUpperCase()} preparation with separate cookware and dedicated service personnel.`,
        'Signature Welcome Drinks: Fresh Kesar Pista Thandai, Kokum Mint Fizz, and Tender Coconut coolers.',
        'Interactive Live Chaat Street: Delhi-style Golgappe with 5 flavored waters, Banarasi Tamatar Chaat, and crispy Palak Patta Chaat.',
        'Royal Main Course: Dum Biryani in clay handis, Dal Bukhara simmered for 18 hours, and artisan breads fresh from tandoor.',
        'Dessert Pavilion: Hot Jalebi with Rabdi, Baked Gulab Jamun, and artisanal seasonal Kulfi counters.',
      ];
      guestExp = [
        'Digital QR code check-in desk providing personalized digital itinerary cards and table numbers.',
        'Pampering station equipped with refreshing wet towels, mineral water mist, and comfortable flat footwear for dancing ladies.',
        'Instant Polaroid photo souvenir station where guests clip a picture into the memory guestbook with a handwritten note.',
      ];
      risks = [
        { risk: 'Unpredictable rain or high wind during outdoor rituals', contingency: 'Contract an all-weather transparent German waterproof hangar with raised wooden flooring.' },
        { risk: 'Power tripping from heavy stage audio and halogen lighting', contingency: 'Mandate a dedicated silent 125 kVA diesel generator backup synchronized on an automatic transfer switch.' },
        { risk: 'Unexpected 15-20% extra guest turnout during dinner', contingency: 'Pre-negotiate a 10% emergency buffer with the caterer charged at 85% normal per-plate rate.' },
      ];
      ecoFriendly = [
        'Zero-plastic policy: Glass water carafes and personalized reusable copper tumblers.',
        'Upcycled floral composting: Donating event marigolds to local organic dye and incense makers after the event.',
        'Digital interactive invitations with RSVP auto-sync to eliminate paper waste.',
      ];
      break;

    case 'birthday':
      concept = `An electric, joyful milestone birthday party crafted for ${guestCount} guests in ${city}, packed with high energy, laughter, and memorable moments.`;
      theme = themePreference || (priority === 'affordability' ? 'Minimalist Neon Glow' : 'Golden Glamour & Cocktails');
      overview = `A vibrant celebration with a planned budget of ${formatINR(totalBudget)}. Focus is on great food, non-stop music, dynamic photobooths, and effortless guest engagement.`;
      colorPalette = [
        { name: 'Electric Violet', hex: '#8B5CF6' },
        { name: 'Warm Gold', hex: '#F59E0B' },
        { name: 'Midnight Charcoal', hex: '#1E293B' },
        { name: 'Bright Cyan', hex: '#06B6D4' },
      ];
      decorIdeas = [
        'Giant 4-foot LED marquee numbers highlighting the birthday age with a shimmering sequin backdrop.',
        'Organic dual-tone balloon arch framing the cake table with customized neon acrylic sign.',
        'Table centerpieces with mini fairy lights inside geometric glass terrariums.',
        'Personalized polaroid gallery wall capturing nostalgic memories over the years.',
      ];
      activities = [
        { title: 'Guest Arrival & Mocktail Mixer', timing: '07:00 PM – 07:45 PM', description: 'Upbeat chill lounge music, personalized welcome mocktails, and interactive trivia icebreaker cards.' },
        { title: 'Cake Cutting Ceremony & Toast', timing: '08:00 PM – 08:30 PM', description: 'Sparkler candle presentation, birthday video montage on LED screen, and champagne/sparkling cider toast.' },
        { title: 'Dinner Buffet & Live Counters', timing: '08:30 PM – 09:30 PM', description: 'Flowing appetizers followed by a dynamic buffet featuring street-food fusion favorites.' },
        { title: 'DJ Dance Floor Blast', timing: '09:30 PM – 11:30 PM', description: 'Dance floor illuminated with moving heads, haze smoke machine, and high-energy party playlist.' },
      ];
      catering = [
        `Curated ${dietaryPreference.replace(/_/g, ' ').toUpperCase()} appetizers passed continuously on skewers and shot glasses.`,
        'Signature Mocktails: Watermelon Basil Sparkler, Mango Chilli Mojito, and Espresso Tonic shots.',
        'Finger Food Stations: Mini Paneer/Chicken sliders, loaded nachos with salsa bar, and crispy momos with garlic dip.',
        'Custom 2-tier designer celebration cake matching the event theme, accompanied by molten chocolate lava cups.',
      ];
      guestExp = [
        '360-degree rotating selfie video booth that instantly AirDrops or WhatsApps slow-motion reels to guests.',
        'Customized sweet treat favor boxes containing macarons and gourmet roasted dry fruit.',
      ];
      risks = [
        { risk: 'Sound restriction past 10:00 PM in residential banquet halls', contingency: 'Transition the final 90 minutes into a Silent Disco with multi-channel LED wireless headphones.' },
        { risk: 'Cake melting or collapsing during transport in warm weather', contingency: 'Mandate refrigerated delivery by bakery 1 hour before cutting, stored in venue commercial chiller.' },
      ];
      ecoFriendly = [
        'Biodegradable natural latex balloons instead of metallic foil or single-use plastics.',
        'Bamboo cutlery and sugarcane bagasse dessert plates for finger food stations.',
      ];
      break;

    case 'fest':
    case 'corporate':
      concept = `A high-impact, professional, and exhilarating gathering uniting ${guestCount} attendees in ${city} with state-of-the-art stagecraft.`;
      theme = themePreference || 'Cyberpunk Prism & Innovation';
      overview = `Organized with a budget of ${formatINR(totalBudget)}. Maximizes attendee excitement through top-tier audio-visual production, swift registration, and world-class artist showcase.`;
      colorPalette = [
        { name: 'Neon Indigo', hex: '#6366F1' },
        { name: 'Solar Amber', hex: '#F59E0B' },
        { name: 'Deep Space Navy', hex: '#0F172A' },
        { name: 'Emerald Pulse', hex: '#10B981' },
      ];
      decorIdeas = [
        'Monumental main stage with central P3 LED video wall flanked by vertical side banner trusses.',
        'Immersive ambient laser and moving beam fixtures throwing sharp aerial geometry over the crowd.',
        'Branded geometric entrance archway with integrated registration check-in kiosks.',
      ];
      activities = [
        { title: 'Doors Open & Interactive Tech/Fun Pavilions', timing: '04:00 PM – 05:30 PM', description: 'Sponsor showcases, gaming zones, and networking lounge with background ambient beats.' },
        { title: 'Opening Acts & Battle of the Talents', timing: '05:30 PM – 07:30 PM', description: 'Student/indie showcases, short award felicitations, and interactive audience voting via QR.' },
        { title: 'Headline Celebrity / Band Performance', timing: '08:00 PM – 10:00 PM', description: 'Electrifying 120-minute concert performance with full stadium sound and confetti canons.' },
      ];
      catering = [
        'High-volume meal counters designed for rapid queue clearance (under 45 seconds per plate).',
        'Grab-and-go boxes with wholesome Frankie rolls, samosas, protein bars, and fresh fruit juice tetrapaks.',
      ];
      guestExp = [
        'NFC or QR-based digital wristbands for instant cashless transactions and seamless crowd gate-control.',
        'Hydration stations located every 50 meters offering clean RO drinking water refills.',
      ];
      risks = [
        { risk: 'Crowd surge at entry gates during headline act', contingency: 'Double-row barricaded holding pens with separate security frisks for boys and girls, managed by 20+ licensed bouncers.' },
        { risk: 'Sound system failure or amplifier blowout', contingency: 'Dual-redundant DSP processors with duplicate backup amplifier rack on auto-standby.' },
      ];
      ecoFriendly = [
        'Paperless digital passes and electronic certificates.',
        'Dedicated color-coded waste segregation bins with volunteer-led recycling sorting.',
      ];
      break;

    case 'cultural':
    case 'family':
    default:
      concept = `A spiritually uplifting and heartwarming cultural congregation in ${city} uniting community and family in joyous celebration.`;
      theme = themePreference || 'Traditional Temple Heritage & Diya Glow';
      overview = `Crafted for ${guestCount} guests with a budget of ${formatINR(totalBudget)}. Honors age-old customs with fragrant florals, authentic culinary heritage, and soul-stirring music.`;
      colorPalette = [
        { name: 'Marigold Yellow', hex: '#FBBF24' },
        { name: 'Auspicious Saffron', hex: '#F97316' },
        { name: 'Deep Vermillion', hex: '#DC2626' },
        { name: 'Peacock Teal', hex: '#0D9488' },
      ];
      decorIdeas = [
        'Elaborate rangoli at the main entryway illuminated by pure brass brass oil lamps (Diyas).',
        'Ceiling adorned with cascading fresh orange and yellow marigold strings (Genda Phool) with mango leaf torans.',
        'Traditional low wooden Bajot seating with embroidered brocade cushions for rituals.',
      ];
      activities = [
        { title: 'Auspicious Welcome & Bhajan Mandali', timing: '09:30 AM – 10:30 AM', description: 'Harmonium and tabla accompaniment welcoming guests with devotional warmth.' },
        { title: 'Main Rituals & Sankalp', timing: '10:30 AM – 12:00 PM', description: 'Priest-led community prayers followed by collective aarti and flower blessing.' },
        { title: 'Community Feast (Priti Bhojan / Langar)', timing: '12:30 PM – 02:30 PM', description: 'Traditional multi-course feast served hot in traditional Pattal/leaf plates or clean buffet.' },
      ];
      catering = [
        `Authentic ${dietaryPreference.replace(/_/g, ' ').toUpperCase()} festive menu prepared strictly in pure Desi Ghee.`,
        'Hot Puri, Dal Makhani/Sambhar, Paneer Makhani, fragrant Jeera Pulao, and freshly fried Papad.',
        'Traditional Desserts: Moong Dal Halwa, Motichoor Ladoos, and sweet Paan counter.',
      ];
      guestExp = [
        'Elders comfort zone with elevated padded sofa seating away from direct loudspeaker breeze.',
        'Prasad and souvenir gift bags given to every family containing holy dry prasad and a brass diya.',
      ];
      risks = [
        { risk: 'Shortage of ritual samagri or floral garlands on festival day', contingency: 'Order 30% surplus flowers 2 days in advance from wholesale mandi and keep in cool storage.' },
        { risk: 'Excess elderly attendees needing immediate seating assistance', contingency: 'Keep 2 dedicated wheelchairs and emergency medical kit at the reception.' },
      ];
      ecoFriendly = [
        '100% natural sal-leaf pattals and clay kulhads for tea, ensuring zero plastic landfill contribution.',
        'Natural floral waste segregated for holy river vermicomposting.',
      ];
      break;
  }

  return {
    concept,
    theme,
    overview,
    colorPalette,
    decorIdeas,
    recommendedActivities: activities,
    cateringConsiderations: catering,
    guestExperience: guestExp,
    risksAndContingencies: risks,
    ecoFriendlyAlternatives: ecoFriendly,
  };
};


/* ==========================================================================
   AI orchestration (live via /api/ai, otherwise the labelled demo planner)
   ========================================================================== */

export interface PlanResult {
  plan: EventPlan;
  meta: PlanMeta;
  /** Set when we fell back to the demo planner, explaining why. */
  fallbackReason?: string;
}

/** Generate the creative plan. Live AI when the server is configured; demo planner otherwise. */
export const generateFullEventPlan = async (input: PlanGenerationInput, signal?: AbortSignal): Promise<PlanResult> => {
  try {
    const { plan, meta } = await requestPlan(
      {
        name: input.name,
        category: input.category,
        date: input.date,
        city: input.city,
        guestCount: input.guestCount,
        totalBudget: input.totalBudget,
        theme: input.themePreference,
        venue: input.venuePreference,
        dietary: input.dietaryPreference,
        priority: input.priority,
        culturalRequirements: input.culturalRequirements,
        accessibilityNeeds: input.accessibilityNeeds,
        notes: input.additionalNotes,
      },
      signal,
    );
    return { plan, meta };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    const reason = err instanceof Error ? err.message : 'AI unavailable';
    return {
      plan: generateSmartCelebrationPlan(input),
      meta: { source: 'demo', generatedAt: new Date().toISOString() },
      fallbackReason: reason,
    };
  }
};

/* ------------------------- Demo assistant (offline) ------------------------ */

const daysUntil = (dateStr: string) => {
  const t = new Date(`${dateStr}T12:00:00`).getTime();
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return Math.round((t - now.getTime()) / 86_400_000);
};

/**
 * Rule-based offline replies used ONLY when no live AI is available.
 * Responses are always shown with a "Demo" label in the UI.
 * Numbers come from the event's real data, not from a model.
 */
export const demoAssistantReply = (
  message: string,
  event: EventData,
): { answer: string; followUps: string[]; taskSuggestions: ChatMessage['taskSuggestions'] } => {
  const q = message.toLowerCase();
  const items = event.budgetItems ?? [];
  const has = (...words: string[]) => words.some((w) => q.includes(w));

  if (has('this week', 'complete', 'next', 'todo', 'to-do', 'to do')) {
    const open = event.timeline
      .filter((t) => t.status !== 'completed')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    const weekEnd = toISODate(new Date(Date.now() + 7 * 86_400_000));
    const thisWeek = open.filter((t) => t.dueDate <= weekEnd);
    const list = (thisWeek.length ? thisWeek : open.slice(0, 3))
      .map((t) => `- ${t.title} (due ${new Date(`${t.dueDate}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}, ${t.priority})`)
      .join('\n');
    return {
      answer: open.length
        ? `${thisWeek.length ? `You have ${thisWeek.length} task${thisWeek.length > 1 ? 's' : ''} due in the next 7 days:` : 'Nothing is due this week. Your next tasks are:'}\n${list}\n\nThe event is ${Math.max(0, daysUntil(event.date))} days away.`
        : 'All timeline tasks are complete. Use the final days to reconfirm vendor arrival times and share the event-day schedule with your coordinator.',
      followUps: ['Prepare an event-day schedule', 'Which vendors are still pending?'],
      taskSuggestions: [],
    };
  }

  if (has('reduce', 'cut', 'save', 'cheaper', 'affordable', 'alternative')) {
    const decor = items.find((i) => /decor/i.test(i.category));
    const target = has('decor') && decor ? decor : [...items].sort((a, b) => b.estimatedCost - a.estimatedCost)[0];
    const saving = target ? Math.round(target.estimatedCost * 0.2) : Math.round(event.totalBudget * 0.1);
    return {
      answer: `${target ? `Your ${target.name} line is planned at ${formatINR(target.estimatedCost)}. A 20% trim would free about ${formatINR(saving)}.` : ''}

Practical ways to get there:
- Use seasonal local flowers (marigold, rajnigandha, jasmine) with fabric drapes instead of imported blooms.
- Reuse ceremony décor for the reception — ask the decorator to quote for a single shift-over.
- Choose a weekday or daytime slot; many venues in ${event.city} price these lower.
- Ask for an itemised quote and remove low-impact items (extra pillars, ceiling work) first.
- Rent props instead of custom fabrication.

Update the planned amount in the Budget tab once you have revised quotes.`,
      followUps: ['Suggest a traditional theme within my budget', 'Create a vegetarian menu plan'],
      taskSuggestions: [
        { title: 'Request itemised décor quotes from 3 vendors', description: 'Compare line by line and remove low-impact items.', priority: 'high', daysBefore: 30 },
      ],
    };
  }

  if (has('menu', 'veg', 'food', 'catering', 'jain', 'vegan')) {
    const jain = event.dietaryPreference === 'jain' || q.includes('jain');
    const catering = items.find((i) => /cater/i.test(i.category));
    const perPlate = catering ? Math.round(catering.estimatedCost / Math.max(1, event.guestCount)) : null;
    return {
      answer: `Vegetarian menu outline for ${event.guestCount} guests${perPlate ? ` (your catering line works out to about ${formatINR(perPlate)} per guest)` : ''}:

Welcome: kesar thandai, aam panna, nimbu shikanji
Starters: ${jain ? 'raw-banana tikki, paneer tikka (no onion/garlic), corn cheese balls' : 'dahi kebab, paneer tikka, hara bhara kebab, chaat counter'}
Mains: ${jain ? 'paneer butter masala (Jain), dal tadka (Jain), mixed veg without root vegetables' : 'paneer lababdar, dal makhani, seasonal subzi, veg biryani'}, assorted rotis, jeera rice, raita
Desserts: gulab jamun, rabri, kulfi or a seasonal halwa

Tips: confirm the per-plate rate in writing, keep one live counter as the highlight, and order for confirmed RSVPs plus ~5%.`,
      followUps: ['Reduce my catering budget', 'What should I complete this week?'],
      taskSuggestions: [
        { title: 'Schedule menu tasting with caterer', description: 'Taste top dishes and freeze the per-plate rate in writing.', priority: 'high', daysBefore: 45 },
      ],
    };
  }

  if (has('schedule', 'run of show', 'event-day', 'event day', 'itinerary')) {
    const slots = (event.daySchedule?.length ? event.daySchedule : generateDaySchedule(event.category))
      .map((s) => `- ${s.time} — ${s.title}`)
      .join('\n');
    return {
      answer: `Here is a starting event-day schedule. Edit times in the Timeline tab to match your muhurat or venue rules:\n${slots}\n\nShare it with your coordinator and every vendor 48 hours before the event.`,
      followUps: ['What should I complete this week?'],
      taskSuggestions: [
        { title: 'Share final event-day schedule with all vendors', description: 'Send timings and on-site contact to every vendor.', priority: 'critical', daysBefore: 2 },
      ],
    };
  }

  if (has('theme', 'decor', 'idea', 'traditional')) {
    return {
      answer: `Traditional theme ideas that suit ${formatINR(event.totalBudget)} for ${event.guestCount} guests:
- Marigold & brass: genda-phool torans, brass urli with floating flowers, diyas along the entrance.
- Rajasthani courtyard: block-print fabric canopies, low seating with bolsters, lanterns.
- South Indian temple: banana-leaf accents, jasmine strings, kolam at the entrance, brass lamps.

Spend on the entrance and the stage — guests photograph those most — and keep table décor simple.`,
      followUps: ['Reduce my decoration budget', 'Create a vegetarian menu plan'],
      taskSuggestions: [],
    };
  }

  return {
    answer: `For ${event.name} (${event.guestCount} guests, ${formatINR(event.totalBudget)} budget):
- Keep ${event.contingencyReservePercent || 10}% (${formatINR(Math.round(event.totalBudget * ((event.contingencyReservePercent || 10) / 100)))}) untouched as a contingency until the final week.
- Appoint one family member as the vendor point of contact on the day.
- Confirm every vendor booking in writing with the advance amount and cancellation terms.

Try asking about budget cuts, menus, themes, this week's tasks or an event-day schedule.`,
    followUps: ['What should I complete this week?', 'Give me affordable alternatives'],
    taskSuggestions: [],
  };
};

/**
 * Generate formatted WhatsApp Invitation
 */
export const generateWhatsAppInvite = (event: EventData): string => {
  return `*You are cordially invited*

*${event.name}*

Dear friends and family,

We would be honoured by your presence as we celebrate this special occasion with love, joy and togetherness.

*Date:* ${new Date(`${event.date}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
*City / Venue:* ${event.city}
*Theme:* ${event.themePreference || 'Celebration'}

Kindly RSVP by replying to this message.

With warm regards`;
};

/**
 * End-to-end generator: deterministic budget/timeline/vendors + AI (or demo) creative plan.
 */
export const generateCompleteEvent = async (
  params: {
    name: string;
    category: EventCategory;
    date: string;
    city: string;
    guestCount: number;
    totalBudget: number;
    contingencyPercentage?: number;
    venuePreference: VenuePreference;
    dietaryPreference: DietaryPreference;
    priority: EventPriority;
    theme: string;
    notes?: string;
    culturalRequirements?: string;
    accessibilityNeeds?: string;
  },
  signal?: AbortSignal,
): Promise<{ event: EventData; fallbackReason?: string }> => {
  const contingency = params.contingencyPercentage ?? 10;
  const { plan, meta, fallbackReason } = await generateFullEventPlan(
    {
      name: params.name,
      category: params.category,
      date: params.date,
      city: params.city,
      guestCount: params.guestCount,
      totalBudget: params.totalBudget,
      themePreference: params.theme,
      venuePreference: params.venuePreference,
      dietaryPreference: params.dietaryPreference,
      culturalRequirements: params.culturalRequirements || '',
      accessibilityNeeds: params.accessibilityNeeds || '',
      priority: params.priority,
      additionalNotes: params.notes || '',
    },
    signal,
  );

  const now = new Date().toISOString();
  const budgetItems = generateDeterministicBudget(params.totalBudget, params.category, params.guestCount);

  const event: EventData = {
    id: `event-${Date.now()}`,
    createdAt: now,
    updatedAt: now,
    name: params.name,
    category: params.category,
    date: params.date,
    city: params.city,
    guestCount: params.guestCount,
    totalBudget: params.totalBudget,
    themePreference: params.theme,
    venuePreference: params.venuePreference,
    dietaryPreference: params.dietaryPreference,
    culturalRequirements: params.culturalRequirements || '',
    accessibilityNeeds: params.accessibilityNeeds || '',
    priority: params.priority,
    additionalNotes: params.notes,
    contingencyReservePercent: contingency,
    plan,
    planMeta: meta,
    confirmedSections: [],
    savedIdeas: [],
    budgetItems,
    timeline: generateDateAwareTimeline(params.date, params.category),
    daySchedule: generateDaySchedule(params.category),
    vendors: generateVendorChecklist(params.totalBudget, params.category),
    chatHistory: [],
    activity: [{ id: `act-${Date.now()}`, at: now, text: `Event created with a ${meta.source === 'demo' ? 'demo' : 'live AI'} plan` }],
  };

  return { event, fallbackReason };
};
