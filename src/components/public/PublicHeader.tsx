import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Planos', path: '/planos' },
    { name: 'Notícias', path: '/noticias' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-black text-xl uppercase tracking-tighter hidden sm:block">
              SócioPlus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-muted hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/join"
              className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2.5 px-6 rounded-lg uppercase tracking-widest transition-colors"
            >
              Seja Sócio
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-b border-border absolute w-full left-0 top-20 shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-bold uppercase tracking-widest p-3 rounded-lg ${
                  isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-muted hover:bg-border'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-border my-4" />
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center text-sm font-bold uppercase tracking-widest text-foreground bg-background border border-border p-3 rounded-lg hover:bg-border transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/join"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-primary hover:bg-primary-hover text-white text-sm font-bold p-3 rounded-lg uppercase tracking-widest transition-colors"
            >
              Seja Sócio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
