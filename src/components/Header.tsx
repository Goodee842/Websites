import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Clock, ShieldCheck, MapPin, User, History, KeyRound, Sun, Moon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LoadingButton } from './LoadingButton';

interface HeaderProps {
  cartCount: number;
  currentPage: string;
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onNavigate: (page: string) => void;
  onOpenSearch: () => void;
  userEmail?: string | null;
  onOpenLogin?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  currentPage,
  onOpenCart,
  onOpenTrackOrder,
  onNavigate,
  onOpenSearch,
  userEmail,
  onOpenLogin,
  isDarkMode = false,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'Product', target: 'product' },
    { label: 'Reviews', target: 'reviews' },
    { label: 'Locations', target: 'locations' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Announcement top bar */}
      <div className="bg-[#173F2E] dark:bg-[#0b1710] text-[#FAF7F0] text-xs py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-[#52B788] animate-pulse"></span>
            <span>Handcrafted fresh daily • Zero preservatives • Greek Yogurt Parfaits</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#D8E2DC]">
            <button
              onClick={onOpenTrackOrder}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer underline underline-offset-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
              <span>Track with Phone Number</span>
            </button>
            <span className="text-[#52B788]/60">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#52B788]" />
              <span>Express Delivery (30-45 mins)</span>
            </span>
            {onToggleTheme && (
              <>
                <span className="text-[#52B788]/60">•</span>
                <button
                  id="theme-toggle-announcement"
                  type="button"
                  onClick={onToggleTheme}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3 h-3 text-[#F9A826]" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3 h-3 text-[#52B788]" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 dark:bg-[#0c1811]/90 backdrop-blur-md border-b border-[#EAE6DD] dark:border-[#203b2c] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left cursor-pointer focus:outline-none"
            aria-label="Fruity Nest Home"
          >
            <BrandLogo variant="horizontal" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.target;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.target)}
                  className={`text-sm font-semibold transition-colors relative py-1 cursor-pointer group ${
                    isActive
                      ? 'text-[#173F2E] dark:text-[#EAF4EE]'
                      : 'text-[#476353] dark:text-[#9CB9A7] hover:text-[#173F2E] dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#173F2E] dark:bg-[#52B788] transition-all duration-200 rounded-full ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search icon button */}
            <LoadingButton
              variant="unstyled"
              size="icon"
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#2C4A3A] dark:text-[#D8EADB] hover:bg-[#EAE5D9] dark:hover:bg-[#1C3627] transition-colors cursor-pointer"
              aria-label="Search parfaits"
              title="Search parfaits"
            >
              <Search className="w-5 h-5" />
            </LoadingButton>

            {/* Track Order button (pill style) */}
            <LoadingButton
              variant="unstyled"
              size="none"
              onClick={onOpenTrackOrder}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#173F2E] dark:text-[#D8EADB] bg-[#E9EFE9] dark:bg-[#193527] hover:bg-[#D7E3D7] dark:hover:bg-[#204432] rounded-full transition-colors cursor-pointer border border-[#C5D7C5] dark:border-[#2C523D]"
            >
              <ShieldCheck className="w-4 h-4 text-[#173F2E] dark:text-[#52B788]" />
              <span>Track Order</span>
            </LoadingButton>

            {/* Login / Orders button - strictly NOT shown on homepage for desktop */}
            {currentPage !== 'home' && onOpenLogin && (
              <LoadingButton
                variant="unstyled"
                size="none"
                onClick={onOpenLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#173F2E] dark:text-[#D8EADB] bg-[#FAF7F0] dark:bg-[#162A1F] hover:bg-[#EAE5D9] dark:hover:bg-[#223E2E] rounded-full transition-colors cursor-pointer border border-[#DCD6C7] dark:border-[#2C4E39]"
                title={userEmail ? `Logged in as ${userEmail}` : 'Log in with Email OTP'}
              >
                {userEmail ? (
                  <>
                    <History className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                    <span className="max-w-[105px] truncate">{userEmail.split('@')[0]}</span>
                  </>
                ) : (
                  <>
                    <User className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788]" />
                    <span>Log In</span>
                  </>
                )}
              </LoadingButton>
            )}

            {/* Shopping Bag with dynamic badge */}
            <LoadingButton
              variant="unstyled"
              size="none"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#173F2E] dark:bg-[#235840] text-white hover:bg-[#23563F] dark:hover:bg-[#2E6E50] transition-all shadow-sm cursor-pointer flex items-center justify-center group active:scale-95"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#D90429] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF9F5] dark:border-[#0c1811] shadow-sm">
                  {cartCount}
                </span>
              )}
            </LoadingButton>

            {/* Dark/Light Mode Small Toggle Button (Top Right Corner) */}
            {onToggleTheme && (
              <button
                id="theme-mode-toggle"
                type="button"
                onClick={onToggleTheme}
                className="relative inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full text-[#2C4A3A] dark:text-[#E2EDE6] bg-[#FAF7F0] dark:bg-[#15271E] hover:bg-[#EAE5D9] dark:hover:bg-[#203D2D] border border-[#DCD6C7] dark:border-[#2C4E39] transition-all cursor-pointer shadow-2xs group active:scale-95"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#F9A826] transition-transform duration-300 group-hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#173F2E] transition-transform duration-300 group-hover:-rotate-12" />
                )}
                <span className="sr-only">
                  {isDarkMode ? 'Toggle light mode' : 'Toggle dark mode'}
                </span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C4A3A] dark:text-[#D8EADB] hover:bg-[#EAE5D9] dark:hover:bg-[#1C3627] lg:hidden cursor-pointer ml-0.5"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE6DD] dark:border-[#203b2c] bg-[#FAF9F5] dark:bg-[#0c1811] px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = currentPage === link.target;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.target)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#173F2E] dark:bg-[#235840] text-white'
                      : 'text-[#2C4A3A] dark:text-[#D8EADB] hover:bg-[#EAE5D9] dark:hover:bg-[#193223] hover:text-[#173F2E]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#52B788]" />}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#EAE6DD] dark:border-[#203b2c] flex flex-col gap-2">
              {/* Theme Toggle inside Mobile Menu */}
              {onToggleTheme && (
                <button
                  onClick={() => {
                    onToggleTheme();
                  }}
                  className="w-full py-2.5 px-3.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between bg-[#FAF7F0] dark:bg-[#15271E] border border-[#E0D9CA] dark:border-[#264332] text-[#173F2E] dark:text-[#E2EDE6] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {isDarkMode ? (
                      <Sun className="w-4 h-4 text-[#F9A826]" />
                    ) : (
                      <Moon className="w-4 h-4 text-[#2D6A4F]" />
                    )}
                    <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAE5D9] dark:bg-[#203D2D] text-[#4A6454] dark:text-[#A7C7B5] font-medium">
                    {isDarkMode ? 'Dark Active' : 'Light Active'}
                  </span>
                </button>
              )}

              {/* Customer Login / Orders in Mobile Menu */}
              {onOpenLogin && (
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-[#173F2E] dark:text-[#E2EDE6] bg-[#FAF7F0] dark:bg-[#15271E] border border-[#E0D9CA] dark:border-[#264332] flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  {userEmail ? (
                    <>
                      <History className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                      <span className="truncate">My Order History ({userEmail.split('@')[0]})</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-[#B46A14]" />
                      <span>Customer Login (Email OTP)</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  onOpenTrackOrder();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-[#173F2E] dark:text-[#E2EDE6] bg-[#E9EFE9] dark:bg-[#173325] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                Track Order with Phone Number
              </button>
              <button
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-lg text-sm font-semibold text-white bg-[#173F2E] dark:bg-[#235840] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                View Cart ({cartCount} items)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
