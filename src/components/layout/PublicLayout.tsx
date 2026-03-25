import React from 'react';
import { Outlet } from 'react-router-dom';
import { PublicHeader } from '../public/PublicHeader';
import { PublicFooter } from '../public/PublicFooter';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
