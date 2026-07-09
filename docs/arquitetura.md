# 🏗️ Arquitetura Técnica — App BiT (B2G)

## Visão Geral da Stack e Ecossistema Técnico

- **Banco de Dados**: PostgreSQL (estruturado localmente e sincronizado)
- **ORM (Modelagem do Banco)**: Prisma
- **Back-end**: Node.js com TypeScript e arquitetura hexagonal
- **Inteligência Artificial**: Google Gemini API (SDK `@google/generative-ai`)
- **Front-end**: React (Vite) e Leaflet / React-Leaflet para renderização do mapa interativo unificando dados reais de regiões do Brasil e Angola.
- **Deploy**: Railway (Planejado)

```text
┌─────────────────────────────────────────────────┐
│                    FRONTEND                     │
│         React 18 + TypeScript + Vite            │
│         Leaflet + React-Leaflet (mapas)         │
│         Lucide React (ícones)                   │
│         Deploy: Railway (Planejado)             │
├─────────────────────────────────────────────────┤
│                     API                         │
│            Contratos JSON definidos             │
│            REST (POST /dados, GET /mapa, ...)   │
├─────────────────────────────────────────────────┤
│                    BACKEND                      │
│         Node.js com TypeScript                  │
│         Arquitetura Hexagonal                   │
│         Deploy: Railway (Planejado)             │
├─────────────────────────────────────────────────┤
│                  DADOS + IA                     │
│         PostgreSQL + Prisma ORM                 │
│         Google Gemini API (SDK oficial)         │
│         Dataset: Vísent CDRView                 │
├─────────────────────────────────────────────────┤
│                    INFRA                        │
│         GitHub (monorepo: /frontend /backend)   │
│         Git Flow simplificado                   │
│         CI: GitHub Actions (se der tempo)       │
└─────────────────────────────────────────────────┘
```

## Arquitetura Hexagonal (Backend)

```
                    ┌─────────────────────┐
                    │     HTTP (Express)   │  ← Adaptador de entrada
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Application Layer │  ← Casos de uso
                    │   (Use Cases)       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    Domain Layer     │  ← Entidades + Ports
                    │   (Core Business)   │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐ ┌──────▼───────┐ ┌──────▼──────┐
    │  PostgreSQL +   │ │ Google Gemini│ │   Vísent    │
    │   Prisma ORM    │ │     API      │ │  CDRView    │
    └────────────────┘ └──────────────┘ └─────────────┘
         Adaptadores de saída (Infrastructure)
```

## Fluxo do Usuário

```
Gestor Público acessa o Painel
         │
         ▼
   ┌─────────────┐
   │  Dashboard   │ ← Visão geral com indicadores e gráficos
   │  (Tela 1)    │
   └──────┬──────┘
          │ clica em "Consultar IA"
          ▼
   ┌─────────────┐
   │ Consulta IA  │ ← Digita pergunta em linguagem natural
   │  (Tela 2)    │    Ex: "Onde há baixa conectividade?"
   └──────┬──────┘
          │ sistema processa com Gemini + dados
          ▼
   ┌─────────────┐
   │   Resposta   │ ← Texto + dados + fontes citadas
   │  + Mapa      │ ← Mapa Leaflet com markers/heatmap
   │  (Tela 3)    │
   └─────────────┘
```

## Modelo de Dados (Prisma Schema)

O banco de dados relacional foi modelado para suportar o cruzamento de dados geográficos, indicadores e o histórico da IA. As tabelas são gerenciadas via Prisma ORM:

- **Region**: Entidade central (nome, estado, país, latitude, longitude). Representa as áreas analisadas (ex: Volta Redonda, Luanda, etc.).
- **RegionIndicator**: Armazena as métricas (ex: conectividade), concentração de pessoas (`peopleConcentration`) e cobertura de rede (`networkCoverage`), vindas do dataset Vísent CDRView.
- **Employment** e **Formation**: Indicadores complementares (empregabilidade, taxa de desemprego e formações) mapeados por região.
- **AIAnalysis**: Tabela de auditoria e histórico para salvar as perguntas feitas ao Gemini e as respostas geradas.

## Regras de Git

```
Branch principal: main (protegida)
Branches de trabalho: feature/nome-da-feature

Exemplos:
  feature/dashboard-layout
  feature/api-dados
  feature/mapa-leaflet
  feature/gemini-integration

Fluxo:
  1. Cria branch a partir de main
  2. Trabalha na branch
  3. Abre Pull Request
  4. Pelo menos 1 pessoa revisa
  5. Merge em main

⚠️ NUNCA commit direto na main
```

## ADRs (Architecture Decision Records)

Ver pasta [adrs/](./adrs/) para todas as decisões arquiteturais documentadas.
