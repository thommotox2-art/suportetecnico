import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import TicketTable from '../components/TicketTable';
import { useAppContext } from '../context/AppContext';

export default function MyTickets() {
  const { user, statusFilter, setStatusFilter } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('Todos');

  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-background">Meus Chamados</h2>
          <p className="font-body-md text-body-md text-outline mt-1">Olá <span className="font-bold text-on-surface">{user?.full_name}</span>, acompanhe suas solicitações abaixo.</p>
        </div>
        <Link to="/novo-chamado" className="bg-primary text-on-primary px-6 py-2.5 rounded hover:bg-primary-container transition-colors border border-primary/20 flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider shadow-sm w-full sm:w-auto justify-center">
          <span className="material-symbols-outlined text-[18px]">add</span>
          NOVO CHAMADO
        </Link>
      </div>

      {/* Tickets List */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[500px]">
        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          activeStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <TicketTable filterCategory={activeCategory} />
      </div>

    </div>
  );
}
