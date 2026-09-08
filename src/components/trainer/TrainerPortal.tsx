import React, { useState } from 'react';
import {
  Users,
  Search,
  Dumbbell,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  AlertTriangle,
  Send,
  Save,
  ChevronRight,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { Student, Workout, Exercise } from '../../types';
import { soundFx } from '../../utils/audio';

interface TrainerPortalProps {
  students: Student[];
  workouts: Workout[];
  onUpdateWorkout: (updatedWorkout: Workout) => void;
}

export const TrainerPortal: React.FC<TrainerPortalProps> = ({
  students,
  workouts,
  onUpdateWorkout,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('std_joao');
  const [selectedRoutineLetter, setSelectedRoutineLetter] = useState<'A' | 'B' | 'C'>('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [publishSuccessBanner, setPublishSuccessBanner] = useState<string | null>(null);

  // Find active student
  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Find or clone workout for editing
  const existingWorkout = workouts.find(
    (w) => w.studentId === selectedStudent.id && w.letter === selectedRoutineLetter
  ) || workouts.find((w) => w.letter === selectedRoutineLetter) || workouts[0];

  const [editingWorkout, setEditingWorkout] = useState<Workout>({ ...existingWorkout });

  // Update editing workout when routine letter or student changes
  const handleSelectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setPublishSuccessBanner(null);
    const target = workouts.find((w) => w.studentId === studentId && w.letter === selectedRoutineLetter) || workouts[0];
    setEditingWorkout({ ...target, studentId });
  };

  const handleSelectRoutineLetter = (letter: 'A' | 'B' | 'C') => {
    setSelectedRoutineLetter(letter);
    setPublishSuccessBanner(null);
    const target = workouts.find((w) => w.studentId === selectedStudent.id && w.letter === letter) || workouts.find((w) => w.letter === letter) || workouts[0];
    setEditingWorkout({ ...target, studentId: selectedStudent.id, letter });
  };

  // Field change handlers
  const handleUpdateExerciseField = (
    exerciseIndex: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updatedExercises = [...editingWorkout.exercises];
    updatedExercises[exerciseIndex] = {
      ...updatedExercises[exerciseIndex],
      [field]: value,
    };
    setEditingWorkout({ ...editingWorkout, exercises: updatedExercises });
  };

  const handleAddExercise = () => {
    const newEx: Exercise = {
      id: `ex_custom_${Date.now()}`,
      name: 'Elevação Lateral com Halteres',
      targetMuscle: 'Deltóide Lateral',
      sets: 3,
      reps: '12-15',
      loadKg: 12,
      restSeconds: 45,
      notes: 'Manter cotovelos alinhados e sem impulso lombar.',
      demoTips: ['Eleve os braços até a altura dos ombros.', 'Desça controlando a carga.'],
      completedSets: [false, false, false],
    };
    setEditingWorkout({
      ...editingWorkout,
      exercises: [...editingWorkout.exercises, newEx],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const filtered = editingWorkout.exercises.filter((_, idx) => idx !== index);
    setEditingWorkout({ ...editingWorkout, exercises: filtered });
  };

  // Publish Workout
  const handlePublishWorkout = () => {
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    const finalWorkout: Workout = {
      ...editingWorkout,
      studentId: selectedStudent.id,
      letter: selectedRoutineLetter,
      lastUpdated: dateStr,
    };

    onUpdateWorkout(finalWorkout);
    soundFx.playSuccessFanfare();
    setPublishSuccessBanner(`Treino ${selectedRoutineLetter} publicado com sucesso para ${selectedStudent.name}! O aluno receberá a ficha atualizada instantaneamente no app.`);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
              Módulo Técnico
            </span>
            <span className="text-xs text-slate-400">Coordenador: Prof. Carlos Andrade (CREF 089421-G/SP)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans">
            Painel do Professor
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Prescrição individual de treinos, ajuste de sobrecarga, monitoramento e publicação direta para o aluno.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span><strong>{students.length}</strong> alunos sob sua supervisão</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Meus Alunos List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-[#111815] border border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" /> Meus Alunos
              </h3>
              <span className="text-xs font-mono text-slate-400">{filteredStudents.length} cadastrados</span>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Students List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredStudents.map((std) => {
                const isSelected = std.id === selectedStudentId;
                const isInactiveAlert = std.lastActiveDaysAgo >= 7;

                return (
                  <button
                    key={std.id}
                    onClick={() => handleSelectStudent(std.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                        : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={std.avatarUrl}
                        alt={std.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{std.name}</span>
                          {isInactiveAlert && (
                            <span className="p-0.5 rounded bg-amber-500/20 text-amber-400" title="Sem treinar há 7 dias!">
                              <AlertTriangle className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {std.goal}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isInactiveAlert
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {std.lastActiveDaysAgo === 0 ? 'Hoje' : `${std.lastActiveDaysAgo}d atrás`}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ml-auto mt-1 ${isSelected ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Student Details & Workout Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Student Overview Header */}
          <div className="rounded-2xl bg-[#111815] border border-emerald-500/20 p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedStudent.avatarUrl}
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-sans">{selectedStudent.name}</h3>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {selectedStudent.planName}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-1">
                    <span>Objetivo: <strong className="text-slate-200">{selectedStudent.goal}</strong></span>
                    <span>Treinos: <strong className="text-slate-200">A / B / C</strong></span>
                    <span>Última atualização: <strong className="text-emerald-400 font-mono">03/09</strong></span>
                  </div>
                </div>
              </div>

              {/* Alert if student is inactive */}
              {selectedStudent.lastActiveDaysAgo >= 7 && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 px-3 py-2 text-xs text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Atenção: Aluno ausente há {selectedStudent.lastActiveDaysAgo} dias</span>
                </div>
              )}
            </div>
          </div>

          {/* Routine Letter Selection (A, B, C) */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {(['A', 'B', 'C'] as const).map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleSelectRoutineLetter(letter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedRoutineLetter === letter
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Treino {letter}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddExercise}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 border border-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Adicionar Exercício</span>
            </button>
          </div>

          {/* Focus & Observations inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Foco do Treino {selectedRoutineLetter}
              </label>
              <input
                type="text"
                value={editingWorkout.focus}
                onChange={(e) => setEditingWorkout({ ...editingWorkout, focus: e.target.value })}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Observações Técnicas para o Aluno
              </label>
              <input
                type="text"
                value={editingWorkout.observations || ''}
                onChange={(e) => setEditingWorkout({ ...editingWorkout, observations: e.target.value })}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Exercises Table / Form Cards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" /> Lista de Exercícios Prescritos
            </h4>

            {editingWorkout.exercises.map((exercise, idx) => (
              <div
                key={exercise.id || idx}
                className="rounded-xl bg-[#111815] border border-slate-800 p-4 space-y-3 transition-all hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-3">
                    {/* Exercise Name */}
                    <div className="sm:col-span-6">
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                        Nome do Exercício #{idx + 1}
                      </label>
                      <input
                        type="text"
                        value={exercise.name}
                        onChange={(e) => handleUpdateExerciseField(idx, 'name', e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white font-semibold focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Target Muscle */}
                    <div className="sm:col-span-6">
                      <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                        Grupo Muscular Alvo
                      </label>
                      <input
                        type="text"
                        value={exercise.targetMuscle}
                        onChange={(e) => handleUpdateExerciseField(idx, 'targetMuscle', e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-emerald-400 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Remover exercício"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sub-row: Séries, Reps, Carga, Descanso, Obs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/60">
                  {/* Séries */}
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                      Séries
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={exercise.sets}
                      onChange={(e) => handleUpdateExerciseField(idx, 'sets', Number(e.target.value))}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Repetições */}
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                      Repetições
                    </label>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => handleUpdateExerciseField(idx, 'reps', e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Carga Inicial Sugerida */}
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                      Carga (kg)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min={0}
                      value={exercise.loadKg}
                      onChange={(e) => handleUpdateExerciseField(idx, 'loadKg', Number(e.target.value))}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-emerald-400 font-mono font-bold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Intervalo de Descanso */}
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-semibold mb-1">
                      Descanso (segundos)
                    </label>
                    <input
                      type="number"
                      step="5"
                      min={15}
                      max={300}
                      value={exercise.restSeconds}
                      onChange={(e) => handleUpdateExerciseField(idx, 'restSeconds', Number(e.target.value))}
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Optional Note for this exercise */}
                <div>
                  <input
                    type="text"
                    placeholder="Instrução específica (ex: 'Pausa de 2s no peito', 'Ajuste de pegada')"
                    value={exercise.notes || ''}
                    onChange={(e) => handleUpdateExerciseField(idx, 'notes', e.target.value)}
                    className="w-full rounded-lg bg-slate-900/60 border border-slate-800/80 px-3 py-1 text-[11px] text-slate-300 placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Success Banner */}
          {publishSuccessBanner && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-200 font-medium">{publishSuccessBanner}</p>
            </div>
          )}

          {/* HUGE ACTION BUTTON — Exactly as requested in prompt item 8 */}
          <div className="pt-2">
            <button
              onClick={handlePublishWorkout}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 transition-all hover:scale-[1.01]"
            >
              <Send className="w-5 h-5" />
              <span>PUBLICAR TREINO</span>
            </button>
            <span className="block text-center text-[11px] text-slate-500 mt-2">
              Ao publicar, a nova ficha estará disponível imediatamente na Área do Aluno de {selectedStudent.name}.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
