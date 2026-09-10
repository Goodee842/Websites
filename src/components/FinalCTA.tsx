import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FinalCTAProps {
  onOrderNow: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOrderNow }) => {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF9F5] border-t border-[#EAE5D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-[#173F2E] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2D6A4F]/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#52B788]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
            {/* Round Logo */}
            <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
              <BrandLogo variant="full" />
            </div>

            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#52B788] mb-3">
              Satisfy Every Spoon
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              Ready to treat yourself? 🍓
            </h2>

            <p className="text-sm sm:text-base text-[#D4E4DC] max-w-md mb-8 leading-relaxed">
              Order your favourite Fruity Nest today. Handcrafted fresh to order and dispatched cold to your doorstep.
            </p>

            <button
              onClick={onOrderNow}
              className="px-8 py-4 bg-[#52B788] hover:bg-[#68C99D] text-[#0F2A1E] font-bold text-sm sm:text-base rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2.5 cursor-pointer group active:scale-98"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-xs text-[#9EC0AE] mt-4">
              ✓ No account required • Direct phone dispatch • 30-45 mins delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
