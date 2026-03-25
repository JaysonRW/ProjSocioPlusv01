import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Users, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  if (userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Acesso Negado</h1>
        <p className="text-muted text-sm mb-6">Você não tem permissão para acessar esta área.</p>
        <button onClick={() => navigate('/home')} className="bg-card border border-border px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-border transition-colors">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-16">
      <header className="sticky top-0 z-50 bg-primary/10 backdrop-blur-md border-b border-primary/30 p-4 flex items-center justify-between max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <Link to="/perfil" className="text-primary hover:text-primary-hover p-1">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <ShieldAlert className="w-6 h-6 text-primary" />
          <h1 className="font-bold text-lg tracking-tight uppercase text-primary">Painel Admin</h1>
        </div>
      </header>
      
      <div className="flex justify-around items-center bg-card border-b border-border max-w-md mx-auto w-full">
        <Link to="/admin" className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted hover:text-primary hover:bg-border transition-colors">
          Dashboard
        </Link>
        <Link to="/admin/socios" className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest text-muted hover:text-primary hover:bg-border transition-colors border-l border-border">
          Sócios
        </Link>
      </div>

      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative p-4">
        <Outlet />
      </main>
    </div>
  );
};
