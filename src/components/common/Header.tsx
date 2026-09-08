import React from 'react';
import {
  Globe,
  User,
  Dumbbell,
  LayoutDashboard,
  Palette,
  Sparkles,
  Info,
} from 'lucide-react';
import { UserRole, GymTheme } from '../../types';
import { EcoGymLogo } from './EcoGymLogo';

interface HeaderProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  gymTheme: GymTheme;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  gymTheme,
}) => {
  return (
    <div className="bg-[#0b100d] border-b border-emerald-500/20 sticky top-0 z-50">
      {/* Top Demo Context Notification Bar */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
            ECO GYM™ COMMERCIAL DEMO
          </span>
          <span>Sistema Digital White-Label para Venda a Academias</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden md:inline">
            📋 Dados fictícios claramente identificados para demonstração
          </span>
          <span className="text-emerald-400 font-bold">
            Academia Ativa: {gymTheme.name}
          </span>
        </div>
      </div>

      {/* Main Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectRole('public')}>
          <EcoGymLogo customGymName={gymTheme.name} subtext="SISTEMA DIGITAL PARA ACADEMIAS" />
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          <button
            onClick={() => onSelectRole('public')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'public'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. Site Público</span>
          </button>

          <button
            onClick={() => onSelectRole('student')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'student'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>2. Área do Aluno</span>
          </button>

          <button
            onClick={() => onSelectRole('trainer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'trainer'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Dumbbell className="w-3.5 h-3.5" />
            <span>3. Painel do Professor</span>
          </button>

          <button
            onClick={() => onSelectRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'admin'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>4. Painel da Academia</span>
          </button>

          <button
            onClick={() => onSelectRole('white_label')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              currentRole === 'white_label'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Customizar Marca</span>
          </button>
        </div>
      </div>
    </div>
  );
};
