import React, { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Check, AlertCircle, MapPin, Loader2, Compass } from 'lucide-react';
import { CustomerReview, Order } from '../types';
import { PRODUCTS } from '../data/products';
import { saveNewReview } from '../data/reviews';
import { LoadingButton } from './LoadingButton';
import { detectDeviceLocation, POPULAR_LGAS } from '../utils/locationTracker';

interface VerifiedReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order | null;
  initialCode?: string;
  onReviewSubmitted: (newReview: CustomerReview) => void;
}

export const VerifiedReviewModal: React.FC<VerifiedReviewModalProps> = ({
  isOpen,
  onClose,
  order,
  initialCode = '',
  onReviewSubmitted,
}) => {
  if (!isOpen) return null;

  const [code, setCode] = useState(
    order?.dispatchCode || initialCode || ''
  );
  const [customerName, setCustomerName] = useState(order?.customer.fullName || '');
  const [location, setLocation] = useState(order?.customer.area || 'Uyo');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectStatus, setDetectStatus] = useState<string | null>(null);

  const [parfaitName, setParfaitName] = useState(
    order?.items[0]?.productName || PRODUCTS[0].name
  );
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-detect location on load if empty or default
  useEffect(() => {
    if (!order?.customer.area) {
      handleAutoTrackLocation(true);
    }
  }, []);

  const handleAutoTrackLocation = async (silent = false) => {
    setIsDetecting(true);
    if (!silent) setDetectStatus('Accessing device GPS / location...');
    try {
      const result = await detectDeviceLocation();
      setLocation(result.lga);
      setDetectStatus(`Auto-detected: ${result.lga} LGA`);
      setTimeout(() => setDetectStatus(null), 4000);
    } catch {
      if (!silent) setDetectStatus('Could not read location. You can select an LGA below.');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!location.trim()) {
      setErrorMessage('Please specify your Local Government or area (e.g. Uyo).');
      return;
    }
    if (!comment.trim() || comment.trim().length < 4) {
      setErrorMessage('Please write a brief review about your parfait experience.');
      return;
    }

    const isVerified = Boolean(code.trim() || order?.orderId);

    const review: CustomerReview = {
      id: `rev-${Date.now()}`,
      customerName: customerName.trim(),
      location: location.trim(),
      parfaitName,
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verified: isVerified,
      orderId: order?.orderId || (code.trim() ? code.trim() : undefined),
    };

    saveNewReview(review);
    onReviewSubmitted(review);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const topLGAs = ['Uyo', 'Itu', 'Uruan', 'Ibesikpo Asutan', 'Abak', 'Ikot Ekpene', 'Eket', 'Oron'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE4D5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EBF3ED] text-[#173F2E] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#173F2E]">
                Add Customer Review
              </h3>
              <span className="text-[11px] text-[#5C7767]">
                Share your parfait review & location
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D5] text-[#4A6454] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#EAF5ED] text-[#2D6A4F] flex items-center justify-center mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#173F2E] mb-1">
              Thank You for Your Review!
            </h3>
            <p className="text-xs text-[#5D7A68] max-w-xs">
              Your review from <strong>{location}</strong> has been published successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Customer Details: Name & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Fevo"
                  className="w-full px-3 py-2 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[#3C5848]">
                    Location (Local Government) *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAutoTrackLocation(false)}
                    disabled={isDetecting}
                    className="text-[10px] font-semibold text-[#173F2E] hover:text-[#2D6A4F] flex items-center gap-1 cursor-pointer"
                  >
                    {isDetecting ? (
                      <Loader2 className="w-3 h-3 animate-spin text-[#2D6A4F]" />
                    ) : (
                      <Compass className="w-3 h-3 text-[#2D6A4F]" />
                    )}
                    <span>{isDetecting ? 'Detecting...' : 'Auto-Track'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Uyo"
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                  />
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A4F] absolute left-2.5 top-2.5" />
                </div>
              </div>
            </div>

            {/* Auto-detect Status feedback if available */}
            {detectStatus && (
              <div className="text-[11px] text-[#2D6A4F] bg-[#EAF5ED] px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#CFE7D6]">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{detectStatus}</span>
              </div>
            )}

            {/* Quick LGA selection chips */}
            <div>
              <span className="text-[10px] font-bold text-[#5C7767] uppercase tracking-wider block mb-1.5">
                Popular Akwa Ibom Local Governments:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {topLGAs.map((lga) => (
                  <button
                    key={lga}
                    type="button"
                    onClick={() => setLocation(lga)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      location.toLowerCase() === lga.toLowerCase()
                        ? 'bg-[#173F2E] text-white shadow-xs'
                        : 'bg-[#F0EBE0] text-[#3D5646] hover:bg-[#E2DDD2]'
                    }`}
                  >
                    {lga}
                  </button>
                ))}
              </div>
            </div>

            {/* Parfait Item Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                Which Parfait did you enjoy?
              </label>
              <select
                value={parfaitName}
                onChange={(e) => setParfaitName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-semibold text-[#3C5848] mb-1.5">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    aria-label={`${star} star rating`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-[#F9A826] text-[#F9A826]'
                          : 'fill-[#E0DDD5] text-[#D0CBC0]'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#173F2E] ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience (e.g. parfait freshness, yogurt texture, delivery or pickup speed)..."
                className="w-full px-3 py-2 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
              />
            </div>

            {/* Optional Order ID / Phone for Verified Badge */}
            <div className="p-3 rounded-2xl bg-[#F6F4EE] border border-[#E4DDCF]">
              <label className="block text-xs font-semibold text-[#294B37] mb-0.5">
                Order ID or Phone Number (Optional)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. FN-8201 or 0802 345 6789 (Optional)"
                className="w-full px-3 py-1.5 rounded-lg border border-[#D2CABA] text-xs font-mono text-[#173F2E] bg-white focus:outline-none"
              />
              <span className="text-[10px] text-[#5D7A68] block mt-1">
                Enter your Order ID or phone number to receive the <strong>Verified Buyer</strong> badge on your review.
              </span>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <LoadingButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full py-3.5 font-bold rounded-full text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Submit Customer Review</span>
              </LoadingButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
