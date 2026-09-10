import React, { useEffect, useState } from 'react';
import { Check, Copy, ShieldCheck, Share2, Star, Clock, Bike, PhoneCall, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '../types';
import { LoadingButton } from './LoadingButton';

interface OrderSuccessModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewModal: (order: Order) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenReviewModal,
}) => {
  if (!isOpen || !order) return null;

  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#173F2E', '#52B788', '#F9A826', '#E63946'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const reviewLink = `${window.location.origin}#review?phone=${encodeURIComponent(order.customer.phone)}&orderId=${order.orderId}`;

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🌿 Fruity Nest Order Confirmed!\nOrder ID: ${order.orderId}\nPhone: ${order.customer.phone}\nDelivery Address: ${order.customer.address}, ${order.customer.area} LGA\nTotal: ₦${order.total.toLocaleString()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable container */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-6">
          {/* Brand header & success mark */}
          <div className="text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-[#EAF5ED] text-[#2D6A4F] flex items-center justify-center mb-3 shadow-xs border border-[#CDE6D6]">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F0] text-[#173F2E] text-xs font-semibold border border-[#E8E2D2] mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Order Received • #{order.orderId}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F2E] tracking-tight">
              Order Placed Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[#5C7867] max-w-sm mt-1">
              Your Greek yogurt parfaits are being freshly layered right now in our kitchen.
            </p>
          </div>

          {/* RIDER DISPATCH & PHONE CONTACT CARD */}
          <div className="bg-[#173F2E] text-[#FAF7F0] rounded-3xl p-6 text-center relative overflow-hidden shadow-lg border-2 border-[#2D6A4F]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D6A4F]/30 rounded-full blur-xl pointer-events-none" />

            <span className="text-[11px] font-bold uppercase tracking-widest text-[#52B788] block mb-1">
              Tracking & Dispatch Identification
            </span>

            {/* Prominent Order Number */}
            <div className="font-mono text-3xl sm:text-4xl font-extrabold tracking-widest text-white my-2 py-2 px-5 rounded-2xl bg-[#0F2A1E]/80 border border-[#2B5E47] inline-block">
              {order.orderId}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#D1DFD7] max-w-sm mx-auto mt-2">
              <PhoneCall className="w-4 h-4 text-[#52B788] shrink-0" />
              <span>
                Rider contact number: <strong className="text-white font-mono">{order.customer.phone}</strong>
              </span>
            </div>

            <p className="text-xs text-[#A3C7B3] max-w-xs mx-auto mt-1.5 leading-relaxed">
              Track this order anytime using your phone number <strong>{order.customer.phone}</strong>.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              <LoadingButton
                variant="unstyled"
                size="none"
                onClick={handleCopyOrderId}
                className="px-4 py-2 bg-white text-[#173F2E] hover:bg-[#F3EFE6] rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Copied ID!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Order ID</span>
                  </>
                )}
              </LoadingButton>

              <LoadingButton
                variant="unstyled"
                size="none"
                onClick={handleShareWhatsApp}
                className="px-4 py-2 bg-[#25D366] text-white hover:bg-[#20BE5A] rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Save to WhatsApp</span>
              </LoadingButton>
            </div>
          </div>

          {/* Live Dispatch Tracker Timeline */}
          <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl border border-[#E9E4D8]">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-[#173F2E]">
              <span className="flex items-center gap-1.5">
                <Bike className="w-4 h-4 text-[#2D6A4F]" />
                <span>Live Dispatch Status</span>
              </span>
              <span className="text-[#2D6A4F] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>ETA: 30 - 45 Mins</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs shrink-0">
                  ✓
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#173F2E] block">Order Received</span>
                  <span className="text-[#6D8777]">
                    {order.payment.method === 'bank_transfer'
                      ? 'Instant Bank Transfer verified'
                      : 'Payment on delivery selected'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F9A826] text-white flex items-center justify-center text-xs shrink-0 animate-pulse">
                  🥣
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#173F2E] block">
                    Kitchen Layering Fresh Ingredients
                  </span>
                  <span className="text-[#6D8777]">Crafting cold parfait cups & crisp toppings</span>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-60">
                <div className="w-6 h-6 rounded-full bg-[#DDD7C8] text-[#555] flex items-center justify-center text-xs shrink-0">
                  🛵
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#173F2E] block">Rider Dispatch & Call</span>
                  <span className="text-[#6D8777]">Rider calls {order.customer.phone} on arrival</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recipient summary */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] text-xs text-[#3C5848] space-y-1">
            <div className="flex justify-between font-bold text-[#173F2E]">
              <span>Customer Name:</span>
              <span>{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between text-[#5C7867]">
              <span>Phone (Dispatch Call):</span>
              <span className="font-mono font-bold text-[#173F2E]">{order.customer.phone}</span>
            </div>
            <p className="text-[#6D8777] pt-1">
              {order.customer.address}, {order.customer.area} LGA
            </p>
            <div className="pt-2 border-t border-[#F2EDE2] flex justify-between font-serif font-bold text-sm text-[#173F2E]">
              <span>Total Amount:</span>
              <span>₦{order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* VERIFIED REVIEW SYSTEM BANNER */}
          <div className="p-5 rounded-3xl bg-[#FFF9E6] border border-[#FFE082] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#946200] mb-1">
                <Star className="w-4 h-4 fill-[#F9A826] text-[#F9A826]" />
                <span>CUSTOMER REVIEW INVITATION</span>
              </div>
              <p className="text-xs text-[#6B5018] leading-relaxed">
                Rate your Greek yogurt parfait bowl right now or share your feedback with the Fruity Nest community.
              </p>
            </div>

            <LoadingButton
              variant="unstyled"
              size="none"
              onClick={() => onOpenReviewModal(order)}
              className="whitespace-nowrap px-5 py-2.5 bg-[#173F2E] hover:bg-[#23563F] text-white rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              ⭐ Rate Your Order
            </LoadingButton>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D5] bg-[#FAF9F5] flex items-center justify-between gap-3">
          <button
            onClick={handleCopyReviewLink}
            className="text-xs text-[#3C5848] hover:text-[#173F2E] font-medium underline underline-offset-2 cursor-pointer"
          >
            {copiedLink ? 'Review Link Copied!' : 'Copy Review Link'}
          </button>

          <LoadingButton
            variant="unstyled"
            size="none"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#173F2E] text-white font-bold text-xs sm:text-sm rounded-full hover:bg-[#23563F] transition-colors cursor-pointer"
          >
            Done & Return Home
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};
