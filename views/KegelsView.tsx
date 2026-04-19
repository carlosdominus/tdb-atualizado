
import React from 'react';
import { ChevronLeft, Activity, Target, ShieldCheck, Zap } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { KEGEL_EXERCISES, SPECIAL_TECHNIQUES } from '../constants';

interface KegelsViewProps {
  onBack: () => void;
}

export const KegelsView: React.FC<KegelsViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
          <ChevronLeft size={20} /> Voltar
        </button>
      </header>

      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-[#E63946] rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-100">
          <Activity size={14} /> Treinamento Muscular
        </div>
        <h1 className="text-3xl font-bold text-black tracking-tight">GUIA COMPLETO: EXERCÍCIOS DE KEGEL</h1>
        <p className="text-[#86868B] text-sm leading-relaxed max-w-sm mx-auto">
          Fortalecer o assoalho pélvico é o pilar mais importante para controle ejaculatório e firmeza total.
        </p>
      </section>

      <div className="bg-black text-white p-6 rounded-[24px] space-y-4 shadow-xl">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Target size={20} className="text-[#E63946]" /> Como fazer
        </h2>
        <p className="text-gray-400 text-sm">
          Simule interromper o jato de urina. Esse é o músculo que você deve contrair.
          <span className="block mt-2 font-bold text-white">Dica: Não prenda a respiração nem contraia o abdômen.</span>
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-black">A Rotina de Exercícios</h2>
        {KEGEL_EXERCISES.map((ex, i) => (
          <GlassCard key={i} className="p-6 space-y-4">
            <h3 className="font-bold text-black flex items-center gap-2">
              <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">{i + 1}</span>
              {ex.title}
            </h3>
            <ul className="space-y-2">
              {ex.how.map((step, si) => (
                <li key={si} className="flex items-start gap-3 text-sm text-gray-500">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E63946] shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-gray-50">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Frequência: {ex.frequency}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-black">Técnicas de Controle</h2>
        {SPECIAL_TECHNIQUES.map((tech, i) => (
          <GlassCard key={i} className="p-6 space-y-4 border-l-4 border-l-black">
            <h3 className="font-bold text-black text-lg">{tech.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{tech.description}</p>
            <ul className="space-y-2">
              {tech.how.map((step, si) => (
                <li key={si} className="flex items-start gap-3 text-sm text-gray-500">
                  <ShieldCheck size={16} className="text-green-500 shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>

      <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 text-center space-y-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm text-[#E63946]">
          <Zap size={32} />
        </div>
        <h3 className="text-lg font-bold text-black">Resultado Garantido</h3>
        <p className="text-gray-500 text-sm">
          Se você praticar os Kegels diariamente, em 4 semanas você notará uma diferença brutal na rigidez e duração.
        </p>
      </div>
    </div>
  );
};
