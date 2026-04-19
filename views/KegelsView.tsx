
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Activity, Target, ShieldCheck, Zap, Play, Pause, RotateCcw, Clock, Target as TargetIcon, ChevronDown } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
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

      {/* Advanced Kegel Trainer */}
      <KegelTrainer />

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

const KegelTrainer: React.FC = () => {
  const [exercise, setExercise] = useState<number>(1);
  const [week, setWeek] = useState<string>('1-2');
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'contract' | 'relax' | 'ready'>('ready');
  const [timeLeft, setTimeLeft] = useState(5);
  const [reps, setReps] = useState(0);

  // Configuration map
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
    <GlassCard className="p-0 border-none shadow-2xl bg-white rounded-[32px] overflow-hidden flex flex-col">
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
          <div className={`relative w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 shadow-xl ${phase === 'contract' ? 'border-[#E63946] scale-105 bg-white' : phase === 'relax' ? 'border-blue-200 scale-100 bg-white' : 'border-gray-100 bg-gray-50'}`}>
            {phase === 'ready' ? (
              <Activity size={48} className="text-gray-300" />
            ) : (
              <>
                <span className={`text-6xl font-black mb-1 tabular-nums ${phase === 'contract' ? 'text-[#E63946] animate-in zoom-in-75 duration-300' : 'text-blue-500'}`}>{timeLeft}</span>
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${phase === 'contract' ? 'text-[#E63946]' : 'text-blue-500 font-bold'}`}>
                  {phase === 'contract' ? 'CONTRAIA' : 'RELUAXE'}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="w-full max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
            <span className="flex items-center gap-1.5"><Clock size={12} /> Progresso Muscular</span>
            <span>{reps} / {currentConfig.totalReps}</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner p-0.5">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(reps / currentConfig.totalReps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          {isRunning ? (
            <button 
              onClick={stopTraining}
              className="flex-1 h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <Pause size={20} className="relative z-10" /> <span className="relative z-10 uppercase tracking-widest text-xs">Parar Agora</span>
            </button>
          ) : (
            <button 
              onClick={startTraining}
              className="flex-1 h-14 bg-[#E63946] text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-[#E63946]/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform skew-x-12"></div>
              <Play size={20} className="relative z-10" /> <span className="relative z-10 uppercase tracking-widest text-xs">Iniciar Série</span>
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
