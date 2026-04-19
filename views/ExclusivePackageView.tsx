
import React from 'react';
import { ChevronLeft, Crown, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface ExclusivePackageViewProps {
  onBack: () => void;
}

export const ExclusivePackageView: React.FC<ExclusivePackageViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-500">
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 py-4 z-50 shadow-sm text-white">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-semibold text-sm tracking-tight">
            <ChevronLeft size={20} /> Voltar
          </button>
          <span className="font-bold text-[13px] tracking-tight flex items-center gap-2">
            <Crown size={16} className="text-[#E63946]" /> CONTEÚDO ELITE
          </span>
        </div>
        <div className="bg-[#E63946] text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
          VIP
        </div>
      </header>

      <div className="flex-1 w-full relative flex flex-col">
        <div className="p-8 text-center pt-12">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Tônico do Cavalo</h1>
          <p className="text-white/40 font-semibold text-[11px] tracking-tight uppercase">Estratégia Avançada de Performance</p>
        </div>

        <div className="px-0 flex-1 flex items-center">
          <div className="w-full" style={{ position: 'relative', paddingTop: '56.25%' }}>
            <iframe 
              id="panda-986c4e76-193f-494e-be5f-f907c5f07f9e" 
              src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=986c4e76-193f-494e-be5f-f907c5f07f9e" 
              style={{ border: 'none', position: 'absolute', top: 0, left: 0 }} 
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
              allowFullScreen={true} 
              width="100%" 
              height="100%" 
              // @ts-ignore
              fetchpriority="high"
            ></iframe>
          </div>
        </div>

        <div className="p-8 bg-white/5 backdrop-blur-md m-6 rounded-[32px] border border-white/10 flex items-center gap-6 mt-auto">
          <div className="w-14 h-14 gradient-primary text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-tight text-sm">Acesso Permanente</h4>
            <p className="text-xs text-white/40 font-medium">Consulte esta técnica sempre que precisar de um booster de vigor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
