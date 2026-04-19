
import React from 'react';
import { AppState, View, ProblemType } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { ChevronLeft, Zap, Target, Flame, ArrowRight, ShieldCheck, Crown, Clock, Heart, BookOpen } from 'lucide-react';
import { TONICS, PROBLEM_TO_TONIC } from '../constants';

interface TrackerViewProps {
  state: AppState;
  onBack: () => void;
  onNavigate: (view: View) => void;
  toggleCheck: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const TrackerView: React.FC<TrackerViewProps> = ({ state, onBack, onNavigate, toggleCheck }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { date: today, mainTonic: false, complementary: [] };
  const mainTonicId = (state.user?.profile?.mainProblem ? PROBLEM_TO_TONIC[state.user.profile.mainProblem as ProblemType] : 'anti-broxada') || 'anti-broxada';
  const mainTonic = TONICS[mainTonicId];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
          <ChevronLeft size={20} /> Voltar
        </button>
        <span className="bg-[#E63946] text-white px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm tracking-tight flex items-center gap-2">
          <Zap size={14} className="text-white" /> Modo Turbo Ativo
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-black tracking-tight">Bônus de Aceleração</h1>
        <p className="text-gray-500 font-semibold text-[11px] tracking-tight">Acesso exclusivo aos materiais de elite.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tônico do Cavalo */}
        <GlassCard className="p-8 border-none bg-black text-white shadow-2xl space-y-6 relative overflow-hidden group cursor-pointer" onClick={() => onNavigate(View.EXCLUSIVE_PACKAGE)}>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
              <Flame size={24} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Tônico do Cavalo</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              A técnica de booster de vigor mais potente para aumentar o tamanho e a firmeza do amigão.
            </p>
            <div className="flex items-center gap-2 text-[#E63946] font-bold text-[11px] tracking-tight group-hover:translate-x-2 transition-transform">
              Ver Receita Secreta <ArrowRight size={14} />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </GlassCard>

        {/* 125 Posições */}
        <GlassCard className="p-8 border-none bg-white shadow-sm space-y-6 group cursor-pointer" onClick={() => onNavigate(View.EXCLUSIVE_PACKAGE_2)}>
          <div className="w-12 h-12 bg-gray-100 text-black rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <h3 className="text-2xl font-bold text-black tracking-tight">125 Posições</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            Manual de domínio para usar na cama. Técnicas que garantem o prazer dela do início ao fim.
          </p>
          <div className="flex items-center gap-2 text-black font-bold text-[11px] tracking-tight group-hover:translate-x-2 transition-transform">
            Abrir Manual <ArrowRight size={14} />
          </div>
        </GlassCard>

        {/* 20 Pensamentos Eróticos */}
        <GlassCard className="p-6 sm:p-8 border-none bg-white shadow-sm space-y-6 group cursor-pointer md:col-span-2" onClick={() => onNavigate(View.BONUSES)}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">20 Pensamentos Eróticos</h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                  Descubra o que realmente se passa na mente das mulheres durante o ato.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-pink-500 font-bold text-[11px] tracking-tight group-hover:translate-x-2 transition-transform sm:ml-auto">
              Entrar na Mente Dela <ArrowRight size={14} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="p-8 bg-gray-50 border border-gray-100 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-gray-400 tracking-tight">Atalhos de Progresso</h3>
            <button onClick={() => onNavigate(View.CHECKLIST)} className="text-[10px] font-bold text-[#E63946] tracking-tight hover:underline">Ver Checklist Completo</button>
        </div>
        
        <div 
          className={`p-6 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${todayCheck.mainTonic ? 'bg-black text-white' : 'bg-white border border-gray-100 shadow-sm'}`}
          onClick={() => toggleCheck(today, 'main')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${todayCheck.mainTonic ? 'bg-white/10' : 'bg-gray-100 text-[#E63946]'}`}>
              <Zap size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Tônico Principal de Hoje</h4>
              <p className="text-[10px] opacity-60 font-semibold">{mainTonic?.name}</p>
            </div>
          </div>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${todayCheck.mainTonic ? 'bg-[#E63946] border-[#E63946]' : 'border-gray-200'}`}>
            {todayCheck.mainTonic && <ShieldCheck size={16} className="text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
};
