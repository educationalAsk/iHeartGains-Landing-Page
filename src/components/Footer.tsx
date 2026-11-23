import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#000000] border-t border-[#333333] pt-14 pb-10 text-[#CCCCCC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#333333]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#050505] border border-[#FF0619] flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#FF0619] fill-[#FF0619]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#FFFFFF] font-['Space_Grotesk']">
                iHeart<span className="text-[#FF0619]">Gains</span>
                <span className="text-[#A0FF00]">.com</span>
              </span>
            </div>
            <p className="text-sm text-[#CCCCCC] max-w-sm leading-relaxed">
              Goal-driven athletic performance, endurance strategy, and metabolic nutrition consulting—built around you, never a generic template.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF]">
              Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pillars" className="hover:text-[#00FFFF] transition-colors">
                  Strategy Pillars
                </a>
              </li>
              <li>
                <a href="#endurance-hub" className="hover:text-[#FF0619] transition-colors">
                  5K to Marathon &amp; Triathlon Strategies
                </a>
              </li>
              <li>
                <a href="#fertility" className="hover:text-[#00FFFF] transition-colors">
                  IVF, Fertility &amp; Metabolism
                </a>
              </li>
              <li>
                <a href="#alacarte" className="hover:text-[#FF0619] transition-colors">
                  3-Subject À La Carte Menu
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#A0FF00] transition-colors">
                  Book Strategy Session
                </a>
              </li>
            </ul>
          </div>

          {/* Google Calendar Privacy */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFFFFF] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00FFFF]" />
              Google Calendar Privacy
            </h4>
            <p className="text-xs text-[#CCCCCC] leading-relaxed">
              iHeartGains connects with the official Google Calendar API strictly to create and view your scheduled consultation sessions. Your data is never stored externally or shared.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CCCCCC]/70">
          <p>© {new Date().getFullYear()} iHeartGains.com. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-[#FF0619] fill-[#FF0619]" /> for dedicated athletes.
          </p>
        </div>
      </div>
    </footer>
  );
};
