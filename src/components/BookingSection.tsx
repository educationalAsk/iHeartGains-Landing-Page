import React, { useState } from 'react';
import { User } from 'firebase/auth';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  Download,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CONSULTATION_TYPES } from '../data/consultationData';
import { ALA_CARTE_COMPONENTS } from '../data/alaCarteMenu';
import { AthleteIntake, ConsultationType } from '../types';
import {
  BusyInterval,
  ConsultationBooking,
  createGoogleCalendarEvent,
  downloadICS,
  fetchBusyIntervals,
  GoogleCalendarEventResponse,
} from '../services/calendarService';
import { googleSignIn } from '../services/firebaseAuth';
import { CalendarConfirmationModal } from './CalendarConfirmationModal';

interface BookingSectionProps {
  currentUser: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  selectedPillarId: string | null;
  selectionTrigger?: number;
  initialSport?: string;
  initialNotes?: string;
  selectedAlaCarteIds: string[];
  onRemoveAlaCarte: (id: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  currentUser,
  accessToken,
  onAuthSuccess,
  selectedPillarId,
  selectionTrigger,
  initialSport,
  initialNotes,
  selectedAlaCarteIds,
  onRemoveAlaCarte,
}) => {
  const selectedAlaCarteItems = React.useMemo(() => {
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

  React.useEffect(() => {
    if (selectedPillarId) {
      const match = CONSULTATION_TYPES.find((t) => t.id === selectedPillarId);
      if (match) setSelectedType(match);
    }
  }, [selectedPillarId, selectionTrigger]);

  // Candidate 30-minute start times from 09:00 AM to 05:30 PM
  const CANDIDATE_SLOT_MINUTES = React.useMemo(() => {
    const mins: number[] = [];
    for (let m = 9 * 60; m <= 17 * 60 + 30; m += 30) {
      mins.push(m);
    }
    return mins;
  }, []);

  const FIFTY_TWO_HOURS_MS = 52 * 60 * 60 * 1000;
  const EARLIEST_START_MINUTES = 9 * 60; // 9:00 AM
  const LATEST_END_MINUTES = 18 * 60 + 15; // 6:15 PM
  const MAX_SLOTS_PER_DAY = 8;

  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [busyIntervals, setBusyIntervals] = useState<BusyInterval[]>([]);
  const [isCheckingCalendar, setIsCheckingCalendar] = useState(false);
  const [calendarCheckError, setCalendarCheckError] = useState<string | null>(null);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setNowMs(Date.now());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const refreshCalendarAvailability = React.useCallback(async () => {
    const currentMs = Date.now();
    setNowMs(currentMs);
    const hasCoachCal = Boolean((import.meta as any).env?.VITE_COACH_CALENDAR_ID?.trim());

    if (!accessToken && !hasCoachCal) {
      setBusyIntervals([]);
      setCalendarCheckError(null);
      return;
    }

    setIsCheckingCalendar(true);
    setCalendarCheckError(null);
    try {
      const timeMin = new Date(currentMs).toISOString();
      const timeMax = new Date(currentMs + FIFTY_TWO_HOURS_MS).toISOString();
      const intervals = await fetchBusyIntervals(accessToken, timeMin, timeMax);
      setBusyIntervals(intervals);
    } catch (err: any) {
      console.error('Calendar conflict check failed:', err);
      setCalendarCheckError(
        err?.message || 'Unable to verify calendar conflicts. Please reconnect Google.'
      );
    } finally {
      setIsCheckingCalendar(false);
    }
  }, [accessToken]);

  React.useEffect(() => {
    refreshCalendarAvailability();
  }, [refreshCalendarAvailability]);

  const formatSlotLabel = (totalMinutes: number): string => {
    const h24 = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const period = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${period}`;
  };

  const availableDaySlots = React.useMemo(() => {
    const nowDate = new Date(nowMs);
    const windowEndMs = nowMs + FIFTY_TWO_HOURS_MS;
    const durationMs = selectedType.durationMinutes * 60_000;
    const groups: {
      dateKey: string;
      date: Date;
      slots: { label: string; startDate: Date; endDate: Date }[];
    }[] = [];

    for (let dayOffset = 0; dayOffset <= 3; dayOffset++) {
      const baseDate = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth(),
        nowDate.getDate() + dayOffset
      );
      const validSlots: { label: string; startDate: Date; endDate: Date }[] = [];

      for (const startMinute of CANDIDATE_SLOT_MINUTES) {
        const endMinute = startMinute + selectedType.durationMinutes;
        if (startMinute < EARLIEST_START_MINUTES || endMinute > LATEST_END_MINUTES) {
          continue;
        }

        const hours = Math.floor(startMinute / 60);
        const minutes = startMinute % 60;
        const startDate = new Date(
          baseDate.getFullYear(),
          baseDate.getMonth(),
          baseDate.getDate(),
          hours,
          minutes,
          0,
          0
        );
        const startMs = startDate.getTime();
        const endMs = startMs + durationMs;

        if (startMs <= nowMs || startMs > windowEndMs) {
          continue;
        }

        const hasConflict = busyIntervals.some(
          (busy) => busy.startMs < endMs && busy.endMs > startMs
        );
        if (hasConflict) {
          continue;
        }

        validSlots.push({
          label: formatSlotLabel(startMinute),
          startDate,
          endDate: new Date(endMs),
        });
      }

      if (validSlots.length > 0) {
        const cappedSlots =
          validSlots.length <= MAX_SLOTS_PER_DAY
            ? validSlots
            : Array.from({ length: MAX_SLOTS_PER_DAY }, (_, idx) => {
                const sampleIdx = Math.round(
                  (idx * (validSlots.length - 1)) / (MAX_SLOTS_PER_DAY - 1)
                );
                return validSlots[sampleIdx];
              });

        const dateKey = `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(baseDate.getDate()).padStart(2, '0')}`;
        groups.push({
          dateKey,
          date: baseDate,
          slots: cappedSlots,
        });
      }
    }

    return groups;
  }, [nowMs, selectedType.durationMinutes, busyIntervals, CANDIDATE_SLOT_MINUTES]);

  const [selectedDateKey, setSelectedDateKey] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const activeDayGroup = React.useMemo(() => {
    return (
      availableDaySlots.find((g) => g.dateKey === selectedDateKey) || availableDaySlots[0]
    );
  }, [availableDaySlots, selectedDateKey]);

  const activeSlot = React.useMemo(() => {
    if (!activeDayGroup) return null;
    return (
      activeDayGroup.slots.find((s) => s.label === selectedTimeSlot) || activeDayGroup.slots[0]
    );
  }, [activeDayGroup, selectedTimeSlot]);

  React.useEffect(() => {
    if (activeDayGroup && activeDayGroup.dateKey !== selectedDateKey) {
      setSelectedDateKey(activeDayGroup.dateKey);
    }
    if (activeSlot && activeSlot.label !== selectedTimeSlot) {
      setSelectedTimeSlot(activeSlot.label);
    }
  }, [activeDayGroup, activeSlot, selectedDateKey, selectedTimeSlot]);

  const [intake, setIntake] = useState<AthleteIntake>({
    fullName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    sport: initialSport || '5K & 10K Road Racing',
    experienceLevel: 'collegiate',
    goalsAndLimiters: initialNotes || '',
  });

  React.useEffect(() => {
    setIntake((prev) => ({
      ...prev,
      fullName: prev.fullName || currentUser?.displayName || '',
      email: prev.email || currentUser?.email || '',
      sport: initialSport || prev.sport,
      goalsAndLimiters: initialNotes || prev.goalsAndLimiters,
    }));
  }, [currentUser, initialSport, initialNotes]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successEvent, setSuccessEvent] = useState<{
    event: GoogleCalendarEventResponse;
    booking: ConsultationBooking;
  } | null>(null);

  const calculateBookingTimes = (): { startISO: string; endISO: string } => {
    const startDate = activeSlot ? new Date(activeSlot.startDate) : new Date(Date.now() + 3600_000);
    const endDate = new Date(startDate.getTime() + selectedType.durationMinutes * 60000);

    return {
      startISO: startDate.toISOString(),
      endISO: endDate.toISOString(),
    };
  };

  const handleSignInGoogle = async () => {
    setIsAuthenticating(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
        setIntake((prev) => ({
          ...prev,
          fullName: prev.fullName || res.user.displayName || '',
          email: prev.email || res.user.email || '',
        }));
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Could not complete Google authentication. Please try again.'
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleOpenConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!intake.fullName.trim()) {
      setErrorMessage('Please enter your full athlete name.');
      return;
    }
    if (!intake.email.trim() || !intake.email.includes('@')) {
      setErrorMessage('Please enter a valid contact email.');
      return;
    }
    if (selectedType.id === 'alacarte-three-subject' && selectedAlaCarteItems.length !== 3) {
      setErrorMessage('Please choose 3 strategy subjects from the À La Carte Menu above.');
      return;
    }
    const currentMs = Date.now();
    if (!activeSlot) {
      setErrorMessage('No conflict-free time slots are available within the next 52 hours.');
      return;
    }

    const slotStartMs = activeSlot.startDate.getTime();
    const slotEndMs = activeSlot.endDate.getTime();
    const startMins = activeSlot.startDate.getHours() * 60 + activeSlot.startDate.getMinutes();
    const endMins = activeSlot.endDate.getHours() * 60 + activeSlot.endDate.getMinutes();
    const hasConflict = busyIntervals.some(
      (busy) => busy.startMs < slotEndMs && busy.endMs > slotStartMs
    );

    if (
      slotStartMs <= currentMs ||
      slotStartMs > currentMs + FIFTY_TWO_HOURS_MS ||
      startMins < EARLIEST_START_MINUTES ||
      endMins > LATEST_END_MINUTES ||
      hasConflict
    ) {
      setNowMs(currentMs);
      setErrorMessage(
        'Please pick a conflict-free time slot between 9:00 AM and 6:15 PM within the next 52 hours.'
      );
      return;
    }
    if (!accessToken) {
      setErrorMessage('Please sign in with Google to sync this meeting to Google Calendar.');
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const handleConfirmCalendarBooking = async () => {
    if (!accessToken) {
      setIsConfirmModalOpen(false);
      setErrorMessage('Google authorization token not detected. Please sign in with Google.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const times = calculateBookingTimes();
    const bookingPayload: ConsultationBooking = {
      athleteName: intake.fullName,
      athleteEmail: intake.email,
      sport: intake.sport,
      experienceLevel: intake.experienceLevel,
      consultationType: selectedType,
      selectedSubjects:
        selectedType.id === 'alacarte-three-subject'
          ? selectedAlaCarteItems.map((c) => c.title)
          : undefined,
      notes: intake.goalsAndLimiters,
      startTime: times.startISO,
      endTime: times.endISO,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      const createdEvent = await createGoogleCalendarEvent(accessToken, bookingPayload);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF0619', '#00FFFF', '#A0FF00', '#FFFFFF'],
        });
      } catch {
        // Ignore confetti errors
      }

      setSuccessEvent({
        event: createdEvent,
        booking: bookingPayload,
      });
      setIsConfirmModalOpen(false);
      refreshCalendarAvailability();
    } catch (err: any) {
      console.error('Failed to create calendar event:', err);
      setErrorMessage(
        err?.message ||
          'Failed to schedule on Google Calendar. Your session may have expired—please reconnect Google.'
      );
      setIsConfirmModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentBookingForModal: ConsultationBooking = {
    athleteName: intake.fullName || 'Athlete',
    athleteEmail: intake.email || (currentUser?.email ?? ''),
    sport: intake.sport,
    experienceLevel: intake.experienceLevel,
    consultationType: selectedType,
    selectedSubjects:
      selectedType.id === 'alacarte-three-subject'
        ? selectedAlaCarteItems.map((c) => c.title)
        : undefined,
    notes: intake.goalsAndLimiters,
    startTime: calculateBookingTimes().startISO,
    endTime: calculateBookingTimes().endISO,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  return (
    <section id="schedule" className="py-20 bg-[#050505] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0619] mb-2">
            Google Calendar Integrated
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Schedule Your Strategy Session
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            Choose your strategy format, select a date and time, and sync it directly to Google Calendar with a Google Meet link.
          </p>
        </div>

        {successEvent ? (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-[#050505] border border-[#FF0619] text-center space-y-5">
            <div className="w-14 h-14 rounded-xl bg-[#FF0619]/15 text-[#FF0619] border border-[#FF0619] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[#FFFFFF] font-['Space_Grotesk']">
              Consultation Scheduled
            </h3>
            <p className="text-sm text-[#CCCCCC]">
              Your session has been added to Google Calendar with a Google Meet video link.
            </p>

            <div className="p-4 rounded-xl bg-[#000000] border border-[#333333] text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#CCCCCC]">Session</span>
                <span className="font-bold text-[#FFFFFF]">{successEvent.booking.consultationType.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#CCCCCC]">When</span>
                <span className="font-mono text-[#A0FF00]">
                  {new Date(successEvent.booking.startTime).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  •{' '}
                  {new Date(successEvent.booking.startTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#CCCCCC]">Invitee</span>
                <span className="text-[#FFFFFF]">{successEvent.booking.athleteEmail}</span>
              </div>
              {successEvent.booking.selectedSubjects &&
                successEvent.booking.selectedSubjects.length > 0 && (
                  <div className="pt-2 border-t border-[#333333] space-y-1">
                    <span className="text-[#00FFFF] font-semibold block">
                      3-Subject Agenda:
                    </span>
                    {successEvent.booking.selectedSubjects.map((s, idx) => (
                      <div key={idx} className="text-[#FFFFFF]">
                        0{idx + 1}. {s}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              {successEvent.event.htmlLink && (
                <a
                  href={successEvent.event.htmlLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#A0FF00]" />
                  <span>Open in Google Calendar</span>
                </a>
              )}
              <button
                onClick={() => downloadICS(successEvent.booking)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#000000] hover:bg-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#333333] font-semibold text-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#00FFFF]" />
                <span>Download .ICS</span>
              </button>
            </div>

            <button
              onClick={() => setSuccessEvent(null)}
              className="text-xs text-[#CCCCCC] hover:text-[#FFFFFF] underline cursor-pointer"
            >
              Book another session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Protocol + Date & Time */}
            <div className="lg:col-span-7 space-y-6">
              {/* Protocol Selector */}
              <div className="p-6 rounded-2xl bg-[#050505] border border-[#333333] space-y-4">
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
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                          isSelected
                            ? 'bg-[#000000] border-[#FF0619] ring-1 ring-[#FF0619]'
                            : 'bg-[#000000]/60 border-[#333333] hover:border-[#00FFFF]'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold text-[#FFFFFF]">{type.title}</div>
                          <div className="text-xs text-[#CCCCCC] mt-0.5">{type.tagline}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-black text-[#FFFFFF] font-mono">
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

              {/* Date & Time Selector */}
              <div className="p-6 rounded-2xl bg-[#050505] border border-[#333333] space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                      2. Date &amp; Time <span className="text-[#00FFFF] text-xs font-mono">(Next 52 Hours)</span>
                    </h3>
                    <p className="text-[11px] text-[#CCCCCC] mt-0.5">
                      Sessions start at or after 9:00 AM, end by 6:15 PM, and exclude calendar conflicts.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#00FFFF]">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </span>
                </div>

                {/* Live Calendar Conflict Status */}
                <div className="p-3 rounded-xl bg-[#000000] border border-[#333333] flex flex-wrap items-center justify-between gap-2 text-xs">
                  {accessToken ? (
                    <>
                      <span
                        className={`font-medium flex items-center gap-1.5 ${
                          calendarCheckError ? 'text-[#FF0619]' : 'text-[#A0FF00]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {isCheckingCalendar
                            ? 'Checking your Google Calendar for conflicts...'
                            : calendarCheckError
                            ? calendarCheckError
                            : 'Calendar synced — conflicting times hidden'}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={refreshCalendarAvailability}
                        disabled={isCheckingCalendar}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00FFFF] hover:text-[#FFFFFF] cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw
                          className={`w-3 h-3 ${isCheckingCalendar ? 'animate-spin' : ''}`}
                        />
                        <span>Refresh</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-[#CCCCCC]">
                        Sign in with Google to automatically hide times that conflict with your calendar.
                      </span>
                      <button
                        type="button"
                        onClick={handleSignInGoogle}
                        disabled={isAuthenticating}
                        className="text-[11px] font-bold text-[#00FFFF] hover:text-[#A0FF00] cursor-pointer disabled:opacity-50"
                      >
                        {isAuthenticating ? 'Connecting...' : 'Connect Calendar →'}
                      </button>
                    </>
                  )}
                </div>

                {availableDaySlots.length === 0 ? (
                  <div className="p-5 rounded-xl bg-[#000000] border border-[#333333] text-center space-y-2">
                    <p className="text-xs font-semibold text-[#FFFFFF]">
                      No conflict-free {selectedType.durationMinutes}-minute openings between 9:00 AM and 6:15 PM in the next 52 hours.
                    </p>
                    <p className="text-[11px] text-[#CCCCCC]">
                      Try selecting a shorter session duration above or refresh your calendar availability.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {availableDaySlots.map((group) => {
                        const isSelected = activeDayGroup?.dateKey === group.dateKey;
                        return (
                          <button
                            key={group.dateKey}
                            type="button"
                            onClick={() => {
                              setSelectedDateKey(group.dateKey);
                              if (!group.slots.some((s) => s.label === selectedTimeSlot)) {
                                setSelectedTimeSlot(group.slots[0].label);
                              }
                            }}
                            className={`p-3 rounded-xl border flex flex-col items-center transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#FF0619] text-[#FFFFFF] border-[#FF0619] font-bold'
                                : 'bg-[#000000] border-[#333333] text-[#CCCCCC] hover:border-[#00FFFF]'
                            }`}
                          >
                            <span className="text-[10px] uppercase tracking-wider">
                              {group.date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                              })}
                            </span>
                            <span className="text-lg font-black">{group.date.getDate()}</span>
                            <span
                              className={`text-[10px] font-mono mt-0.5 ${
                                isSelected ? 'text-[#FFFFFF]/90' : 'text-[#A0FF00]'
                              }`}
                            >
                              {group.slots.length} {group.slots.length === 1 ? 'slot' : 'slots'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(activeDayGroup?.slots || []).map((slot) => {
                        const isSelected = activeSlot?.label === slot.label;
                        return (
                          <button
                            key={slot.label}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.label)}
                            className={`py-2.5 px-3 rounded-xl border text-xs font-mono font-bold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#000000] border-[#00FFFF] text-[#00FFFF]'
                                : 'bg-[#000000] border-[#333333] text-[#CCCCCC] hover:border-[#CCCCCC]'
                            }`}
                          >
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Intake & Google Calendar Sync */}
            <form
              onSubmit={handleOpenConfirmation}
              className="lg:col-span-5 p-6 rounded-2xl bg-[#050505] border border-[#333333] space-y-5"
            >
              <h3 className="text-base font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                3. Your Details &amp; Calendar Sync
              </h3>

              {/* Summary Strip */}
              <div className="p-3.5 rounded-xl bg-[#000000] border border-[#333333] text-xs space-y-1">
                <div className="flex justify-between font-bold text-[#FFFFFF]">
                  <span>{selectedType.title}</span>
                  <span className="text-[#FF0619] font-mono">{selectedType.price}</span>
                </div>
                <div className="flex justify-between text-[#CCCCCC]">
                  <span>
                    {activeDayGroup
                      ? activeDayGroup.date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <span className="text-[#A0FF00] font-mono">
                    {activeSlot?.label || ''} ({selectedType.durationMinutes} min)
                  </span>
                </div>
              </div>

              {/* 3-Subject À La Carte Selection Box */}
              {selectedType.id === 'alacarte-three-subject' && (
                <div className="p-3.5 rounded-xl bg-[#000000] border border-[#333333] space-y-2.5">
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
                      No subjects chosen yet. Select 3 components from the À La Carte Menu above.
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      {selectedAlaCarteItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#050505] border border-[#333333] text-xs"
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

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={intake.fullName}
                    onChange={(e) => setIntake({ ...intake, fullName: e.target.value })}
                    placeholder="Jordan Smith"
                    className="w-full bg-[#000000] border border-[#333333] rounded-xl px-3.5 py-2.5 text-sm text-[#FFFFFF] placeholder-[#CCCCCC]/40 focus:outline-none focus:border-[#FF0619]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                    Email (for Google Calendar Invite)
                  </label>
                  <input
                    type="email"
                    required
                    value={intake.email}
                    onChange={(e) => setIntake({ ...intake, email: e.target.value })}
                    placeholder="athlete@domain.com"
                    className="w-full bg-[#000000] border border-[#333333] rounded-xl px-3.5 py-2.5 text-sm text-[#FFFFFF] placeholder-[#CCCCCC]/40 focus:outline-none focus:border-[#FF0619]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                      Focus / Sport
                    </label>
                    <select
                      value={intake.sport}
                      onChange={(e) => setIntake({ ...intake, sport: e.target.value })}
                      className="w-full bg-[#000000] border border-[#333333] rounded-xl px-3 py-2.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#00FFFF]"
                    >
                      <option value="5K & 10K Road Racing">5K &amp; 10K Road Racing</option>
                      <option value="Half Marathon (13.1)">Half Marathon (13.1)</option>
                      <option value="Full Marathon (26.2) / BQ Prep">Full Marathon (26.2)</option>
                      <option value="Sprint Triathlon">Sprint Triathlon</option>
                      <option value="Triathlon (Olympic, 70.3 & Ironman)">Triathlon (Olympic / 70.3 / 140.6)</option>
                      <option value="Nutrition, Metabolism & Fertility">Nutrition &amp; Fertility</option>
                      <option value="Track & Field / Sprint Power">Track &amp; Field</option>
                      <option value="CrossFit / Hybrid Endurance">Hybrid / Strength</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                      Level
                    </label>
                    <select
                      value={intake.experienceLevel}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setIntake({
                          ...intake,
                          experienceLevel: e.target.value as AthleteIntake['experienceLevel'],
                        })
                      }
                      className="w-full bg-[#000000] border border-[#333333] rounded-xl px-3 py-2.5 text-xs text-[#FFFFFF] focus:outline-none focus:border-[#00FFFF]"
                    >
                      <option value="competitive">Competitive</option>
                      <option value="collegiate">Collegiate</option>
                      <option value="pro">Professional</option>
                      <option value="hybrid-athlete">Hybrid / Recreational</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#CCCCCC] mb-1">
                    Goals or Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={intake.goalsAndLimiters}
                    onChange={(e) =>
                      setIntake({ ...intake, goalsAndLimiters: e.target.value })
                    }
                    placeholder="Your target goal, upcoming race date, or key limiters..."
                    className="w-full bg-[#000000] border border-[#333333] rounded-xl px-3.5 py-2 text-xs text-[#FFFFFF] placeholder-[#CCCCCC]/40 focus:outline-none focus:border-[#FF0619]"
                  />
                </div>
              </div>

              {/* Google Calendar Auth */}
              <div className="pt-4 border-t border-[#333333] space-y-4">
                {currentUser ? (
                  <div className="p-3 rounded-xl bg-[#000000] border border-[#333333] flex items-center justify-between text-xs">
                    <span className="text-[#FFFFFF] font-medium truncate max-w-[200px]">
                      {currentUser.email}
                    </span>
                    <span className="text-[#A0FF00] font-semibold flex items-center gap-1 shrink-0">
                      <Check className="w-3.5 h-3.5" /> Synced
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2.5 text-center">
                    <p className="text-xs text-[#CCCCCC]">
                      Sign in with Google to add this session directly to your calendar.
                    </p>
                    <button
                      type="button"
                      onClick={handleSignInGoogle}
                      disabled={isAuthenticating}
                      className="gsi-material-button w-full cursor-pointer disabled:opacity-50"
                    >
                      <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                          <svg viewBox="0 0 48 48" style={{ display: 'block' }}>
                            <path
                              fill="#EA4335"
                              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            />
                            <path
                              fill="#4285F4"
                              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            />
                            <path
                              fill="#34A853"
                              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            />
                          </svg>
                        </div>
                        <span className="gsi-material-button-contents">
                          {isAuthenticating ? 'Connecting...' : 'Sign in with Google'}
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-[#FF0619]/10 border border-[#FF0619] text-[#FFFFFF] text-xs">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold uppercase text-xs tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4 text-[#A0FF00]" />
                  <span>Confirm &amp; Schedule Meeting</span>
                </button>

                <p className="text-[11px] text-[#CCCCCC] text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00FFFF]" />
                  <span>Direct Google Calendar &amp; Google Meet Sync</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>

      <CalendarConfirmationModal
        isOpen={isConfirmModalOpen}
        booking={currentBookingForModal}
        onConfirm={handleConfirmCalendarBooking}
        onCancel={() => setIsConfirmModalOpen(false)}
        isLoading={isSubmitting}
      />
    </section>
  );
};
