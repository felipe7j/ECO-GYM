import React, { useState } from 'react';
import { Dumbbell, CheckCircle2, Play, Info, Flame, Sparkles, Check, ChevronRight, Timer, Edit3, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Workout, Exercise } from '../../types';
import { ExerciseModal } from './ExerciseModal';
import { RestTimer } from './RestTimer';
import { soundFx } from '../../utils/audio';

interface StudentWorkoutViewProps {
  workouts: Workout[];
  onWorkoutFinished?: () => void;
}

export const StudentWorkoutView: React.FC<StudentWorkoutViewProps> = ({
  workouts,
  onWorkoutFinished,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<'A' | 'B' | 'C'>('A');
  const [activeWorkouts, setActiveWorkouts] = useState<Workout[]>(workouts);
  const [selectedExerciseForModal, setSelectedExerciseForModal] = useState<Exercise | null>(null);
  const [workoutCompletedCelebration, setWorkoutCompletedCelebration] = useState(false);

  const currentWorkout = activeWorkouts.find((w) => w.letter === selectedLetter) || activeWorkouts[0];

  // Toggle single set in an exercise
  const handleToggleSet = (exerciseId: string, setIndex: number) => {
    setActiveWorkouts((prev) =>
      prev.map((w) => {
        if (w.id !== currentWorkout.id) return w;
        return {
          ...w,
          exercises: w.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            const newSets = [...ex.completedSets];
            newSets[setIndex] = !newSets[setIndex];
            soundFx.playCheckSound();
            return { ...ex, completedSets: newSets };
          }),
        };
      })
    );
  };

  // Toggle entire exercise
  const handleToggleEntireExercise = (exerciseId: string) => {
    setActiveWorkouts((prev) =>
      prev.map((w) => {
        if (w.id !== currentWorkout.id) return w;
        return {
          ...w,
          exercises: w.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            const allCompleted = ex.completedSets.every(Boolean);
            const updatedSets = ex.completedSets.map(() => !allCompleted);
            soundFx.playCheckSound();
            return { ...ex, completedSets: updatedSets };
          }),
        };
      })
    );
  };

  // Adjust load directly by student
  const handleAdjustLoad = (exerciseId: string, delta: number) => {
    setActiveWorkouts((prev) =>
      prev.map((w) => {
        if (w.id !== currentWorkout.id) return w;
        return {
          ...w,
          exercises: w.exercises.map((ex) => {
            if (ex.id !== exerciseId) return ex;
            const newLoad = Math.max(0, Math.round((ex.loadKg + delta) * 10) / 10);
            return { ...ex, loadKg: newLoad };
          }),
        };
      })
    );
  };

  // Check if all exercises are done
  const totalExercises = currentWorkout?.exercises.length || 0;
  const completedExercisesCount = currentWorkout?.exercises.filter((ex) =>
    ex.completedSets.every(Boolean)
  ).length || 0;

  const handleFinishWorkout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#34D399', '#F59E0B', '#FFFFFF'],
    });
    soundFx.playSuccessFanfare();
    setWorkoutCompletedCelebration(true);
    if (onWorkoutFinished) onWorkoutFinished();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Workout Routine Switcher */}
      <div className="rounded-2xl bg-[#111815] border border-emerald-500/20 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Ficha Prescrita pelo Professor
              </span>
              <span className="text-xs text-slate-400">Atualizado em {currentWorkout.lastUpdated}</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans flex items-center gap-2.5">
              <span>{currentWorkout.title}</span>
              <span className="text-emerald-400">—</span>
              <span className="text-slate-200">{currentWorkout.focus}</span>
            </h2>
            {currentWorkout.observations && (
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                💡 <span className="text-slate-300 font-medium">Instrução:</span> {currentWorkout.observations}
              </p>
            )}
          </div>

          {/* Routine Tabs: Treino A, Treino B, Treino C */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            {activeWorkouts.map((w) => (
              <button
                key={w.letter}
                onClick={() => {
                  setSelectedLetter(w.letter);
                  setWorkoutCompletedCelebration(false);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedLetter === w.letter
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Treino {w.letter}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({w.focus.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-400">Progresso do Treino:</div>
            <span className="font-mono font-bold text-sm text-emerald-400">
              {completedExercisesCount} de {totalExercises} exercícios concluídos
            </span>
          </div>

          <button
            onClick={handleFinishWorkout}
            disabled={completedExercisesCount === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs px-5 py-2.5 transition-all shadow-lg shadow-emerald-950/50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finalizar Treino de Hoje</span>
          </button>
        </div>

        {/* Celebration Alert */}
        {workoutCompletedCelebration && (
          <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs font-bold text-white block">Treino Finalizado com Sucesso! 🔥</span>
                <span className="text-[11px] text-emerald-300">
                  Sua frequência e sequência foram atualizadas no seu perfil e no painel da academia.
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">+1 Treino Registrado</span>
          </div>
        )}
      </div>

      {/* Exercises List (Cards / Mobile-Friendly & Desktop Table Hybrid) */}
      <div className="space-y-4">
        {currentWorkout.exercises.map((exercise, index) => {
          const isAllCompleted = exercise.completedSets.every(Boolean);

          return (
            <div
              key={exercise.id}
              className={`rounded-2xl border transition-all p-5 shadow-lg ${
                isAllCompleted
                  ? 'bg-[#0f1712]/90 border-emerald-500/40 shadow-emerald-950/20'
                  : 'bg-[#111815] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left info */}
                <div className="flex items-start gap-3.5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-sm text-slate-300">
                    {index + 1}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-white font-sans">
                        {exercise.name}
                      </h4>
                      <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {exercise.targetMuscle}
                      </span>
                    </div>

                    {exercise.notes && (
                      <p className="text-xs text-slate-400 mt-1">
                        <span className="text-amber-400 font-semibold">Obs:</span> {exercise.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Center / Right specs: Séries, Repetições, Carga, Descanso */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                  {/* Séries & Reps */}
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Séries × Reps</span>
                    <span className="text-sm font-bold text-white font-mono">
                      {exercise.sets} × {exercise.reps}
                    </span>
                  </div>

                  {/* Carga with instant adjustment */}
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Carga Atual</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <button
                        onClick={() => handleAdjustLoad(exercise.id, -2.5)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                        title="Diminuir 2.5kg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold text-emerald-400 font-mono min-w-[50px]">
                        {exercise.loadKg} kg
                      </span>
                      <button
                        onClick={() => handleAdjustLoad(exercise.id, 2.5)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs"
                        title="Aumentar 2.5kg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Rest Timer */}
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold mb-0.5">
                      Descanso
                    </span>
                    <RestTimer initialSeconds={exercise.restSeconds} />
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 ml-auto lg:ml-0">
                    <button
                      type="button"
                      onClick={() => setSelectedExerciseForModal(exercise)}
                      className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 text-xs font-semibold border border-slate-800 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="hidden sm:inline">Demonstração</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleEntireExercise(exercise.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                        isAllCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isAllCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span>{isAllCompleted ? '☑ Concluído' : 'Concluir'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Individual Sets Bubbles */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  Séries individuais:
                </span>
                <div className="flex items-center gap-2">
                  {exercise.completedSets.map((done, setIdx) => (
                    <button
                      key={setIdx}
                      onClick={() => handleToggleSet(exercise.id, setIdx)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all ${
                        done
                          ? 'bg-emerald-500 text-black shadow-sm shadow-emerald-500/50'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                      }`}
                      title={`Série ${setIdx + 1}: ${done ? 'Concluída' : 'Pendente'}`}
                    >
                      {done ? '✓' : setIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Technical Demonstration */}
      {selectedExerciseForModal && (
        <ExerciseModal
          exercise={selectedExerciseForModal}
          onClose={() => setSelectedExerciseForModal(null)}
          onToggleComplete={(id) => {
            handleToggleEntireExercise(id);
            setSelectedExerciseForModal(null);
          }}
          isFullyCompleted={
            currentWorkout.exercises.find((e) => e.id === selectedExerciseForModal.id)?.completedSets.every(Boolean) || false
          }
        />
      )}
    </div>
  );
};
