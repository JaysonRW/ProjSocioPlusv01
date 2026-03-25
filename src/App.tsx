import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './pages/admin/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';

// Public Pages
import { PublicHome } from './pages/public/Home';
import { Join } from './pages/public/Join';
import { Login } from './pages/public/Login';
import { Plans } from './pages/public/Plans';
import { News } from './pages/public/News';

// Member Pages
import { Dashboard } from './pages/member/Dashboard';
import { IDCard } from './pages/member/IDCard';
import { Profile } from './pages/member/Profile';
import { Payments } from './pages/member/Payments';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MembersList } from './pages/admin/MembersList';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!currentUser) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicHome />} />
            <Route path="planos" element={<Plans />} />
            <Route path="noticias" element={<News />} />
          </Route>

          {/* Public Routes without Layout (Auth) */}
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />

          {/* Member Routes */}
          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="home" element={<Dashboard />} />
            <Route path="carteirinha" element={<IDCard />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="pagamentos" element={<Payments />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="socios" element={<MembersList />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
