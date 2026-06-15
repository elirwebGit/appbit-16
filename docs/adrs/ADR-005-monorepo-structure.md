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
appbit-b2g-equipe16/
├── frontend/     # React + Vite + TypeScript
├── backend/      # Fastify + Hexagonal
├── data/         # Datasets e scripts de seed
└── docs/         # Documentação + ADRs
```

## Consequências

### Positivas
- Simplicidade operacional
- Documentação sempre ao lado do código
- PRs podem incluir mudanças front + back + docs atomicamente

### Negativas
- CI/CD precisa ser configurado por pasta (não roda tudo em cada push)
- Repo pode ficar grande se datasets forem grandes (mitigar com `.gitignore` e Git LFS se necessário)
