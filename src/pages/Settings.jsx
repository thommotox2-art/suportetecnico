import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const { user, systemConfig, updateProfile, updateSystem } = useAppContext();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [localUser, setLocalUser] = useState(user || {});
  const [localSystem, setLocalSystem] = useState(systemConfig || {});
  const [users, setUsers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [deletingUserId, setDeletingUserId] = useState(null);

  const isAdmin = user?.role === 'Administrador';

  useEffect(() => {
    if (isAdmin && activeTab === 'users') {
      fetchUsers();
    }
  }, [isAdmin, activeTab]);

  const fetchUsers = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (data) setUsers(data);
  };

  const handleSaveProfile = async () => {
    await updateProfile(localUser);
    alert('Perfil atualizado com sucesso!');
  };

  const handleSaveSystem = async () => {
    await updateSystem(localSystem);
    alert('Sistema atualizado!');
  };

  const confirmDeleteUser = async () => {
    if (deletingUserId) {
      const { error } = await supabase.from('profiles').delete().eq('id', deletingUserId);
      if (!error) {
        fetchUsers();
        setDeletingUserId(null);
      } else {
        alert('Erro ao excluir: ' + error.message);
      }
    }
  };

  const saveUser = async (userData) => {
    const { error } = await supabase.from('profiles').upsert(userData);
    if (!error) {
      fetchUsers();
      setIsUserModalOpen(false);
      setEditingUser(null);
    } else {
      alert('Erro ao salvar usuário: ' + error.message);
    }
  };

  return (
    <div className="max-w-container-max mx-auto space-y-stack-lg relative">
      <div>
        <h2 className="font-headline-xl text-headline-xl text-on-background">Configurações</h2>
        <p className="font-body-md text-body-md text-outline mt-1">Configurações de conta e sistema de acordo com seu cargo.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 border-r border-outline-variant/30 bg-surface-container-low/30 p-4 flex flex-col gap-2">
          <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined">person</span> Perfil
          </button>
          
          <button onClick={() => setActiveTab('security')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'security' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined">lock</span> Segurança
          </button>

          {isAdmin && (
            <>
              <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'users' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline hover:bg-surface-container-high'}`}>
                <span className="material-symbols-outlined">group</span> Usuários
              </button>
              <button onClick={() => setActiveTab('system')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'system' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline hover:bg-surface-container-high'}`}>
                <span className="material-symbols-outlined">settings_display</span> Sistema
              </button>
              <button onClick={() => setActiveTab('help')} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'help' ? 'bg-primary text-on-primary shadow-lg' : 'text-outline hover:bg-surface-container-high'}`}>
                <span className="material-symbols-outlined">quiz</span> Informações de Ajuda
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          
          {activeTab === 'profile' && (
            <div className="max-w-2xl space-y-8">
              <h3 className="font-headline-md text-headline-md border-b pb-2">Meu Perfil</h3>
              <div className="flex items-center gap-8">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg shrink-0">
                  <img src={localUser.avatar_url || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">URL da Foto</label>
                  <input type="text" value={localUser.avatar_url || ''} onChange={e => setLocalUser({...localUser, avatar_url: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Nome Completo</label>
                  <input type="text" value={localUser.full_name || ''} onChange={e => setLocalUser({...localUser, full_name: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">E-mail</label>
                  <input type="email" value={localUser.email || ''} onChange={e => setLocalUser({...localUser, email: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Cargo / Função</label>
                  <input type="text" value={localUser.job_title || ''} onChange={e => setLocalUser({...localUser, job_title: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" disabled={!isAdmin} />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Telefone</label>
                  <input type="text" value={localUser.phone || ''} onChange={e => setLocalUser({...localUser, phone: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" />
                </div>
              </div>

              <button onClick={handleSaveProfile} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:translate-y-[-2px] transition-all">Salvar Perfil</button>
            </div>
          )}

          {activeTab === 'users' && isAdmin && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md">Gestão de Usuários</h3>
                <button 
                  onClick={() => { setEditingUser(null); setIsUserModalOpen(true); }}
                  className="bg-tertiary text-on-tertiary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span> NOVO USUÁRIO
                </button>
              </div>
              <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-surface-container text-[10px] font-bold text-outline uppercase">
                    <tr>
                      <th className="p-4">Usuário</th>
                      <th className="p-4">Cargo</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-sm">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={u.avatar_url || 'https://via.placeholder.com/150'} className="w-8 h-8 rounded-full border border-outline-variant" alt="" />
                            <div>
                              <p className="font-bold">{u.full_name}</p>
                              <p className="text-[10px] text-outline">@{u.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4"><span className="text-[10px] font-bold bg-surface-container-high px-2 py-1 rounded-full uppercase">{u.role}</span></td>
                        <td className="p-4 text-outline">{u.email}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setEditingUser(u); setIsUserModalOpen(true); }} className="text-primary p-2 hover:bg-primary/10 rounded-full transition-colors">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button onClick={() => setDeletingUserId(u.id)} className="text-error p-2 hover:bg-error/10 rounded-full transition-colors">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'system' && isAdmin && (
            <div className="max-w-xl space-y-8">
              <h3 className="font-headline-md text-headline-md border-b pb-2">Identidade do Sistema</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Título Principal</label>
                  <input type="text" value={localSystem.title} onChange={e => setLocalSystem({...localSystem, title: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4 font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Subtítulo / Slogan</label>
                  <input type="text" value={localSystem.subtitle} onChange={e => setLocalSystem({...localSystem, subtitle: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">URL do Logo</label>
                  <input type="text" value={localSystem.logo} onChange={e => setLocalSystem({...localSystem, logo: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4" />
                </div>
              </div>
              <button onClick={handleSaveSystem} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg">Atualizar Sistema</button>
            </div>
          )}

          {activeTab === 'help' && isAdmin && (
            <div className="max-w-xl space-y-8">
              <h3 className="font-headline-md text-headline-md border-b pb-2">Informações de Ajuda</h3>
              <p className="text-sm text-outline">Estes dados aparecerão para todos os usuários ao clicarem no ícone de interrogação no topo da página.</p>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Texto Curto (Max 20 caracteres)</label>
                  <input 
                    type="text" 
                    maxLength="20"
                    value={localSystem.help_text || ''} 
                    onChange={e => setLocalSystem({...localSystem, help_text: e.target.value})} 
                    className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4 font-bold" 
                    placeholder="Ex: Suporte Interno"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">E-mail de Suporte</label>
                  <input type="email" value={localSystem.help_email || ''} onChange={e => setLocalSystem({...localSystem, help_email: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Site / Base de Conhecimento</label>
                  <input type="text" value={localSystem.help_site || ''} onChange={e => setLocalSystem({...localSystem, help_site: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4" />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Telefone de Contato</label>
                  <input type="text" value={localSystem.help_phone || ''} onChange={e => setLocalSystem({...localSystem, help_phone: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 px-4" />
                </div>
              </div>
              <button onClick={handleSaveSystem} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg">Salvar Ajuda</button>
            </div>
          )}

        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deletingUserId && (
        <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6">
            <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">Excluir Usuário?</h3>
              <p className="text-outline text-sm mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeletingUserId(null)} className="flex-1 py-3 text-outline font-bold uppercase text-xs">Cancelar</button>
              <button onClick={confirmDeleteUser} className="flex-1 py-3 bg-error text-on-error rounded-xl font-bold uppercase text-xs shadow-lg">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* USER MODAL */}
      {isUserModalOpen && (
        <UserModal user={editingUser} onClose={() => setIsUserModalOpen(false)} onSave={saveUser} />
      )}
    </div>
  );
}

function UserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState(user || {
    username: '', password: '', full_name: '', email: '', role: 'Cliente', job_title: '', phone: '', avatar_url: ''
  });

  return (
    <div className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 w-full max-w-2xl p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface">{user ? 'Editar Usuário' : 'Novo Usuário'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1"><label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Usuário</label><input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" required /></div>
          <div className="space-y-1"><label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Senha</label><input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" required /></div>
          <div className="space-y-1 md:col-span-2"><label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Nome Completo</label><input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" /></div>
          <div className="space-y-1"><label className="block text-[10px] font-bold text-outline uppercase tracking-wider">Cargo / Tipo</label><select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3"><option value="Administrador">Administrador</option><option value="Técnico">Técnico</option><option value="Cliente">Cliente</option></select></div>
          <div className="space-y-1"><label className="block text-[10px] font-bold text-outline uppercase tracking-wider">E-mail</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface-container border border-outline-variant rounded-lg py-2 px-3" /></div>
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button onClick={onClose} className="px-6 py-3 text-outline font-bold uppercase text-xs">Cancelar</button>
          <button onClick={() => onSave(formData)} className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold uppercase tracking-widest shadow-lg">Salvar Usuário</button>
        </div>
      </div>
    </div>
  );
}
