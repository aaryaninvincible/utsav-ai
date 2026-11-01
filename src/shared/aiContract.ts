/**
 * Shared AI request/response contract.
 * Imported by BOTH the browser client and the server handler, so it must stay free of DOM/Node APIs.
 * Every model response is validated against these shapes before it reaches the UI.
 */
import type { EventPlan, PlanSectionKey, TaskPriority, TaskSuggestion } from '../types';

export const PLAN_SECTIONS: PlanSectionKey[] = [
  'overview',
  'colorPalette',
  'decorIdeas',
  'recommendedActivities',
  'cateringConsiderations',
  'guestExperience',
  'risksAndContingencies',
  'ecoFriendlyAlternatives',
];

/** Compact, size-capped event context sent to the server (never the whole stored object). */
export interface EventContext {
  name: string;
  category: string;
  date: string;
  city: string;
  guestCount: number;
  totalBudget: number;
  theme: string;
  venue: string;
  dietary: string;
  priority: string;
  culturalRequirements?: string;
  accessibilityNeeds?: string;
  notes?: string;
  contingencyPercent?: number;
  budget?: { name: string; planned: number; actual: number }[];
  openTasks?: { title: string; due: string; priority: string }[];
  vendors?: { category: string; status: string }[];
}

export type AIRequest =
  | { kind: 'plan'; event: EventContext }
  | { kind: 'section'; event: EventContext; section: PlanSectionKey; current?: unknown }
  | {
      kind: 'assistant';
      event: EventContext;
      message: string;
      history: { role: 'user' | 'assistant'; text: string }[];
      today: string;
    };

export interface AssistantReply {
  answer: string;
  followUps: string[];
  taskSuggestions: TaskSuggestion[];
}

export interface AIStatus {
  configured: boolean;
  provider?: 'gemini' | 'ollama';
  model?: string;
}

// Limits — enforced on the server, mirrored on the client for early feedback.
export const LIMITS = {
  messageChars: 1200,
  historyItems: 8,
  historyChars: 1500,
  fieldChars: 400,
  bodyBytes: 24_000,
};

/* ----------------------------- JSON Schemas ------------------------------ */
// Passed to Gemini as `responseJsonSchema` so output is structurally constrained.

const str = { type: 'string' } as const;
const strArr = (min = 2, max = 8) => ({ type: 'array', items: str, minItems: min, maxItems: max });

export const SECTION_SCHEMAS: Record<PlanSectionKey, object> = {
  overview: str,
  colorPalette: {
    type: 'array',
    minItems: 3,
    maxItems: 6,
    items: {
      type: 'object',
      properties: { name: str, hex: { type: 'string', description: '#RRGGBB' } },
      required: ['name', 'hex'],
    },
  },
  decorIdeas: strArr(3, 8),
  recommendedActivities: {
    type: 'array',
    minItems: 3,
    maxItems: 8,
    items: {
      type: 'object',
      properties: { title: str, timing: str, description: str },
      required: ['title', 'timing', 'description'],
    },
  },
  cateringConsiderations: strArr(3, 8),
  guestExperience: strArr(2, 8),
  risksAndContingencies: {
    type: 'array',
    minItems: 2,
    maxItems: 6,
    items: {
      type: 'object',
      properties: { risk: str, contingency: str },
      required: ['risk', 'contingency'],
    },
  },
  ecoFriendlyAlternatives: strArr(2, 6),
};

export const PLAN_SCHEMA = {
  type: 'object',
  properties: {
    concept: str,
    theme: str,
    ...SECTION_SCHEMAS,
  },
  required: ['concept', 'theme', ...PLAN_SECTIONS],
};

export const ASSISTANT_SCHEMA = {
  type: 'object',
  properties: {
    answer: { type: 'string', description: 'Plain text. Short paragraphs or "- " bullet lines. No HTML.' },
    followUps: strArr(0, 3),
    taskSuggestions: {
      type: 'array',
      maxItems: 4,
      items: {
        type: 'object',
        properties: {
          title: str,
          description: str,
          priority: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          daysBefore: { type: 'integer', minimum: 0, maximum: 365 },
        },
        required: ['title', 'description', 'priority', 'daysBefore'],
      },
    },
  },
  required: ['answer', 'followUps', 'taskSuggestions'],
};

/* ------------------------------ Validators ------------------------------- */

const isStr = (v: unknown, max = 2000): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
const cleanStrArr = (v: unknown, max = 600): string[] | null =>
  Array.isArray(v) && v.every((x) => isStr(x, max)) ? (v as string[]).map((s) => s.trim()) : null;
const HEX = /^#[0-9a-fA-F]{6}$/;
const PRIORITIES: TaskPriority[] = ['critical', 'high', 'medium', 'low'];

export function validateSection(section: PlanSectionKey, v: unknown): unknown | null {
  switch (section) {
    case 'overview':
      return isStr(v, 2000) ? v.trim() : null;
    case 'decorIdeas':
    case 'cateringConsiderations':
    case 'guestExperience':
    case 'ecoFriendlyAlternatives': {
      const arr = cleanStrArr(v);
      return arr && arr.length > 0 ? arr.slice(0, 8) : null;
    }
    case 'colorPalette':
      return Array.isArray(v) &&
        v.length > 0 &&
        v.every((c) => c && isStr(c.name, 60) && typeof c.hex === 'string' && HEX.test(c.hex))
        ? v.slice(0, 6).map((c) => ({ name: c.name.trim(), hex: c.hex.toUpperCase() }))
        : null;
    case 'recommendedActivities':
      return Array.isArray(v) &&
        v.length > 0 &&
        v.every((a) => a && isStr(a.title, 120) && isStr(a.timing, 80) && isStr(a.description, 600))
        ? v.slice(0, 8).map((a) => ({ title: a.title.trim(), timing: a.timing.trim(), description: a.description.trim() }))
        : null;
    case 'risksAndContingencies':
      return Array.isArray(v) && v.length > 0 && v.every((r) => r && isStr(r.risk, 300) && isStr(r.contingency, 600))
        ? v.slice(0, 6).map((r) => ({ risk: r.risk.trim(), contingency: r.contingency.trim() }))
        : null;
    default:
      return null;
  }
}

export function validatePlan(v: unknown): EventPlan | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  if (!isStr(o.concept, 600) || !isStr(o.theme, 160)) return null;
  const plan: Record<string, unknown> = { concept: (o.concept as string).trim(), theme: (o.theme as string).trim() };
  for (const key of PLAN_SECTIONS) {
    const val = validateSection(key, o[key]);
    if (val === null) return null;
    plan[key] = val;
  }
  return plan as unknown as EventPlan;
}

export function validateAssistant(v: unknown): AssistantReply | null {
  if (!v || typeof v !== 'object') return null;
  const o = v as Record<string, unknown>;
  if (!isStr(o.answer, 6000)) return null;
  const followUps = Array.isArray(o.followUps) ? (o.followUps.filter((f) => isStr(f, 160)) as string[]).slice(0, 3) : [];
  const taskSuggestions: TaskSuggestion[] = Array.isArray(o.taskSuggestions)
    ? o.taskSuggestions
        .filter(
          (t) =>
            t &&
            isStr(t.title, 140) &&
            isStr(t.description, 500) &&
            PRIORITIES.includes(t.priority) &&
            Number.isFinite(t.daysBefore),
        )
        .slice(0, 4)
        .map((t) => ({
          title: t.title.trim(),
          description: t.description.trim(),
          priority: t.priority,
          daysBefore: Math.max(0, Math.min(365, Math.round(t.daysBefore))),
        }))
    : [];
  return { answer: (o.answer as string).trim(), followUps, taskSuggestions };
}

