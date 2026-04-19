
import React from 'react';
import { AppState, View, ProblemType, DailyChecklist } from '../types.ts';
import { TONICS, PROBLEM_TO_TONIC } from '../constants.tsx';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { CheckCircle2, Clock, Calendar, TrendingUp, ArrowRight, Circle, ChevronRight, Zap, Timer, Activity, Flame, ShieldCheck, Beaker, BookOpen, Crown, ListChecks, Brain, Moon, Coffee, Shield, Wind, Leaf, Dna, Flashlight } from 'lucide-react';

const iconMap: any = { 
  Zap, Timer, Activity, Flame, ShieldCheck, Moon, Coffee, Shield, Wind, Leaf, Dna, Flashlight,
  Droplet: ShieldCheck 
};

interface DashboardViewProps {
  state: AppState;
  onNavigate: (view: View, id?: string) => void;
  onTonicNavigate: (id: string) => void;
  onTonicToggle: (date: string, type: 'main' | 'complementary', tonicId?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ state, onNavigate, onTonicNavigate, onTonicToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayCheck = state.checklist[today] || { mainTonic: false, complementary: [] };

  const mainTonicId = PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType] || 'shake-vasodilatador';
  const mainTonic = TONICS[mainTonicId] || TONICS['shake-vasodilatador'];
  const MainIcon = iconMap[mainTonic.icon] || Zap;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Card - Improved Spacing */}
      <GlassCard className="glass-dark text-white border-none overflow-hidden relative shadow-lg p-6 rounded-[24px]">
        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-white/10">
              <Crown size={28} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold tracking-tight truncate">Olá, {state.user?.name.split(' ')[0]}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="bg-[#E63946] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-tight uppercase">Membro Elite</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-[11px] font-bold tracking-tight text-white/50">
              <span className="uppercase tracking-wider">Progresso do Protocolo</span>
              <span className="text-[#E63946] uppercase">Ativo 🔥</span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div 
                 className="h-full gradient-primary rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(230,57,70,0.6)]" 
                 style={{ width: `${Math.min(100, ((Object.values(state.checklist) as DailyChecklist[]).filter(c => c.mainTonic).length / 21) * 100)}%` }}
              ></div>
            </div>
            <p className="text-white/30 text-[10px] font-semibold text-right tracking-tight">DIA {(Object.values(state.checklist) as DailyChecklist[]).filter(c => c.mainTonic).length} DE 21</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full -mr-32 -mt-32 blur-[60px]"></div>
      </GlassCard>

      <section className="text-center space-y-3 px-2">
        <h1 className="text-2xl font-bold text-black tracking-tight leading-tight uppercase">
          GUIA COMPLETO: PROTOCOLO FORÇA NATURAL
        </h1>
        <p className="text-gray-400 text-xs font-medium max-w-xs mx-auto leading-relaxed">
          Siga o seu guia personalizado com receitas científicas e exercícios de alto impacto.
        </p>
      </section>

      {/* Primary Problem Pages */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">🔴 Resolver Problemas</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ProblemCard 
            title="Broxada"
            subtitle="Falta de ereção"
            icon={<Zap size={22} />}
            color="bg-red-50 text-red-600"
            onClick={() => onNavigate(View.PROBLEM_DETAIL, 'broxada')}
          />
          <ProblemCard 
            title="Gozo Rápido"
            subtitle="Ejaculação precoce"
            icon={<Timer size={22} />}
            color="bg-orange-50 text-orange-600"
            onClick={() => onNavigate(View.PROBLEM_DETAIL, 'gozo-rapido')}
          />
          <ProblemCard 
            title="Meio Bomba"
            subtitle="Falta de rigidez"
            icon={<Activity size={22} />}
            color="bg-blue-50 text-blue-600"
            onClick={() => onNavigate(View.PROBLEM_DETAIL, 'pau-meia-bomba')}
          />
          <ProblemCard 
            title="Sem Tesão"
            subtitle="Falta de desejo"
            icon={<Flame size={22} />}
            color="bg-purple-50 text-purple-600"
            onClick={() => onNavigate(View.PROBLEM_DETAIL, 'sem-tesao')}
          />
        </div>
      </section>

      {/* Exercises & Mind */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">💪 Exercícios & Mente</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GlassCard onClick={() => onNavigate(View.KEGELS)} className="p-6 border-none shadow-sm bg-white hover:bg-gray-50 flex items-center gap-6 rounded-2xl group transition-all">
             <div className="w-14 h-14 bg-gray-50 text-black rounded-xl flex items-center justify-center group-hover:bg-[#E63946] group-hover:text-white transition-all shadow-sm shrink-0">
                <Activity size={28} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-black tracking-tight leading-tight">Exercícios de Kegel</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Fortaleça o assoalho pélvico.</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-black transition-all" />
          </GlassCard>

          <GlassCard onClick={() => onNavigate(View.ANSIEDADE)} className="p-6 border-none shadow-sm bg-white hover:bg-gray-50 flex items-center gap-6 rounded-2xl group transition-all">
             <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm shrink-0">
                <Brain size={28} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-black tracking-tight leading-tight">Mente & Ansiedade</h3>
                <p className="text-xs text-gray-400 font-medium mt-1">Domine o fator psicológico.</p>
             </div>
             <ChevronRight size={20} className="ml-auto text-gray-300 group-hover:text-blue-600 transition-all" />
          </GlassCard>
        </div>
      </section>

      {/* Quick Access Today */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Atalho de Hoje</h3>
        </div>
        <GlassCard className="relative overflow-hidden border-none shadow-sm p-6 bg-white rounded-2xl" onClick={() => onTonicNavigate(mainTonicId)}>
          <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 text-[#E63946] rounded-xl flex items-center justify-center shrink-0">
                  <MainIcon size={24} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-black tracking-tight leading-tight">{mainTonic.name}</h2>
                  <p className="text-[10px] font-medium text-gray-400">{mainTonic.timing}</p>
                </div>
             </div>
             <div className={`flex items-center gap-2 text-[11px] font-bold tracking-tight ${todayCheck.mainTonic ? 'text-[#2ECC71]' : 'text-gray-300'}`}>
                {todayCheck.mainTonic ? <CheckCircle2 size={20} /> : <Circle size={20} />}
             </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

const ProblemCard: React.FC<{ title: string; subtitle: string; icon: React.ReactNode; color: string; onClick: () => void }> = ({ title, subtitle, icon, color, onClick }) => (
  <GlassCard onClick={onClick} className="p-4 border-none shadow-sm bg-white hover:translate-y-[-2px] transition-all rounded-2xl space-y-3 flex flex-col items-center text-center">
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center shadow-sm`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-black text-sm leading-tight">{title}</h4>
      <p className="text-[10px] text-gray-400 font-medium tracking-tight mt-0.5">{subtitle}</p>
    </div>
  </GlassCard>
);

