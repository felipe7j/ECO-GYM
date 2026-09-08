import React from 'react';
import { X, CheckCircle2, AlertCircle, Dumbbell, ShieldCheck, Info } from 'lucide-react';
import { Exercise } from '../../types';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onToggleComplete: (exerciseId: string) => void;
  isFullyCompleted: boolean;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  onClose,
  onToggleComplete,
  isFullyCompleted,
}) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#111815] border border-emerald-500/30 p-6 shadow-2xl shadow-black max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-1.5">
              {exercise.targetMuscle}
            </span>
            <h3 className="text-xl font-bold text-white font-sans">{exercise.name}</h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Graphic Representation of Exercise Execution */}
        <div className="my-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-black border border-emerald-500/20 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
            <Dumbbell className="w-8 h-8 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
            Demonstração Biomecânica
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Movimento guiado com cadência 2s excêntrico e 1s concêntrico para recrutamento máximo de unidades motoras.
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-center">
            <span className="block text-[11px] text-slate-400 uppercase font-medium">Séries</span>
            <span className="text-lg font-bold text-white font-mono">{exercise.sets}</span>
          </div>
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-center">
            <span className="block text-[11px] text-slate-400 uppercase font-medium">Reps</span>
            <span className="text-lg font-bold text-white font-mono">{exercise.reps}</span>
          </div>
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-center">
            <span className="block text-[11px] text-slate-400 uppercase font-medium">Carga</span>
            <span className="text-lg font-bold text-emerald-400 font-mono">{exercise.loadKg} kg</span>
          </div>
          <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2.5 text-center">
            <span className="block text-[11px] text-slate-400 uppercase font-medium">Descanso</span>
            <span className="text-lg font-bold text-slate-200 font-mono">{exercise.restSeconds}s</span>
          </div>
        </div>

        {/* Technical Execution Tips */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Passo a Passo de Execução</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {exercise.demoTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-900/40 rounded-lg p-2.5 border border-slate-800/60">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="pt-0.5">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Teacher Observations */}
        {exercise.notes && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 mb-5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs font-bold text-amber-300 uppercase tracking-wide">
                Observação do Professor
              </span>
              <p className="text-xs text-amber-100/90 mt-0.5">{exercise.notes}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onToggleComplete(exercise.id);
            }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-semibold text-sm transition-all shadow-lg ${
              isFullyCompleted
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-900/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isFullyCompleted ? 'Exercício Concluído (Desmarcar)' : 'Marcar Exercício como Concluído'}
          </button>
        </div>
      </div>
    </div>
  );
};
