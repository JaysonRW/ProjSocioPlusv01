import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, UserCheck, UserX, DollarSign, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, ativos: 0, inativos: 0, pagamentosPendentes: 0, valorPendente: 0, acessosHoje: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Users
        const qUsers = query(collection(db, 'users'));
        const querySnapshotUsers = await getDocs(qUsers);
        
        let total = 0;
        let ativos = 0;
        let inativos = 0;

        querySnapshotUsers.forEach((doc) => {
          total++;
          if (doc.data().status === 'ativo') ativos++;
          else inativos++;
        });

        // Fetch Payments
        const qPayments = query(collection(db, 'payments'), where('status', '==', 'pendente'));
        const querySnapshotPayments = await getDocs(qPayments);
        
        let pagamentosPendentes = 0;
        let valorPendente = 0;

        querySnapshotPayments.forEach((doc) => {
          pagamentosPendentes++;
          valorPendente += doc.data().valor || 0;
        });

        // Mock acessos hoje (could be based on a real analytics collection)
        const acessosHoje = Math.floor(Math.random() * 50) + 10;

        setStats({ total, ativos, inativos, pagamentosPendentes, valorPendente, acessosHoje });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">
        Visão Geral do Negócio
      </h2>

      {loading ? (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-card h-32 rounded-xl border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted uppercase tracking-widest mb-1">Total de Sócios</p>
              <h3 className="text-4xl font-black">{stats.total}</h3>
            </div>
            <Users className="w-12 h-12 text-muted opacity-50" />
          </div>

          <div className="bg-green-900/10 border border-green-900/30 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Sócios Ativos</p>
              <h3 className="text-4xl font-black text-green-400">{stats.ativos}</h3>
            </div>
            <UserCheck className="w-12 h-12 text-green-400 opacity-50" />
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Inadimplentes</p>
              <h3 className="text-4xl font-black text-primary">{stats.inativos}</h3>
            </div>
            <UserX className="w-12 h-12 text-primary opacity-50" />
          </div>

          <div className="bg-orange-900/10 border border-orange-900/30 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Pagamentos Pendentes</p>
              <h3 className="text-4xl font-black text-orange-400">{stats.pagamentosPendentes}</h3>
              <p className="text-sm text-orange-400/80 mt-1">
                R$ {stats.valorPendente.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-orange-400 opacity-50" />
          </div>

          <div className="bg-blue-900/10 border border-blue-900/30 rounded-xl p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Acessos Hoje</p>
              <h3 className="text-4xl font-black text-blue-400">{stats.acessosHoje}</h3>
              <p className="text-sm text-blue-400/80 mt-1">Usuários únicos</p>
            </div>
            <Activity className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
};
