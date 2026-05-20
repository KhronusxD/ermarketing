import React from 'react';
import {
    MetaAppShell,
    LegalH1,
    LegalH2,
    LegalP,
    LegalUL,
    LegalUpdated,
} from './Layout';

// /meta-app/termos — Terms of Service for ER Ads Manager. Establishes
// the app as internal-only, requires explicit client authorization per
// ad account, and disclaims warranties as required by typical Brazilian
// consumer law context.
const MetaAppTerms: React.FC = () => (
    <MetaAppShell>
        <LegalH1>Termos de Uso</LegalH1>
        <p className="text-base text-er-ink/65 leading-relaxed mb-2">
            Aplicação <strong>ER Ads Manager</strong>
        </p>
        <LegalUpdated date="20 de maio de 2026" />

        <LegalH2>1. Identificação</LegalH2>
        <LegalP>
            Estes Termos de Uso regulam a operação do aplicativo{' '}
            <strong>ER Ads Manager</strong>, ferramenta interna
            operada por:
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
                <strong>E-mail de contato</strong>:{' '}
                <a
                    href="mailto:contato@trafegomanaus.com.br"
                    className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                >
                    contato@trafegomanaus.com.br
                </a>
            </li>
        </LegalUL>

        <LegalH2>2. Natureza do serviço</LegalH2>
        <LegalP>
            O <strong>ER Ads Manager</strong> é um aplicativo de uso
            interno da agência ER Marketing, destinado exclusivamente
            à equipe autorizada da agência. Não há contratação pública,
            cadastro aberto ou disponibilidade para terceiros.
        </LegalP>

        <LegalH2>3. Uso autorizado</LegalH2>
        <LegalP>
            O aplicativo é utilizado para gerenciar campanhas
            publicitárias no Meta Ads (Facebook e Instagram) em contas
            de clientes da ER Marketing, sempre sob autorização
            explícita do cliente proprietário de cada conta. As
            operações realizadas incluem:
        </LegalP>
        <LegalUL>
            <li>
                Consulta de métricas e geração de relatórios de
                desempenho.
            </li>
            <li>
                Atualização de configurações de campanhas, conjuntos
                de anúncios e anúncios (orçamento, status,
                segmentação).
            </li>
            <li>Criação e gestão de criativos publicitários.</li>
            <li>
                Gestão de públicos personalizados e listas de
                retargeting.
            </li>
        </LegalUL>
        <LegalP>
            O cliente pode revogar a autorização concedida à agência a
            qualquer momento, com efeito imediato sobre o acesso do
            aplicativo à respectiva conta.
        </LegalP>

        <LegalH2>4. Conduta proibida</LegalH2>
        <LegalP>A equipe autorizada não pode utilizar o aplicativo para:</LegalP>
        <LegalUL>
            <li>
                Acessar contas de Meta Ads sem autorização explícita do
                respectivo proprietário.
            </li>
            <li>
                Violar os Termos de Serviço do Meta Ads ou qualquer
                outra política da plataforma Meta.
            </li>
            <li>
                Praticar atividades ilícitas, fraudulentas ou que
                infrinjam direitos de terceiros.
            </li>
            <li>
                Compartilhar credenciais de acesso ou tokens com
                indivíduos não autorizados.
            </li>
        </LegalUL>

        <LegalH2>5. Limitação de responsabilidade</LegalH2>
        <LegalP>
            O <strong>ER Ads Manager</strong> é fornecido "como está",
            sem garantias expressas ou implícitas de disponibilidade
            contínua, ausência de defeitos ou adequação a propósitos
            específicos.
        </LegalP>
        <LegalP>
            A ER Marketing, na qualidade de operadora do aplicativo,
            é responsável pelas operações realizadas e por garantir que
            cada ação tenha autorização do cliente proprietário da
            conta envolvida. Falhas técnicas da plataforma Meta ou de
            terceiros não constituem responsabilidade da ER Marketing.
        </LegalP>

        <LegalH2>6. Privacidade e proteção de dados</LegalH2>
        <LegalP>
            O tratamento de dados realizado pelo aplicativo está
            descrito em detalhes na{' '}
            <a
                href="/meta-app/privacidade"
                className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
            >
                Política de Privacidade
            </a>
            , que é parte integrante destes Termos.
        </LegalP>

        <LegalH2>7. Encerramento</LegalH2>
        <LegalP>
            A ER Marketing pode encerrar ou suspender o uso do
            aplicativo a qualquer momento, por critério próprio. Em
            caso de encerramento de um contrato com cliente, todos os
            tokens de acesso relacionados àquela conta são revogados e
            quaisquer dados em cache local descartados.
        </LegalP>

        <LegalH2>8. Modificações destes Termos</LegalH2>
        <LegalP>
            A ER Marketing reserva-se o direito de modificar estes
            Termos de Uso a qualquer momento. Alterações relevantes
            serão comunicadas diretamente aos clientes afetados. A
            versão vigente está sempre disponível nesta página.
        </LegalP>

        <LegalH2>9. Lei aplicável e foro</LegalH2>
        <LegalP>
            Estes Termos são regidos pelas leis da República
            Federativa do Brasil. Fica eleito o foro da Comarca de
            Manaus, Estado do Amazonas, Brasil, como competente para
            dirimir quaisquer controvérsias decorrentes destes Termos
            ou da operação do aplicativo.
        </LegalP>
    </MetaAppShell>
);

export default MetaAppTerms;
