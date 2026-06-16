# ADR-006 — Stack Frontend

**Data**: 2026-06-12
**Status**: ✅ Aceita
**Autor**: Equipe

## Contexto

Precisamos definir a stack do frontend para o MVP. A interface precisa renderizar mapas interativos, gráficos de indicadores e um campo de consulta IA com respostas em tempo real.

## Decisão

Utilizar a seguinte stack frontend:

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **React** | 18.x | Biblioteca para interfaces reativas e modulares |
| **Vite** | 6.x | Build de última geração com Hot Module Replacement ultrarrápido |
| **TypeScript** | 5.x | Tipagem estática forte contra erros em runtime |
| **Leaflet + React-Leaflet** | — | Motor de mapas interativos para plotagem geoespacial |
| **Lucide React** | — | Ícones minimalistas e modernos para navegação intuitiva |

## Motivação

- **React 18**: Biblioteca líder de mercado, maior ecossistema, facilidade de encontrar soluções
- **Vite**: Significativamente mais rápido que Create React App ou Webpack para desenvolvimento
- **TypeScript**: Escudo contra erros em tempo de execução, essencial num time de 4 pessoas
- **Leaflet**: Leve, open-source, ideal para mapas interativos sem custo de licenciamento (vs Google Maps)
- **Lucide**: Consistência visual com ícones modernos e leves

## Consequências

### Positivas
- DX (Developer Experience) excelente com Vite + TypeScript
- Mapas interativos sem custo de API (Leaflet é free)
- Ecossistema React maduro com soluções para tudo

### Negativas
- TypeScript adiciona complexidade para quem não tem experiência
- Leaflet tem menos features que Google Maps (mas suficiente para o MVP)
