export type EventCategory =
  | 'wedding'
  | 'birthday'
  | 'anniversary'
  | 'fest'
  | 'cultural'
  | 'corporate'
  | 'family';

export type EventPriority =
  | 'affordability'
  | 'luxury'
  | 'sustainability'
  | 'guest_experience';

export type DietaryPreference =
  | 'pure_veg'
  | 'jain'
  | 'mixed_veg_nonveg'
  | 'vegan';

export type VenuePreference =
  | 'indoor'
  | 'outdoor'
  | 'heritage_destination'
  | 'banquet_hall'
  | 'open_lawn';

export interface BudgetItem {
  id: string;
  category: string;
  name: string;
  estimatedCost: number;
  actualCost: number;
  notes?: string;
  color?: string;
}

export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type TaskPhase =
  | '90-60 Days'
  | '60-30 Days'
  | '30-14 Days'
  | '14-7 Days'
  | 'Final 48 Hours'
  | 'Event Day';

export interface TimelineTask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  daysBefore: number;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  phase: TaskPhase;
  assignedTo?: string;
  notes?: string;
}

/** Vendor status reflects what the *user* has recorded — never inferred availability. */
export type VendorStatus = 'to_research' | 'shortlisted' | 'contacted' | 'confirmed';

export interface VendorItem {
  id: string;
  category: string;
  name: string;
  requirements: string;
  estimatedCost: number;
  actualCost?: number;
  contactName?: string;
  phone?: string;
  email?: string;
  status: VendorStatus;
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface EventPlan {
  concept: string;
  theme: string;
  overview: string;
  colorPalette: { name: string; hex: string }[];
  decorIdeas: string[];
  recommendedActivities: { title: string; timing: string; description: string }[];
  cateringConsiderations: string[];
  guestExperience: string[];
  risksAndContingencies: { risk: string; contingency: string }[];
  ecoFriendlyAlternatives: string[];
}

/** Sections of the plan that can be regenerated / confirmed independently. */
export type PlanSectionKey =
  | 'overview'
  | 'colorPalette'
  | 'decorIdeas'
  | 'recommendedActivities'
  | 'cateringConsiderations'
  | 'guestExperience'
  | 'risksAndContingencies'
  | 'ecoFriendlyAlternatives';

/** Where generated content came from. "demo" = built-in offline planner, never a live model. */
export type AISource = 'gemini' | 'ollama' | 'demo';

export interface PlanMeta {
  source: AISource;
  model?: string;
  generatedAt: string;
}

export interface ScheduleSlot {
  id: string;
  time: string; // HH:MM 24h
  title: string;
  detail?: string;
}

export interface ActivityEntry {
  id: string;
  at: string; // ISO timestamp
  text: string;
}

export interface TaskSuggestion {
  title: string;
  description: string;
  priority: TaskPriority;
  daysBefore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: AISource;
  followUps?: string[];
  taskSuggestions?: TaskSuggestion[];
  /** Legacy field from v1 data. */
  suggestedActions?: string[];
}

export interface EventData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  category: EventCategory;
  date: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  themePreference: string;
  venuePreference: VenuePreference;
  dietaryPreference: DietaryPreference;
  culturalRequirements?: string;
  accessibilityNeeds?: string;
  priority: EventPriority;
  additionalNotes?: string;
  contingencyReservePercent: number; // e.g. 10 (%)
  contingencyPercentage?: number; // legacy alias
  aiEngine?: 'local_ollama' | 'gemini' | 'auto';

  /** True for seeded example events so the UI can label them as demo data. */
  isDemo?: boolean;

  plan: EventPlan;
  planMeta?: PlanMeta;
  /** Plan sections the user has explicitly confirmed (vs. editable suggestions). */
  confirmedSections?: PlanSectionKey[];
  /** Ideas the user pinned from the assistant or plan. */
  savedIdeas?: string[];

  budgetItems: BudgetItem[];
  budgetBreakdown?: BudgetItem[]; // legacy alias
  timeline: TimelineTask[];
  daySchedule?: ScheduleSlot[];
  vendors: VendorItem[];
  chatHistory: ChatMessage[];
  activity?: ActivityEntry[];
}
