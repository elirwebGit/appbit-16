# 📊 Data — App BiT (B2G)

Diretório para datasets, dados mock e scripts de seed.

## Dataset Principal: Vísent CDRView

O dataset CDRView contém dados de **concentração de pessoas por zona** combinados com **cobertura de antenas de rede** (5G/4G/3G) usando coordenadas reais da Anatel.

- **Repositório oficial**: [github.com/wongola-bit/appbit](https://github.com/wongola-bit/appbit)
- **Conteúdo**: README e dicionário de colunas

### Perguntas-chave que o dataset responde

1. Onde há **concentração de pessoas** mas **cobertura de rede precária**?
2. Quais regiões têm **alta concentração** em horário de trabalho mas **baixo emprego formal**?
3. Onde falta **infraestrutura digital** antes da chegada de programas sociais?

## Fontes Públicas Complementares

| Fonte | Dados | URL |
|---|---|---|
| **IBGE** | Censo, indicadores socioeconômicos | ibge.gov.br |
| **DATASUS** | Indicadores de saúde pública | datasus.saude.gov.br |
| **Anatel** | Cobertura de rede e ERBs | anatel.gov.br |
| **OMS** | Indicadores globais de saúde mental | who.int |

## Estrutura (planejada)

```
data/
├── README.md
├── raw/              # Datasets originais (CSV, JSON)
├── processed/        # Dados limpos e transformados
├── mock/             # Dados mock para desenvolvimento
└── scripts/          # Scripts de ETL e seed
```
