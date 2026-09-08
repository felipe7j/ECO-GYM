import React, { useState } from 'react';
import { Flame, Info, Sparkles, Activity, Clock, Weight, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface EnergyEstimatorProps {
  initialWeightKg?: number;
}

interface ActivityType {
  id: string;
  name: string;
  category: string;
  baseMet: number; // Metabolic Equivalent of Task
}

const ACTIVITIES: ActivityType[] = [
  { id: 'strength_mod', name: 'Musculação (Moderada / Séries Tradicionais)', category: 'Musculação', baseMet: 5.0 },
  { id: 'strength_heavy', name: 'Musculação (Pesada / Carga Elevada & Descanso Curto)', category: 'Musculação', baseMet: 6.8 },
  { id: 'functional', name: 'Treinamento Funcional / Circuito Dinâmico', category: 'Funcional', baseMet: 7.5 },
  { id: 'cross', name: 'Cross Training (WOD / LPO / Cardio Intenso)', category: 'Cross', baseMet: 8.5 },
  { id: 'treadmill_jog', name: 'Esteira (Trote / Corrida Leve 8-10 km/h)', category: 'Cardio', baseMet: 8.0 },
  { id: 'bike_spin', name: 'Spinning / Ciclismo Indoor', category: 'Cardio', baseMet: 7.2 },
  { id: 'stretching', name: 'Alongamento & Mobilidade Articular', category: 'Mobilidade', baseMet: 2.8 },
];

export const EnergyEstimator: React.FC<EnergyEstimatorProps> = ({ initialWeightKg = 77.2 }) => {
  const [selectedActivityId, setSelectedActivityId] = useState<string>('strength_heavy');
  const [durationMinutes, setDurationMinutes] = useState<number>(55);
  const [intensityMultiplier, setIntensityMultiplier] = useState<number>(1.0); // 0.8: Leve, 1.0: Moderada, 1.2: Intensa, 1.35: Máxima
  const [weightKg, setWeightKg] = useState<number>(initialWeightKg);
  const [savedLogs, setSavedLogs] = useState<Array<{ id: string; date: string; activity: string; calories: number; duration: number }>>([
    { id: 'log1', date: 'Hoje', activity: 'Musculação (Pesada)', calories: 362, duration: 55 },
    { id: 'log2', date: 'Ontem', activity: 'Treinamento Funcional', calories: 410, duration: 50 },
    { id: 'log3', date: '05/09', activity: 'Musculação (Moderada)', calories: 310, duration: 50 },
  ]);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const currentActivity = ACTIVITIES.find((a) => a.id === selectedActivityId) || ACTIVITIES[0];

  // Standard MET formula: Calories = MET * Weight(kg) * (DurationMinutes / 60) * intensity
  const calculatedMet = currentActivity.baseMet * intensityMultiplier;
  const estimatedCalories = Math.round(calculatedMet * weightKg * (durationMinutes / 60));

  const handleSaveToDiary = () => {
    const newLog = {
      id: `log_${Date.now()}`,
      date: 'Hoje',
      activity: currentActivity.name.split(' (')[0],
      calories: estimatedCalories,
      duration: durationMinutes,
    };
    setSavedLogs([newLog, ...savedLogs]);
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Concept Header */}
      <div className="rounded-2xl bg-[#111815] border border-emerald-500/20 p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-emerald-500/30 text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Estimativa de Gasto Energético</h2>
            <p className="text-xs text-slate-400">
              Calcule a projeção energética aproximada do seu treino com base no equivalente metabólico (MET).
            </p>
          </div>
        </div>

        {/* Highlight Result Card */}
        <div className="my-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#111815] to-emerald-950/40 border border-emerald-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-1">
              Projeção Informativa
            </span>
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">
                ~{estimatedCalories}
              </span>
              <span className="text-xl font-bold text-emerald-400 font-sans">kcal</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Equivalente a cerca de {(estimatedCalories / (durationMinutes || 1)).toFixed(1)} kcal por minuto ativo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleSaveToDiary}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 transition-all shadow-lg shadow-emerald-900/30"
            >
              {showSavedFeedback ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Registrado no Diário!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Salvar no Diário de Treino</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mandatory Ethical / Scientific Caveat */}
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="block font-bold text-amber-300 mb-0.5">
              Ressalva Importante: Estimativa informativa. O gasto energético real pode variar.
            </strong>
            O cálculo utiliza referências do Compêndio de Atividades Físicas (METs). Valores exatos dependem de fatores individuais como taxa metabólica basal, massa muscular, nível de condicionamento cardiorrespiratório e eficiência do movimento. Não substitui avaliação nutricional individualizada.
          </div>
        </div>
      </div>

      {/* Interactive Calculator Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Activity Selection */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>1. Selecione a Atividade</span>
          </div>

          <div className="space-y-2">
            {ACTIVITIES.map((act) => {
              const isSelected = act.id === selectedActivityId;
              return (
                <button
                  key={act.id}
                  onClick={() => setSelectedActivityId(act.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{act.name}</span>
                    <span className="text-[10px] text-slate-400">{act.category}</span>
                  </div>
                  <span className={`font-mono text-[11px] px-2 py-0.5 rounded ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                    MET {act.baseMet}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Parameters (Duration, Intensity, Weight) */}
        <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6 space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span>2. Parâmetros da Sessão</span>
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Duração do Treino
              </span>
              <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {durationMinutes} min
              </span>
            </div>
            <input
              type="range"
              min={15}
              max={120}
              step={5}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>15 min</span>
              <span>45 min</span>
              <span>60 min</span>
              <span>90 min</span>
              <span>120 min</span>
            </div>
          </div>

          {/* Intensity Selector */}
          <div className="space-y-2">
            <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
              <Flame className="w-3.5 h-3.5 text-emerald-400" /> Nível de Esforço / Intensidade
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Leve', value: 0.85, desc: 'Sem ofegar' },
                { label: 'Moderada', value: 1.0, desc: 'Padrão' },
                { label: 'Intensa', value: 1.2, desc: 'Respiração alta' },
                { label: 'Máxima', value: 1.35, desc: 'Fadiga extrema' },
              ].map((lvl) => (
                <button
                  key={lvl.label}
                  type="button"
                  onClick={() => setIntensityMultiplier(lvl.value)}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    intensityMultiplier === lvl.value
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="block text-xs font-bold">{lvl.label}</span>
                  <span className="block text-[9px] opacity-75 mt-0.5">{lvl.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Weight className="w-3.5 h-3.5 text-emerald-400" /> Seu Peso Corporal
              </span>
              <span className="text-[11px] text-slate-400">(Registrado no perfil)</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={40}
                max={200}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(30, Number(e.target.value)))}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3.5 py-2 text-sm text-white font-mono focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-xs font-bold text-slate-400">kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Diary / History */}
      <div className="rounded-2xl bg-[#111815] border border-slate-800 p-6">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" /> Histórico de Estimativas Registradas
        </h3>
        <div className="divide-y divide-slate-800/80">
          {savedLogs.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  {log.date}
                </span>
                <span className="font-semibold text-slate-200">{log.activity}</span>
                <span className="text-slate-500">({log.duration} min)</span>
              </div>
              <div className="font-mono font-bold text-emerald-400">
                ~{log.calories} kcal
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
