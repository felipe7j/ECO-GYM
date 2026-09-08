import React from 'react';

interface EcoGymLogoProps {
  customGymName?: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const EcoGymLogo: React.FC<EcoGymLogoProps> = ({
  customGymName,
  subtext = 'SISTEMA DIGITAL PARA ACADEMIAS',
  size = 'md',
  showBadge = true,
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Stylized ECO GYM Athletic Emblem */}
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-950/40 to-black border border-emerald-500/40 p-1.5 shadow-lg shadow-emerald-950/50"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        >
          {/* Stylized Eco Dumbbell + Growth Sprout Leaf */}
          <path 
            d="M6 13C6 11.8954 6.89543 11 8 11V21C6.89543 21 6 20.1046 6 19V13Z" 
            fill="currentColor" 
          />
          <path 
            d="M26 13C26 11.8954 25.1046 11 24 11V21C25.1046 21 26 20.1046 26 19V13Z" 
            fill="currentColor" 
          />
          <rect x="8" y="14" width="16" height="4" rx="2" fill="currentColor" fillOpacity="0.8" />
          <circle cx="16" cy="16" r="3.5" fill="#090D0B" stroke="currentColor" strokeWidth="1.5" />
          {/* Dynamic Eco Growth Ascent Curve */}
          <path 
            d="M16 8C19 8 22 10.5 22 14" 
            stroke="#34D399" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
          <path 
            d="M20 7.5L22.5 9.5L20 11.5" 
            stroke="#34D399" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-white font-sans ${textSize}`}>
            {customGymName || (
              <>
                ECO <span className="text-emerald-400">GYM</span>
              </>
            )}
          </span>
          {showBadge && !customGymName && (
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
              GROWTH™
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
          {subtext}
        </span>
      </div>
    </div>
  );
};
