# 🧪 Dados Mock — App BiT (B2G)

Dados mock para desenvolvimento do frontend sem depender do backend.

## Arquivos

| Arquivo | Endpoint | Descrição |
|---|---|---|
| `health.json` | `GET /health` | Status do servidor |
| `indicadores.json` | `GET /indicadores` | Lista de indicadores e regiões disponíveis |
| `mapa.json` | `GET /mapa` | Dados geográficos (10 regiões com lat/lng reais) |
| `dados-response.json` | `POST /dados` | 3 cenários de resposta da IA |

## Como usar no Frontend (React)

### Opção 1: Import direto (mais simples)

```typescript
// src/services/api.ts
import healthData from '../../data/mock/health.json';
import mapaData from '../../data/mock/mapa.json';
import indicadoresData from '../../data/mock/indicadores.json';
import dadosResponse from '../../data/mock/dados-response.json';

const USE_MOCK = true; // mudar para false quando o backend estiver pronto

export async function getMapa(regiao?: string) {
  if (USE_MOCK) {
    return mapaData;
  }
  const res = await fetch(`${API_URL}/mapa?regiao=${regiao}`);
  return res.json();
}
```

### Opção 2: Fetch local (simula chamada HTTP)

```typescript
// Em dev, servir os JSON via Vite public/
// Copie os arquivos mock para frontend/public/mock/

export async function getMapa(regiao?: string) {
  if (import.meta.env.DEV) {
    const res = await fetch('/mock/mapa.json');
    return res.json();
  }
  const res = await fetch(`${API_URL}/mapa?regiao=${regiao}`);
  return res.json();
}
```

### Quando trocar por dados reais?

Quando o Elir finalizar o backend, basta:
1. Mudar `USE_MOCK = false`
2. Ou remover o bloco `if (import.meta.env.DEV)`
3. Configurar `API_URL` no `.env` apontando para o backend real

## Dados Incluídos

### Regiões (10 pontos de dados)

| Região | UF | Rede | Empregabilidade | Saúde Mental |
|---|---|---|---|---|
| SP-Centro | SP | 5G | 0.78 | 0.82 |
| SP-ZonaSul | SP | 4G | 0.42 | 0.67 |
| SP-ZonaLeste | SP | 3G | 0.31 | 0.45 |
| RJ-Centro | RJ | 5G | 0.73 | 0.78 |
| RJ-ZonaNorte | RJ | 4G | 0.38 | 0.52 |
| RJ-ZonaOeste | RJ | 3G | 0.25 | 0.39 |
| MG-BH-Centro | MG | 4G | 0.55 | 0.61 |
| MG-Contagem | MG | 3G | 0.34 | 0.48 |
| BA-Salvador-Centro | BA | 4G | 0.47 | 0.58 |
| BA-Suburbio | BA | 2G | 0.19 | 0.28 |

### Padrão nos dados

Os dados simulam a **desigualdade centro-periferia**:
- 🟢 **Centros urbanos** → 5G, indicadores altos (0.70+)
- 🟡 **Zonas intermediárias** → 4G, indicadores médios (0.40-0.60)
- 🔴 **Periferias** → 2G/3G, indicadores baixos (0.19-0.40)

Isso cria um efeito visual claro no mapa de calor.
