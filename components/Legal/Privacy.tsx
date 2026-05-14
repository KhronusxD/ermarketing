import React from 'react';
import { LegalLayout } from './LegalLayout';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section>
        <h2 className="text-lg md:text-xl font-semibold text-white mb-3">{title}</h2>
        <div className="space-y-3">{children}</div>
    </section>
);

export const Privacy: React.FC = () => {
    return (
        <LegalLayout title="Política de Privacidade" updatedAt="14 de maio de 2026">
            <p>
                Esta Política de Privacidade descreve como a <strong>ER Marketing</strong>, inscrita
                no CNPJ sob o nº <strong>41.079.306/0001-62</strong> (&quot;ER Marketing&quot;,
                &quot;nós&quot; ou &quot;nosso&quot;), coleta, utiliza, armazena e protege os dados
                pessoais dos usuários (&quot;você&quot; ou &quot;Usuário&quot;) que acessam nosso
                site, formulários, materiais e canais de atendimento. Esta política está alinhada à
                Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD) e às práticas
                internacionais de privacidade.
            </p>

            <Section title="1. Dados que coletamos">
                <p>
                    Coletamos apenas os dados necessários para prestar nossos serviços, responder
                    contatos comerciais e operar campanhas publicitárias. Os dados podem incluir:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>
                        <strong>Dados de identificação e contato:</strong> nome, e-mail, telefone,
                        WhatsApp, empresa e cargo, quando informados em formulários e quizzes.
                    </li>
                    <li>
                        <strong>Dados de navegação:</strong> endereço IP, tipo de navegador,
                        páginas visitadas, tempo de sessão, origem do tráfego e identificadores de
                        cookies.
                    </li>
                    <li>
                        <strong>Dados comerciais:</strong> informações sobre seu negócio,
                        faturamento estimado, segmento e desafios, quando voluntariamente
                        informados em diagnósticos e auditorias.
                    </li>
                </ul>
            </Section>

            <Section title="2. Como coletamos seus dados">
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>Diretamente, quando você preenche formulários, quizzes ou nos contata.</li>
                    <li>
                        Automaticamente, por meio de cookies e tecnologias semelhantes, conforme
                        descrito no item 7.
                    </li>
                    <li>
                        De terceiros, como Meta (Facebook/Instagram) e Google, quando você
                        interage com nossos anúncios e autoriza o compartilhamento de dados em
                        suas próprias plataformas.
                    </li>
                </ul>
            </Section>

            <Section title="3. Finalidades do tratamento">
                <p>Utilizamos seus dados pessoais para:</p>
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>Responder solicitações de contato, propostas e dúvidas comerciais.</li>
                    <li>Executar diagnósticos, auditorias e demais serviços contratados.</li>
                    <li>
                        Enviar comunicações sobre nossos serviços, conteúdos e novidades, sempre
                        com a possibilidade de descadastro.
                    </li>
                    <li>
                        Mensurar e otimizar a performance do site e das campanhas publicitárias,
                        inclusive por meio de eventos enviados ao Meta Pixel e ao Google Tag
                        Manager.
                    </li>
                    <li>
                        Cumprir obrigações legais, regulatórias, fiscais e atender requisições de
                        autoridades competentes.
                    </li>
                </ul>
            </Section>

            <Section title="4. Bases legais">
                <p>
                    O tratamento dos seus dados ocorre com fundamento nas seguintes bases legais
                    da LGPD: (i) consentimento; (ii) execução de contrato ou procedimentos
                    preliminares; (iii) cumprimento de obrigação legal; (iv) legítimo interesse,
                    sempre balanceado com seus direitos fundamentais.
                </p>
            </Section>

            <Section title="5. Compartilhamento de dados">
                <p>
                    A ER Marketing não vende dados pessoais. Podemos compartilhar dados com:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-white/70">
                    <li>
                        <strong>Provedores de tecnologia:</strong> hospedagem, e-mail, CRM,
                        analytics, automação de marketing e atendimento, sempre sob contrato e com
                        nível de segurança adequado.
                    </li>
                    <li>
                        <strong>Plataformas de mídia:</strong> Meta (Facebook/Instagram), Google,
                        TikTok e similares, para mensuração e otimização de campanhas.
                    </li>
                    <li>
                        <strong>Autoridades públicas:</strong> quando exigido por lei, ordem
                        judicial ou requisição administrativa fundamentada.
                    </li>
                </ul>
            </Section>

            <Section title="6. Armazenamento e segurança">
                <p>
                    Adotamos medidas técnicas e administrativas razoáveis para proteger os dados
                    pessoais contra acessos não autorizados, perda, alteração ou destruição,
                    incluindo controle de acesso, criptografia em trânsito e segregação de
                    ambientes. Os dados são mantidos pelo tempo necessário ao cumprimento das
                    finalidades para as quais foram coletados, ou conforme exigido por obrigação
                    legal ou regulatória.
                </p>
            </Section>

            <Section title="7. Cookies e tecnologias semelhantes">
                <p>
                    Nosso site utiliza cookies próprios e de terceiros (incluindo Meta Pixel,
                    Google Tag Manager, Google Analytics e Flowdesk) para identificar visitas
                    recorrentes, medir audiência, otimizar a experiência e personalizar
                    comunicações. Você pode gerenciar ou desabilitar cookies pelas configurações
                    do seu navegador. A desativação pode impactar funcionalidades do site.
                </p>
            </Section>

            <Section title="8. Seus direitos">
                <p>
                    Nos termos da LGPD, você pode, a qualquer momento, solicitar: confirmação da
                    existência de tratamento; acesso aos seus dados; correção de dados incompletos
                    ou desatualizados; anonimização, bloqueio ou eliminação de dados desnecessários
                    ou tratados em desconformidade; portabilidade; informação sobre
                    compartilhamentos; e revogação de consentimento.
                </p>
                <p>
                    Para exercer seus direitos, envie um e-mail para{' '}
                    <a
                        href="mailto:contato@ermarketing.com.br"
                        className="text-white underline hover:text-white/70"
                    >
                        contato@ermarketing.com.br
                    </a>
                    .
                </p>
            </Section>

            <Section title="9. Crianças e adolescentes">
                <p>
                    Nossos serviços são destinados a empresas e profissionais maiores de 18 anos.
                    Não coletamos intencionalmente dados de crianças e adolescentes. Caso
                    identifique tal coleta, entre em contato para remoção imediata.
                </p>
            </Section>

            <Section title="10. Alterações nesta Política">
                <p>
                    Esta Política pode ser atualizada periodicamente para refletir mudanças em
                    nossos serviços ou exigências legais. A versão mais recente estará sempre
                    disponível nesta página, com a data da última revisão.
                </p>
            </Section>

            <Section title="11. Encarregado e contato">
                <p>
                    Dúvidas, solicitações de titular ou comunicações relacionadas a esta Política
                    podem ser direcionadas a:
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

export default Privacy;
