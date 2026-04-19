
import React from 'react';
import { ChevronLeft, Brain, ShieldAlert, Sparkles, Video } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';

interface AnxietyViewProps {
  onBack: () => void;
}

export const AnxietyView: React.FC<AnxietyViewProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#F8F9FA] flex flex-col animate-in fade-in duration-500">
      <header className="bg-white border-b border-gray-100 flex items-center justify-between px-6 py-4 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
            <ChevronLeft size={20} /> Voltar
          </button>
          <span className="font-bold text-[13px] tracking-tight text-black flex items-center gap-2">
            <Brain size={16} className="text-blue-600" /> MANUAL DA ANSIEDADE
          </span>
        </div>
        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest hidden sm:block">
          Exclusivo
        </div>
      </header>

      <div className="flex-1 w-full bg-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0">
          <p className="text-sm text-gray-400 font-medium mb-4">Carregando conteúdo do Protocolo...</p>
        </div>
        <iframe 
          src="https://drive.google.com/file/d/1ASHzvXuAzLR7cIhf672OLpOLeA-UZzqU/preview" 
          className="w-full h-full border-none relative z-10"
          allow="autoplay"
          referrerPolicy="no-referrer"
          title="Manual da Ansiedade"
        />
      </div>
    </div>
  );
};
