import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [systemConfig, setSystemConfig] = useState({
    title: 'TechSupport',
    subtitle: 'ENTERPRISE CONSOLE',
    logo: '',
    help_text: '',
    help_email: '',
    help_site: '',
    help_phone: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Fetch system config on load
  useEffect(() => {
    async function fetchConfig() {
      const { data, error } = await supabase
        .from('system_config')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (data && !error) {
        setSystemConfig({
          title: data.title,
          subtitle: data.subtitle,
          logo: data.logo_url,
          help_text: data.help_text,
          help_email: data.help_email,
          help_site: data.help_site,
          help_phone: data.help_phone
        });
      }
    }
    fetchConfig();
    
    // Check local storage for session (Mock session for this task)
    const savedUser = localStorage.getItem('tech_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();

    if (data && !error) {
      setUser(data);
      localStorage.setItem('tech_user', JSON.stringify(data));
      return { success: true };
    }
    return { success: false, error: 'Credenciais inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tech_user');
  };

  const updateProfile = async (newData) => {
    if (!user) return;
    const { data, error } = await supabase
      .from('profiles')
      .update(newData)
      .eq('id', user.id)
      .select()
      .single();
    
    if (data && !error) {
      setUser(data);
      localStorage.setItem('tech_user', JSON.stringify(data));
    }
  };

  const updateSystem = async (newData) => {
    const { data, error } = await supabase
      .from('system_config')
      .update({
        title: newData.title,
        subtitle: newData.subtitle,
        logo_url: newData.logo
      })
      .eq('id', 1)
      .select()
      .single();

    if (data && !error) {
      setSystemConfig({
        title: data.title,
        subtitle: data.subtitle,
        logo: data.logo_url
      });
    }
  };

  return (
    <AppContext.Provider value={{ user, systemConfig, loading, login, logout, updateProfile, updateSystem, searchQuery, setSearchQuery, statusFilter, setStatusFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
