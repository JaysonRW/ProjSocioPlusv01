import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Shield, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (username !== 'adm01') {
      setError('Usuário ou senha inválidos.');
      setLoading(false);
      return;
    }

    try {
      // Try to sign in
      await signInWithEmailAndPassword(auth, 'adm01@shieldred.com', password);
      navigate('/admin');
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        // If it fails, try to create the user (only if password matches the requested one)
        if (password === 'acesso2026') {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, 'adm01@shieldred.com', password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
              uid: userCredential.user.uid,
              nome: 'Administrador',
              cpf: '00000000000',
              email: 'adm01@shieldred.com',
              status: 'ativo',
              role: 'admin',
              createdAt: new Date().toISOString()
            });
            navigate('/admin');
          } catch (createError: any) {
            if (createError.code === 'auth/email-already-in-use') {
              setError('Usuário ou senha inválidos.');
            } else {
              setError('Erro ao criar usuário administrador.');
              console.error(createError);
            }
          }
        } else {
          setError('Usuário ou senha inválidos.');
        }
      } else {
        setError('Erro ao fazer login.');
        console.error(err);
      }
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
          Acesso Restrito
        </h1>
        <p className="text-muted text-sm mt-2">Painel de Administração</p>
      </div>

      {error && (
        <div className="bg-primary/20 border border-primary text-primary p-3 rounded-md mb-6 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Usuário</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="adm01"
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
          {loading ? 'Entrando...' : 'Entrar no Painel'}
        </button>
      </form>
    </div>
  );
};
