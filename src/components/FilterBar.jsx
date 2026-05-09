import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function FilterBar({ activeCategory, onCategoryChange, activeStatus, onStatusChange }) {
  const [statuses, setStatuses] = useState([]);
  
  const categories = [
    'Todos',
    'Informática/TI',
    'Elétrica',
    'Predial/Civil',
    'Segurança Eletrônica',
    'Telecomunicações'
  ];

  useEffect(() => {
    async function loadStatuses() {
      const { data } = await supabase.from('statuses').select('name');
      if (data) setStatuses(['Todos', ...data.map(s => s.name)]);
    }
    loadStatuses();
  }, []);

  return (
    <div className="p-4 border-b border-outline-variant/30 bg-surface-bright flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      
      {/* CATEGORIES SCROLLABLE */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        <span className="font-label-md text-label-md text-outline uppercase shrink-0 mr-2">Categorias:</span>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button 
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-mono-label text-mono-label border transition-all ${
                isActive 
                  ? 'bg-primary text-on-primary border-primary shadow-sm' 
                  : 'bg-surface-container-high text-on-surface-variant border-outline-variant hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* STATUS COMBOBOX */}
      <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
        <span className="font-label-md text-label-md text-outline uppercase shrink-0">Status:</span>
        <select 
          value={activeStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="bg-surface-container-low border border-outline-variant rounded-xl px-4 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer min-w-[140px]"
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

    </div>
  );
}
