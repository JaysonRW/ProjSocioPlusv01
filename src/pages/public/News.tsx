import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, getDocs, addDoc } from 'firebase/firestore';
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
        let newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Seed fake news if empty
        if (newsData.length === 0) {
          const mockNews = [
            {
              titulo: 'Shield Red conquista vitória heroica nos acréscimos!',
              conteudo: 'O Shield Red mostrou sua força e garra ao virar o jogo nos últimos minutos da partida contra o rival da cidade. A torcida foi à loucura com o gol de falta aos 49 do segundo tempo, garantindo os três pontos cruciais para a liderança do campeonato.',
              data_publicacao: new Date().toISOString(),
              isPublic: true,
              imagem: 'https://images.unsplash.com/photo-1518605368461-1e1e111e1ebc?q=80&w=800&auto=format&fit=crop'
            },
            {
              titulo: 'Novo manto do Shield Red é revelado para a temporada',
              conteudo: 'Com um design inovador e mantendo o tradicional vermelho vibrante, o novo uniforme já é sucesso de vendas nas lojas oficiais. A camisa traz detalhes em dourado que remetem às conquistas históricas do clube.',
              data_publicacao: new Date(Date.now() - 86400000).toISOString(),
              isPublic: true,
              imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop'
            },
            {
              titulo: 'Campanha de Sócio Torcedor bate recorde histórico',
              conteudo: 'A torcida do Shield Red provou mais uma vez seu amor incondicional, ultrapassando a marca de 50 mil sócios ativos em tempo recorde. A diretoria agradeceu o apoio e prometeu novos benefícios exclusivos.',
              data_publicacao: new Date(Date.now() - 86400000 * 2).toISOString(),
              isPublic: true,
              imagem: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=800&auto=format&fit=crop'
            },
            {
              titulo: 'Jovem promessa da base assina contrato profissional',
              conteudo: 'O atacante de 17 anos, destaque absoluto nas categorias de base, agora integra o elenco principal do Shield Red. O técnico elogiou a velocidade e habilidade do garoto, que já treina com os veteranos.',
              data_publicacao: new Date(Date.now() - 86400000 * 3).toISOString(),
              isPublic: true,
              imagem: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop'
            },
            {
              titulo: 'Estádio do Shield Red passará por modernização',
              conteudo: 'A diretoria anunciou um projeto ambicioso para ampliar a capacidade e melhorar a experiência dos torcedores na nossa casa. As obras começarão no próximo mês e incluirão novos telões e áreas VIP.',
              data_publicacao: new Date(Date.now() - 86400000 * 4).toISOString(),
              isPublic: true,
              imagem: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop'
            }
          ];

          for (const item of mockNews) {
            await addDoc(collection(db, 'news'), item);
          }

          // Fetch again after seeding
          const newSnapshot = await getDocs(q);
          newsData = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

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
              <div key={i} className="bg-card h-96 rounded-2xl border border-border animate-pulse"></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-colors duration-300 flex flex-col">
                {item.imagem && (
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={item.imagem} 
                      alt={item.titulo} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                    {format(new Date(item.data_publicacao), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </div>
                  <h3 className="text-xl font-black leading-tight mb-3">{item.titulo}</h3>
                  <p className="text-sm text-muted line-clamp-4 flex-1">{item.conteudo}</p>
                  <button className="mt-6 text-sm font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors self-start">
                    Ler mais
                  </button>
                </div>
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
