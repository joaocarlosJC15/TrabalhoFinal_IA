export class RestricaoSalaHorarioPorDia_AG {
  constructor (
    public readonly id_sala: number,
    public readonly id_horario_por_dia: number) {
      this.id_sala = id_sala
      this.id_horario_por_dia = id_horario_por_dia
  }
}