# ADR-005 — Estrutura Monorepo

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Pedro

## Contexto

A equipe de 5 pessoas precisa trabalhar em frontend e backend simultaneamente, com deadline curto (32 dias). Precisamos decidir entre monorepo (tudo num único repositório) ou repos separados.

## Decisão

Utilizar **monorepo** com diretórios separados: `/frontend`, `/backend`, `/docs`, `/data`.

## Motivação

- **Equipe pequena (5 pessoas)**: Um único repo simplifica o fluxo de trabalho
- **Contratos de API centralizados**: Frontend e backend sempre veem a mesma documentação
- **Facilidade de onboarding**: Clone único para ter acesso a tudo
- **Deploy separado**: Cada pasta pode ser deployada independentemente (Vercel para frontend, Railway para backend)

## Estrutura

```
appbit-16/
├── apps/
│   ├── api/          # Express 5.x + Hexagonal + Prisma (backend)
│   └── frontend/     # React + Vite + TypeScript (a ser adicionado)
├── docs/             # Documentação + ADRs + Contratos de API
└── package.json      # npm workspaces: gerencia apps/* como pacotes
```

> A estrutura usa **npm workspaces** (configurado no `package.json` raiz com `"workspaces": ["apps/*"]`), o que permite rodar `npm install` uma vez na raiz e gerenciar as dependências de toda a estrutura.

## Consequências

### Positivas
- Simplicidade operacional
- Documentação sempre ao lado do código
- PRs podem incluir mudanças front + back + docs atomicamente

### Negativas
- CI/CD precisa ser configurado por pasta (não roda tudo em cada push)
- Repo pode ficar grande se datasets forem grandes (mitigar com `.gitignore` e Git LFS se necessário)
