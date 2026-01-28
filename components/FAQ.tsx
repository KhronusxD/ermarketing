import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SectionProps } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como funciona a Auditoria de Lucro Invisível?",
    answer: "É uma análise profunda da sua estrutura atual de marketing e vendas. Nossos estrategistas acessam suas campanhas (modo leitura), analisam seu funil e identificam onde você está perdendo dinheiro e onde pode escalar."
  },
  {
    question: "Qual o investimento necessário para começar?",
    answer: "Não trabalhamos com pacotes fechados. A Auditoria serve justamente para desenhar um projeto compatível com seu momento e objetivos. Porém, focamos em empresas que já investem ou têm capacidade de investimento em tráfego."
  },
  {
    question: "Vocês atendem quais nichos?",
    answer: "Nossa metodologia é agnóstica a nichos, pois é baseada em fundamentos de negócio e comportamento humano. Temos cases de sucesso em E-commerce, Infoprodutos, Serviços Locais e B2B."
  },
  {
    question: "A ER Marketing faz apenas Tráfego Pago?",
    answer: "Não. Somos uma assessoria completa de performance. Isso inclui Gestão de Tráfego, Criação de Landing Pages, CRM, Design, Social Media, Produção Audiovisual e Estratégia de Vendas."
  }
];

export const FAQ: React.FC<SectionProps> = ({ onAuditClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">PERGUNTAS FREQUENTES</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg transition-all duration-300 ${openIndex === index ? 'border-er-red bg-[#0A0A0A]' : 'border-white/10 bg-transparent hover:border-white/20'}`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-semibold ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="text-er-red flex-shrink-0" size={20} />
                ) : (
                  <Plus className="text-gray-500 flex-shrink-0" size={20} />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};