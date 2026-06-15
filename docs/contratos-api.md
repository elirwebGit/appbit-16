# 🔌 Contratos de API — App BiT (B2G)

> **Por que isso é crítico**: Se definirmos o formato dos JSONs AGORA, o Frontend trabalha com dados mock enquanto o Backend constrói a API real. **Ninguém fica bloqueado esperando o outro.**

## Base URL

```
Desenvolvimento: http://localhost:3000/api
Produção: a definir Exemplo com Railway: (https://appbit-b2g.railway.app/api (TBD)) 
```

---

## `POST /dados` — Consulta com IA

Endpoint principal. Recebe uma pergunta em linguagem natural e retorna dados estruturados + resposta da IA.

### Request

```json
{
  "consulta": "Onde existe baixa conectividade e alta concentração de pessoas?",
  "filtros": {
    "regiao": "SP",
    "indicador": "empregabilidade"
  },
  "idioma": "pt"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `consulta` | string | ✅ | Pergunta em linguagem natural |
| `filtros.regiao` | string | ❌ | Filtro por UF ou região |
| `filtros.indicador` | string | ❌ | Filtro por tipo de indicador |
| `idioma` | string | ❌ | Idioma da resposta (default: `pt`) |

### Response

```json
{
  "resposta_ia": "Na região metropolitana de São Paulo, identificamos...",
  "dados": [
    {
      "regiao": "SP-ZonaSul",
      "indicador": "empregabilidade",
      "valor": 0.42,
      "concentracao_pessoas": 85000,
      "cobertura_rede": "4G",
      "fonte": "Vísent CDRView + IBGE"
    }
  ],
  "fontes": [
    { "nome": "Vísent CDRView", "url": "https://github.com/wongola-bit/appbit" },
    { "nome": "IBGE", "url": "https://ibge.gov.br" }
  ],
  "timestamp": "2026-06-11T12:00:00Z"
}
```

---

## `GET /mapa` — Dados Geográficos

Retorna dados para renderização do mapa de calor e marcadores com Leaflet.

### Request

```
GET /mapa?regiao=SP&indicador=empregabilidade
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `regiao` | string | ❌ | Filtro por UF ou região |
| `indicador` | string | ❌ | Filtro por indicador |

### Response

```json
{
  "tipo": "FeatureCollection",
  "regioes": [
    {
      "regiao": "SP-ZonaSul",
      "nome_exibicao": "São Paulo — Zona Sul",
      "lat": -23.65,
      "lng": -46.66,
      "concentracao_pessoas": 85000,
      "cobertura_rede": "4G",
      "qualidade_sinal": 0.72,
      "indicadores": {
        "empregabilidade": 0.42,
        "saude_mental": 0.67
      }
    }
  ]
}
```

---

## `GET /indicadores` — Lista de Indicadores

Retorna metadados dos indicadores disponíveis e regiões suportadas.

### Response

```json
{
  "indicadores": [
    {
      "id": "empregabilidade",
      "nome": "Empregabilidade",
      "descricao": "Taxa de emprego vs concentração de pessoas",
      "unidade": "percentual",
      "faixa": { "min": 0, "max": 1 }
    },
    {
      "id": "saude_mental",
      "nome": "Saúde Mental",
      "descricao": "Indicadores de saúde vs cobertura de rede",
      "unidade": "percentual",
      "faixa": { "min": 0, "max": 1 }
    }
  ],
  "regioes_disponiveis": [
    { "id": "SP", "nome": "São Paulo" },
    { "id": "RJ", "nome": "Rio de Janeiro" },
    { "id": "MG", "nome": "Minas Gerais" },
    { "id": "BA", "nome": "Bahia" }
  ]
}
```

---

## `GET /health` — Health Check

Verifica se o backend está no ar.

### Response

```json
{
  "status": "ok",
  "versao": "1.0.0"
}
```

---

## Códigos de Status HTTP

| Código | Significado |
|---|---|
| `200` | Sucesso |
| `400` | Request inválido (campos ausentes) |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |
