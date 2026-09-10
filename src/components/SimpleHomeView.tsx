import React from 'react';
import { Star, ArrowRight, ShieldCheck, Plus, Sparkles, Hash } from 'lucide-react';
import { ParfaitProduct, CustomerReview } from '../types';
import { BrandLogo } from './BrandLogo';
import { SlidingReviews } from './SlidingReviews';
import { LoadingButton } from './LoadingButton';
import heroParfaitImg from '../assets/images/Homepage.jpg';
import mangoBlissImg from '../assets/images/mango_bliss_1788947639820.jpg';

interface SimpleHomeViewProps {
  sampleProducts?: ParfaitProduct[];
  sampleProduct?: ParfaitProduct;
  reviews: CustomerReview[];
  onOrderNow: (product: ParfaitProduct) => void;
  onQuickAdd: (product: ParfaitProduct) => void;
  onExploreMenu: () => void;
  onOpenReviewModal: () => void;
  onViewAllReviews: () => void;
}

export const SimpleHomeView: React.FC<SimpleHomeViewProps> = ({
  sampleProducts = [],
  sampleProduct,
  reviews,
  onOrderNow,
  onQuickAdd,
  onExploreMenu,
  onOpenReviewModal,
  onViewAllReviews,
}) => {
  // Guarantee two products for the sample showcase
  const prod1: ParfaitProduct = {
    ...(sampleProducts[0] || sampleProduct || {
      id: 'classic-fruity-nest',
      name: 'Classic Fruity Nest',
      subtitle: 'Strawberries, Blueberries, Kiwi & Honey Granola',
      basePrice: 4500,
      rating: 5.0,
      reviewCount: 148,
      category: 'bestsellers',
      badge: 'Signature',
      ingredients: ['Greek Yogurt', 'Strawberries', 'Blueberries', 'Kiwi', 'Granola', 'Honey'],
      calories: '380 kcal',
    }),
    image: heroParfaitImg,
  };

  const prod2: ParfaitProduct = sampleProducts[1] || {
    id: 'mango-bliss',
    name: 'Mango Bliss',
    subtitle: 'Sun-ripened Mango Chunks & Toasted Coconut',
    basePrice: 4000,
    rating: 4.9,
    reviewCount: 92,
    category: 'tropical',
    badge: 'Customer Favorite',
    image: mangoBlissImg,
    description: '',
    ingredients: ['Greek Yogurt', 'Ripe Mangoes', 'Toasted Coconut', 'Granola', 'Honey'],
    calories: '350 kcal',
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen">
      {/* 1. Hero Section: Exactly matching User Image 1 */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[#E8F1EC]/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle, Buttons, Trust Proof */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              {/* Category Pill without # */}
              <div className="inline-flex items-center gap-1.5 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-[#EAF2EC] text-[#1E4834] text-xs font-semibold tracking-wide border border-[#CCE2D3] mb-5 sm:mb-6">
                <span className="uppercase text-[11px] font-bold tracking-wider">
                  Greek Yogurt • Fresh Fruits • Crunchy Granola
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#173F2E] tracking-tight leading-[1.12] mb-4 sm:mb-5 text-center lg:text-left">
                Fruty Nest<br />
                <span className="italic font-normal text-[#22573F]">Happy Moments.</span>
              </h1>

              {/* Subtitle with italic text and nested motto */}
              <div className="text-sm sm:text-base text-[#4D6959] max-w-xl leading-relaxed mb-6 sm:mb-8 font-normal text-center lg:text-left mx-auto lg:mx-0">
                <p className="italic">
                  &ldquo;Premium Greek yogurt, fresh fruits and crunchy granola — layered into every satisfying spoonful. Handcrafted daily with zero preservatives.&rdquo;
                </p>
                <p className="not-italic font-bold text-[#173F2E] mt-2">
                  Where all your cravings are nested!
                </p>
              </div>

              {/* PC ONLY: Buttons (Order Now & Explore Our Parfaits) */}
              <div className="hidden lg:flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <LoadingButton
                  variant="primary"
                  size="lg"
                  onClick={() => onOrderNow(prod1)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="text-sm font-bold px-7 py-3.5 shadow-md hover:shadow-lg"
                >
                  Order Now
                </LoadingButton>

                <LoadingButton
                  variant="outline"
                  size="lg"
                  onClick={onExploreMenu}
                  className="text-sm font-bold px-6 py-3.5 bg-white hover:bg-[#F3EFE6] border-[#D1CBBD]"
                >
                  Explore Our Parfaits
                </LoadingButton>
              </div>

              {/* PC ONLY: Trust & Social Proof Bar */}
              <div className="hidden lg:flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-[#EAE4D5]/80">
                {/* 4 Avatar Badges */}
                <div className="flex items-center -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#D5E6D8] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#173F2E]">
                    AO
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FCE3D8] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#8A4A28]">
                    CO
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#E0E8ED] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#2A4B63]">
                    NE
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FFE7CE] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#8C5819]">
                    TA
                  </div>
                </div>

                {/* Stars and Dispatch Counter */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    ))}
                  </div>
                  <div className="text-xs text-[#4E6B5B] font-medium">
                    <strong className="text-[#173F2E] font-bold">4.9 / 5.0</strong>
                    <span className="mx-1.5 opacity-60">•</span>
                    <span>Over 2,800+ fresh parfaits dispatched</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Parfait Showcase (No border, feathered opacity fade on top, sides, bottom, and angles) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square flex items-center justify-center group">
                {/* Soft ambient atmospheric glow behind the fading image */}
                <div className="absolute inset-2 sm:inset-4 bg-gradient-to-tr from-[#E2EFE7]/80 via-[#F5EEDD]/60 to-[#E0F0E6]/50 rounded-full blur-2xl pointer-events-none -z-10" />

                {/* Display image with feathered opacity fade on all edges and angles merging with background */}
                <div
                  className="w-full h-full relative overflow-hidden flex items-center justify-center"
                  style={{
                    maskImage:
                      'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 20%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.1) 85%, transparent 95%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 48% 48% at 50% 50%, #000000 20%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.45) 65%, rgba(0, 0, 0, 0.1) 85%, transparent 95%)',
                  }}
                >
                  <img
                    src={prod1.image}
                    alt="Fresh Fruity Nest Parfaits ready for order"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                  />
                </div>

                {/* Top-Left: "• Made Fresh Daily" Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-[#ECE7DA] flex items-center gap-1.5 text-xs font-bold text-[#173F2E] pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#38B000] animate-pulse" />
                  <span>Made Fresh Daily</span>
                </div>

                {/* Bottom-Right: "100% Greek Yogurt" Badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 bg-[#173F2E]/95 backdrop-blur-md text-[#FAF7F0] px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-semibold border border-[#2D5A43] pointer-events-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
                  <span>100% Greek Yogurt</span>
                </div>
              </div>

              {/* MOBILE ONLY: The two buttons placed directly under the image in the same container! */}
              <div className="w-full max-w-md mt-4 sm:mt-5 flex items-center gap-2.5 sm:gap-3 lg:hidden">
                <LoadingButton
                  variant="primary"
                  size="lg"
                  onClick={() => onOrderNow(prod1)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="flex-1 text-xs sm:text-sm font-bold py-3.5 px-3 shadow-md justify-center text-center whitespace-nowrap"
                >
                  Order Now
                </LoadingButton>

                <LoadingButton
                  variant="outline"
                  size="lg"
                  onClick={onExploreMenu}
                  className="flex-1 text-xs sm:text-sm font-bold py-3.5 px-2.5 bg-white hover:bg-[#F3EFE6] border-[#D1CBBD] justify-center text-center whitespace-nowrap"
                >
                  Explore Our Parfaits
                </LoadingButton>
              </div>

              {/* MOBILE ONLY: Trust & Social Proof Bar directly below the action buttons */}
              <div className="w-full max-w-md mt-4 pt-3.5 border-t border-[#EAE4D5]/80 flex flex-col items-center justify-center gap-2 lg:hidden text-center">
                <div className="flex items-center -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#D5E6D8] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#173F2E]">
                    AO
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FCE3D8] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#8A4A28]">
                    CO
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#E0E8ED] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#2A4B63]">
                    NE
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FFE7CE] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#8C5819]">
                    TA
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#4E6B5B] font-medium">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                    ))}
                  </div>
                  <strong className="text-[#173F2E] font-bold">4.9 / 5.0</strong>
                  <span className="mx-1 opacity-60">•</span>
                  <span>2,800+ fresh dispatches</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Two Product Samples Section: Side-by-side on mobile & View All Products */}
      <section className="py-8 sm:py-14 bg-[#FAF9F5] dark:bg-[#0c1811] border-t border-[#EAE4D5] dark:border-[#203b2c]">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 max-w-2xl md:max-w-3xl mx-auto">
            
            {/* Card 1: Classic Fruity Nest */}
            <div className="bg-white dark:bg-[#13241b] rounded-2xl sm:rounded-[28px] overflow-hidden border border-[#E5DFD1] dark:border-[#223c2e] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              {/* Product Visual */}
              <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden bg-[#FAF7F0] dark:bg-[#192d22]">
                <img
                  src={prod1.image}
                  alt={prod1.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top-Left Pill: "Signature" */}
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-10 bg-[#173F2E] text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs">
                  {prod1.badge || 'Signature'}
                </div>
              </div>

              {/* Card Body: Ratings, Title, Subtitle, Pricing & Add to Cart */}
              <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F9A826] text-[#F9A826]" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#173F2E] dark:text-[#EAF4EE] ml-0.5">
                      {prod1.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#7B9585] dark:text-[#A3C7B3]">
                      ({prod1.reviewCount})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-sm sm:text-xl md:text-2xl font-bold text-[#173F2E] dark:text-[#EAF4EE] mb-1 sm:mb-1.5 line-clamp-1 sm:line-clamp-none">
                    {prod1.name}
                  </h3>

                  {/* Subtitle / Key Ingredients */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-[#5D7A68] dark:text-[#B4D7C3] leading-tight sm:leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                    {prod1.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Starting From Price & Add to Cart Button */}
                <div className="pt-2.5 sm:pt-4 border-t border-[#F2EDE2] dark:border-[#223c2e] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#7E9687] dark:text-[#A3C7B3]">
                      Starting From
                    </span>
                    <span className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#173F2E] dark:text-[#EAF4EE]">
                      ₦{prod1.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <LoadingButton
                    variant="primary"
                    size="sm"
                    onClick={() => onQuickAdd(prod1)}
                    icon={<Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    className="w-full sm:w-auto text-[10px] sm:text-xs font-bold px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full justify-center"
                  >
                    Add to Cart
                  </LoadingButton>
                </div>
              </div>
            </div>

            {/* Card 2: Mango Bliss */}
            <div className="bg-white dark:bg-[#13241b] rounded-2xl sm:rounded-[28px] overflow-hidden border border-[#E5DFD1] dark:border-[#223c2e] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
              {/* Product Visual */}
              <div className="relative aspect-square sm:aspect-4/3 w-full overflow-hidden bg-[#FAF7F0] dark:bg-[#192d22]">
                <img
                  src={prod2.image}
                  alt={prod2.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Top-Left Pill: "Customer Favorite" */}
                <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5 z-10 bg-[#173F2E] text-white text-[9px] sm:text-[11px] font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-xs">
                  {prod2.badge || 'Customer Favorite'}
                </div>
              </div>

              {/* Card Body: Ratings, Title, Subtitle, Pricing & Add to Cart */}
              <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#F9A826] text-[#F9A826]" />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-[#173F2E] dark:text-[#EAF4EE] ml-0.5">
                      {prod2.rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-[#7B9585] dark:text-[#A3C7B3]">
                      ({prod2.reviewCount})
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-sm sm:text-xl md:text-2xl font-bold text-[#173F2E] dark:text-[#EAF4EE] mb-1 sm:mb-1.5 line-clamp-1 sm:line-clamp-none">
                    {prod2.name}
                  </h3>

                  {/* Subtitle / Key Ingredients */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-[#5D7A68] dark:text-[#B4D7C3] leading-tight sm:leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                    {prod2.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Starting From Price & Add to Cart Button */}
                <div className="pt-2.5 sm:pt-4 border-t border-[#F2EDE2] dark:border-[#223c2e] flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#7E9687] dark:text-[#A3C7B3]">
                      Starting From
                    </span>
                    <span className="font-serif text-base sm:text-xl md:text-2xl font-bold text-[#173F2E] dark:text-[#EAF4EE]">
                      ₦{prod2.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <LoadingButton
                    variant="primary"
                    size="sm"
                    onClick={() => onQuickAdd(prod2)}
                    icon={<Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    className="w-full sm:w-auto text-[10px] sm:text-xs font-bold px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-full justify-center"
                  >
                    Add to Cart
                  </LoadingButton>
                </div>
              </div>
            </div>

          </div>

          {/* View All Products Button under the two sample products */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <LoadingButton
              variant="outline"
              size="lg"
              onClick={onExploreMenu}
              icon={<ArrowRight className="w-4 h-4" />}
              className="text-xs sm:text-sm font-bold px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border-2 border-[#173F2E] text-[#173F2E] hover:bg-[#173F2E] hover:text-white dark:border-[#52B788] dark:text-[#EAF4EE] dark:hover:bg-[#235840] shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span>View All Products</span>
            </LoadingButton>
          </div>

        </div>
      </section>

      {/* 3. Customer Reviews Section: Immediately following the Product Samples */}
      <SlidingReviews
        reviews={reviews}
        onOpenReviewModal={onOpenReviewModal}
        onViewAllReviews={onViewAllReviews}
      />
    </div>
  );
};
