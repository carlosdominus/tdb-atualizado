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
  const [selectedExplain, setSelectedExplain] = React.useState<{ title: string; what: string; how: string } | null>(null);

  const INGREDIENT_EXPLANATIONS: Record<string, { title: string; what: string; how: string }> = {
    'pectina': {
      title: 'Pectina Cítrica ou Pectina Cítrica Modificada (MCP)',
      what: 'Uma fibra solúvel natural de alta tecnologia extraída especialmente do limão e outras frutas cítricas. No nosso protocolo, ela atua de forma científica como um verdadeiro varredor arterial, ligando-se a metais pesados, reduzindo o colesterol LDL e impedindo o acúmulo de placas gordurosas nas artérias coronárias e pélvicas, auxiliando no fluxo ideal para a região cavernosa.',
      how: 'Pode obtê-la naturalmente consumindo o limão espremido com seu bagaço e um pouco de raspas da casca (onde a pectina está concentrada). Para uma dosagem terapêutica precisa, compre "Pectina Cítrica Modificada (MCP)" ou "Pectina Cítrica em pó" em lojas de produtos naturais, grandes farmácias de manipulação ou plataformas de comércio online (como Mercado Livre, iHerb, Shopee ou farmácias de suplementos).'
    },
    'maca': {
      title: 'Maca Peruana (Amarela ou Negra Ativa)',
      what: 'Um tubérculo sagrado andino que atua como adaptógeno potente. A Maca Peruana Negra é cientificamente comprovada por induzir maior desejo masculino, aumentar a contagem de espermatozoides e restaurar os níveis circulantes de testosterona livre.',
      how: 'Você a compra facilmente em pó ou em cápsulas em casas de chá, lojas de produtos naturais (como Zona Cerealista ou Mundo Verde) e farmácias de manipulação de boa qualidade.'
    },
    'tribulus': {
      title: 'Tribulus Terrestris em pó',
      what: 'Um extrato herbal amplamente utilizado para dar suporte à hemodinâmica e dilatação vascular através da ativação da enzima óxido nítrico sintase, relaxando o tecido cavernoso para ereções extremamente firmes.',
      how: 'Compre em lojas de ervas tradicionais, lojas de suplementos esportivos ou encomende cápsulas ou pó padronizado em farmácias de manipulação autorizadas.'
    },
    'ginseng': {
      title: 'Raiz de Ginseng Vermelho Coreano (Panax Ginseng)',
      what: 'Uma das raízes adaptógenas mais nobres e estudadas do mundo. Promove vasodilatação pélvica de forma imediata e prolongada, regulando neurotransmissores de vitalidade e combatendo o esgotamento físico e estresse.',
      how: 'Adquira em pó puro ou cápsulas em lojas especializadas de produtos orientais, casas de suplementos alimentares, ou farmácias de manipulação.'
    },
    'citrulina': {
      title: 'L-Citrulina Purificada',
      what: 'Um aminoácido de absorção superior que se converte em arginina no organismo, estimulando a liberação maciça e contínua de óxido nítrico para o relaxamento das artérias penianas e retenção sanguínea.',
      how: 'Disponível em pó sem sabor. Compre em lojas especializadas em suplementação para atletas (fisiculturismo/pré-treino), farmácias de manipulação ou lojas online.'
    },
    'arginina': {
      title: 'L-Arginina Pura',
      what: 'Aminoácido essencial precursor do óxido nítrico que atua diretamente nas paredes dos vasos, aumentando o diâmetro vascular e permitindo preenchimento cavernoso ágil e consistente.',
      how: 'Disponível em casas de musculação, farmácias de medicamentos ou manipulando com facilidade online ou fisicamente.'
    },
    'bicarbonato': {
      title: 'Bicarbonato de Sódio (Uso Estratégico)',
      what: 'Funciona como um poderoso alcalinizante biológico de uso imediato no protocolo. Ele reequilibra o pH extracelular celular na primeira dose e otimiza de forma radical a bioabsorção de todos os adaptógenos e ervas que você consome.',
      how: 'Ingrediente culinário comum e extremamente acessível, disponível em qualquer supermercado de bairro ou farmácia.'
    },
    'zinco': {
      title: 'Zinco Quelato (Mineral Alta Absorção)',
      what: 'O mineral estruturalizador indispensável para o bom funcionamento do receptor androgênico e produção de testosterona testicular. Na forma quelata, é ligado a aminoácidos para absorção de elite sem causar acidez.',
      how: 'Para a fonte orgânica natural, consuma sementes de abóbora moídas ou gergelim. O mineral puro (Zinco Quelato 30mg) é comprado em farmácias, drogarias e lojas de suplementos minerais.'
    },
    'beterraba': {
      title: 'Pó Concentrado de Beterraba Liofilizada',
      what: 'Uma fonte vegetal insuperável de Nitratos Inorgânicos puros. Após ingerido, converte-se em Óxido Nítrico biológico, criando o efeito de super-vasodilatação para o torque pélvico máximo.',
      how: 'Você pode substituir por espremer 1 beterraba fresca inteira no liquidificador de forma 100% caseira, ou comprar a beterraba liofilizada em pó puro em lojas de produtos saudáveis na internet ou Zona Cerealista.'
    }
  };

  const getExplanation = (name: string) => {
    const norm = name.toLowerCase();
    if (norm.includes('pectina')) return INGREDIENT_EXPLANATIONS['pectina'];
    if (norm.includes('maca')) return INGREDIENT_EXPLANATIONS['maca'];
    if (norm.includes('tribulus')) return INGREDIENT_EXPLANATIONS['tribulus'];
    if (norm.includes('ginseng')) return INGREDIENT_EXPLANATIONS['ginseng'];
    if (norm.includes('citrulina')) return INGREDIENT_EXPLANATIONS['citrulina'];
    if (norm.includes('arginina')) return INGREDIENT_EXPLANATIONS['arginina'];
    if (norm.includes('bicarbonato')) return INGREDIENT_EXPLANATIONS['bicarbonato'];
    if (norm.includes('zinco') || norm.includes('gergelim') || norm.includes('abóbora')) return INGREDIENT_EXPLANATIONS['zinco'];
    if (norm.includes('beterraba')) return INGREDIENT_EXPLANATIONS['beterraba'];
    if (norm.includes('limão') || norm.includes('limao')) return INGREDIENT_EXPLANATIONS['pectina'];
    return null;
  };

  const hasBoosterFormula = ['shake-vasodilatador', 'smoothie-controlador', 'shot-potencializador', 'shake-estimulante'].includes(tonic.id);

  const getDynamicIngredients = () => {
    if (formulaMode === 'natural') {
      switch (tonic.id) {
        case 'detox-vascular':
          return [
            { name: 'Limão espremido com bagaço (Rico em Pectina Cítrica)', qty: '1 unidade' },
            { name: 'Vinagre de maçã orgânico', qty: '1 colher sopa' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Pectina Cítrica Natural (Opcional - Ativo Vascular)', qty: '1 colher chá' },
            { name: 'Água morna', qty: '200ml' }
          ];
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
        case 'detox-vascular':
          return [
            { name: 'Limão espremido com bagaço (Rico em Pectina Cítrica)', qty: '1 unidade' },
            { name: 'Vinagre de maçã orgânico', qty: '1 colher sopa' },
            { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
            { name: 'Pectina Cítrica Modificada (MCP) pura', qty: '5g (1 colher chá)', isSpecial: true },
            { name: 'Água morna', qty: '200ml' }
          ];
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
      <style>{`
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.9; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .animate-ping-slow {
          animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
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
              <div className="p-5 rounded-2xl bg-red-50/80 border border-red-100 text-[#E63946] text-xs font-semibold leading-normal animate-in slide-in-from-top-2 duration-300 text-left space-y-4">
                <style>{`
                  @keyframes softPulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(230, 57, 70, 0.15); }
                    50% { transform: scale(1.02); box-shadow: 0 8px 20px rgba(230, 57, 70, 0.35); }
                  }
                  .animate-soft-pulse {
                    animation: softPulse 2.5s infinite ease-in-out;
                  }
                `}</style>
                <div>
                  <span className="font-bold uppercase tracking-wider block mb-1">🔥 ALERTA POTENCIALIZADOR:</span>
                  Substituímos ativos tradicionais por suplementos puros concentrados de altíssima pureza
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(View.UPSELL)}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E63946] text-white font-extrabold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all animate-soft-pulse cursor-pointer hover:bg-[#d62e3d] active:scale-95 text-center"
                >
                  🛒 Adquirir potencializador
                </button>
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
             {ingredients.map((ing: any, i: number) => {
                const explanation = getExplanation(ing.name);
                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-4 rounded-xl bg-white border transition-all ${
                      ing.isSpecial 
                        ? 'border-[#E63946]/40 bg-red-50/10 shadow-[0_4px_12px_rgba(230,57,70,0.04)]' 
                        : 'border-gray-100 shadow-sm'
                    }`}
                  >
                     <div className="flex flex-col gap-1 text-left flex-1 min-w-0 pr-2">
                        <div className="flex items-center flex-wrap gap-1.5">
                          <span className={`text-sm font-bold tracking-tight ${ing.isSpecial ? 'text-[#E63946]' : 'text-[#1D1D1F]'}`}>
                            {ing.name}
                          </span>
                          {explanation && (
                            <button
                              type="button"
                              onClick={() => setSelectedExplain(explanation)}
                              className="relative flex items-center justify-center w-5 h-5 ml-1 rounded-full bg-red-50 text-[#E63946] border border-red-100 hover:bg-[#E63946] hover:text-white transition-all cursor-pointer text-[12px] font-black shrink-0"
                              title="Clique para saber o que é e como conseguir"
                            >
                              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping-slow"></span>
                              <span className="relative z-10">?</span>
                            </button>
                          )}
                        </div>
                        {ing.isSpecial && (
                          <span className="text-[10px] text-[#E63946] font-bold uppercase tracking-widest flex items-center gap-1">
                            ⚡ ATIVO POTENCIALIZADOR RECOMENDADO
                          </span>
                        )}
                     </div>
                     <span className={`text-xs font-black min-w-[70px] text-center px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                       ing.isSpecial 
                         ? 'bg-[#E63946] text-white' 
                         : 'bg-gray-50 text-black border border-gray-100'
                     }`}>
                       {ing.qty}
                     </span>
                  </div>
                );
             })}
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
      {/* Modal de Explicação de Ingredientes */}
      {selectedExplain && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedExplain(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 text-left space-y-5"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-base font-black text-black tracking-tight leading-snug pr-4">
                {selectedExplain.title}
              </h3>
              <button 
                onClick={() => setSelectedExplain(null)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-red-50 hover:text-[#E63946] transition-colors flex items-center justify-center text-xs font-black text-gray-400 cursor-pointer"
                type="button"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black tracking-wider text-[#E63946] uppercase block">🧪 O QUE É E PARA QUE SERVE?</span>
                <p className="text-xs font-bold text-gray-600 leading-relaxed">{selectedExplain.what}</p>
              </div>
              <div className="space-y-1.5 pt-3 border-t border-gray-100">
                <span className="text-[10px] font-black tracking-wider text-green-600 uppercase block">🛒 COMO ADQUIRIR?</span>
                <p className="text-xs font-bold text-gray-600 leading-relaxed">{selectedExplain.how}</p>
              </div>
            </div>

            <Button 
              fullWidth 
              className="mt-6 h-11 text-xs font-black uppercase tracking-wider bg-black text-white hover:bg-black/90 cursor-pointer" 
              onClick={() => setSelectedExplain(null)}
            >
              Entendido
            </Button>
          </div>
        </div>
      )}

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
