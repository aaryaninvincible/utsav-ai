import React, { useState } from 'react';
import {
  Calendar,
  PlusCircle,
  Search,
  MapPin,
  Users,
  Wallet,
  CheckCircle2,
  Clock,
  Copy,
  Trash2,
  ChevronRight,
  Filter,
  AlertTriangle,
  Compass,
  ArrowUpRight,
  Store,
  Sparkles,
  Bot,
  Activity as ActivityIcon,
} from 'lucide-react';
import { EventData, EventCategory } from '../types';
import { formatINR } from '../services/aiService';

interface DashboardPageProps {
  events: EventData[];
  onSelectEvent: (eventId: string, tab?: string) => void;
  onCreateNew: () => void;
  onDuplicate: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  events,
  onSelectEvent,
  onCreateNew,
  onDuplicate,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Time-of-day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Shubh Prabhat' : hour < 17 ? 'Shubh Dopahar' : 'Shubh Sandhya';

  // Aggregated Analytics from real application data
  const totalPlannedBudget = events.reduce((acc, e) => acc + (e.totalBudget || 0), 0);
  const totalActualSpent = events.reduce((acc, e) => {
    return acc + (e.budgetItems?.reduce((sub, item) => sub + (item.actualCost || 0), 0) || 0);
  }, 0);
  const totalRemainingBudget = Math.max(0, totalPlannedBudget - totalActualSpent);

  const allTasks = events.flatMap((e) =>
    (e.timeline || []).map((t) => ({ ...t, eventName: e.name, eventId: e.id, eventDate: e.date }))
  );
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = allTasks.filter((t) => t.status !== 'completed');

  // Sorted upcoming tasks across all events
  const upcomingDeadlines = [...pendingTasks]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Filter events
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Nearest event
  const sortedUpcoming = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nearestEvent =
    sortedUpcoming.find((e) => new Date(`${e.date}T12:00:00`).getTime() >= Date.now() - 24 * 60 * 60 * 1000) ||
    sortedUpcoming[0];

  const getDaysLeft = (dateStr: string) => {
    const diff = new Date(`${dateStr}T12:00:00`).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Recent activity across all events
  const recentActivities = events
    .flatMap((e) => (e.activity || []).map((a) => ({ ...a, eventName: e.name, eventId: e.id })))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  return (
    <div className="shell py-8 space-y-8">
      
      {/* Top Banner / Greeting Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="eyebrow mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-ink" />
            <span>Celebration Command Center</span>
          </div>
          <h1 className="text-display-md font-bold text-ink font-display">
            {greeting}, Planner
          </h1>
          <p className="text-xs sm:text-sm text-ink-2 mt-1">
            {events.length} active celebration blueprint{events.length === 1 ? '' : 's'} with verified budgets, timelines, and vendor records.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="btn-primary"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Plan New Celebration</span>
        </button>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card p-5 space-y-1.5">
          <div className="flex items-center justify-between text-ink-2 text-xs font-medium">
            <span>Planned Budget</span>
            <Wallet className="w-4 h-4 text-gold-ink" />
          </div>
          <div className="text-2xl font-bold font-display text-ink tabular">
            {formatINR(totalPlannedBudget)}
          </div>
          <div className="text-[11px] text-ink-2">
            Across {events.length} celebrations
          </div>
        </div>

        <div className="card p-5 space-y-1.5">
          <div className="flex items-center justify-between text-ink-2 text-xs font-medium">
            <span>Actual Paid Out</span>
            <span className="text-xs text-maroon font-semibold">Advances</span>
          </div>
          <div className="text-2xl font-bold font-display text-maroon dark:text-gold tabular">
            {formatINR(totalActualSpent)}
          </div>
          <div className="text-[11px] text-ink-2">
            {totalPlannedBudget > 0 ? Math.round((totalActualSpent / totalPlannedBudget) * 100) : 0}% committed to date
          </div>
        </div>

        <div className="card p-5 space-y-1.5">
          <div className="flex items-center justify-between text-ink-2 text-xs font-medium">
            <span>Remaining Liquidity</span>
            <span className="text-xs text-forest font-semibold">Safe</span>
          </div>
          <div className="text-2xl font-bold font-display text-forest tabular">
            {formatINR(totalRemainingBudget)}
          </div>
          <div className="text-[11px] text-ink-2">
            Available for pending quotes & final fees
          </div>
        </div>

        <div className="card p-5 space-y-1.5">
          <div className="flex items-center justify-between text-ink-2 text-xs font-medium">
            <span>Task Completion</span>
            <CheckCircle2 className="w-4 h-4 text-forest" />
          </div>
          <div className="text-2xl font-bold font-display text-ink tabular">
            {completedTasks} / {totalTasks}
          </div>
          <div className="w-full bg-surface-2 rounded-full h-1.5 mt-2 overflow-hidden border border-line">
            <div
              className="bg-forest h-full transition-all duration-300"
              style={{ width: `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%` }}
            />
          </div>
        </div>

      </div>

      {/* Featured Nearest Upcoming Event Hero Widget */}
      {nearestEvent && (
        <div className="card p-6 bg-gradient-to-r from-surface to-surface-2 border-gold/40 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip text-[11px] font-semibold text-gold-ink">Next Upcoming Celebration</span>
                {nearestEvent.isDemo && (
                  <span className="chip text-[10px] uppercase font-bold text-ink-2">Sample Blueprint</span>
                )}
                <span className="text-xs text-forest font-bold">
                  {getDaysLeft(nearestEvent.date) > 0
                    ? `${getDaysLeft(nearestEvent.date)} days away`
                    : 'Today!'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
                {nearestEvent.name}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-ink-2 pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-ink" />
                  {new Date(`${nearestEvent.date}T12:00:00`).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-ink" />
                  {nearestEvent.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-ink" />
                  {nearestEvent.guestCount} Guests
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <Wallet className="w-3.5 h-3.5 text-gold-ink" />
                  {formatINR(nearestEvent.totalBudget)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end lg:self-center">
              <button
                onClick={() => onSelectEvent(nearestEvent.id, 'budget')}
                className="btn-secondary btn-sm"
              >
                Budget Breakdown
              </button>
              <button
                onClick={() => onSelectEvent(nearestEvent.id, 'plan')}
                className="btn-primary btn-sm"
              >
                <span>Open Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Events List (Left 2 cols) + Deadlines & Activity (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Events Filter & Cards */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-2" />
              <input
                type="text"
                placeholder="Search celebrations by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input sm:w-auto text-xs"
              >
                <option value="all">All Categories</option>
                <option value="wedding">Weddings</option>
                <option value="birthday">Birthdays</option>
                <option value="fest">College & Fests</option>
                <option value="cultural">Cultural Poojas</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>

          {/* Event Cards */}
          {filteredEvents.length === 0 ? (
            <div className="card p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mx-auto text-ink-2">
                <Compass className="w-6 h-6 text-gold-ink" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-ink">No celebrations found</h3>
                <p className="text-xs text-ink-2 mt-1">Try adjusting your search or start planning a new celebration.</p>
              </div>
              <button onClick={onCreateNew} className="btn-primary btn-sm mx-auto">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create New Blueprint</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const daysLeft = getDaysLeft(event.date);
                const actualCost =
                  event.budgetItems?.reduce((sum, item) => sum + (item.actualCost || 0), 0) || 0;
                const spendPct =
                  event.totalBudget > 0 ? Math.round((actualCost / event.totalBudget) * 100) : 0;
                const confirmedVendors = event.vendors?.filter((v) => v.status === 'confirmed').length || 0;

                return (
                  <div
                    key={event.id}
                    className="card p-5 hover:border-gold/60 hover:shadow-lift transition-all space-y-4 group cursor-pointer"
                    onClick={() => onSelectEvent(event.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="chip text-[10px] uppercase font-bold text-gold-ink">
                            {event.category}
                          </span>
                          {event.isDemo && (
                            <span className="chip text-[10px] uppercase font-bold text-ink-2">
                              Demo Blueprint
                            </span>
                          )}
                          <span className="text-xs text-ink-2 font-mono flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gold-ink" />
                            {event.city}
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-ink mt-1 group-hover:text-maroon dark:group-hover:text-gold transition-colors">
                          {event.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold ${
                            daysLeft < 0
                              ? 'bg-line text-ink-2'
                              : daysLeft <= 14
                              ? 'bg-danger/10 text-danger border border-danger/20'
                              : 'bg-forest/10 text-forest border border-forest/20'
                          }`}
                        >
                          {daysLeft < 0
                            ? 'Past Event'
                            : daysLeft === 0
                            ? 'Today!'
                            : `${daysLeft} Days to go`}
                        </span>

                        {/* Quick duplicate / delete buttons */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(event.id);
                          }}
                          title="Duplicate celebration"
                          className="icon-btn h-8 w-8 text-ink-2 hover:text-ink"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(event.id);
                          }}
                          title="Delete celebration"
                          className="icon-btn h-8 w-8 text-ink-2 hover:text-danger"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar & Details Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-ink-2 block">Total Budget</span>
                        <span className="font-semibold text-ink font-display text-sm tabular">
                          {formatINR(event.totalBudget)}
                        </span>
                      </div>
                      <div>
                        <span className="text-ink-2 block">Spent / Paid</span>
                        <span className="font-semibold text-maroon dark:text-gold font-display text-sm tabular">
                          {formatINR(actualCost)} ({spendPct}%)
                        </span>
                      </div>
                      <div>
                        <span className="text-ink-2 block">Vendors Confirmed</span>
                        <span className="font-semibold text-ink text-sm">
                          {confirmedVendors} / {event.vendors?.length || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-ink-2 block">Guest Count</span>
                        <span className="font-semibold text-ink text-sm">
                          {event.guestCount} Guests
                        </span>
                      </div>
                    </div>

                    {/* Mini Budget Bar */}
                    <div className="w-full bg-surface-2 rounded-full h-1.5 overflow-hidden border border-line">
                      <div
                        className={`h-full transition-all duration-300 ${
                          spendPct > 100 ? 'bg-danger' : spendPct > 80 ? 'bg-saffron' : 'bg-forest'
                        }`}
                        style={{ width: `${Math.min(100, spendPct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Deadlines & Activity */}
        <div className="space-y-6">
          
          {/* Upcoming Deadlines Widget */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-ink" />
                <h3 className="font-display font-bold text-sm text-ink">Upcoming Deadlines</h3>
              </div>
              <span className="text-[11px] text-ink-2">{pendingTasks.length} pending</span>
            </div>

            {upcomingDeadlines.length === 0 ? (
              <div className="text-xs text-ink-2 text-center py-4">
                No immediate task deadlines pending.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onSelectEvent(task.eventId, 'timeline')}
                    className="p-3 rounded-xl bg-surface-2 border border-line hover:border-gold/50 cursor-pointer transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-ink line-clamp-1">{task.title}</span>
                      <span
                        className={`font-semibold shrink-0 ml-1.5 ${
                          task.priority === 'critical' ? 'text-danger' : 'text-gold-ink'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-ink-2">
                      <span className="truncate max-w-[140px]">{task.eventName}</span>
                      <span className="font-mono">
                        {new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Log */}
          <div className="card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-line pb-2.5">
              <ActivityIcon className="w-4 h-4 text-gold-ink" />
              <h3 className="font-display font-bold text-sm text-ink">Recent Activity</h3>
            </div>

            {recentActivities.length === 0 ? (
              <div className="text-xs text-ink-2 text-center py-4">
                No recent activity recorded.
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivities.map((act) => (
                  <div key={act.id} className="text-xs space-y-0.5">
                    <p className="text-ink font-medium leading-relaxed">{act.text}</p>
                    <div className="flex items-center justify-between text-[10px] text-ink-2">
                      <span className="truncate max-w-[150px]">{act.eventName}</span>
                      <span>
                        {new Date(act.at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 space-y-4 bg-surface shadow-lift animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-danger">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-display text-lg font-bold">Delete Celebration Blueprint?</h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
              Are you sure you want to delete this celebration? All custom budget line items, date-aware timelines, and vendor records will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="btn-danger btn-sm"
              >
                Delete Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
