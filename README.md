# 🗺️ Painel de Dados Públicos — App BiT (B2G) | Equipe 16

> Ferramenta de decisão estratégica para gestores públicos, que cruza dados de conectividade (Vísent CDRView) com indicadores sociais de **empregabilidade** e **saúde mental** por região — respondendo perguntas em linguagem natural com IA.

---

## 🎯 O Problema

Gestores públicos não têm acesso fácil a dados cruzados de mobilidade, emprego e saúde mental por região para embasar políticas de inclusão social.

Nossa solução: uma **PWA (Web App Responsiva)** com agente de IA que responde perguntas como:

- _"Onde há alta concentração de pessoas com baixo sinal de rede?"_
- _"Quais regiões têm piores índices de saúde mental e sem viabilidade de teleatendimento?"_

---

## 🛠️ Stack Tecnológica

| Camada             | Tecnologia                                        |
| ------------------ | ------------------------------------------------- |
| **Frontend**       | React 18 + TypeScript + Vite + Leaflet.js         |
| **Backend**        | Express 5.x + Node.js (Arquitetura Hexagonal)     |
| **Banco de Dados** | PostgreSQL + PostGIS (via Docker) + Prisma ORM    |
| **IA**             | Gemini API (RAG — Retrieval-Augmented Generation) |
| **Dataset Base**   | Vísent CDRView                                    |
| **Deploy**         | Railway (API) + Vercel (Frontend)                 |

---

## 📁 Estrutura do Repositório

```
appbit-16/
├── apps/
│   ├── api/              # Backend — Express + Hexagonal + Prisma
│   │   ├── src/
│   │   │   ├── adapters/ # Rotas e controllers HTTP
│   │   │   ├── application/useCases/ # Lógica da aplicação
│   │   │   ├── domain/   # Entidades e interfaces do negócio
│   │   │   └── infrastructure/ # Prisma, repos, IA
│   │   ├── data/mock/    # JSONs para desenvolvimento sem banco
│   │   └── prisma/       # Schema do banco de dados
│   └── frontend/         # (em construção — React + Vite)
├── docs/
│   ├── arquitetura.md    # Visão técnica completa
│   ├── contratos-api.md  # Formato dos endpoints REST
│   └── adrs/             # Decisões arquiteturais registradas
└── docker-compose.yml    # Banco PostgreSQL local
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- Docker (para o banco PostgreSQL)
- Git

### 1. Clone o repositório e instale dependências

```bash
git clone https://github.com/elirwebGit/appbit-16.git
cd appbit-16
git checkout develop
npm install
```

### 2. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 3. Configure as variáveis de ambiente

```bash
cd apps/api
cp .env.example .env
# Preencha DATABASE_URL e GEMINI_API_KEY no arquivo .env
```

### 4. Rode as migrations do banco

```bash
cd apps/api
npx prisma migrate dev
```

### 5. Rode o Seed no Banco de Dados

```bash
cd apps/api
npx ts-node prisma/seed.ts
```

### 6. Inicie o servidor de desenvolvimento

```bash
cd apps/api
npm run dev
```

O servidor estará disponível em `http://localhost:3000`
A documentação Swagger estará em `http://localhost:3000/docs`

---

## 📡 Endpoints da API

| Método | Rota               | Descrição                            |
| ------ | ------------------ | ------------------------------------ |
| `GET`  | `/health`          | Health check do servidor             |
| `GET`  | `/api/regions`     | Lista todas as regiões               |
| `GET`  | `/api/mapa`        | Dados geoespaciais para o mapa       |
| `GET`  | `/api/indicadores` | Indicadores disponíveis              |
| `POST` | `/api/dados`       | Consulta com IA em linguagem natural |

Ver detalhes em [`docs/contratos-api.md`](./docs/contratos-api.md)

---

## 👥 Equipe 16

| Pessoa         | Papel                     |
| -------------- | ------------------------- |
| **Atiquilson** | PM — Product Manager      |
| **Elir**       | Backend + Arquitetura     |
| **Sergio**     | Frontend                  |
| **Giorgia**    | UX/UI                     |
| **Pedro**      | Fullstack + Integração IA |

---

## 📄 Documentação

- [Arquitetura Técnica](./docs/arquitetura.md)
- [Contratos de API](./docs/contratos-api.md)
- [Decisões Arquiteturais (ADRs)](./docs/adrs/)
