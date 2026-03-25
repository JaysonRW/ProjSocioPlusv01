import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Trophy, Users, Star } from 'lucide-react';

export const PublicHome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Shield className="w-24 h-24 text-primary mx-auto mb-8 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            A Maior do Estado
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-12 font-medium">
            Faça parte da nossa história. Apoie o time, viva a arquibancada e tenha benefícios exclusivos.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/planos"
              className="w-full sm:w-auto flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl uppercase tracking-widest transition-all duration-300 hover:scale-105"
            >
              Conheça os Planos
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center bg-card hover:bg-border text-foreground font-bold py-4 px-8 rounded-xl uppercase tracking-widest border border-border transition-all duration-300"
            >
              Já sou sócio
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Vantagens</h2>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Por que ser sócio?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">Apoie o Clube</h4>
              <p className="text-muted">Sua mensalidade ajuda diretamente no futebol e na estrutura do nosso time do coração.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">Prioridade</h4>
              <p className="text-muted">Garanta seu ingresso antes de todo mundo para os jogos mais importantes da temporada.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">Experiências</h4>
              <p className="text-muted">Participe de sorteios, visite o CT e tenha acesso a conteúdos exclusivos para sócios.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Pronto para jogar junto?
          </h2>
          <p className="text-xl text-muted mb-12">
            Escolha o plano que mais combina com você e faça parte da família.
          </p>
          <Link
            to="/planos"
            className="inline-flex items-center justify-center bg-foreground text-background hover:bg-muted font-bold py-4 px-12 rounded-xl uppercase tracking-widest transition-all duration-300 hover:scale-105"
          >
            Ver Planos
          </Link>
        </div>
      </section>
    </div>
  );
};
