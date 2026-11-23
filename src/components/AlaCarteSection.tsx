import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Plus, RotateCcw, X } from 'lucide-react';
import { ALA_CARTE_CATEGORIES, ALA_CARTE_COMPONENTS } from '../data/alaCarteMenu';
import { AlaCarteCategory } from '../types';

interface AlaCarteSectionProps {
  selectedIds: string[];
  onToggleComponent: (id: string) => void;
  onClearSelection: () => void;
  onProceedToBooking: () => void;
}

export const AlaCarteSection: React.FC<AlaCarteSectionProps> = ({
  selectedIds,
  onToggleComponent,
  onClearSelection,
  onProceedToBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | AlaCarteCategory>('all');

  const selectedComponents = useMemo(() => {
    return selectedIds
      .map((id) => ALA_CARTE_COMPONENTS.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [selectedIds]);

  const filteredComponents = useMemo(() => {
    if (activeCategory === 'all') return ALA_CARTE_COMPONENTS;
    return ALA_CARTE_COMPONENTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const isReady = selectedComponents.length === 3;
  const remaining = 3 - selectedComponents.length;

  return (
    <section id="alacarte" className="py-20 bg-[#000000] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FFFF] mb-2">
            À La Carte Strategy Menu
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Request a <span className="text-[#FF0619]">3-Subject Consult</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            Choose any three strategy components below to build a custom 60-minute consult focused strictly on your highest-priority goals.
          </p>
        </div>

        {/* 3-Subject Selection Tray */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#050505] border border-[#333333] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                Your 3-Subject Agenda
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${
                  isReady
                    ? 'bg-[#A0FF00]/10 text-[#A0FF00] border-[#A0FF00]/40'
                    : 'bg-[#000000] text-[#00FFFF] border-[#333333]'
                }`}
              >
                {selectedComponents.length} / 3 Selected
              </span>
            </div>

            {selectedComponents.length > 0 && (
              <button
                type="button"
                onClick={onClearSelection}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CCCCCC] hover:text-[#FF0619] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Selection</span>
              </button>
            )}
          </div>

          {/* 3 Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[0, 1, 2].map((slotIdx) => {
              const item = selectedComponents[slotIdx];
              if (item) {
                return (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#000000] border border-[#FF0619] flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono font-bold uppercase text-[#A0FF00]">
                        Subject 0{slotIdx + 1} • {item.categoryLabel}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] mt-1 truncate">
                        {item.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleComponent(item.id)}
                      className="text-[#CCCCCC] hover:text-[#FF0619] p-1 shrink-0 cursor-pointer"
                      title={`Remove ${item.title}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={slotIdx}
                  className="p-3.5 rounded-xl bg-[#000000]/40 border border-dashed border-[#333333] flex items-center gap-2.5 text-xs text-[#CCCCCC]/60"
                >
                  <span className="font-mono font-bold text-[#CCCCCC]/40">0{slotIdx + 1}</span>
                  <span>Select a strategy component below</span>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#CCCCCC]">
              {isReady ? (
                <span className="text-[#A0FF00] font-semibold">
                  All 3 strategy subjects locked in ($175 • 60 min). Proceed to pick your date &amp; time.
                </span>
              ) : (
                <span>
                  Pick <strong className="text-[#FFFFFF]">{remaining}</strong> more{' '}
                  {remaining === 1 ? 'subject' : 'subjects'} from the menu below to complete your consult request.
                </span>
              )}
            </p>

            <button
              type="button"
              onClick={onProceedToBooking}
              disabled={!isReady}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                isReady
                  ? 'bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] cursor-pointer shadow-[0_0_20px_rgba(255,6,25,0.3)]'
                  : 'bg-[#000000] text-[#CCCCCC]/50 border border-[#333333] cursor-not-allowed'
              }`}
            >
              <span>
                {isReady
                  ? 'Request 3-Subject Consult'
                  : `Select ${remaining} More Subject${remaining === 1 ? '' : 's'}`}
              </span>
              <ArrowRight className={`w-4 h-4 ${isReady ? 'text-[#A0FF00]' : 'opacity-40'}`} />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {ALA_CARTE_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#FF0619] text-[#FFFFFF]'
                    : 'bg-[#050505] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#333333] hover:border-[#00FFFF]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Component Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.map((component) => {
            const selectionIndex = selectedIds.indexOf(component.id);
            const isSelected = selectionIndex !== -1;
            const isDisabled = !isSelected && selectedIds.length >= 3;

            return (
              <button
                key={component.id}
                type="button"
                onClick={() => onToggleComponent(component.id)}
                disabled={isDisabled}
                className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#050505] border-[#FF0619] ring-1 ring-[#FF0619] cursor-pointer'
                    : isDisabled
                    ? 'bg-[#050505]/50 border-[#333333]/60 opacity-55 cursor-not-allowed'
                    : 'bg-[#050505] border-[#333333] hover:border-[#00FFFF] cursor-pointer'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono font-bold text-[#00FFFF]">
                      {component.categoryLabel}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#FF0619] text-[#FFFFFF]'
                          : 'bg-[#000000] text-[#CCCCCC] border border-[#333333]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3 h-3 text-[#A0FF00]" />
                          <span>#{selectionIndex + 1}</span>
                        </>
                      ) : isDisabled ? (
                        <span>3/3 Full</span>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 text-[#A0FF00]" />
                          <span>Add</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#FFFFFF] mb-1.5 font-['Space_Grotesk']">
                    {component.title}
                  </h3>
                  <p className="text-xs text-[#CCCCCC] leading-relaxed">
                    {component.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#333333] text-[11px] text-[#A0FF00] font-medium">
                  Outcome: <span className="text-[#CCCCCC]">{component.deliverable}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
