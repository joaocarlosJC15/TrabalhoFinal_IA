import { Cromossomo_AG } from "./Cromossomo_AG";

export class ResultadoTorneio_AG {
  constructor(
    public cromossomo1: Cromossomo_AG, 
    public cromossomo2: Cromossomo_AG) {
      
    this.cromossomo1 = cromossomo1;
    this.cromossomo2 = cromossomo2;
  }
}