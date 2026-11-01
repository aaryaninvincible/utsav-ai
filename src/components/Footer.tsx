import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-line bg-surface text-ink-2 py-12 mt-16 no-print transition-colors duration-300">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Vision */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 flex items-center justify-center text-gold">
                <svg
                  viewBox="0 0 36 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-7 h-6"
                  aria-hidden="true"
                >
                  <path d="M18 3 C21 8.5, 21.5 14.5, 18 20 C14.5 14.5, 15 8.5, 18 3 Z" />
                  <path d="M18 20 C13.5 16.5, 9.5 11.5, 9.5 6.5 C13.5 7.5, 16.2 11.5, 18 20 Z" />
                  <path d="M18 20 C22.5 16.5, 26.5 11.5, 26.5 6.5 C22.5 7.5, 19.8 11.5, 18 20 Z" />
                  <path d="M16.5 20.5 C10.5 19.5, 5.5 16, 3.5 11.5 C8.5 11.5, 13 14.5, 16.5 20.5 Z" />
                  <path d="M19.5 20.5 C25.5 19.5, 30.5 16, 32.5 11.5 C27.5 11.5, 23 14.5, 19.5 20.5 Z" />
                  <path d="M10 24.5 C14.5 22.8, 21.5 22.8, 26 24.5" />
                </svg>
              </span>
              <div className="leading-none">
                <span className="font-display text-2xl font-semibold text-ink block">
                  Eventara
                </span>
                <span className="font-sans text-[8.5px] uppercase tracking-[0.26em] text-gold-ink block mt-0.5">
                  EVENT PLANNER
                </span>
              </div>
            </div>

            <p className="text-sm text-ink-2 max-w-md leading-relaxed">
              Editorial celebration planning designed for weddings, milestone birthdays, cultural festivals, and community gatherings with clear INR budgets and date-aware schedules.
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-ink pt-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>AI suggestions are planning guidance — always confirm final vendor availability, prices, and contracts directly.</span>
            </div>
          </div>

          {/* Celebrations */}
          <div>
            <h4 className="text-xs uppercase font-bold text-ink tracking-wider mb-3">
              Celebration Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-ink-2 hover:text-ink transition-colors">Weddings & Receptions</li>
              <li className="text-ink-2 hover:text-ink transition-colors">Milestone Birthdays & Anniversaries</li>
              <li className="text-ink-2 hover:text-ink transition-colors">College Fests & Cultural Galas</li>
              <li className="text-ink-2 hover:text-ink transition-colors">Corporate Events & Social Gatherings</li>
            </ul>
          </div>

          {/* Integrity & Privacy */}
          <div>
            <h4 className="text-xs uppercase font-bold text-ink tracking-wider mb-3">
              Planning Integrity
            </h4>
            <p className="text-xs text-ink-2 leading-relaxed mb-3">
              Budget math is computed deterministically on client calculations so category totals and contingency buffers stay accurate. Your plans remain in your control.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-forest font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Deterministic Budgets & Local Privacy</span>
            </div>
          </div>

        </div>

        <div className="rule-gold mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-ink-2 gap-3">
          <p>© 2026 Eventara Event Planner. All rights reserved.</p>
          <p className="text-xs text-ink-2 font-medium">
            Designed & developed by aaryaninvincible
          </p>
        </div>
      </div>
    </footer>
  );
};
