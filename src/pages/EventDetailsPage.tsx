import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PieChart as PieChartIcon,
  CheckSquare,
  Briefcase,
  Lightbulb,
  Share2,
  Printer,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Check,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  FileText,
  RotateCw,
  Bookmark,
  BookmarkCheck,
  Phone,
  Mail,
  User,
  Sliders,
  DollarSign,
  ChevronDown,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import confetti from 'canvas-confetti';
import {
  EventData,
  BudgetItem,
  TimelineTask,
  VendorItem,
  TaskStatus,
  VendorStatus,
  TaskPriority,
  PlanSectionKey,
  ScheduleSlot,
} from '../types';
import { saveEvent, recordEventActivity, pinIdea, toggleSectionConfirmed } from '../services/storageService';
import { generateWhatsAppInvite, formatINR, toISODate } from '../services/aiService';
import { requestSection } from '../services/aiClient';

interface EventDetailsPageProps {
  event: EventData;
  onBack: () => void;
  onOpenAssistant: () => void;
  onOpenExport: () => void;
}

type TabType = 'plan' | 'budget' | 'timeline' | 'vendors' | 'schedule' | 'invites';

const ROYAL_CHART_COLORS = [
  '#C59A53', // Antique gold
  '#541925', // Maroon
  '#E69A37', // Warm Saffron
  '#315847', // Forest green
  '#702435', // Burgundy
  '#C98F91', // Muted rose
  '#855E24', // Bronze gold
  '#4338CA', // Indigo
];

export const EventDetailsPage: React.FC<EventDetailsPageProps> = ({
  event: initialEvent,
  onBack,
  onOpenAssistant,
  onOpenExport,
}) => {
  const [event, setEvent] = useState<EventData>(initialEvent);
  const [activeTab, setActiveTab] = useState<TabType>('plan');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<PlanSectionKey | null>(null);

  // Task filter & modal
  const [taskFilter, setTaskFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPhase, setNewTaskPhase] = useState<TimelineTask['phase']>('30-14 Days');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('high');
  const [newTaskDaysBefore, setNewTaskDaysBefore] = useState<number>(14);

  // Budget modal & inline editing
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetName, setNewBudgetName] = useState('');
  const [newBudgetEstimate, setNewBudgetEstimate] = useState<number>(0);
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [editActualVal, setEditActualVal] = useState<number>(0);

  // Vendor modal
  const [vendorFilter, setVendorFilter] = useState<string>('all');
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [newVendorCategory, setNewVendorCategory] = useState('');
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorCost, setNewVendorCost] = useState<number>(0);
  const [newVendorPhone, setNewVendorPhone] = useState('');

  // Day Schedule Slot modal
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState('18:00');
  const [newSlotTitle, setNewSlotTitle] = useState('');
  const [newSlotDetail, setNewSlotDetail] = useState('');

  // WhatsApp Invite Text
  const [inviteText, setInviteText] = useState(() => generateWhatsAppInvite(initialEvent));

  const syncEvent = (updated: EventData) => {
    setEvent(updated);
    saveEvent(updated);
  };

  // Budget calculations
  const budgetList: BudgetItem[] = event.budgetItems || event.budgetBreakdown || [];
  const totalPlannedBudget = event.totalBudget;
  const totalAllocated = budgetList.reduce((sum, item) => sum + item.estimatedCost, 0);
  const totalActualSpent = budgetList.reduce((sum, item) => sum + (item.actualCost || 0), 0);
  const contingencyPercent = event.contingencyReservePercent || event.contingencyPercentage || 10;
  const contingencyAmount = Math.round((totalPlannedBudget * contingencyPercent) / 100);
  const remainingBudget = totalPlannedBudget - totalActualSpent;

  // Task calculations
  const totalTasks = event.timeline?.length || 0;
  const completedTasks = event.timeline?.filter((t) => t.status === 'completed').length || 0;
  const taskProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Date countdown
  const eventDateObj = new Date(`${event.date}T12:00:00`);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const diffDays = Math.ceil((eventDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Toggle Task Completion
  const handleToggleTask = (taskId: string) => {
    const updatedTasks = event.timeline.map((task) => {
      if (task.id === taskId) {
        const nextStatus: TaskStatus = task.status === 'completed' ? 'pending' : 'completed';
        if (nextStatus === 'completed') {
          confetti({
            particleCount: 35,
            spread: 55,
            origin: { y: 0.8 },
            colors: ['#C59A53', '#541925', '#315847', '#E69A37'],
          });
          recordEventActivity(event.id, `Completed task: "${task.title}"`);
        }
        return { ...task, status: nextStatus };
      }
      return task;
    });
    syncEvent({ ...event, timeline: updatedTasks });
  };

  // Add Custom Task
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const dueDate = toISODate(new Date(eventDateObj.getTime() - newTaskDaysBefore * 24 * 60 * 60 * 1000));
    const newTask: TimelineTask = {
      id: 'task_' + Date.now(),
      title: newTaskTitle.trim(),
      description: 'Custom milestone added by coordinator.',
      dueDate,
      daysBefore: newTaskDaysBefore,
      priority: newTaskPriority,
      status: 'pending',
      category: 'General Coordination',
      phase: newTaskPhase,
    };
    const updated = [newTask, ...(event.timeline || [])];
    syncEvent({ ...event, timeline: updated });
    recordEventActivity(event.id, `Added task: "${newTask.title}"`);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  // Delete Task
  const handleDeleteTask = (taskId: string) => {
    const updated = event.timeline.filter((t) => t.id !== taskId);
    syncEvent({ ...event, timeline: updated });
  };

  // Update Budget Item (Estimated or Actual)
  const handleUpdateBudget = (id: string, field: 'estimatedCost' | 'actualCost', value: number) => {
    const updated = budgetList.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: Math.max(0, value) };
      }
      return item;
    });
    syncEvent({ ...event, budgetItems: updated, budgetBreakdown: updated });
    recordEventActivity(event.id, `Updated budget item values`);
  };

  // Add Budget Item
  const handleAddBudgetItem = () => {
    if (!newBudgetName.trim() || newBudgetEstimate <= 0) return;
    const newItem: BudgetItem = {
      id: 'b_' + Date.now(),
      category: newBudgetCategory.trim() || 'Custom Expense',
      name: newBudgetName.trim(),
      estimatedCost: newBudgetEstimate,
      actualCost: 0,
      color: ROYAL_CHART_COLORS[budgetList.length % ROYAL_CHART_COLORS.length],
    };
    const updated = [...budgetList, newItem];
    syncEvent({ ...event, budgetItems: updated, budgetBreakdown: updated });
    recordEventActivity(event.id, `Added budget item: "${newItem.name}" (${formatINR(newItem.estimatedCost)})`);
    setNewBudgetName('');
    setNewBudgetEstimate(0);
    setShowAddBudgetModal(false);
  };

  // Delete Budget Item
  const handleDeleteBudgetItem = (id: string) => {
    const updated = budgetList.filter((b) => b.id !== id);
    syncEvent({ ...event, budgetItems: updated, budgetBreakdown: updated });
  };

  // Update Vendor Status & Actual Fee
  const handleUpdateVendor = (vendorId: string, updates: Partial<VendorItem>) => {
    const updatedVendors = event.vendors.map((v) => {
      if (v.id === vendorId) {
        return { ...v, ...updates };
      }
      return v;
    });
    syncEvent({ ...event, vendors: updatedVendors });
    if (updates.status) {
      recordEventActivity(event.id, `Updated vendor status to "${updates.status}"`);
    }
  };

  // Add Vendor Item
  const handleAddVendor = () => {
    if (!newVendorName.trim()) return;
    const newVendor: VendorItem = {
      id: 'v_' + Date.now(),
      category: newVendorCategory.trim() || 'Service Provider',
      name: newVendorName.trim(),
      requirements: 'Vendor requirements specified by host',
      estimatedCost: newVendorCost,
      status: 'to_research',
      priority: 'medium',
      phone: newVendorPhone.trim() || undefined,
    };
    syncEvent({ ...event, vendors: [...(event.vendors || []), newVendor] });
    recordEventActivity(event.id, `Added vendor entry: "${newVendor.name}"`);
    setNewVendorName('');
    setNewVendorCost(0);
    setNewVendorPhone('');
    setShowAddVendorModal(false);
  };

  // Delete Vendor Item
  const handleDeleteVendor = (vendorId: string) => {
    const updated = event.vendors.filter((v) => v.id !== vendorId);
    syncEvent({ ...event, vendors: updated });
  };

  // Add Run-of-Show Slot
  const handleAddSlot = () => {
    if (!newSlotTitle.trim()) return;
    const newSlot: ScheduleSlot = {
      id: 'slot_' + Date.now(),
      time: newSlotTime,
      title: newSlotTitle.trim(),
      detail: newSlotDetail.trim() || undefined,
    };
    const list = [...(event.daySchedule || []), newSlot].sort((a, b) => a.time.localeCompare(b.time));
    syncEvent({ ...event, daySchedule: list });
    recordEventActivity(event.id, `Added event-day schedule slot: ${newSlot.time} — ${newSlot.title}`);
    setNewSlotTitle('');
    setNewSlotDetail('');
    setShowAddSlotModal(false);
  };

  const handleDeleteSlot = (slotId: string) => {
    const updated = (event.daySchedule || []).filter((s) => s.id !== slotId);
    syncEvent({ ...event, daySchedule: updated });
  };

  // Regenerate Section
  const handleRegenerateSection = async (section: PlanSectionKey) => {
    setRegeneratingSection(section);
    try {
      const res = await requestSection(
        {
          name: event.name,
          category: event.category,
          date: event.date,
          city: event.city,
          guestCount: event.guestCount,
          totalBudget: event.totalBudget,
          theme: event.themePreference,
          venue: event.venuePreference,
          dietary: event.dietaryPreference,
          priority: event.priority,
          notes: event.additionalNotes,
        },
        section,
        event.plan[section]
      );
      if (res && res.value) {
        const updatedPlan = { ...event.plan, [section]: res.value };
        syncEvent({ ...event, plan: updatedPlan });
        recordEventActivity(event.id, `Regenerated "${section}" section`);
      }
    } catch (e) {
      console.warn('[Regenerate skipped / offline]:', e);
    } finally {
      setRegeneratingSection(null);
    }
  };

  // Confirm / Unconfirm Section
  const handleToggleConfirmSection = (section: PlanSectionKey) => {
    const updated = toggleSectionConfirmed(event.id, section);
    if (updated) setEvent(updated);
  };

  // Pin Idea
  const handlePinIdea = (text: string) => {
    const updated = pinIdea(event.id, text);
    if (updated) setEvent(updated);
  };

  const copyToClipboard = (text: string, type: 'color' | 'invite') => {
    navigator.clipboard.writeText(text);
    if (type === 'color') {
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(null), 2000);
    } else {
      setCopiedInvite(true);
      setTimeout(() => setCopiedInvite(false), 2000);
    }
  };

  // Chart data
  const pieData = budgetList.map((item, idx) => ({
    name: item.name,
    value: item.estimatedCost,
    color: ROYAL_CHART_COLORS[idx % ROYAL_CHART_COLORS.length],
  }));

  const barData = budgetList.slice(0, 7).map((item) => ({
    name: item.name.length > 12 ? item.name.slice(0, 10) + '..' : item.name,
    Planned: item.estimatedCost,
    Actual: item.actualCost || 0,
  }));

  const confirmedSectionsSet = new Set(event.confirmedSections || []);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'plan', label: 'Celebration Plan' },
    { id: 'budget', label: 'Budget Planner' },
    { id: 'timeline', label: 'Timeline & Tasks', count: totalTasks },
    { id: 'schedule', label: 'Run of Show', count: event.daySchedule?.length || 0 },
    { id: 'vendors', label: 'Vendors', count: event.vendors?.length || 0 },
    { id: 'invites', label: 'WhatsApp Invite' },
  ];

  return (
    <div className="shell py-8 space-y-8">
      {/* Top Banner / Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-ink-2 hover:text-ink transition-colors font-medium mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-[10px] uppercase font-bold text-gold-ink">
              {event.category}
            </span>
            {event.isDemo && (
              <span className="chip text-[10px] uppercase font-bold text-ink-2">
                Sample Blueprint
              </span>
            )}
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                diffDays < 0
                  ? 'bg-line text-ink-2'
                  : diffDays <= 14
                  ? 'bg-danger/10 text-danger border border-danger/30'
                  : 'bg-forest/10 text-forest border border-forest/30'
              }`}
            >
              {diffDays < 0 ? 'Past Event' : diffDays === 0 ? 'Today!' : `${diffDays} Days Remaining`}
            </span>
          </div>

          <h1 className="text-display-md font-bold text-ink font-display">
            {event.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-ink-2 pt-0.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-ink" />
              {eventDateObj.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-ink" />
              {event.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-gold-ink" />
              {event.guestCount} Guests
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-ink font-display">
              <Wallet className="w-3.5 h-3.5 text-gold-ink" />
              {formatINR(event.totalBudget)}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenAssistant}
            className="btn-secondary btn-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-ink" />
            <span>AI Concierge</span>
          </button>

          <button
            onClick={onOpenExport}
            className="btn-primary btn-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export & Print</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex border-b border-line gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                active
                  ? 'border-maroon text-maroon dark:border-gold dark:text-gold'
                  : 'border-transparent text-ink-2 hover:text-ink hover:border-line'
              }`}
            >
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    active ? 'bg-maroon/15 text-maroon dark:bg-gold/20 dark:text-gold' : 'bg-surface-2 text-ink-2'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: CELEBRATION PLAN WORKSPACE
          ======================================================== */}
      {activeTab === 'plan' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Overview & Concept */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="eyebrow">Creative Direction</span>
                  {confirmedSectionsSet.has('overview') && (
                    <span className="chip text-forest font-bold text-[10px]">Confirmed</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleConfirmSection('overview')}
                    className="btn-ghost btn-sm text-[11px]"
                  >
                    {confirmedSectionsSet.has('overview') ? (
                      <BookmarkCheck className="w-3.5 h-3.5 text-forest" />
                    ) : (
                      <Bookmark className="w-3.5 h-3.5" />
                    )}
                    <span>{confirmedSectionsSet.has('overview') ? 'Confirmed' : 'Mark Confirmed'}</span>
                  </button>
                  <button
                    onClick={() => handleRegenerateSection('overview')}
                    disabled={regeneratingSection === 'overview'}
                    className="icon-btn h-8 w-8"
                    title="Regenerate concept"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${regeneratingSection === 'overview' ? 'animate-spin text-gold-ink' : ''}`} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  {event.plan.theme}
                </h3>
                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed mt-1">
                  {event.plan.concept}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-2 border border-line text-xs text-ink leading-relaxed">
                <strong className="block text-gold-ink uppercase tracking-wider text-[10px] font-bold mb-1">
                  Atmospheric & Architectural Vision
                </strong>
                {event.plan.overview}
              </div>
            </div>

            {/* Aesthetic Palette */}
            <div className="card p-6 space-y-3">
              <div className="flex items-center justify-between border-b border-line pb-2.5">
                <span className="eyebrow">Color Palette</span>
                <button
                  onClick={() => handleRegenerateSection('colorPalette')}
                  disabled={regeneratingSection === 'colorPalette'}
                  className="icon-btn h-7 w-7"
                  title="Regenerate palette"
                >
                  <RotateCw className={`w-3 h-3 ${regeneratingSection === 'colorPalette' ? 'animate-spin text-gold-ink' : ''}`} />
                </button>
              </div>

              <p className="text-[11px] text-ink-2">Click to copy hex codes for decorators.</p>

              <div className="space-y-2">
                {event.plan.colorPalette.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => copyToClipboard(col.hex, 'color')}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-surface-2 border border-line hover:border-gold/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-lg border border-black/10 shadow-sm shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div>
                        <div className="text-xs font-semibold text-ink">{col.name}</div>
                        <div className="text-[10px] text-ink-2 font-mono">{col.hex}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-gold-ink">
                      {copiedColor === col.hex ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Decor Concepts & Food Considerations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Decor Ideas */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ink">Decoration Concepts</h3>
                  {confirmedSectionsSet.has('decorIdeas') && (
                    <span className="chip text-forest font-bold text-[10px]">Confirmed</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleConfirmSection('decorIdeas')}
                    className="btn-ghost btn-sm text-[11px]"
                  >
                    <span>{confirmedSectionsSet.has('decorIdeas') ? 'Confirmed' : 'Confirm'}</span>
                  </button>
                  <button
                    onClick={() => handleRegenerateSection('decorIdeas')}
                    disabled={regeneratingSection === 'decorIdeas'}
                    className="icon-btn h-8 w-8"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${regeneratingSection === 'decorIdeas' ? 'animate-spin text-gold-ink' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {event.plan.decorIdeas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-2 border border-line flex items-start justify-between gap-3 text-xs text-ink"
                  >
                    <span className="leading-relaxed">{idea}</span>
                    <button
                      onClick={() => handlePinIdea(idea)}
                      title="Save idea"
                      className="text-ink-2 hover:text-gold shrink-0 mt-0.5"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Catering & Feast Considerations */}
            <div className="card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-ink">Food & Catering Guidance</h3>
                  {confirmedSectionsSet.has('cateringConsiderations') && (
                    <span className="chip text-forest font-bold text-[10px]">Confirmed</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleConfirmSection('cateringConsiderations')}
                    className="btn-ghost btn-sm text-[11px]"
                  >
                    <span>{confirmedSectionsSet.has('cateringConsiderations') ? 'Confirmed' : 'Confirm'}</span>
                  </button>
                  <button
                    onClick={() => handleRegenerateSection('cateringConsiderations')}
                    disabled={regeneratingSection === 'cateringConsiderations'}
                    className="icon-btn h-8 w-8"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${regeneratingSection === 'cateringConsiderations' ? 'animate-spin text-gold-ink' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {event.plan.cateringConsiderations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-surface-2 border border-line flex items-start justify-between gap-3 text-xs text-ink"
                  >
                    <span className="leading-relaxed">{item}</span>
                    <button
                      onClick={() => handlePinIdea(item)}
                      title="Save idea"
                      className="text-ink-2 hover:text-gold shrink-0 mt-0.5"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Risks & Contingencies */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-saffron" />
                <h3 className="font-display font-bold text-base text-ink">Contingencies & Risk Controls</h3>
              </div>
              <button
                onClick={() => handleRegenerateSection('risksAndContingencies')}
                disabled={regeneratingSection === 'risksAndContingencies'}
                className="btn-secondary btn-sm text-[11px]"
              >
                <RotateCw className={`w-3 h-3 ${regeneratingSection === 'risksAndContingencies' ? 'animate-spin' : ''}`} />
                <span>Refresh Risks</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.plan.risksAndContingencies.map((rc, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-2 border border-line space-y-2 text-xs">
                  <div className="font-semibold text-danger flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />
                    <span>{rc.risk}</span>
                  </div>
                  <p className="text-ink-2 leading-relaxed pl-3 border-l-2 border-line">
                    <strong className="text-ink block text-[11px] mb-0.5">Contingency:</strong>
                    {rc.contingency}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          TAB 2: BUDGET PLANNER
          ======================================================== */}
      {activeTab === 'budget' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="card p-4 space-y-1">
              <span className="text-xs text-ink-2 block">Total Budget Cap</span>
              <span className="text-xl font-bold font-display text-ink tabular">
                {formatINR(totalPlannedBudget)}
              </span>
              <span className="text-[10px] text-ink-2 block">Fixed ceiling</span>
            </div>

            <div className="card p-4 space-y-1">
              <span className="text-xs text-ink-2 block">Planned Category Allocations</span>
              <span className="text-xl font-bold font-display text-gold-ink tabular">
                {formatINR(totalAllocated)}
              </span>
              <span className="text-[10px] text-ink-2 block">Deterministic ratio sum</span>
            </div>

            <div className="card p-4 space-y-1">
              <span className="text-xs text-ink-2 block">Actual Committed / Paid</span>
              <span className="text-xl font-bold font-display text-maroon dark:text-gold tabular">
                {formatINR(totalActualSpent)}
              </span>
              <span className="text-[10px] text-ink-2 block">
                {totalPlannedBudget > 0 ? Math.round((totalActualSpent / totalPlannedBudget) * 100) : 0}% paid out
              </span>
            </div>

            <div className="card p-4 space-y-1">
              <span className="text-xs text-ink-2 block">Remaining Liquidity</span>
              <span className={`text-xl font-bold font-display tabular ${remainingBudget < 0 ? 'text-danger' : 'text-forest'}`}>
                {formatINR(remainingBudget)}
              </span>
              <span className="text-[10px] text-ink-2 block">
                Includes {formatINR(contingencyAmount)} reserve
              </span>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Pie Category Distribution */}
            <div className="card p-6 space-y-3">
              <h3 className="font-display font-bold text-sm text-ink">Planned Spending Distribution</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={85}
                      innerRadius={45}
                      paddingAngle={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => formatINR(val)}
                      contentStyle={{ backgroundColor: '#FFFDF9', borderColor: '#EADECF', borderRadius: '0.75rem', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Planned vs Actual */}
            <div className="card p-6 space-y-3">
              <h3 className="font-display font-bold text-sm text-ink">Planned vs Actual Advances</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={(v) => `₹${v / 1000}k`} tick={{ fontSize: 10 }} />
                    <Tooltip
                      formatter={(val: number) => formatINR(val)}
                      contentStyle={{ backgroundColor: '#FFFDF9', borderColor: '#EADECF', borderRadius: '0.75rem', fontSize: '12px' }}
                    />
                    <Bar dataKey="Planned" fill="#C59A53" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Actual" fill="#541925" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Itemised Budget Table */}
          <div className="card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h3 className="font-display font-bold text-base text-ink">Itemised Category Allocations</h3>
                <p className="text-xs text-ink-2">Update actual advances paid to caterers, venues, and florists.</p>
              </div>
              <button
                onClick={() => setShowAddBudgetModal(true)}
                className="btn-primary btn-sm self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Budget Line</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line text-ink-2 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 font-bold">Category & Item</th>
                    <th className="py-2.5 font-bold">Planned Amount</th>
                    <th className="py-2.5 font-bold">Actual Spent / Paid</th>
                    <th className="py-2.5 font-bold">Variance</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {budgetList.map((item) => {
                    const variance = item.estimatedCost - item.actualCost;
                    const isOverrun = item.actualCost > item.estimatedCost;
                    return (
                      <tr key={item.id} className="hover:bg-surface-2/60 transition-colors">
                        <td className="py-3">
                          <span className="font-semibold text-ink block">{item.name}</span>
                          <span className="text-[11px] text-ink-2">{item.category}</span>
                        </td>
                        <td className="py-3 font-mono font-semibold tabular text-ink">
                          {formatINR(item.estimatedCost)}
                        </td>
                        <td className="py-3 font-mono tabular">
                          {editingBudgetId === item.id ? (
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                value={editActualVal}
                                onChange={(e) => setEditActualVal(Number(e.target.value))}
                                className="input h-8 py-1 px-2 w-28 text-xs font-mono"
                              />
                              <button
                                onClick={() => {
                                  handleUpdateBudget(item.id, 'actualCost', editActualVal);
                                  setEditingBudgetId(null);
                                }}
                                className="btn-primary btn-sm h-8 px-2"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-maroon dark:text-gold">
                                {formatINR(item.actualCost || 0)}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingBudgetId(item.id);
                                  setEditActualVal(item.actualCost || 0);
                                }}
                                title="Edit actual paid"
                                className="text-ink-2 hover:text-ink"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="py-3">
                          <span
                            className={`font-semibold text-[11px] px-2 py-0.5 rounded-full ${
                              isOverrun ? 'bg-danger/10 text-danger' : 'bg-forest/10 text-forest'
                            }`}
                          >
                            {isOverrun ? `+${formatINR(Math.abs(variance))} overrun` : `${formatINR(variance)} safe`}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteBudgetItem(item.id)}
                            className="icon-btn h-7 w-7 text-ink-2 hover:text-danger"
                            title="Delete line item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: TIMELINE & PREPARATION TASKS
          ======================================================== */}
      {activeTab === 'timeline' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-ink">Date-Aware Preparation Milestones</h3>
              <p className="text-xs text-ink-2">
                All due dates are automatically anchored to your event date ({event.date}).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex border border-line rounded-lg p-0.5 bg-surface-2 text-xs">
                {(['all', 'pending', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTaskFilter(filter)}
                    className={`px-3 py-1 rounded-md capitalize font-semibold transition-colors ${
                      taskFilter === filter ? 'bg-surface text-ink shadow-sm' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddTaskModal(true)}
                className="btn-primary btn-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task</span>
              </button>
            </div>
          </div>

          {/* Task Progress Bar */}
          <div className="card p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-ink">
              <span>Overall Preparation Progress</span>
              <span className="font-mono">{completedTasks} of {totalTasks} Completed ({taskProgress}%)</span>
            </div>
            <div className="w-full bg-surface-2 rounded-full h-2 overflow-hidden border border-line">
              <div
                className="bg-forest h-full transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {event.timeline
              ?.filter((t) => {
                if (taskFilter === 'pending') return t.status !== 'completed';
                if (taskFilter === 'completed') return t.status === 'completed';
                return true;
              })
              .map((task) => {
                const isDone = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className={`card p-4 transition-all flex items-start justify-between gap-3 ${
                      isDone ? 'bg-surface-2/40 opacity-70' : 'hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isDone
                            ? 'bg-forest border-forest text-white'
                            : 'border-line hover:border-gold'
                        }`}
                        aria-label={isDone ? 'Mark task as pending' : 'Mark task as completed'}
                      >
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-display text-sm font-bold ${
                              isDone ? 'line-through text-ink-2' : 'text-ink'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="chip text-[10px] text-ink-2">{task.phase}</span>
                          <span
                            className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                              task.priority === 'critical'
                                ? 'bg-danger/10 text-danger'
                                : 'bg-gold/15 text-gold-ink'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs text-ink-2 leading-relaxed">{task.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right text-xs">
                        <span className="text-[10px] text-ink-2 block">Target Date</span>
                        <span className="font-mono text-ink font-semibold">
                          {new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="icon-btn h-7 w-7 text-ink-2 hover:text-danger"
                        title="Delete milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>
      )}

      {/* ========================================================
          TAB 4: EVENT-DAY RUN OF SHOW (SCHEDULE)
          ======================================================== */}
      {activeTab === 'schedule' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-ink">Event-Day Run of Show (Itinerary)</h3>
              <p className="text-xs text-ink-2">
                Hour-by-hour sequence on celebration day. Share this schedule with sound engineers and emcees.
              </p>
            </div>
            <button
              onClick={() => setShowAddSlotModal(true)}
              className="btn-primary btn-sm self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Schedule Slot</span>
            </button>
          </div>

          <div className="space-y-3">
            {(event.daySchedule || []).map((slot, idx) => (
              <div
                key={slot.id}
                className="card p-4 flex items-start justify-between gap-4 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 text-center shrink-0">
                    <span className="font-mono font-bold text-sm text-gold-ink block">
                      {slot.time}
                    </span>
                    <span className="text-[10px] text-ink-2 block">Slot #{idx + 1}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-ink">{slot.title}</h4>
                    {slot.detail && (
                      <p className="text-xs text-ink-2 leading-relaxed">{slot.detail}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="icon-btn h-7 w-7 text-ink-2 hover:text-danger shrink-0"
                  title="Remove slot"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: VENDOR RESEARCH & STATUS CHECKLIST
          ======================================================== */}
      {activeTab === 'vendors' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="font-display font-bold text-base text-ink">Vendor Research Workspace</h3>
              <p className="text-xs text-ink-2">
                Track status across Venue, Catering, Decor, Photography, and Music. Record contact details and locked rates.
              </p>
            </div>

            <button
              onClick={() => setShowAddVendorModal(true)}
              className="btn-primary btn-sm self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vendor Requirement</span>
            </button>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {event.vendors?.map((vendor) => {
              const statusColors: Record<VendorStatus, string> = {
                to_research: 'bg-surface-2 text-ink-2 border-line',
                shortlisted: 'bg-gold/15 text-gold-ink border-gold/40',
                contacted: 'bg-saffron/15 text-saffron border-saffron/40',
                confirmed: 'bg-forest/15 text-forest border-forest/40',
              };

              return (
                <div key={vendor.id} className="card p-5 space-y-3 hover:border-gold/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 border-b border-line/60 pb-2.5">
                    <div>
                      <span className="chip text-[10px] text-ink-2 uppercase font-bold">{vendor.category}</span>
                      <h4 className="font-display font-bold text-base text-ink mt-0.5">{vendor.name}</h4>
                    </div>

                    <select
                      value={vendor.status}
                      onChange={(e) => handleUpdateVendor(vendor.id, { status: e.target.value as VendorStatus })}
                      className={`text-xs rounded-lg px-2 py-1 font-semibold border ${statusColors[vendor.status]}`}
                    >
                      <option value="to_research">To Research</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  </div>

                  <p className="text-xs text-ink-2 leading-relaxed">
                    <strong className="text-ink">Requirements:</strong> {vendor.requirements}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-line/60">
                    <div>
                      <span className="text-[10px] text-ink-2 block">Estimated Cost</span>
                      <span className="font-semibold text-ink font-display text-sm tabular">
                        {formatINR(vendor.estimatedCost)}
                      </span>
                    </div>

                    {vendor.phone && (
                      <div className="text-right">
                        <span className="text-[10px] text-ink-2 block">Contact</span>
                        <a href={`tel:${vendor.phone}`} className="text-gold-ink font-mono font-semibold flex items-center gap-1 hover:underline">
                          <Phone className="w-3 h-3" />
                          <span>{vendor.phone}</span>
                        </a>
                      </div>
                    )}

                    <button
                      onClick={() => handleDeleteVendor(vendor.id)}
                      className="icon-btn h-7 w-7 text-ink-2 hover:text-danger"
                      title="Delete vendor"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: WHATSAPP INVITE GENERATOR
          ======================================================== */}
      {activeTab === 'invites' && (
        <div className="card p-6 space-y-5 animate-in fade-in duration-200 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div>
              <h3 className="font-display font-bold text-base text-ink">Formatted WhatsApp Invitation</h3>
              <p className="text-xs text-ink-2">Ready to copy and broadcast directly to family and guest groups.</p>
            </div>
            <button
              onClick={() => copyToClipboard(inviteText, 'invite')}
              className="btn-primary btn-sm"
            >
              {copiedInvite ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedInvite ? 'Copied!' : 'Copy Invitation'}</span>
            </button>
          </div>

          <textarea
            rows={12}
            value={inviteText}
            onChange={(e) => setInviteText(e.target.value)}
            className="input font-sans text-xs sm:text-sm leading-relaxed p-4"
          />

          <p className="text-xs text-ink-2">
            💡 <strong>Pro Tip:</strong> You can edit the text directly above to include RSVP contact numbers or Google Maps location links before copying.
          </p>
        </div>
      )}

      {/* ========================================================
          MODALS
          ======================================================== */}
      
      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 space-y-4 bg-surface shadow-lift animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-display text-lg font-bold text-ink">Add Timeline Milestone</h3>
            <div className="space-y-3">
              <div>
                <label className="field-label">Milestone Title</label>
                <input
                  type="text"
                  placeholder="e.g. Confirm floral stage backdrop height"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Days Before Event</label>
                  <input
                    type="number"
                    min="0"
                    max="180"
                    value={newTaskDaysBefore}
                    onChange={(e) => setNewTaskDaysBefore(Number(e.target.value))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="field-label">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="input"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button onClick={() => setShowAddTaskModal(false)} className="btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleAddTask} className="btn-primary btn-sm">
                Save Milestone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Budget Item Modal */}
      {showAddBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 space-y-4 bg-surface shadow-lift animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-display text-lg font-bold text-ink">Add Expense Line Item</h3>
            <div className="space-y-3">
              <div>
                <label className="field-label">Item / Service Name</label>
                <input
                  type="text"
                  placeholder="e.g. Live Chaat Counter, Royal Shehnai Troupe"
                  value={newBudgetName}
                  onChange={(e) => setNewBudgetName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Catering, Decor"
                    value={newBudgetCategory}
                    onChange={(e) => setNewBudgetCategory(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="field-label">Estimated Budget (INR)</label>
                  <input
                    type="number"
                    min="100"
                    step="1000"
                    value={newBudgetEstimate || ''}
                    onChange={(e) => setNewBudgetEstimate(Number(e.target.value))}
                    className="input font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button onClick={() => setShowAddBudgetModal(false)} className="btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleAddBudgetItem} className="btn-primary btn-sm">
                Save Line Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 space-y-4 bg-surface shadow-lift animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-display text-lg font-bold text-ink">Add Vendor Requirement</h3>
            <div className="space-y-3">
              <div>
                <label className="field-label">Vendor Name / Business</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Orchid Banquets, To be shortlisted"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                  className="input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Venue, Decor, DJ"
                    value={newVendorCategory}
                    onChange={(e) => setNewVendorCategory(e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="field-label">Budget Quote (INR)</label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={newVendorCost || ''}
                    onChange={(e) => setNewVendorCost(Number(e.target.value))}
                    className="input font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Phone / WhatsApp (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98XXX XXXXX"
                  value={newVendorPhone}
                  onChange={(e) => setNewVendorPhone(e.target.value)}
                  className="input font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button onClick={() => setShowAddVendorModal(false)} className="btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleAddVendor} className="btn-primary btn-sm">
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Run-of-Show Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card max-w-md w-full p-6 space-y-4 bg-surface shadow-lift animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-display text-lg font-bold text-ink">Add Event-Day Sequence</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="field-label">Time (24h)</label>
                  <input
                    type="text"
                    placeholder="19:30"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    className="input font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="field-label">Ceremony Segment</label>
                  <input
                    type="text"
                    placeholder="e.g. Varmala & Cake Cutting"
                    value={newSlotTitle}
                    onChange={(e) => setNewSlotTitle(e.target.value)}
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label className="field-label">Execution Notes</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Cold pyro sparklers on stage, coordinate with DJ for background track"
                  value={newSlotDetail}
                  onChange={(e) => setNewSlotDetail(e.target.value)}
                  className="input"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button onClick={() => setShowAddSlotModal(false)} className="btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleAddSlot} className="btn-primary btn-sm">
                Save Slot
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
