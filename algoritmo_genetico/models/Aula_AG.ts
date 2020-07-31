export class Aula_AG {
  constructor (
    public id_materia: number, 
    public readonly id_periodo: number, 
    public readonly id_professor: number) {
      this.id_materia = id_materia;
      this.id_periodo = id_periodo;
      this.id_professor = id_professor;
  }
}