import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Filter, UserX, UserCheck } from 'lucide-react';

export const MembersList: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'todos' | 'ativo' | 'inativo'>('todos');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('nome', 'asc'));
        const querySnapshot = await getDocs(q);
        const membersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMembers(membersData);
        setFilteredMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    let result = members;
    
    if (searchTerm) {
      result = result.filter(m => 
        m.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.cpf.includes(searchTerm)
      );
    }

    if (filterStatus !== 'todos') {
      result = result.filter(m => m.status === filterStatus);
    }

    setFilteredMembers(result);
  }, [searchTerm, filterStatus, members]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">
        Gestão de Sócios
      </h2>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('todos')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
              filterStatus === 'todos' ? 'bg-border text-foreground' : 'bg-card text-muted hover:bg-border/50'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterStatus('ativo')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1 ${
              filterStatus === 'ativo' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-card text-muted hover:bg-border/50'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Ativos
          </button>
          <button
            onClick={() => setFilterStatus('inativo')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1 ${
              filterStatus === 'inativo' ? 'bg-primary/30 text-primary border border-primary/50' : 'bg-card text-muted hover:bg-border/50'
            }`}
          >
            <UserX className="w-3 h-3" />
            Inativos
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-card h-16 rounded-xl border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs font-bold text-muted uppercase tracking-widest mb-2 px-1">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'Sócio encontrado' : 'Sócios encontrados'}
          </div>
          
          {filteredMembers.map(member => (
            <div key={member.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">{member.nome}</h3>
                <p className="text-xs text-muted font-mono mt-1">{member.cpf}</p>
              </div>
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                member.status === 'ativo' ? 'bg-green-900/20 text-green-400' : 'bg-primary/20 text-primary'
              }`}>
                {member.status}
              </div>
            </div>
          ))}
          
          {filteredMembers.length === 0 && (
            <div className="text-center p-8 bg-card border border-border rounded-xl">
              <p className="text-muted text-sm">Nenhum sócio encontrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
