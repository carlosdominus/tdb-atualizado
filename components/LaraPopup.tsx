
import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface LaraPopupProps {
  onConfirm: () => void;
  isVisible: boolean;
  onClose: () => void;
}

export const LaraPopup: React.FC<LaraPopupProps> = ({ onConfirm, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <GlassCard className="max-w-sm w-full bg-white border-none shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 rounded-[32px]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
            <MessageCircle size={40} className="text-green-500 relative z-10" />
          </div>

          <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-4 leading-tight">
            Diagnóstico Individual com a Lara
          </h3>
          
          <p className="text-gray-600 text-sm font-medium mb-8 leading-relaxed">
            Tenha resultados mais <span className="text-black font-bold">rápido e mais certeiro</span> através do nosso suporte exclusivo via WhatsApp!
          </p>

          <div className="w-full space-y-3">
            <Button 
              variant="primary" 
              fullWidth 
              className="h-14 bg-green-500 hover:bg-green-600 border-none shadow-[0_10px_20px_rgba(34,197,94,0.3)]"
              onClick={onConfirm}
            >
              <div className="flex items-center justify-center gap-2">
                QUERO MEU DIAGNÓSTICO
                <ArrowRight size={18} />
              </div>
            </Button>
            
            <button 
              onClick={onClose}
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors py-2"
            >
              Talvez mais tarde
            </button>
          </div>
        </div>
        
        <div className="h-1.5 w-full bg-green-500" />
      </GlassCard>
    </div>
  );
};
