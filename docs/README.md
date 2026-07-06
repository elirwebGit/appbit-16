# 📚 Documentação — App BiT (B2G)

Documentação centralizada do projeto Painel de Dados Públicos — Equipe 16.

## Índice

| Documento | Descrição |
|---|---|
| [arquitetura.md](./arquitetura.md) | Arquitetura técnica, stack e diagramas |
| [contratos-api.md](./contratos-api.md) | Contratos de API (request/response) para integração Front ↔ Back |
| [ideias-projeto.md](./ideias-projeto.md) | Ideias, escopo MVP, análise de concorrentes e checklist |
| [adrs/](./adrs/) | Architecture Decision Records — decisões técnicas documentadas |

## Status Atual (Preparação para MVP)

- **Banco de Dados**: Estruturado localmente e sincronizado com PostgreSQL e Prisma ORM.
- **Back-end**: Refatorado para integrar o motor oficial da IA (Google Gemini API via SDK `@google/generative-ai`). Node.js com TypeScript.
- **Front-end**: Componente do mapa (`MapaVisent.tsx`) atualizado para consumir dados reais do banco, unificando as regiões do Brasil (Volta Redonda, Barra Mansa, RJ, SP e BH) e Angola (Luanda, Benguela e Huambo). Dados mockados antigos foram removidos. Interface com React (Vite) e Leaflet/React-Leaflet.
- **Deploy**: Planejado para implantação no Railway.

## Links Úteis

- **Dataset Vísent CDRView**: [github.com/wongola-bit/appbit](https://github.com/wongola-bit/appbit)
- **Hackathon App BiT**: nocountry.tech
- **Deadline**: 13/07/2026
