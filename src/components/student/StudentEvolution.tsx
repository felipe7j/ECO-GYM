import React, { useState } from 'react';
import { TrendingUp, Scale, Calendar, Dumbbell, Plus, ShieldCheck, Check, Info } from 'lucide-react';
import { WeightRecord, LoadRecord } from '../../types';
import { WEIGHT_HISTORY_JOAO, LOAD_HISTORY_BENCH_PRESS } from '../../data/mockData';

interface StudentEvolutionProps {
  currentWeightKg?: number;
}

export const StudentEvolution: React.FC<StudentEvolutionProps> = ({ currentWeightKg = 77.2 }) => {
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(WEIGHT_HISTORY_JOAO);
  const [loadHistory, setLoadHistory] = useState<LoadRecord[]>(LOAD_HISTORY_BENCH_PRESS);
  
  // Form modal state
  const [showAddWeightModal, setShowAddWeightModal] = useState(false);
  const [newWeight, setNewWeight] = useState(currentWeightKg.toString());
  const [weightNote, setWeightNote] = useState('');

  const [showAddLoadModal, setShowAddLoadModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState('Supino reto');
  const [newLoad, setNewLoad] = useState('67.5');

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newWeight);
    if (isNaN(val) || val <= 0) return;

    const today = new Date();
    const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newRecord: WeightRecord = {
      id: `w_${Date.now()}`,
      date: dateFormatted,
      weightKg: val,
      notes: weightNote || 'Pesagem registrada',
    };

    setWeightHistory([...weightHistory, newRecord]);
    setShowAddWeightModal(false);
    setWeightNote('');
  };

  const handleAddLoad = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(newLoad);
    if (isNaN(val) || val <= 0) return;

    const today = new Date();
    const dateFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const newRecord: LoadRecord = {
      id: `l_${Date.now()}`,
      exerciseName: selectedExercise,
      date: dateFormatted,
      loadKg: val,
    };

    setLoadHistory([...loadHistory, newRecord]);
    setShowAddLoadModal(false);
  };

  // Min / max calculation for SVG visual charts
  const weights = weightHistory.map(w => w.weightKg);
  const minWeight = Math.floor(Math.min(...weights) - 1);
  const maxWeight = Math.ceil(Math.max(...weights) + 1);

  const loads = loadHistory.map(l => l.loadKg);
  const minLoad = Math.floor(Math.min(...loads) - 5);
  const maxLoad = Math.ceil(Math.max(...loads) + 5);

  return (
    <div className="space-y-6">
      {/* Header & Retenção Concept */}
      <div className="rounded-2xl bg-[#111815] border border-emerald-500/20 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Registro de Resultados Reais</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans">Evolução do Aluno</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Acompanhamento histórico com base em pesagens reais e progressão de sobrecarga registradas nos treinos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddWeightModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>Registrar Peso</span>
            </button>
            <button
              onClick={() => setShowAddLoadModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-colors"
            >
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Registrar Carga</span>
            </button>
          </div>
        </div>

        {/* 3 Core Highlight Cards requested by user: Peso, Frequência, Carga no Exercício */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {/* Peso */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Scale className="w-4 h-4 text-emerald-400" /> Peso Corporal
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                -3.0 kg
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">80 kg</span>
              <span className="text-slate-500 font-bold">→</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">77 kg</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Último registro em {weightHistory[weightHistory.length - 1]?.date}
            </p>
          </div>

          {/* Frequência */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-emerald-400" /> Frequência
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                +50% constância
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">12</span>
              <span className="text-slate-500 font-bold">→</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">18</span>
              <span className="text-xs text-slate-400 font-medium">treinos/mês</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Consistência excelente nesta periodização
            </p>
          </div>

          {/* Carga no exercício */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 font-medium truncate">
                <Dumbbell className="w-4 h-4 text-emerald-400" /> Carga: Supino reto
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                +15 kg
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">50 kg</span>
              <span className="text-slate-500 font-bold">→</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">65 kg</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Sobrecarga progressiva aplicada com segurança
            </p>
          </div>
        </div>

        {/* Mandatory Transparency & Anti-False-Promises Disclaimer */}
        <div className="mt-6 rounded-xl bg-slate-900/60 border border-slate-800 p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-white block mb-0.5">
              Diretriz de Transparência ECO GYM:
            </strong>
            O sistema registra estritamente os dados físicos e de cargas fornecidos diretamente pelo aluno ou pelo profissional credenciado. Não inventamos cálculos automáticos de evolução corporal nem prometemos resultados físicos milagrosos.
          </div>
        </div>
      </div>

      {/* Visual Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Load Progression (Supino Reto) */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                Progressão de Carga — Supino Reto
              </h3>
              <p className="text-xs text-slate-400">Histórico de aumento da carga total em kg</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Atual: {loadHistory[loadHistory.length - 1]?.loadKg} kg
            </span>
          </div>

          {/* SVG Line Chart for Load */}
          <div className="h-48 w-full bg-slate-900/50 rounded-xl p-3 border border-slate-800/80 flex flex-col justify-end">
            <div className="relative h-36 w-full">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
              </div>

              {/* SVG Line */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <polygon
                  fill="url(#loadGrad)"
                  points={`
                    0,100
                    ${loadHistory.map((pt, idx) => {
                      const x = (idx / (loadHistory.length - 1)) * 100;
                      const y = 100 - ((pt.loadKg - minLoad) / (maxLoad - minLoad)) * 100;
                      return `${x},${y}`;
                    }).join(' ')}
                    100,100
                  `}
                />
                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={loadHistory.map((pt, idx) => {
                    const x = (idx / (loadHistory.length - 1)) * 100;
                    const y = 100 - ((pt.loadKg - minLoad) / (maxLoad - minLoad)) * 100;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>

              {/* Data points */}
              {loadHistory.map((pt, idx) => {
                const left = (idx / (loadHistory.length - 1)) * 100;
                const bottom = ((pt.loadKg - minLoad) / (maxLoad - minLoad)) * 100;
                return (
                  <div
                    key={pt.id}
                    className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${left}%`, bottom: `${bottom}%` }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#111815] shadow-lg shadow-emerald-500/50 group-hover:scale-125 transition-transform" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-[10px] whitespace-nowrap z-10">
                      <span className="font-bold text-emerald-400">{pt.loadKg} kg</span>
                      <span className="text-slate-400">{pt.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
              {loadHistory.map((pt) => (
                <span key={pt.id}>{pt.date.slice(0, 5)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Graph 2: Weight Curve (80kg -> 77kg) */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                Histórico de Peso Corporal
              </h3>
              <p className="text-xs text-slate-400">Pesagens periódicas registradas na balança</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              Atual: {weightHistory[weightHistory.length - 1]?.weightKg} kg
            </span>
          </div>

          {/* SVG Line Chart for Weight */}
          <div className="h-48 w-full bg-slate-900/50 rounded-xl p-3 border border-slate-800/80 flex flex-col justify-end">
            <div className="relative h-36 w-full">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
              </div>

              {/* SVG Line */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Area */}
                <polygon
                  fill="url(#weightGrad)"
                  points={`
                    0,100
                    ${weightHistory.map((pt, idx) => {
                      const x = (idx / (weightHistory.length - 1)) * 100;
                      const y = 100 - ((pt.weightKg - minWeight) / (maxWeight - minWeight)) * 100;
                      return `${x},${y}`;
                    }).join(' ')}
                    100,100
                  `}
                />
                {/* Line */}
                <polyline
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={weightHistory.map((pt, idx) => {
                    const x = (idx / (weightHistory.length - 1)) * 100;
                    const y = 100 - ((pt.weightKg - minWeight) / (maxWeight - minWeight)) * 100;
                    return `${x},${y}`;
                  }).join(' ')}
                />
              </svg>

              {/* Data points */}
              {weightHistory.map((pt, idx) => {
                const left = (idx / (weightHistory.length - 1)) * 100;
                const bottom = ((pt.weightKg - minWeight) / (maxWeight - minWeight)) * 100;
                return (
                  <div
                    key={pt.id}
                    className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${left}%`, bottom: `${bottom}%` }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#111815] shadow-lg group-hover:scale-125 transition-transform" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center bg-slate-900 border border-slate-700 text-white rounded px-2 py-1 text-[10px] whitespace-nowrap z-10">
                      <span className="font-bold text-white">{pt.weightKg} kg</span>
                      <span className="text-slate-400">{pt.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
              {weightHistory.map((pt) => (
                <span key={pt.id}>{pt.date.slice(0, 5)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Registrar Novo Peso */}
      {showAddWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#111815] border border-emerald-500/30 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Registrar Nova Pesagem</h3>
            <p className="text-xs text-slate-400 mb-4">Insira o peso aferido na balança da academia.</p>

            <form onSubmit={handleAddWeight} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Peso (kg)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="30"
                    max="250"
                    required
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="font-bold text-sm text-slate-400">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Observação (opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Pós-treino, em jejum, etc."
                  value={weightNote}
                  onChange={(e) => setWeightNote(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddWeightModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Registrar Nova Carga */}
      {showAddLoadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-[#111815] border border-emerald-500/30 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Registrar Nova Carga</h3>
            <p className="text-xs text-slate-400 mb-4">Atualize o peso utilizado em séries válidas.</p>

            <form onSubmit={handleAddLoad} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Exercício</label>
                <select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Supino reto">Supino reto</option>
                  <option value="Supino inclinado">Supino inclinado</option>
                  <option value="Leg Press 45º">Leg Press 45º</option>
                  <option value="Puxada alta frente">Puxada alta frente</option>
                  <option value="Tríceps pulley">Tríceps pulley</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nova Carga Total (kg)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="500"
                    required
                    value={newLoad}
                    onChange={(e) => setNewLoad(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="font-bold text-sm text-slate-400">kg</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLoadModal(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
