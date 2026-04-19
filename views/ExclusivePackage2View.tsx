
import React from 'react';
import { ChevronLeft, BookOpen, Download } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackage2ViewProps {
  onBack: () => void;
}

export const ExclusivePackage2View: React.FC<ExclusivePackage2ViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#F8F9FA] flex flex-col animate-in fade-in duration-500 overflow-hidden">
      <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4 z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
            <ChevronLeft size={20} /> Voltar
          </button>
          <span className="font-bold text-[13px] tracking-tight text-black flex items-center gap-2 uppercase">
            <BookOpen size={16} className="text-[#E63946]" /> BIBLIOTECA VIP
          </span>
        </div>
        <div className="bg-[#E63946] text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
          Premium
        </div>
      </header>

      <div className="flex-1 overflow-y-auto w-full bg-black">
        <div className="p-8 text-center bg-black">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">125 Posições Sexuais</h1>
          <p className="text-white/40 font-semibold text-[11px] tracking-tight uppercase">Manuais e Guias de Domínio Corporal</p>
        </div>

        <div className="space-y-0">
          <div className="bg-gray-900 border-y border-white/5 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-1 h-5 gradient-primary rounded-full"></div>
               <h2 className="text-sm font-bold text-white uppercase tracking-widest">Volume 01: Fundamentos</h2>
             </div>
             <span className="text-[9px] font-black text-white/30 uppercase tracking-tighter">Posições 01-60</span>
          </div>
          <div className="w-full aspect-[4/7] bg-zinc-900">
             <iframe 
                src="https://drive.google.com/file/d/1rYLln70gHfTpU_57oU5baKIz0nqABclY/preview" 
                className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                allowFullScreen={true}
                title="Volume 01"
              ></iframe>
          </div>

          <div className="bg-gray-900 border-y border-white/5 px-6 py-4 sticky top-0 z-10 flex items-center justify-between mt-0">
             <div className="flex items-center gap-3">
               <div className="w-1 h-5 gradient-primary rounded-full"></div>
               <h2 className="text-sm font-bold text-white uppercase tracking-widest">Volume 02: Performance</h2>
             </div>
             <span className="text-[9px] font-black text-white/30 uppercase tracking-tighter">Posições 61-125</span>
          </div>
          <div className="w-full aspect-[4/7] bg-zinc-900">
             <iframe 
                src="https://drive.google.com/file/d/1i6WheI8SUpHrRee61MrwqpJnyOdYh2_d/preview" 
                className="w-full h-full border-none opacity-90 hover:opacity-100 transition-opacity"
                allowFullScreen={true}
                title="Volume 02"
              ></iframe>
          </div>
        </div>

        <div className="p-10 text-center bg-black">
           <Download size={32} className="mx-auto text-[#E63946] mb-4" />
           <p className="text-sm text-white/40 font-medium">Fim do conteúdo VIP</p>
        </div>
      </div>
    </div>
  );
};
