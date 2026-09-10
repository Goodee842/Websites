import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SimpleHomeView } from './components/SimpleHomeView';
import { MenuPage } from './components/MenuPage';
import { WhyFruityNest } from './components/WhyFruityNest';
import { BrandStory } from './components/BrandStory';
import { CustomerReviews } from './components/CustomerReviews';
import { InstagramMoments } from './components/InstagramMoments';
import { DeliverySection } from './components/DeliverySection';
import { ContactSection } from './components/ContactSection';
import { LocationsSection } from './components/LocationsSection';
import { Footer } from './components/Footer';

import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { VerifiedReviewModal } from './components/VerifiedReviewModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { SearchModal } from './components/SearchModal';
import { CustomerLoginModal } from './components/CustomerLoginModal';

import { CartItem, CustomerReview, Order, ParfaitProduct, SizeOption, ToppingOption } from './types';
import { PRODUCTS, SIZES } from './data/products';
import { getStoredReviews } from './data/reviews';

export default function App() {
  // Navigation state: default to home
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('all');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fruitynest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>(() => getStoredReviews());

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ParfaitProduct | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewOrder, setReviewOrder] = useState<Order | null>(null);
  const [initialReviewCode, setInitialReviewCode] = useState('');

  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Customer Email OTP Login & Transaction History state
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('fruitynest_user_email');
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Dark and Light Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('fruitynest_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('fruitynest_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('fruitynest_theme', 'light');
      }
    } catch (e) {
      console.error('Failed to sync theme to localStorage', e);
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    try {
      localStorage.setItem('fruitynest_user_email', email);
    } catch (e) {
      console.error('Failed to save user email', e);
    }
  };

  const handleLogout = () => {
    setUserEmail(null);
    try {
      localStorage.removeItem('fruitynest_user_email');
    } catch (e) {
      console.error('Failed to clear user email', e);
    }
  };

  const handleReorderItems = (itemsToReorder: CartItem[]) => {
    setCartItems((prev) => [...prev, ...itemsToReorder]);
    setIsCartOpen(true);
  };

  const handleTrackPastOrder = (order: Order) => {
    setActiveOrder(order);
    setIsTrackOrderOpen(true);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fruitynest_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to sync cart to storage', e);
    }
  }, [cartItems]);

  // Check URL hash on load for unique review links (e.g. #review?code=842910)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#review')) {
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const code = params.get('code') || '';
        if (code) {
          setInitialReviewCode(decodeURIComponent(code));
          setIsReviewModalOpen(true);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Page navigation handler - strict routing for Home, Product, Reviews, Locations, Contact
  const handleNavigate = (target: string, category?: string) => {
    let page = target;
    if (target === 'hero' || target === 'home') page = 'home';
    if (target === 'product' || target === 'products' || target === 'menu' || target === 'shop' || target === 'bestsellers') {
      page = 'product';
      setActiveMenuCategory(category || 'all');
    }
    if (target === 'reviews' || target === 'review') {
      page = 'reviews';
    }
    if (target === 'locations' || target === 'location' || target === 'delivery') {
      page = 'locations';
    }
    if (target === 'contact') {
      page = 'contact';
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open product customization modal
  const handleSelectProduct = (product: ParfaitProduct) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Quick add to cart (default Regular size, Classic base, no extra toppings)
  const handleQuickAdd = (product: ParfaitProduct) => {
    const regularSize = SIZES[0];
    const cartItemId = `${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      cartItemId,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      size: regularSize,
      yogurtType: 'Sweetened Greek Yogurt',
      toppings: [],
      unitPrice: product.basePrice,
      quantity: 1,
      totalPrice: product.basePrice,
    };

    setCartItems((prev) => {
      // Check if exact same config already in cart
      const existing = prev.find(
        (item) =>
          item.productId === product.id &&
          item.size.id === regularSize.id &&
          item.toppings.length === 0
      );
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === existing.cartItemId
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.unitPrice,
              }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  // Add customized item from product modal
  const handleAddCustomizedToCart = (params: {
    product: ParfaitProduct;
    size: SizeOption;
    yogurtType: string;
    toppings: ToppingOption[];
    specialNotes: string;
    quantity: number;
    unitPrice: number;
  }) => {
    const cartItemId = `${params.product.id}-${Date.now()}`;
    const newItem: CartItem = {
      cartItemId,
      productId: params.product.id,
      productName: params.product.name,
      productImage: params.product.image,
      size: params.size,
      yogurtType: params.yogurtType,
      toppings: params.toppings,
      specialNotes: params.specialNotes,
      unitPrice: params.unitPrice,
      quantity: params.quantity,
      totalPrice: params.unitPrice * params.quantity,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Cart quantity controls
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Proceed to Checkout
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Completed
  const handleOrderCompleted = (order: Order) => {
    setActiveOrder(order);
    setCartItems([]); // clear cart
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
  };

  // Open review modal from order
  const handleOpenReviewForOrder = (order: Order) => {
    setReviewOrder(order);
    setInitialReviewCode(order.dispatchCode);
    setIsSuccessModalOpen(false);
    setIsTrackOrderOpen(false);
    setIsReviewModalOpen(true);
  };

  // When review is submitted
  const handleReviewSubmitted = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E2922] dark:bg-[#0c1811] dark:text-[#e5f0e9] transition-colors duration-200">
      {/* 1. Header with Cart & Track Order */}
      <Header
        cartCount={totalCartCount}
        currentPage={currentPage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        userEmail={userEmail}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content: Dynamic single-view based on current page */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <SimpleHomeView
            sampleProducts={[PRODUCTS[0], PRODUCTS[1]]}
            reviews={reviews}
            onOrderNow={(product) => handleSelectProduct(product)}
            onQuickAdd={handleQuickAdd}
            onExploreMenu={() => handleNavigate('product')}
            onOpenReviewModal={() => {
              setReviewOrder(null);
              setInitialReviewCode('');
              setIsReviewModalOpen(true);
            }}
            onViewAllReviews={() => handleNavigate('reviews')}
          />
        )}

        {(currentPage === 'product' || currentPage === 'menu') && (
          <MenuPage
            products={PRODUCTS}
            initialCategory={activeMenuCategory}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {currentPage === 'reviews' && (
          <div className="py-4 sm:py-8">
            <CustomerReviews
              reviews={reviews}
              onOpenReviewModal={() => {
                setReviewOrder(null);
                setInitialReviewCode('');
                setIsReviewModalOpen(true);
              }}
              onAddReview={handleReviewSubmitted}
            />
          </div>
        )}

        {(currentPage === 'locations' || currentPage === 'delivery') && (
          <LocationsSection
            onOrderForPickup={() => handleNavigate('product')}
            onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <div className="py-4 sm:py-8">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      {/* MODALS & DRAWERS */}

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddCustomizedToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        userEmail={userEmail}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Guest Checkout Modal (Order & Direct Payment) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={handleOrderCompleted}
        userEmail={userEmail}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Order Success & Order Code Modal */}
      <OrderSuccessModal
        order={activeOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenReviewModal={handleOpenReviewForOrder}
      />

      {/* Verified Customer Review Modal */}
      <VerifiedReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewOrder(null);
          setInitialReviewCode('');
        }}
        order={reviewOrder}
        initialCode={initialReviewCode}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* Track Order with Order Code Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        onOpenReviewModal={handleOpenReviewForOrder}
      />

      {/* Search Parfaits Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Customer Email OTP Login & Past Orders Modal */}
      <CustomerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        userEmail={userEmail}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        onReorderItems={handleReorderItems}
        onTrackOrder={handleTrackPastOrder}
        onOpenReview={handleOpenReviewForOrder}
      />
    </div>
  );
}
