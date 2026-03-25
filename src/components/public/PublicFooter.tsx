import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-black text-xl uppercase tracking-tighter">
                SócioPlus
              </span>
            </Link>
            <p className="text-sm text-muted mb-6">
              O programa de sócio torcedor oficial do clube. Jogue junto com o time e tenha acesso a benefícios exclusivos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-muted hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Programa</h4>
            <ul className="space-y-2">
              <li><Link to="/planos" className="text-sm text-muted hover:text-foreground transition-colors">Planos</Link></li>
              <li><Link to="/noticias" className="text-sm text-muted hover:text-foreground transition-colors">Notícias</Link></li>
              <li><Link to="/beneficios" className="text-sm text-muted hover:text-foreground transition-colors">Benefícios</Link></li>
              <li><Link to="/faq" className="text-sm text-muted hover:text-foreground transition-colors">Perguntas Frequentes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Institucional</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Sobre o Clube</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Estatuto</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Transparência</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-sm text-muted hover:text-foreground transition-colors">Regulamento</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} SócioPlus. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs text-muted uppercase tracking-widest">Powered by</span>
            <Shield className="w-4 h-4 text-muted" />
          </div>
        </div>
      </div>
    </footer>
  );
};
