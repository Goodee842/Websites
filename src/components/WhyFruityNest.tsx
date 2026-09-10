import React from 'react';
import { Utensils, Milk, Sparkles, Truck, ShieldCheck, Heart } from 'lucide-react';

export const WhyFruityNest: React.FC = () => {
  const features = [
    {
      icon: '🥣',
      lucide: Utensils,
      title: 'Fresh Ingredients',
      description: 'Made with carefully selected fresh fruits and slow-baked honey oats daily.',
      accent: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
    },
    {
      icon: '🥛',
      lucide: Milk,
      title: 'Greek Yogurt',
      description: 'Rich, thick, creamy and packed with natural probiotics and wholesome protein.',
      accent: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    },
    {
      icon: '🍓',
      lucide: Sparkles,
      title: 'No Preservatives',
      description: 'Pure, authentic freshness without artificial colors, sweeteners, or unnecessary extras.',
      accent: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    },
    {
      icon: '🚚',
      lucide: Truck,
      title: 'Fast & Flexible Delivery',
      description: 'Chilled temperature-controlled dispatch delivered straight to your home or office.',
      accent: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
    },
  ];

  return (
    <section id="why-us" className="py-12 lg:py-16 bg-[#F6F4ED] border-y border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F2E] tracking-tight">
            Why Fruity Nest?
          </h2>
          <p className="text-sm sm:text-base text-[#567262] mt-2">
            Every cup is carefully layered with pure love, high nutrition, and farm-fresh vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#E8E4D8] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col items-start group hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-[#F2F7F3] border border-[#DCE8DF] group-hover:scale-110 transition-transform">
                <span>{feature.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#173F2E] mb-2 font-sans tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-[#586E61] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
