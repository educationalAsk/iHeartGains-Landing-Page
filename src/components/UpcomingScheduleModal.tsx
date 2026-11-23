import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ExternalLink, RefreshCw, Video, X } from 'lucide-react';
import { fetchUpcomingEvents, GoogleCalendarEventResponse } from '../services/calendarService';

interface UpcomingScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  accessToken: string | null;
}

export const UpcomingScheduleModal: React.FC<UpcomingScheduleModalProps> = ({
  isOpen,
  onClose,
  accessToken,
}) => {
  const [events, setEvents] = useState<GoogleCalendarEventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    if (!accessToken) {
      setError('Please sign in with Google to view synced calendar events.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const items = await fetchUpcomingEvents(accessToken, 10);
      const filtered = items.filter(
        (e) =>
          e.summary?.toLowerCase().includes('iheartgains') ||
          e.summary?.toLowerCase().includes('consultation')
      );
      setEvents(filtered.length > 0 ? filtered : items.slice(0, 5));
    } catch (err: any) {
      setError(err?.message || 'Failed to retrieve calendar events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && accessToken) {
      loadEvents();
    }
  }, [isOpen, accessToken]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#050505] border border-[#333333] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#CCCCCC] hover:text-[#FFFFFF] rounded-lg hover:bg-[#333333] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-6 pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#FF0619] text-[#FF0619] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FFFFFF] font-['Space_Grotesk']">
                Synced Google Calendar Sessions
              </h3>
              <p className="text-xs text-[#CCCCCC]">Upcoming consultations on your calendar</p>
            </div>
          </div>

          <button
            onClick={loadEvents}
            disabled={loading}
            className="p-2 text-[#CCCCCC] hover:text-[#00FFFF] rounded-lg cursor-pointer"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#00FFFF]' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center text-xs text-[#CCCCCC]">Loading calendar events...</div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-[#FF0619]/10 border border-[#FF0619] text-[#FFFFFF] text-xs text-center">
            {error}
          </div>
        ) : events.length === 0 ? (
          <div className="py-10 text-center text-xs text-[#CCCCCC]">
            No upcoming consultations found.
          </div>
        ) : (
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {events.map((evt) => {
              const startDateTime = evt.start?.dateTime ? new Date(evt.start.dateTime) : null;
              return (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl bg-[#000000] border border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#FFFFFF]">
                      {evt.summary || 'Athlete Consultation'}
                    </div>
                    {startDateTime && (
                      <div className="text-xs text-[#CCCCCC] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#00FFFF]" />
                        <span>
                          {startDateTime.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          at{' '}
                          {startDateTime.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {evt.hangoutLink && (
                      <a
                        href={evt.hangoutLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00FFFF]/15 border border-[#00FFFF]/40 text-[#00FFFF] text-xs font-semibold"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Meet</span>
                      </a>
                    )}
                    {evt.htmlLink && (
                      <a
                        href={evt.htmlLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#050505] border border-[#333333] text-[#CCCCCC] hover:text-[#FFFFFF] text-xs font-semibold"
                      >
                        <span>Calendar</span>
                        <ExternalLink className="w-3 h-3 text-[#A0FF00]" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
