# ADR-001 — Arquitetura Hexagonal

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Elir

## Contexto

O backend precisa de uma arquitetura que permita evolução sem acoplamento entre regras de negócio e detalhes de infraestrutura (banco de dados, APIs externas, framework HTTP).

## Decisão

Utilizar **Arquitetura Hexagonal** (Ports & Adapters) no backend.

## Motivação

- **Separar domínio da infraestrutura**: Regras de negócio ficam isoladas de detalhes técnicos
- **Facilitar testes**: É possível testar o domínio sem precisar de banco ou servidor HTTP
- **Troca futura de banco ou IA**: Se precisarmos mudar de PostgreSQL para outro banco, ou de Gemini para outro LLM, basta trocar o adaptador sem mexer no core

## Consequências

### Positivas
- Código mais organizado e testável
- Facilita onboarding de novos devs
- Permite evolução incremental

### Negativas
- Curva de aprendizado inicial para quem não conhece o padrão
- Mais arquivos e pastas (boilerplate inicial)
