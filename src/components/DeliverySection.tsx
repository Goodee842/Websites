import React from 'react';
import { ShieldCheck, QrCode, Bike, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface DeliverySectionProps {
  onOrderNow: () => void;
  onOpenTrackOrder: () => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  onOrderNow,
  onOpenTrackOrder,
}) => {
  const steps = [
    {
      step: '1',
      title: 'Order Seamlessly',
      desc: 'Pick your parfaits, customize sizes and crunchy toppings, and pay directly as a guest in seconds.',
      icon: '🛒',
    },
    {
      step: '2',
      title: 'Direct Phone Dispatch',
      desc: 'Your order is linked directly to your phone number so our rider can call you upon dispatch.',
      icon: '📞',
    },
    {
      step: '3',
      title: 'Safe Doorstep Handover',
      desc: 'When your delivery arrives, our rider calls you directly to hand over your sealed, chilled parfait pack.',
      icon: '🛵',
    },
    {
      step: '4',
      title: 'Verified Customer Review',
      desc: 'Rate your parfait bowl anytime using your phone number to share your authentic experience.',
      icon: '⭐',
    },
  ];

  return (
    <section id="delivery" className="py-16 lg:py-24 bg-[#FAF9F5] border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#173F2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Direct Phone Verification & Express Dispatch</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F2E] tracking-tight">
            How Fruity Nest Delivery Works
          </h2>
          <p className="text-[#5D7A68] text-sm sm:text-base mt-2">
            No confusion with codes. Every order is tied directly to your phone number so our dispatch rider can reach you immediately.
          </p>
        </div>

        {/* 4 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-white rounded-3xl p-6 border border-[#E9E4D8] shadow-xs hover:shadow-md transition-all flex flex-col items-start"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="w-7 h-7 rounded-full bg-[#EBF3ED] text-[#173F2E] text-xs font-bold flex items-center justify-center">
                  0{item.step}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#173F2E] mb-2">{item.title}</h3>
              <p className="text-xs text-[#5D7A68] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Phone Tracking Demonstration Box */}
        <div className="bg-[#173F2E] rounded-3xl p-6 sm:p-8 text-[#FAF7F0] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#23563F] border border-[#307052] flex items-center justify-center text-3xl shrink-0">
              📱
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#52B788]/20 text-[#A7D7BC] text-[11px] font-semibold mb-2">
                <Clock className="w-3 h-3 text-[#52B788]" />
                <span>Average Delivery: 30 - 45 Minutes</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Track your active order by phone number
              </h3>
              <p className="text-xs sm:text-sm text-[#D1DFD7] max-w-lg mt-1">
                Enter the phone number you used during checkout to check live kitchen status and rider dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenTrackOrder}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#FAF7F0] text-[#173F2E] font-bold text-xs sm:text-sm rounded-full hover:bg-white transition-colors cursor-pointer text-center"
            >
              Track Order Status
            </button>
            <button
              onClick={onOrderNow}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#52B788] text-[#0F2A1E] font-bold text-xs sm:text-sm rounded-full hover:bg-[#68C99D] transition-colors cursor-pointer text-center"
            >
              Order Now 🍓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
