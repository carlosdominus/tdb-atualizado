
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  // Updated to allow MouseEvent for compatibility with DashboardView and other views
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  disabled = false
}) => {
  const baseStyles = "px-6 py-3.5 rounded-xl font-semibold tracking-tight text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "gradient-primary text-white shadow-[0_4px_16px_rgba(230,57,70,0.2)] hover:shadow-[0_8px_24px_rgba(230,57,70,0.3)] active:scale-[0.97] hover:scale-[1.01]",
    secondary: "bg-[#1C1C1E] text-white shadow-md hover:bg-black active:scale-[0.97]",
    outline: "border-[1.5px] border-[#1C1C1E] text-[#1C1C1E] hover:bg-gray-50 active:scale-[0.97]",
    ghost: "text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5"
  };

  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
