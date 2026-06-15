# ADR-003 — PostgreSQL + PostGIS

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Elir

## Contexto

O projeto precisa armazenar e consultar dados geoespaciais (coordenadas de ERBs, regiões, concentração de pessoas). Precisamos de um banco que suporte queries geográficas nativamente.

## Decisão

Utilizar **PostgreSQL** com a extensão **PostGIS** como banco de dados.

## Motivação

- **Consultas geográficas nativas**: `ST_Distance`, `ST_Contains`, `ST_Within` etc.
- **Cálculo de proximidade entre regiões e ERBs**: Essencial para cruzar dados do Vísent CDRView com cobertura de rede
- **Ideal para mapas**: Dados geográficos são a base do nosso mapa Leaflet

## Alternativas consideradas

| Banco | Prós | Contras |
|---|---|---|
| **SQLite** | Simples, sem servidor | Sem suporte geo nativo, limitado para produção |
| **MongoDB** | Flexível, suporte geo básico | Modelagem relacional é mais adequada para nossos dados |
| **PostgreSQL + PostGIS** ✅ | Geo nativo, maduro, performático | Mais complexo de configurar inicialmente |

## Consequências

### Positivas
- Queries geoespaciais poderosas sem bibliotecas externas
- Escalável para produção
- Suportado nativamente por Railway e Render

### Negativas
- Setup inicial mais complexo que SQLite
- Precisa de PostGIS habilitado no servidor de produção
