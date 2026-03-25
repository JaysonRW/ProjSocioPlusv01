import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Shield, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError('E-mail ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 max-w-md mx-auto relative justify-center">
      <Link to="/" className="absolute top-6 left-6 text-muted hover:text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      
      <div className="mb-12 text-center">
        <Shield className="w-20 h-20 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Acesso Sócio
        </h1>
        <p className="text-muted text-sm mt-2">Entre com suas credenciais.</p>
      </div>

      {error && (
        <div className="bg-primary/20 border border-primary text-primary p-3 rounded-md mb-6 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-lg uppercase tracking-widest mt-8 transition-colors disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      
      <div className="mt-8 text-center flex flex-col gap-4">
        <p className="text-muted text-sm">
          Ainda não é sócio?{' '}
          <Link to="/join" className="text-primary font-bold hover:underline">
            Cadastre-se
          </Link>
        </p>
        <p className="text-muted text-xs">
          <Link to="/admin/login" className="hover:text-primary transition-colors underline underline-offset-4">
            Administrador acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
};
