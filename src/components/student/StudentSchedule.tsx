import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Flame, Hourglass, Minus, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ScheduleDay } from '../../types';
import { WEEKLY_SCHEDULE_JOAO } from '../../data/mockData';
import { soundFx } from '../../utils/audio';

export const StudentSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleDay[]>(WEEKLY_SCHEDULE_JOAO);
  const [checkedInToday, setCheckedInToday] = useState(false);

  const handleCheckIn = (index: number) => {
    const updated = [...schedule];
    if (updated[index].status === 'scheduled') {
      updated[index] = { ...updated[index], status: 'completed' };
      setSchedule(updated);
      setCheckedInToday(true);
      soundFx.playSuccessFanfare();
    }
  };

  const completedCount = schedule.filter((s) => s.status === 'completed').length;
  const targetCount = 5;

  return (
    <div className="space-y-6">
      {/* Header with Weekly Summary */}
      <div className="rounded-2xl bg-[#111815] border border-emerald-500/20 p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Rotina & Disciplina</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-sans">Minha Agenda & Frequência</h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualize seus horários planejados, registre presença e mantenha sua sequência de treinos.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sequência</span>
                <span className="block text-sm font-black text-white font-mono">🔥 8 dias seguidos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar of Weekly Frequency */}
        <div className="mt-6 rounded-xl bg-slate-900/80 border border-slate-800 p-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-300 font-semibold">Meta de Frequência Semanal</span>
            <span className="font-mono font-bold text-emerald-400">
              {completedCount}/{targetCount} dias cumpridos ({Math.round((completedCount / targetCount) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / targetCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Agenda Table strictly following prompt */}
      <div className="rounded-2xl bg-[#111815] border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" /> Grade Semanal da Sessão
          </h3>
          <span className="text-xs text-slate-400">Horário fixo preferencial: 18:00</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Dia da Semana</th>
                <th className="py-3.5 px-4 font-semibold">Data</th>
                <th className="py-3.5 px-4 font-semibold">Horário</th>
                <th className="py-3.5 px-4 font-semibold">Treino Programado</th>
                <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {schedule.map((item, idx) => {
                const isCompleted = item.status === 'completed';
                const isRest = item.status === 'rest';
                const isScheduled = item.status === 'scheduled';

                return (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {item.dayOfWeek}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">
                      {item.dateLabel}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {item.time}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {item.workoutName}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> ✅ Concluído
                        </span>
                      )}
                      {isRest && (
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-full text-xs">
                          <Minus className="w-3.5 h-3.5" /> — Descanso
                        </span>
                      )}
                      {isScheduled && (
                        <span className="inline-flex items-center gap-1 font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full text-xs">
                          <Hourglass className="w-3.5 h-3.5" /> ⏳ Agendado
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isScheduled && (
                        <button
                          type="button"
                          onClick={() => handleCheckIn(idx)}
                          className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold transition-all hover:scale-105"
                        >
                          Fazer Check-in
                        </button>
                      )}
                      {isCompleted && (
                        <span className="text-[11px] text-slate-500 font-mono">Presente</span>
                      )}
                      {isRest && (
                        <span className="text-[11px] text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gym retention insight banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/20 p-4 text-xs text-slate-300 flex items-center justify-between gap-4">
        <div>
          <span className="font-bold text-white block mb-0.5">
            💡 Conectado ao Painel da Academia:
          </span>
          Sua frequência é sincronizada em tempo real com seu professor e coordenação da academia. Se você precisar alterar o horário habitual de 18:00, basta avisar pelo aplicativo.
        </div>
      </div>
    </div>
  );
};
