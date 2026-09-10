import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Bike,
  Check,
  AlertCircle,
  Loader2,
  KeyRound,
  CheckCircle2,
  PhoneCall,
  MapPin,
  Copy,
} from 'lucide-react';
import { CartItem, Order, OrderCustomer, OrderPayment } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: (order: Order) => void;
  userEmail?: string | null;
  onOpenLogin?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  userEmail,
  onOpenLogin,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const isFreeDelivery = subtotal >= 15000;
  // Dispatch fee starts from 1,500 naira
  const deliveryFee = isFreeDelivery ? 0 : 1500;
  const grandTotal = subtotal + deliveryFee;

  // Form states: Name (not full name), Phone (mandatory), Email (optional)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(userEmail || '');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Uyo');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryTime, setDeliveryTime] = useState<'immediate' | 'scheduled'>('immediate');
  // Only two payment methods: bank_transfer or delivery
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'delivery'>('bank_transfer');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  const handleCopyAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('0289410291');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyAmount = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(grandTotal.toString());
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  // Autofill from saved customer profile if available
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('fruitynest_customer_profile');
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        if (profile.name && !name) setName(profile.name);
        if (profile.phone && !phone) setPhone(profile.phone);
        if (profile.email && !email) setEmail(profile.email);
        if (profile.address && !address) setAddress(profile.address);
        if (profile.area && !area) setArea(profile.area);
      }
    } catch (e) {
      console.error('Error reading saved customer profile', e);
    }
  }, []);

  useEffect(() => {
    if (userEmail && !email) {
      setEmail(userEmail);
    }
  }, [userEmail]);

  // Akwa Ibom State Local Government Areas ONLY
  const akwaIbomLGAs = [
    'Uyo',
    'Abak',
    'Eket',
    'Ikot Ekpene',
    'Itu',
    'Oron',
    'Ibesikpo Asutan',
    'Uruan',
    'Etinan',
    'Onna',
    'Mkpat Enin',
    'Ikono',
    'Essien Udim',
    'Ibiono Ibom',
    'Nsit Ibom',
    'Nsit Ubium',
    'Nsit Atai',
    'Ikot Abasi',
    'Oruk Anam',
    'Ukanafun',
    'Ibeno',
    'Esit Eket',
    'Eastern Obolo',
    'Mbo',
    'Okobo',
    'Urue-Offong/Oruko',
    'Udung Uko',
    'Ini',
    'Obot Akara',
    'Etim Ekpo',
  ];

  const handlePayAndOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    // Phone number is strictly mandatory for dispatch rider call
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage('Phone number is mandatory so our dispatch rider can call you.');
      return;
    }
    // Email is optional, but validate format only if provided
    if (email.trim() && !email.includes('@')) {
      setErrorMessage('Please provide a valid email address or leave it blank.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please enter your street address.');
      return;
    }

    setIsProcessing(true);

    // Save profile for customer auto-fill
    try {
      const profile = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || userEmail || '',
        address: address.trim(),
        area,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('fruitynest_customer_profile', JSON.stringify(profile));
    } catch (err) {
      console.error('Failed to save customer profile', err);
    }

    setTimeout(() => {
      // Generate order ID e.g. FN-4891
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const orderId = `FN-${randomNum}`;
      const reviewToken = `rev_${Date.now()}_${randomNum}`;

      const customer: OrderCustomer = {
        fullName: name.trim(),
        phone: phone.trim(),
        email: email.trim() || `${phone.replace(/\D/g, '')}@guest.fruitynest.com`,
        address: address.trim(),
        area,
        deliveryNotes: deliveryNotes.trim(),
        deliveryTime,
      };

      const payment: OrderPayment = {
        method: paymentMethod,
        status: paymentMethod === 'delivery' ? 'pending_verification' : 'paid',
        reference: `PAY_${Date.now().toString(36).toUpperCase()}`,
        bankName: paymentMethod === 'bank_transfer' ? 'Wema Bank (Fruity Nest)' : undefined,
        accountNumber: paymentMethod === 'bank_transfer' ? '0289410291' : undefined,
      };

      const newOrder: Order = {
        orderId,
        createdAt: new Date().toISOString(),
        items: [...cartItems],
        subtotal,
        deliveryFee,
        total: grandTotal,
        customer,
        payment,
        status: 'received',
        reviewSubmitted: false,
        reviewToken,
      };

      // Save to localStorage orders list
      try {
        const stored = localStorage.getItem('fruitynest_orders');
        const orders = stored ? JSON.parse(stored) : [];
        orders.unshift(newOrder);
        localStorage.setItem('fruitynest_orders', JSON.stringify(orders));
      } catch (err) {
        console.error('Failed to store order in local storage', err);
      }

      setIsProcessing(false);
      onOrderCompleted(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE4D5] flex items-center justify-between bg-[#FAF9F5]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#173F2E]">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>GUEST CHECKOUT — DIRECT DISPATCH</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#173F2E]">
              Order & Payment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D5] text-[#4A6454] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePayAndOrder} className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          {/* Promo / Past Orders Yellow Quote Banner */}
          <div className="p-3.5 rounded-2xl bg-[#FAF6EC] border border-[#E9DFCB] flex items-center justify-between gap-3 text-xs text-[#173F2E]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#F5ECD5] text-[#B46A14] flex items-center justify-center shrink-0">
                <KeyRound className="w-4 h-4 text-[#B46A14]" />
              </div>
              <span className="text-xs text-[#635338] font-medium leading-tight">
                Save your past orders for future promos or bunoses or free gift.
              </span>
            </div>
            {onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="text-xs font-bold text-[#173F2E] bg-white hover:bg-[#F2ECE0] border border-[#DCD3C1] px-3 py-1.5 rounded-xl cursor-pointer shadow-2xs shrink-0"
              >
                {userEmail ? 'My Orders' : 'Sign In (OTP)'}
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#DC2626] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Customer & Delivery Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#173F2E] text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Recipient & Delivery Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Name (Not full name, just name) */}
              <div>
                <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amina"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                />
              </div>

              {/* Phone Number (Mandatory so dispatch can call) */}
              <div>
                <label className="block text-xs font-semibold text-[#3C5848] mb-1 flex items-center justify-between">
                  <span>Phone Number *</span>
                  <span className="text-[10px] text-[#2D6A4F] font-bold">Mandatory for Rider Call</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0802 345 6789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                  />
                </div>
              </div>

              {/* Email Address (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-[#3C5848] mb-1 flex items-center justify-between">
                  <span>Email Address</span>
                  <span className="text-[10px] text-[#7A9584] font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. amina@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                />
              </div>

              {/* Delivery Zone (Akwa Ibom State LGAs only) */}
              <div>
                <label className="block text-xs font-semibold text-[#3C5848] mb-1 flex items-center justify-between">
                  <span>Delivery LGA *</span>
                  <span className="text-[10px] text-[#2D6A4F] font-bold">Fee: ₦{deliveryFee.toLocaleString()}</span>
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                >
                  {akwaIbomLGAs.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3C5848] mb-1">
                  Street Address, Apartment & Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 14 Shelter Afrique Estate, or Flat 2B, Nwaniba Road, Uyo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                />
              </div>

              {/* Delivery Notes / Dispatch Instructions (Optional) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#3C5848] mb-1 flex items-center justify-between">
                  <span>Delivery Notes / Dispatch Instructions</span>
                  <span className="text-[10px] text-[#7A9584] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Call my phone when at the gate, deliver to reception"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCD6C7] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Method (Only Bank Transfer and Payment on Delivery) */}
          <div className="pt-2 border-t border-[#EAE4D5]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#173F2E] text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Payment Method</span>
            </h3>

            {/* Payment Options: Only 2 options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#173F2E] bg-[#F1F6F3] text-[#173F2E] ring-1 ring-[#173F2E] shadow-2xs'
                    : 'border-[#E2DCCE] bg-white text-[#4A6454] hover:bg-[#FAF9F5]'
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C7] shrink-0">
                  <Building2 className="w-5 h-5 text-[#173F2E]" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-[#173F2E]">Instant Bank Transfer</span>
                  <span className="text-[11px] text-[#5C7867] block mt-0.5">
                    Transfer to dedicated virtual account
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'delivery'
                    ? 'border-[#173F2E] bg-[#F1F6F3] text-[#173F2E] ring-1 ring-[#173F2E] shadow-2xs'
                    : 'border-[#E2DCCE] bg-white text-[#4A6454] hover:bg-[#FAF9F5]'
                }`}
              >
                <div className="p-2 rounded-xl bg-white border border-[#DCD6C7] shrink-0">
                  <Bike className="w-5 h-5 text-[#173F2E]" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-[#173F2E]">Payment on Delivery</span>
                  <span className="text-[11px] text-[#5C7867] block mt-0.5">
                    Pay transfer or cash to rider at doorstep
                  </span>
                </div>
              </button>
            </div>

            {/* Payment Details Container */}
            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F0F7F2] via-[#F8FCF9] to-[#EAF5EE] border-2 border-[#1B4332] space-y-3.5 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-[#D2E7DA]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#173F2E] text-white flex items-center justify-center">
                      <Building2 className="w-3.5 h-3.5 text-[#52B788]" />
                    </div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#173F2E]">
                      Dedicated Order Account Details
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2D6A4F] text-white text-[10px] font-bold tracking-wide">
                    Direct Auto-Reconcile
                  </span>
                </div>

                {/* Detailed Account Information Table / Card */}
                <div className="bg-white rounded-xl border border-[#BEDBC9] overflow-hidden shadow-2xs divide-y divide-[#E6F1EA]">
                  {/* Bank Name */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#FCFDFD]">
                    <span className="text-[11px] font-semibold text-[#5A7968] uppercase tracking-wider">
                      Bank Name
                    </span>
                    <span className="text-sm font-extrabold text-[#173F2E]">
                      Wema Bank (Fruity Nest)
                    </span>
                  </div>

                  {/* Account Number with Copy Button */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#F4F9F6]">
                    <div>
                      <span className="text-[11px] font-semibold text-[#5A7968] uppercase tracking-wider block">
                        Account Number
                      </span>
                      <span className="text-base sm:text-lg font-mono font-extrabold text-[#0D3B23] tracking-wider">
                        0289 410 291
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#173F2E] text-white text-xs font-bold hover:bg-[#23563F] transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#52B788]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Account Name */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#FCFDFD]">
                    <span className="text-[11px] font-semibold text-[#5A7968] uppercase tracking-wider">
                      Account Name
                    </span>
                    <span className="text-sm font-extrabold text-[#173F2E]">
                      Fruity Nest Delights
                    </span>
                  </div>

                  {/* Amount to Transfer with Copy Button */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#EEF7F1]">
                    <div>
                      <span className="text-[11px] font-semibold text-[#2D6A4F] uppercase tracking-wider block">
                        Amount to Transfer
                      </span>
                      <span className="text-base sm:text-xl font-serif font-extrabold text-[#173F2E]">
                        ₦{grandTotal.toLocaleString()}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAmount}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E0F0E6] text-[#173F2E] text-xs font-bold border border-[#B8DEC6] hover:bg-[#D2EAD9] transition-all cursor-pointer active:scale-95"
                    >
                      {copiedAmount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#2D6A4F]" />
                          <span>Copy Amount</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#E2F1E8] border border-[#C5E5D1] text-[11px] text-[#1E4D33]">
                  <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                  <p>
                    Transfer exactly <strong>₦{grandTotal.toLocaleString()}</strong> to the account above, then click <strong>"I have made payment and confirmed order"</strong> below.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === 'delivery' && (
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5DFD1] text-xs text-[#3E5848] space-y-1.5 animate-in fade-in duration-150">
                <div className="font-bold text-[#173F2E]">Payment on Dispatch Arrival</div>
                <p className="text-[11px] text-[#5D7A68]">
                  You can pay via bank transfer or cash directly to the dispatch rider when your chilled parfait pack arrives.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Direct Phone Rider Confirmation (No order code) */}
          <div className="p-4 rounded-2xl bg-[#EBF4EE] border border-[#CDE5D5] flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#173F2E] text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
              <PhoneCall className="w-4 h-4 text-[#52B788]" />
            </div>
            <div className="text-xs text-[#1E4330]">
              <span className="font-bold block mb-0.5">
                Direct Dispatch Rider Call
              </span>
              <p className="text-[#365D46] leading-relaxed">
                Our dispatch rider will call your phone number {phone ? `(${phone})` : ''} as soon as your parfait is layered and on its way to {area}.
              </p>
            </div>
          </div>

          {/* Price Breakdown & Submit CTA */}
          <div className="pt-3 border-t border-[#EAE4D5] space-y-3">
            <div className="space-y-1 text-xs text-[#4A6454]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-[#173F2E]">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Dispatch Fee ({area}):</span>
                <span className="font-bold text-[#173F2E]">
                  {deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-[#EAE4D5]">
              <div>
                <span className="text-[10px] text-[#6E8777] block uppercase font-medium">
                  Total to Pay
                </span>
                <span className="font-serif text-2xl font-bold text-[#173F2E]">
                  ₦{grandTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#173F2E] hover:bg-[#23563F] text-white font-bold rounded-full text-xs sm:text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Order...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>
                      {paymentMethod === 'bank_transfer'
                        ? 'I have made payment and confirmed order'
                        : `Confirm Order (₦${grandTotal.toLocaleString()})`}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
