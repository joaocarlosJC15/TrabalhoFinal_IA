import { HorarioPorDia } from './horarioPorDia.model';

export class RestricaoHorarioPorDiaPeriodo {
  public fk_horario: number;
  public fk_periodo: number;
  public horario?: HorarioPorDia;

  constructor(fk_periodo: number, fk_horario: number) {
    this.fk_horario = fk_horario;
    this.fk_periodo = fk_periodo;
  }

  static deserialize(data: any): RestricaoHorarioPorDiaPeriodo {
    const fk_horario = data.fk_horario;
    const fk_periodo = data.fk_periodo;
  
    return new RestricaoHorarioPorDiaPeriodo(fk_periodo, fk_horario);
  }
}