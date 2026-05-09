import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, systemConfig, logout } = useAppContext();
  
  if (!user) return null;

  const isAdmin = user.role === 'Administrador';
  const isTecnico = user.role === 'Técnico';
  const isCliente = user.role === 'Cliente';

  const navLinkClass = ({ isActive }) => {
    const baseClass = "flex items-center gap-stack-md px-gutter py-3 transition-all duration-200 transform rounded-lg mx-2";
    if (isActive) {
      return `${baseClass} text-primary-fixed font-bold bg-primary-container/30 border-l-4 border-primary-fixed shadow-sm active:scale-98`;
    }
    return `${baseClass} text-on-tertiary/70 dark:text-surface-variant hover:bg-primary-container/10 hover:text-on-tertiary border-l-4 border-transparent active:scale-98`;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-on-surface/50 z-40 md:hidden transition-opacity" onClick={onClose} />
      )}

      <aside className={`bg-tertiary dark:bg-inverse-surface fixed left-0 top-0 h-full w-sidebar-width z-50 shadow-md flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* LOGO CONTAINER - TOP */}
        <div className="px-gutter py-6 flex flex-col items-center gap-4 border-b border-white/10">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden border border-white/20 p-2 shadow-inner">
            {systemConfig.logo ? (
              <img src={systemConfig.logo} alt="System Logo" className="max-w-full max-h-full object-contain" />
            ) : (
              <span className="material-symbols-outlined text-white text-3xl">build</span>
            )}
          </div>
          <div className="text-center">
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-tertiary dark:text-on-primary-fixed leading-tight">{systemConfig.title}</h1>
            <p className="font-label-md text-label-md text-on-tertiary/70 uppercase truncate w-48">{systemConfig.subtitle}</p>
          </div>
          <button className="md:hidden absolute top-4 right-4 text-on-tertiary/70 hover:text-on-tertiary" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
          {!isCliente && (
            <NavLink to="/" className={navLinkClass} onClick={onClose} end>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </NavLink>
          )}
          <NavLink to="/meus-chamados" className={navLinkClass} onClick={onClose}>
            <span className="material-symbols-outlined">confirmation_number</span>
            Meus Chamados
          </NavLink>
          {!isCliente && (
            <>
              <NavLink to="/relatorios" className={navLinkClass} onClick={onClose}>
                <span className="material-symbols-outlined">bar_chart</span>
                Relatórios
              </NavLink>
              <NavLink to="/inventario" className={navLinkClass} onClick={onClose}>
                <span className="material-symbols-outlined">inventory_2</span>
                Inventário
              </NavLink>
            </>
          )}
          <NavLink to="/configuracoes" className={navLinkClass} onClick={onClose}>
            <span className="material-symbols-outlined">settings</span>
            Configurações
          </NavLink>
        </nav>

        {/* USER INFO BOX - BOTTOM */}
        <div className="p-4 mb-2">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/5 flex items-center gap-3 shadow-lg backdrop-blur-sm relative -top-2">
            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary-fixed shrink-0">
              <img src={user.avatar_url || 'https://via.placeholder.com/150'} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-primary-fixed font-bold uppercase tracking-widest truncate">{user.role}</p>
              <p className="text-sm font-bold text-on-tertiary truncate">{user.full_name}</p>
            </div>
            <button onClick={logout} className="p-2 text-on-tertiary/70 hover:text-secondary hover:bg-white/5 rounded-full transition-all" title="Sair">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
