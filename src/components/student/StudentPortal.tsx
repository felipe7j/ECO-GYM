import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Dumbbell,
  TrendingUp,
  CreditCard,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  User,
  Zap,
} from 'lucide-react';
import { Student, Workout } from '../../types';
import { StudentWorkoutView } from './StudentWorkoutView';
import { StudentEvolution } from './StudentEvolution';
import { EnergyEstimator } from './EnergyEstimator';
import { StudentSchedule } from './StudentSchedule';

interface StudentPortalProps {
  currentStudent: Student;
  workouts: Workout[];
  studentsList: Student[];
  onSelectStudent: (student: Student) => void;
  onNavigateToWorkoutTab?: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  currentStudent,
  workouts,
  studentsList,
  onSelectStudent,
}) => {
  const [activeTab, setActiveTab] = useState<'workout' | 'evolution' | 'energy' | 'schedule'>('workout');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Top Bar: Student Greeting & Student Demo Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={currentStudent.avatarUrl}
            alt={currentStudent.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/50"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-sans">
                Olá, {currentStudent.name.split(' ')[0]}! 👋
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                Aluno Ativo
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Objetivo: <strong className="text-slate-200">{currentStudent.goal}</strong> • Matrícula desde {currentStudent.joinDate}
            </p>
          </div>
        </div>

        {/* Demo switcher to test another student profile */}
        <div className="flex items-center gap-2.5 bg-slate-900/80 rounded-xl p-2 border border-slate-800 self-start lg:self-auto">
          <span className="text-[11px] text-slate-400 font-medium pl-1 hidden sm:inline">
            Alternar Aluno Demo:
          </span>
          <select
            value={currentStudent.id}
            onChange={(e) => {
              const found = studentsList.find((s) => s.id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="bg-slate-950 text-xs text-white rounded-lg border border-slate-700 px-3 py-1.5 focus:border-emerald-500 focus:outline-none"
          >
            {studentsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.lastActiveDaysAgo === 0 ? 'Treinou Hoje' : `${s.lastActiveDaysAgo}d ausente`})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DASHBOARD HERO CARDS — Exactly as requested in prompt item 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* Card 1: Seu Plano */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 hover:border-emerald-500/30 p-4 transition-all shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-slate-400">Seu plano</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black text-white font-sans block">
              {currentStudent.planName.replace('Plano ', '')}
            </span>
            <span className="inline-block mt-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              ● Status Ativo
            </span>
          </div>
        </div>

        {/* Card 2: Próximo Treino */}
        <div 
          onClick={() => setActiveTab('workout')}
          className="rounded-2xl bg-[#111815] border border-emerald-500/30 hover:border-emerald-500 p-4 transition-all shadow-lg flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-emerald-400">Próximo treino</span>
            <Dumbbell className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black text-white font-sans block truncate">
              Treino A — Peito + Tríceps
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-1">
              <span>Iniciar agora</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Card 3: Próxima Sessão */}
        <div 
          onClick={() => setActiveTab('schedule')}
          className="rounded-2xl bg-[#111815] border border-slate-800 hover:border-slate-700 p-4 transition-all shadow-lg flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-slate-400">Próxima sessão</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black text-white font-sans block">
              Hoje — 18:00
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Confirmado na grade
            </span>
          </div>
        </div>

        {/* Card 4: Frequência */}
        <div 
          onClick={() => setActiveTab('schedule')}
          className="rounded-2xl bg-[#111815] border border-slate-800 hover:border-slate-700 p-4 transition-all shadow-lg flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-slate-400">Frequência</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black text-white font-mono block">
              {currentStudent.attendedThisWeek}/{currentStudent.weeklyTargetDays} dias
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
              esta semana ({Math.round((currentStudent.attendedThisWeek / currentStudent.weeklyTargetDays) * 100)}%)
            </span>
          </div>
        </div>

        {/* Card 5: Sequência */}
        <div className="col-span-2 sm:col-span-1 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[#111815] to-emerald-950/30 border border-amber-500/30 p-4 transition-all shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase text-[10px] tracking-wider text-amber-400">Sequência</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white font-mono block">
              🔥 {currentStudent.streakDays} dias
            </span>
            <span className="text-[10px] text-amber-300 font-bold block mt-0.5">
              Recorde de constância
            </span>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1">
        {[
          { id: 'workout', label: 'Treino Personalizado', icon: Dumbbell },
          { id: 'evolution', label: 'Evolução & Medições', icon: TrendingUp },
          { id: 'energy', label: 'Estimativa de Calorias', icon: Flame },
          { id: 'schedule', label: 'Minha Agenda & Presença', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div>
        {activeTab === 'workout' && (
          <StudentWorkoutView workouts={workouts} />
        )}

        {activeTab === 'evolution' && (
          <StudentEvolution currentWeightKg={currentStudent.weightKg} />
        )}

        {activeTab === 'energy' && (
          <EnergyEstimator initialWeightKg={currentStudent.weightKg} />
        )}

        {activeTab === 'schedule' && (
          <StudentSchedule />
        )}
      </div>
    </div>
  );
};
