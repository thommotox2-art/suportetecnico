import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAppContext } from '../context/AppContext';

export default function NewTicket() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    subject: '',
    category_id: '',
    priority: 'Média',
    description: ''
  });

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('categories').select('*');
      if (data) {
        setCategories(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Pega o ID do status 'Pendente'
    const { data: statusData } = await supabase.from('statuses').select('id').eq('name', 'Pendente').single();

    const { error } = await supabase
      .from('tickets')
      .insert({
        subject: formData.subject,
        description: formData.description,
        priority: formData.priority,
        category_id: formData.category_id,
        status_id: statusData?.id,
        user_id: user.id,
      });

    if (!error) {
      alert('Chamado aberto com sucesso!');
      navigate('/meus-chamados');
    } else {
      alert('Erro ao abrir chamado: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg">
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-background">Novo Chamado</h2>
        <p className="font-body-md text-body-md text-outline mt-1">Olá <span className="font-bold text-on-surface">{user?.full_name}</span>, descreva seu problema abaixo.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xl p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Assunto do Chamado</label>
            <input 
              type="text" 
              required
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 font-bold focus:ring-2 focus:ring-primary/20"
              placeholder="Ex: Falha no acesso ao sistema financeiro"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Categoria</label>
              <select 
                value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4"
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Prioridade</label>
              <select 
                value={formData.priority}
                onChange={e => setFormData({...formData, priority: e.target.value})}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4"
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
                <option>Crítica</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Descrição Detalhada</label>
            <textarea 
              required
              rows="6"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 px-4 text-sm"
              placeholder="Forneça o máximo de detalhes, mensagens de erro ou evidências do problema..."
            ></textarea>
          </div>

          <div className="pt-6 flex justify-end gap-4 border-t border-outline-variant/30">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-xl text-outline font-bold uppercase text-xs tracking-widest hover:bg-surface-container-high transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary text-on-primary px-10 py-3 rounded-xl hover:bg-primary-container transition-all font-bold uppercase tracking-widest shadow-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              {loading ? 'Enviando...' : 'Abrir Chamado'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
