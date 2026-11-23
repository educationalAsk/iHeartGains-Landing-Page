import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CONSULTATION_FAQS } from '../data/consultationData';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#000000] border-t border-[#333333]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-[#00FFFF] mb-2">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#FFFFFF] tracking-tight font-['Space_Grotesk']">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#CCCCCC]">
            How goal-driven strategy consulting works, what to bring, and how Google Calendar sync works.
          </p>
        </div>

        <div className="space-y-3">
          {CONSULTATION_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#050505] border border-[#333333] overflow-hidden transition-colors duration-200 hover:border-[#FF0619]/60"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#000000] transition-colors"
                >
                  <span className="font-bold text-[#FFFFFF] text-base font-['Space_Grotesk']">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#000000] border border-[#333333] flex items-center justify-center shrink-0 text-[#CCCCCC] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#FF0619] border-[#FF0619]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#CCCCCC] leading-relaxed border-t border-[#333333] pt-4 bg-[#000000]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
