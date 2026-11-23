import React, { useMemo, useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from 'lucide-react';
import { ENDURANCE_PROTOCOLS, EnduranceProtocol } from '../data/enduranceContent';

interface EnduranceHubSectionProps {
  onSelectEnduranceProtocol: (protocol: EnduranceProtocol) => void;
}

export const EnduranceHubSection: React.FC<EnduranceHubSectionProps> = ({
  onSelectEnduranceProtocol,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Distances' },
    { id: '5k-10k', label: '5K & 10K' },
    { id: 'half-marathon', label: 'Half Marathon' },
    { id: 'marathon', label: 'Marathon' },
    { id: 'triathlon', label: 'Triathlon' },
  ];

  const filteredProtocols = useMemo(() => {
    return ENDURANCE_PROTOCOLS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.distanceCategory === selectedCategory;

      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.targetAthlete.toLowerCase().includes(q) ||
        item.keyWorkouts.some(
          (w) => w.name.toLowerCase().includes(q) || w.description.toLowerCase().includes(q)
        ) ||
        item.coachTips.toLowerCase().includes(q) ||
        item.nutritionRecovery.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="endurance-hub" className="py-20 bg-[#000000] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FFFF] mb-2">
            5K to Marathon &amp; Triathlon
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Goal-Specific <span className="text-[#FF0619]">Endurance Strategies</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            Generic plans hand every athlete the same mileage chart. Explore how we strategize pacing, limiters, and fueling from 5K and Sprint Triathlon up to Marathon and Ironman—then tailor yours 1-on-1.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#050505] border border-[#333333] mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00FFFF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by distance or focus (e.g., 5K, half marathon, sprint triathlon, marathon taper)..."
              className="w-full bg-[#000000] border border-[#333333] rounded-xl pl-10 pr-10 py-3 text-sm text-[#FFFFFF] placeholder-[#CCCCCC]/50 focus:outline-none focus:border-[#FF0619] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#FFFFFF] p-1 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#FF0619] text-[#FFFFFF]'
                        : 'bg-[#000000] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#333333] hover:border-[#00FFFF]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-[#CCCCCC]">
              <strong className="text-[#A0FF00] font-mono">{filteredProtocols.length}</strong> strategies
            </span>
          </div>
        </div>

        {/* Results */}
        {filteredProtocols.length === 0 ? (
          <div className="p-10 rounded-2xl bg-[#050505] border border-[#333333] text-center space-y-3">
            <p className="text-sm font-semibold text-[#FFFFFF]">
              No endurance strategies match your filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-[#00FFFF] hover:underline cursor-pointer"
            >
              Reset search &amp; filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProtocols.map((protocol) => {
              const isExpanded = expandedId === protocol.id;
              return (
                <div
                  key={protocol.id}
                  className="rounded-2xl bg-[#050505] border border-[#333333] hover:border-[#00FFFF] transition-colors p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-[#00FFFF]">
                        {protocol.categoryLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#A0FF00]">
                        {protocol.keyMetric} {protocol.metricLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#FFFFFF] mb-2 font-['Space_Grotesk']">
                      {protocol.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed mb-4">
                      {protocol.summary}
                    </p>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-[#333333] space-y-3 text-xs">
                        {protocol.keyWorkouts.map((w, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-[#000000] border border-[#333333]"
                          >
                            <div className="flex justify-between items-center mb-1 gap-2">
                              <span className="font-bold text-[#FFFFFF]">{w.name}</span>
                              <span className="font-mono text-[10px] text-[#00FFFF] shrink-0">
                                {w.pacingZone}
                              </span>
                            </div>
                            <p className="text-[#CCCCCC] leading-relaxed">{w.description}</p>
                          </div>
                        ))}

                        <div className="p-3 rounded-xl bg-[#000000] border border-[#333333]">
                          <span className="font-bold text-[#FFFFFF]">Fueling: </span>
                          <span className="text-[#CCCCCC]">{protocol.nutritionRecovery}</span>
                        </div>

                        <p className="text-[#A0FF00] italic">"{protocol.coachTips}"</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#333333] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : protocol.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#CCCCCC] hover:text-[#FFFFFF] cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Strategy' : 'View Strategy'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00FFFF]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#00FFFF]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectEnduranceProtocol(protocol)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold text-xs transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#A0FF00]" />
                      <span>Build This Strategy</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
