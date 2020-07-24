import { Aula_AG } from './Aula_AG'

export class Sala_AG {
  public readonly id: number;
  public aula?: Aula_AG;

  constructor (id: number) {
    this.id = id;
  }
}