export class RestricaoHorarioPorDiaPeriodo_AG {
  constructor (
    public readonly id_horario: number,
    public readonly id_periodo: number) {
      this.id_horario = id_horario
      this.id_periodo = id_periodo
  }
}