import { AlaCarteCategory, AlaCarteComponent } from '../types';

export const ALA_CARTE_CATEGORIES: { id: 'all' | AlaCarteCategory; label: string }[] = [
  { id: 'all', label: 'All Components' },
  { id: 'endurance', label: 'Endurance & Race' },
  { id: 'biomechanics-strength', label: 'Biomechanics & Strength' },
  { id: 'nutrition-fertility', label: 'Nutrition & Fertility' },
];

export const ALA_CARTE_COMPONENTS: AlaCarteComponent[] = [
  {
    id: 'race-pacing-execution',
    title: 'Race-Day Pacing & Split Strategy',
    category: 'endurance',
    categoryLabel: 'Endurance & Race',
    description:
      'Calibrate effort caps, terrain adjustments, and negative-split pacing for 5K, 10K, Half Marathon, or Marathon.',
    deliverable: 'Custom pace & effort execution targets',
  },
  {
    id: 'marathon-taper-design',
    title: 'Individualized Taper & Peak Timing',
    category: 'endurance',
    categoryLabel: 'Endurance & Race',
    description:
      'Design a 14- to 21-day volume drop-off matched to your training load, age, and recovery rate.',
    deliverable: 'Personalized countdown & taper structure',
  },
  {
    id: 'triathlon-brick-t2',
    title: 'Triathlon Pacing & T2 Transition',
    category: 'endurance',
    categoryLabel: 'Endurance & Race',
    description:
      'Balance swim, bike wattage/effort, and T2 run legs for Sprint, Olympic, 70.3, or Ironman.',
    deliverable: '3-sport priority & transition strategy',
  },
  {
    id: 'schedule-aligned-volume',
    title: 'Schedule-Adaptive Training Priority',
    category: 'endurance',
    categoryLabel: 'Endurance & Race',
    description:
      'Focus limited weekly training hours on the exact sessions that move your goal forward without burnout.',
    deliverable: 'High-leverage weekly structure',
  },
  {
    id: 'biomechanical-limiter-audit',
    title: 'Movement & Stride Limiter Review',
    category: 'biomechanics-strength',
    categoryLabel: 'Biomechanics & Strength',
    description:
      'Review video of your running stride or primary lifts to spot joint asymmetries and power leaks.',
    deliverable: 'Targeted mechanical & drill adjustments',
  },
  {
    id: 'strength-for-endurance',
    title: 'Strength Integration Without Fatigue',
    category: 'biomechanics-strength',
    categoryLabel: 'Biomechanics & Strength',
    description:
      'Pair velocity-guided strength work with running or triathlon sessions without leaving legs heavy.',
    deliverable: 'Sport-compatible strength pairing',
  },
  {
    id: 'durability-load-management',
    title: 'Joint & Tissue Load Strategy',
    category: 'biomechanics-strength',
    categoryLabel: 'Biomechanics & Strength',
    description:
      'Manage weekly stress progression so calves, knees, and hips stay resilient across build cycles.',
    deliverable: 'Load progression & recovery guardrails',
  },
  {
    id: 'fertility-ivf-metabolic',
    title: 'IVF & Fertility Metabolic Alignment',
    category: 'nutrition-fertility',
    categoryLabel: 'Nutrition & Fertility',
    description:
      'Align exercise intensity, recovery, and cellular signaling to support hormone health and fertility timelines.',
    deliverable: 'Cycle- & IVF-aligned training adjustments',
  },
  {
    id: 'more-than-macros-food-matrix',
    title: 'More Than Macros: Food Matrix & Gut Health',
    category: 'nutrition-fertility',
    categoryLabel: 'Nutrition & Fertility',
    description:
      'Move beyond CICO with fiber, resistant starch, phytonutrients, and gut barrier integrity strategies.',
    deliverable: 'Food-quality & gut optimization focus',
  },
  {
    id: 'race-fueling-carb-transport',
    title: 'Race Fueling & Gut Tolerance',
    category: 'nutrition-fertility',
    categoryLabel: 'Nutrition & Fertility',
    description:
      'Dial in SGLT1/GLUT5 carbohydrate intake, hydration, and sodium strategy tested for race intensity.',
    deliverable: 'Personalized fueling & hydration protocol',
  },
  {
    id: 'muscle-metabolic-sink',
    title: 'Muscle as a Metabolic Sink & Protein Timing',
    category: 'nutrition-fertility',
    categoryLabel: 'Nutrition & Fertility',
    description:
      'Improve glucose disposal, insulin sensitivity, and leucine-triggered tissue recovery around key sessions.',
    deliverable: 'Glucose disposal & protein timing strategy',
  },
];
