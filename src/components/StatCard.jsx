import React from 'react';

export default function StatCard({ title, value, icon, colorClass, highlightClass, extraIcon, extraText, isProgress, progressValue }) {
  // colorClass is the background color of the left border and icon bg
  // highlightClass is the icon color

  return (
    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden group">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass}`}></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-label-md text-label-md text-outline uppercase">{title}</p>
          <h3 className="font-headline-xl text-headline-xl text-on-surface mt-2">{value}</h3>
        </div>
        <div className={`p-2 ${highlightClass} rounded-lg`}>
          <span className="material-symbols-outlined filled">{icon}</span>
        </div>
      </div>
      
      {isProgress ? (
        <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
          <div className={`${colorClass} h-full`} style={{ width: `${progressValue}%` }}></div>
        </div>
      ) : (
        <p className="font-body-md text-body-md text-outline mt-4 flex items-center gap-1 text-sm">
          {extraIcon && <span className={`material-symbols-outlined text-[16px] ${highlightClass.split(' ')[0]}`}>{extraIcon}</span>}
          {extraText}
        </p>
      )}
    </div>
  );
}
