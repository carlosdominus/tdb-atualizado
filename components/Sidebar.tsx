
import React from 'react';
import { View } from '../types';
import { Home, HelpCircle, BookOpen, Gift, Beaker, Shield, User, X, LogOut, Zap, ShoppingCart, Crown } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  onLogout: () => void;
  currentView: View;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate, onLogout, currentView }) => {
  const menuItems = [
    { id: View.UPSELL, label: 'Acelere seus Resultados', icon: <ShoppingCart size={20} />, highlight: true },
    { id: View.DASHBOARD, label: 'Painel Inicial', icon: <Home size={20} /> },
    { id: View.PREMIUM, label: 'Diagnóstico Individual (Premium)', icon: <Crown size={20} /> },
    { id: View.BONUSES, label: 'Bônus Especial', icon: <Gift size={20} /> },
    { id: View.TRACKER, label: 'Tônico do Cavalo', icon: <Zap size={20} /> },
    { id: View.ANTI_PRECOCE, label: 'Protocolo Anti-Precoce', icon: <BookOpen size={20} /> },
    { id: View.GUIA_COMEDOR, label: 'Guia do Comedor', icon: <BookOpen size={20} /> },
    { id: View.TRUQUE_CUPIDO, label: 'Truque do Cupido', icon: <BookOpen size={20} /> },
  ];

  const bottomItems = [
    { id: View.PROFILE, label: 'Meu Perfil', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside className={`fixed top-0 left-0 bottom-0 w-72 bg-white z-[70] shadow-2xl transition-transform duration-500 ease-apple ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-white shadow-sm">
                <Logo size={24} />
              </div>
              <span className="font-extrabold text-lg text-[#1D1D1F] tracking-tight">PROTOCOL <span className="text-[#E63946] font-medium">ELITE</span></span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 mt-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-[13px] tracking-tight text-left transition-all ${
                  currentView === item.id 
                    ? 'bg-[#1C1C1E] text-white shadow-md' 
                    : item.highlight 
                      ? 'bg-[#E63946] text-white hover:bg-red-600 shadow-sm'
                      : 'text-[#86868B] hover:bg-gray-100 hover:text-black'
                }`}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 pb-2">
              <div className="h-px bg-gray-100 w-full mb-4" />
              {bottomItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl font-semibold text-[13px] tracking-tight text-left transition-all ${currentView === item.id ? 'bg-[#1C1C1E] text-white shadow-md' : 'text-[#86868B] hover:bg-gray-100 hover:text-black'}`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-[13px] tracking-tight text-[#E63946] hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Sair da Conta
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
