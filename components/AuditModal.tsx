import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { AuditModalProps } from '../types';
import { Button } from './ui/Button';

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Solicitar Auditoria</h3>
                <p className="text-gray-400 text-sm">
                  Preencha os dados abaixo para que nossa equipe de estrategistas analise o potencial do seu negócio.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase text-gray-500 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-sm p-3 text-white focus:border-er-red focus:outline-none focus:ring-1 focus:ring-er-red transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase text-gray-500 mb-1">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-sm p-3 text-white focus:border-er-red focus:outline-none focus:ring-1 focus:ring-er-red transition-all"
                    placeholder="voce@suaempresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase text-gray-500 mb-1">WhatsApp</label>
                  <input 
                    type="tel" 
                    id="phone"
                    required
                    className="w-full bg-[#111] border border-white/10 rounded-sm p-3 text-white focus:border-er-red focus:outline-none focus:ring-1 focus:ring-er-red transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label htmlFor="revenue" className="block text-xs font-semibold uppercase text-gray-500 mb-1">Faturamento Mensal</label>
                  <select 
                    id="revenue"
                    className="w-full bg-[#111] border border-white/10 rounded-sm p-3 text-white focus:border-er-red focus:outline-none focus:ring-1 focus:ring-er-red transition-all"
                  >
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="<50k">Até R$ 50k</option>
                    <option value="50k-100k">R$ 50k - R$ 100k</option>
                    <option value="100k-500k">R$ 100k - R$ 500k</option>
                    <option value="500k+">Acima de R$ 500k</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    isLoading={isLoading}
                    className="w-full"
                  >
                    AGENDAR DIAGNÓSTICO
                  </Button>
                  <p className="text-center text-xs text-gray-600 mt-3">
                    Seus dados estão protegidos. Entraremos em contato em até 24h.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida</h3>
              <p className="text-gray-400 mb-6">
                Nossa equipe de inteligência já recebeu seus dados. Em breve, um especialista entrará em contato para agendar sua auditoria.
              </p>
              <Button onClick={onClose} variant="outline" className="w-full">
                FECHAR
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};