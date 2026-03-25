import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, AlertTriangle } from 'lucide-react';

export const IDCard: React.FC = () => {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  const isAtivo = userProfile.status === 'ativo';

  return (
    <div className="p-6 min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-center">
        Carteirinha Digital
      </h2>

      <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
        isAtivo ? 'border-2 border-primary shadow-primary/20' : 'border-2 border-muted shadow-none opacity-80'
      }`}>
        {/* Card Header */}
        <div className="bg-card p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className={`w-10 h-10 ${isAtivo ? 'text-primary' : 'text-muted'}`} />
            <div>
              <h3 className="font-black uppercase tracking-widest text-lg leading-none">Torcida Fiel</h3>
              <p className="text-[10px] text-muted uppercase tracking-widest mt-1">Sócio Torcedor</p>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="bg-background p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-card overflow-hidden mb-4 bg-card flex items-center justify-center">
            {userProfile.foto_url ? (
              <img src={userProfile.foto_url} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-3xl font-black text-muted">{userProfile.nome.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <h4 className="text-xl font-bold text-center mb-1">{userProfile.nome}</h4>
          <p className="text-xs text-muted uppercase tracking-widest mb-6">CPF: {userProfile.cpf}</p>

          <div className={`p-4 rounded-xl bg-white flex items-center justify-center w-48 h-48 mb-6 relative ${!isAtivo ? 'opacity-50' : ''}`}>
            {isAtivo ? (
              <QRCodeSVG
                value={userProfile.uid}
                size={160}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 text-primary p-4 text-center">
                <AlertTriangle className="w-12 h-12 mb-2" />
                <span className="text-xs font-bold uppercase">Sócio Inativo</span>
              </div>
            )}
          </div>

          <div className={`w-full py-3 text-center rounded-lg font-black uppercase tracking-widest text-sm ${
            isAtivo ? 'bg-primary text-white' : 'bg-muted text-background'
          }`}>
            {isAtivo ? 'Acesso Liberado' : 'Acesso Bloqueado'}
          </div>
        </div>
      </div>
      
      {!isAtivo && (
        <p className="text-center text-sm text-muted mt-8 max-w-xs">
          Sua carteirinha está bloqueada. Regularize sua situação na aba de pagamentos para liberar o acesso.
        </p>
      )}
    </div>
  );
};
