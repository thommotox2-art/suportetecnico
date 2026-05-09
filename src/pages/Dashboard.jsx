import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import TicketTable from '../components/TicketTable';
import FilterBar from '../components/FilterBar';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';

export default function Dashboard() {
  const { user, statusFilter, setStatusFilter } = useAppContext();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [stats, setStats] = useState({
    abertos: 0,
    atendimento: 0,
    pecas: 0,
    concluidos: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { data: tickets } = await supabase.from('tickets').select('*, statuses(name)');
    
    if (tickets) {
      setStats({
        abertos: tickets.filter(t => t.statuses?.name === 'Pendente').length,
        atendimento: tickets.filter(t => t.statuses?.name === 'Em Progresso').length,
        pecas: tickets.filter(t => t.statuses?.name === 'Validando').length,
        concluidos: tickets.filter(t => t.statuses?.name === 'Concluído').length
      });
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-stack-md">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-background">Painel Geral</h2>
          <p className="font-body-md text-body-md text-outline mt-1">Visão geral do sistema de suporte técnico.</p>
        </div>
        <Link to="/novo-chamado" className="bg-primary text-on-primary px-6 py-2.5 rounded hover:bg-primary-container transition-colors border border-primary/20 flex items-center gap-2 font-label-md text-label-md uppercase tracking-wider shadow-sm w-full sm:w-auto justify-center">
          <span className="material-symbols-outlined text-[18px]">add</span>
          NOVO CHAMADO
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-md">
        <StatCard 
          title="CHAMADOS ABERTOS" 
          value={stats.abertos.toString()} 
          icon="computer" 
          trend="+12 desde ontem"
          colorClass="border-l-primary"
        />
        <StatCard 
          title="EM ATENDIMENTO" 
          value={stats.atendimento.toString()} 
          icon="engineering" 
          progress={45}
          colorClass="border-l-primary"
        />
        <StatCard 
          title="AGUARDANDO PEÇAS" 
          value={stats.pecas.toString()} 
          icon="inventory" 
          subtitle="5 críticas aguardando > 48h"
          colorClass="border-l-[#F59E0B]"
        />
        <StatCard 
          title="CONCLUÍDOS HOJE" 
          value={stats.concluidos.toString()} 
          icon="check_circle" 
          subtitle="Tempo médio: 2h 15m"
          colorClass="border-l-outline"
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <FilterBar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          activeStatus={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <TicketTable filterCategory={activeCategory} />
        
        <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/30 flex justify-center">
          <Link to="/meus-chamados" className="text-primary font-label-md text-label-md uppercase tracking-widest hover:underline flex items-center gap-2">
            VER TODOS OS CHAMADOS
          </Link>
        </div>
      </div>

    </div>
  );
}
