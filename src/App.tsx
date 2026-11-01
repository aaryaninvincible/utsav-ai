import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateEventWizard } from './pages/CreateEventWizard';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { InspirationPage } from './pages/InspirationPage';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ExportModal } from './components/ExportModal';
import { FestiveMarqueeTicker } from './components/FestiveMarqueeTicker';
import { FestiveCalendarModal } from './components/FestiveCalendarModal';
import { FestiveBannerStudioModal } from './components/FestiveBannerStudioModal';
import { EventData, EventCategory } from './types';
import { 
  getEvents, 
  getEventById, 
  saveEvent, 
  deleteEvent as deleteEventStorage, 
  duplicateEvent as duplicateEventStorage 
} from './services/storageService';
import {
  FestivalTheme,
  getActiveFestivalTheme,
  setFestivalTheme,
  applyThemeVariables,
} from './services/festivalThemeService';
import { GeneratedBannerConcept } from './services/multiAgentRouter';

type ViewMode = 'landing' | 'dashboard' | 'create' | 'details' | 'inspiration';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  
  // Festive & Cultural Engine State
  const [currentFestival, setCurrentFestival] = useState<FestivalTheme>(getActiveFestivalTheme());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBannerStudioOpen, setIsBannerStudioOpen] = useState(false);

  // Modals
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState<string>('');

  // Initial load
  useEffect(() => {
    const loaded = getEvents();
    setEvents(loaded);
    if (loaded.length > 0 && !activeEvent) {
      setActiveEvent(loaded[0]);
    }
    const detected = getActiveFestivalTheme();
    setCurrentFestival(detected);
    applyThemeVariables(detected);
  }, []);

  const handleFestivalChange = (newTheme: FestivalTheme) => {
    setCurrentFestival(newTheme);
    setFestivalTheme(newTheme.id);
    applyThemeVariables(newTheme);
  };

  const refreshEvents = () => {
    const loaded = getEvents();
    setEvents(loaded);
    if (activeEvent) {
      const refreshedActive = loaded.find((e: EventData) => e.id === activeEvent.id);
      if (refreshedActive) {
        setActiveEvent(refreshedActive);
      }
    }
  };

  const handleNavigate = (tab: string, eventId?: string) => {
    if (eventId) {
      const ev = getEventById(eventId);
      if (ev) {
        setActiveEvent(ev);
        setCurrentView('details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    if (tab === 'landing' || tab === 'dashboard' || tab === 'create' || tab === 'details' || tab === 'inspiration') {
      setCurrentView(tab as ViewMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectEvent = (eventId: string, tab?: string) => {
    const ev = getEventById(eventId);
    if (ev) {
      setActiveEvent(ev);
      setCurrentView('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEventCreated = (newEvent: EventData) => {
    refreshEvents();
    setActiveEvent(newEvent);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicate = (eventId: string) => {
    const duplicated = duplicateEventStorage(eventId);
    if (duplicated) {
      refreshEvents();
      setActiveEvent(duplicated);
      setCurrentView('details');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (eventId: string) => {
    deleteEventStorage(eventId);
    refreshEvents();
    if (activeEvent && activeEvent.id === eventId) {
      const remaining = getEvents();
      setActiveEvent(remaining[0] || null);
    }
  };

  const handlePlanTheme = (themeName: string, category: EventCategory) => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlanFestivalFromCalendar = (festivalName: string) => {
    setCurrentView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateActiveEvent = (updated: EventData) => {
    saveEvent(updated);
    setActiveEvent(updated);
    refreshEvents();
  };

  const handleOpenAIWithPrompt = (prompt?: string) => {
    if (prompt) {
      setAiAssistantPrompt(prompt);
    }
    if (!activeEvent && events.length > 0) {
      setActiveEvent(events[0]);
    }
    setIsAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans selection:bg-maroon selection:text-on-primary">
      
      {/* Universal Top Navigation with Liquid Glass & Festival Selector */}
      <Navbar
        currentTab={currentView}
        onNavigate={handleNavigate}
        activeEventName={activeEvent ? activeEvent.name : undefined}
        onOpenAIAssistant={() => handleOpenAIWithPrompt()}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onOpenBannerStudio={() => setIsBannerStudioOpen(true)}
        currentFestival={currentFestival}
        onFestivalChange={handleFestivalChange}
      />

      {/* Live Festival Marquee Ticker */}
      <FestiveMarqueeTicker
        festival={currentFestival}
        onOpenCalendar={() => setIsCalendarOpen(true)}
        onExploreDiwali={() => handleNavigate('landing')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartPlanning={(cat) => handleNavigate('create')}
            onExploreDemo={(id) => handleSelectEvent(id || events[0]?.id || 'sample-wedding-1')}
            onOpenInspiration={() => handleNavigate('inspiration')}
            onAskAI={(prompt) => handleOpenAIWithPrompt(prompt)}
            onOpenCalendar={() => setIsCalendarOpen(true)}
            onOpenBannerStudio={() => setIsBannerStudioOpen(true)}
            currentFestival={currentFestival}
            onFestivalChange={handleFestivalChange}
            events={events}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            events={events}
            onSelectEvent={handleSelectEvent}
            onCreateNew={() => handleNavigate('create')}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        )}

        {currentView === 'create' && (
          <CreateEventWizard
            onBack={() => handleNavigate('landing')}
            onEventCreated={handleEventCreated}
          />
        )}

        {currentView === 'details' && activeEvent && (
          <EventDetailsPage
            event={activeEvent}
            onBack={() => handleNavigate('dashboard')}
            onOpenAssistant={() => handleOpenAIWithPrompt()}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}

        {currentView === 'inspiration' && (
          <InspirationPage
            onPlanTheme={handlePlanTheme}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Indian Cultural & Festive Calendar Modal */}
      <FestiveCalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectFestivalForPlanning={handlePlanFestivalFromCalendar}
      />

      {/* AI Festive Banner Studio (Gemini & Multi-Model) */}
      <FestiveBannerStudioModal
        isOpen={isBannerStudioOpen}
        onClose={() => setIsBannerStudioOpen(false)}
        onApplyBannerToHero={(concept) => {
          // Banner applied notification or action
          setIsBannerStudioOpen(false);
        }}
      />

      {/* Real-time Contextual AI Assistant Modal */}
      {activeEvent && (
        <AIAssistantModal
          isOpen={isAssistantOpen}
          onClose={() => {
            setIsAssistantOpen(false);
            setAiAssistantPrompt('');
          }}
          event={activeEvent}
          onUpdateEvent={handleUpdateActiveEvent}
          initialPrompt={aiAssistantPrompt}
        />
      )}

      {/* Export / Print / Download Modal */}
      {activeEvent && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          event={activeEvent}
        />
      )}
    </div>
  );
};

export default App;
