import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CreditCard, User as UserIcon, Settings, ShieldAlert } from 'lucide-react';

export const Profile: React.FC = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (!userProfile) return null;

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
        <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden">
          {userProfile.foto_url ? (
            <img src={userProfile.foto_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <UserIcon className="w-8 h-8 text-muted" />
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{userProfile.nome}</h2>
          <p className="text-sm text-muted">{userProfile.email}</p>
          <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary">
            {userProfile.status}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-4 px-2">Minha Conta</h3>
        
        <Link to="/pagamentos" className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-border transition-colors">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="font-medium">Pagamentos</span>
          </div>
        </Link>
        
        <button className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-border transition-colors text-left">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted" />
            <span className="font-medium">Configurações</span>
          </div>
        </button>

        {userProfile.role === 'admin' && (
          <Link to="/admin" className="flex items-center justify-between p-4 bg-primary/10 border border-primary/30 rounded-xl hover:bg-primary/20 transition-colors mt-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">Painel Admin</span>
            </div>
          </Link>
        )}
      </div>

      <div className="pt-8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 text-muted hover:text-primary transition-colors font-bold uppercase tracking-widest text-sm"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
};
