export class ResultadoAlgoritmoGenetico {
  constructor(
    public id: number,
    public fk_grade: number,
    public tamanho_populacao: number,
    public numero_geracoes_necessario: number,
    public tamanho_torneio: number,
    public taxa_cruzamento: number,
    public taxa_mutacao: number,
    public elitismo: boolean,
    public aptidao: number,
    public data_inicio: Date,
    public data_termino: Date,
    public tamanho_elitismo?: number,
  ){}

  static deserialize(data: any): ResultadoAlgoritmoGenetico {
    return new ResultadoAlgoritmoGenetico(
      data.id,
      data.fk_grade,
      data.tamanho_populacao,
      data.numero_geracoes_necessario,
      data.tamanho_torneio,
      data.taxa_cruzamento,
      data.taxa_mutacao,
      data.elitismo,
      data.aptidao,
      data.data_inicio,
      data.data_termino,
      data.tamanho_elitismo
    );
  }
}