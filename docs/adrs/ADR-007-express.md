# ADR-007 — Framework HTTP: Express (Revisado)

**Data**: 2026-06-15
**Status**: ✅ Aceita (substitui ADR-002-fastify.md)
**Autor**: Elir (decisão no Discord, 15/06/2026)

## Contexto

A decisão original (ADR-002-fastify.md) escolheu Fastify por performance. Durante a execução, o Elir identificou que a curva de aprendizado do Fastify seria um obstáculo para um time em diferentes níveis de experiência. A decisão foi revisada para priorizar **velocidade de desenvolvimento** sobre performance bruta.

## Decisão

Utilizar **Express 5.x** como framework HTTP do backend.

## Motivação

- **Curva de aprendizado rápida**: Express é o framework Node.js mais documentado do mundo
- **Ecossistema maduro**: Qualquer problema que surgir já tem solução no Stack Overflow
- **Ideal para hackathon**: O objetivo é entregar rápido com qualidade — não otimizar performance prematuramente
- **O time já domina**: Facilita onboarding de todos os membros

## Alternativas consideradas

| Framework | Prós | Contras | Decisão |
|---|---|---|---|
| **Express.js** ✅ | Ecossistema gigante, fácil aprendizado | Menos performático | **Escolhido** |
| **Fastify** | Mais rápido, tipagem nativa | Curva de aprendizado, menos material PT | Descartado |

## Consequências

### Positivas
- Qualquer membro do time consegue contribuir no backend
- Muito mais material de referência disponível em português
- Middleware simples e previsível (`app.use()`, `router.get()`, etc.)

### Negativas
- Performance ligeiramente inferior ao Fastify
- Validação de schemas precisa de biblioteca externa (ex: Zod ou Joi)

## Nota sobre o código do Elir

O Elir já subiu a base com Express 5.x + Swagger + Prisma + tsyringe na branch `develop` do repositório `appbit-16`. A estrutura segue arquitetura hexagonal limpa.
