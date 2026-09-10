import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  simulateDelay?: number; // default ms to show loading indicator if action is immediate
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'unstyled' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'none';
  icon?: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading: externalLoading,
  loadingText,
  onClick,
  simulateDelay = 280,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = externalLoading ?? internalLoading;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || disabled) return;

    setInternalLoading(true);

    try {
      const result = onClick?.(e);
      if (result instanceof Promise) {
        await Promise.all([
          result,
          new Promise((resolve) => setTimeout(resolve, simulateDelay)),
        ]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, simulateDelay));
      }
    } finally {
      setInternalLoading(false);
    }
  };

  // Base styling variants
  let variantClasses = '';
  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-[#173F2E] hover:bg-[#23563F] text-white shadow-xs hover:shadow-md';
      break;
    case 'secondary':
      variantClasses =
        'bg-[#FAF7F0] hover:bg-[#F2ECE1] text-[#173F2E] border border-[#D9D3C5] shadow-2xs';
      break;
    case 'outline':
      variantClasses =
        'bg-white hover:bg-[#F6F4ED] text-[#173F2E] border border-[#C5D9CB]';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent hover:bg-[#EAE4D5]/50 text-[#173F2E]';
      break;
    case 'success':
      variantClasses =
        'bg-[#2D6A4F] hover:bg-[#245741] text-white shadow-xs';
      break;
    case 'unstyled':
    case 'none':
      variantClasses = '';
      break;
  }

  // Sizing
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'px-3.5 py-1.5 text-xs font-semibold rounded-full';
      break;
    case 'md':
      sizeClasses = 'px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full';
      break;
    case 'lg':
      sizeClasses = 'px-7 py-3.5 text-sm sm:text-base font-bold rounded-full';
      break;
    case 'icon':
      sizeClasses = 'p-2 rounded-full inline-flex items-center justify-center';
      break;
    case 'none':
      sizeClasses = '';
      break;
  }

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer active:scale-96 select-none ${variantClasses} ${sizeClasses} ${
        disabled || isLoading ? 'opacity-80 pointer-events-none' : ''
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-current" />
          {size !== 'icon' && (
            <span>{loadingText || children}</span>
          )}
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  );
};
