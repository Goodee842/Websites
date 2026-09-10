import React, { useState } from 'react';
import { X, Search, ShieldCheck, Clock, Bike, Check, Package, AlertCircle, PhoneCall } from 'lucide-react';
import { Order } from '../types';
import { LoadingButton } from './LoadingButton';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewModal: (order: Order) => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  onOpenReviewModal,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Load existing orders from localStorage
  const getOrders = (): Order[] => {
    try {
      const data = localStorage.getItem('fruitynest_orders');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      setFoundOrders([]);
      setSelectedOrder(null);
      return;
    }

    const cleanQuery = rawQuery.toLowerCase().replace(/\s+/g, '');
    const digitsOnly = rawQuery.replace(/\D/g, '');

    const allOrders = getOrders();
    const matched = allOrders.filter((ord) => {
      const idClean = ord.orderId.toLowerCase().replace(/\s+/g, '');
      const phoneDigits = ord.customer.phone.replace(/\D/g, '');
      const phoneClean = ord.customer.phone.toLowerCase().replace(/\s+/g, '');

      const matchId = idClean.includes(cleanQuery);
      const matchPhone =
        (digitsOnly.length >= 4 && phoneDigits.includes(digitsOnly)) ||
        phoneClean.includes(cleanQuery);

      return matchId || matchPhone;
    });

    setFoundOrders(matched);
    setSelectedOrder(matched.length > 0 ? matched[0] : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE4D5] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EBF3ED] text-[#173F2E] flex items-center justify-center">
              <PhoneCall className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#173F2E]">
                Track Order by Phone Number
              </h3>
              <span className="text-[11px] text-[#5C7767]">
                Live dispatch updates for your active deliveries
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D5] text-[#4A6454] transition-colors cursor-pointer"
            aria-label="Close track order"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter your registered phone number (e.g. 0802 345 6789)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
              />
            </div>
            <LoadingButton
              type="submit"
              variant="unstyled"
              size="none"
              className="px-5 py-2.5 bg-[#173F2E] hover:bg-[#23563F] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </LoadingButton>
          </form>

          {/* Multiple orders tab switch if more than 1 order found */}
          {foundOrders.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-[#5C7767] font-semibold shrink-0">Orders found:</span>
              {foundOrders.map((ord, idx) => (
                <button
                  key={ord.orderId}
                  onClick={() => setSelectedOrder(ord)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold shrink-0 cursor-pointer transition-all ${
                    selectedOrder?.orderId === ord.orderId
                      ? 'bg-[#173F2E] text-white'
                      : 'bg-[#FAF6EC] text-[#5C7767] hover:bg-[#EAE4D5]'
                  }`}
                >
                  Order {idx + 1}
                </button>
              ))}
            </div>
          )}

          {hasSearched && foundOrders.length === 0 && (
            <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-center text-xs text-[#DC2626] space-y-1">
              <AlertCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="font-bold">No orders found for &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-[#991B1B]">
                Please double-check the phone number used when placing your order.
              </p>
            </div>
          )}

          {selectedOrder && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Order Found Card */}
              <div className="bg-[#173F2E] text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#52B788] uppercase tracking-wider">
                    Customer Order
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#23563F] text-[#D8EADB]">
                    {new Date(selectedOrder.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="my-3 py-2 px-3 rounded-xl bg-[#0F2A1E]/80 border border-[#2B5E47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A7C7B5] block uppercase font-semibold">
                      Registered Customer Phone
                    </span>
                    <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
                      {selectedOrder.customer.phone}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A7C7B5] block uppercase font-semibold">
                      Customer Name
                    </span>
                    <span className="text-xs font-bold text-white">
                      {selectedOrder.customer.fullName}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#D8EADB]">
                  Delivery to: <strong>{selectedOrder.customer.address}</strong>, {selectedOrder.customer.area}
                </p>
              </div>

              {/* Status Tracker */}
              <div className="bg-[#F6F4ED] p-4 rounded-2xl border border-[#E9E4D8] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#173F2E]">Order Placed & Confirmed</span>
                    <span className="text-[#6D8777] block">
                      {selectedOrder.payment.method === 'bank_transfer'
                        ? 'Bank Transfer verified'
                        : 'Payment on delivery selected'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#F9A826] text-white flex items-center justify-center text-xs animate-pulse">
                    🥣
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#173F2E]">Kitchen Preparing Parfaits</span>
                    <span className="text-[#6D8777] block">Fresh layers of Greek yogurt, fruits & crisp granola</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-75">
                  <div className="w-6 h-6 rounded-full bg-[#DDD7C8] text-[#555] flex items-center justify-center text-xs">
                    🛵
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#173F2E]">Dispatch Rider Handover & Call</span>
                    <span className="text-[#6D8777] block">
                      Rider will call {selectedOrder.customer.phone} upon dispatch
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-[#E9E4D8] rounded-2xl p-4 bg-white space-y-2">
                <h4 className="text-xs font-bold text-[#173F2E] uppercase tracking-wider">
                  Order Items ({selectedOrder.items.length})
                </h4>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs py-1 border-b border-[#F2ECE1] last:border-none">
                    <div>
                      <span className="font-bold text-[#173F2E]">{item.quantity}x {item.productName}</span>
                      <span className="text-[#6D8777] block text-[11px]">
                        {item.size.name} • {item.yogurtType}
                      </span>
                    </div>
                    <span className="font-bold text-[#173F2E]">₦{item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 flex justify-between font-bold text-sm text-[#173F2E]">
                  <span>Total Amount</span>
                  <span>₦{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Verified review CTA */}
              <LoadingButton
                variant="unstyled"
                size="none"
                onClick={() => onOpenReviewModal(selectedOrder)}
                className="w-full py-3 bg-[#EBF4EE] hover:bg-[#D8ECDE] text-[#173F2E] rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 border border-[#C6E2CF]"
              >
                <span>⭐ Rate & Review this Parfait Order</span>
              </LoadingButton>
            </div>
          )}

          {!hasSearched && (
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E9E4D8] text-xs text-[#5D7A68] space-y-2">
              <h4 className="font-bold text-[#173F2E]">How phone tracking works:</h4>
              <p>
                Simply enter the phone number you entered during checkout. Our system automatically retrieves your current order status, ETA, and kitchen details.
              </p>
              <p>
                Our dispatch rider will also ring this phone number directly when arriving at your delivery location!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
