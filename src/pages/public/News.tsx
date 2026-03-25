import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(
          collection(db, 'news'),
          where('isPublic', '==', true),
          orderBy('data_publicacao', 'desc'),
          limit(10)
        );
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
    <div className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
            Notícias
          </h2>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Fique por dentro
          </h1>
          <p className="text-lg text-muted">
            Acompanhe as últimas novidades do clube e do programa de sócio torcedor.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card h-64 rounded-2xl border border-border animate-pulse"></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-colors duration-300">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                  {format(new Date(item.data_publicacao), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </div>
                <h3 className="text-xl font-black leading-tight mb-3">{item.titulo}</h3>
                <p className="text-sm text-muted line-clamp-4">{item.conteudo}</p>
                <button className="mt-6 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                  Ler mais
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-card border border-border rounded-2xl max-w-2xl mx-auto">
            <p className="text-muted">Nenhuma notícia pública disponível no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};
