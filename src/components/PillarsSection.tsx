import React from 'react';
import { ArrowRight, BarChart3, Gauge, Target, Zap } from 'lucide-react';

interface PillarsSectionProps {
  onSelectPillar: (pillarId: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onSelectPillar }) => {
  const pillars = [
    {
      id: 'comprehensive-diagnostic',
      icon: Gauge,
      accent: '#FF0619',
      title: 'Biomechanical Strategy',
      description:
        'Uncover hidden movement leaks and asymmetries so training load builds speed instead of injury.',
    },
    {
      id: 'kinetic-audit',
      icon: BarChart3,
      accent: '#00FFFF',
      title: 'Strength & Output Strategy',
      description:
        'Pair velocity-guided strength work with your primary sport without stealing recovery from key days.',
    },
    {
      id: 'rapid-strategy',
      icon: Zap,
      accent: '#A0FF00',
      title: 'Goal & Limiter Strategy',
      description:
        'Identify what actually holds you back—pacing, energy systems, or schedule—and solve it directly.',
    },
    {
      id: 'competition-peaking',
      icon: Target,
      accent: '#FF0619',
      title: 'Race & Taper Strategy',
      description:
        'Calibrate taper timing, race-day fueling, and pacing execution around your exact course and target.',
    },
  ];

  return (
    <section id="pillars" className="py-20 bg-[#050505] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF0619] mb-2">
            Strategy Over Templates
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Built Around Your Goals, Not a Cookie-Cutter Plan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            Static plans assume every athlete moves, fuels, and recovers identically. We develop 1-on-1 strategies tailored to your limiters and target outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="p-6 rounded-2xl bg-[#000000] border border-[#333333] hover:border-[#FF0619] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-lg bg-[#050505] border border-[#333333] flex items-center justify-center mb-5"
                    style={{ color: pillar.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#FFFFFF] mb-2 font-['Space_Grotesk'] group-hover:text-[#00FFFF] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectPillar(pillar.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#CCCCCC] group-hover:text-[#A0FF00] transition-colors cursor-pointer"
                >
                  <span>Build This Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
