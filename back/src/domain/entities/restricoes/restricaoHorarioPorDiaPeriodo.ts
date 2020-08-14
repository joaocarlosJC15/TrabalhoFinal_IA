import { HorarioPorDia, deserializeHorarioPorDia } from "../horarioPorDia";

export interface RestricaoHorarioPorDiaPeriodo {
  fk_horario: number;
  fk_periodo: number;
  horario?: HorarioPorDia;
}

export function deserializeRestricaoHorarioPorDiaPeriodo(data: any): RestricaoHorarioPorDiaPeriodo {
  return {
    fk_horario: data['restricoes_horarios_por_dia_periodos_fk_horario'],
    fk_periodo: data['restricoes_horarios_por_dia_periodos_fk_periodo'],
    horario: deserializeHorarioPorDia(data)
  };
}