import React from 'react';
import { Calendar, Clock, ShieldCheck, User, Video, X } from 'lucide-react';
import { ConsultationBooking } from '../services/calendarService';

interface CalendarConfirmationModalProps {
  isOpen: boolean;
  booking: ConsultationBooking | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const CalendarConfirmationModal: React.FC<CalendarConfirmationModalProps> = ({
  isOpen,
  booking,
  onConfirm,
  onCancel,
  isLoading,
}) => {
  if (!isOpen || !booking) return null;

  const formattedDate = new Date(booking.startTime).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedStartTime = new Date(booking.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedEndTime = new Date(booking.endTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#050505] border border-[#333333] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 text-[#CCCCCC] hover:text-[#FFFFFF] rounded-lg hover:bg-[#333333] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#000000] text-[#FF0619] border border-[#FF0619] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#FFFFFF] font-['Space_Grotesk']">
              Confirm Google Calendar Booking
            </h3>
            <p className="text-xs text-[#CCCCCC]">
              Review your session details before adding to Google Calendar.
            </p>
          </div>
        </div>

        <div className="space-y-3 p-4 rounded-xl bg-[#000000] border border-[#333333] text-xs mb-5">
          <div className="flex justify-between pb-2.5 border-b border-[#333333]">
            <span className="text-[#CCCCCC]">Session</span>
            <span className="font-bold text-[#FFFFFF] text-right">
              {booking.consultationType.title} ({booking.consultationType.durationMinutes} min)
            </span>
          </div>

          {booking.selectedSubjects && booking.selectedSubjects.length > 0 && (
            <div className="pb-2.5 border-b border-[#333333] space-y-1.5">
              <span className="text-[#00FFFF] font-semibold block">
                À La Carte Strategy Subjects ({booking.selectedSubjects.length})
              </span>
              <ul className="space-y-1 text-[#FFFFFF]">
                {booking.selectedSubjects.map((subject, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#A0FF00]">0{idx + 1}</span>
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between pb-2.5 border-b border-[#333333]">
            <span className="text-[#CCCCCC] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#A0FF00]" />
              When
            </span>
            <span className="font-mono text-[#FFFFFF] text-right">
              {formattedDate} • {formattedStartTime} – {formattedEndTime}
            </span>
          </div>

          <div className="flex justify-between pb-2.5 border-b border-[#333333]">
            <span className="text-[#CCCCCC] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#00FFFF]" />
              Athlete
            </span>
            <span className="text-[#FFFFFF] text-right">
              {booking.athleteName} ({booking.sport})
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#CCCCCC] flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#00FFFF]" />
              Location
            </span>
            <span className="text-[#00FFFF] font-semibold">Google Meet Video Room</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#000000] border border-[#00FFFF]/30 text-xs text-[#CCCCCC] mb-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00FFFF] shrink-0 mt-0.5" />
          <p>
            With your permission, this creates an event on your primary Google Calendar with a Google Meet link.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#333333] hover:bg-[#333333] font-semibold text-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Creating Event...' : 'Confirm & Add to Calendar'}
          </button>
        </div>
      </div>
    </div>
  );
};
