export class Aula_AG {
  constructor (
    public readonly id_materia: number, 
    public readonly id_periodo: number, 
    public readonly id_professor: number,
    public readonly restricoesSala: number[],
    public readonly restricoesHorarioProfessor: number[]
  ) {
      this.id_materia = id_materia;
      this.id_periodo = id_periodo;
      this.id_professor = id_professor;
      this.restricoesSala = restricoesSala;
      this.restricoesHorarioProfessor = restricoesHorarioProfessor;
  }
}