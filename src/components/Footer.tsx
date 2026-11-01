import React from 'react';
import { Shield, Sparkles, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-line bg-surface text-ink-2 py-12 mt-20 no-print">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Vision */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-maroon flex items-center justify-center text-on-primary border border-gold/40">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C59A53"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path d="M12 3c2.5 3 2.5 7 0 11-2.5-4-2.5-8 0-11z" />
                  <path d="M12 14c-2-3.5-5.5-5-9-4.5 1 3.5 4.5 5.5 9 4.5z" />
                  <path d="M12 14c2-3.5 5.5-5 9-4.5-1 3.5-4.5 5.5-9 4.5z" />
                  <path d="M7 18h10" />
                </svg>
              </div>
              <span className="font-display text-xl font-bold text-ink">Utsav AI</span>
            </div>
            <p className="text-sm text-ink-2 max-w-md leading-relaxed">
              Indian celebration planning with contemporary restraint. Designed for weddings, milestone birthdays, college fests, and cultural gatherings with verified INR budgets and date-aware timelines.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-ink pt-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Indian Contemporary Royal • GSAP Motion • Dual GenAI Engine</span>
            </div>
          </div>

          {/* Celebrations */}
          <div>
            <h4 className="text-xs uppercase font-bold text-ink tracking-wider mb-3">Celebration Categories</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-ink-2 hover:text-ink transition-colors">Royal Heritage Weddings</li>
              <li className="text-ink-2 hover:text-ink transition-colors">Milestone 1st & 50th Birthdays</li>
              <li className="text-ink-2 hover:text-ink transition-colors">College Cultural & Tech Fests</li>
              <li className="text-ink-2 hover:text-ink transition-colors">Traditional Poojas & Anniversaries</li>
            </ul>
          </div>

          {/* Integrity & Privacy */}
          <div>
            <h4 className="text-xs uppercase font-bold text-ink tracking-wider mb-3">Security & Trust</h4>
            <p className="text-xs text-ink-2 leading-relaxed mb-3">
              Budget math is executed deterministically on client calculations (never guessed by LLMs). User data stays secure in your browser.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-forest font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Local Isolation & Verified Logic</span>
            </div>
          </div>

        </div>

        <div className="rule-gold mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-ink-2 gap-3">
          <p>© 2026 Utsav AI. Crafted with pride for celebrations across India.</p>
          <p className="text-[11px] text-ink-2">
            Built for production • Deep Maroon #541925 • Antique Gold #C59A53 • Ivory #FFF8EE
          </p>
        </div>
      </div>
    </footer>
  );
};
