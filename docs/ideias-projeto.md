# 💡 Ideias Para o Projeto — App BiT (B2G)

> Documento centralizado com ideias, escopo MVP, análise de concorrentes e checklist de entrega.
> Atualizado continuamente pela equipe.

---

## 1. Contexto do Hackathon

| | Detalhe |
|---|---|
| **Deadline** | **13/07/2026** |
| **Formato final** | Demo Day — protótipo funcional + vídeo demo + documentação |
| **ODS alinhados** | ODS 4 (Educação de Qualidade) e ODS 8 (Trabalho Decente) |
| **Track** | B2G — Painel de Dados Públicos |
| **Descrição** | Web app responsivo com IA para gestores públicos |

### Legislação Relevante
- **Lei de Governo Digital** (Lei 14.129/2021) — digitalização de serviços públicos
- **LGPD** — proteção de dados pessoais (atenção com dados de CDR)

---

## 2. O Problema que Resolvemos, Público-Alvo e Objetivo

### 2.1. Objetivo do Projeto
O principal objetivo do projeto é desenvolver um **Web App Responsivo (PWA)** integrada com um **agente de Inteligência Artificial (Gemini)**. A solução consolida dados públicos e os enriquece com o dataset **Vísent CDRView** (concentração de pessoas e cobertura de rede móvel por região).
Ao responder a consultas feitas em linguagem natural, o sistema auxilia gestores públicos a identificar lacunas de conectividade, emprego, saúde mental e programas sociais, transformando dados brutos em decisões assertivas de inclusão digital e equidade social.

---

### 2.2. Público-Alvo
- **Gestores Públicos**: Secretários, prefeitos e diretores de pastas sociais ou de tecnologia de governos municipais, estaduais ou nacionais.
- **Analistas de Políticas Sociais**: Profissionais responsáveis pelo planejamento técnico, monitoramento de indicadores e alocação de recursos públicos.
- **Pesquisadores e Acadêmicos**: Entidades que estudam a desigualdade social, o desemprego e o impacto da exclusão digital nas comunidades.
- **Organismos Governamentais e ONGs**: Parceiros institucionais que precisam de relatórios concisos e visualizações geográficas para validar seus programas de desenvolvimento e suporte social.

---

### 2.3. Dores do Usuário
1. **Dados Públicos Dispersos**: Dificuldade extrema em cruzar informações vindas de diferentes fontes federais, estaduais e municipais.
2. **Ausência de Visualização Geográfica Integrada**: Falta de mapas de calor que mostrem visualmente onde as desigualdades sociais e a falta de cobertura de rede se concentram.
3. **Barreira de Acesso Técnico**: Ferramentas tradicionais exigem consultas técnicas e complexas (SQL, dashboards avançados), criando dependência de equipes de TI.
4. **Tomada de Decisão Intuitiva**: Ausência de relatórios automáticos fáceis de interpretar, levando à formulação de políticas com base em intuição e não em dados concretos.
5. **Falta de Infraestrutura Invisível**: Iniciar programas sociais remotos (como consultas virtuais de saúde mental) sem saber previamente se a população local possui conectividade mínima à internet para usufruir do serviço.

---

### 2.4. Plataforma e Acessibilidade
A solução será desenvolvida como uma **Web App Responsiva (PWA)**:
- **Acessibilidade Cross-device**: Funciona com a mesma eficiência no celular do gestor em campo ou no monitor desktop do analista de gabinete.
- **Leveza e Desempenho**: Interface responsiva de rápida renderização de mapas interativos (via Leaflet.js) e gráficos intuitivos.
- **Arquitetura Desacoplada**: Integração fluida entre Frontend (React + Vite) e Backend (Fastify) por meio de contratos de API rígidos e seguros.

---

### 2.5. Análise de Concorrentes e Diferenciais

| Tipo de Solução / Concorrente | Limitações | Nosso Diferencial |
|:---|:---|:---|
| **Painéis Governamentais Tradicionais** *(Datasus, IBGE Cidades, etc.)* | Dados estáticos, isolados por silos e interfaces pouco intuitivas. | Cruzamento inteligente de dados com o dataset Vísent CDRView. |
| **Dashboards de BI Corporativos** *(Power BI, Tableau, Qlik)* | Licenciamento caro, exigem treinamento técnico e desenvolvimento sob demanda. | Foco total na experiência de uso com respostas em linguagem natural. |
| **Plataformas de Geo-Analytics Complexas** *(ArcGIS, Google Earth Engine)* | Curva de aprendizado muito íngreme e foco em especialistas geográficos. | Interface simples baseada em linguagem natural e mapas focados em decisão rápida. |

#### O Grande Diferencial: *AI Natural Query*
Em vez de manipular filtros complexos ou construir relatórios de forma manual que levam dias, o gestor simplesmente pergunta: *"Onde existe baixa conectividade e alta concentração de pessoas na região metropolitana de SP?"* e a IA retorna o mapa com o diagnóstico instantaneamente.

---

## 3. Escopo MVP — Onde Concentrar Esforços

### MVP (o que ENTREGAMOS)

| # | Funcionalidade | Prioridade | Justificativa |
|---|---|:---:|---|
| 1 | **Dashboard de Indicadores** | 🔴 Essencial | Tela principal — primeira impressão nos jurados |
| 2 | **Consulta IA em Linguagem Natural** | 🔴 Essencial | Diferencial do produto — o "wow factor" |
| 3 | **Mapa Interativo** | 🟡 Alta | Visualização geográfica dos dados — impacto visual |

### Áreas de Dados do MVP

| Área | Status | Por quê |
|---|:---:|---|
| **Empregabilidade** | ✅ MVP | Mais alinhado com dados do Vísent CDRView (concentração de pessoas × cobertura de rede) |
| **Saúde Mental** | ✅ MVP | Requisito explícito do desafio original |
| Formações | ⏳ Futuro | Mencionamos como visão na apresentação |
| Experiências | ⏳ Futuro | Mencionamos como visão na apresentação |
| Mentorias | ⏳ Futuro | Mencionamos como visão na apresentação |

### O que NÃO fazemos (por agora)

- ❌ Autenticação complexa (login simples ou sem login para MVP)
- ❌ Dashboard de admin
- ❌ Múltiplos idiomas (só português)
- ❌ Pipeline de dados em tempo real (usamos dados estáticos/semi-estáticos)

Podemos mudar, mas se concordarem com esse foco. Qualquer funcionalidade nova anotamos na lista de 'Visão Futura' para a apresentação. Vamos fechar o MVP primeiro.

---

## 4. Arquitetura Técnica

Ver [arquitetura.md](./arquitetura.md) e [contratos-api.md](./contratos-api.md) para detalhes completos.

---

## 5. Processos e Comunicação

### Cronograma

```
Semana 1 (11-15/jun) ▓▓▓▓░░░░░░ SETUP + FUNDAÇÃO
Semana 2 (16-22/jun) ░░▓▓▓▓▓▓░░ CONSTRUÇÃO CORE
Semana 3 (23-29/jun) ░░░░▓▓▓▓▓▓ INTEGRAÇÃO + IA
Semana 4 (30/jun-06/jul) ░░░░░░▓▓▓▓ POLISH + TESTES
Buffer  (07-11/jul)  ░░░░░░░░▓▓ ENTREGA FINAL
Deadline: 13/07 🏁
```

### Rituais

#### 📱 Daily Async — Todo dia no Discord

```
Formato: Cada pessoa posta 3 frases ou entramos em Reunião:

1. ✅ Ontem eu fiz: [...]
2. 🎯 Hoje vou fazer: [...]
3. 🚧 Estou travado em: [...] (ou "nada")
```

#### 📞 Sync Semanal — 2x/semana (Segunda e sexta-feira)

```
Agenda fixa:
1. 🎥 Demo: cada um mostra o que fez, ou ideia.
2. 🚧 Bloqueios: alguém travado?
3. 📋 Próxima semana: quem faz o quê
```

#### 🏁 Review Final — 2 dias antes do deadline (11/07)

```
Checklist:
1. ✅ App rodando em produção?
2. ✅ Vídeo demo gravado e editado?
3. ✅ Documentação + README prontos?
4. ✅ Testado em mobile?
5. ✅ Todos os links funcionando?
```

---

## 6. Checklist de Entrega Final

### Produto
- [ ] App web rodando em URL pública
- [ ] Dashboard com indicadores visuais
- [ ] Consulta IA funcionando (linguagem natural → resposta)
- [ ] Mapa interativo com dados geográficos
- [ ] Responsivo (funciona em mobile)
- [ ] Dados de Empregabilidade e Saúde Mental

### Documentação
- [ ] README.md completo no GitHub
- [ ] Descrição do problema e solução
- [ ] Instruções de instalação e execução
- [ ] Arquitetura técnica documentada
- [ ] Tecnologias utilizadas
- [ ] Membros da equipe

### Apresentação
- [ ] Vídeo Demo (3-5 min)
- [ ] Slides de apresentação
- [ ] Link do deploy
- [ ] Link do repositório GitHub

### Qualidade
- [ ] Sem erros de console no navegador
- [ ] API retornando dados sem erro
- [ ] Testado em Chrome + Mobile
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente configuradas
