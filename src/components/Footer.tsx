import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTrackOrder: () => void;
}

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTrackOrder }) => {
  return (
    <footer className="bg-[#112A1F] text-[#FAF7F0] py-8 sm:py-10 border-t border-[#1C3E2F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-[#214837]">
          {/* Col 1: Brand Info & Socials */}
          <div className="lg:col-span-5 space-y-3">
            <BrandLogo variant="full" />
            <p className="text-xs sm:text-sm text-[#B8CEBF] max-w-sm leading-relaxed">
              Where all your cravings are nested! Wholesome Greek yogurt parfaits layered with fresh fruits and signature crunchy granola.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#52B788] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Phone Dispatch Tracking Enabled</span>
            </div>

            {/* Social Media Link Buttons */}
            <div className="pt-1.5 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/fruity_nest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fruity Nest on Instagram"
                className="px-3 py-1.5 rounded-xl bg-[#1C4331] hover:bg-[#E1306C] text-white transition-all text-xs font-semibold flex items-center gap-2 group shadow-2xs"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#FF7AA2] group-hover:text-white transition-colors" />
                <span>@fruity_nest</span>
              </a>

              <a
                href="https://www.facebook.com/p/Fruity-Nest-61574655906447/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fruity Nest on Facebook"
                className="px-3 py-1.5 rounded-xl bg-[#1C4331] hover:bg-[#1877F2] text-white transition-all text-xs font-semibold flex items-center gap-2 group shadow-2xs"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-[#60A5FA] group-hover:text-white transition-colors" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Col 2: Hours & Order Tracking */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52B788]">
              Order Hours
            </h4>
            <div className="space-y-2 text-xs text-[#D1DFD6]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#52B788] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Everyday</span>
                  <span>8:00 AM — 9:00 PM</span>
                </div>
              </div>
              <p className="text-[11px] text-[#A6C0B0] pt-0.5">
                ⚡ Temperature-controlled delivery bags ensure your yogurt arrives ice cold.
              </p>
              <button
                onClick={onOpenTrackOrder}
                className="mt-1 text-xs text-[#52B788] hover:text-white underline block font-semibold cursor-pointer"
              >
                Track Order with Phone Number →
              </button>
            </div>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#52B788]">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-[#D1DFD6]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#52B788] shrink-0" />
                <a href="tel:+2348140008920" className="hover:text-white transition-colors">
                  +234 814 000 8920 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#52B788] shrink-0" />
                <a href="mailto:orders@fruitynest.ng" className="hover:text-white transition-colors">
                  orders@fruitynest.ng
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#52B788] shrink-0 mt-0.5" />
                <span>Lekki Phase 1, Victoria Island & Ikeja Kitchen Hubs</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs text-[#52B788] hover:text-white underline font-semibold cursor-pointer block"
              >
                Open Contact Page & Form →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9CB5A5] gap-3">
          <p>© {new Date().getFullYear()} Fruity Nest Nigeria. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Guest Checkout Enabled</span>
            <span>•</span>
            <span>Email OTP Login</span>
            <span>•</span>
            <span>Encrypted Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
