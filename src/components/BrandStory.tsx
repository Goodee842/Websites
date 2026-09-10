import React from 'react';
import { CheckCircle2, Award, Heart, Leaf } from 'lucide-react';
import { brandStoryImg } from '../data/products';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-16 lg:py-24 bg-[#173F2E] text-[#FAF7F0] relative overflow-hidden">
      {/* Decorative background leaf accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23563F]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E281D]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story Image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#25543F]/50 aspect-4/3 group">
              <img
                src={brandStoryImg}
                alt="Fruity Nest kitchen prep with fresh strawberries, mangoes and Greek yogurt"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Floating quote badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#0E281D]/85 backdrop-blur-md border border-[#2B5E47] text-xs sm:text-sm">
                <p className="italic text-[#E3EDE7]">
                  &ldquo;We started Fruity Nest with one clear goal: making nutritious, guilt-free
                  parfaits taste utterly unforgettable.&rdquo;
                </p>
                <span className="block mt-2 font-bold text-[#52B788] text-[11px] uppercase tracking-wider">
                  — The Fruity Nest Kitchen Team
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23563F] text-[#A7D7BC] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#307052]">
              <Leaf className="w-3.5 h-3.5" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Real Ingredients. <br />
              <span className="italic font-normal text-[#52B788]">Better Choices.</span>
            </h2>

            <div className="space-y-4 text-[#D3E2D8] text-sm sm:text-base leading-relaxed">
              <p>
                At <span className="text-white font-semibold">Fruity Nest</span>, we believe that satisfying your sweet cravings shouldn’t mean compromising on real wellness. Every single cup begins at dawn in our kitchen — straining rich, velvety Greek yogurt that is bursting with natural active cultures.
              </p>
              <p>
                We hand-slice fresh Nigerian strawberries, fragrant golden mangoes, and vibrant kiwis only minutes before your order is prepared. Our signature granola is slow-baked with rolled oats, warm cinnamon, and a gentle drizzle of wildflower honey for an unrivaled, long-lasting crunch.
              </p>
            </div>

            {/* Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 w-full">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E4B37] border border-[#296248]">
                <CheckCircle2 className="w-5 h-5 text-[#52B788] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Daily Morning Prep</h4>
                  <p className="text-xs text-[#BED5C6] mt-0.5">Nothing sits overnight. Zero frozen compromises.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1E4B37] border border-[#296248]">
                <Award className="w-5 h-5 text-[#52B788] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Direct Phone Dispatch</h4>
                  <p className="text-xs text-[#BED5C6] mt-0.5">Direct rider call so your parfait arrives fresh and cold.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
