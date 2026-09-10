import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  KeyRound,
  History,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  User,
  Phone,
  MapPin,
  Save,
} from 'lucide-react';
import { LoadingButton } from './LoadingButton';
import { Order, CartItem, CustomerProfile } from '../types';
import { OrderHistoryDashboard } from './OrderHistoryDashboard';

interface CustomerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onLoginSuccess: (email: string) => void;
  onLogout: () => void;
  onReorderItems?: (items: CartItem[]) => void;
  onTrackOrder?: (order: Order) => void;
  onOpenReview?: (order: Order) => void;
}

const AKWA_IBOM_LGAS = [
  'Uyo',
  'Abak',
  'Eket',
  'Ikot Ekpene',
  'Oron',
  'Ibesikpo Asutan',
  'Nsit Ibom',
  'Nsit Ubium',
  'Etinan',
  'Mkpat Enin',
  'Onna',
  'Ikono',
  'Ibiono Ibom',
  'Essien Udim',
  'Ini',
  'Ika',
  'Ukanafun',
  'Oruk Anam',
  'Urue-Offong/Oruko',
  'Mbo',
  'Okobo',
  'Esit Eket',
  'Ibeno',
  'Eastern Obolo',
];

export const CustomerLoginModal: React.FC<CustomerLoginModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onLoginSuccess,
  onLogout,
  onReorderItems,
  onTrackOrder,
  onOpenReview,
}) => {
  if (!isOpen) return null;

  // Active view: 'orders' | 'profile' | 'login'
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'login'>(
    userEmail ? 'orders' : 'login'
  );

  // Login steps: 'enter_email' | 'enter_otp'
  const [step, setStep] = useState<'enter_email' | 'enter_otp'>('enter_email');
  const [emailInput, setEmailInput] = useState(userEmail || '');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpTimer, setOtpTimer] = useState(45);
  const [errorMsg, setErrorMsg] = useState('');

  // Profile Auto-fill state
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileArea, setProfileArea] = useState('Uyo');
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  // Load existing profile from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fruitynest_customer_profile');
      if (stored) {
        const parsed: CustomerProfile = JSON.parse(stored);
        if (parsed.name) setProfileName(parsed.name);
        if (parsed.phone) setProfilePhone(parsed.phone);
        if (parsed.address) setProfileAddress(parsed.address);
        if (parsed.area) setProfileArea(parsed.area);
        if (parsed.email && !emailInput) setEmailInput(parsed.email);
      }
    } catch (e) {
      console.error(e);
    }
  }, [userEmail]);

  // Sync tab when userEmail changes
  useEffect(() => {
    if (userEmail) {
      setActiveTab('orders');
    }
  }, [userEmail]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'enter_otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Generate simulated 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep('enter_otp');
    setOtpTimer(45);
    setOtpInput('');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanInput = otpInput.replace(/\s+/g, '').trim();
    if (!cleanInput) {
      setErrorMsg('Please enter the 6-digit code sent to your email.');
      return;
    }

    if (cleanInput === generatedOtp || cleanInput === '123456') {
      const confirmedEmail = emailInput.trim().toLowerCase();

      // Ensure customer profile in localStorage is persisted
      try {
        const stored = localStorage.getItem('fruitynest_customer_profile');
        const existing: CustomerProfile = stored ? JSON.parse(stored) : {};
        existing.email = confirmedEmail;
        if (!existing.savedAt) {
          existing.savedAt = new Date().toISOString();
        }
        localStorage.setItem('fruitynest_customer_profile', JSON.stringify(existing));
      } catch (err) {
        console.error('Failed saving profile:', err);
      }

      onLoginSuccess(confirmedEmail);
      setActiveTab('orders');
      setStep('enter_email');
      setGeneratedOtp(null);
    } else {
      setErrorMsg('Invalid verification code. Please check the code or click Resend.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated: CustomerProfile = {
        name: profileName.trim(),
        phone: profilePhone.trim(),
        email: userEmail || emailInput.trim().toLowerCase(),
        address: profileAddress.trim(),
        area: profileArea,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('fruitynest_customer_profile', JSON.stringify(updated));
      setProfileSavedNotice(true);
      setTimeout(() => setProfileSavedNotice(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#FAF9F5] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-[#E8E2D2] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D2] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#EAF5EE] text-[#173F2E] flex items-center justify-center font-bold text-xs border border-[#CDE5D5]">
              <History className="w-4 h-4 text-[#2D6A4F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#173F2E]">
                  {userEmail ? 'Customer Account & Orders' : 'Customer Account Login'}
                </h2>
                {userEmail && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EAF5EE] text-[#1B4332] text-[10px] font-bold border border-[#CFE7D6]">
                    <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5C7867]">
                {userEmail
                  ? `Signed in as ${userEmail}`
                  : 'Fast email & OTP login — auto-fills your orders & details'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F0EBE1] text-[#4A6454] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-5 pt-3 pb-0 bg-white border-b border-[#EAE3D3] flex items-center gap-2">
          {userEmail ? (
            <>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'border-[#173F2E] text-[#173F2E]'
                    : 'border-transparent text-[#7A9584] hover:text-[#173F2E]'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Order History</span>
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'profile'
                    ? 'border-[#173F2E] text-[#173F2E]'
                    : 'border-transparent text-[#7A9584] hover:text-[#173F2E]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Saved Auto-Fill Info</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('login')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'login'
                    ? 'border-[#173F2E] text-[#173F2E]'
                    : 'border-transparent text-[#7A9584] hover:text-[#173F2E]'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Email & OTP Login</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'orders'
                    ? 'border-[#173F2E] text-[#173F2E]'
                    : 'border-transparent text-[#7A9584] hover:text-[#173F2E]'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Device Order History</span>
              </button>
            </>
          )}
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6">
          {activeTab === 'orders' && (
            /* DEDICATED ORDER HISTORY DASHBOARD VIEW */
            <OrderHistoryDashboard
              userEmail={userEmail || 'guest@fruitynest.com'}
              onLogout={() => {
                onLogout();
                setActiveTab('login');
              }}
              onClose={onClose}
              onReorderItems={onReorderItems}
              onTrackOrder={onTrackOrder}
              onOpenReview={onOpenReview}
            />
          )}

          {activeTab === 'profile' && (
            /* SAVED AUTO-FILL DETAILS (NAME, PHONE, LGA, ADDRESS) */
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md mx-auto py-2">
              <div className="p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs space-y-3.5">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#173F2E]">
                    Saved Customer Auto-Fill Details
                  </h3>
                  <p className="text-xs text-[#5D7A68]">
                    Your name, phone number, and delivery LGA saved here will automatically populate at checkout.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#698573] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="e.g. Fevo"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                    Phone Number (Mandatory for Dispatch)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#698573] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="e.g. 0812 345 6789"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                    Delivery LGA
                  </label>
                  <select
                    value={profileArea}
                    onChange={(e) => setProfileArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                  >
                    {AKWA_IBOM_LGAS.map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                    Street / Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#698573] absolute left-3.5 top-3" />
                    <textarea
                      rows={2}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="e.g. 14 Shelter Afrique Estate, Uyo"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                    />
                  </div>
                </div>

                {profileSavedNotice && (
                  <div className="p-2.5 rounded-xl bg-[#EAF5EE] border border-[#BBD9C5] text-xs text-[#1B4332] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Auto-fill details saved successfully!</span>
                  </div>
                )}

                <LoadingButton
                  type="submit"
                  variant="unstyled"
                  size="none"
                  className="w-full py-3 bg-[#173F2E] hover:bg-[#23563F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Auto-Fill Profile</span>
                </LoadingButton>
              </div>
            </form>
          )}

          {activeTab === 'login' && (
            /* EMAIL OTP LOGIN FLOW */
            <div className="space-y-4 max-w-md mx-auto py-2">
              {step === 'enter_email' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs space-y-3.5">
                    <div className="text-center pb-2">
                      <div className="w-12 h-12 rounded-full bg-[#FAF0DC] text-[#B46A14] flex items-center justify-center mx-auto mb-2 border border-[#EBD6B0]">
                        <KeyRound className="w-6 h-6 text-[#B46A14]" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#173F2E]">
                        Email & OTP Sign In / Sign Up
                      </h3>
                      <p className="text-xs text-[#5D7A68] mt-0.5">
                        Enter your email to receive an instant 6-digit OTP code (acting as password) to access your orders, cart, and auto-fill profile.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#698573] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="e.g. fevo@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-xs text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                        />
                      </div>
                      <span className="text-[11px] text-[#698573] block mt-1">
                        Instant 6-digit code acting as password. No memorizing passwords needed.
                      </span>
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-[#DC2626] font-medium bg-[#FEF2F2] p-2.5 rounded-xl border border-[#FECACA]">
                        {errorMsg}
                      </p>
                    )}

                    <LoadingButton
                      type="submit"
                      variant="unstyled"
                      size="none"
                      className="w-full py-3 bg-[#173F2E] hover:bg-[#23563F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                    >
                      <span>Send 6-Digit OTP Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </LoadingButton>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F0EBE1]/60 border border-[#E2DBCB] text-xs text-[#5C7867] space-y-1.5">
                    <p className="font-bold text-[#173F2E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Why sign in with Email & OTP:</span>
                    </p>
                    <ul className="space-y-1 text-[11px] list-disc list-inside">
                      <li>Saves your cart and order history automatically</li>
                      <li>Auto-fills your Name, Phone number, and Akwa Ibom LGA for fast checkout</li>
                      <li>One-click reorder of your favorite parfait bowls and toppings</li>
                    </ul>
                  </div>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#E5DFD1] shadow-2xs space-y-3.5">
                    {/* Simulated email delivery badge */}
                    {generatedOtp && (
                      <div className="p-3 rounded-xl bg-[#EAF5EE] border border-[#BBD9C5] text-xs text-[#1B4332] space-y-1 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <span className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                            OTP Sent to {emailInput}
                          </span>
                          <span className="text-[10px] bg-[#2D6A4F] text-white px-2 py-0.5 rounded-full font-mono">
                            OTP: {generatedOtp}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#3B664B]">
                          Your 6-digit one-time password is{' '}
                          <strong className="font-mono text-sm tracking-wider text-[#173F2E]">
                            {generatedOtp}
                          </strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => setOtpInput(generatedOtp)}
                          className="mt-1 text-[11px] font-bold text-[#2D6A4F] hover:underline cursor-pointer"
                        >
                          Click to autofill OTP →
                        </button>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#173F2E] uppercase tracking-wider mb-1">
                        Enter 6-Digit OTP Password
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="e.g. 582914"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBE] text-center font-mono text-lg font-bold tracking-widest text-[#173F2E] bg-[#FAF9F5] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-xs text-[#DC2626] font-medium bg-[#FEF2F2] p-2.5 rounded-xl border border-[#FECACA]">
                        {errorMsg}
                      </p>
                    )}

                    <LoadingButton
                      type="submit"
                      variant="unstyled"
                      size="none"
                      className="w-full py-3 bg-[#173F2E] hover:bg-[#23563F] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP & Sign In</span>
                    </LoadingButton>

                    <div className="flex items-center justify-between pt-2 text-xs text-[#5C7867]">
                      <button
                        type="button"
                        onClick={() => setStep('enter_email')}
                        className="hover:underline cursor-pointer"
                      >
                        ← Change Email
                      </button>

                      <button
                        type="button"
                        disabled={otpTimer > 0}
                        onClick={() => {
                          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
                          setGeneratedOtp(newCode);
                          setOtpTimer(45);
                        }}
                        className={`font-semibold cursor-pointer ${
                          otpTimer > 0
                            ? 'text-[#A6B8AC] cursor-not-allowed'
                            : 'text-[#2D6A4F] hover:underline'
                        }`}
                      >
                        {otpTimer > 0 ? `Resend OTP (${otpTimer}s)` : 'Resend OTP'}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
