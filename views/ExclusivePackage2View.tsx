
import React from 'react';
import { ChevronLeft, BookOpen, Download } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackage2ViewProps {
  onBack: () => void;
}

export const ExclusivePackage2View: React.FC<ExclusivePackage2ViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-[#E63946] text-white px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm tracking-tight flex items-center gap-2">
          <BookOpen size={12} className="text-white" /> Biblioteca VIP
        </span>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-black tracking-tight mb-1">125 Posições Sexuais</h1>
        <p className="text-[#86868B] font-semibold text-[11px] tracking-tight">Manuais e Guias de Domínio</p>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4 ml-2">
            <div className="w-1.5 h-6 gradient-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-black tracking-tight">Volume 01: Fundamentos</h2>
          </div>
          <GlassCard className="p-0 overflow-hidden shadow-lg border-none bg-white rounded-3xl">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '140%' }}>
              <iframe 
                src="https://drive.google.com/file/d/1rYLln70gHfTpU_57oU5baKIz0nqABclY/preview" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                allowFullScreen={true}
              ></iframe>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 ml-2">
            <div className="w-1.5 h-6 gradient-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-black tracking-tight">Volume 02: Performance</h2>
          </div>
          <GlassCard className="p-0 overflow-hidden shadow-lg border-none bg-white rounded-3xl">
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '140%' }}>
              <iframe 
                src="https://drive.google.com/file/d/1i6WheI8SUpHrRee61MrwqpJnyOdYh2_d/preview" 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                allowFullScreen={true}
              ></iframe>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="p-8 bg-black text-white rounded-3xl flex items-center gap-6 shadow-xl">
        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm border border-white/10">
          <Download size={28} />
        </div>
        <div>
          <h4 className="font-bold tracking-tight">Leitura Recomendada</h4>
          <p className="text-xs text-gray-400 font-medium mt-1">Estes guias complementam o seu tratamento bioquímico com técnica pura.</p>
        </div>
      </div>
    </div>
  );
};
