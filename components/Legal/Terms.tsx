import React from 'react';
import { LegalLayout } from './LegalLayout';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h2 className="text-lg md:text-xl font-semibold text-white mb-3">{title}</h2>
        <div className="space-y-3">{children}</div>
    </section>
);

export const Terms: React.FC = () => {
    return (
        <LegalLayout title="Termos de Uso" updatedAt="14 de maio de 2026">
            <p>
                Estes Termos de Uso (&quot;Termos&quot;) regem o acesso e a utilização do site,
                conteúdos, formulários, diagnósticos e demais serviços disponibilizados pela{' '}
                <strong>ER Marketing</strong>, inscrita no CNPJ sob o nº{' '}
                <strong>41.079.306/0001-62</strong>. Ao acessar ou utilizar nossos canais, você
                declara ter lido, compreendido e concordado integralmente com estes Termos.
            </p>

            <Section title="1. Sobre a ER Marketing">
                <p>
                    A ER Marketing é uma empresa de marketing de performance especializada em
                    auditorias, diagnósticos e operação de campanhas publicitárias para pequenos
                    e médios negócios. Os serviços, escopos e contraprestações são definidos em
                    propostas comerciais e contratos específicos firmados entre a ER Marketing e
                    seus clientes.
                </p>
            </Section>

            <Section title="2. Aceitação">
                <p>
                    Ao navegar, preencher formulários, participar de quizzes ou contratar nossos
                    serviços, você confirma sua aceitação destes Termos e da nossa{' '}
                    <a href="/politica-de-privacidade" className="text-white underline hover:text-white/70">
                        Política de Privacidade
                    </a>
                    . Caso não concorde com qualquer disposição, recomendamos que não utilize
                    nossos canais.
                </p>
            </Section>

            <Section title="3. Uso permitido">
                <p>Você concorda em utilizar nossos canais de forma lícita e ética, comprometendo-se a:</p>
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>Fornecer informações verdadeiras, atualizadas e completas.</li>
                    <li>
                        Não utilizar o site para fins ilícitos, fraudulentos ou que violem direitos
                        de terceiros.
                    </li>
                    <li>
                        Não tentar acessar áreas restritas, sistemas internos, executar engenharia
                        reversa, scraping em massa ou outras formas de interferência técnica.
                    </li>
                    <li>
                        Respeitar a propriedade intelectual da ER Marketing e de terceiros.
                    </li>
                </ul>
            </Section>

            <Section title="4. Propriedade intelectual">
                <p>
                    Todo o conteúdo disponibilizado nos canais da ER Marketing — incluindo textos,
                    layouts, marcas, logotipos, vídeos, ilustrações, código-fonte, metodologias e
                    materiais educativos — é de titularidade da ER Marketing ou licenciado por
                    terceiros, sendo protegido pela legislação brasileira e por tratados
                    internacionais. Fica vedada qualquer cópia, reprodução, comercialização ou uso
                    sem autorização prévia e expressa.
                </p>
            </Section>

            <Section title="5. Diagnósticos, auditorias e conteúdos">
                <p>
                    Os diagnósticos, quizzes, auditorias e conteúdos gratuitos disponibilizados em
                    nossos canais têm finalidade informativa e comercial, baseando-se nas
                    informações fornecidas pelo próprio usuário e em referências de mercado. Não
                    constituem garantia de resultados, recomendação financeira ou jurídica, e não
                    substituem análise individualizada por profissional habilitado.
                </p>
                <p>
                    Resultados de campanhas publicitárias dependem de múltiplas variáveis externas
                    (mercado, oferta, operação, atendimento, sazonalidade, decisões de plataformas
                    de mídia) e não podem ser garantidos.
                </p>
            </Section>

            <Section title="6. Comunicações comerciais">
                <p>
                    Ao informar seus dados de contato, você autoriza a ER Marketing a enviar
                    comunicações comerciais, conteúdos e novidades por e-mail, WhatsApp ou outros
                    canais. Você pode solicitar o descadastro a qualquer momento através do
                    e-mail{' '}
                    <a
                        href="mailto:contato@ermarketing.com.br"
                        className="text-white underline hover:text-white/70"
                    >
                        contato@ermarketing.com.br
                    </a>{' '}
                    ou pelos próprios mecanismos das mensagens enviadas.
                </p>
            </Section>

            <Section title="7. Links para terceiros">
                <p>
                    Nossos canais podem conter links para sites e serviços de terceiros. A ER
                    Marketing não controla nem se responsabiliza pelo conteúdo, práticas ou
                    políticas desses terceiros. Recomendamos a leitura dos respectivos termos e
                    políticas antes da utilização.
                </p>
            </Section>

            <Section title="8. Limitação de responsabilidade">
                <p>
                    Dentro dos limites permitidos pela legislação aplicável, a ER Marketing não
                    será responsabilizada por danos indiretos, lucros cessantes, perda de
                    oportunidades comerciais ou qualquer prejuízo decorrente de:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>
                        Uso indevido das informações disponibilizadas em nossos canais.
                    </li>
                    <li>
                        Indisponibilidade temporária do site, decorrente de manutenção, falhas
                        técnicas ou eventos de força maior.
                    </li>
                    <li>
                        Decisões de plataformas de mídia (Meta, Google, TikTok e similares) que
                        impactem campanhas, incluindo bloqueios, reprovações de criativos ou
                        alterações de algoritmo.
                    </li>
                    <li>
                        Atos de terceiros, incluindo invasões, ataques cibernéticos e fraudes
                        externas, fora do controle razoável da ER Marketing.
                    </li>
                </ul>
            </Section>

            <Section title="9. Privacidade e proteção de dados">
                <p>
                    O tratamento de dados pessoais realizado pela ER Marketing observa o disposto
                    na{' '}
                    <a
                        href="/politica-de-privacidade"
                        className="text-white underline hover:text-white/70"
                    >
                        Política de Privacidade
                    </a>
                    , que integra estes Termos para todos os fins.
                </p>
            </Section>

            <Section title="10. Alterações dos Termos">
                <p>
                    A ER Marketing pode atualizar estes Termos a qualquer momento para refletir
                    mudanças em seus serviços, requisitos legais ou melhores práticas. A versão
                    vigente estará sempre publicada neste endereço, com a respectiva data de
                    atualização. O uso continuado dos canais após a publicação implica aceitação
                    da nova versão.
                </p>
            </Section>

            <Section title="11. Legislação aplicável e foro">
                <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica
                    eleito o foro da comarca do domicílio da ER Marketing para dirimir quaisquer
                    controvérsias decorrentes destes Termos, salvo previsão legal específica em
                    sentido diverso.
                </p>
            </Section>

            <Section title="12. Contato">
                <p>
                    Dúvidas e solicitações relacionadas a estes Termos podem ser enviadas para:
                </p>
                <p className="text-white/70">
                    <strong>ER Marketing</strong>
                    <br />
                    CNPJ 41.079.306/0001-62
                    <br />
                    E-mail: contato@ermarketing.com.br
                </p>
            </Section>
        </LegalLayout>
    );
};

export default Terms;
