import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import NewTicket from './pages/NewTicket';
import MyTickets from './pages/MyTickets';
import RelatoriosPage from './pages/RelatoriosPage';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAppContext();
  
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}

function App() {
  const { user } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="novo-chamado" element={<NewTicket />} />
          <Route path="meus-chamados" element={<MyTickets />} />
          <Route path="relatorios" element={<RelatoriosPage />} />
          <Route path="inventario" element={<Inventory />} />
          <Route path="configuracoes" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
