
import React from 'react';
import { Tonic, View } from '../types.ts';
import { GlassCard } from '../components/GlassCard.tsx';
import { Button } from '../components/Button.tsx';
import { ChevronLeft, Info, CheckSquare, Clock, Download, RefreshCcw, Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Beaker, Moon, Coffee, Shield, Wind, Leaf, Dna, Flashlight } from 'lucide-react';

const iconMap: any = {
  Zap, Timer, Activity, Flame, Sparkles, ShieldCheck, Moon, Coffee, Shield, Wind, Leaf, Dna, Flashlight
};

interface TonicDetailViewProps {
  tonic: Tonic;
  isMain: boolean;
  onBack: () => void;
  onNavigate: (view: View) => void;
  onMarkDone: (tonicId: string) => void;
  isDone: boolean;
}

export const TonicDetailView: React.FC<TonicDetailViewProps> = ({ tonic, isMain, onBack, onNavigate, onMarkDone, isDone }) => {
  const TonicIcon = iconMap[tonic.icon] || Beaker;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto pb-12 print:p-0 print:m-0 print:max-w-none">
      <div className="flex items-center justify-between print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-black transition-colors font-semibold text-sm tracking-tight">
          <ChevronLeft size={20} /> Voltar
        </button>
        {isMain && <span className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-semibold shadow-sm tracking-tight">Seu Principal</span>}
      </div>

      <div className="text-center print:text-left print:mt-10">
        <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center text-black shadow-sm mb-6 border border-gray-100 print:hidden">
           <TonicIcon size={40} />
        </div>
        <h1 className="text-3xl font-bold text-black tracking-tight mb-3 print:text-4xl">{tonic.name}</h1>
        <div className="flex items-center justify-center print:justify-start gap-2">
           <span className="px-3 py-1 bg-black text-white rounded-full text-[11px] font-semibold tracking-tight border border-black/10 print:bg-white print:text-black print:border-black">{tonic.type === 'main' ? 'Protocolo Diário' : 'Tônico Extra'}</span>
           <span className="px-3 py-1 bg-red-50 text-[#E63946] rounded-full text-[11px] font-semibold tracking-tight border border-red-100 print:hidden">{tonic.timing.split(' ')[0]}</span>
        </div>
      </div>

      <div className="space-y-8 print:space-y-6">
        <GlassCard className="border-none shadow-sm overflow-hidden relative p-8 bg-white print:border print:shadow-none">
           <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-full -mr-16 -mt-16 print:hidden"></div>
           <h3 className="text-xs font-semibold text-[#86868B] tracking-tight mb-5 flex items-center gap-2 print:text-sm print:text-black">
             <Info size={16} /> Para que serve
           </h3>
           <p className="text-base text-[#1D1D1F] font-medium leading-relaxed mb-8 relative z-10 print:mb-4">{tonic.serve}</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:grid-cols-2">
             {tonic.benefits.map((b, i) => (
               <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 text-black text-[13px] font-semibold border border-gray-100 shadow-sm print:bg-white">
                  <CheckSquare size={18} className="text-[#E63946] shrink-0 print:text-black" />
                  {b}
               </div>
             ))}
           </div>
        </GlassCard>

        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-[#86868B] tracking-tight ml-2 print:text-sm print:text-black">Mesa de Preparo</h3>
          <div className="grid grid-cols-1 gap-2 print:grid-cols-2">
             {tonic.ingredients.map((ing, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <span className="text-sm font-semibold text-[#1D1D1F] tracking-tight">{ing.name}</span>
                  <span className="text-xs font-bold text-black bg-gray-50 px-3 py-1.5 rounded-lg print:bg-white print:border">{ing.qty}</span>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-[#86868B] tracking-tight ml-2 print:text-sm print:text-black">Modo de Execução</h3>
          <div className="space-y-3">
             {tonic.instructions.map((step, i) => (
               <div key={i} className="flex gap-5 p-5 rounded-xl bg-[#F5F5F7] border border-gray-100 group hover:bg-white hover:shadow-sm transition-all print:bg-white">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md print:bg-white print:text-black print:border">
                    {i+1}
                  </div>
                  <p className="text-sm font-medium text-[#1D1D1F] py-1 leading-relaxed">{step}</p>
               </div>
             ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-semibold text-[#86868B] tracking-tight ml-2 print:text-sm print:text-black">Janela de Consumo</h3>
          <GlassCard className="bg-[#1C1C1E] text-white border-none p-6 shadow-md rounded-xl print:bg-white print:text-black print:border">
             <div className="flex items-center gap-4 mb-3">
                <div className="p-2.5 bg-white/10 rounded-xl print:hidden">
                   <Clock className="text-[#E63946]" size={22} />
                </div>
                <span className="text-xl font-bold tracking-tight">{tonic.timing}</span>
             </div>
             <p className="text-xs text-gray-400 font-medium leading-relaxed opacity-90 print:text-black/60">Sincronize esta dose para garantir a máxima absorção dos bioativos.</p>
          </GlassCard>
        </section>

        <div className="space-y-3 pt-4 print:hidden">
          <Button fullWidth className="h-14 text-base font-bold tracking-tight" onClick={() => onMarkDone(tonic.id)} disabled={isDone}>
            {isDone ? 'Concluido' : 'Sinalizar Conclusão'}
          </Button>
          <div className="grid grid-cols-2 gap-3">
             <Button variant="outline" fullWidth className="h-12 text-sm font-semibold" onClick={() => window.print()}><Download size={16} /> Salvar PDF</Button>
             <Button variant="outline" fullWidth className="h-12 text-sm font-semibold" onClick={() => onNavigate(View.CATALOG)}><RefreshCcw size={16} /> Catálogo</Button>
          </div>
        </div>

        <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl mt-10 space-y-2 print:border-black">
           <div className="flex items-start gap-4">
              <ShieldCheck size={22} className="text-[#86868B] shrink-0" />
              <div className="space-y-1">
                 <p className="text-[10px] text-[#86868B] leading-relaxed tracking-wider font-bold">
                   NOTA DE SEGURANÇA
                 </p>
                 <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                   Ingredientes naturais de uso tradicional. Não exceda as quantidades indicadas. Não substitui orientação médica.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
