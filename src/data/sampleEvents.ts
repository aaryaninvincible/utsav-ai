import { EventData } from '../types';
import {
  generateDeterministicBudget,
  generateDateAwareTimeline,
  generateVendorChecklist,
  generateSmartCelebrationPlan,
  generateDaySchedule,
  toISODate,
} from '../services/aiService';

const inDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
};

const agoDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const SAMPLE_EVENTS: EventData[] = [
  // 1. Royal Indian Wedding
  (() => {
    const date = inDays(60);
    const budgetItems = generateDeterministicBudget(2500000, 'wedding', 300);
    // Mark some actual costs so charts and spending trackers show real math
    if (budgetItems[0]) budgetItems[0].actualCost = 850000; // Catering booked
    if (budgetItems[1]) budgetItems[1].actualCost = 550000; // Venue deposit paid
    if (budgetItems[2]) budgetItems[2].actualCost = 380000; // Decor advance paid

    const vendors = generateVendorChecklist(2500000, 'wedding');
    if (vendors[0]) {
      vendors[0].name = 'Oberoi Rajvilas / Palace Heritage Courtyard';
      vendors[0].status = 'confirmed';
      vendors[0].contactName = 'Ranveer Singh (Banquets)';
      vendors[0].phone = '+91 98290 12345';
      vendors[0].actualCost = 550000;
    }
    if (vendors[1]) {
      vendors[1].name = 'Maharaja Royal Caterers';
      vendors[1].status = 'confirmed';
      vendors[1].contactName = 'Chef Kailash Maharaj';
      vendors[1].phone = '+91 94140 54321';
      vendors[1].actualCost = 850000;
    }
    if (vendors[2]) {
      vendors[2].name = 'Genda Phool & Brass Floral Artisans';
      vendors[2].status = 'shortlisted';
      vendors[2].contactName = 'Pooja Chawla';
      vendors[2].phone = '+91 98111 67890';
    }

    const timeline = generateDateAwareTimeline(date, 'wedding');
    if (timeline[0]) timeline[0].status = 'completed';
    if (timeline[1]) timeline[1].status = 'completed';
    if (timeline[2]) timeline[2].status = 'in_progress';

    return {
      id: 'sample-wedding-1',
      isDemo: true,
      createdAt: agoDays(5),
      updatedAt: agoDays(1),
      name: "Aditi & Rohan's Royal Heritage Wedding",
      category: 'wedding',
      date,
      city: 'Jaipur, Rajasthan',
      guestCount: 300,
      totalBudget: 2500000,
      themePreference: 'Royal Rajasthani Heritage & Marigold Glow',
      venuePreference: 'heritage_destination',
      dietaryPreference: 'pure_veg',
      culturalRequirements: 'Traditional Marwari rituals, separate Mandap, Shehnai & Nagada live welcome.',
      priority: 'luxury',
      additionalNotes: 'Need vintage car for groom arrival, live sweet making counter with Ghewar and Rabdi.',
      contingencyReservePercent: 10,
      plan: generateSmartCelebrationPlan({
        name: "Aditi & Rohan's Royal Heritage Wedding",
        category: 'wedding',
        date,
        city: 'Jaipur, Rajasthan',
        guestCount: 300,
        totalBudget: 2500000,
        themePreference: 'Royal Rajasthani Heritage & Marigold Glow',
        venuePreference: 'heritage_destination',
        dietaryPreference: 'pure_veg',
        culturalRequirements: 'Traditional Marwari rituals',
        priority: 'luxury',
        additionalNotes: 'Vintage car entry',
      }),
      planMeta: {
        source: 'demo',
        generatedAt: agoDays(5),
      },
      confirmedSections: ['overview', 'colorPalette'],
      savedIdeas: [
        'Sandalwood tilak and fresh rose-water mist at 3 entrance arches.',
        'Brass urli vessels with floating marigolds along the central walkway.',
        'Live Ghewar & Rabdi dessert pavilion made fresh on site.',
      ],
      budgetItems,
      timeline,
      daySchedule: generateDaySchedule('wedding'),
      vendors,
      chatHistory: [
        {
          id: 'msg-1',
          sender: 'user',
          text: 'How can I organize a grand welcome for 300 guests without creating a bottleneck at the gate?',
          timestamp: '10:30 AM',
        },
        {
          id: 'msg-2',
          sender: 'assistant',
          source: 'demo',
          text: 'For a seamless Royal Welcome in Jaipur: Setup 3 parallel welcome gates with hostesses offering sandalwood tilak and fresh rose-water mist. Position the Shehnai and Dhol troupe on an elevated platform so sound resonates without obstructing the walkway. Serve chilled Kesar Thandai in brass tumblers immediately inside the courtyard.',
          timestamp: '10:31 AM',
          followUps: ['Reduce my decoration budget', 'What should I complete this week?'],
        },
      ],
      activity: [
        { id: 'act-1', at: agoDays(5), text: 'Event created with demo plan' },
        { id: 'act-2', at: agoDays(4), text: 'Confirmed Oberoi Rajvilas Venue deposit' },
        { id: 'act-3', at: agoDays(2), text: 'Confirmed Maharaja Royal Caterers for 300 guests' },
      ],
    };
  })(),

  // 2. 1st Milestone Birthday Party
  (() => {
    const date = inDays(20);
    const budgetItems = generateDeterministicBudget(150000, 'birthday', 75);
    if (budgetItems[0]) budgetItems[0].actualCost = 55000;
    if (budgetItems[1]) budgetItems[1].actualCost = 30000;

    const vendors = generateVendorChecklist(150000, 'birthday');
    if (vendors[0]) {
      vendors[0].name = 'The Green Garden Clubhouse';
      vendors[0].status = 'confirmed';
      vendors[0].phone = '+91 80234 56789';
      vendors[0].actualCost = 30000;
    }

    const timeline = generateDateAwareTimeline(date, 'birthday');
    if (timeline[0]) timeline[0].status = 'completed';

    return {
      id: 'sample-birthday-1',
      isDemo: true,
      createdAt: agoDays(2),
      updatedAt: agoDays(1),
      name: "Aarav's 1st Superhero Fiesta",
      category: 'birthday',
      date,
      city: 'Bengaluru, Karnataka',
      guestCount: 75,
      totalBudget: 150000,
      themePreference: 'Little Superhero Avengers in Pastel Neon',
      venuePreference: 'indoor',
      dietaryPreference: 'mixed_veg_nonveg',
      culturalRequirements: 'Baby cake smash photo session, safe soft-play playpen for toddlers.',
      priority: 'guest_experience',
      additionalNotes: 'Strictly child-safe non-toxic balloons, custom superhero capes as return gifts.',
      contingencyReservePercent: 8,
      plan: generateSmartCelebrationPlan({
        name: "Aarav's 1st Superhero Fiesta",
        category: 'birthday',
        date,
        city: 'Bengaluru, Karnataka',
        guestCount: 75,
        totalBudget: 150000,
        themePreference: 'Little Superhero Avengers in Pastel Neon',
        venuePreference: 'indoor',
        dietaryPreference: 'mixed_veg_nonveg',
        culturalRequirements: 'Toddler safety',
        priority: 'guest_experience',
        additionalNotes: 'Return gift superhero capes',
      }),
      planMeta: {
        source: 'demo',
        generatedAt: agoDays(2),
      },
      confirmedSections: [],
      savedIdeas: ['Custom superhero mini-capes with child names for return hampers.'],
      budgetItems,
      timeline,
      daySchedule: generateDaySchedule('birthday'),
      vendors,
      chatHistory: [],
      activity: [{ id: 'act-1', at: agoDays(2), text: 'Event created with demo plan' }],
    };
  })(),

  // 3. TechUtsav Annual College Fest
  (() => {
    const date = inDays(45);
    const budgetItems = generateDeterministicBudget(1200000, 'fest', 1200);
    if (budgetItems[0]) budgetItems[0].actualCost = 320000;

    const vendors = generateVendorChecklist(1200000, 'fest');
    const timeline = generateDateAwareTimeline(date, 'fest');

    return {
      id: 'sample-fest-1',
      isDemo: true,
      createdAt: agoDays(10),
      updatedAt: agoDays(3),
      name: 'TechUtsav 2026 — Annual Cultural & Tech Fest',
      category: 'fest',
      date,
      city: 'New Delhi',
      guestCount: 1200,
      totalBudget: 1200000,
      themePreference: 'Cyberpunk Prism & Neon Bass',
      venuePreference: 'outdoor',
      dietaryPreference: 'mixed_veg_nonveg',
      culturalRequirements: 'College administration approvals, local municipal sound permits until 10:00 PM.',
      priority: 'guest_experience',
      additionalNotes: 'Pro-night celebrity indie rock band, battle of the bands, food truck street zone.',
      contingencyReservePercent: 12,
      plan: generateSmartCelebrationPlan({
        name: 'TechUtsav 2026',
        category: 'fest',
        date,
        city: 'New Delhi',
        guestCount: 1200,
        totalBudget: 1200000,
        themePreference: 'Cyberpunk Prism & Neon Bass',
        venuePreference: 'outdoor',
        dietaryPreference: 'mixed_veg_nonveg',
        culturalRequirements: 'Sound permissions',
        priority: 'guest_experience',
        additionalNotes: 'Pro-night indie band',
      }),
      planMeta: {
        source: 'demo',
        generatedAt: agoDays(10),
      },
      confirmedSections: [],
      savedIdeas: ['Silent disco zone for after 10 PM sound curfew.'],
      budgetItems,
      timeline,
      daySchedule: generateDaySchedule('fest'),
      vendors,
      chatHistory: [],
      activity: [{ id: 'act-1', at: agoDays(10), text: 'Event created with demo plan' }],
    };
  })(),
];
