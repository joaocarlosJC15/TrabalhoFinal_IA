export interface GerarHorario {
  tamanhoPopulacao: number;
  numeroGeracoes: number;
  tamanhoTorneio: number;
  taxaCruzamento: number;
  taxaMutacao: number;
  elitismo: boolean;
  tamanhoElitismo?: number;
}