export class RestricaoMateriaSala_AG {
  constructor (
    public readonly id_materia: number,
    public readonly id_sala: number) {
      this.id_materia = id_materia
      this.id_sala = id_sala
  }
}