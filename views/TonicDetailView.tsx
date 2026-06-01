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
  const [formulaMode, setFormulaMode] = React.useState<'natural' | 'booster'>('natural');

  const hasBoosterFormula = ['shake-vasodilatador', 'smoothie-controlador', 'shot-potencializador', 'shake-estimulante'].includes(tonic.id);

  const getDynamicIngredients = () => {
    if (formulaMode === 'natural') {
      switch (tonic.id) {
        case 'shake-vasodilatador':
          return [
            { name: 'Sementes de melancia trituradas (Citrulina natural)', qty: '3 colheres sopa' },
            { name: 'Sementes de abóbora moídas (Arginina natural)', qty: '2 colheres sopa' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Suco de melancia natural', qty: '200ml' },
            { name: 'Banana', qty: '1 unidade' },
            { name: 'Aveia', qty: '30g' },
            { name: 'Mel', qty: '1 colher sobremesa' }
          ];
        case 'smoothie-controlador':
          return [
            { name: 'Gengibre ralado fresco (Termogênico natural)', qty: '1 colher de chá' },
            { name: 'Sementes de linhaça ou gergelim moídas', qty: '1 colher de sopa (Alternativa prática)' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Banana (rica em triptofano)', qty: '1 unidade' },
            { name: 'Aveia', qty: '30g' },
            { name: 'Leite de amêndoas', qty: '200ml' },
            { name: 'Pasta de amendoim', qty: '1 colher sopa' }
          ];
        case 'shot-potencializador':
          return [
            { name: 'Beterraba fresca ralada ou espremida', qty: '1 unidade inteira' },
            { name: 'Sementes de abóbora descascadas moídas', qty: '2 colheres de sopa' },
            { name: 'Gergelim integral torrado moído (Zinco natural)', qty: '1 colher de sopa' },
            { name: 'Gengibre fresco ralado de alta potência', qty: '1 colher de café' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Água filtrada ou Suco de Limão', qty: '100ml' }
          ];
        case 'shake-estimulante':
          return [
            { name: 'Maca Peruana Tradicional (Amarela)', qty: '3g (1 colher de chá)' },
            { name: 'Sementes de girassol trituradas', qty: '1 colher de sopa (Zinco natural)' },
            { name: 'Cacau 100% puro em pó', qty: '30g (Teobromina natural)' },
            { name: 'Banana prata', qty: '1 unidade' },
            { name: 'Leite de coco caseiro ou integral', qty: '200ml' },
            { name: 'Mel silvestre natural', qty: '1 colher de sopa' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' }
          ];
        default:
          return tonic.ingredients;
      }
    } else {
      switch (tonic.id) {
        case 'shake-vasodilatador':
          return [
            { name: 'L-arginina em pó', qty: '5g (1 colher chá cheia)', isSpecial: true },
            { name: 'L-citrulina em pó', qty: '3g', isSpecial: true },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Suco de melancia natural', qty: '200ml' },
            { name: 'Banana', qty: '1 unidade' },
            { name: 'Aveia', qty: '30g' },
            { name: 'Mel', qty: '1 colher sobremesa' }
          ];
        case 'smoothie-controlador':
          return [
            { name: 'Raiz de Ginseng Coreano em pó', qty: '1 colher de café (aprox. 1g)', isSpecial: true },
            { name: 'Tribulus Terrestris em pó', qty: '1 colher de chá (aprox. 2g)', isSpecial: true },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Banana (rica em triptofano)', qty: '1 unidade' },
            { name: 'Aveia', qty: '30g' },
            { name: 'Leite de amêndoas', qty: '200ml' },
            { name: 'Pasta de amendoim', qty: '1 colher sopa' }
          ];
        case 'shot-potencializador':
          return [
            { name: 'Pó concentrado de beterraba liofilizada', qty: '1 colher de sopa', isSpecial: true },
            { name: 'L-arginina pura em pó', qty: '6g', isSpecial: true },
            { name: 'L-citrulina purificada', qty: '2g', isSpecial: true },
            { name: 'Zinco quelato (Suplementação pura)', qty: '30mg (1 cápsula)', isSpecial: true },
            { name: 'Pó de Raiz de Ginseng Vermelho', qty: '1/2 colher de chá', isSpecial: true },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Água filtrada', qty: '100ml' }
          ];
        case 'shake-estimulante':
          return [
            { name: 'Pó de Maca Peruana Negra ativa', qty: '3g (1 colher de chá)', isSpecial: true },
            { name: 'Tribulus Terrestris em pó', qty: '1 colher de chá', isSpecial: true },
            { name: 'Zinco quelato (Suplementação pura)', qty: '30mg (1 cápsula)', isSpecial: true },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Banana prata', qty: '1 unidade' },
            { name: 'Cacau 100% puro em pó', qty: '30g' },
            { name: 'Leite de coco caseiro ou integral', qty: '200ml' },
            { name: 'Mel silvestre natural', qty: '1 colher de sopa' }
          ];
        default:
          return tonic.ingredients;
      }
    }
  };

  const ingredients = getDynamicIngredients();

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

        {/* Dynamic Formula Toggle Header */}
        {hasBoosterFormula && (
          <div className="space-y-3.5 print:hidden">
            <h4 className="text-xs font-bold text-[#86868B] tracking-wider ml-1 uppercase">Como deseja preparar hoje?</h4>
            <div className="bg-[#F5F5F7] p-1.5 rounded-2xl flex border border-gray-200">
              <button 
                onClick={() => setFormulaMode('natural')}
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black tracking-tight transition-all rounded-xl cursor-pointer ${formulaMode === 'natural' ? 'bg-white text-black shadow-md font-extrabold' : 'text-gray-400 hover:text-black font-semibold'}`}
              >
                🌱 100% Caseiro & Prático
              </button>
              <button 
                onClick={() => setFormulaMode('booster')}
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-black tracking-tight transition-all rounded-xl cursor-pointer ${
                  formulaMode === 'booster' 
                    ? 'bg-white text-[#E63946] border border-[#E63946] shadow-md font-extrabold' 
                    : 'text-[#E63946]/80 font-bold hover:text-[#E63946] hover:bg-white/40'
                }`}
              >
                🚀 Modo Potencializado (Rápido)
              </button>
            </div>
            
            {formulaMode === 'booster' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-[#E63946] text-xs font-semibold leading-normal animate-in slide-in-from-top-2 duration-300 text-left">
                <span className="font-bold uppercase tracking-wider block mb-1">🔥 ALERTA POTENCIALIZADOR:</span>
                Substituímos ativos tradicionais por suplementos puros concentrados de altíssima pureza. Você pode comprá-los em gramas em qualquer casa de produtos naturais ou farmácia de manipulação para acelerar os resultados de forma imediata!
              </div>
            )}
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between ml-2">
            <h3 className="text-xs font-bold text-[#86868B] tracking-tight uppercase print:text-sm print:text-black">Mesa de Preparo</h3>
            {hasBoosterFormula && (
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${formulaMode === 'natural' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-[#E63946]'} print:hidden`}>
                {formulaMode === 'natural' ? '🌱 100% Caseiro' : '🚀 Turbinado'}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2.5 print:grid-cols-2">
             {ingredients.map((ing: any, i: number) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between p-4 rounded-xl bg-white border transition-all ${
                    ing.isSpecial 
                      ? 'border-[#E63946]/40 bg-red-50/10 shadow-[0_4px_12px_rgba(230,57,70,0.04)]' 
                      : 'border-gray-100 shadow-sm'
                  }`}
                >
                   <div className="flex flex-col gap-1 text-left">
                      <span className={`text-sm font-bold tracking-tight ${ing.isSpecial ? 'text-[#E63946]' : 'text-[#1D1D1F]'}`}>
                        {ing.name}
                      </span>
                      {ing.isSpecial && (
                        <span className="text-[10px] text-[#E63946] font-bold uppercase tracking-widest flex items-center gap-1">
                          ⚡ ATIVO POTENCIALIZADOR RECOMENDADO
                        </span>
                      )}
                   </div>
                   <span className={`text-xs font-black min-w-[70px] text-center px-3 py-1.5 rounded-lg transition-all ${
                     ing.isSpecial 
                       ? 'bg-[#E63946] text-white' 
                       : 'bg-gray-50 text-black border border-gray-100'
                   }`}>
                     {ing.qty}
                   </span>
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
                 <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                   Ingredientes naturais de uso tradicional. Não exceda as quantidades indicadas. Não substitui orientação médica.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
