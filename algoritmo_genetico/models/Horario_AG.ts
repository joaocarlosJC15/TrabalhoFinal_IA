import { Sala_AG } from './Sala_AG';

export class Horario_AG {
  public id: number;
  public max_qtde_aulas_simultaneas: number;
  public qtde_aulas_simultaneas: number = 0;
  public salas: Sala_AG [] = [];
  public aptidaoCorreta: boolean = false;
  
  constructor(id: number, max_qtde_aulas_simultaneas: number) {
    this.id = id;
    this.max_qtde_aulas_simultaneas = max_qtde_aulas_simultaneas;
  }
}