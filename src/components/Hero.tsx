import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart } from 'lucide-react';
import { heroParfaitImg } from '../data/products';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOrderNow: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExplore }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FAF9F5]">
      {/* Subtle organic background glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#E6EFE6]/70 via-[#F3EFE0]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Pill Eyebrow tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3ED] text-[#1B4332] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 border border-[#D1E4D5]">
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Greek Yogurt • Fresh Fruits • Crunchy Granola</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#173F2E] tracking-tight leading-[1.15] mb-5">
              Fruty Nest <br />
              <span className="italic font-normal text-[#2D6A4F]">Happy Moments.</span>
            </h1>

            {/* Subtext */}
            <div className="text-base sm:text-lg text-[#445E50] max-w-xl leading-relaxed mb-8 mx-auto lg:mx-0">
              <p className="italic">
                &ldquo;Premium Greek yogurt, fresh fruits and crunchy granola — layered into every satisfying spoonful. Handcrafted daily with zero preservatives.&rdquo;
              </p>
              <p className="not-italic font-bold text-[#173F2E] mt-2">
                Where all your cravings are nested!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#173F2E] hover:bg-[#23563F] text-white font-medium rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExplore}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#F3EFE6] text-[#173F2E] border border-[#D5D0C3] font-medium rounded-full transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
              >
                <span>Explore Our Parfaits</span>
              </button>
            </div>

            {/* Customer trust snippet */}
            <div className="mt-9 pt-7 border-t border-[#EAE4D5] flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#D8F3DC] border-2 border-[#FAF9F5] flex items-center justify-center text-xs font-bold text-[#1B4332]">
                  AO
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFE5D9] border-2 border-[#FAF9F5] flex items-center justify-center text-xs font-bold text-[#9D0208]">
                  CO
                </div>
                <div className="w-8 h-8 rounded-full bg-[#D8E2DC] border-2 border-[#FAF9F5] flex items-center justify-center text-xs font-bold text-[#2B2D42]">
                  NE
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFE8D6] border-2 border-[#FAF9F5] flex items-center justify-center text-xs font-bold text-[#D4A373]">
                  TA
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F9A826] text-[#F9A826]" />
                  ))}
                  <span className="text-xs font-bold text-[#173F2E] ml-1">4.9 / 5.0</span>
                </div>
                <span className="text-xs text-[#5D7A68]">Over 2,800+ fresh parfaits dispatched</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with Fruity Nest Sticker */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <img
                src={heroParfaitImg}
                alt="Fruity Nest signature parfait with layers of Greek yogurt, strawberries, blueberries, kiwi and granola"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Brand Logo Sticker positioned right on the cup area */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <BrandLogo variant="sticker" className="shadow-lg transform scale-110 sm:scale-125" />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-[#ECE7DA] flex items-center gap-1.5 text-xs font-semibold text-[#173F2E]">
                <span className="w-2 h-2 rounded-full bg-[#38B000]" />
                <span>Made Fresh Daily</span>
              </div>

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-[#173F2E]/95 backdrop-blur-md text-[#FAF7F0] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                <span>100% Greek Yogurt</span>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#E8F1EB] rounded-full -z-10 blur-xl opacity-80" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F6F0DF] rounded-full -z-10 blur-xl opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};
