export interface RegiaoMapa {
  regiao: string;
  nome_exibicao: string;
  lat: number;
  lng: number;
  concentracao_pessoas: number;
  cobertura_rede: string;
  qualidade_sinal: number;
  indicadores: {
    empregabilidade: number;
    saude_mental: number;
  };
}

export interface Mensagem {
  id: number;
  autor: 'usuario' | 'ia';
  texto: string;
}
