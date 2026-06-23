# 📡 Aplicativo BiT — B2G (Business to Government)
### Painel de Dados Públicos — Vísent CDRView 🚀

Plataforma governamental de alta performance (*GovTech*) projetada para a visualização, monitoramento e análise de indicadores socioeconômicos e infraestrutura de telecomunicações na **Região Metropolitana de Florianópolis**.

Este projeto faz parte da iniciativa internacional em parceria com a **Angola Cables**, focado em transformar dados brutos de telecomunicações (arquivos CDR) em inteligência pública acionável.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema técnico foi selecionado para garantir a máxima leveza, velocidade de renderização e segurança de tipos em ambiente de produção:

* **React 18** — Biblioteca líder para construção de interfaces reativas e modulares.
* **Vite** — Ferramenta de build de última geração com *Hot Module Replacement* (HMR) ultrarrápido.
* **TypeScript** — Tipagem estática forte, atuando como um escudo blindado contra erros em tempo de execução.
* **Leaflet & React-Leaflet** — Motor de mapas interativos de alto desempenho para plotagem geoespacial.
* **Lucide React** — Conjunto de ícones minimalistas e modernos para navegação intuitiva.

---

## 🏗️ Arquitetura do Projeto (Clean Architecture)

O projeto segue um padrão rigoroso de organização de pastas (componentização isolada), garantindo manutenibilidade e escalabilidade à medida que novas features forem integradas:

```text
src/
├── assets/          # Arquivos estáticos (imagens, logotipos, estilos globais)
├── components/      # Componentes visuais isolados e reutilizáveis (Ex: MapaVisent)
├── hooks/           # Lógicas e estados customizados e compartilhados
├── services/        # Integrações com APIs, arquivos e processadores de dados
├── types/           # Contratos de dados e interfaces estáticas do TypeScript
└── App.tsx          # Estrutura principal do layout e ponto de entrada da aplicação
🗺️ Funcionalidades Implementadas (Marcos Tecnológicos)
Layout Administrativo B2G: Interface escura (Dark Mode) de alto impacto visual, menus laterais responsivos e seções dedicadas para Formações, Empregabilidade, Iniciativas Sociais e Saúde Mental.

Integração Geoespacial Avançada: Mapa totalmente interativo renderizado sobre a camada CartoDB Dark Matter, perfeitamente integrado ao design escuro do painel.

Simulação de Infraestrutura de Rede: Plotagem dinâmica de Estações Rádio Base (ERBs/Antenas) baseadas na estrutura real do dataset antenas_flp.csv. Cada ponto luminoso conta com um pop-up interativo detalhando:

ID Celular (ECGI)

Região / Cluster de Cobertura

Município

🚀 Como Executar o Projeto Localmente
Certifique-se de ter o Node.js instalado em sua máquina antes de prosseguir.

Clone o repositório:

Bash
git clone <LINK_DO_SEU_REPOSITORIO_AQUI>
Navegue até a pasta do projeto:

Bash
cd appbit-b2g
Instale as dependências do ecossistema:

Bash
npm install
Inicie o motor de desenvolvimento local (Vite):

Bash
npm run dev
Acesse no navegador:
Abra o link gerado no terminal (geralmente http://localhost:5173).

📋 Contrato de Tipagem (TypeScript Shield)
Abaixo está o modelo de dados estrito utilizado para garantir que nenhuma antena seja plotada com propriedades corrompidas ou ausentes:

TypeScript
export interface AntenaVisent {
  ecgi: string;       // Identificador único global da célula celular
  lat: number;        // Coordenada de Latitude geoespacial
  lon: number;        // Coordenada de Longitude geoespacial
  cluster: string;    // Zona geográfica / Cluster de cobertura
  municipio: string;  // Cidade de instalação da ERB
}