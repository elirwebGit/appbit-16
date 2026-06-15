# 🏗️ Arquitetura Técnica — App BiT (B2G)

## Visão Geral da Stack

```
┌─────────────────────────────────────────────────┐
│                    FRONTEND                     │
│         React 18 + TypeScript + Vite            │
│         Leaflet + React-Leaflet (mapas)         │
│         Lucide React (ícones)                   │
│         Deploy: Vercel (a definir)              │
├─────────────────────────────────────────────────┤
│                     API                         │
│            Contratos JSON definidos             │
│            REST (POST /dados, GET /mapa, ...)   │
├─────────────────────────────────────────────────┤
│                    BACKEND                      │
│         Express 5.x (Node.js)                   │
│         Arquitetura Hexagonal                   │
│         Prisma ORM (acesso ao banco)            │
│         Deploy: Railway (a definir)             │
├─────────────────────────────────────────────────┤
│                  DADOS + IA                     │
│         PostgreSQL + PostGIS (via Docker)       │
│         Gemini API (RAG)                        │
│         Dataset: Vísent CDRView                 │
├─────────────────────────────────────────────────┤
│                    INFRA                        │
│         GitHub (monorepo: npm workspaces)       │
│         Estrutura: apps/api + apps/frontend     │
│         Git Flow: main → develop → feature/*    │
│         CI: GitHub Actions (se der tempo)       │
└─────────────────────────────────────────────────┘
```

## Arquitetura Hexagonal (Backend)

O backend foi estruturado pelo Elir seguindo o padrão **Ports & Adapters** (Hexagonal Architecture). A ideia central é manter as regras de negócio completamente isoladas dos detalhes técnicos (banco, HTTP, IA).

```
                    ┌─────────────────────┐
                    │   HTTP (Express)    │  ← Adaptador de entrada
                    │   Swagger UI /docs  │  ← Documentação interativa
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Application Layer │  ← Casos de uso
                    │   (Use Cases)       │    Ex: GetRegionsUseCase
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    Domain Layer     │  ← Entidades + Ports (interfaces)
                    │   (Core Business)   │    Ex: Region, Employment, IRegionRepository
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼──────┐ ┌──────▼───────┐ ┌──────▼──────┐
    │  PostgreSQL +   │ │  Gemini API  │ │   Vísent    │
    │    PostGIS      │ │   (RAG)      │ │  CDRView    │
    │  (via Prisma)   │ │             │ │  (seed.ts)  │
    └────────────────┘ └──────────────┘ └─────────────┘
         Adaptadores de saída (Infrastructure)
```

### Estrutura de Pastas do Backend

```
apps/api/
├── src/
│   ├── adapters/           # Entrada/Saída HTTP
│   │   ├── controllers/    # Recebem req e delegam para use cases
│   │   └── routes/         # Define as rotas Express + Swagger JSDoc
│   ├── application/
│   │   └── useCases/       # Lógica da aplicação (ex: GetRegionsUseCase)
│   ├── domain/
│   │   ├── entities/       # Tipos de dados do negócio (Region, Employment...)
│   │   └── repositories/   # Interfaces (contratos de acesso a dados)
│   ├── infrastructure/
│   │   ├── repositories/   # Implementações (Prisma, InMemory para mocks)
│   │   └── prisma/         # Cliente do Prisma
│   └── main/
│       ├── app.ts          # Configuração do Express + rotas + Swagger
│       ├── server.ts       # Ponto de entrada — inicia o servidor
│       └── swagger.ts      # Configuração do Swagger UI
├── prisma/
│   └── schema.prisma       # Modelos do banco (Region, Employment, Formation...)
├── data/
│   └── mock/               # JSONs para desenvolvimento sem banco
│       ├── health.json
│       ├── indicadores.json
│       ├── mapa.json
│       └── dados-response.json
└── package.json
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
          │ sistema busca dados → monta prompt → chama Gemini
          ▼
   ┌─────────────┐
   │   Resposta   │ ← Texto + dados + fontes citadas
   │  + Mapa      │ ← Mapa Leaflet com markers/heatmap
   │  (Tela 3)    │
   └─────────────┘
```

## Regras de Git

```
Branch principal: main (protegida — só recebe merges de develop)
Branch de integração: develop (branch de trabalho do time)
Branches de feature: feature/nome-da-feature

Exemplos de branches:
  feature/dashboard-layout
  feature/api-dados
  feature/mapa-leaflet
  feature/gemini-integration

Fluxo:
  1. Cria branch a partir de develop (NÃO de main)
  2. Trabalha na branch
  3. Abre Pull Request para develop
  4. Pelo menos 1 pessoa revisa
  5. Merge em develop
  6. Develop → main apenas em milestones (deploy)

⚠️ NUNCA commit direto na main ou develop
```

## ADRs (Architecture Decision Records)

Ver pasta [adrs/](./adrs/) para todas as decisões arquiteturais documentadas.

| ADR | Decisão | Status |
|---|---|---|
| ADR-001 | Arquitetura Hexagonal no backend | ✅ Aceita |
| ADR-002 | Express 5.x (substituiu Fastify) | ✅ Aceita |
| ADR-003 | PostgreSQL + PostGIS | ✅ Aceita |
| ADR-004 | IA via RAG com Gemini API | ✅ Aceita |
| ADR-005 | Monorepo com npm workspaces | ✅ Aceita |
| ADR-006 | Stack Frontend (React + Vite + TS) | ✅ Aceita |
