import { HorarioPorDia } from './horarioPorDia.model';

export class RestricaoSalaHorarioPorDia {
  public fk_sala: number;
  public fk_horario_por_dia: number;
  public horario?: HorarioPorDia;

  constructor(fk_sala, fk_horario_por_dia) {
    this.fk_sala = fk_sala;
    this.fk_horario_por_dia = fk_horario_por_dia;
  }

  static deserialize(data: any): RestricaoSalaHorarioPorDia {
    const fk_sala = data.fk_sala;
    const fk_horario_por_dia = data.fk_horario_por_dia;
  
    return new RestricaoSalaHorarioPorDia(fk_sala, fk_horario_por_dia);
  }
}