import React from 'react';
import {
    MetaAppShell,
    LegalH1,
    LegalH2,
    LegalP,
    LegalUL,
    LegalUpdated,
} from './Layout';

// /meta-app/privacidade — Privacy policy for ER Ads Manager. Written
// to the Meta App Review checklist: identifies the data controller,
// scopes the app as internal-only, enumerates the data accessed, and
// declares retention, sharing and user rights under the Brazilian LGPD.
const MetaAppPrivacy: React.FC = () => (
    <MetaAppShell>
        <LegalH1>Política de Privacidade</LegalH1>
        <p className="text-base text-er-ink/65 leading-relaxed mb-2">
            Aplicação <strong>ER Ads Manager</strong>
        </p>
        <LegalUpdated date="20 de maio de 2026" />

        <LegalH2>1. Identificação do controlador</LegalH2>
        <LegalP>
            Esta Política de Privacidade descreve como o aplicativo{' '}
            <strong>ER Ads Manager</strong> trata informações
            relacionadas às operações de gestão de campanhas no Meta
            Ads. O controlador dos dados é:
        </LegalP>
        <LegalUL>
            <li>
                <strong>Nome</strong>: ER Marketing
            </li>
            <li>
                <strong>CNPJ</strong>: 41.079.306/0001-62
            </li>
            <li>
                <strong>Endereço</strong>: Manaus, Amazonas, Brasil
            </li>
            <li>
                <strong>E-mail para questões de privacidade</strong>:{' '}
                <a
                    href="mailto:contato@trafegomanaus.com.br"
                    className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                >
                    contato@trafegomanaus.com.br
                </a>
            </li>
        </LegalUL>

        <LegalH2>2. Escopo do aplicativo</LegalH2>
        <LegalP>
            O <strong>ER Ads Manager</strong> é uma ferramenta interna
            usada exclusivamente pela equipe autorizada da agência ER
            Marketing para gerenciar campanhas publicitárias no Meta
            Ads em nome dos clientes da agência, sob autorização
            explícita destes.
        </LegalP>
        <LegalP>
            O aplicativo não é destinado a usuários finais, não possui
            mecanismo público de cadastro e não está disponível para
            contratação por terceiros.
        </LegalP>

        <LegalH2>3. Dados acessados pelo aplicativo</LegalH2>
        <LegalP>
            Quando autorizado pelo cliente proprietário de uma conta
            de Meta Ads, o aplicativo acessa, por meio da Meta
            Marketing API, os seguintes tipos de dados:
        </LegalP>
        <LegalUL>
            <li>
                Estrutura e configuração das campanhas, conjuntos de
                anúncios (ad sets) e anúncios (ads) da conta.
            </li>
            <li>
                Métricas agregadas de desempenho (impressões, cliques,
                gasto, conversões, ROAS) extraídas via API de
                Insights.
            </li>
            <li>
                Listas de públicos personalizados (custom audiences) e
                listas de retargeting da conta.
            </li>
            <li>
                Criativos publicitários (imagens, vídeos, textos)
                vinculados aos anúncios da conta.
            </li>
            <li>
                Tokens de autenticação OAuth gerados pelo Meta para
                permitir o acesso programático.
            </li>
        </LegalUL>
        <LegalP>
            O aplicativo <strong>não</strong> acessa dados pessoais
            (PII) de usuários finais do Facebook ou Instagram — não há
            leitura de perfis, mensagens, contatos, fotos ou
            histórico de navegação de usuários do Meta.
        </LegalP>

        <LegalH2>4. Armazenamento</LegalH2>
        <LegalUL>
            <li>
                Tokens de acesso são armazenados localmente nas
                máquinas da equipe autorizada, em diretório protegido
                (<code className="text-sm bg-er-ink/5 px-1.5 py-0.5 rounded">
                    ~/.config/meta-ads/
                </code>
                ) com permissões de leitura restritas (chmod 600).
            </li>
            <li>
                Dados de campanha podem ser cacheados localmente
                durante operações em andamento. O cache é volátil e
                descartado ao final da execução.
            </li>
            <li>
                Não há banco de dados persistente nem armazenamento em
                serviços de nuvem de terceiros. A operação é stateless.
            </li>
        </LegalUL>

        <LegalH2>5. Compartilhamento com terceiros</LegalH2>
        <LegalP>
            A ER Marketing não compartilha, vende, aluga ou cede a
            terceiros nenhum dado acessado pelo aplicativo. O acesso é
            restrito à equipe autorizada da agência, e cada operação
            ocorre exclusivamente nas contas que o cliente
            expressamente autorizou.
        </LegalP>

        <LegalH2>6. Direitos do titular dos dados (LGPD)</LegalH2>
        <LegalP>
            Em conformidade com a Lei Geral de Proteção de Dados (Lei
            13.709/2018), o cliente cuja conta de Meta Ads é operada
            pelo aplicativo tem direito a:
        </LegalP>
        <LegalUL>
            <li>
                <strong>Acesso</strong>: solicitar relatório de quais
                dados foram acessados em sua conta.
            </li>
            <li>
                <strong>Retificação</strong>: solicitar correção de
                dados imprecisos.
            </li>
            <li>
                <strong>Exclusão</strong>: solicitar a remoção
                imediata do token de acesso e a interrupção da
                operação programática.
            </li>
            <li>
                <strong>Portabilidade</strong>: solicitar cópia dos
                relatórios gerados em formato estruturado.
            </li>
            <li>
                <strong>Revogação de consentimento</strong>: revogar
                a autorização da agência a qualquer momento, com
                efeito imediato.
            </li>
        </LegalUL>
        <LegalP>
            Para exercer qualquer um desses direitos, basta enviar um
            e-mail para{' '}
            <a
                href="mailto:contato@trafegomanaus.com.br"
                className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
            >
                contato@trafegomanaus.com.br
            </a>
            . A resposta será fornecida em até 15 dias úteis.
        </LegalP>

        <LegalH2>7. Retenção dos dados</LegalH2>
        <LegalP>
            Os tokens de acesso permanecem ativos enquanto o cliente
            mantém autorização concedida à agência. Ao encerrar o
            contrato com o cliente, os tokens são revogados na
            plataforma do Meta e os dados em cache local são
            descartados.
        </LegalP>

        <LegalH2>8. Cookies e rastreamento web</LegalH2>
        <LegalP>
            O aplicativo é uma ferramenta de linha de comando (CLI) e
            não opera em navegador. Portanto, não utiliza cookies,
            não realiza rastreamento de navegação web e não emprega
            tecnologias de fingerprinting.
        </LegalP>

        <LegalH2>9. Segurança</LegalH2>
        <LegalUL>
            <li>
                Comunicação com a Meta Marketing API ocorre
                exclusivamente via HTTPS.
            </li>
            <li>
                Tokens são armazenados localmente com permissões
                restritas e nunca expostos em logs, repositórios de
                código ou serviços externos.
            </li>
            <li>
                Acesso ao aplicativo é restrito à equipe autorizada da
                ER Marketing, com autenticação individual.
            </li>
        </LegalUL>

        <LegalH2>10. Lei aplicável</LegalH2>
        <LegalP>
            Esta Política está submetida à Lei Geral de Proteção de
            Dados Pessoais (Lei nº 13.709/2018) do Brasil. O foro
            eleito para dirimir quaisquer questões decorrentes desta
            política é o da Comarca de Manaus, Estado do Amazonas,
            Brasil.
        </LegalP>

        <LegalH2>11. Atualizações desta política</LegalH2>
        <LegalP>
            A ER Marketing reserva-se o direito de atualizar esta
            Política de Privacidade a qualquer momento. Alterações
            relevantes serão comunicadas diretamente aos clientes
            afetados. A versão vigente está sempre disponível nesta
            página.
        </LegalP>
    </MetaAppShell>
);

export default MetaAppPrivacy;
