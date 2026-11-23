export interface ConsultationBooking {
  athleteName: string;
  athleteEmail: string;
  sport: string;
  experienceLevel: 'collegiate' | 'pro' | 'hybrid-athlete' | 'competitive';
  consultationType: {
    id: string;
    title: string;
    durationMinutes: number;
    price: string;
    description: string;
    badge: string;
  };
  selectedSubjects?: string[];
  notes?: string;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  timeZone: string;
}

export interface GoogleCalendarEventResponse {
  id: string;
  htmlLink: string;
  summary: string;
  start: { dateTime: string; timeZone?: string };
  end: { dateTime: string; timeZone?: string };
  hangoutLink?: string;
  status: string;
}

export async function createGoogleCalendarEvent(
  accessToken: string,
  booking: ConsultationBooking
): Promise<GoogleCalendarEventResponse> {
  const summary = `iHeartGains.com: ${booking.consultationType.title} w/ ${booking.athleteName}`;
  const subjectsBlock =
    booking.selectedSubjects && booking.selectedSubjects.length > 0
      ? `\nSelected À La Carte Subjects (${booking.selectedSubjects.length}):\n${booking.selectedSubjects
          .map((s, idx) => `  ${idx + 1}. ${s}`)
          .join('\n')}`
      : '';

  const description = `
🏋️ Athlete Performance Consultation with iHeartGains.com
-----------------------------------------------------------
Athlete Name: ${booking.athleteName}
Sport / Discipline: ${booking.sport}
Experience Level: ${booking.experienceLevel.toUpperCase()}
Session Type: ${booking.consultationType.title} (${booking.consultationType.durationMinutes} min)${subjectsBlock}
Athlete Notes / Focus: ${booking.notes || 'None specified'}

Preparation Checklist:
1. Have your recent training log / competition stats ready.
2. Ensure you have video footage of key biomechanical lifts (squat, clean, sprint stride) if doing kinetic audit.
3. Meeting link will be hosted via Google Meet / consultation room.

Website: https://iheartgains.com
Consulting: Performance Personal Training & Periodization
`.trim();

  const eventPayload = {
    summary,
    description,
    start: {
      dateTime: booking.startTime,
      timeZone: booking.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: booking.endTime,
      timeZone: booking.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [
      { email: booking.athleteEmail, displayName: booking.athleteName },
      { email: 'consulting@iheartgains.com', displayName: 'iHeartGains Head Coach' }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: `ihg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Failed to create calendar event (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}

export async function fetchUpcomingEvents(
  accessToken: string,
  maxResults = 5
): Promise<GoogleCalendarEventResponse[]> {
  const now = new Date().toISOString();
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(
    now
  )}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || 'Failed to fetch calendar events');
  }

  const data = await response.json();
  return (data.items || []).filter((item: any) => item.status !== 'cancelled');
}

/**
 * Fallback / offline export: generate .ics iCalendar file content
 */
export function generateICSFile(booking: ConsultationBooking): string {
  const formatICSDate = (isoStr: string) => {
    return new Date(isoStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dtStart = formatICSDate(booking.startTime);
  const dtEnd = formatICSDate(booking.endTime);
  const summary = `iHeartGains: ${booking.consultationType.title} - ${booking.athleteName}`;
  const subjectsText =
    booking.selectedSubjects && booking.selectedSubjects.length > 0
      ? `\\nSelected Subjects: ${booking.selectedSubjects.join(', ')}`
      : '';
  const description = `Athlete Performance Consultation with iHeartGains.com\\nSport: ${booking.sport}\\nLevel: ${booking.experienceLevel}${subjectsText}\\nNotes: ${booking.notes || 'None'}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//iHeartGains//Athlete Consulting//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@iheartgains.com`,
    `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Google Meet / iHeartGains Virtual Athletic Lab',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(booking: ConsultationBooking) {
  const icsData = generateICSFile(booking);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `iHeartGains-${booking.consultationType.id}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
