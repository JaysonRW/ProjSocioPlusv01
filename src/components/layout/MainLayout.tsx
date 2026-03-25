import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground pb-16">
      <TopBar />
      <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto relative">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
