/**
 * Browser-side client for the server AI gateway (/api/ai).
 * No API keys live here. When the gateway is unavailable (no key configured, static hosting,
 * offline) callers receive an AIError and fall back to the clearly-labelled demo planner.
 */
import type { EventData, EventPlan, PlanMeta, PlanSectionKey } from '../types';
import { AIStatus, AssistantReply, EventContext, LIMITS } from '../shared/aiContract';

export type AIErrorCode = 'not_configured' | 'rate_limited' | 'network' | 'invalid_response' | 'provider_error' | 'bad_request';

export class AIError extends Error {
  constructor(public code: AIErrorCode, message: string) {
    super(message);
  }
}

const ENDPOINT = '/api/ai';

async function post<T>(body: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: signal ?? AbortSignal.timeout(60_000),
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') throw e;
    throw new AIError('network', 'Could not reach the AI service.');
  }
  const type = res.headers.get('content-type') ?? '';
  // Static hosts (e.g. shared hosting) answer /api/ai with index.html or 404 → treat as not configured.
  if (!type.includes('application/json')) throw new AIError('not_configured', 'AI service is not available on this host.');
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const code = (data?.error as AIErrorCode) ?? 'provider_error';
    throw new AIError(code, data?.message ?? 'The AI request failed.');
  }
  return data as T;
}

let statusCache: Promise<AIStatus> | null = null;
export function getAIStatus(): Promise<AIStatus> {
  statusCache ??= fetch(ENDPOINT)
    .then(async (r) => ((r.headers.get('content-type') ?? '').includes('application/json') ? ((await r.json()) as AIStatus) : { configured: false }))
    .catch(() => ({ configured: false }));
  return statusCache;
}

/** Build the compact, size-capped context the server needs. */
export function toEventContext(e: Pick<EventData, 'name' | 'category' | 'date' | 'city' | 'guestCount' | 'totalBudget' | 'themePreference' | 'venuePreference' | 'dietaryPreference' | 'priority'> & Partial<EventData>): EventContext {
  const cut = (s?: string) => (s ?? '').slice(0, LIMITS.fieldChars);
  return {
    name: e.name,
    category: e.category,
    date: e.date,
    city: e.city,
    guestCount: e.guestCount,
    totalBudget: e.totalBudget,
    theme: e.themePreference,
    venue: e.venuePreference,
    dietary: e.dietaryPreference,
    priority: e.priority,
    culturalRequirements: cut(e.culturalRequirements),
    accessibilityNeeds: cut(e.accessibilityNeeds),
    notes: cut(e.additionalNotes),
    contingencyPercent: e.contingencyReservePercent,
    budget: e.budgetItems?.map((b) => ({ name: b.name, planned: b.estimatedCost, actual: b.actualCost })),
    openTasks: e.timeline
      ?.filter((t) => t.status !== 'completed')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 15)
      .map((t) => ({ title: t.title, due: t.dueDate, priority: t.priority })),
    vendors: e.vendors?.map((v) => ({ category: v.category, status: v.status })),
  };
}

export function requestPlan(event: EventContext, signal?: AbortSignal) {
  return post<{ plan: EventPlan; meta: PlanMeta }>({ kind: 'plan', event }, signal);
}

export function requestSection(event: EventContext, section: PlanSectionKey, current: unknown, signal?: AbortSignal) {
  return post<{ value: unknown; meta: PlanMeta }>({ kind: 'section', event, section, current }, signal);
}

export function requestAssistant(
  event: EventContext,
  message: string,
  history: { role: 'user' | 'assistant'; text: string }[],
  today: string,
  signal?: AbortSignal,
) {
  return post<{ reply: AssistantReply; meta: PlanMeta }>({ kind: 'assistant', event, message, history, today }, signal);
}

