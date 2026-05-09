import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  const { user } = useAppContext();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterTime, setFilterTime] = useState('6_meses');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*, statuses(name, color_class), categories(name)');
    
    if (data) setTickets(data);
    setLoading(false);
  };

  // --- DATA PROCESSING ---

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => 
      filterCategory === 'Todas' || t.categories?.name === filterCategory
    );
  }, [tickets, filterCategory]);

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentMonth = new Date().getMonth();
    
    // Create last 6 months list
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const idx = (currentMonth - i + 12) % 12;
      last6Months.push({ name: months[idx], total: 0, resolvidos: 0 });
    }

    filteredTickets.forEach(t => {
      const date = new Date(t.created_at);
      const monthName = months[date.getMonth()];
      const dataPoint = last6Months.find(m => m.name === monthName);
      if (dataPoint) {
        dataPoint.total += 1;
        if (t.statuses?.name === 'Concluído') {
          dataPoint.resolvidos += 1;
        }
      }
    });

    return last6Months;
  }, [filteredTickets]);

  const statusDistribution = useMemo(() => {
    const dist = {};
    filteredTickets.forEach(t => {
      const name = t.statuses?.name || 'Desconhecido';
      dist[name] = (dist[name] || 0) + 1;
    });

    return Object.keys(dist).map(name => ({
      name,
      value: dist[name]
    }));
  }, [filteredTickets]);

  const COLORS = ['#16a34a', '#F59E0B', '#3b82f6', '#ef4444', '#64748b'];

  if (loading) return <div className="p-8 text-center text-outline">Carregando métricas...</div>;

  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-background">Relatórios e Análises</h2>
          <p className="font-body-md text-body-md text-outline mt-1">Acompanhamento de performance e saúde do sistema.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-widest">Período</label>
            <select 
              value={filterTime} 
              onChange={e => setFilterTime(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="3_meses">Últimos 3 Meses</option>
              <option value="6_meses">Últimos 6 Meses</option>
              <option value="12_meses">Último Ano</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-widest">Categoria</label>
            <select 
              value={filterCategory} 
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option>Todas</option>
              <option>Informática/TI</option>
              <option>Elétrica</option>
              <option>Telecomunicações</option>
            </select>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-stack-md">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Total de Chamados</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold text-on-surface">{filteredTickets.length}</span>
            <span className="text-xs text-primary font-bold mb-1">+5% vs mês ant.</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Taxa de Resolução</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold text-on-surface">
              {filteredTickets.length > 0 
                ? Math.round((filteredTickets.filter(t => t.statuses?.name === 'Concluído').length / filteredTickets.length) * 100) 
                : 0}%
            </span>
            <div className="w-16 h-1.5 bg-surface-container-high rounded-full mb-2">
              <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Tempo Médio (SLA)</p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-3xl font-bold text-on-surface">4.2h</span>
            <span className="text-xs text-secondary font-bold mb-1">-12% (Melhorando)</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Nível de Satisfação</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-bold text-on-surface">4.8</span>
            <div className="flex text-primary">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-[18px]">star</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-md">
        
        {/* MONTHLY ANALYSIS */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline-md text-headline-md font-bold">Volume Mensal</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase text-outline">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary/40"></div> Total</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> Resolvidos</div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ stroke: '#16a34a', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area type="monotone" dataKey="total" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" name="Total" />
                <Area type="monotone" dataKey="resolvidos" stroke="#3b82f6" strokeWidth={2} fill="transparent" name="Resolvidos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* STATUS DISTRIBUTION */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 shadow-md">
          <h3 className="font-headline-md text-headline-md font-bold mb-8">Distribuição por Status</h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="h-64 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-bold text-on-surface">{item.name}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-outline">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
