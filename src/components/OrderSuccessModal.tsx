import React, { useEffect, useState } from 'react';
import { Check, Share2, Star, Clock, Bike, PhoneCall } from 'lucide-react';
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

  const reviewLink = `${window.location.origin}#review?phone=${encodeURIComponent(order.customer.phone)}`;

  const handleCopyReviewLink = () => {
    navigator.clipboard.writeText(reviewLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🌿 Fruity Nest Order Placed Successfully!\nName: ${order.customer.fullName}\nContact number: ${order.customer.phone}\nLocation: ${order.customer.address}, ${order.customer.area}\nTotal: ₦${order.total.toLocaleString()}`;
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
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173F2E] tracking-tight">
              Order placed successfully.
            </h2>
            <p className="text-sm sm:text-base text-[#2E5A44] max-w-md mx-auto mt-2 font-medium leading-relaxed">
              Your order has been received successfully, the dispatch rider will contact you shortly!
            </p>
          </div>

          {/* Primary Order Details Card: Name, Contact number, Location */}
          <div className="bg-[#FAF9F5] rounded-3xl p-5 sm:p-6 border border-[#E2DBD0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E1D4]">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#173F2E]">
                Order Details
              </h3>
              <span className="px-3 py-1 rounded-full bg-[#EAF4EE] text-[#1E4B34] text-xs font-bold border border-[#CCE3D4]">
                {order.payment.method === 'bank_transfer' ? 'Bank Transfer Confirmed' : 'Payment on Delivery'}
              </span>
            </div>

            {/* Direct Customer & Dispatch Contact Information */}
            <div className="bg-white rounded-2xl p-4 border border-[#ECE5D8] space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-[#F5EFE6]">
                <span className="text-[#688373] font-medium">Name:</span>
                <span className="font-bold text-[#173F2E]">{order.customer.fullName}</span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-[#F5EFE6]">
                <span className="text-[#688373] font-medium">Contact number:</span>
                <span className="font-mono font-bold text-[#173F2E] text-sm sm:text-base">
                  {order.customer.phone}
                </span>
              </div>

              <div className="flex items-start justify-between text-xs sm:text-sm py-1 border-b border-[#F5EFE6]">
                <span className="text-[#688373] font-medium shrink-0 mr-4">Location:</span>
                <span className="font-bold text-[#173F2E] text-right">
                  {order.customer.address}, {order.customer.area}
                </span>
              </div>

              {order.customer.deliveryNotes && (
                <div className="flex items-start justify-between text-xs py-1">
                  <span className="text-[#688373] font-medium shrink-0 mr-4">Delivery Note:</span>
                  <span className="text-[#173F2E] text-right italic font-medium">
                    {order.customer.deliveryNotes}
                  </span>
                </div>
              )}
            </div>

            {/* Items Ordered */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#63806E] block">
                Items Ordered ({order.items.length})
              </span>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs bg-white p-3 rounded-xl border border-[#ECE5D8]"
                  >
                    <div>
                      <span className="font-bold text-[#173F2E]">
                        {item.quantity}x {item.productName}
                      </span>
                      <span className="text-[11px] text-[#6D8777] block">
                        {item.size.name} • {item.yogurtType}
                      </span>
                    </div>
                    <span className="font-bold text-[#173F2E]">₦{item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Amount & WhatsApp Action */}
            <div className="pt-3 border-t border-[#E7E1D4] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#6D8777] uppercase font-semibold block">Total Amount</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#173F2E]">
                  ₦{order.total.toLocaleString()}
                </span>
              </div>
              <LoadingButton
                variant="unstyled"
                size="none"
                onClick={handleShareWhatsApp}
                className="px-4 py-2 bg-[#25D366] text-white hover:bg-[#20BE5A] rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share on WhatsApp</span>
              </LoadingButton>
            </div>
          </div>

          {/* Tracking Callout: Tied strictly to phone number */}
          <div className="p-4 rounded-2xl bg-[#EAF5ED] border border-[#CCE3D4] flex items-center gap-3 text-xs text-[#173F2E]">
            <div className="w-8 h-8 rounded-full bg-[#173F2E] text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-4 h-4 text-[#52B788]" />
            </div>
            <div>
              <span className="font-bold block">Tied to Customer Phone Number</span>
              <p className="text-[#325A44] mt-0.5 leading-relaxed">
                Your dispatch tracking is tied directly to <strong className="font-mono font-bold text-[#173F2E]">{order.customer.phone}</strong>. Our rider will call this number directly before doorstep arrival.
              </p>
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
