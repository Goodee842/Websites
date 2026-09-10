import React, { useState } from 'react';
import { X, Plus, Minus, Star, Check, Sparkles, ShoppingBag, Loader2 } from 'lucide-react';
import { ParfaitProduct, SizeOption, ToppingOption } from '../types';
import { SIZES, YOGURT_BASES, TOPPINGS } from '../data/products';

interface ProductModalProps {
  product: ParfaitProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (params: {
    product: ParfaitProduct;
    size: SizeOption;
    yogurtType: string;
    toppings: ToppingOption[];
    specialNotes: string;
    quantity: number;
    unitPrice: number;
  }) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[0]);
  const [selectedYogurt, setSelectedYogurt] = useState<string>(YOGURT_BASES[0].name);
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Calculate unit price based on size and toppings
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = product.basePrice + selectedSize.priceOffset + toppingsTotal;
  const grandTotal = unitPrice * quantity;

  const toggleTopping = (topping: ToppingOption) => {
    setSelectedToppings((prev) => {
      const exists = prev.find((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const handleAdd = async () => {
    if (isLoading || isSuccess) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 380));
    setIsLoading(false);
    onAddToCart({
      product,
      size: selectedSize,
      yogurtType: selectedYogurt,
      toppings: selectedToppings,
      specialNotes,
      quantity,
      unitPrice,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto flex-1">
          {/* Product Banner Image */}
          <div className="relative w-full h-56 sm:h-64 bg-[#F2EDE2]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F9A826] text-[#F9A826]" />
                ))}
                <span className="text-xs font-bold ml-1">{product.rating.toFixed(1)}</span>
                <span className="text-[11px] text-white/80">({product.reviewCount} reviews)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {product.name}
              </h2>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Description & Calories */}
            <div>
              <p className="text-sm text-[#4A6454] leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F2EFE8] text-[#173F2E]"
                  >
                    {ing}
                  </span>
                ))}
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EBF3ED] text-[#2D6A4F]">
                  ⚡ {product.calories}
                </span>
              </div>
            </div>

            {/* 1. Size Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-2.5">
                1. Choose Size
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedSize.id === size.id
                        ? 'border-[#173F2E] bg-[#F1F6F3] text-[#173F2E] ring-1 ring-[#173F2E]'
                        : 'border-[#E5DFD1] hover:border-[#C4BCAB] bg-white text-[#3E5848]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{size.name}</span>
                      {selectedSize.id === size.id && (
                        <Check className="w-3.5 h-3.5 text-[#173F2E]" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#6E8777] block mt-0.5">{size.volume}</span>
                    <span className="text-xs font-semibold block mt-1 text-[#173F2E]">
                      {size.priceOffset === 0 ? 'Base' : `+₦${size.priceOffset.toLocaleString()}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Greek Yogurt Base */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-2.5">
                2. Select Greek Yogurt Base
              </label>
              <div className="space-y-2">
                {YOGURT_BASES.map((base) => (
                  <label
                    key={base.id}
                    onClick={() => setSelectedYogurt(base.name)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedYogurt === base.name
                        ? 'border-[#173F2E] bg-[#F1F6F3] text-[#173F2E]'
                        : 'border-[#EAE4D7] hover:border-[#D1C9B7] bg-white text-[#4A6454]'
                    }`}
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-semibold block">{base.name}</span>
                      <span className="text-[11px] text-[#6E8777]">{base.desc}</span>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedYogurt === base.name
                          ? 'border-[#173F2E] bg-[#173F2E]'
                          : 'border-[#A39985]'
                      }`}
                    >
                      {selectedYogurt === base.name && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Add-on Toppings */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-2.5">
                3. Extra Crunchy Toppings (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOPPINGS.map((topping) => {
                  const isChecked = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#173F2E] bg-[#F1F6F3] text-[#173F2E]'
                          : 'border-[#EAE4D7] hover:border-[#D1C9B7] bg-white text-[#3E5848]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{topping.icon}</span>
                        <span className="text-xs font-medium">{topping.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#173F2E]">
                          +₦{topping.price.toLocaleString()}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked
                              ? 'border-[#173F2E] bg-[#173F2E] text-white'
                              : 'border-[#A39985]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Special Kitchen Instructions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#173F2E] mb-1.5">
                Special Kitchen Instructions
              </label>
              <input
                type="text"
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                placeholder="e.g. Please pack granola in a separate container, extra cold..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DFD1] text-xs text-[#1E2922] placeholder-[#8EA395] focus:outline-none focus:ring-2 focus:ring-[#173F2E]/20 focus:border-[#173F2E] bg-[#FAF8F3]"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer with live quantity & Add to Cart */}
        <div className="p-4 sm:p-5 border-t border-[#EAE4D5] bg-[#FAF9F5] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-white rounded-full border border-[#DCD6C7] p-1 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#173F2E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-sm text-[#173F2E] w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#173F2E] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            disabled={isSuccess || isLoading}
            className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
              isSuccess
                ? 'bg-[#2D6A4F] text-white scale-98'
                : 'bg-[#173F2E] hover:bg-[#23563F] text-white active:scale-98'
            } ${isLoading ? 'opacity-90 pointer-events-none' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Preparing Your Bowl...</span>
              </>
            ) : isSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₦{grandTotal.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
