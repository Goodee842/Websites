import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'sticker' | 'mark' | 'circle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
}) => {
  // Size mapping for circular stickers/emblems (strictly 1:1 aspect-ratio, guaranteed perfect circles)
  const sizeClasses = {
    sm: 'w-16 h-16 text-[9px]',
    md: 'w-24 h-24 sm:w-28 sm:h-28 text-xs',
    lg: 'w-28 h-28 sm:w-32 sm:h-32 text-sm',
    xl: 'w-36 h-36 sm:w-40 sm:h-40 text-base',
  };

  // Pure circular emblem: Matches 515805572_122125625270821863_7566394113420124842_n.jpg
  if (variant === 'sticker' || variant === 'circle') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full aspect-square bg-[#FAF7F0] border-2 border-[#E4DEC0] shadow-lg select-none shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Leaf accent directly on top */}
          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#173F2E] mb-0.5">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full transform -rotate-12 drop-shadow-2xs"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>

          {/* Rounded Box with FRUITY NEST */}
          <div className="border-[2.5px] border-[#173F2E] rounded-xl sm:rounded-2xl px-2.5 py-1 sm:px-3 sm:py-1.5 text-center bg-transparent">
            <div className="font-sans font-black tracking-wider text-[#173F2E] text-[10px] sm:text-xs leading-none">
              FRUITY
            </div>
            <div className="font-sans font-black tracking-wider text-[#173F2E] text-[10px] sm:text-xs leading-none mt-0.5 sm:mt-1">
              NEST
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Circular Emblem Mark */}
        <div className="w-14 h-14 rounded-full aspect-square bg-[#FAF7F0] border-2 border-[#E4DEC0] shadow-md flex flex-col items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 text-[#173F2E] mb-0.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-12">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
          <div className="border-[1.5px] border-[#173F2E] rounded-md px-1.5 py-0.5 text-center bg-transparent">
            <span className="font-sans font-black text-[8px] tracking-tight text-[#173F2E] leading-none block">
              FN
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-serif tracking-tight font-bold text-white text-lg sm:text-xl leading-none uppercase">
            Fruity Nest
          </span>
          <span className="text-[10px] tracking-widest text-[#52B788] font-semibold uppercase mt-1">
            Fresh Greek Yogurt Parfaits
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'mark') {
    return (
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full aspect-square bg-[#FAF7F0] border-2 border-[#173F2E]/25 shadow-xs flex flex-col items-center justify-center select-none shrink-0 ${className}`}
      >
        <div className="w-2.5 h-2.5 text-[#173F2E] -mb-0.5">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-12">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
        <div className="border-[1.5px] border-[#173F2E] rounded-md px-1 py-0 text-center bg-transparent">
          <span className="font-sans font-black text-[8px] tracking-tight text-[#173F2E] leading-none block">
            FN
          </span>
        </div>
      </div>
    );
  }

  // Default horizontal navigation format: fully circular badge + brand text
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 100% Round/Circle Brand Badge */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full aspect-square bg-[#FAF7F0] dark:bg-[#162A1F] border-2 border-[#173F2E]/25 dark:border-[#52B788]/40 shadow-2xs flex flex-col items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 text-[#173F2E] dark:text-[#52B788] -mb-0.5">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full -rotate-12">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>
        <div className="border-[1.5px] border-[#173F2E] dark:border-[#52B788] rounded-md px-1 py-0 text-center bg-transparent">
          <span className="font-sans font-black text-[8px] tracking-tight text-[#173F2E] dark:text-[#EAF4EE] leading-none block">
            FN
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-serif tracking-tight font-bold text-[#173F2E] dark:text-[#EAF4EE] text-lg sm:text-xl leading-none uppercase">
          Fruity Nest
        </span>
        <span className="text-[10px] tracking-widest text-[#245840] dark:text-[#52B788] font-medium uppercase mt-0.5">
          Fresh Parfaits
        </span>
      </div>
    </div>
  );
};
