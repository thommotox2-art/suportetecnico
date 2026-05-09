import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, systemConfig } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-2xl w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          {systemConfig.logo ? (
            <img src={systemConfig.logo} alt="Logo" className="h-12 mx-auto mb-4 object-contain" />
          ) : (
            <div className="w-12 h-12 bg-primary rounded mx-auto mb-4"></div>
          )}
          <h1 className="font-headline-xl text-headline-xl text-on-surface font-bold">{systemConfig.title}</h1>
          <p className="text-outline">{systemConfig.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-error-container text-on-error-container p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-outline uppercase">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Digite seu usuário"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-label-md text-label-md text-outline uppercase">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Entrar no Sistema
          </button>
        </form>
        
        <p className="text-center text-xs text-outline italic">
          Acesso restrito a colaboradores autorizados.
        </p>
      </div>
    </div>
  );
}
