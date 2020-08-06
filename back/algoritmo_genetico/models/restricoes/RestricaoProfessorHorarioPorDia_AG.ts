export class RestricaoProfessorHorarioPorDia_AG {
  constructor (
    public readonly id_professor: number,
    public readonly id_horario_por_dia: number) {
      this.id_professor = id_professor
      this.id_horario_por_dia = id_horario_por_dia
  }
}