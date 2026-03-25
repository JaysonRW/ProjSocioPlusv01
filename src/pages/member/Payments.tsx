import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCircle2, Copy, AlertCircle } from 'lucide-react';

export const Payments: React.FC = () => {
  const { userProfile } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userProfile) return;
      try {
        const q = query(
          collection(db, 'payments'),
          where('user_id', '==', userProfile.uid),
          orderBy('data_vencimento', 'desc')
        );
        const querySnapshot = await getDocs(q);
        setPayments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userProfile]);

  const handleCopyPix = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulatePayment = async (paymentId: string) => {
    // This simulates a webhook confirming payment
    try {
      await updateDoc(doc(db, 'payments', paymentId), {
        status: 'pago',
        data_pagamento: new Date().toISOString()
      });
      
      // Update user status
      if (userProfile) {
        await updateDoc(doc(db, 'users', userProfile.uid), {
          status: 'ativo'
        });
      }

      // Refresh payments
      const q = query(
        collection(db, 'payments'),
        where('user_id', '==', userProfile?.uid),
        orderBy('data_vencimento', 'desc')
      );
      const querySnapshot = await getDocs(q);
      setPayments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error simulating payment:", error);
    }
  };

  const generateNewPayment = async () => {
    if (!userProfile) return;
    try {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      
      await addDoc(collection(db, 'payments'), {
        user_id: userProfile.uid,
        valor: 50.00,
        status: 'pendente',
        data_vencimento: nextMonth.toISOString(),
        pix_code: `00020126580014BR.GOV.BCB.PIX0136${userProfile.uid}520400005303986540550.005802BR5913Torcida Fiel6009Sao Paulo62070503***6304ABCD`,
        createdAt: new Date().toISOString()
      });
      
      // Refresh
      const q = query(
        collection(db, 'payments'),
        where('user_id', '==', userProfile.uid),
        orderBy('data_vencimento', 'desc')
      );
      const querySnapshot = await getDocs(q);
      setPayments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error generating payment:", error);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Mensalidades
        </h2>
        <button 
          onClick={generateNewPayment}
          className="text-xs font-bold uppercase tracking-widest bg-card border border-border px-3 py-2 rounded text-primary hover:bg-border transition-colors"
        >
          Gerar Boleto
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="bg-card h-24 rounded-xl border border-border"></div>
          ))}
        </div>
      ) : payments.length > 0 ? (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className={`bg-card border rounded-xl p-4 ${
              payment.status === 'pago' ? 'border-border' : 'border-primary/50'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">
                    Vencimento: {format(new Date(payment.data_vencimento), "dd/MM/yyyy")}
                  </div>
                  <div className="text-xl font-black">
                    R$ {payment.valor.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  payment.status === 'pago' ? 'bg-green-900/20 text-green-400' : 'bg-primary/20 text-primary'
                }`}>
                  {payment.status === 'pago' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {payment.status}
                </div>
              </div>

              {payment.status === 'pendente' && (
                <div className="space-y-3">
                  <div className="bg-background border border-border rounded p-3 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted truncate mr-2">
                      {payment.pix_code}
                    </span>
                    <button 
                      onClick={() => handleCopyPix(payment.pix_code)}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {copied && <p className="text-[10px] text-green-400 font-bold uppercase text-center">Código copiado!</p>}
                  
                  <button 
                    onClick={() => simulatePayment(payment.id)}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded uppercase tracking-widest text-xs transition-colors"
                  >
                    Simular Pagamento (Dev)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-card border border-border rounded-xl">
          <p className="text-muted text-sm">Nenhuma mensalidade encontrada.</p>
        </div>
      )}
    </div>
  );
};
