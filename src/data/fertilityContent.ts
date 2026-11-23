export interface NutritionNuancePillar {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  philosophy: string;
  chemicalMetric: string;
  metricLabel: string;
  practicalApplication: string;
}

export interface SystemicInteraction {
  title: string;
  badge: string;
  overview: string;
  keyPoints: string[];
}

export const MACRO_NUANCE_PILLARS: NutritionNuancePillar[] = [
  {
    id: 'muscle-metabolic-sink',
    badge: 'METABOLIC SINK & RESILIENCE',
    title: 'Muscle as a Metabolic Sink (Beyond Pure Cardio)',
    subtitle: 'Building lean tissue gives incoming calories and glucose a safe destination.',
    philosophy:
      'While cardio produces immediate energy expenditure, muscle mass acts as a metabolic reservoir—storing energy and providing incoming calories a place to go. Building lean tissue improves insulin sensitivity, prevents injury, and creates physical resilience in ways that generic caloric restriction never can.',
    chemicalMetric: 'Metabolic Sink',
    metricLabel: 'Glucose Disposal Capacity',
    practicalApplication:
      'Prioritize resistance training to build metabolic tissue that improves glucose handling and prevents allostatic stress spikes.',
  },
  {
    id: 'protein-gi-integrity',
    badge: 'LEAN TISSUE & GI MAINTENANCE',
    title: 'Protein, Tissue Repair & Gut Structural Integrity',
    subtitle: 'Providing amino acid building blocks for repair and gut mucosa.',
    philosophy:
      'Beyond supporting muscle retention and lean tissue repair, dietary protein provides essential amino acids for the structural maintenance of the gastrointestinal lining. The gut mucosal barrier undergoes rapid cell turnover every few days and requires a steady influx of amino acids.',
    chemicalMetric: '4 kcal/g',
    metricLabel: 'Structural Repair Rate',
    practicalApplication:
      'Distribute high-quality protein across meals to meet tissue maintenance demands and support gastrointestinal mucosal turnover.',
  },
  {
    id: 'fat-cellular-integrity',
    badge: 'ESSENTIAL FATTY ACIDS & STEROLS',
    title: 'Dietary Fat, Cell Turnover & Steroid Hormones',
    subtitle: 'Trillions of cells require essential fats for membrane fluidity and hormone synthesis.',
    philosophy:
      'Dietary fats are strictly essential. They deliver mandatory nutrients like essential fatty acids and provide the fundamental sterol ring building blocks for steroid hormone production. With trillions of cells undergoing constant turnover—from the gut lining to reproductive tissues—adequate dietary fat is non-negotiable.',
    chemicalMetric: '9 kcal/g',
    metricLabel: 'Steroid Hormone Substrates',
    practicalApplication:
      'Incorporate unrefined dietary fats (omega-3s, monounsaturated fats) to furnish cell membrane fluidity and hormonal precursor pools.',
  },
  {
    id: 'carbs-transporters-timing',
    badge: 'SGLT1 / GLUT5 PATHWAYS',
    title: 'Carbohydrates, Transporter Nuance & Glycogen Timing',
    subtitle: 'Navigating SGLT1 (glucose) and GLUT5 (fructose) pathways beyond generic totals.',
    philosophy:
      'Carbohydrates are often feared, yet they remain the primary energy substrate for high-demand physiological adaptations. The body processes carbohydrates through distinct intestinal pathways: glucose relies on SGLT1 transporters while fructose utilizes GLUT5. Coordinating carbohydrate timing with physical demands prevents central nervous system exhaustion and glycogen depletion.',
    chemicalMetric: 'SGLT1 + GLUT5',
    metricLabel: 'Dual Transporter Pathways',
    practicalApplication:
      'Match carbohydrate intake and food matrix density (resistant starches vs quick-clearing carbohydrates) to active training and recovery windows.',
  },
];

export const SYSTEMIC_INTERACTIONS: SystemicInteraction[] = [
  {
    title: 'Fertility & Cellular Health',
    badge: 'ENDOCRINE & METABOLISM',
    overview:
      'Metabolic pathways directly govern fertility and reproductive hormone signaling. Simple calorie totals fail to account for how nutrients communicate with endocrine glands.',
    keyPoints: [
      'Insulin acts as a master nutrient-shuttling hormone, directing amino acids and glycogen into cells.',
      'Dietary fats provide the mandatory lipid bilayer integrity and steroid hormone building blocks.',
      'Amino acids drive systemic protein synthesis, tissue remodeling, and endometrial cellular repair.',
    ],
  },
  {
    title: 'Gut Health, Fiber & ROS Management',
    badge: 'ANTIOXIDANT PATHWAYS',
    overview:
      'Mainstream macro tracking often overlooks gut health. Cellular respiration inherently generates Reactive Oxygen Species (ROS); dietary phytonutrients support endogenous antioxidant defenses.',
    keyPoints: [
      'Salads, diverse leafy greens, and resistant starches provide fiber and prebiotic substrate that generic protein/fat/carb targets miss.',
      'Mitochondrial metabolism naturally produces ROS; dietary polyphenols support endogenous antioxidant enzymes to mitigate excess inflammation.',
      'A healthy microbiome and gut lining renewal directly regulate systemic inflammatory tone and hormone clearance.',
    ],
  },
  {
    title: 'mTOR Signaling & The Leucine Trigger',
    badge: 'CELLULAR SIGNALING',
    overview:
      'Mammalian Target of Rapamycin (mTOR) functions as the central cellular sensor balancing tissue building with cellular cleanup.',
    keyPoints: [
      'Activating the mTORC1 pathway typically requires a threshold bolus of ~2.5 to 3 grams of the essential amino acid leucine (found in ~30g of complete protein).',
      'Key amino acids like methionine, arginine, and glutamine act through distinct upstream sensing mechanisms.',
      'When mTOR is activated, cells prioritize protein synthesis and tissue building; when downregulated, the body initiates autophagy for cellular maintenance.',
    ],
  },
];
