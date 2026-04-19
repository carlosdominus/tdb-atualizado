
import React from 'react';
import { ProblemType, View } from '../types';
import { PROBLEMS_DATA, TONICS } from '../constants';
import { ChevronLeft, ArrowRight, Zap, Info } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';

interface ProblemDetailViewProps {
  type: ProblemType;
  onBack: () => void;
  onNavigate: (view: View, id?: string) => void;
  onTonicNavigate: (id: string) => void;
}

export const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({ type, onBack, onNavigate, onTonicNavigate }) => {
  const problem = PROBLEMS_DATA.find(p => p.id === type);

  if (!problem) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
          <ChevronLeft size={20} /> Voltar
        </button>
      </header>

      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-black tracking-tight uppercase">🔴 PROBLEMA: {problem.title.toUpperCase()}</h1>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-left">
          <h2 className="text-red-600 font-bold text-sm uppercase flex items-center gap-2 mb-2">
            <Info size={16} /> Causa Principal:
          </h2>
          <p className="text-red-900 text-sm leading-relaxed font-medium">
            {problem.cause}
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold text-black tracking-tight">Receitas Naturais Específicas</h2>
        <div className="grid grid-cols-1 gap-4">
          {problem.tonicIds.map((tonicId, index) => {
            const tonic = TONICS[tonicId];
            if (!tonic) return null;
            return (
              <GlassCard 
                key={tonic.id}
                onClick={() => onTonicNavigate(tonic.id)}
                className="p-6 cursor-pointer hover:border-[#E63946] group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                      <Zap size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Receita {index + 1}</span>
                      <h3 className="text-lg font-bold text-black">{tonic.name}</h3>
                      <p className="text-xs text-gray-400 font-medium">{tonic.timing}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-300 group-hover:text-[#E63946] group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-900 p-8 rounded-[32px] text-white space-y-4">
        <h3 className="text-lg font-bold tracking-tight">Dica de Especialista</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Para resultados máximos, combine as receitas com os exercícios de Kegel 3 vezes ao dia. 
          A constância é o que diferencia o sucesso do fracasso.
        </p>
        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => onNavigate(View.KEGELS)}
        >
          Ver Guia de Exercícios
        </Button>
      </section>
    </div>
  );
};
