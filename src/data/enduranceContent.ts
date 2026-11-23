export interface EnduranceProtocol {
  id: string;
  title: string;
  distanceCategory: '5k-10k' | 'half-marathon' | 'marathon' | 'triathlon';
  categoryLabel: string;
  targetAthlete: string;
  readTime: string;
  summary: string;
  keyMetric: string;
  metricLabel: string;
  trainingSplit: string;
  keyWorkouts: {
    name: string;
    description: string;
    pacingZone: string;
  }[];
  nutritionRecovery: string;
  coachTips: string;
  suggestedConsultation: string;
}

export const ENDURANCE_PROTOCOLS: EnduranceProtocol[] = [
  {
    id: '5k-lactate-clearing',
    title: '5K Strategy: Running Fast Without Burning Out Early',
    distanceCategory: '5k-10k',
    categoryLabel: '5K Road & Track',
    targetAthlete: 'Runners aiming for a confident finish or a faster 5K PR',
    readTime: '3 min strategy',
    summary:
      'A generic 5K plan just assigns track repeats. Our strategy identifies whether your limiter is top-end speed, first-mile pacing discipline, or late-race fade—and structures training around your specific goal time.',
    keyMetric: 'Pacing + Speed',
    metricLabel: 'Core Strategy',
    trainingSplit: 'Goal-Specific 5K Strategy',
    keyWorkouts: [
      {
        name: 'First-Mile Pacing Discipline',
        description: 'Preventing the common 10-second-too-fast start so you keep your form and push strongly through kilometer 4.',
        pacingZone: 'Even Effort',
      },
      {
        name: 'Limiter-Targeted Speed Work',
        description: 'Selecting short repeats or steady tempo work depending on whether your goal needs raw turnover or aerobic stamina.',
        pacingZone: 'Goal-Matched',
      },
    ],
    nutritionRecovery: 'Simple pre-race fueling and daily recovery habits matched to your weekly work and life schedule.',
    coachTips: 'Two runners chasing the same 5K time rarely need the same week—one needs speed, the other needs aerobic durability.',
    suggestedConsultation: 'rapid-strategy',
  },
  {
    id: '10k-threshold-engine',
    title: '10K Strategy: Bridging Speed and Stamina for 6.2 Miles',
    distanceCategory: '5k-10k',
    categoryLabel: '10K Road Race',
    targetAthlete: 'Runners stepping up to 10K or dialing in consistent pacing',
    readTime: '3 min strategy',
    summary:
      'Cookie-cutter 10K schedules treat every runner identically. We assess whether you fade from underdeveloped aerobic endurance or lack of gear-shift speed, then tailor your progression to hold rhythm through miles 4–6.',
    keyMetric: 'Rhythm + Stamina',
    metricLabel: 'Core Strategy',
    trainingSplit: 'Adaptive 10K Strategy',
    keyWorkouts: [
      {
        name: 'Sustained Effort Calibration',
        description: 'Finding the exact brisk rhythm you can sustain past the halfway mark without redlining early.',
        pacingZone: 'Controlled Effort',
      },
      {
        name: 'Schedule-Matched Progression',
        description: 'Balancing easy aerobic volume with recovery so key quality days actually move the needle toward your goal.',
        pacingZone: 'Life-Adaptive',
      },
    ],
    nutritionRecovery: 'Light, predictable pre-race nutrition and warm-weather hydration matched to your race start time.',
    coachTips: 'A strategy works when it fits your real week—consistent adaptation beats an idealized spreadsheet every time.',
    suggestedConsultation: 'rapid-strategy',
  },
  {
    id: 'half-marathon-decoupling',
    title: 'Half Marathon Strategy: Pacing & Durability for 13.1 Strong Miles',
    distanceCategory: 'half-marathon',
    categoryLabel: 'Half Marathon (13.1)',
    targetAthlete: 'First-time half marathoners and runners chasing steady PRs',
    readTime: '4 min strategy',
    summary:
      'Standard half marathon plans pile on generic long runs. We build an individualized strategy around your weekly availability, joint durability, and late-race pacing so miles 10 to 13 become your strongest.',
    keyMetric: 'Durability + Fuel',
    metricLabel: 'Core Strategy',
    trainingSplit: 'Goal-Driven 13.1 Strategy',
    keyWorkouts: [
      {
        name: 'Negative-Split Course Strategy',
        description: 'Structuring your opening 5K and mid-race effort around course elevation and your current aerobic ceiling.',
        pacingZone: 'Patient Start',
      },
      {
        name: 'Practical Long-Run Progression',
        description: 'Building toward 13.1 miles at a volume your joints and calendar can absorb without accumulating fatigue.',
        pacingZone: 'Goal-Matched',
      },
    ],
    nutritionRecovery: 'Dialing in simple on-course gel timing and hydration you have tested comfortably before race morning.',
    coachTips: 'The goal isn’t to survive the longest week on paper—it’s to arrive at the start line fresh and finish strong after mile 10.',
    suggestedConsultation: 'rapid-strategy',
  },
  {
    id: 'sprint-triathlon-fundamentals',
    title: 'Sprint Triathlon Strategy: Swim, Bike & Run Priorities Made Simple',
    distanceCategory: 'triathlon',
    categoryLabel: 'Sprint Triathlon',
    targetAthlete: 'First-time triathletes and short-course multisport racers',
    readTime: '3 min strategy',
    summary:
      'Generic tri plans cram too many hours into your week. For Sprint distance, strategy wins: we focus on your highest-return leg, streamline T1/T2 transitions, and use short bricks so your legs feel steady off the bike.',
    keyMetric: '3-Sport Focus',
    metricLabel: 'Core Strategy',
    trainingSplit: 'Time-Smart Sprint Strategy',
    keyWorkouts: [
      {
        name: 'Limiter-First Discipline Allocation',
        description: 'Investing your weekly training hours into the swim, bike, or run leg that delivers the biggest confidence and time gain.',
        pacingZone: 'High-Leverage',
      },
      {
        name: 'Clean T1 & T2 Execution',
        description: 'Simple transition setup and short bike-to-run pacing so you settle quickly into your 5K run stride.',
        pacingZone: 'Transition Flow',
      },
    ],
    nutritionRecovery: 'Simple bike hydration and light pre-race fueling tailored to your start wave—no overcomplicated protocols.',
    coachTips: 'You don’t need Ironman volume to crush a Sprint Triathlon—you need smart prioritization across all three legs.',
    suggestedConsultation: 'rapid-strategy',
  },
  {
    id: 'marathon-sub3-sub4-blueprint',
    title: 'Full Marathon Strategy: Fueling, Durability & Individualized Taper Design',
    distanceCategory: 'marathon',
    categoryLabel: 'Full Marathon (26.2)',
    targetAthlete: 'Marathoners targeting Boston Qualifiers (BQ), Sub-3:00, or Sub-4:00',
    readTime: '6 min strategy',
    summary:
      'Template marathon plans break down at Mile 20 because they ignore individual glycogen burn, musculoskeletal durability, and recovery rate. We architect a complete 26.2 strategy—from gut fuel tolerance to a non-linear taper calibrated to how fast you rebound.',
    keyMetric: '60–90g/hr',
    metricLabel: 'Fueling Strategy',
    trainingSplit: 'Custom 26.2 Strategy & Taper',
    keyWorkouts: [
      {
        name: 'Glycogen-Sparing Race Execution',
        description: 'Aligning aerobic fat-oxidation development with goal-pace segments tailored to your exact course and target (BQ, Sub-3, or Sub-4).',
        pacingZone: 'Zone 2 / MGP',
      },
      {
        name: 'Recovery-Matched Non-Linear Taper',
        description: 'Reducing volume over 21 days without losing neuromuscular tension—calibrated to your training age and fatigue profile.',
        pacingZone: 'Peak Readiness',
      },
    ],
    nutritionRecovery: 'Personalized 48-hour carb-loading and race-day carbohydrate/sodium targets tested across key long efforts.',
    coachTips: 'A generic marathon plan protects no one from Mile 20—strategy aligns your pacing, durability, and fueling before race day.',
    suggestedConsultation: 'competition-peaking',
  },
  {
    id: 'triathlon-brick-transition',
    title: 'Olympic, 70.3 & Ironman Strategy: Power Caps, Nutrition & T2 Execution',
    distanceCategory: 'triathlon',
    categoryLabel: 'Triathlon (Olympic, 70.3 & Ironman)',
    targetAthlete: 'Olympic, 70.3 Half-Ironman, and Full Ironman 140.6 triathletes',
    readTime: '6 min strategy',
    summary:
      'Long-course triathlon isn’t three separate sports—it’s one continuous energy-management problem. Rather than handing you a rigid volume template, we calibrate your bike power ceiling, sweat-sodium and carb strategy, and T2 transition to protect your run off the bike.',
    keyMetric: '82–88%',
    metricLabel: 'FTP Bike Strategy',
    trainingSplit: 'Multi-Discipline Race Strategy',
    keyWorkouts: [
      {
        name: 'Bike Power-to-Run Protection',
        description: 'Setting realistic wattage caps so you arrive at T2 with intact glycogen and fresh glute/hamstring recruitment.',
        pacingZone: 'Power Strategy',
      },
      {
        name: 'Sweat & Carbohydrate Architecture',
        description: 'Building a personalized 60–90g/hr bike fueling and sodium plan validated under race-specific effort.',
        pacingZone: 'Fuel Execution',
      },
    ],
    nutritionRecovery: 'Customized 1:0.8 carbohydrate blend and electrolyte targets matched to your sweat rate and course climate.',
    coachTips: 'If your heart rate spikes within 1 mile of leaving T2, the issue wasn’t fitness—it was bike pacing strategy.',
    suggestedConsultation: 'competition-peaking',
  },
];
