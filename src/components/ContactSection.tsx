import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';

// Custom SVG for Facebook & Instagram for pixel-perfect brand fidelity alongside Lucide icons
export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [subject, setSubject] = useState('Order & Delivery');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Simulate sending message / trigger WhatsApp or support channel
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setContactInfo('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const handleOpenWhatsApp = () => {
    const text = `Hello Fruity Nest! 🌿 I would like to make an inquiry about parfait orders and delivery.`;
    window.open(`https://wa.me/2348140008920?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FAF9F5] border-t border-[#EAE5D9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#173F2E] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#CFE4D5]">
            <MessageCircle className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>We&apos;re Here For You</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2E] tracking-tight">
            Contact Fruity Nest
          </h2>
          <p className="text-[#5D7A68] text-sm sm:text-base mt-3 leading-relaxed font-medium">
            Where all your cravings are nested! Reach out for quick orders, event catering, or connect with our vibrant community on social media.
          </p>
        </div>

        {/* Top Social Media Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-12">
          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/fruity_nest/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F3] border border-[#FED7E2] hover:border-[#F687B3] shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#D53F8C] uppercase tracking-wider block">
                  Follow on Instagram
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173F2E] group-hover:text-[#97266D] transition-colors">
                  @fruity_nest
                </h3>
                <p className="text-xs text-[#718096] mt-0.5">
                  Daily parfait stories, menu drops & customer love
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-[#D53F8C] flex items-center justify-center group-hover:bg-[#D53F8C] group-hover:text-white transition-all shrink-0 shadow-2xs">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href="https://www.facebook.com/p/Fruity-Nest-61574655906447/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-gradient-to-br from-[#F0F5FF] to-[#EBF3FF] border border-[#BFDBFE] hover:border-[#93C5FD] shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <FacebookIcon className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider block">
                  Connect on Facebook
                </span>
                <h3 className="font-serif text-xl font-bold text-[#173F2E] group-hover:text-[#1E40AF] transition-colors">
                  Fruity Nest
                </h3>
                <p className="text-xs text-[#718096] mt-0.5">
                  Updates, recipes, customer reviews & news
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white text-[#1877F2] flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all shrink-0 shadow-2xs">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* 2-Column Grid: Contact Information & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Reach Channels */}
          <div className="lg:col-span-5 bg-[#173F2E] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2D6A4F]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#52B788]">
                  Direct Touchpoints
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 text-[#FAF7F0]">
                  Get in Touch
                </h3>
                <p className="text-xs sm:text-sm text-[#BFD5C7] mt-2 leading-relaxed">
                  Have a question about parfait customizations, bulk corporate orders, party platters, or delivery times? We respond swiftly.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* WhatsApp / Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F2B1F]/60 border border-[#2A5741]">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#A8D3B8] block">
                      Phone & WhatsApp
                    </span>
                    <a
                      href="tel:+2348140008920"
                      className="text-sm font-bold text-white hover:text-[#52B788] transition-colors block"
                    >
                      +234 814 000 8920
                    </a>
                    <span className="text-[11px] text-[#86AB94]">
                      Fastest response for active orders
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F2B1F]/60 border border-[#2A5741]">
                  <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-[#FAF7F0] flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#A8D3B8] block">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:orders@fruitynest.ng"
                      className="text-sm font-bold text-white hover:text-[#52B788] transition-colors block"
                    >
                      orders@fruitynest.ng
                    </a>
                    <span className="text-[11px] text-[#86AB94]">
                      For partnerships & catering requests
                    </span>
                  </div>
                </div>

                {/* Locations */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F2B1F]/60 border border-[#2A5741]">
                  <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-[#FAF7F0] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#A8D3B8] block">
                      Retail & Kitchen Hubs
                    </span>
                    <span className="text-xs font-semibold text-white block">
                      EFG Nwaniba, Metropolitan Oron Rd & EFG Max Abak Rd
                    </span>
                    <span className="text-[11px] text-[#86AB94]">
                      Serving Uyo & surrounding LGAs with cold-chain parfaits
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#0F2B1F]/60 border border-[#2A5741]">
                  <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-[#FAF7F0] flex items-center justify-center shrink-0 shadow-xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-[#A8D3B8] block">
                      Operating Hours
                    </span>
                    <span className="text-xs font-semibold text-white block">
                      Monday – Sunday: 8:00 AM – 9:00 PM
                    </span>
                    <span className="text-[11px] text-[#52B788] font-medium">
                      Kitchen is active 7 days a week
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Chat Button */}
            <div className="pt-6 relative z-10">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Send Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F2ECE1] mb-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#173F2E]">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-[#5D7A68] mt-0.5">
                    We usually respond within 15 to 30 minutes during kitchen hours.
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#EAF5ED] text-[#2D6A4F] flex items-center justify-center mb-4 shadow-xs">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#173F2E] mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5D7A68] max-w-md">
                    Thank you for reaching out! Our team at Fruity Nest has received your message and will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#173F2E] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Chisom Adeleke"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D8D2C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#173F2E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#173F2E] mb-1">
                        Phone or Email *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="e.g. 08012345678 or you@email.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D8D2C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#173F2E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173F2E] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8D2C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#173F2E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 transition-all"
                    >
                      <option value="Order & Delivery">Order Status & Delivery Inquiries</option>
                      <option value="Custom Parfait Order">Custom Parfaits & Bulk Orders</option>
                      <option value="Event Catering">Event Catering & Parfait Bars</option>
                      <option value="Feedback / Review">Feedback or Review</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173F2E] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you need, order details, delivery address, or event date..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8D2C5] bg-[#FAF9F5] text-xs sm:text-sm text-[#173F2E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#173F2E] hover:bg-[#23563F] text-white font-bold rounded-full text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Social Footnote in Form Card */}
            <div className="pt-6 mt-6 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D7A68]">
              <span>Follow Fruity Nest across platforms:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/fruity_nest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-bold text-[#173F2E] hover:text-[#D53F8C] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#D53F8C]" />
                  <span>Instagram</span>
                </a>
                <span className="text-[#D8D2C5]">•</span>
                <a
                  href="https://www.facebook.com/p/Fruity-Nest-61574655906447/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-bold text-[#173F2E] hover:text-[#1877F2] transition-colors"
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
