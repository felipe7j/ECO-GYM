import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Timer } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface RestTimerProps {
  initialSeconds: number;
  onFinish?: () => void;
  autoStart?: boolean;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds = 60,
  onFinish,
  autoStart = false,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    if (autoStart) setIsRunning(true);
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            soundFx.playTimerDoneSound();
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const progressPercent = ((initialSeconds - timeLeft) / initialSeconds) * 100;

  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 text-xs text-slate-200">
      <Timer className={`w-3.5 h-3.5 ${isRunning ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
      
      <div className="flex flex-col min-w-[70px]">
        <div className="flex items-baseline justify-between font-mono font-bold text-white">
          <span className="text-sm">{timeLeft}s</span>
          <span className="text-[10px] text-slate-400">/ {initialSeconds}s</span>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden mt-0.5">
          <div
            className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-1">
        <button
          type="button"
          onClick={toggleTimer}
          aria-label={isRunning ? 'Pausar descanso' : 'Iniciar descanso'}
          className="p-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          aria-label="Reiniciar descanso"
          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => soundFx.playTimerDoneSound()}
          title="Testar som"
          aria-label="Testar som do cronômetro"
          className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Volume2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
