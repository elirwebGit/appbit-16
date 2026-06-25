# ADR-008 — Estratégia de PWA e Offline-First

**Data**: 2026-06-16
**Status**: ✅ Aceita
**Autor**: Equipe

## Contexto

O MVP do App BiT - B2G será utilizado por gestores públicos que muitas vezes acessam os dados em trânsito ou em regiões com conectividade instável. Além disso, queremos oferecer uma experiência próxima de um aplicativo nativo (instalável na tela inicial) sem os custos e prazos de desenvolver para as lojas de aplicativos (App Store / Google Play). Precisamos garantir que a aplicação não quebre caso a rede falhe e que forneça os dados já carregados do cache.

## Decisão

Adotamos a implementação de um **Progressive Web App (PWA)** utilizando o `vite-plugin-pwa` em conjunto com as estratégias de runtime caching do **Workbox**.

A arquitetura escolhida foi a injeção do Service Worker gerado automaticamente (`generateSW`), configurado com as seguintes regras de cache:
- **`NetworkFirst`** para chamadas da `/api` (Tenta buscar dados atualizados, em caso de falha da rede, entrega os últimos dados cacheados por até 7 dias).
- **`CacheFirst`** para tiles do mapa (Leaflet) e imagens estáticas (Carrega rapidamente os tiles mapeados do cache local por até 30 dias para poupar pacote de dados e carregamento).
- Opt-in e alertas em tempo real ao usuário sobre estado offline via React hook (`useOnlineStatus`).

## Motivação

- O `vite-plugin-pwa` encapsula perfeitamente a complexidade do Workbox sem necessidade de ejetar configurações ou criar arquivos complexos como era exigido no antigo Create React App.
- Gerenciamento limpo e automatizado do manifesto (`manifest.webmanifest`) via arquivo `vite.config.ts`.
- Permite instalar a aplicação imediatamente como um app em iOS, Android e Desktops.
- A experiência do usuário (UX) é aprimorada com alertas amigáveis (`OfflineBanner`) e sem o comportamento abrupto de falha de conexão padrão dos navegadores.

## Consequências

### Positivas
- Entrega rápida de um app "instalável" para o MVP do hackathon.
- Resiliência contra quedas de internet.
- Navegação extremamente rápida na reabertura do painel por causa do cache pré-carregado.
- Setup simples para a equipe e sem interferência na base de código do backend.

### Negativas
- Em modo de desenvolvimento (`vite dev`), o Service Worker não é ativado por padrão, sendo necessário fazer o build (`npm run build && npm run preview`) para testar comportamentos específicos de cache, adicionando uma pequena fricção na hora de testar cenários de PWA.
