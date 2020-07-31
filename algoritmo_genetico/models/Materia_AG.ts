export class Materia_AG {
  constructor(
    public readonly id: number,
    public readonly quantidade_aulas: number,
    public readonly id_periodo: number,
    public readonly id_professor: number
  ) {
    this.id = id;
    this.quantidade_aulas = quantidade_aulas;
    this.id_periodo = id_periodo;
    this.id_professor = id_professor;
    
  }
}