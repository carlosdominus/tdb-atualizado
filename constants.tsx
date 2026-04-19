
import { Tonic, ProblemType, Bonus, Module, ProblemInfo } from './types';

export const COLORS = {
  primary: '#E63946',
  secondary: '#000000',
  accent: '#FF1F1F',
  white: '#FFFFFF',
  lightGray: '#F8F9FA',
  mediumGray: '#8E8E93',
  darkGray: '#1C1C1E'
};

export const TONICS: Record<string, Tonic> = {
  // BROXADA
  'shake-vasodilatador': {
    id: 'shake-vasodilatador',
    name: 'Shake Vasodilatador Matinal',
    icon: 'Zap',
    type: 'main',
    category: 'broxada',
    timing: 'Manhã, 30-60 min antes do café',
    serve: 'A L-arginina aumenta a produção de óxido nítrico, que relaxa os vasos sanguíneos penianos.',
    benefits: ['Aumento de Óxido Nítrico', 'Relaxamento Vascular', 'Fluxo Sanguíneo'],
    ingredients: [
      { name: 'L-arginina em pó', qty: '5g (1 colher chá cheia)' },
      { name: 'L-citrulina em pó', qty: '3g' },
      { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
      { name: 'Suco de melancia natural', qty: '200ml' },
      { name: 'Banana', qty: '1 unidade' },
      { name: 'Aveia', qty: '30g' },
      { name: 'Mel', qty: '1 colher sobremesa' }
    ],
    instructions: [
      'Bater tudo no liquidificador.',
      'Tomar pela manhã, 30-60 minutos antes do café da manhã.'
    ],
    tips: [
      'A citrulina melhora a absorção da arginina.',
      'O Bicarbonato de sódio deve ser usado APENAS na primeira vez que fizer a receita (não há problema em misturar com os outros itens).',
      'Ideal para quem tem problemas vasculares.'
    ]
  },
  'suplemento-noturno-broxada': {
    id: 'suplemento-noturno-broxada',
    name: 'Suplemento Noturno Anti-Broxada',
    icon: 'Moon',
    type: 'complementary',
    category: 'broxada',
    timing: '1 hora antes de dormir',
    serve: 'O ginseng aumenta óxido nítrico e inibe prolactina, melhorando a função erétil.',
    benefits: ['Melhora Função Erétil', 'Controle Hormonal', 'Reparação Noturna'],
    ingredients: [
      { name: 'Extrato de Ginseng Vermelho Coreano', qty: '350mg (cápsula)' },
      { name: 'Zinco quelato', qty: '30mg' },
      { name: 'L-arginina', qty: '2g' }
    ],
    instructions: [
      'Tomar 1 hora antes de dormir com água.'
    ],
    tips: ['Estudos mostram 60% de melhora no desempenho.']
  },
  'cha-circulatorio': {
    id: 'cha-circulatorio',
    name: 'Chá Circulatório',
    icon: 'Coffee',
    type: 'complementary',
    category: 'broxada',
    timing: '2x ao dia (Manhã e Tarde)',
    serve: 'Alho e gengibre melhoram a circulação sanguínea naturalmente.',
    benefits: ['Circulação Natural', 'Saúde Cardiovascular', 'Fluxo Peniano'],
    ingredients: [
      { name: 'Raiz de gengibre ralado', qty: '1 colher sopa' },
      { name: 'Dentes de alho picados', qty: '2 unidades' },
      { name: 'Limão (suco)', qty: '1 unidade' },
      { name: 'Água', qty: '500ml' },
      { name: 'Mel', qty: 'a gosto' }
    ],
    instructions: [
      'Ferver a água com gengibre e alho por 10 minutos.',
      'Coar, adicionar limão e mel.',
      'Tomar 1 xícara pela manhã e 1 à tarde.'
    ],
    tips: ['O alho e gengibre são auxiliares poderosos para o fluxo sanguíneo.']
  },

  // GOZO RAPIDO
  'smoothie-controlador': {
    id: 'smoothie-controlador',
    name: 'Smoothie Controlador',
    icon: 'Timer',
    type: 'main',
    category: 'gozo-rapido',
    timing: '1 hora antes da atividade sexual',
    serve: 'O triptofano ajuda na produção de serotonina, que regula o reflexo ejaculatório.',
    benefits: ['Regulação de Serotonina', 'Controle de Reflexo', 'Estabilidade Glicêmica'],
    ingredients: [
      { name: 'Extrato de Ginseng Coreano', qty: '200mg' },
      { name: 'Tribulus Terrestris', qty: '500mg' },
      { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
      { name: 'Banana (rica em triptofano)', qty: '1 unidade' },
      { name: 'Aveia', qty: '30g' },
      { name: 'Leite de amêndoas', qty: '200ml' },
      { name: 'Pasta de amendoim', qty: '1 colher sopa' }
    ],
    instructions: [
      'Bater tudo no liquidificador.',
      'Tomar 1 hora antes da atividade sexual.'
    ],
    tips: [
      'A banana e aveia ajudam na serenidade e controle.',
      'O Bicarbonato de sódio deve ser usado APENAS na primeira vez que fizer a receita (não há problema em misturar com os outros itens).'
    ]
  },
  'suplemento-diario-controle': {
    id: 'suplemento-diario-controle',
    name: 'Suplemento Diário para Controle',
    icon: 'Shield',
    type: 'complementary',
    category: 'gozo-rapido',
    timing: 'Após o almoço, diariamente',
    serve: 'O zinco é essencial para a síntese de testosterona e controle ejaculatório.',
    benefits: ['Saúde Testicular', 'Síntese de Testosterona', 'Regulação Nervosa'],
    ingredients: [
      { name: 'Zinco quelato', qty: '25mg' },
      { name: 'Magnésio', qty: '200mg' },
      { name: 'Ômega-3', qty: '1000mg' },
      { name: 'Vitamina B6', qty: '100mg' }
    ],
    instructions: [
      'Tomar 1 cápsula de cada após o almoço.'
    ],
    tips: ['Magnésio e B6 ajudam a regular os neurotransmissores do controle.']
  },
  'cha-calmante-sexual': {
    id: 'cha-calmante-sexual',
    name: 'Chá Calmante Sexual',
    icon: 'Wind',
    type: 'complementary',
    category: 'gozo-rapido',
    timing: '30 min antes da relação',
    serve: 'Reduz a ansiedade de desempenho, principal causa da ejaculação precoce.',
    benefits: ['Redução de Ansiedade', 'Relaxamento Mental', 'Foco no Momento'],
    ingredients: [
      { name: 'Camomila', qty: '1 colher chá' },
      { name: 'Erva-cidreira', qty: '1 colher chá' },
      { name: 'Maracujá (folhas)', qty: '1 colher chá' },
      { name: 'Água quente', qty: '300ml' }
    ],
    instructions: [
      'Infusão de 10 minutos.',
      'Coar e tomar 30 minutos antes da relação.'
    ],
    tips: ['Excelente para noites onde a pressão é maior.']
  },

  // PAU MEIA-BOMBA
  'shot-potencializador': {
    id: 'shot-potencializador',
    name: 'Shot Potencializador de Ereção',
    icon: 'Activity',
    type: 'main',
    category: 'pau-meia-bomba',
    timing: '2 horas antes da relação',
    serve: 'Aumenta drasticamente o óxido nítrico, melhorando a rigidez em até 74%.',
    benefits: ['Máxima Rigidez', 'Pico de Óxido Nítrico', 'Prontidão Imediata'],
    ingredients: [
      { name: 'L-arginina', qty: '6g' },
      { name: 'L-citrulina', qty: '2g' },
      { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
      { name: 'Zinco', qty: '30mg' },
      { name: 'Ginseng Vermelho', qty: '200mg' },
      { name: 'Suco de beterraba pequena', qty: '1 unidade' },
      { name: 'Água', qty: '100ml' }
    ],
    instructions: [
      'Misturar tudo e tomar 2 horas antes da relação.'
    ],
    tips: [
      'A beterraba é um supernitrato natural.',
      'O Bicarbonato de sódio deve ser usado APENAS na primeira vez que fizer a receita (não há problema em misturar com os outros itens).'
    ]
  },
  'combinacao-noturna': {
    id: 'combinacao-noturna',
    name: 'Combinação Noturna para Rigidez',
    icon: 'Moon',
    type: 'complementary',
    category: 'pau-meia-bomba',
    timing: 'Metade manhã, metade noite',
    serve: 'Ataca múltiplas vias: circulação, óxido nítrico e libido simultaneamente.',
    benefits: ['Manutenção da Rigidez', 'Circularidade Persistente', 'Suporte Integral'],
    ingredients: [
      { name: 'Maca Peruana em pó', qty: '3g' },
      { name: 'Tribulus Terrestris', qty: '500mg' },
      { name: 'Ginseng Vermelho Coreano', qty: '350mg' },
      { name: 'Zinco quelato', qty: '30mg' }
    ],
    instructions: [
      'Dividir em 2 doses.',
      'Tomar metade pela manhã e metade à noite.'
    ],
    tips: ['Uso contínuo traz melhores resultados para a densidade cavernosa.']
  },
  'suco-verde-circulatorio': {
    id: 'suco-verde-circulatorio',
    name: 'Suco Verde Circulatório',
    icon: 'Leaf',
    type: 'complementary',
    category: 'pau-meia-bomba',
    timing: 'Manhã em jejum',
    serve: 'Beterraba e aipo agem como vasodilatadores potentes para Ereção.',
    benefits: ['Vasodilatação Natural', 'Energia de Jejum', 'Saúde Endotelial'],
    ingredients: [
      { name: 'Beterraba pequena', qty: '1 unidade' },
      { name: 'Talos de aipo', qty: '2 unidades' },
      { name: 'Maçã verde', qty: '1 unidade' },
      { name: 'Gengibre', qty: '2cm' },
      { name: 'Limão (suco)', qty: '1 unidade' },
      { name: 'Água de coco', qty: '200ml' }
    ],
    instructions: [
      'Bater tudo no liquidificador ou centrifugar.',
      'Tomar pela manhã em jejum.'
    ],
    tips: ['A água de coco ajuda na hidratação e transporte de nutrientes.']
  },

  // SEM TESAO
  'shake-estimulante': {
    id: 'shake-estimulante',
    name: 'Shake Estimulante de Libido',
    icon: 'Flame',
    type: 'main',
    category: 'sem-tesao',
    timing: 'Pela manhã',
    serve: 'A maca peruana melhora significativamente o desejo sexual crônico.',
    benefits: ['Desejo Restaurado', 'Estímulo Dopaminérgico', 'Vigor Mental'],
    ingredients: [
      { name: 'Maca Peruana em pó', qty: '3g' },
      { name: 'Tribulus Terrestris', qty: '500mg' },
      { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
      { name: 'Zinco', qty: '30mg' },
      { name: 'Banana', qty: '1 unidade' },
      { name: 'Cacau em pó puro', qty: '30g' },
      { name: 'Leite vegetal', qty: '200ml' },
      { name: 'Mel', qty: '1 colher' }
    ],
    instructions: [
      'Bater tudo no liquidificador.',
      'Tomar pela manhã.'
    ],
    tips: [
      'O cacau contém teobromina, um estimulante natural de bem-estar.',
      'O Bicarbonato de sódio deve ser usado APENAS na primeira vez que fizer a receita (não há problema em misturar com os outros itens).'
    ]
  },
  'detox-vascular': {
    id: 'detox-vascular',
    name: 'Tônico Detox Vascular (CORE)',
    icon: 'Droplet',
    type: 'detox',
    category: 'all',
    timing: 'Em jejum por 7 dias',
    serve: 'Limpeza profunda das artérias para restaurar a resposta erétil natural.',
    benefits: ['Limpeza Arterial', 'Restauração Endotelial', 'Desintoxicação'],
    ingredients: [
      { name: 'Limão espremido', qty: '1 unidade' },
      { name: 'Vinagre de maçã orgânico', qty: '1 colher sopa' },
      { name: 'Bicarbonato de sódio', qty: '1/4 de colher de café (aprox. 1g)' },
      { name: 'Água morna', qty: '200ml' }
    ],
    instructions: [
      'Misturar o limão e o bicarbonato primeiro.',
      'Adicionar a água morna e o vinagre.',
      'Tomar em jejum logo ao acordar.'
    ],
    tips: [
      'O Bicarbonato de sódio deve ser usado APENAS na primeira vez que fizer a receita para preparar o organismo.',
      'Pode ser misturado com os outros ingredientes sem problemas.'
    ]
  },
  'suplemento-hormonal-natural': {
    id: 'suplemento-hormonal-natural',
    name: 'Suplemento Hormonal Natural',
    icon: 'Dna',
    type: 'complementary',
    category: 'sem-tesao',
    timing: 'Manhã com café da manhã',
    serve: 'Zinco e Vitamina D3 são pilares da produção de testosterona.',
    benefits: ['Suporte Hormonal', 'Otimização de Testo', 'Saúde Metabólica'],
    ingredients: [
      { name: 'Maca Peruana', qty: '3g' },
      { name: 'Zinco quelato', qty: '30mg' },
      { name: 'Magnésio', qty: '200mg' },
      { name: 'Vitamina D3', qty: '3000 UI' },
      { name: 'Tribulus Terrestris', qty: '500mg' }
    ],
    instructions: [
      'Tomar com o café da manhã.',
      'Uso diário por no mínimo 8 semanas.'
    ],
    tips: ['A constância é chave para regular os níveis hormonais.']
  },
  'cha-energizante': {
    id: 'cha-energizante',
    name: 'Chá Energizante Sexual',
    icon: 'Flashlight',
    type: 'complementary',
    category: 'sem-tesao',
    timing: 'Manhã ou Pré-Encontro',
    serve: 'Canela e cravo melhoram a circulação, ginseng aumenta energia e libido.',
    benefits: ['Energia Imediata', 'Circulação Periférica', 'Foco e Disposição'],
    ingredients: [
      { name: 'Raiz de ginseng em pó', qty: '1 colher chá' },
      { name: 'Maca peruana', qty: '1 colher chá' },
      { name: 'Pau de canela', qty: '1 unidade' },
      { name: 'Cravos-da-índia', qty: '3 unidades' },
      { name: 'Água', qty: '300ml' },
      { name: 'Mel', qty: 'a gosto' }
    ],
    instructions: [
      'Ferver água com canela e cravos.',
      'Adicionar ginseng e maca.',
      'Deixar em infusão 10 minutos.',
      'Adoçar com mel.'
    ],
    tips: ['Pode ser tomado morno ou gelado.']
  }
};

export const PROBLEMS_DATA: ProblemInfo[] = [
  {
    id: 'broxada',
    title: 'Broxada',
    cause: 'Fluxo sanguíneo insuficiente para o pênis, causado por problemas vasculares, baixo óxido nítrico ou ansiedade.',
    tonicIds: ['shake-vasodilatador', 'suplemento-noturno-broxada', 'cha-circulatorio']
  },
  {
    id: 'gozo-rapido',
    title: 'Gozo Rápido',
    cause: 'Alterações nas vias de neurotransmissão serotoninérgica, hipersensibilidade genital e causas psicológicas como ansiedade.',
    tonicIds: ['smoothie-controlador', 'suplemento-diario-controle', 'cha-calmante-sexual']
  },
  {
    id: 'pau-meia-bomba',
    title: 'Meio Bomba',
    cause: 'Disfunção venoclusiva, alterações no endotélio vascular e fibrose do tecido cavernoso.',
    tonicIds: ['shot-potencializador', 'combinacao-noturna', 'suco-verde-circulatorio']
  },
  {
    id: 'sem-tesao',
    title: 'Sem Tesão',
    cause: 'Hipogonadismo (baixa testosterona), estresse, ansiedade e fadiga.',
    tonicIds: ['shake-estimulante', 'suplemento-hormonal-natural', 'cha-energizante']
  }
];

export const KEGEL_EXERCISES = [
  {
    title: 'Exercício 1: Kegel Básico (Sentado ou Deitado)',
    how: [
      'Sente-se confortavelmente ou deite de costas.',
      'Contraia com firmeza os músculos do assoalho pélvico, puxando-os para cima.',
      'Mantenha por 3 a 5 segundos.',
      'Relaxe por 3 a 5 segundos.',
      'Faça 10 a 15 contrações seguidas.'
    ],
    frequency: '3 vezes ao dia (manhã, tarde e noite).'
  },
  {
    title: 'Exercício 2: Kegel em Pé',
    how: [
      'Fique em pé com pés afastados.',
      'Contraia os músculos como se impedisse o fluxo de urina.',
      'Mantenha por 5 segundos.',
      'Relaxe por 5 segundos.',
      'Repita 10 vezes.'
    ],
    frequency: 'Durante atividades cotidianas (escovando dentes, etc).'
  },
  {
    title: 'Exercício 3: Kegel Avançado (Progressão)',
    how: [
      'Semanas 1-2: 3 segundos, 10 reps.',
      'Semanas 3-4: 5 segundos, 15 reps.',
      'Semanas 5-6: 8 segundos, 20 reps.',
      'Semanas 7+: 10 segundos, 20-25 reps.'
    ],
    frequency: 'Progressivo conforme evolução.'
  }
];

export const SPECIAL_TECHNIQUES = [
  {
    title: 'Técnica Start-Stop',
    description: 'Interromper a estimulação pouco antes do ponto de ejaculação inevitável.',
    how: [
      'Estimule até chegar a 70-80% da excitação máxima.',
      'PARE completamente.',
      'Contraia o Kegel por 5-10 segundos.',
      'Respire fundo e aguarde a urgência passar.',
      'Recomece. Repita 3-4 vezes.'
    ]
  },
  {
    title: 'Técnica de Compressão (Squeeze)',
    description: 'Apertar a glande para controlar o reflexo.',
    how: [
      'Sinta que vai ejacular e pare.',
      'Aperte firmemente a glande por 10-20 segundos.',
      'Aguarde 30 segundos e recomece.'
    ]
  }
];

export const BONUSES_DATA: Bonus[] = [
  {
    id: 'bonus-erotic',
    title: "Pensamentos Eróticos das Mulheres",
    subtitle: "Acesso Exclusivo",
    description: "Entenda o que se passa na mente feminina durante a intimidade.",
    value: "Inestimável",
    badge: "VIP",
    badgeColor: "bg-[#E63946]",
    icon: "Flame",
    iframeUrl: "https://drive.google.com/file/d/1sMc71po4ZwZu4OXTwjnS3RZ2mQQf7lRE/preview"
  }
];

export const PROBLEM_TO_TONIC: Record<ProblemType, string> = {
  'broxada': 'shake-vasodilatador',
  'gozo-rapido': 'smoothie-controlador',
  'pau-meia-bomba': 'shot-potencializador',
  'sem-tesao': 'shake-estimulante'
};

export const MOCK_USER = {
  id: 'user_123',
  name: 'Membro Elite',
  email: 'elite@protocolo.com',
  createdAt: new Date().toISOString(),
  loginCount: 1,
  currentDay: 1,
  streak: 0,
  completionRate: 0,
  onboardingCompleted: false,
  profile: {}
};

export const INITIAL_MODULES: Module[] = [
  {
    id: 'mod-kegel',
    title: 'GUIA DE EXERCÍCIOS KEGEL',
    icon: 'Activity',
    lessons: [
      { id: 'l1', title: 'Identificando os Músculos', completed: false, type: 'text' },
      { id: 'l2', title: 'Técnica e Rotina', completed: false, type: 'text' },
      { id: 'l3', title: 'Benefícios e Progressão', completed: false, type: 'text' }
    ]
  }
];

export const AI_SYSTEM_INSTRUCTION = "Você é um assistente especialista no Protocolo Força Natural.";
