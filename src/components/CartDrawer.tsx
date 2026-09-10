import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, KeyRound, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { LoadingButton } from './LoadingButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  userEmail?: string | null;
  onOpenLogin?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  userEmail,
  onOpenLogin,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const FREE_DELIVERY_THRESHOLD = 15000;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 1500;
  const total = subtotal + deliveryFee;
  const progressPercent = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE4D5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#173F2E]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#173F2E]">
              Your Fresh Basket ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F0EBE1] text-[#4A6454] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#F2ECE0] px-4 py-2.5 border-b border-[#E5DFD1]">
          <div className="flex items-center justify-between text-xs font-medium text-[#173F2E] mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
              {isFreeDelivery ? (
                <span className="font-bold text-[#2D6A4F]">Unlocked Free Delivery!</span>
              ) : (
                <span>
                  Add <strong>₦{(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()}</strong> for Free Delivery
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#6E8777] font-semibold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#DDD6C5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2D6A4F] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#EBF3ED] text-[#173F2E] flex items-center justify-center text-3xl mb-4">
                🥣
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173F2E] mb-1">
                Your basket is empty
              </h3>
              <p className="text-xs text-[#5D7A68] max-w-xs mb-6">
                Discover our signature handcrafted parfaits made fresh daily with rich Greek yogurt and crisp granola.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#173F2E] text-white rounded-full text-xs font-semibold hover:bg-[#23563F] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl p-3.5 border border-[#E9E4D8] shadow-xs flex gap-3.5"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F2ECE1] shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-[#173F2E] leading-tight">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#99A69D] hover:text-[#DC2626] transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#5C7767] mt-0.5 space-y-0.5">
                      <p>
                        Size: <span className="font-medium text-[#173F2E]">{item.size.name} ({item.size.volume})</span>
                      </p>
                      <p className="line-clamp-1">Base: {item.yogurtType}</p>
                      {item.toppings.length > 0 && (
                        <p className="text-[10px] text-[#2D6A4F] line-clamp-1 font-medium">
                          + {item.toppings.map((t) => t.name).join(', ')}
                        </p>
                      )}
                      {item.specialNotes && (
                        <p className="italic text-[10px] text-[#7A9383] line-clamp-1">
                          &ldquo;{item.specialNotes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EDE2]">
                    <span className="font-serif text-sm font-bold text-[#173F2E]">
                      ₦{item.totalPrice.toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF7F0] border border-[#DDD6C7] rounded-full px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#173F2E] hover:bg-[#EAE4D5] rounded-full transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#173F2E] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#173F2E] hover:bg-[#EAE4D5] rounded-full transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals and Guest Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#EAE4D5] bg-white space-y-3">
            {/* Cost Breakdown */}
            <div className="space-y-1.5 text-xs text-[#4A6454]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#173F2E]">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#2D6A4F] font-bold">FREE</span>
                  ) : (
                    <span className="font-semibold text-[#173F2E]">₦{deliveryFee.toLocaleString()}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE4D5] text-sm">
                <span className="font-bold text-[#173F2E]">Total Amount</span>
                <span className="font-serif text-lg font-bold text-[#173F2E]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Email OTP Login & History banner */}
            {userEmail ? (
              <div className="p-2.5 rounded-xl bg-[#EAF5EE] border border-[#CFE6D7] flex items-center justify-between text-xs text-[#173F2E]">
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <span className="text-[11px] truncate">
                    Logged in: <strong>{userEmail}</strong>
                  </span>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={onOpenLogin}
                    className="text-[11px] font-bold text-[#2D6A4F] hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    View Orders
                  </button>
                )}
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-[#FAF6EC] border border-[#E9DFCB] flex items-center justify-between text-xs text-[#173F2E]">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#B46A14] shrink-0" />
                  <span className="text-[11px] text-[#635338]">Save past orders with your email</span>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={onOpenLogin}
                    className="text-[11px] font-bold text-[#173F2E] bg-white hover:bg-[#F2ECE0] border border-[#DCD3C1] px-2.5 py-1 rounded-lg cursor-pointer shadow-2xs"
                  >
                    Log In (OTP)
                  </button>
                )}
              </div>
            )}

            {/* Guest Checkout Notice */}
            <div className="p-2.5 rounded-xl bg-[#F2F8F4] border border-[#CFE4D7] flex items-center gap-2 text-[11px] text-[#1B4332]">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>
                <strong>Instant Guest Checkout</strong> — Order without a password.
              </span>
            </div>

            {/* Checkout CTA */}
            <LoadingButton
              variant="primary"
              size="lg"
              onClick={onProceedToCheckout}
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full"
            >
              Proceed to Checkout
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
};
