import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, Plus, Eye, ShoppingBag, Check } from 'lucide-react';
import { ParfaitProduct } from '../types';
import { MENU_CATEGORIES, MenuCategory } from '../data/products';
import { BrandLogo } from './BrandLogo';
import { LoadingButton } from './LoadingButton';

interface MenuPageProps {
  products: ParfaitProduct[];
  initialCategory?: string;
  onSelectProduct: (product: ParfaitProduct) => void;
  onQuickAdd: (product: ParfaitProduct) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter products by active category
  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const currentCategoryMeta =
    MENU_CATEGORIES.find((c) => c.id === activeCategory) || MENU_CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
  };

  const handleQuickAddWithNotice = (product: ParfaitProduct) => {
    onQuickAdd(product);
    setAddedItemNotice(product.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  return (
    <div className="bg-[#FAF9F5] py-10 lg:py-16 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F1EB] text-[#173F2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Handcrafted Menu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173F2E] tracking-tight">
            Explore by Category
          </h1>
          <p className="text-sm sm:text-base text-[#526F5E] mt-2">
            Each recipe is crafted with thick probiotic Greek yogurt, fresh farm fruits, and crunchy honey-baked granola.
          </p>
        </div>

        {/* Temporary Added notification toast */}
        {addedItemNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#173F2E] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-semibold animate-in fade-in slide-in-from-bottom-5">
            <Check className="w-4 h-4 text-[#52B788]" />
            <span>Added &quot;{addedItemNotice}&quot; to your bowl!</span>
          </div>
        )}

        {/* Category Navigation Bar (Distinct subpage selector) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <LoadingButton
                key={cat.id}
                variant={isActive ? 'primary' : 'secondary'}
                size="md"
                onClick={() => handleCategoryChange(cat.id)}
                icon={<span className="text-sm">{cat.icon}</span>}
                className={`rounded-2xl transition-all ${
                  isActive
                    ? 'shadow-md scale-102 border-[#173F2E]'
                    : 'hover:border-[#173F2E]/40'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EAE4D5] text-[#173F2E]'
                  }`}
                >
                  {cat.id === 'all'
                    ? products.length
                    : products.filter((p) => p.category === cat.id).length}
                </span>
              </LoadingButton>
            );
          })}
        </div>

        {/* Active Category Banner */}
        <div className="bg-[#F3EFE6] rounded-2xl p-5 sm:p-6 mb-8 border border-[#E6DFCFA0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center text-xl">
              {currentCategoryMeta.icon}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#173F2E]">
                {currentCategoryMeta.name}
              </h2>
              <p className="text-xs text-[#5D7A68]">
                {currentCategoryMeta.shortDesc}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#173F2E] bg-white px-3 py-1 rounded-full border border-[#DED7C8]">
            Showing {filteredProducts.length} parfait{filteredProducts.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Products Grid for Active Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E5DFD1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F5F2EB]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Sticker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none drop-shadow-md">
                  <BrandLogo variant="sticker" className="transform scale-90" />
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-[#173F2E] shadow-2xs border border-[#ECE7DA]">
                    {product.badge}
                  </div>
                )}

                {/* Calorie pill */}
                <div className="absolute bottom-3 right-3 z-10 bg-black/60 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                  {product.calories}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#173F2E]">
                      {product.rating}
                    </span>
                    <span className="text-[11px] text-[#789584]">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#173F2E] group-hover:text-[#2D6A4F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#5D7A68] mt-1 mb-3 font-medium line-clamp-1">
                    {product.subtitle}
                  </p>

                  <p className="text-xs text-[#445E50] leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Ingredients preview */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {product.ingredients.slice(0, 4).map((ing, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#FAF7F0] text-[#345241] text-[10px] font-medium border border-[#E9E3D6]"
                      >
                        {ing}
                      </span>
                    ))}
                    {product.ingredients.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] text-[#718D7B]">
                        +{product.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions with Loading Effects */}
                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#718D7B] uppercase font-bold tracking-wider block">
                      Starting at
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[#173F2E] font-serif">
                      ₦{product.basePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Customize Button with micro loading effect */}
                    <LoadingButton
                      variant="primary"
                      size="sm"
                      onClick={() => onSelectProduct(product)}
                      icon={<ShoppingBag className="w-3.5 h-3.5" />}
                    >
                      Customize
                    </LoadingButton>

                    {/* Quick Add with micro loading effect */}
                    <LoadingButton
                      variant="secondary"
                      size="sm"
                      onClick={() => handleQuickAddWithNotice(product)}
                      icon={<Plus className="w-3.5 h-3.5" />}
                      title="Quick add regular size"
                    >
                      Quick Add
                    </LoadingButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
