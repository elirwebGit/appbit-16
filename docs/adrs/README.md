# 📋 Architecture Decision Records (ADRs)

Registro das decisões arquiteturais do projeto App BiT (B2G).

## O que é um ADR?

Um ADR documenta uma decisão técnica importante: **o que** foi decidido, **por quê**, e **qual o status** da decisão. Isso evita que a equipe refaça discussões já resolvidas.

## Índice

| # | Decisão | Status |
|---|---|---|
| [ADR-001](./ADR-001-arquitetura-hexagonal.md) | Arquitetura Hexagonal | ✅ Aceita |
| [ADR-002](./ADR-002-fastify.md) | Fastify como framework HTTP | ✅ Aceita |
| [ADR-003](./ADR-003-postgresql-postgis.md) | PostgreSQL + PostGIS | ✅ Aceita |
| [ADR-004](./ADR-004-react-native.md) | Aplicação mobile-first (React Native) | ✅ Aceita |
| [ADR-005](./ADR-005-ia-via-rag.md) | IA via RAG | ✅ Aceita |
| [ADR-006](./ADR-006-monorepo-structure.md) | Estrutura Monorepo | ✅ Aceita |
| [ADR-007](./ADR-007-frontend-stack.md) | Stack Frontend | ✅ Aceita |

## Template para novos ADRs

```markdown
# ADR-XXX — Título

**Data**: YYYY-MM-DD
**Status**: Proposta | Aceita | Substituída | Rejeitada
**Autor**: Nome

## Contexto

O que motivou essa decisão?

## Decisão

O que foi decidido?

## Motivação

Por que essa opção foi escolhida?

## Consequências

Quais os impactos positivos e negativos?
```
