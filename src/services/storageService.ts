import { EventData, PlanSectionKey } from '../types';
import { SAMPLE_EVENTS } from '../data/sampleEvents';

const STORAGE_KEY = 'utsav_ai_events_v2';
const LEGACY_STORAGE_KEY = 'utsav_ai_events_v1';

export const getStoredEvents = (): EventData[] => {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migrate from v1 if present, otherwise seed with rich sample events
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        try {
          const parsedLegacy = JSON.parse(legacy);
          if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
            localStorage.setItem(STORAGE_KEY, legacy);
            raw = legacy;
          }
        } catch {}
      }
    }

    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EVENTS));
      return SAMPLE_EVENTS;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EVENTS));
      return SAMPLE_EVENTS;
    }

    // Ensure backwards compatibility with older schema items
    return parsed.map((e: any) => ({
      ...e,
      savedIdeas: e.savedIdeas ?? [],
      confirmedSections: e.confirmedSections ?? [],
      activity: e.activity ?? [],
      daySchedule: e.daySchedule ?? [],
      budgetItems: e.budgetItems ?? e.budgetBreakdown ?? [],
      contingencyReservePercent: e.contingencyReservePercent ?? e.contingencyPercentage ?? 10,
    }));
  } catch (e) {
    console.error('[Error reading events from storage]:', e);
    return SAMPLE_EVENTS;
  }
};

export const getEvents = getStoredEvents;

export const getEventById = (id: string): EventData | undefined => {
  const events = getStoredEvents();
  return events.find((e) => e.id === id);
};

export const saveEvent = (event: EventData): void => {
  const events = getStoredEvents();
  const index = events.findIndex((e) => e.id === event.id);
  const updatedEvent: EventData = {
    ...event,
    updatedAt: new Date().toISOString(),
  };

  if (index >= 0) {
    events[index] = updatedEvent;
  } else {
    events.unshift(updatedEvent);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const deleteEvent = (id: string): void => {
  const events = getStoredEvents().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const duplicateEvent = (id: string): EventData | null => {
  const existing = getEventById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  const clone: EventData = {
    ...JSON.parse(JSON.stringify(existing)),
    id: `event-${Date.now()}`,
    name: `${existing.name} (Copy)`,
    createdAt: now,
    updatedAt: now,
    isDemo: false,
    activity: [{ id: `act-${Date.now()}`, at: now, text: `Duplicated from "${existing.name}"` }],
  };

  saveEvent(clone);
  return clone;
};

export const recordEventActivity = (eventId: string, text: string): void => {
  const ev = getEventById(eventId);
  if (!ev) return;
  const entry = { id: `act-${Date.now()}`, at: new Date().toISOString(), text };
  const updated: EventData = {
    ...ev,
    activity: [entry, ...(ev.activity ?? [])].slice(0, 30),
  };
  saveEvent(updated);
};

export const toggleSectionConfirmed = (eventId: string, section: PlanSectionKey): EventData | null => {
  const ev = getEventById(eventId);
  if (!ev) return null;
  const current = new Set(ev.confirmedSections ?? []);
  if (current.has(section)) {
    current.delete(section);
  } else {
    current.add(section);
  }
  const updated: EventData = {
    ...ev,
    confirmedSections: Array.from(current),
  };
  saveEvent(updated);
  return updated;
};

export const pinIdea = (eventId: string, ideaText: string): EventData | null => {
  const ev = getEventById(eventId);
  if (!ev) return null;
  const current = ev.savedIdeas ?? [];
  if (current.includes(ideaText)) return ev;
  const updated: EventData = {
    ...ev,
    savedIdeas: [ideaText, ...current],
  };
  saveEvent(updated);
  recordEventActivity(eventId, `Pinned idea: "${ideaText.slice(0, 40)}..."`);
  return updated;
};

export const exportEventsJSON = (): string => {
  const events = getStoredEvents();
  return JSON.stringify(events, null, 2);
};

export const importEventsJSON = (jsonString: string): boolean => {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return true;
    }
    return false;
  } catch (err) {
    console.error('Failed to import JSON:', err);
    return false;
  }
};
