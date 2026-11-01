import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Palette,
  Bot,
  Zap,
  Download,
  Check,
  RefreshCw,
  Sliders,
  Layers,
  ChevronDown,
} from 'lucide-react';
import {
  ModelTier,
  MODEL_PROFILES,
  routeTask,
  generateBannerConcept,
  GeneratedBannerConcept,
} from '../services/multiAgentRouter';
import { FestivalId, FESTIVAL_THEMES } from '../services/festivalThemeService';

interface FestiveBannerStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBannerToHero?: (bannerData: GeneratedBannerConcept) => void;
}

export const FestiveBannerStudioModal: React.FC<FestiveBannerStudioModalProps> = ({
  isOpen,
  onClose,
  onApplyBannerToHero,
}) => {
  const [selectedFestival, setSelectedFestival] = useState<string>('Diwali Festival of Lights');
  const [selectedStyle, setSelectedStyle] = useState<string>('Liquid Glass Royal');
  const [selectedModel, setSelectedModel] = useState<ModelTier>('gemini-flash');
  const [isGenerating, setIsGenerating] = useState(false);
  const [tokensSavedTotal, setTokensSavedTotal] = useState(1280);
  const [activeBanner, setActiveBanner] = useState<GeneratedBannerConcept>(
    generateBannerConcept('diwali')
  );

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    // Route task and calculate token savings
    const routing = routeTask(
      `Generate festive banner for ${selectedFestival} with ${selectedStyle} visual aesthetics`,
      'banner',
      selectedModel === 'local-gemma' ? 'maximum_savings' : selectedModel === 'gemini-pro' ? 'deep_reasoning' : 'auto'
    );

    setTimeout(() => {
      const concept = generateBannerConcept(selectedFestival, selectedStyle);
      concept.modelUsed = selectedModel;
      setActiveBanner(concept);
      setTokensSavedTotal((prev) => prev + (routing.tokensSavedEstimate || 850));
      setIsGenerating(false);
    }, 700);
  };

  const festivals = [
    'Diwali Festival of Lights',
    'Joyous Navratri & Garba',
    'Royal Indian Wedding',
    'Holi Rangotsav Colors',
    'Eid Milan Festivities',
    'Grand New Year Gala',
  ];

  const styles = [
    'Liquid Glass Royal',
    'Heritage Palace Courtyard',
    'Neon Fireworks & Diyas',
    'Vedic Floral Marigold',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="banner-studio-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl liquid-glass-card border border-white/20 bg-surface/95 text-ink shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-line bg-surface-2/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold/20 text-gold-ink">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 id="banner-studio-title" className="font-display text-xl sm:text-2xl font-bold text-ink">
                AI Festive Banner Studio
              </h2>
              <p className="text-xs text-ink-2">
                Multi-Model & Multi-Agent generation powered by Gemini & Local Gemma.
              </p>
            </div>
          </div>

          {/* Token Savings Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 border border-forest/30 text-forest text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-forest" />
            <span>Saved {tokensSavedTotal.toLocaleString()} Tokens</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-ink-2 hover:bg-surface hover:text-ink focus-visible:outline-none"
            aria-label="Close Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Festival Selector */}
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">
                Festival Celebration
              </label>
              <select
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-medium border border-line bg-surface focus:border-gold focus:outline-none"
              >
                {festivals.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Style */}
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider">
                Visual Art Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-medium border border-line bg-surface focus:border-gold focus:outline-none"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Model Architecture */}
            <div>
              <label className="block text-xs font-semibold text-ink mb-1.5 uppercase tracking-wider flex items-center justify-between">
                <span>AI Agent Engine</span>
                <span className="text-[10px] text-forest font-bold">Auto Token-Saver</span>
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as ModelTier)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-medium border border-line bg-surface focus:border-gold focus:outline-none"
              >
                <option value="gemini-flash">⚡ Gemini 3.6 Flash (Fast, 85% Savings)</option>
                <option value="local-gemma">💻 Local Gemma 4:12b (100% Free Offline)</option>
                <option value="gemini-pro">🧠 Gemini Pro 2.5 (Deep Reasoning)</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-gold" />
                <span>Crafting Banner Design with Multi-Model AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Generate High-Fidelity Festive Banner Concept</span>
              </>
            )}
          </button>

          {/* Generated Banner Preview Canvas */}
          <div className="relative rounded-2xl overflow-hidden border border-line/80 shadow-xl bg-gradient-to-br from-[#120524] via-[#240A3E] to-[#0A0216] text-white p-6 sm:p-8 min-h-[260px] flex flex-col justify-between">
            {/* Ambient liquid glow inside banner preview */}
            <div
              className="absolute -top-12 -right-12 w-64 h-64 rounded-full filter blur-[60px] opacity-40 pointer-events-none"
              style={{ background: activeBanner.palette.accent }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full filter blur-[60px] opacity-30 pointer-events-none"
              style={{ background: activeBanner.palette.primary }}
            />

            {/* Top decorative row */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-white/70">
                  {activeBanner.festivalName}
                </span>
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-gold">
                Engine: {MODEL_PROFILES[activeBanner.modelUsed].displayName}
              </div>
            </div>

            {/* Center Banner Content */}
            <div className="relative z-10 my-4 max-w-xl">
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-tight">
                {activeBanner.headline}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                {activeBanner.subtext}
              </p>

              {/* Cultural Motifs Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {activeBanner.motifs.map((motif, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 backdrop-blur-md border border-white/15 text-white/90"
                  >
                    ✨ {motif}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <span className="text-[11px] text-white/60">
                Auspicious color palette: {activeBanner.palette.primary} • {activeBanner.palette.accent}
              </span>

              <div className="flex items-center gap-2">
                {onApplyBannerToHero && (
                  <button
                    onClick={() => {
                      onApplyBannerToHero(activeBanner);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-xl bg-gold text-[#120524] text-xs font-bold hover:brightness-110 transition-colors shadow-sm"
                  >
                    Apply to Hero Section
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-line bg-surface-2/60 flex items-center justify-between text-xs text-ink-2">
          <span>
            Model Profile: {MODEL_PROFILES[selectedModel].displayName} ({MODEL_PROFILES[selectedModel].costPer1kTokens})
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-line bg-surface hover:bg-surface-2 text-ink font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
