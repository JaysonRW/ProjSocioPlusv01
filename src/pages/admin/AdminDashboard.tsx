import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Users, UserCheck, UserX } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, ativos: 0, inativos: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        
        let total = 0;
        let ativos = 0;
        let inativos = 0;

        querySnapshot.forEach((doc) => {
          total++;
          if (doc.data().status === 'ativo') ativos++;
          else inativos++;
        });

        setStats({ total, ativos, inativos });
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
        Visão Geral
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card h-24 rounded-xl border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
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
        </div>
      )}
    </div>
  );
};
