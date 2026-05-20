import React from 'react';
import { Link } from 'react-router-dom';
import {
    MetaAppShell,
    LegalH1,
    LegalH2,
    LegalP,
    LegalUL,
} from './Layout';

// /meta-app — Public landing for the Meta App Review process. Describes
// the app, its scope, and links to Privacy + Terms. Kept short and
// declarative — Meta reviewers want unambiguous statements they can
// pattern-match against their checklist.
const MetaAppIndex: React.FC = () => (
    <MetaAppShell>
        <LegalH1>ER Ads Manager</LegalH1>
        <p className="text-base text-er-ink/65 leading-relaxed mb-10">
            Ferramenta interna da agência ER Marketing para gestão
            programática de campanhas publicitárias no Meta Ads.
        </p>

        <LegalH2>Visão geral</LegalH2>
        <LegalP>
            O <strong>ER Ads Manager</strong> é uma aplicação de uso
            estritamente interno, operada pela equipe autorizada da{' '}
            <strong>ER Marketing</strong>, agência de marketing digital
            sediada em Manaus, Amazonas, Brasil. A ER Marketing
            gerencia campanhas publicitárias no Meta Ads (Facebook e
            Instagram) de mais de 50 contas de anunciantes — todos
            clientes ativos da agência que autorizaram explicitamente
            o acesso programático às respectivas contas.
        </LegalP>
        <LegalP>
            O aplicativo não está disponível para contratação por
            usuários finais nem possui qualquer mecanismo público de
            cadastro. Trata-se de uma ferramenta operacional usada
            internamente pela equipe da ER Marketing para acelerar
            tarefas recorrentes de gestão de campanhas.
        </LegalP>

        <LegalH2>O que o aplicativo faz</LegalH2>
        <LegalUL>
            <li>
                Consulta métricas e relatórios de desempenho das
                campanhas dos clientes (impressões, cliques, gasto,
                conversões, ROAS).
            </li>
            <li>
                Atualiza configurações de campanhas, conjuntos de
                anúncios e anúncios — orçamento, status, segmentação —
                mediante solicitação do cliente proprietário da conta.
            </li>
            <li>
                Cria, edita e organiza criativos publicitários nas
                contas autorizadas.
            </li>
            <li>
                Gerencia públicos personalizados (custom audiences) e
                listas de retargeting nas contas dos clientes.
            </li>
            <li>
                Gera relatórios automatizados que a equipe da ER
                Marketing entrega aos clientes.
            </li>
        </LegalUL>

        <LegalH2>O que o aplicativo NÃO faz</LegalH2>
        <LegalUL>
            <li>
                Não coleta dados pessoais de usuários finais do
                Facebook ou Instagram.
            </li>
            <li>
                Não acessa contas de Meta Ads que não tenham sido
                explicitamente autorizadas pelo respectivo
                proprietário.
            </li>
            <li>
                Não compartilha, vende, aluga ou cede dados a terceiros.
            </li>
            <li>
                Não possui interface pública nem cadastro aberto a
                usuários externos à equipe da ER Marketing.
            </li>
        </LegalUL>

        <LegalH2>Documentos legais</LegalH2>
        <LegalP>
            As políticas formais que regem o uso do aplicativo estão
            disponíveis nas páginas abaixo:
        </LegalP>
        <LegalUL>
            <li>
                <Link
                    to="/meta-app/privacidade"
                    className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                >
                    Política de Privacidade
                </Link>
            </li>
            <li>
                <Link
                    to="/meta-app/termos"
                    className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                >
                    Termos de Uso
                </Link>
            </li>
        </LegalUL>

        <LegalH2>Contato</LegalH2>
        <LegalP>
            Para dúvidas sobre o aplicativo, solicitações relacionadas
            à proteção de dados (LGPD) ou questões sobre a operação da
            ER Marketing, entre em contato por:
        </LegalP>
        <LegalUL>
            <li>
                E-mail:{' '}
                <a
                    href="mailto:contato@trafegomanaus.com.br"
                    className="text-er-red underline decoration-er-red/40 hover:decoration-er-red"
                >
                    contato@trafegomanaus.com.br
                </a>
            </li>
            <li>Operação responsável: ER Marketing, CNPJ 41.079.306/0001-62</li>
            <li>Endereço: Manaus, Amazonas, Brasil</li>
        </LegalUL>
    </MetaAppShell>
);

export default MetaAppIndex;
