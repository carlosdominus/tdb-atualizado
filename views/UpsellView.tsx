
import React from 'react';
import { X } from 'lucide-react';

interface UpsellViewProps {
  onBack: () => void;
}

export const UpsellView: React.FC<UpsellViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-40 bg-white flex flex-col">
      {/* Floating Close Button */}
      <button 
        onClick={onBack}
        className="fixed top-6 right-6 z-[110] w-12 h-12 bg-black hover:bg-zinc-800 text-white transition-all rounded-full flex items-center justify-center shadow-2xl group border-2 border-white/20"
        title="Fechar Oferta"
      >
        <X size={28} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
      </button>

      {/* External Page Iframe */}
      <div className="flex-1 w-full bg-white">
        <iframe 
          src="https://novidadesdeagora.site/ltc/aba-lateral/" 
          className="w-full h-full border-none"
          title="Oferta Especial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
