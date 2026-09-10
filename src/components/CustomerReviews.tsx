import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  MessageSquarePlus,
  Sparkles,
  MapPin,
  Compass,
  Loader2,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { CustomerReview } from '../types';
import { PRODUCTS } from '../data/products';
import { saveNewReview } from '../data/reviews';
import { detectDeviceLocation } from '../utils/locationTracker';
import { LoadingButton } from './LoadingButton';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  onOpenReviewModal: () => void;
  onAddReview?: (newReview: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onOpenReviewModal,
  onAddReview,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'verified'>('all');
  const [selectedLgaFilter, setSelectedLgaFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('Uyo');
  const [formRating, setFormRating] = useState(5);
  const [formParfait, setFormParfait] = useState(PRODUCTS[0].name);
  const [formComment, setFormComment] = useState('');
  const [formCode, setFormCode] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const topLGAs = ['Uyo', 'Itu', 'Uruan', 'Ibesikpo Asutan', 'Abak', 'Ikot Ekpene', 'Eket', 'Oron'];

  // Handle auto-detecting device location
  const handleAutoTrackLocation = async () => {
    setIsDetecting(true);
    setDetectStatus('Tracking device location...');
    try {
      const result = await detectDeviceLocation();
      setFormLocation(result.lga);
      setDetectStatus(`Auto-detected: ${result.lga} LGA`);
      setTimeout(() => setDetectStatus(null), 4000);
    } catch {
      setDetectStatus('Location unavailable. Tap an LGA below.');
      setTimeout(() => setDetectStatus(null), 3000);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) {
      setFormError('Please enter your name (e.g. Fevo).');
      return;
    }
    if (!formLocation.trim()) {
      setFormError('Please specify your location/Local Government (e.g. Uyo).');
      return;
    }
    if (!formComment.trim() || formComment.trim().length < 4) {
      setFormError('Please write a brief comment about your parfait experience.');
      return;
    }

    const isVerified = Boolean(formCode.trim());
    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: formName.trim(),
      location: formLocation.trim(),
      parfaitName: formParfait,
      rating: formRating,
      date: 'Just now',
      comment: formComment.trim(),
      verified: isVerified,
      orderId: formCode.trim() || undefined,
    };

    saveNewReview(newReview);
    if (onAddReview) {
      onAddReview(newReview);
    }

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsFormOpen(false);
      setFormComment('');
      setFormCode('');
    }, 1800);
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'verified' && !r.verified) return false;
    if (selectedLgaFilter !== 'all') {
      const revLoc = (r.location || '').toLowerCase();
      if (!revLoc.includes(selectedLgaFilter.toLowerCase())) return false;
    }
    return true;
  });

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.9';

  return (
    <section id="reviews" className="py-10 sm:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2D6A4F] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Feedback & Locations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F2E] tracking-tight">
              Customer Reviews ⭐
            </h2>
            <p className="text-[#5D7A68] text-sm sm:text-base mt-1">
              Read authentic reviews and ratings from parfait lovers across Uyo and surrounding Local Governments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle inline review form */}
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-2.5 bg-[#173F2E] hover:bg-[#23563F] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isFormOpen ? 'Close Review Form' : 'Write a Customer Review'}</span>
              {isFormOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Inline Review Submission Card (Accordion) */}
        {isFormOpen && (
          <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-[#DFD8C8] shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#EAE4D5]">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#173F2E]">
                    Add Your Customer Review
                  </h3>
                  <p className="text-xs text-[#5D7A68] mt-0.5">
                    Your location can be auto-tracked with your device GPS or selected from Local Governments below.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs text-[#7A9584] hover:text-[#173F2E] cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {formSuccess ? (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#EAF5ED] text-[#2D6A4F] flex items-center justify-center mb-3">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#173F2E]">
                    Thank You, {formName}!
                  </h4>
                  <p className="text-xs text-[#5D7A68] mt-1">
                    Your review for <strong>{formParfait}</strong> in <strong>{formLocation}</strong> has been added.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Customer Name & Location (Local Government) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                        Customer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Fevo"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-[#3C5848]">
                          Location (Local Government) *
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoTrackLocation}
                          disabled={isDetecting}
                          className="text-[11px] font-semibold text-[#173F2E] hover:text-[#2D6A4F] flex items-center gap-1 cursor-pointer"
                        >
                          {isDetecting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2D6A4F]" />
                          ) : (
                            <Compass className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          )}
                          <span>{isDetecting ? 'Detecting...' : '📍 Auto-Track Device'}</span>
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Uyo"
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                        />
                        <MapPin className="w-3.5 h-3.5 text-[#2D6A4F] absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>

                  {/* Auto-detect Status */}
                  {detectStatus && (
                    <div className="text-[11px] text-[#2D6A4F] bg-[#EAF5ED] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#CFE7D6]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{detectStatus}</span>
                    </div>
                  )}

                  {/* Quick LGA selection chips */}
                  <div>
                    <span className="text-[10px] font-bold text-[#5C7767] uppercase tracking-wider block mb-1.5">
                      Select Local Government:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topLGAs.map((lga) => (
                        <button
                          key={lga}
                          type="button"
                          onClick={() => setFormLocation(lga)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            formLocation.toLowerCase() === lga.toLowerCase()
                              ? 'bg-[#173F2E] text-white shadow-xs'
                              : 'bg-[#F0EBE0] text-[#3D5646] hover:bg-[#E2DDD2]'
                          }`}
                        >
                          {lga}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parfait Selection & Rating */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                        Which Parfait did you enjoy?
                      </label>
                      <select
                        value={formParfait}
                        onChange={(e) => setFormParfait(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none"
                      >
                        {PRODUCTS.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3C5848] mb-1.5">
                        Your Rating
                      </label>
                      <div className="flex items-center gap-1.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormRating(star)}
                            className="p-0.5 cursor-pointer hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= formRating
                                  ? 'fill-[#F9A826] text-[#F9A826]'
                                  : 'fill-[#E0DDD5] text-[#D0CBC0]'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-[#173F2E] ml-2">
                          {formRating} of 5 Stars
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="e.g. Delicious parfait! The Greek yogurt was thick, cold, and fresh with rich fruit crunch..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                    />
                  </div>

                  {/* Optional Order ID or Phone */}
                  <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E5DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#4A6755]">
                      <span className="font-semibold block text-[#173F2E]">Order ID or Phone (Optional)</span>
                      Placed an order? Enter your Order ID or phone to get the <strong>Verified Buyer</strong> badge.
                    </div>
                    <input
                      type="text"
                      value={formCode}
                      onChange={(e) => setFormCode(e.target.value)}
                      placeholder="e.g. FN-8201 or 0802..."
                      className="w-full sm:w-44 px-3 py-1.5 rounded-lg border border-[#D0C7B5] text-xs font-mono bg-white text-[#173F2E]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <LoadingButton
                      type="submit"
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto px-8 py-3 font-bold rounded-full text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Publish Customer Review</span>
                    </LoadingButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Rating Overview & Filter Bar */}
        <div className="bg-[#F3EFE6] rounded-3xl p-6 sm:p-8 mb-8 border border-[#E6E0D2] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="text-center sm:text-left">
              <span className="font-serif text-5xl font-bold text-[#173F2E] leading-none">
                {avgRating}
              </span>
              <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F9A826] text-[#F9A826]" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-[#D9D2C3] hidden sm:block" />
            <div>
              <h4 className="text-base font-bold text-[#173F2E]">
                Local Government Verified Feedback
              </h4>
              <p className="text-xs sm:text-sm text-[#5D7A68]">
                Real reviews from customers across Uyo and local government areas in Akwa Ibom State.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#173F2E] text-white'
                  : 'bg-white text-[#173F2E] border border-[#DDD6C7]'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setSelectedFilter('verified')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                selectedFilter === 'verified'
                  ? 'bg-[#173F2E] text-white'
                  : 'bg-white text-[#173F2E] border border-[#DDD6C7]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Verified Only</span>
            </button>
          </div>
        </div>

        {/* Local Government Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5A7363] mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by LGA:</span>
          </div>
          <button
            onClick={() => setSelectedLgaFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              selectedLgaFilter === 'all'
                ? 'bg-[#173F2E] text-white'
                : 'bg-white text-[#4A6454] border border-[#DCD6C7] hover:bg-[#F2EDE1]'
            }`}
          >
            All Areas
          </button>
          {topLGAs.map((lga) => {
            const count = reviews.filter((r) =>
              (r.location || '').toLowerCase().includes(lga.toLowerCase())
            ).length;
            if (count === 0 && selectedLgaFilter !== lga) return null;
            return (
              <button
                key={lga}
                onClick={() => setSelectedLgaFilter(selectedLgaFilter === lga ? 'all' : lga)}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer flex items-center gap-1 transition-all ${
                  selectedLgaFilter === lga
                    ? 'bg-[#173F2E] text-white shadow-xs'
                    : 'bg-white text-[#4A6454] border border-[#DCD6C7] hover:bg-[#F2EDE1]'
                }`}
              >
                <MapPin className="w-3 h-3 text-[#2D6A4F]" />
                <span>{lga}</span>
                {count > 0 && <span className="opacity-70 text-[10px]">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E9E4D8]">
            <MapPin className="w-8 h-8 text-[#8BA494] mx-auto mb-2 opacity-50" />
            <h4 className="text-base font-bold text-[#173F2E]">No reviews found for this filter</h4>
            <p className="text-xs text-[#5D7A68] mt-1">
              Be the first to share your review from this location!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="mt-4 px-4 py-2 bg-[#173F2E] text-white text-xs font-semibold rounded-full cursor-pointer hover:bg-[#23563F]"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-[#13241b] rounded-2xl p-6 border border-[#E9E4D8] dark:border-[#223c2e] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Stars and date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F9A826] text-[#F9A826]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#8BA494] dark:text-[#A3C7B3]">{review.date}</span>
                  </div>

                  {/* Parfait ordered pill */}
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#F2EFE8] dark:bg-[#1C3627] text-[#173F2E] dark:text-[#52B788] text-xs font-medium mb-3">
                    {review.parfaitName}
                  </span>

                  {/* Review comment */}
                  <p className="text-[#364F40] dark:text-[#F0F8F3] text-sm leading-relaxed mb-4 italic font-normal">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                {/* Author and location based on local government */}
                <div className="pt-4 border-t border-[#F2ECE1] dark:border-[#223c2e] flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#173F2E] dark:text-[#F0F8F3]">{review.customerName}</h4>
                    {review.location && (
                      <span className="text-[11px] text-[#527760] dark:text-[#B4D7C3] font-medium flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#2D6A4F] dark:text-[#52B788] shrink-0" />
                        <span>{review.location.includes('LGA') ? review.location : `${review.location} LGA`}</span>
                      </span>
                    )}
                  </div>

                  {review.verified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EBF5EE] dark:bg-[#183927] text-[#1B4332] dark:text-[#68C99D] text-[11px] font-semibold border border-[#CFE7D6] dark:border-[#2C593E]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                      <span>Verified Buyer</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF5EB] dark:bg-[#252216] text-[#7A5B1C] dark:text-[#F8D580] text-[10px] font-medium border border-[#EADBBD] dark:border-[#4B3C1D]">
                      <span>Customer Review</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
