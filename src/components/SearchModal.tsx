import React, { useState } from 'react';
import { X, Search, Star, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ParfaitProduct } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ParfaitProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-20 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EAE4D5] flex items-center gap-3 bg-[#FAF9F5]">
          <Search className="w-5 h-5 text-[#173F2E] shrink-0 ml-1" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parfaits, ingredients (e.g. strawberries, mango, chia)..."
            className="flex-1 bg-transparent text-sm text-[#173F2E] placeholder-[#7F9988] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[#EAE4D5] text-[#4A6454] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#5D7A68]">
              No parfaits found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-[#F6F3EC] transition-colors cursor-pointer border border-transparent hover:border-[#E8E2D5] group"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#F2EDE2] shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif text-sm font-bold text-[#173F2E]">{product.name}</h4>
                    <span className="text-[10px] bg-[#EBF4EE] text-[#173F2E] px-2 py-0.5 rounded-full font-semibold">
                      {product.calories}
                    </span>
                  </div>
                  <p className="text-xs text-[#5D7A68] line-clamp-1">{product.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-sm font-bold text-[#173F2E] block">
                    ₦{product.basePrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#2D6A4F] font-semibold flex items-center gap-1 justify-end">
                    <span>Order</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
