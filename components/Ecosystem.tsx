import React from 'react';
import { BarChart3, Video, MessageSquareHeart, MousePointerClick, PenTool, Share2, ScrollText } from 'lucide-react';
import { SectionProps } from '../types';
import { Button } from './ui/Button';

export const Ecosystem: React.FC<SectionProps> = ({ onAuditClick }) => {
  return (
    <section className="py-24 bg-[#050505] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            ECOSSISTEMA <span className="text-er-red">360º</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Não fazemos apenas "anúncios". Construímos uma máquina de vendas completa onde cada peça tem uma função estratégica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 hover:border-er-red/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-er-red group-hover:text-white transition-colors text-er-red">
              <MousePointerClick size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Tráfego Pago (Paid Media)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Google, Meta, TikTok e LinkedIn Ads. Gestão focada em CPA (Custo por Aquisição) e ROAS. Não buscamos cliques, buscamos compradores.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 hover:border-er-red/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-er-red group-hover:text-white transition-colors text-er-red">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Business Intelligence (BI)</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dashboards em tempo real. Você saberá exatamente quanto investiu e quanto voltou, sem "achismos" ou relatórios confusos de fim de mês.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 hover:border-er-red/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-er-red group-hover:text-white transition-colors text-er-red">
              <PenTool size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Copywriting & Criativos</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Anúncios que param o scroll. Roteiros de vídeo, headlines persuasivas e design focado em conversão para baixar seu custo por lead.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 hover:border-er-red/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-er-red group-hover:text-white transition-colors text-er-red">
              <Share2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Inbound & CRM</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Implementação de automação de e-mail e CRM. Nutrimos os leads que ainda não compraram para aumentar seu LTV (Lifetime Value).
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#0A0A0A] p-8 rounded-xl border border-white/5 hover:border-er-red/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-er-red group-hover:text-white transition-colors text-er-red">
              <Video size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Captação In Loco</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Produção audiovisual profissional na sua empresa. Mostramos sua estrutura, time e bastidores para gerar autoridade imediata na sua cidade.
            </p>
          </div>

          {/* Card 6 - CTA */}
          <div className="bg-gradient-to-br from-[#0A0A0A] to-er-red/10 p-8 rounded-xl border border-er-red/30 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ScrollText size={100} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Sua Estratégia Está Completa?</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Muitas empresas falham por terem peças soltas. Descubra qual pilar está faltando na sua operação.
            </p>
            <Button onClick={onAuditClick} className="w-full shadow-[0_0_20px_rgba(230,0,0,0.5)] animate-pulse-slow">
              FAZER CHECKLIST AGORA
            </Button>
          </div>
        </div>

        {/* Connection Lines (Visual Decoration) */}
        <div className="hidden lg:block absolute top-[50%] left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10"></div>
      </div>
    </section>
  );
};