import React, { useState } from 'react';
import { Star, Plus, Eye, Check, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ParfaitProduct } from '../types';

interface BestSellersProps {
  onSelectProduct: (product: ParfaitProduct) => void;
  onQuickAdd: (product: ParfaitProduct) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onSelectProduct, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'bestsellers' | 'tropical' | 'berries'>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Parfaits' },
    { id: 'bestsellers', label: 'Best Sellers' },
    { id: 'berries', label: 'Berry Specials' },
    { id: 'tropical', label: 'Tropical Fruits' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'bestsellers') return p.isBestSeller;
    return p.category === activeCategory;
  });

  const handleQuickAdd = (product: ParfaitProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <section id="bestsellers" className="py-16 lg:py-24 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D6A4F] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Menu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173F2E] tracking-tight">
              Best Sellers
            </h2>
            <p className="text-[#5D7A68] text-sm sm:text-base mt-1">
              Our most loved parfaits, made fresh daily with hand-picked fruits.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#173F2E] text-white shadow-xs'
                    : 'bg-[#EDE9DE] text-[#365342] hover:bg-[#E2DDD0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E9E4D8] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-[#F4EFE5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#173F2E]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick preview hover button */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="bg-white/95 text-[#173F2E] text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Customize & Order</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                      ))}
                      <span className="text-xs font-semibold text-[#173F2E] ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                      <span className="text-[11px] text-[#7A9584]">({product.reviewCount})</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-[#173F2E] group-hover:text-[#23563F] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Subtitle / summary */}
                    <p className="text-xs text-[#5D7A68] mt-1 line-clamp-2 leading-relaxed">
                      {product.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F2ECE1] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-[#6E8777] block uppercase font-medium">
                        Starting from
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#173F2E]">
                        ₦{product.basePrice.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                        isAdded
                          ? 'bg-[#2D6A4F] text-white scale-105'
                          : 'bg-[#173F2E] hover:bg-[#23563F] text-white active:scale-95'
                      }`}
                      title="Quick Add to Cart"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom promo banner */}
        <div className="mt-12 bg-[#F1EFE8] rounded-3xl p-6 sm:p-8 border border-[#E4DFD2] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#173F2E] text-white flex items-center justify-center text-xl shrink-0">
              🍯
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#173F2E]">
                Looking for a custom parfait bowl?
              </h4>
              <p className="text-xs sm:text-sm text-[#5D7A68]">
                Every parfait can be tailored with your choice of size, yogurt sweetness, and gourmet toppings.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectProduct(PRODUCTS[0])}
            className="whitespace-nowrap px-6 py-2.5 bg-[#173F2E] text-white rounded-full text-xs sm:text-sm font-semibold hover:bg-[#23563F] transition-colors cursor-pointer shadow-xs"
          >
            Build Your Bowl →
          </button>
        </div>
      </div>
    </section>
  );
};
