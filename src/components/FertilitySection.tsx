import React, { useState } from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import {
  MACRO_NUANCE_PILLARS,
  SYSTEMIC_INTERACTIONS,
} from '../data/fertilityContent';
import fertilityHeroImg from '../assets/images/fertility_hormone_performance_1793932873422.jpg';

interface FertilitySectionProps {
  onBookFertility: () => void;
}

export const FertilitySection: React.FC<FertilitySectionProps> = ({ onBookFertility }) => {
  const [activeSystemicIndex, setActiveSystemicIndex] = useState<number>(0);

  return (
    <section id="fertility" className="py-20 bg-[#050505] border-t border-[#333333]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        {/* Header & Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FFFF]">
              Nutrition &amp; Metabolism
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
              IVF and Fertility is More Than Macros:{' '}
              <span className="text-[#FF0619]">Navigating the Nuance</span>
            </h2>
            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
              While Calories In / Calories Out (CICO) models body weight change, generic macro calculators are not an optimization strategy. Daily totals alone fail to capture how food quality, gut health, carbohydrate transporters, and muscle as a metabolic sink communicate with your endocrine and reproductive systems.
            </p>
            <p className="text-sm text-[#CCCCCC] leading-relaxed">
              500 calories of fast-clearing carbohydrates yield vastly different insulin and cellular signals than 500 calories from leafy greens, salads, and cold resistant-starch potatoes. We build an individualized nutrition and lifestyle strategy tailored to your fertility timeline, biomarkers, and recovery.
            </p>

            <div className="pt-2">
              <button
                onClick={onBookFertility}
                className="inline-flex items-center gap-2 bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#A0FF00]" />
                <span>Build Your Fertility &amp; Metabolic Strategy ($185)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#333333] bg-[#000000]">
              <img
                src={fertilityHeroImg}
                alt="Athlete reviewing metabolic and biomarker tracking"
                className="w-full h-[300px] sm:h-[340px] object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 4 Macronutrient & Metabolic Nuances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MACRO_NUANCE_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 rounded-2xl bg-[#000000] border border-[#333333] hover:border-[#00FFFF] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-bold text-[#00FFFF]">
                    {pillar.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#A0FF00]">
                    {pillar.chemicalMetric}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-2 font-['Space_Grotesk']">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed mb-4">
                  {pillar.philosophy}
                </p>
              </div>
              <p className="pt-3 border-t border-[#333333] text-xs text-[#CCCCCC]/90">
                <strong className="text-[#FFFFFF]">Application: </strong>
                {pillar.practicalApplication}
              </p>
            </div>
          ))}
        </div>

        {/* Systemic Interactions Tabs */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#000000] border border-[#333333] space-y-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#A0FF00] mb-1">
              Systemic Interactions
            </p>
            <h3 className="text-2xl font-bold text-[#FFFFFF] font-['Space_Grotesk']">
              Fertility, Gut Inflammation &amp; mTOR Signaling
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {SYSTEMIC_INTERACTIONS.map((interaction, idx) => {
              const isActive = activeSystemicIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSystemicIndex(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FF0619] text-[#FFFFFF]'
                      : 'bg-[#050505] text-[#CCCCCC] hover:text-[#FFFFFF] border border-[#333333] hover:border-[#00FFFF]'
                  }`}
                >
                  {interaction.title}
                </button>
              );
            })}
          </div>

          <div className="p-5 rounded-xl bg-[#050505] border border-[#333333] space-y-4">
            <p className="text-sm text-[#CCCCCC] leading-relaxed">
              {SYSTEMIC_INTERACTIONS[activeSystemicIndex].overview}
            </p>
            <div className="space-y-2">
              {SYSTEMIC_INTERACTIONS[activeSystemicIndex].keyPoints.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#CCCCCC]">
                  <CheckCircle2 className="w-4 h-4 text-[#00FFFF] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
