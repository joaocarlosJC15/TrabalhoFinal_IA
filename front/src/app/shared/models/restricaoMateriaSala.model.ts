import { Sala } from './sala.model';

export class RestricaoMateriaSala {
  public fk_materia: number;
  public fk_sala: number;
  public sala?: Sala;

  constructor(fk_materia: number, fk_sala: number) {
    this.fk_materia = fk_materia;
    this.fk_sala = fk_sala;
  }

  static deserialize(data: any): RestricaoMateriaSala {
    const fk_materia = data.fk_materia;
    const fk_sala = data.fk_sala;
  
    return new RestricaoMateriaSala(fk_materia, fk_sala);
  }
}