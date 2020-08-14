import { HorarioPorDia, deserializeHorarioPorDia } from "../horarioPorDia";

export interface RestricaoSalaHorarioPorDia {
  fk_sala: number;
  fk_horario_por_dia: number;
  horario?: HorarioPorDia;
}

export function deserializeRestricaoSalaHorarioPorDia(data: any): RestricaoSalaHorarioPorDia {
  return {
    fk_sala: data['restricoes_salas_horarios_por_dia_fk_sala'],
    fk_horario_por_dia: data['restricoes_salas_horarios_por_dia_fk_horario_por_dia'],
    horario: deserializeHorarioPorDia(data)
  };
}