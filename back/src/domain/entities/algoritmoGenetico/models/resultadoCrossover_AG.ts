import { Cromossomo_AG } from "./cromossomo_AG";

export class ResultadoCrossOver_AG {
  constructor(
    public filho1: Cromossomo_AG, 
    public filho2: Cromossomo_AG) {
      
    this.filho1 = filho1;
    this.filho2 = filho2;
  }
}