# 🔌 Contratos de API Reais — App BiT (B2G)

> **Importante**: Este documento foi atualizado para refletir os endpoints reais implementados no backend baseado em Express.

## Base URL

```
Desenvolvimento: http://localhost:3000
Produção: a definir (ex: https://appbit-b2g.railway.app)
```

---

## 📡 Endpoints da API

---

### `GET /health` — Health Check

Verifica se o servidor backend está no ar e funcionando.

#### Response

```json
{
  "status": "ok",
  "service": "appbit-api"
}
```

---

### `GET /api/regions` — Lista de Regiões

Retorna todas as regiões cadastradas no sistema.

#### Response

```json
[
  {
    "id": "c6a1e359-5f21-4f10-911e-0a562efad56e",
    "name": "São Paulo — Zona Sul",
    "state": "SP",
    "createdAt": "2026-06-15T12:00:00.000Z"
  }
]
```

---

### `POST /api/regions/analysis` — Análise de Regiões com IA

Envia uma pergunta em linguagem natural sobre o cenário das regiões e recebe um diagnóstico gerado pelo Gemini integrado com os dados.

#### Request

```json
{
  "question": "Qual região deve receber prioridade de investimento em conectividade?"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `question` | string | ✅ | Pergunta ou instrução em linguagem natural |

#### Response

```json
{
  "success": true,
  "answer": "A região prioritária com base nos indicadores atuais é..."
}
```

---

### `GET /api/region/:id/indicators` — Indicadores de uma Região

Retorna os indicadores (como conectividade, taxa de desemprego, etc.) e detalhes da concentração de pessoas e cobertura de rede móvel por região.

#### Parâmetros de Rota

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | ✅ | UUID identificador da região |

#### Response

```json
[
  {
    "id": "e44d3209-e85d-4f01-9257-ec90cf582312",
    "regionId": "c6a1e359-5f21-4f10-911e-0a562efad56e",
    "indicator": "conectividade",
    "value": 0.72,
    "peopleConcentration": 85000,
    "networkCoverage": "4G",
    "source": "Vísent CDRView",
    "createdAt": "2026-06-15T12:00:00.000Z"
  }
]
```

---

### `POST /api/cross-region` — Análise Comparativa Regional

Compara duas regiões a nível de indicadores sociais e de rede, gerando uma análise de gap e insights com IA.

#### Request

```json
{
  "regionAId": "c6a1e359-5f21-4f10-911e-0a562efad56e",
  "regionBId": "09825b7b-2da6-4fa2-bf4f-e2213cd77ff5"
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `regionAId` | string (UUID) | ✅ | ID da primeira região |
| `regionBId` | string (UUID) | ✅ | ID da segunda região |

#### Response

```json
{
  "regions": {
    "A": "São Paulo — Zona Sul",
    "B": "São Paulo — Zona Norte"
  },
  "data": {
    "A": {
      "connectivity": 0.72,
      "employability": 0.85,
      "population": 85000
    },
    "B": {
      "connectivity": 0.42,
      "employability": 0.60,
      "population": 120000
    }
  },
  "comparison": {
    "employabilityGap": 0.25,
    "connectivityGap": 0.30,
    "populationPressureGap": -35000
  },
  "insight": "Comparando as duas regiões, percebe-se que a Região B possui maior pressão populacional e menor conectividade, indicando..."
}
```

---

### `GET /api/dashboard` — Dados Consolidados do Dashboard

Retorna as métricas de todas as regiões, destaca as regiões mais críticas em termos de risco (calculado através dos dados de empregabilidade e conectividade) e inclui um resumo executivo gerado pela IA.

#### Response

```json
{
  "regions": [
    {
      "region": "São Paulo — Zona Sul",
      "state": "SP",
      "metrics": {
        "employability": 0.85,
        "connectivity": 0.72,
        "population": 85000
      },
      "riskScore": 1.57
    }
  ],
  "criticalRegions": [
    {
      "region": "São Paulo — Zona Sul",
      "state": "SP",
      "metrics": {
        "employability": 0.85,
        "connectivity": 0.72,
        "population": 85000
      },
      "riskScore": 1.57
    }
  ],
  "insight": "Análise executiva gerada pela IA: O cenário atual indica uma disparidade...",
  "metadata": {
    "totalRegions": 1
  }
}
```

---

### `GET /api/analysis/history` — Histórico de Análises da IA

Retorna a lista de perguntas e respostas geradas pela IA e arquivadas no banco de dados.

#### Response

```json
[
  {
    "id": "a671239b-e85d-4f01-9257-ec90cf582312",
    "question": "Qual região deve receber prioridade de investimento?",
    "answer": "A região prioritária com base nos indicadores atuais é...",
    "sources": null,
    "createdAt": "2026-06-15T12:05:00.000Z"
  }
]
```

---

## Códigos de Status HTTP

| Código | Significado |
|---|---|
| `200` | Sucesso |
| `400` | Requisição inválida (parâmetros ou campos ausentes/incorretos) |
| `404` | Recurso não encontrado (ex: região inexistente) |
| `500` | Erro interno do servidor |
