export interface ConsultationType {
  id: string;
  title: string;
  durationMinutes: number;
  price: string;
  badge: string;
  tagline: string;
  description: string;
  includes: string[];
}

export type AlaCarteCategory =
  | 'endurance'
  | 'biomechanics-strength'
  | 'nutrition-fertility';

export interface AlaCarteComponent {
  id: string;
  title: string;
  category: AlaCarteCategory;
  categoryLabel: string;
  description: string;
  deliverable: string;
}

export interface AthleteIntake {
  fullName: string;
  email: string;
  sport: string;
  experienceLevel: 'collegiate' | 'pro' | 'hybrid-athlete' | 'competitive';
  goalsAndLimiters: string;
}

export interface ScheduledEventInfo {
  id: string;
  summary: string;
  htmlLink: string;
  hangoutLink?: string;
  start: string;
  end: string;
}
