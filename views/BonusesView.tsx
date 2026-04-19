
import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { BONUSES_DATA } from '../constants';
import { Bonus } from '../types';
import { 
  ChevronLeft, Flame, Crown, Shield, Activity, TrendingUp, 
  ShieldCheck, AlertTriangle, Play, RotateCcw, Pause, Brain, 
  CheckCircle2, ArrowRight, ChevronDown, Target as TargetIcon, Clock
} from 'lucide-react';
import { Button } from '../components/Button';

export const BonusesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'ebooks' | 'kegel'>('ebooks');
  const bonus = BONUSES_DATA[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-black uppercase tracking-tighter">Bônus Exclusivos</h1>
        <button onClick={onBack} className="text-[#86868B] hover:text-black font-black text-[10px] uppercase tracking-widest">Home</button>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1 bg-gray-100 rounded-2xl">
        <button 
          onClick={() => setActiveTab('ebooks')}
          className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ebooks' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
        >
          E-books & Vídeos
        </button>
        <button 
          onClick={() => setActiveTab('kegel')}
          className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'kegel' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
        >
          Protocolo Kegel
        </button>
      </div>

      {activeTab === 'ebooks' ? (
        <div className="space-y-10 animate-in fade-in duration-500 -mx-6">
          <div className="bg-white overflow-hidden flex flex-col">
            <div className="px-6 py-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-100 pb-8">
                <div className="w-16 h-16 gradient-primary text-white rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                   <Flame size={32} />
                </div>
                <div className="flex-1">
                   <h3 className="text-2xl font-bold uppercase tracking-tight text-black">{bonus.title}</h3>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{bonus.subtitle}</p>
                </div>
                <span className="bg-[#E63946] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest self-start md:self-auto shadow-sm">LIBERADO</span>
              </div>

              <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                "{bonus.description}"
              </p>
            </div>

            <div className="w-full aspect-[4/6.5] bg-black">
              <iframe 
                src={bonus.iframeUrl} 
                className="w-full h-full border-none"
                allow="autoplay"
                title={bonus.title}
              ></iframe>
            </div>
            
            <div className="p-8 bg-black text-white flex items-center gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Shield size={24} className="text-[#E63946]" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-tight text-xs">Proteção Anti-Pirataria</h4>
                <p className="text-[10px] text-gray-400 font-medium">Material de circulação interna exclusiva para membros Elites do Protocolo.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
          {/* Header Section */}
          <div className="flex items-center gap-4 ml-2">
             <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center">
                <Activity size={24} />
             </div>
             <h2 className="text-xl font-black text-black uppercase tracking-tight">Treinador Assistido Kegel</h2>
          </div>

          <KegelTrainer />

          {/* Identification Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">1. COMO IDENTIFICAR OS MÚSCULOS</h3>
            <GlassCard className="p-8 space-y-8 bg-white border-none shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#E63946] shadow-sm">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="font-black text-sm uppercase">Teste do xixi</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Interrompa o fluxo de urina no meio. Os músculos que você contrai são os do assoalho pélvico. <span className="text-black font-bold">(Faça apenas para identificar)</span>.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#E63946] shadow-sm">
                    <Activity size={20} />
                  </div>
                  <h4 className="font-black text-sm uppercase">Teste da ereção</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Durante uma ereção, tente fazer o pênis "pular" ou se mover para cima sem as mãos. Esses são os mesmos músculos.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#E63946] shadow-sm">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-black text-sm uppercase">Contração Anal</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Contraia como se estivesse segurando um "peidinho". Você sentirá uma contração interna mais profunda.</p>
                </div>
              </div>
              
              <div className="p-5 bg-red-50 text-[#E63946] rounded-2xl flex gap-4 items-start border border-red-100">
                <AlertTriangle size={24} className="shrink-0" />
                <p className="text-xs font-bold leading-relaxed uppercase">Importante: Você NÃO deve contrair abdômen, glúteos ou coxas. O movimento é interno e sutil.</p>
              </div>
            </GlassCard>
          </section>

          {/* Technique Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">2. TÉCNICA E ROTINA</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-8 bg-white border-none shadow-sm space-y-6">
                <h4 className="text-sm font-black uppercase flex items-center gap-2"><Play size={18} className="text-[#E63946]" /> Técnica Básica</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Contraia os músculos do assoalho pélvico</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Mantenha contraído por 3 a 5 segundos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Relaxe completamente por 3 a 5 segundos</span>
                  </li>
                </ul>
              </GlassCard>

              <GlassCard className="p-8 bg-black text-white border-none shadow-sm space-y-6">
                <h4 className="text-sm font-black uppercase flex items-center gap-2"><RotateCcw size={18} className="text-[#E63946]" /> Rotina Iniciante</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Repetições</span>
                    <span className="text-sm font-black">10 por série</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Frequência</span>
                    <span className="text-sm font-black">3 vezes ao dia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase">Respiração</span>
                    <span className="text-sm font-black">Normal</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">BENEFÍCIOS ESPECÍFICOS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <BenefitCard 
                title="Para Ereção"
                points={[
                  "Melhora o fluxo sanguíneo peniano",
                  "Fortalece o bloqueio venoso",
                  "Ereções mais firmes e duradouras"
                ]}
               />
               <BenefitCard 
                title="Controle"
                points={[
                  "Domínio sobre o reflexo ejaculatório",
                  "Capacidade de 'segurar' o ápice",
                  "Possibilidade de orgasmos múltiplos"
                ]}
               />
               <BenefitCard 
                title="Próstata"
                points={[
                  "Recuperação do controle urinário",
                  "Melhora na função pós-cirúrgica",
                  "Melhora o assoalho pélvico geral"
                ]}
               />
            </div>
          </section>

          {/* Advanced Section */}
          <section className="space-y-6">
            <h3 className="text-[11px] font-black text-[#86868B] uppercase tracking-[0.3em] ml-2">VARIAÇÕES AVANÇADAS</h3>
            <GlassCard className="p-8 bg-white border-none shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-[#E63946]">Kegel Rápido</h4>
                    <p className="text-xs text-gray-500">Contrações rápidas de 1 segundo (pulsos) para treinar reflexo.</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-[#E63946]">Kegel em Ação</h4>
                    <p className="text-xs text-gray-500">Praticar durante a masturbação ou penetração para controle real.</p>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xs font-black uppercase text-[#E63946]">Kegel Reverso</h4>
                    <p className="text-xs text-gray-500">Empurrar levemente os músculos em vez de contrair (ajuda no relaxamento).</p>
                 </div>
              </div>
            </GlassCard>
          </section>

          {/* Results Timeline */}
          <section className="p-8 gradient-primary text-white rounded-[40px] shadow-lg flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
             <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-black uppercase mb-4">Expectativa de Resultados</h3>
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 text-[10px] font-black uppercase opacity-60">4-6 SEM</div>
                      <div className="flex-1 text-sm font-bold">Primeiras melhorias visíveis na firmeza.</div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 text-[10px] font-black uppercase opacity-60">3-6 MESES</div>
                      <div className="flex-1 text-sm font-bold">Resultados significativos e controle total.</div>
                   </div>
                </div>
             </div>
             <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-center">
                <Brain size={32} className="mx-auto mb-2 text-white" />
                <p className="text-[10px] font-black uppercase tracking-widest">Consistência é a Chave</p>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </section>
        </div>
      )}
    </div>
  );
};

const KegelTrainer: React.FC = () => {
  const [exercise, setExercise] = useState<number>(1);
  const [week, setWeek] = useState<string>('1-2');
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'contract' | 'relax' | 'ready'>('ready');
  const [timeLeft, setTimeLeft] = useState(5);
  const [reps, setReps] = useState(0);

  const configs: Record<number, any> = {
    1: { hold: 5, relax: 5, totalReps: 10, title: 'Básico/Em Pé' },
    2: {
      '1-2': { hold: 3, relax: 3, totalReps: 10, title: 'Avançado (W1-2)' },
      '3-4': { hold: 5, relax: 5, totalReps: 15, title: 'Avançado (W3-4)' },
      '5-6': { hold: 8, relax: 5, totalReps: 20, title: 'Avançado (W5-6)' },
      '7+': { hold: 10, relax: 5, totalReps: 25, title: 'Avançado (W7+)' },
    }
  };

  const currentConfig = exercise === 2 ? configs[2][week] : configs[1];

  useEffect(() => {
    let timer: any;
    if (isRunning && reps < currentConfig.totalReps) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        if (phase === 'contract') {
          setPhase('relax');
          setTimeLeft(currentConfig.relax);
        } else {
          setReps(reps + 1);
          if (reps + 1 < currentConfig.totalReps) {
            setPhase('contract');
            setTimeLeft(currentConfig.hold);
          } else {
            setIsRunning(false);
            setPhase('ready');
          }
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, phase, reps, currentConfig]);

  const startTraining = () => {
    setReps(0);
    setPhase('contract');
    setTimeLeft(currentConfig.hold);
    setIsRunning(true);
  };

  const stopTraining = () => {
    setIsRunning(false);
    setPhase('ready');
    setTimeLeft(currentConfig.hold);
  };

  return (
    <GlassCard className="p-0 border-none shadow-xl bg-white rounded-[32px] overflow-hidden flex flex-col">
      <div className="p-6 bg-gray-50 border-b border-gray-100 space-y-6">
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-black text-black uppercase tracking-widest flex items-center justify-center sm:justify-start gap-2">
            <TargetIcon size={16} className="text-[#E63946]" /> Treinador Assistido
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">Sincronize sua contração com o cronômetro</p>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-full overflow-x-auto no-scrollbar">
            {[1, 2].map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setExercise(ex);
                  stopTraining();
                }}
                disabled={isRunning}
                className={`flex-1 h-10 rounded-lg text-[10px] whitespace-nowrap font-bold transition-all px-2 ${exercise === ex ? 'bg-[#E63946] text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
              >
                {ex === 1 ? 'NÍVEL 1 & 2 (INICIAL)' : 'NÍVEL 3 (AVANÇADO)'}
              </button>
            ))}
          </div>
          
          {exercise === 2 && (
            <div className="animate-in slide-in-from-top-2 duration-300">
               <div className="relative">
                <select 
                  value={week}
                  onChange={(e) => {
                    setWeek(e.target.value);
                    stopTraining();
                  }}
                  disabled={isRunning}
                  className="w-full appearance-none bg-white px-4 py-3 rounded-xl border border-gray-200 text-[11px] font-bold uppercase tracking-widest shadow-sm outline-none cursor-pointer focus:ring-2 focus:ring-[#E63946]/20 transition-all text-center"
                >
                  <option value="1-2">Semana 1-2 (3s Contrair)</option>
                  <option value="3-4">Semana 3-4 (5s Contrair)</option>
                  <option value="5-6">Semana 5-6 (8s Contrair)</option>
                  <option value="7+">Semana 7+ (10s Contrair)</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col items-center gap-10">
        <div className="grid grid-cols-3 w-full max-w-sm divide-x divide-gray-100 border-y border-gray-50 py-4">
           <div className="text-center px-1">
              <span className="text-[8px] font-black text-gray-400 uppercase block mb-1 tracking-tighter">Contração</span>
              <span className="text-base font-bold text-black">{currentConfig.hold}s</span>
           </div>
           <div className="text-center px-1">
              <span className="text-[8px] font-black text-gray-400 uppercase block mb-1 tracking-tighter">Descanso</span>
              <span className="text-base font-bold text-black">{currentConfig.relax}s</span>
           </div>
           <div className="text-center px-1">
              <span className="text-[8px] font-black text-gray-400 uppercase block mb-1 tracking-tighter">Séries</span>
              <span className="text-base font-bold text-black">{currentConfig.totalReps}x</span>
           </div>
        </div>

        <div className="relative group">
          <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 transition-all duration-700 ${phase === 'contract' ? 'bg-[#E63946] scale-125' : phase === 'relax' ? 'bg-blue-400 scale-110' : 'bg-transparent'}`}></div>
          <div className={`relative w-40 h-40 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 shadow-xl ${phase === 'contract' ? 'border-[#E63946] scale-105 bg-white' : phase === 'relax' ? 'border-blue-200 scale-100 bg-white' : 'border-gray-100 bg-gray-50'}`}>
            {phase === 'ready' ? (
              <Activity size={40} className="text-gray-300" />
            ) : (
              <>
                <span className={`text-5xl font-black mb-1 tabular-nums ${phase === 'contract' ? 'text-[#E63946]' : 'text-blue-500'}`}>{timeLeft}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${phase === 'contract' ? 'text-[#E63946]' : 'text-blue-500'}`}>
                  {phase === 'contract' ? 'Contraia' : 'Relaxe'}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-xs">
          <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
            <span>Progresso da Série</span>
            <span>{reps} / {currentConfig.totalReps}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${(reps / currentConfig.totalReps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          {isRunning ? (
            <Button fullWidth variant="secondary" onClick={stopTraining}>
              PARAR TREINAMENTO <Pause size={18} />
            </Button>
          ) : (
            <Button fullWidth onClick={startTraining}>
              INICIAR SÉRIE <Play size={18} />
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

const BenefitCard: React.FC<{ title: string, points: string[] }> = ({ title, points }) => (
  <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-4">
    <h4 className="text-sm font-black uppercase text-black border-b border-gray-100 pb-2">{title}</h4>
    <ul className="space-y-3">
      {points.map((p, i) => (
        <li key={i} className="flex gap-3 items-start">
          <CheckCircle2 size={14} className="text-[#E63946] shrink-0 mt-0.5" />
          <span className="text-[11px] font-medium text-gray-500 leading-tight">{p}</span>
        </li>
      ))}
    </ul>
  </div>
);
