import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, MessageSquarePlus, Sparkles } from 'lucide-react';
import { CustomerReview } from '../types';
import { LoadingButton } from './LoadingButton';

interface SlidingReviewsProps {
  reviews: CustomerReview[];
  onOpenReviewModal: () => void;
  onViewAllReviews?: () => void;
}

export const SlidingReviews: React.FC<SlidingReviewsProps> = ({
  reviews,
  onOpenReviewModal,
  onViewAllReviews,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = reviews.length;

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const activeReview = reviews[currentIndex] || reviews[0];

  if (!activeReview) return null;

  return (
    <section
      id="customer-reviews"
      className="py-14 sm:py-18 bg-[#FAF9F5] dark:bg-[#0c1811] border-t border-[#EAE4D5] dark:border-[#203b2c] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5ED] dark:bg-[#163324] text-[#173F2E] dark:text-[#52B788] text-xs font-semibold mb-2.5 border border-[#CFE4D7] dark:border-[#28553C]">
            <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
            <span>Customer Reviews</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F2E] dark:text-[#F0F8F3] tracking-tight">
            Loved by Yogurt Lovers
          </h2>
          <p className="text-xs sm:text-sm text-[#5C7867] dark:text-[#B4D7C3] mt-1.5">
            Verified dispatch reviews from happy parfait spoons across town.
          </p>
        </div>

        {/* Single Review Card Showcase (One at a time) */}
        <div className="relative max-w-2xl mx-auto">
          <div
            key={activeReview.id}
            className="bg-white dark:bg-[#13241b] rounded-3xl p-6 sm:p-9 border border-[#E5DFD1] dark:border-[#223c2e] shadow-lg relative transition-all duration-300 animate-in fade-in zoom-in-98 duration-300"
          >
            {/* Top Stars & Verified Status */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F4EFE6] dark:border-[#223c2e]">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < activeReview.rating
                        ? 'fill-[#F9A826] text-[#F9A826]'
                        : 'fill-gray-200 dark:fill-gray-700 text-gray-200 dark:text-gray-700'
                    }`}
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-[#173F2E] dark:text-[#F0F8F3]">
                  {activeReview.rating}.0
                </span>
              </div>

              {activeReview.verified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5ED] dark:bg-[#183927] text-[#1B4332] dark:text-[#68C99D] text-xs font-bold border border-[#C6E2CF] dark:border-[#2C593E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                  <span>Verified Buyer</span>
                </span>
              )}
            </div>

            {/* Parfait Name Tag */}
            <div className="text-xs font-bold text-[#2D6A4F] dark:text-[#52B788] uppercase tracking-wider mb-2.5">
              Ordered: {activeReview.parfaitName}
            </div>

            {/* Review Quote - High contrast, never dim */}
            <blockquote className="text-sm sm:text-base text-[#243E30] dark:text-[#F0F8F3] leading-relaxed italic mb-6 font-normal">
              &ldquo;{activeReview.comment}&rdquo;
            </blockquote>

            {/* Author Footer with location and date */}
            <div className="flex items-center justify-between pt-4 border-t border-[#F4EFE6] dark:border-[#223c2e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#173F2E] dark:bg-[#204E38] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {activeReview.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[#173F2E] dark:text-[#F0F8F3] text-sm">
                    {activeReview.customerName}
                  </div>
                  <div className="text-xs text-[#6F8E7C] dark:text-[#B4D7C3] flex items-center gap-2">
                    <span>{activeReview.location}</span>
                    <span className="inline-flex items-center text-[10px] text-[#2D6A4F] dark:text-[#52B788] font-semibold">
                      • Verified Parfait Spoon
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-xs text-[#8BA495] dark:text-[#B4D7C3] font-medium hidden sm:inline">
                {activeReview.date}
              </span>
            </div>
          </div>

          {/* Navigation Controls: Arrows & Indicators */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#162A1F] hover:bg-[#FAF9F5] dark:hover:bg-[#1F3D2E] text-[#173F2E] dark:text-[#F0F8F3] border border-[#D9D3C5] dark:border-[#2C4E39] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:border-[#173F2E]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="w-10 h-10 rounded-full bg-white dark:bg-[#162A1F] hover:bg-[#FAF9F5] dark:hover:bg-[#1F3D2E] text-[#173F2E] dark:text-[#F0F8F3] border border-[#D9D3C5] dark:border-[#2C4E39] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:border-[#173F2E]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs text-[#688574] dark:text-[#B4D7C3] font-medium ml-2">
                {currentIndex + 1} of {total}
              </span>
            </div>

            {/* Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === i
                      ? 'w-6 bg-[#173F2E] dark:bg-[#52B788]'
                      : 'w-2 bg-[#D1CBBD] dark:bg-[#2C4E39] hover:bg-[#173F2E]/40'
                  }`}
                />
              ))}
            </div>

            {/* Rate / Add Review Trigger */}
            <LoadingButton
              variant="outline"
              size="sm"
              onClick={onOpenReviewModal}
              icon={<MessageSquarePlus className="w-3.5 h-3.5 text-[#2D6A4F]" />}
              className="text-xs"
            >
              Rate Your Order
            </LoadingButton>
          </div>
        </div>
      </div>
    </section>
  );
};
