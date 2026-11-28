import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/athlete_training_hero_1793930879326.jpg';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-14 pb-20 md:pt-20 md:pb-24 bg-[#000000] bg-grid-pattern overflow-hidden">
      {/* Subtle ambient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[320px] bg-[#FF0619]/10 rounded-full blur-[140px] pointer-events-none animate-accent-shimmer" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Messaging & CTA */}
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FFFF]">
              iHeartGains.com • Strategy Over Generic Plans
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#FFFFFF] leading-[1.08] font-['Space_Grotesk']">
              Training Plans Are General.{' '}
              <span className="text-[#FF0619]">We Build Strategies</span> for Your Goals.
            </h1>

            <p className="text-base sm:text-lg text-[#CCCCCC] max-w-2xl leading-relaxed">
              Evidence-based kinetic diagnostics, endurance periodization, and metabolic nutrition systems engineered for competitive distance racers, triathletes, and fertility-focused hormonal vitality.
            </p>

            <p className="text-xs sm:text-sm text-[#CCCCCC]/80 max-w-xl border-l-2 border-[#00FFFF] pl-3.5">
              Templates hand every athlete the same schedule. We identify your individual limiters and architect an adaptive strategy around your physiology, calendar, and target outcome.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={() => scrollTo('schedule')}
                className="inline-flex items-center justify-center gap-2 bg-[#FF0619] hover:bg-[#e00516] text-[#FFFFFF] font-bold text-sm px-7 py-3.5 rounded-xl transition-all cursor-pointer shadow-[0_0_24px_rgba(255,6,25,0.35)]"
              >
                <span>Build Your Strategy</span>
                <ArrowRight className="w-4 h-4 text-[#A0FF00]" />
              </button>

              <button
                onClick={() => scrollTo('endurance-hub')}
                className="inline-flex items-center justify-center gap-2 text-[#CCCCCC] hover:text-[#FFFFFF] bg-[#050505] border border-[#333333] hover:border-[#00FFFF] font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Explore Distance Strategies</span>
              </button>
            </div>
          </div>

          {/* Right: Clean Hero Visual */}
          <div className="lg:col-span-5 animate-float">
            <div className="rounded-2xl bg-[#050505] border border-[#333333] overflow-hidden shadow-2xl">
              <div className="relative h-[340px] sm:h-[400px] w-full">
                <img
                  src={heroImage}
                  alt="Athlete working through performance diagnostics and training strategy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#FFFFFF]">
                    1-on-1 Strategy Consulting
                  </span>
                  <span className="font-mono text-[#A0FF00]">Direct Google Meet Booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* US Marathon Statistics Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#050505] border border-[#333333] hover:border-[#FF0619] transition-colors">
            <div className="text-3xl font-black text-[#FFFFFF] font-['Space_Grotesk']">
              40.2<span className="text-[#FF0619] text-lg font-bold ml-1">yrs</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#CCCCCC] mt-1">
              Average US Marathoner Age
            </div>
            <p className="text-[11px] text-[#CCCCCC]/60 mt-0.5">Mean age of US 26.2 finishers</p>
          </div>

          <div className="p-5 rounded-xl bg-[#050505] border border-[#333333] hover:border-[#00FFFF] transition-colors">
            <div className="text-3xl font-black text-[#FFFFFF] font-mono">
              4:29<span className="text-[#00FFFF] text-xl">:53</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#CCCCCC] mt-1">
              Average Finishing Time
            </div>
            <p className="text-[11px] text-[#CCCCCC]/60 mt-0.5">US national marathon finisher mean</p>
          </div>

          <div className="p-5 rounded-xl bg-[#050505] border border-[#333333] hover:border-[#A0FF00] transition-colors">
            <div className="text-3xl font-black text-[#FFFFFF] font-['Space_Grotesk']">
              2.4<span className="text-[#A0FF00] text-2xl">+</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#CCCCCC] mt-1">
              Prior Marathons Run
            </div>
            <p className="text-[11px] text-[#CCCCCC]/60 mt-0.5">Average races run previously</p>
          </div>

          <div className="p-5 rounded-xl bg-[#050505] border border-[#333333] hover:border-[#FF0619] transition-colors">
            <div className="text-3xl font-black text-[#FFFFFF] font-['Space_Grotesk']">
              13.8<span className="text-[#FF0619] text-2xl">%</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#CCCCCC] mt-1">
              Beat Boston Qualifier Time
            </div>
            <p className="text-[11px] text-[#CCCCCC]/60 mt-0.5">Finish Boston faster than BQ</p>
          </div>
        </div>
      </div>
    </section>
  );
};
