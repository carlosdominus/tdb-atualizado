
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverEffect = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        glass rounded-xl p-6 
        transition-all duration-300 
        ${onClick ? 'cursor-pointer active:scale-[0.99] active:brightness-95' : ''} 
        ${hoverEffect ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
