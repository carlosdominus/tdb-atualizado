
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, AppState, UserProfile, Tonic, ProblemType } from './types.ts';
import { MOCK_USER, INITIAL_MODULES, TONICS, PROBLEM_TO_TONIC, COLORS } from './constants.tsx';
import { LoginView } from './views/LoginView.tsx';
import { OnboardingView } from './views/OnboardingView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { TonicDetailView } from './views/TonicDetailView.tsx';
import { CatalogView } from './views/CatalogView.tsx';
import { PremiumView } from './views/PremiumView.tsx';
import { TrackerView } from './views/TrackerView.tsx';
import { ChecklistView } from './views/ChecklistView.tsx';
import { BonusesView } from './views/BonusesView.tsx';
import { ProfileView } from './views/ProfileView.tsx';
import { WarrantyView } from './views/WarrantyView.tsx';
import { HelpView } from './views/HelpView.tsx';
import { ScienceView } from './views/ScienceView.tsx';
import { ExclusivePackageView } from './views/ExclusivePackageView.tsx';
import { ExclusivePackage2View } from './views/ExclusivePackage2View.tsx';
import { UpsellView } from './views/UpsellView.tsx';
import { PdfView } from './views/PdfView.tsx';
import { WelcomeModal } from './components/WelcomeModal.tsx';
import { LaraPopup } from './components/LaraPopup.tsx';
import { Logo } from './components/Logo.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { ProblemDetailView } from './views/ProblemDetailView.tsx';
import { KegelsView } from './views/KegelsView.tsx';
import { AnxietyView } from './views/AnxietyView.tsx';
import { Home, Beaker, Crown, Zap, Gift, Menu, ListChecks } from 'lucide-react';

const STORAGE_KEY = 'protocolo_forca_natural_v2';

const VIEW_TO_HASH: Record<View, string> = {
  [View.DASHBOARD]: 'dashboard',
  [View.CATALOG]: 'catalogo',
  [View.PREMIUM]: 'premium',
  [View.TRACKER]: 'turbo',
  [View.CHECKLIST]: 'checklist',
  [View.BONUSES]: 'bonus',
  [View.WARRANTY]: 'garantia',
  [View.HELP]: 'suporte',
  [View.SCIENCE]: 'ciencia',
  [View.PROFILE]: 'perfil',
  [View.MODULE]: 'modulo',
  [View.TONIC_DETAIL]: 'tonico',
  [View.EXCLUSIVE_PACKAGE]: 'tonico-cavalo',
  [View.EXCLUSIVE_PACKAGE_2]: 'guia-posicoes',
  [View.LOGIN]: 'login',
  [View.ONBOARDING]: 'onboarding',
  [View.UPSELL]: 'oferta-especial',
  [View.ANTI_PRECOCE]: 'protocolo-anti-precoce',
  [View.GUIA_COMEDOR]: 'guia-do-comedor',
  [View.TRUQUE_CUPIDO]: 'truque-do-cupido',
  [View.PROBLEM_DETAIL]: 'problema',
  [View.KEGELS]: 'kegels',
  [View.ANSIEDADE]: 'ansiedade'
};

const HASH_TO_VIEW: Record<string, View> = Object.entries(VIEW_TO_HASH).reduce(
  (acc, [view, hash]) => ({ ...acc, [hash]: view as View }),
  {}
);

// Carregamento síncrono ultra-robusto
const loadState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Garante que se já concluiu onboarding, os flags estão corretos
      if (parsed.user && parsed.user.onboardingCompleted) {
        parsed.isLoggedIn = true;
      }
      return parsed;
    } catch (e) {
      console.error("Erro ao ler localStorage", e);
    }
  }
  return {
    user: null,
    modules: INITIAL_MODULES,
    checklist: {},
    isLoggedIn: false,
    hasSeenWelcomeVideo: false
  };
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(loadState());
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [activeTonicId, setActiveTonicId] = useState<string | null>(null);
  const [activeProblemId, setActiveProblemId] = useState<ProblemType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Efeito de persistência imediata
  useEffect(() => {
    // Replacer function to handle circular structures and DOM elements
    const replacer = (key: string, value: any) => {
      if (value instanceof HTMLElement || (value && value.constructor && value.constructor.name === 'HTMLElement')) {
        return undefined;
      }
      return value;
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state, replacer));
    } catch (e) {
      console.error("Erro ao salvar no localStorage", e);
    }
  }, [state]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTonicId, activeProblemId]);

  // Controle do Chatwoot (Suporte)
  useEffect(() => {
    const toggleChatwoot = (show: boolean) => {
      // 1. Via DOM (Mais garantido para o balão)
      const selectors = ['.woot-widget-bubble', '.woot--bubble-holder', '#chatwoot_widget--iframe'];
      selectors.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) (el as HTMLElement).style.setProperty('display', show ? 'flex' : 'none', 'important');
      });
      
      // 2. Via SDK (Se disponível e com as funções corretas)
      const sdk = (window as any).$chatwoot;
      if (sdk) {
        if (typeof sdk.setWidgetVisibility === 'function') {
          sdk.setWidgetVisibility(show ? 'show' : 'hide');
        } else if (typeof sdk.toggle === 'function' && !show) {
          sdk.toggle('close');
        }
      }
    };

    const shouldHide = !state.hasSeenWelcomeVideo || currentView === View.UPSELL;
    toggleChatwoot(!shouldHide);
  }, [currentView, state.hasSeenWelcomeVideo]);

  const navigateTo = (view: View, id?: string) => {
    let hash = VIEW_TO_HASH[view];
    if (view === View.TONIC_DETAIL && id) {
      hash = `${hash}/${id}`;
    }
    if (view === View.PROBLEM_DETAIL && id) {
      hash = `${hash}/${id}`;
    }
    window.location.hash = hash;
  };

  // Roteador Inteligente: Bloqueia retorno ao onboarding/login se já estiver pronto
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace('#', '');
      const [hashBase, id] = fullHash.split('/');
      const targetView = HASH_TO_VIEW[hashBase];

      // LOGICA DE PROTEÇÃO
      if (!state.isLoggedIn) {
        // Se não logou, obriga login
        if (targetView !== View.LOGIN) {
          window.location.hash = 'login';
          return;
        }
      } else if (!state.user?.onboardingCompleted) {
        // Se logou mas não fez onboarding, obriga onboarding
        if (targetView !== View.ONBOARDING) {
          window.location.hash = 'onboarding';
          return;
        }
      } else {
        // SE JÁ FEZ TUDO: Nunca deixa voltar para login ou onboarding
        if (!targetView || targetView === View.LOGIN || targetView === View.ONBOARDING) {
          window.location.hash = 'dashboard';
          return;
        }
      }

      setCurrentView(targetView || (state.isLoggedIn ? View.DASHBOARD : View.LOGIN));
      if (targetView === View.TONIC_DETAIL && id) setActiveTonicId(id);
      if (targetView === View.PROBLEM_DETAIL && id) setActiveProblemId(id as ProblemType);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [state.isLoggedIn, state.user?.onboardingCompleted]);

  const handleLogin = (name: string, email: string) => {
    const newUser = { 
      ...MOCK_USER, 
      name, 
      email,
      id: `user_${Date.now()}`, // ID único por sessão de login
      createdAt: new Date().toISOString(),
      onboardingCompleted: false
    };
    
    // Webhook de Login (sem travar o app)
    fetch('https://nen.auto-jornada.space/webhook/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, qtd_login: 1, nome: name }),
    }).catch(() => {});

    setState(prev => ({ ...prev, isLoggedIn: true, user: newUser }));
    window.location.hash = 'onboarding';
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    // Webhook de Dados
    fetch('https://nen.auto-jornada.space/webhook/clientes-infos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...profile, 
        email: state.user?.email, 
        nome: state.user?.name,
        date: new Date().toISOString()
      }),
    }).catch(() => {});

    // Atualiza estado e marca como concluído
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, profile, onboardingCompleted: true } : null
    }));
    
    window.location.hash = 'dashboard';
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = '/'; // Recarrega do zero
  };

  const handleTonicToggle = (date: string, type: 'main' | 'complementary', tonicId?: string) => {
    setState(prev => {
      const current = prev.checklist[date] || { date, mainTonic: false, complementary: [] };
      let updated = { ...current };

      if (type === 'main') {
        updated.mainTonic = !updated.mainTonic;
      } else if (type === 'complementary' && tonicId) {
        updated.complementary = updated.complementary.includes(tonicId)
          ? updated.complementary.filter(id => id !== tonicId)
          : [...updated.complementary, tonicId];
      }

      return { ...prev, checklist: { ...prev.checklist, [date]: updated } };
    });
  };

  const closeWelcomeModal = () => {
    setState(prev => ({ ...prev, hasSeenWelcomeVideo: true }));
  };

  const closeLaraPopup = () => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => ({ ...prev, lastLaraPopupDate: today }));
  };

  const shouldShowLaraPopup = () => {
    if (!state.isLoggedIn || !state.user?.onboardingCompleted || !state.hasSeenWelcomeVideo) return false;
    if (currentView === View.UPSELL || currentView === View.LOGIN || currentView === View.ONBOARDING) return false;
    
    const today = new Date().toISOString().split('T')[0];
    if (state.lastLaraPopupDate === today) return false;

    // Cálculo de dias ativos (mesma lógica do ProfileView)
    const createdDate = new Date(state.user?.createdAt || new Date());
    createdDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(todayDate.getTime() - createdDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // 1 dia sim, um dia não (Dias 1, 3, 5, 7...)
    return diffDays % 2 !== 0;
  };

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN: return <LoginView onLogin={handleLogin} />;
      case View.ONBOARDING: return <OnboardingView onComplete={handleOnboardingComplete} />;
      case View.DASHBOARD: return <DashboardView state={state} onNavigate={navigateTo} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onTonicToggle={handleTonicToggle} />;
      case View.CATALOG: return <CatalogView onBack={() => navigateTo(View.DASHBOARD)} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onNavigate={navigateTo} mainProblem={state.user?.profile?.mainProblem as ProblemType || 'broxada'} />;
      case View.PREMIUM: return <PremiumView state={state} onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.TRACKER: return <TrackerView state={state} onBack={() => navigateTo(View.DASHBOARD)} onNavigate={navigateTo} toggleCheck={handleTonicToggle} />;
      case View.CHECKLIST: return <ChecklistView state={state} onBack={() => navigateTo(View.DASHBOARD)} onTonicToggle={handleTonicToggle} />;
      case View.BONUSES: return <BonusesView onBack={() => navigateTo(View.TRACKER)} />;
      case View.WARRANTY: return <WarrantyView onBack={() => navigateTo(View.DASHBOARD)} firstAccessDate={state.user?.createdAt || ''} />;
      case View.HELP: return <HelpView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.SCIENCE: return <CatalogView onBack={() => navigateTo(View.DASHBOARD)} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onNavigate={navigateTo} mainProblem={state.user?.profile?.mainProblem as ProblemType || 'broxada'} />;
      case View.PROFILE: return <ProfileView state={state} onBack={() => navigateTo(View.DASHBOARD)} onLogout={handleLogout} onNavigate={navigateTo} />;
      case View.TONIC_DETAIL: {
        const tonic = TONICS[activeTonicId || ''] || TONICS['shake-vasodilatador'];
        const isMain = activeTonicId === (PROBLEM_TO_TONIC[state.user?.profile?.mainProblem as ProblemType]);
        const today = new Date().toISOString().split('T')[0];
        const isDone = isMain ? (state.checklist[today]?.mainTonic || false) : (state.checklist[today]?.complementary?.includes(activeTonicId || '') || false);
        return <TonicDetailView tonic={tonic} isMain={isMain} onBack={() => navigateTo(View.CATALOG)} onNavigate={navigateTo} onMarkDone={(id) => handleTonicToggle(today, isMain ? 'main' : 'complementary', id)} isDone={isDone} />;
      }
      case View.PROBLEM_DETAIL: {
        return <ProblemDetailView type={activeProblemId || 'broxada'} onBack={() => navigateTo(View.DASHBOARD)} onNavigate={navigateTo} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} />;
      }
      case View.KEGELS: return <KegelsView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.ANSIEDADE: return <AnxietyView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.EXCLUSIVE_PACKAGE: return <ExclusivePackageView onBack={() => navigateTo(View.TRACKER)} />;
      case View.EXCLUSIVE_PACKAGE_2: return <ExclusivePackage2View onBack={() => navigateTo(View.TRACKER)} />;
      case View.UPSELL: return <UpsellView onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.ANTI_PRECOCE: return <PdfView title="Protocolo Anti-Precoce" pdfUrl="https://drive.google.com/file/d/1iAPmURqXumSPOeaZsBHIx4WKGspIqHNK/preview" onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.GUIA_COMEDOR: return <PdfView title="Guia do Comedor" pdfUrl="https://drive.google.com/file/d/1IGVoCnFr3StTs_cL7j9xOiLCqqgQxDzp/preview" onBack={() => navigateTo(View.DASHBOARD)} />;
      case View.TRUQUE_CUPIDO: return <PdfView title="Truque do Cupido" pdfUrl="https://drive.google.com/file/d/1ibqwEF2Kx9iYBHS-UG19UaF3tFIXvM7f/preview" onBack={() => navigateTo(View.DASHBOARD)} />;
      default: return <DashboardView state={state} onNavigate={navigateTo} onTonicNavigate={(id) => navigateTo(View.TONIC_DETAIL, id)} onTonicToggle={handleTonicToggle} />;
    }
  };

  const isAuthPage = currentView === View.LOGIN || currentView === View.ONBOARDING;
  
  // Se estiver pronto, não mostra nada de login/onboarding
  if (isAuthPage) return renderView();

  return (
    <div className="min-h-screen pb-24 md:pb-0 bg-[#F8F9FA] overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={navigateTo} onLogout={handleLogout} currentView={currentView} />
      
      {state.isLoggedIn && state.user?.onboardingCompleted && !state.hasSeenWelcomeVideo && (
        <WelcomeModal onClose={closeWelcomeModal} />
      )}

      <LaraPopup 
        isVisible={shouldShowLaraPopup()} 
        onClose={closeLaraPopup}
        onConfirm={() => {
          closeLaraPopup();
          navigateTo(View.PREMIUM);
        }}
      />

      <header className="fixed top-0 left-0 right-0 glass z-50 px-6 py-2.5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-black hover:bg-gray-100 rounded-xl transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo(View.DASHBOARD)}>
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-white">
              <Logo size={20} />
            </div>
            <span className="font-extrabold text-base hidden sm:block tracking-tight text-black">PROTOCOL <span className="text-[#E63946] font-medium">ELITE</span></span>
          </div>
        </div>
        <div onClick={() => navigateTo(View.PROFILE)} className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md cursor-pointer">
          {state.user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-20 pb-20 md:pt-24">
        {renderView()}
      </main>

      <nav className="fixed bottom-5 left-4 z-50 flex items-center py-2.5 px-6 glass-dark md:hidden border border-white/10 rounded-2xl shadow-2xl gap-6">
        <NavButton active={currentView === View.DASHBOARD} icon={<Home size={20} />} label="Home" onClick={() => navigateTo(View.DASHBOARD)} />
        <NavButton active={currentView === View.CATALOG} icon={<Beaker size={20} />} label="Catálogo" onClick={() => navigateTo(View.CATALOG)} />
        <NavButton active={currentView === View.TRACKER} icon={<Zap size={20} />} label="Turbo" onClick={() => navigateTo(View.TRACKER)} />
        <NavButton active={currentView === View.BONUSES} icon={<Gift size={20} />} label="Bônus" onClick={() => navigateTo(View.BONUSES)} />
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-[#E63946] scale-105' : 'text-gray-400'}`}>
    {icon}
    <span className="text-[9px] font-bold tracking-tight">{label}</span>
  </button>
);

export default App;
