import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Star } from 'lucide-react';

interface PlanProps {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export const PlanCard: React.FC<PlanProps> = ({ id, name, price, features, isPopular }) => {
  return (
    <div className={`relative flex flex-col p-8 bg-card rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
      isPopular ? 'border-primary shadow-2xl shadow-primary/20' : 'border-border shadow-lg'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Mais Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold text-muted uppercase">R$</span>
          <span className="text-5xl font-black tracking-tighter">{price.toFixed(2).replace('.', ',')}</span>
          <span className="text-sm font-bold text-muted uppercase">/mês</span>
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/join?plan=${id}`}
        className={`w-full py-4 rounded-xl text-center font-bold uppercase tracking-widest transition-colors ${
          isPopular 
            ? 'bg-primary hover:bg-primary-hover text-white' 
            : 'bg-background border border-border hover:border-primary text-foreground'
        }`}
      >
        Assinar Agora
      </Link>
    </div>
  );
};
