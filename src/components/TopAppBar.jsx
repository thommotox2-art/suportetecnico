import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function TopAppBar({ onMenuClick }) {
  const { user, systemConfig, searchQuery, setSearchQuery, logout } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [tempSearch, setTempSearch] = useState(searchQuery);

  const handleSearch = () => {
    setSearchQuery(tempSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className="bg-surface fixed top-0 right-0 w-full md:w-[calc(100%-260px)] z-40 border-b border-outline-variant/30 shadow-sm flex items-center justify-between px-gutter h-16 transition-colors">
      <div className="flex items-center gap-stack-md w-full max-w-xl">
        <button 
          className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container-high rounded-full"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="relative w-full flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input 
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2.5 pl-10 pr-4 font-body-md text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Buscar chamados por título ou usuário..." 
              type="text"
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button 
            onClick={handleSearch}
            className="bg-primary text-on-primary p-2.5 rounded-xl hover:bg-primary-container transition-all shadow-sm flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* HELP DROPDOWN */}
        <div className="relative">
          <button 
            onClick={() => { setShowHelpMenu(!showHelpMenu); setShowUserMenu(false); }}
            className={`p-2 rounded-full transition-colors ${showHelpMenu ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[24px]">help</span>
          </button>
          
          {showHelpMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in zoom-in duration-200">
              <h4 className="font-bold text-sm uppercase tracking-widest text-outline mb-4">Informações de Ajuda</h4>
              <div className="space-y-4">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <p className="text-sm font-bold text-on-surface">{systemConfig.help_text || 'Suporte Técnico'}</p>
                </div>
                {systemConfig.help_email && (
                  <div className="flex items-center gap-3 text-xs text-outline">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="truncate">{systemConfig.help_email}</span>
                  </div>
                )}
                {systemConfig.help_phone && (
                  <div className="flex items-center gap-3 text-xs text-outline">
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>{systemConfig.help_phone}</span>
                  </div>
                )}
                {systemConfig.help_site && (
                  <div className="flex items-center gap-3 text-xs text-outline">
                    <span className="material-symbols-outlined text-[18px]">language</span>
                    <a href={systemConfig.help_site} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{systemConfig.help_site}</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* USER DROPDOWN */}
        <div className="relative">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => { setShowUserMenu(!showUserMenu); setShowHelpMenu(false); }}
          >
            <div className="text-right hidden lg:block">
              <div className="text-xs font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">{user.full_name}</div>
              <div className="text-[10px] text-outline uppercase tracking-wider">{user.role}</div>
            </div>
            <div className="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5 group-hover:border-primary transition-all">
              <img 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full" 
                src={user.avatar_url || 'https://via.placeholder.com/150'}
              />
            </div>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              <div className="p-6 bg-surface-container-low/50 border-b border-outline-variant/10 text-center">
                <img src={user.avatar_url || 'https://via.placeholder.com/150'} className="w-16 h-16 rounded-full mx-auto border-2 border-primary mb-3 object-cover" alt="" />
                <p className="font-bold text-on-surface">{user.full_name}</p>
                <p className="text-[10px] text-outline uppercase font-bold">{user.role}</p>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-high rounded-xl transition-colors">
                  <span className="material-symbols-outlined text-outline">person</span> Perfil do Usuário
                </button>
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/10 rounded-xl transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span> Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
