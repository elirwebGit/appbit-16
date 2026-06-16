# ADR-002 — Fastify

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Elir

## Contexto

Precisamos de um framework HTTP para o backend Node.js. As opções consideradas foram Express.js e Fastify.

## Decisão

Utilizar **Fastify** como framework HTTP do backend.

## Motivação

- **Melhor performance que Express**: Fastify é significativamente mais rápido em benchmarks
- **Tipagem forte**: Suporte nativo a TypeScript com schemas de validação
- **Menor consumo de recursos**: Importante para deploy em serviços gratuitos/baratos (Railway, Render)

## Alternativas consideradas

| Framework | Prós | Contras |
|---|---|---|
| **Express.js** | Maior ecossistema, mais tutoriais | Mais lento, sem validação nativa |
| **Fastify** ✅ | Mais rápido, tipagem, plugins | Ecossistema menor, curva de aprendizado |

## Consequências

### Positivas
- API mais performática
- Validação de schemas integrada (JSON Schema)
- Plugins oficiais para CORS, JWT, etc.

### Negativas
- Menos material didático disponível em português
- Alguns middlewares Express não são compatíveis diretamente
