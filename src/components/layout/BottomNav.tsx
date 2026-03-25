import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted hover:text-foreground'
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Início</span>
        </NavLink>
        
        <NavLink
          to="/carteirinha"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted hover:text-foreground'
            }`
          }
        >
          <CreditCard className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Carteirinha</span>
        </NavLink>
        
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-primary' : 'text-muted hover:text-foreground'
            }`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
};
