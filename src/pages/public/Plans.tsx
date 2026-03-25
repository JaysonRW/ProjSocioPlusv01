import React from 'react';
import { PlanCard } from '../../components/public/PlanCard';

const MOCK_PLANS = [
  {
    id: 'bronze',
    name: 'Sócio Bronze',
    price: 29.90,
    features: [
      'Carteirinha digital',
      'Desconto de 10% na loja oficial',
      'Prioridade 3 na compra de ingressos',
      'Acesso a conteúdos exclusivos no app',
    ],
  },
  {
    id: 'prata',
    name: 'Sócio Prata',
    price: 59.90,
    isPopular: true,
    features: [
      'Carteirinha digital e física',
      'Desconto de 20% na loja oficial',
      'Prioridade 2 na compra de ingressos',
      'Acesso a conteúdos exclusivos no app',
      'Participação em sorteios mensais',
    ],
  },
  {
    id: 'ouro',
    name: 'Sócio Ouro',
    price: 99.90,
    features: [
      'Carteirinha digital e física VIP',
      'Desconto de 30% na loja oficial',
      'Prioridade 1 na compra de ingressos',
      'Acesso a conteúdos exclusivos no app',
      'Participação em sorteios mensais',
      'Acesso ao lounge VIP em dias de jogo',
    ],
  },
];

export const Plans: React.FC = () => {
  return (
    <div className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
            Escolha seu Plano
          </h2>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Jogue junto com o time
          </h1>
          <p className="text-lg text-muted">
            Seja sócio torcedor e tenha acesso a benefícios exclusivos, descontos em ingressos e experiências inesquecíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {MOCK_PLANS.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};
