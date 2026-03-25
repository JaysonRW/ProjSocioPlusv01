import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('data_publicacao', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4 space-y-6">
      {/* Status Banner */}
      {userProfile && (
        <div className={`p-4 rounded-xl border flex items-center gap-4 ${
          userProfile.status === 'ativo' 
            ? 'bg-green-900/20 border-green-900/50 text-green-400' 
            : 'bg-primary/20 border-primary/50 text-primary'
        }`}>
          {userProfile.status === 'ativo' ? (
            <CheckCircle2 className="w-8 h-8 shrink-0" />
          ) : (
            <AlertCircle className="w-8 h-8 shrink-0" />
          )}
          <div className="flex-1">
            <h3 className="font-bold uppercase tracking-wider text-sm">
              Status: {userProfile.status}
            </h3>
            {userProfile.status === 'inativo' && (
              <p className="text-xs mt-1 opacity-90">
                Sua mensalidade está pendente. Regularize para usar os benefícios.
              </p>
            )}
          </div>
          {userProfile.status === 'inativo' && (
            <Link to="/pagamentos" className="bg-primary text-white text-xs font-bold px-3 py-2 rounded uppercase tracking-wider">
              Pagar
            </Link>
          )}
        </div>
      )}

      {/* News Feed */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-tighter mb-4 border-b border-border pb-2">
          Mural da Torcida
        </h2>
        
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card h-32 rounded-xl border border-border"></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item) => (
              <article key={item.id} className="bg-card border border-border rounded-xl p-4">
                <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
                  {format(new Date(item.data_publicacao), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </div>
                <h3 className="text-lg font-bold leading-tight mb-2">{item.titulo}</h3>
                <p className="text-sm text-muted line-clamp-3">{item.conteudo}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-card border border-border rounded-xl">
            <p className="text-muted text-sm">Nenhum aviso no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};
