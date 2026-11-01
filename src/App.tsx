import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateEventWizard } from './pages/CreateEventWizard';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { InspirationPage } from './pages/InspirationPage';
import { ServicesPage } from './pages/ServicesPage';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ExportModal } from './components/ExportModal';
import { AuthModal, UserProfile } from './components/AuthModal';
import { EventData, EventCategory } from './types';
import { 
  getEvents, 
  getEventById, 
  saveEvent, 
  deleteEvent as deleteEventStorage, 
  duplicateEvent as duplicateEventStorage 
} from './services/storageService';

type ViewMode = 'landing' | 'services' | 'dashboard' | 'create' | 'details' | 'inspiration';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  
  // Auth & User Profile State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Theme State ('dark' default, respects saved preference or OS light preference)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('utsav_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches &&
        !window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'light';
      }
    } catch {}
    return 'dark';
  });

  // Modals
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [aiAssistantPrompt, setAiAssistantPrompt] = useState<string>('');

  // Sync theme class with document.documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('utsav_theme', next);
      } catch {}
      return next;
    });
  };

  // Initial load
  useEffect(() => {
    // Load events
    const loaded = getEvents();
    setEvents(loaded);
    if (loaded.length > 0 && !activeEvent) {
      setActiveEvent(loaded[0]);
    }

    // Load user session if saved
    try {
      const savedUser = localStorage.getItem('utsav_user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {}
  }, []);

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

    if (tab === 'landing' || tab === 'services' || tab === 'dashboard' || tab === 'create' || tab === 'details' || tab === 'inspiration') {
      setCurrentView(tab as ViewMode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectEvent = (eventId: string) => {
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

  const handlePlanEventFromCalendar = (details: {
    name: string;
    date: string;
    category: EventCategory;
    guestCount?: number;
    budget?: number;
  }) => {
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

  const scrollToCalendar = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('calendar-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('calendar-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col font-sans transition-colors duration-300 selection:bg-gold selection:text-bg">
      
      {/* Luxury Navbar (Eventara Event Planner Style) */}
      <Navbar
        currentTab={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCalendar={scrollToCalendar}
        onOpenAIAssistant={() => handleOpenAIWithPrompt()}
        onPlanYourEvent={() => {
          setCurrentView('create');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onSignOut={() => {
          setCurrentUser(null);
          localStorage.removeItem('utsav_user');
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onStartPlanning={(cat) => {
              setCurrentView('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreDemo={(id) => handleSelectEvent(id || events[0]?.id || 'sample-wedding-1')}
            onOpenInspiration={() => handleNavigate('inspiration')}
            onOpenServices={() => handleNavigate('services')}
            onOpenCalendar={scrollToCalendar}
            onPlanEventFromCalendar={handlePlanEventFromCalendar}
            onOpenAIAssistant={handleOpenAIWithPrompt}
            events={events}
          />
        )}

        {currentView === 'services' && (
          <ServicesPage
            onPlanEvent={(cat) => {
              setCurrentView('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalendar={scrollToCalendar}
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

      {/* Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => setCurrentUser(user)}
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
