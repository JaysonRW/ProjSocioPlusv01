import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Shield, ArrowLeft } from 'lucide-react';

export const Join: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    telefone: '',
    email: '',
    password: '',
    plano: 'bronze',
  });

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan && ['bronze', 'prata', 'ouro'].includes(plan)) {
      setFormData(prev => ({ ...prev, plano: plan }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        nome: formData.nome,
        cpf: formData.cpf,
        data_nascimento: formData.data_nascimento,
        telefone: formData.telefone,
        email: formData.email,
        plano: formData.plano,
        status: 'inativo', // Starts inactive until first payment
        role: formData.email === 'propagoumkd@gmail.com' ? 'admin' : 'socio',
        createdAt: new Date().toISOString(),
      });

      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 max-w-md mx-auto relative">
      <Link to="/" className="absolute top-6 left-6 text-muted hover:text-foreground">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      
      <div className="mt-12 mb-8 text-center">
        <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          Cadastro de Sócio
        </h1>
        <p className="text-muted text-sm mt-2">Preencha seus dados para se juntar à torcida.</p>
      </div>

      {error && (
        <div className="bg-primary/20 border border-primary text-primary p-3 rounded-md mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Plano Escolhido</label>
          <select
            name="plano"
            value={formData.plano}
            onChange={handleChange}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
          >
            <option value="bronze">Sócio Bronze - R$ 29,90/mês</option>
            <option value="prata">Sócio Prata - R$ 59,90/mês</option>
            <option value="ouro">Sócio Ouro - R$ 99,90/mês</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Nome Completo</label>
          <input
            type="text"
            name="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="João da Silva"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">CPF</label>
          <input
            type="text"
            name="cpf"
            required
            value={formData.cpf}
            onChange={handleChange}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="000.000.000-00"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              required
              value={formData.data_nascimento}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Telefone</label>
            <input
              type="tel"
              name="telefone"
              required
              value={formData.telefone}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="joao@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Senha</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-lg uppercase tracking-widest mt-8 transition-colors disabled:opacity-50"
        >
          {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </button>
      </form>
    </div>
  );
};
