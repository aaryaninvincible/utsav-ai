import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  Info,
  Building,
  Utensils,
  Eye,
  Sliders,
  Compass,
} from 'lucide-react';
import {
  EventData,
  EventCategory,
  EventPriority,
  DietaryPreference,
  VenuePreference,
} from '../types';
import { generateCompleteEvent, formatINR } from '../services/aiService';
import { saveEvent } from '../services/storageService';

interface CreateEventWizardProps {
  onBack: () => void;
  onEventCreated: (event: EventData) => void;
}

const CATEGORIES: { id: EventCategory; label: string; desc: string }[] = [
  { id: 'wedding', label: 'Wedding & Engagement', desc: 'Grand royal, destination, or intimate traditional rituals' },
  { id: 'birthday', label: 'Birthday & Milestone', desc: '1st birthday fiestas, themed celebrations, and golden jubilees' },
  { id: 'fest', label: 'College & Cultural Fest', desc: 'Concerts, competitions, student crowds & pro-night logistics' },
  { id: 'cultural', label: 'Traditional Pooja & Festival', desc: 'Diwali, Navratri, Griha Pravesh, and sacred family rituals' },
  { id: 'anniversary', label: 'Anniversary Milestone', desc: 'Silver, golden, or romantic anniversary gatherings' },
  { id: 'corporate', label: 'Corporate Gala / Retreat', desc: 'Annual conferences, awards ceremonies, and team summits' },
  { id: 'family', label: 'Family Gathering & Reunion', desc: 'Warm reunions, baby showers (Godh Bharai), and lunches' },
];

const POPULAR_CITIES = ['Jaipur', 'Udaipur', 'Delhi NCR', 'Bengaluru', 'Mumbai', 'Goa', 'Hyderabad', 'Pune', 'Kolkata'];

const BUDGET_PRESETS = [
  { label: '₹1.5 Lakhs', value: 150000, desc: 'Intimate Gathering' },
  { label: '₹5 Lakhs', value: 500000, desc: 'Quality Celebration' },
  { label: '₹15 Lakhs', value: 1500000, desc: 'Grand Celebration' },
  { label: '₹35 Lakhs', value: 3500000, desc: 'Luxury Experience' },
  { label: '₹75 Lakhs', value: 7500000, desc: 'Royal Destination' },
];

const THEME_OPTIONS = [
  'Royal Rajputana Heritage & Marigold Splendor',
  'Minimalist Pastel Chic with Fairy Lights',
  'South Indian Temple Brass & Mogra Radiance',
  'Neon Cyberpunk & Electric Night Bass',
  'Rustic Bohemian Outdoor Garden & Terracotta',
  'Bollywood Glamour & Red Carpet Retro',
  'Eco-Friendly Earthy Greens & Zero Waste',
  'Classic Ivory, Gold & Royal Crimson Elegance',
];

export const CreateEventWizard: React.FC<CreateEventWizardProps> = ({ onBack, onEventCreated }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<EventCategory>('wedding');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().split('T')[0];
  });
  const [city, setCity] = useState('Jaipur');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [totalBudget, setTotalBudget] = useState<number>(1500000);
  const [contingencyRate, setContingencyRate] = useState<number>(10);

  // Step 3 Preferences
  const [venuePreference, setVenuePreference] = useState<VenuePreference>('heritage_destination');
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>('pure_veg');
  const [priority, setPriority] = useState<EventPriority>('guest_experience');
  const [theme, setTheme] = useState(THEME_OPTIONS[0]);
  const [customTheme, setCustomTheme] = useState('');
  const [culturalRequirements, setCulturalRequirements] = useState('');
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('');
  const [notes, setNotes] = useState('');

  const handleNext = () => {
    setError(null);
    if (currentStep === 1) {
      if (!name.trim()) {
        setError('Please enter a memorable celebration title.');
        return;
      }
      if (!date) {
        setError('Please select the celebration date.');
        return;
      }
      if (!city.trim()) {
        setError('Please enter the event city or destination.');
        return;
      }
    } else if (currentStep === 2) {
      if (guestCount < 5) {
        setError('Guest count must be at least 5 guests.');
        return;
      }
      if (totalBudget < 10000) {
        setError('Total budget must be at least ₹10,000 for realistic planning.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setError(null);
    if (currentStep === 1) {
      onBack();
    } else {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      setGenerationStep('Validating celebration specifications...');
      await new Promise((r) => setTimeout(r, 400));

      setGenerationStep('Synthesizing customized celebration concept & themes...');
      await new Promise((r) => setTimeout(r, 500));

      setGenerationStep('Calculating deterministic rupee allocations across categories...');
      await new Promise((r) => setTimeout(r, 400));

      setGenerationStep('Anchor date-aware milestones and preparing vendor checklist...');

      const activeTheme = customTheme.trim() || theme;

      const { event: generatedEvent } = await generateCompleteEvent({
        name,
        category,
        date,
        city,
        guestCount,
        totalBudget,
        contingencyPercentage: contingencyRate,
        venuePreference,
        dietaryPreference,
        priority,
        theme: activeTheme,
        notes: notes.trim() ? notes : undefined,
        culturalRequirements: culturalRequirements.trim() ? culturalRequirements : undefined,
        accessibilityNeeds: accessibilityNeeds.trim() ? accessibilityNeeds : undefined,
      });

      setGenerationStep('Finalizing blueprints and persisting to storage...');
      await new Promise((r) => setTimeout(r, 300));

      saveEvent(generatedEvent);
      onEventCreated(generatedEvent);
    } catch (err: any) {
      console.error('Plan generation failed:', err);
      setError(err?.message || 'Failed to generate event plan. Please check inputs or retry.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="shell py-8 max-w-4xl">
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-line pb-5 mb-8">
        <button
          onClick={handleBack}
          className="btn-secondary btn-sm"
          disabled={isGenerating}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Cancel' : 'Previous Step'}</span>
        </button>

        {/* Step Indicator */}
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  currentStep === step
                    ? 'bg-maroon text-on-primary ring-4 ring-gold/25'
                    : currentStep > step
                    ? 'bg-forest text-white'
                    : 'bg-surface-2 text-ink-2 border border-line'
                }`}
              >
                {currentStep > step ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-6 sm:w-10 h-0.5 mx-1 transition-all ${
                    currentStep > step ? 'bg-forest' : 'bg-line'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <span className="eyebrow hidden sm:inline-flex">
          Step {currentStep} of 4
        </span>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-xs sm:text-sm flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Celebration Basics */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div>
            <span className="eyebrow">Step 1 — Foundation</span>
            <h2 className="text-display-md font-bold text-ink mt-1 font-display">
              What Are We Celebrating?
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-1">
              Provide the title, celebration type, date, and host city.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="field-label">Celebration Title *</label>
              <input
                type="text"
                placeholder="e.g. Aditi & Rohan's Royal Heritage Wedding, Aarav's 1st Birthday"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
              <span className="field-hint">This name will appear on all invitations and vendor briefs.</span>
            </div>

            <div>
              <label className="field-label">Celebration Category</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      category === cat.id
                        ? 'border-gold bg-surface-2 ring-1 ring-gold/40 shadow-sm'
                        : 'border-line bg-surface hover:bg-surface-2'
                    }`}
                  >
                    <span className="font-semibold text-xs sm:text-sm text-ink">{cat.label}</span>
                    <span className="text-[11px] text-ink-2 mt-1">{cat.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Celebration Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                  />
                </div>
                <span className="field-hint">Used to calculate vendor lead times & rehearsal schedule.</span>
              </div>

              <div>
                <label className="field-label">Host City / Destination *</label>
                <input
                  type="text"
                  placeholder="e.g. Jaipur, Rajasthan or Bengaluru"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="input"
                />
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {POPULAR_CITIES.slice(0, 5).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border ${
                        city === c
                          ? 'border-gold bg-gold/15 text-gold-ink font-semibold'
                          : 'border-line bg-surface-2 text-ink-2 hover:text-ink'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Scale & Budget in INR */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div>
            <span className="eyebrow">Step 2 — Scale & Budget</span>
            <h2 className="text-display-md font-bold text-ink mt-1 font-display">
              Scale & Financial Boundaries
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-1">
              Indian celebration arithmetic. All category quotas are calculated deterministically.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="field-label">Estimated Guest Headcount: <strong className="text-gold-ink">{guestCount} Guests</strong></label>
              <input
                type="range"
                min="10"
                max="1500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-maroon"
              />
              <div className="flex justify-between text-[11px] text-ink-2 font-mono pt-1">
                <span>10 (Intimate)</span>
                <span>250 (Classic)</span>
                <span>750 (Grand)</span>
                <span>1500+ (Extravaganza)</span>
              </div>
            </div>

            <div>
              <label className="field-label">Total Planned Budget in INR: <strong className="text-gold-ink font-display text-lg">{formatINR(totalBudget)}</strong></label>
              <input
                type="number"
                min="10000"
                step="10000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="input tabular font-display text-base"
              />
              
              {/* Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2.5">
                {BUDGET_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setTotalBudget(p.value)}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      totalBudget === p.value
                        ? 'border-gold bg-gold/15 text-gold-ink font-bold'
                        : 'border-line bg-surface hover:bg-surface-2 text-ink-2'
                    }`}
                  >
                    <span className="text-xs block font-display font-semibold">{p.label}</span>
                    <span className="text-[10px] block opacity-80">{p.desc}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-surface-2 border border-line flex items-center justify-between text-xs text-ink-2">
                <span>Average Spend per Guest:</span>
                <span className="font-bold text-ink tabular text-sm">
                  {formatINR(Math.round(totalBudget / Math.max(1, guestCount)))} / guest
                </span>
              </div>
            </div>

            <div>
              <label className="field-label">Contingency Buffer Reserve: <strong className="text-forest font-semibold">{contingencyRate}% ({formatINR(totalBudget * (contingencyRate / 100))})</strong></label>
              <select
                value={contingencyRate}
                onChange={(e) => setContingencyRate(Number(e.target.value))}
                className="input text-xs sm:text-sm"
              >
                <option value="5">5% — Strict, very tight margin</option>
                <option value="10">10% — Recommended standard buffer</option>
                <option value="15">15% — Cautious for destination / outdoor weather</option>
                <option value="20">20% — High uncertainty buffer</option>
              </select>
              <span className="field-hint">This reserve stays untouched until the final 48 hours for unforeseen vendor fees or surge headcount.</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Aesthetics & Requirements */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div>
            <span className="eyebrow">Step 3 — Experience & Culture</span>
            <h2 className="text-display-md font-bold text-ink mt-1 font-display">
              Aesthetics, Dietary & Special Care
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-1">
              Curate the ambience, venue typology, food restrictions, and cultural expectations.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="field-label">Aesthetic Theme & Moodboard</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="input text-xs sm:text-sm mb-2"
              >
                {THEME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Or specify custom theme (e.g. Udaipur Lakeside Sunset Chiffon)..."
                value={customTheme}
                onChange={(e) => setCustomTheme(e.target.value)}
                className="input text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Venue Typology</label>
                <select
                  value={venuePreference}
                  onChange={(e) => setVenuePreference(e.target.value as VenuePreference)}
                  className="input text-xs sm:text-sm"
                >
                  <option value="heritage_destination">Heritage Palace / Fort / Havelis</option>
                  <option value="banquet_hall">Indoor AC Banquet Hall</option>
                  <option value="open_lawn">Sprawling Open Lawn / Farmhouse</option>
                  <option value="outdoor">Terrace / Poolside Sundowner</option>
                  <option value="indoor">Intimate Private Lounge</option>
                </select>
              </div>

              <div>
                <label className="field-label">Dietary & Feast Preference</label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value as DietaryPreference)}
                  className="input text-xs sm:text-sm"
                >
                  <option value="pure_veg">100% Pure Vegetarian Feast</option>
                  <option value="jain">Strict Jain (No Onion, Garlic or Root Vegetables)</option>
                  <option value="mixed_veg_nonveg">Mixed Veg & Non-Vegetarian Delights</option>
                  <option value="vegan">Modern Plant-Based / Vegan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="field-label">Cultural & Ritual Specifics (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Marwari pheras, Shehnai welcome, Punjabi bhangra dhol..."
                  value={culturalRequirements}
                  onChange={(e) => setCulturalRequirements(e.target.value)}
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="field-label">Accessibility & Elder Care (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Wheelchair ramps required, quiet air-conditioned seating for elders..."
                  value={accessibilityNeeds}
                  onChange={(e) => setAccessibilityNeeds(e.target.value)}
                  className="input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="field-label">Primary Celebration Priority</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[
                  { id: 'guest_experience', label: 'Guest Hospitality' },
                  { id: 'luxury', label: 'Visual Grandeur' },
                  { id: 'affordability', label: 'Budget Efficiency' },
                  { id: 'sustainability', label: 'Eco-Friendly / Zero Waste' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id as EventPriority)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-colors ${
                      priority === p.id
                        ? 'border-gold bg-gold/15 text-gold-ink'
                        : 'border-line bg-surface hover:bg-surface-2 text-ink-2'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Review Before Generation */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div>
            <span className="eyebrow">Step 4 — Final Review</span>
            <h2 className="text-display-md font-bold text-ink mt-1 font-display">
              Review Celebration Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 mt-1">
              Confirm your event parameters. Once initiated, Utsav AI will synthesize your personalized plan, budget line items, and vendor checklist.
            </p>
          </div>

          <div className="card p-6 space-y-4 bg-surface-2/40 border-gold/40">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <span className="chip text-[10px] uppercase font-bold text-gold-ink">{category}</span>
                <h3 className="font-display text-xl font-bold text-ink mt-1">{name}</h3>
              </div>
              <span className="font-display font-bold text-lg text-maroon dark:text-gold tabular">
                {formatINR(totalBudget)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-ink-2 block">Date & Timeline</span>
                <span className="font-semibold text-ink">
                  {new Date(`${date}T12:00:00`).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-ink-2 block">City / Destination</span>
                <span className="font-semibold text-ink">{city}</span>
              </div>
              <div>
                <span className="text-ink-2 block">Headcount</span>
                <span className="font-semibold text-ink">{guestCount} Confirmed Guests</span>
              </div>
              <div>
                <span className="text-ink-2 block">Theme Concept</span>
                <span className="font-semibold text-ink">{customTheme.trim() || theme}</span>
              </div>
              <div>
                <span className="text-ink-2 block">Dietary Rule</span>
                <span className="font-semibold text-ink">{dietaryPreference.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-ink-2 block">Contingency Reserve</span>
                <span className="font-semibold text-forest font-mono">
                  {contingencyRate}% ({formatINR(totalBudget * (contingencyRate / 100))})
                </span>
              </div>
            </div>

            {accessibilityNeeds && (
              <div className="pt-2 text-xs text-ink-2 border-t border-line/60">
                <strong className="text-ink">Accessibility Needs:</strong> {accessibilityNeeds}
              </div>
            )}
          </div>

          {/* Generation Animation Box when in progress */}
          {isGenerating && (
            <div className="card p-6 bg-surface border-gold/60 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-maroon/10 border border-gold/40 flex items-center justify-center mx-auto text-gold-ink animate-spin-slow">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base text-ink">
                  Crafting Celebration Blueprint
                </h4>
                <p className="text-xs text-ink-2 font-mono animate-pulse">
                  {generationStep}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-8 border-t border-line mt-8">
        <button
          type="button"
          onClick={handleBack}
          className="btn-secondary"
          disabled={isGenerating}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary px-8 shadow-lift"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Generate Celebration Blueprint</span>
          </button>
        )}
      </div>
    </div>
  );
};
