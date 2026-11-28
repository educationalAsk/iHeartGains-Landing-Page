import { ConsultationType } from '../types';

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: 'alacarte-three-subject',
    title: 'À La Carte 3-Subject Consult',
    durationMinutes: 60,
    price: '$175',
    badge: 'BUILD YOUR OWN (3 SUBJECTS)',
    tagline: 'Pick any 3 strategy components from our à la carte menu',
    description:
      'A focused 60-minute 1-on-1 session structured strictly around the three subjects you choose—combining race pacing, biomechanics, strength, or metabolic/fertility strategy to fit your exact goals.',
    includes: [
      '60-Minute 1-on-1 Custom 3-Subject Session',
      'Focused strategy across your 3 chosen components',
      'Practical adjustments matched to your schedule',
      'Instant booking via Google Calendar Appointment Schedule',
    ],
  },
  {
    id: 'comprehensive-diagnostic',
    title: 'Comprehensive Performance Strategy',
    durationMinutes: 60,
    price: '$185',
    badge: 'MOST POPULAR',
    tagline: 'Deep-dive limiter diagnosis & custom goal architecture',
    description:
      'Complete kinetic evaluation, force-velocity profiling, and an individualized strategy built around your physiology, real-world schedule, and target outcome—never a generic template.',
    includes: [
      '60-Minute 1-on-1 Lab & Strategy Consultation',
      'Movement asymmetry & performance limiter breakdown',
      'Custom goal strategy adapted to your weekly calendar',
      'Direct Google Meet link upon appointment booking',
    ],
  },
  {
    id: 'kinetic-audit',
    title: 'Kinetic Chain & Biomechanical Strategy',
    durationMinutes: 45,
    price: '$140',
    badge: 'POWER & EFFICIENCY',
    tagline: 'Eliminate movement leaks & protect durability',
    description:
      'Video-based biomechanical review of key lifts and running mechanics to pinpoint sticking points, hip-ankle mobility limits, and the highest-leverage adjustments for your goal.',
    includes: [
      '45-Minute Video Biomechanics & Limiter Audit',
      'Dynamic joint angle breakdown & feedback',
      'Targeted corrective & primer strategy',
      'Direct Google Calendar session booking',
    ],
  },
  {
    id: 'competition-peaking',
    title: 'Race, Taper & Peaking Strategy',
    durationMinutes: 45,
    price: '$140',
    badge: 'EVENT EXECUTION',
    tagline: 'Custom taper, pacing & fueling for race day',
    description:
      'Calibrate your taper timeline, pacing strategy, nervous-system priming, and race-day nutrition around how you personally recover and the exact demands of your course.',
    includes: [
      '45-Minute Race & Peaking Strategy Session',
      'Individualized volume drop-off & intensity timing',
      'Course pacing, hydration & recovery execution',
      'Calendarized countdown checkpoints',
    ],
  },
  {
    id: 'rapid-strategy',
    title: 'Goal & Performance Strategy Call',
    durationMinutes: 30,
    price: '$95',
    badge: 'FOCUSED STRATEGY',
    tagline: 'Practical, tailored strategy for your distance or plateau',
    description:
      'Focused 1-on-1 strategy session to solve immediate plateaus, simplify 5K to Half Marathon or Sprint Triathlon prep, and map a realistic path to your goal.',
    includes: [
      '30-Minute High-Impact Strategy Session',
      'Immediate, tailored training & pacing adjustments',
      'Clear action summary built around your schedule',
      'Direct Google Calendar Appointment Schedule booking',
    ],
  },
  {
    id: 'fertility-ivf-optimization',
    title: 'More Than Macros: Fertility & Metabolic Strategy',
    durationMinutes: 60,
    price: '$185',
    badge: 'METABOLIC & REPRODUCTIVE NUANCE',
    tagline: 'Individualized nutrition, gut health & signaling strategy beyond CICO',
    description:
      'Look beyond generic calorie templates to build an individualized strategy aligning food matrix quality, gut health, carbohydrate timing, and cellular hormone signaling with your fertility or IVF goals.',
    includes: [
      '60-Minute 1-on-1 Nutrition & Metabolic Strategy Session',
      'Food matrix & gut health audit (resistant starch, fiber & phytonutrients)',
      'Glycogen timing, metabolic sink & hormonal signaling strategy',
      'Direct appointment booking with Google Meet invite',
    ],
  },
];

export const CONSULTATION_FAQS = [
  {
    question: 'Why strategy consulting instead of a downloadable training plan?',
    answer:
      'Generic training plans assume every athlete has the same injury history, recovery capacity, stress load, and limiter. I develop individualized strategies around your exact goals—diagnosing what actually holds you back and adjusting your pacing, strength, and nutrition so you can execute consistently in the real world.',
  },
  {
    question: 'How does scheduling via Google Calendar Appointment Schedule work?',
    answer:
      'Pick your strategy session (or build a 3-subject consult from the À La Carte menu), copy your brief if desired, and choose an open time directly in the embedded iHeartGains Google Workspace booking calendar. You do not need to grant any Google account permissions—Google automatically checks real-time availability and emails your Google Meet invite.',
  },
  {
    question: 'What do I need to prepare before our session?',
    answer:
      'Bring your target goal, upcoming race date or timeline, and a snapshot of your current weekly routine. If you selected a Biomechanical Strategy audit, prepare 2–3 short smartphone videos from side and front angles of your running stride or primary lifts.',
  },
  {
    question: 'Are sessions held virtually or in person?',
    answer:
      'All initial strategy sessions are held virtually via dedicated Google Meet rooms with live screen-sharing for biomechanical review and pacing/nutrition mapping. In-person observation is available upon request.',
  },
  {
    question: 'Can my coach or training partner join the call?',
    answer:
      'Yes. We welcome coaches and support staff to join so everyone is aligned on your strategy, pacing targets, and recovery priorities.',
  },
  {
    question: 'How do performance fitness protocols improve IVF and pregnancy outcomes?',
    answer:
      'High-performance training science targets key endocrine biomarkers: eccentric resistance training improves muscle insulin sensitivity (vital for oocyte quality and PCOS), while Heart Rate Variability (HRV) periodization shields against the "cortisol-progesterone steal" to preserve luteal phase length and endometrial lining thickness (>8mm). During active IVF stimulation and embryo transfer, we modify movement mechanics to eliminate ovarian torsion risk and promote pelvic perfusion.',
  },
  {
    question: 'What if I need to reschedule my consultation?',
    answer:
      'Because the meeting is added directly to your Google Calendar, you will receive real-time updates. You can easily reschedule up to 12 hours prior to the session time with zero penalty.',
  },
];
