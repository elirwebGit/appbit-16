# ADR-004 — IA via RAG (Retrieval-Augmented Generation)

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Elir

## Contexto

O sistema precisa responder perguntas em linguagem natural sobre dados públicos. A IA precisa ser confiável, citar fontes, e não "alucinar" dados inexistentes.

## Decisão

Implementar consultas IA usando **Retrieval-Augmented Generation (RAG)**.

## Motivação

- **Respostas mais confiáveis**: A IA busca dados reais antes de gerar a resposta, em vez de inventar
- **Menor custo de tokens**: Enviamos apenas os dados relevantes para o LLM, não todo o dataset
- **Referência explícita aos datasets utilizados**: A resposta inclui quais fontes foram consultadas (Vísent CDRView, IBGE, etc.)

## Como funciona

```
Pergunta do usuário
        │
        ▼
┌───────────────┐
│  1. Retrieval │ ← Busca dados relevantes no PostgreSQL/PostGIS
└───────┬───────┘
        │ dados encontrados
        ▼
┌───────────────┐
│ 2. Augmented  │ ← Monta prompt com dados reais + pergunta
└───────┬───────┘
        │ prompt enriquecido
        ▼
┌───────────────┐
│ 3. Generation │ ← Gemini API gera resposta baseada nos dados
└───────────────┘
        │
        ▼
  Resposta + fontes citadas
```

## Consequências

### Positivas
- Respostas fundamentadas em dados reais
- Transparência (fontes citadas na resposta)
- Menor custo de API (tokens otimizados)

### Negativas
- Complexidade adicional no pipeline (retrieval + generation)
- Qualidade depende da qualidade da busca no banco
