import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CONSULTATION_TYPES } from '../data/consultationData';
import { ALA_CARTE_COMPONENTS } from '../data/alaCarteMenu';
import { ConsultationType } from '../types';

interface BookingSectionProps {
  selectedPillarId: string | null;
  selectionTrigger?: number;
  initialSport?: string;
  initialNotes?: string;
  selectedAlaCarteIds: string[];
  onRemoveAlaCarte: (id: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedPillarId,
  selectionTrigger,
  initialSport,
  initialNotes,
  selectedAlaCarteIds,
  onRemoveAlaCarte,
}) => {
  const selectedAlaCarteItems = useMemo(() => {
    return selectedAlaCarteIds
      .map((id) => ALA_CARTE_COMPONENTS.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
  }, [selectedAlaCarteIds]);

  const [selectedType, setSelectedType] = useState<ConsultationType>(() => {
    if (selectedPillarId) {
      const match = CONSULTATION_TYPES.find((t) => t.id === selectedPillarId);
      if (match) return match;
    }
    return CONSULTATION_TYPES[0];
  });

  useEffect(() => {
    if (selectedPillarId) {
      const match = CONSULTATION_TYPES.find((t) => t.id === selectedPillarId);
      if (match) setSelectedType(match);
    }
  }, [selectedPillarId, selectionTrigger]);

  const [sport, setSport] = useState<string>(initialSport || '5K & 10K Road Racing');
  const [notes, setNotes] = useState<string>(initialNotes || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSport) setSport(initialSport);
    if (initialNotes) setNotes(initialNotes);
  }, [initialSport, initialNotes]);

  const env = (import.meta as any).env || {};
  const activeScheduleUrl = useMemo(() => {
    const url30 = (env.VITE_APPOINTMENT_SCHEDULE_URL_30 || '').trim();
    const url45 = (env.VITE_APPOINTMENT_SCHEDULE_URL_45 || '').trim();
    const url60 = (env.VITE_APPOINTMENT_SCHEDULE_URL_60 || '').trim();
    const fallbackUrl = (env.VITE_APPOINTMENT_SCHEDULE_URL || '').trim();

    if (selectedType.durationMinutes === 30 && url30) return url30;
    if (selectedType.durationMinutes === 45 && url45) return url45;
    if (selectedType.durationMinutes === 60 && url60) return url60;
    return fallbackUrl;
  }, [selectedType.durationMinutes, env]);

  const formattedBrief = useMemo(() => {
    const lines = [
      `Session: ${selectedType.title} (${selectedType.durationMinutes} min • ${selectedType.price})`,
      `Focus / Sport: ${sport}`,
    ];
    if (selectedType.id === 'alacarte-three-subject' && selectedAlaCarteItems.length > 0) {
      lines.push(
        `3-Subject Agenda: ${selectedAlaCarteItems
          .map((item, idx) => `${idx + 1}. ${item.title}`)
          .join(' | ')}`
      );
    }
    if (notes.trim()) {
      lines.push(`Goals / Notes: ${notes.trim()}`);
    }
    return lines.join('\n');
  }, [selectedType, sport, selectedAlaCarteItems, notes]);

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <section id="schedule" className="py-20 bg-[#050505] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0619] mb-2">
            Google Workspace Appointment Schedule
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Schedule Your Strategy Session
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            Choose your strategy session on the left, copy your brief if desired, and book an open conflict-free time directly in the embedded iHeartGains Google Calendar below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Strategy Session Type & Consult Brief */}
          <div className="lg:col-span-5 space-y-6">
            {/* Session Type Selector */}
            <div className="p-6 rounded-2xl bg-[#000000] border border-[#333333] space-y-4">
              <h3 className="text-base font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                1. Strategy Session Type
              </h3>

              <div className="space-y-2.5">
                {CONSULTATION_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#050505] border-[#FF0619] ring-1 ring-[#FF0619]'
                          : 'bg-[#050505]/50 border-[#333333] hover:border-[#00FFFF]'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                          {type.title}
                        </div>
                        <div className="text-[11px] text-[#CCCCCC] mt-0.5 truncate">
                          {type.tagline}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-sm font-black text-[#FFFFFF] font-mono">
                          {type.price}
                        </div>
                        <div className="text-[11px] text-[#00FFFF] font-mono">
                          {type.durationMinutes} min
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Consult Brief Builder */}
            <div className="p-6 rounded-2xl bg-[#000000] border border-[#333333] space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                  2. Prepare Your Consult Brief
                </h3>
                <span className="text-[11px] font-mono text-[#A0FF00]">Optional</span>
              </div>

              {selectedType.id === 'alacarte-three-subject' && (
                <div className="p-3.5 rounded-xl bg-[#050505] border border-[#333333] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#00FFFF]">
                      À La Carte Subjects ({selectedAlaCarteItems.length}/3)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById('alacarte');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[11px] font-semibold text-[#CCCCCC] hover:text-[#FFFFFF] underline cursor-pointer"
                    >
                      {selectedAlaCarteItems.length === 3 ? 'Edit Menu ↑' : 'Choose Subjects ↑'}
                    </button>
                  </div>

                  {selectedAlaCarteItems.length === 0 ? (
                    <p className="text-[11px] text-[#CCCCCC]/70">
                      Pick 3 components in the À La Carte menu above to include them in your brief.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedAlaCarteItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#000000] border border-[#333333] text-xs"
                        >
                          <span className="text-[#FFFFFF] truncate">
                            <span className="font-mono text-[#A0FF00] mr-1.5">0{idx + 1}</span>
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => onRemoveAlaCarte(item.id)}
                            className="text-[#CCCCCC] hover:text-[#FF0619] shrink-0 cursor-pointer"
                            title="Remove subject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                  Focus / Sport
                </label>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full bg-[#050505] border border-[#333333] rounded-xl px-3 py-2.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#00FFFF]"
                >
                  <option value="5K & 10K Road Racing">5K &amp; 10K Road Racing</option>
                  <option value="Half Marathon (13.1)">Half Marathon (13.1)</option>
                  <option value="Full Marathon (26.2) / BQ Prep">Full Marathon (26.2)</option>
                  <option value="Sprint Triathlon">Sprint Triathlon</option>
                  <option value="Triathlon (Olympic, 70.3 & Ironman)">
                    Triathlon (Olympic / 70.3 / 140.6)
                  </option>
                  <option value="Nutrition, Metabolism & Fertility">Nutrition &amp; Fertility</option>
                  <option value="Track & Field / Sprint Power">Track &amp; Field</option>
                  <option value="CrossFit / Hybrid Endurance">Hybrid / Strength</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                  Goals or Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your target goal, upcoming race date, or key limiters..."
                  className="w-full bg-[#050505] border border-[#333333] rounded-xl px-3.5 py-2 text-xs text-[#FFFFFF] placeholder-[#CCCCCC]/40 focus:outline-none focus:border-[#FF0619]"
                />
              </div>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="w-full py-2.5 px-4 rounded-xl bg-[#050505] hover:bg-[#333333]/50 border border-[#333333] hover:border-[#00FFFF] text-xs font-bold text-[#FFFFFF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#A0FF00]" />
                    <span className="text-[#A0FF00]">Consult Brief Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#00FFFF]" />
                    <span>Copy Brief to Paste in Booking Form</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Embedded Google Calendar Appointment Schedule */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#000000] border border-[#333333] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                  3. Select an Open Time
                </h3>
                <p className="text-xs text-[#CCCCCC] mt-0.5">
                  Live availability synced directly with the iHeartGains Workspace calendar.
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#FFFFFF] block">
                  {selectedType.title}
                </span>
                <span className="text-[11px] font-mono text-[#A0FF00]">
                  {selectedType.durationMinutes} min • {selectedType.price}
                </span>
              </div>
            </div>

            {activeScheduleUrl ? (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#333333]">
                  <iframe
                    src={activeScheduleUrl}
                    title="iHeartGains Google Calendar Appointment Schedule"
                    className="w-full h-[640px] border-0"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#CCCCCC]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00FFFF]" />
                    <span>Instant Google Meet link emailed upon confirmation</span>
                  </span>
                  <a
                    href={activeScheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#00FFFF] hover:text-[#A0FF00] font-semibold"
                  >
                    <span>Open booking page in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-[#050505] border border-dashed border-[#333333] text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#000000] border border-[#FF0619] text-[#FF0619] flex items-center justify-center mx-auto">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h4 className="text-sm font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                    Connect Your Google Workspace Appointment Schedule
                  </h4>
                  <p className="text-xs text-[#CCCCCC] leading-relaxed">
                    Add your Google Calendar Appointment Schedule embed URL as{' '}
                    <code className="text-[#00FFFF] font-mono">VITE_APPOINTMENT_SCHEDULE_URL</code>{' '}
                    in Cloudflare Pages to display your live interactive booking calendar here with zero API fees.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#000000] border border-[#333333] text-left max-w-md mx-auto text-xs space-y-1">
                  <div className="text-[#00FFFF] font-mono font-bold">
                    Current Selection Preview:
                  </div>
                  <div className="text-[#FFFFFF] font-semibold">
                    {selectedType.title} ({selectedType.durationMinutes} min • {selectedType.price})
                  </div>
                  {selectedType.id === 'alacarte-three-subject' &&
                    selectedAlaCarteItems.length > 0 && (
                      <div className="text-[#CCCCCC] pt-1">
                        Subjects:{' '}
                        {selectedAlaCarteItems.map((i) => i.title).join(', ')}
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
