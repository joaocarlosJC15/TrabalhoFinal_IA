import { Horario_AG } from "./horario_AG";

export class ResultadoAlgoritmoGenetico_AG {
  constructor(
    public readonly tamanho_populacao: number,
    public readonly numero_geracoes_necessario: number,
    public readonly tamanho_torneio: number,
    public readonly taxa_cruzamento: number,
    public readonly taxa_mutacao: number,
    public readonly elitismo: boolean,
    public readonly aptidao: number,
    public readonly data_inicio: Date,
    public readonly data_termino: Date,
    public readonly horarios: Horario_AG[],
    public readonly tamanho_elitismo?: number,
  ) {
    this.tamanho_populacao = tamanho_populacao;
    this.numero_geracoes_necessario = numero_geracoes_necessario;
    this.tamanho_torneio = tamanho_torneio;
    this.taxa_cruzamento = taxa_cruzamento;
    this.taxa_mutacao = taxa_mutacao;
    this.elitismo = elitismo;
    this.aptidao = aptidao;
    this.data_inicio = data_inicio;
    this.data_termino = data_termino;
    this.horarios = horarios;
    this.tamanho_elitismo = tamanho_elitismo;
  }
}