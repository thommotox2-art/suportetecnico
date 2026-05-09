import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export default function TicketTable({ filterCategory = 'Todos' }) {
  const { user, searchQuery, statusFilter } = useAppContext();
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.role === 'Administrador';
  const isTecnico = user?.role === 'Técnico';

  useEffect(() => {
    fetchTickets();
  }, [searchQuery, statusFilter]); // Recarregar se os filtros globais mudarem

  const fetchTickets = async () => {
    let query = supabase
      .from('tickets')
      .select(`
        *,
        categories(name),
        statuses(name, color_class),
        profiles!tickets_user_id_fkey(full_name),
        assigned:profiles!tickets_assigned_to_fkey(full_name)
      `)
      .order('created_at', { ascending: false });

    if (user.role === 'Cliente') {
      query = query.eq('user_id', user.id);
    }

    const { data } = await query;
    if (data) setTickets(data);
    setLoading(false);
  };

  // Filtragem complexa (Local)
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchCategory = filterCategory === 'Todos' || t.categories?.name === filterCategory;
      const matchStatus = statusFilter === 'Todos' || t.statuses?.name === statusFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        t.subject.toLowerCase().includes(searchLower) || 
        t.profiles?.full_name.toLowerCase().includes(searchLower);
      
      return matchCategory && matchStatus && matchSearch;
    });
  }, [tickets, filterCategory, statusFilter, searchQuery]);

  const handleUpdateTicket = async (id, updateData) => {
    const { error } = await supabase
      .from('tickets')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (!error) {
      fetchTickets();
      setEditingTicket(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-outline italic">Carregando base de dados...</div>;

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant/30">
            <th className="p-4 font-label-md text-label-md text-outline uppercase">ID</th>
            <th className="p-4 font-label-md text-label-md text-outline uppercase">Assunto / Usuário</th>
            <th className="p-4 font-label-md text-label-md text-outline uppercase">Responsável</th>
            <th className="p-4 font-label-md text-label-md text-outline uppercase">Prioridade</th>
            <th className="p-4 font-label-md text-label-md text-outline uppercase">Status</th>
            <th className="p-4 font-label-md text-label-md text-outline uppercase text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="font-body-md text-body-md text-on-surface">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono-label text-mono-label text-tertiary">#{ticket.id.toString().padStart(4, '0')}</td>
                <td className="p-4">
                  <div className="font-headline-md text-[15px] font-bold">{ticket.subject}</div>
                  <div className="text-[11px] text-outline flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">person</span> {ticket.profiles?.full_name} 
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[12px]">category</span> {ticket.categories?.name}
                  </div>
                </td>
                <td className="p-4">
                  {ticket.assigned ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-primary">
                      <span className="material-symbols-outlined text-[16px]">engineering</span>
                      {ticket.assigned.full_name}
                    </div>
                  ) : (
                    <span className="text-[10px] text-outline italic">Não atribuído</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                    ticket.priority === 'Crítica' ? 'bg-error-container text-on-error-container border-error/20' : 
                    ticket.priority === 'Alta' ? 'bg-secondary-container text-on-secondary-container border-secondary/20' : 
                    'bg-surface-container-high text-outline border-outline-variant/30'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${ticket.statuses?.color_class}`}>
                    {ticket.statuses?.name}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {(isAdmin || isTecnico) && (
                      <button onClick={() => setEditingTicket(ticket)} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit_square</span>
                      </button>
                    )}
                    <button className="p-2 text-tertiary hover:bg-tertiary/10 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-12 text-center text-outline italic font-body-md">Nenhum chamado encontrado com estes critérios.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingTicket && (
        <AdminEditModal 
          ticket={editingTicket} 
          onClose={() => setEditingTicket(null)} 
          onSave={handleUpdateTicket} 
        />
      )}
    </div>
  );
}

function AdminEditModal({ ticket, onClose, onSave }) {
  const { user: currentUser } = useAppContext();
  const [statusId, setStatusId] = useState(ticket.status_id);
  const [priority, setPriority] = useState(ticket.priority);
  const [assignedTo, setAssignedTo] = useState(ticket.assigned_to || '');
  const [actions, setActions] = useState(ticket.actions_taken || '');
  
  const [statuses, setStatuses] = useState([]);
  const [supportUsers, setSupportUsers] = useState([]);

  const isTecnico = currentUser.role === 'Técnico';
  const isAdmin = currentUser.role === 'Administrador';

  useEffect(() => {
    async function load() {
      const { data: sData } = await supabase.from('statuses').select('*');
      if (sData) setStatuses(sData);

      const { data: uData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('role', ['Técnico', 'Administrador']);
      if (uData) setSupportUsers(uData);
    }
    load();
  }, []);

  const handleSave = () => {
    const data = {
      status_id: statusId,
      actions_taken: actions,
      assigned_to: assignedTo === '' ? null : assignedTo
    };
    
    // Usuário suporte (Técnico) não altera prioridade
    if (!isTecnico) {
      data.priority = priority;
    }

    // Se concluiu, registra data
    const selectedStatus = statuses.find(s => s.id === statusId);
    if (selectedStatus?.name === 'Concluído') {
      data.closed_at = new Date().toISOString();
    }

    onSave(ticket.id, data);
  };

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 w-full max-w-2xl p-8 space-y-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface">Atendimento Técnico</h3>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full"><span className="material-symbols-outlined">close</span></button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Status</label>
            <select value={statusId} onChange={e => setStatusId(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 px-4 font-bold">
              {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Prioridade</label>
            <select 
              value={priority} 
              onChange={e => setPriority(e.target.value)} 
              className={`w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 px-4 font-bold ${isTecnico ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isTecnico}
            >
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
              <option>Crítica</option>
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Atribuído a (Suporte)</label>
            <select value={assignedTo} onChange={e => setAssignedTo(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 px-4">
              <option value="">Ninguém</option>
              {supportUsers.map(u => <option key={u.id} value={u.id}>{u.full_name}</option>)}
            </select>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Ações Tomadas</label>
            <textarea value={actions} onChange={e => setActions(e.target.value)} rows="4" className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 text-sm" placeholder="O que foi feito para resolver?"></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-6 py-3 text-outline font-bold uppercase text-xs">Cancelar</button>
          <button onClick={handleSave} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg">Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}
