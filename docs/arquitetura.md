# 🏗️ Arquitetura Técnica — App BiT (B2G)

## Visão Geral da Stack

```
┌─────────────────────────────────────────────────┐
│                    FRONTEND                     │
│         React 18 + TypeScript + Vite            │
│         Leaflet + React-Leaflet (mapas)         │
│         Lucide React (ícones)                   │
│         Deploy: --                          │
├─────────────────────────────────────────────────┤
│                     API                         │
│            Contratos JSON definidos             │
│            REST (POST /dados, GET /mapa, ...)   │
├─────────────────────────────────────────────────┤
│                    BACKEND                      │
│         Fastify (Node.js)                       │
│         Arquitetura Hexagonal                   │
│         Deploy: --                │
├─────────────────────────────────────────────────┤
│                  DADOS + IA                     │
│         PostgreSQL + PostGIS                    │
│         Gemini API (RAG)                        │
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
                    │     HTTP (Fastify)   │  ← Adaptador de entrada
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
    │  PostgreSQL +   │ │  Gemini API  │ │   Vísent    │
    │    PostGIS      │ │   (RAG)      │ │  CDRView    │
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
