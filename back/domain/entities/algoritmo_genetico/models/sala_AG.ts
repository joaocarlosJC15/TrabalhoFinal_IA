import { Aula_AG } from './aula_AG'

export class Sala_AG {
  public readonly id: number;
  public aula?: Aula_AG;
  public aptidaoCorreta: boolean = false;
  
  constructor (id: number) {
    this.id = id;
  }
}