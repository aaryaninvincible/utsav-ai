import React from 'react';
import {
  X,
  Printer,
  Download,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Clock,
  Store,
  CheckCircle2,
} from 'lucide-react';
import { EventData } from '../types';
import { formatINR } from '../services/aiService';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(event, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${event.name.replace(/\s+/g, '_')}_Blueprint.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="card w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden bg-surface shadow-lift border border-gold/40 my-6">
        
        {/* Controls Bar (hidden during print) */}
        <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-surface-2/80 no-print">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-ink" />
            <h3 className="font-display font-bold text-sm text-ink">
              Celebration Master Plan & Dossier
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-primary btn-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="btn-secondary btn-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>
            <button
              onClick={onClose}
              className="icon-btn h-8 w-8 text-ink-2 hover:text-ink"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-ink bg-surface">
          
          {/* Document Header */}
          <div className="border-b border-line pb-6 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="eyebrow">Official Celebration Blueprint</span>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink mt-1">
                  {event.name}
                </h1>
                <p className="text-xs sm:text-sm text-ink-2 italic mt-0.5">
                  {event.plan?.concept || 'Tailored Celebration Plan'}
                </p>
              </div>

              <div className="text-right">
                <span className="chip text-[10px] uppercase font-bold text-gold-ink">
                  {event.category}
                </span>
                <div className="text-[10px] text-ink-2 mt-1 font-mono">
                  Utsav AI Architecture
                </div>
              </div>
            </div>

            {/* Core Parameters Box */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-2 border border-line text-xs">
              <div>
                <span className="text-ink-2 block text-[10px] uppercase">Celebration Date</span>
                <span className="font-semibold text-ink">
                  {new Date(`${event.date}T12:00:00`).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-ink-2 block text-[10px] uppercase">Destination</span>
                <span className="font-semibold text-ink">{event.city}</span>
              </div>
              <div>
                <span className="text-ink-2 block text-[10px] uppercase">Headcount</span>
                <span className="font-semibold text-ink">{event.guestCount} Guests</span>
              </div>
              <div>
                <span className="text-ink-2 block text-[10px] uppercase">Total Budget</span>
                <span className="font-bold text-gold-ink font-display text-sm tabular">
                  {formatINR(event.totalBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Theme & Concept */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-ink">Theme & Atmosphere</h3>
            <p className="text-xs text-ink-2 leading-relaxed">{event.plan?.overview}</p>
          </div>

          {/* Itemised Budget Breakdown */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-ink">Deterministic Budget Allocations</h3>
            <div className="border border-line rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-2 text-[10px] uppercase text-ink-2 border-b border-line">
                  <tr>
                    <th className="p-2.5 font-bold">Category</th>
                    <th className="p-2.5 font-bold">Planned Amount</th>
                    <th className="p-2.5 font-bold">Actual Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {event.budgetItems?.map((b) => (
                    <tr key={b.id} className="hover:bg-surface-2/30">
                      <td className="p-2.5 font-medium">{b.name}</td>
                      <td className="p-2.5 font-mono tabular">{formatINR(b.estimatedCost)}</td>
                      <td className="p-2.5 font-mono tabular">{formatINR(b.actualCost || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendors Checklist */}
          <div className="space-y-2">
            <h3 className="font-display font-bold text-base text-ink">Vendor Roster & Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {event.vendors?.map((v) => (
                <div key={v.id} className="p-3 rounded-xl border border-line bg-surface-2/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-ink">{v.name}</span>
                    <span className="chip text-[10px] uppercase font-bold text-gold-ink">{v.status}</span>
                  </div>
                  <div className="text-ink-2 text-[11px]">{v.category} — {formatINR(v.estimatedCost)}</div>
                  {v.phone && <div className="text-[10px] font-mono text-ink-2">Contact: {v.phone}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Event-Day Run of Show */}
          {event.daySchedule && event.daySchedule.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-display font-bold text-base text-ink">Event-Day Run of Show</h3>
              <div className="space-y-1.5 text-xs">
                {event.daySchedule.map((s) => (
                  <div key={s.id} className="flex items-start gap-3 p-2 rounded-lg bg-surface-2/40 border border-line/60">
                    <span className="font-mono font-bold text-gold-ink w-14 shrink-0">{s.time}</span>
                    <div>
                      <span className="font-semibold text-ink block">{s.title}</span>
                      {s.detail && <span className="text-[11px] text-ink-2">{s.detail}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-[10px] text-ink-2 pt-6 border-t border-line">
            Utsav AI — Indian Contemporary Royal Celebration Planner • Generated on {new Date().toLocaleDateString('en-IN')}
          </div>
        </div>

      </div>
    </div>
  );
};
