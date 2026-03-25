import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { userProfile } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border p-4 flex items-center justify-between max-w-md mx-auto w-full">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="font-bold text-lg tracking-tight uppercase">Torcida Fiel</h1>
      </div>
      {userProfile && (
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{userProfile.nome.split(' ')[0]}</p>
            <p className="text-xs text-muted capitalize">{userProfile.status}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-border overflow-hidden border border-border">
            {userProfile.foto_url ? (
              <img src={userProfile.foto_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-card text-muted text-xs font-bold">
                {userProfile.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
