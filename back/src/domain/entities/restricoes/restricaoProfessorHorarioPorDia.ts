import { HorarioPorDia, deserializeHorarioPorDia } from "../horarioPorDia";

export interface RestricaoProfessorHorarioPorDia {
  fk_professor: number;
  fk_horario_por_dia: number;
  horario?: HorarioPorDia;
}

export function deserializeRestricaoProfessorHorarioPorDia(data: any): RestricaoProfessorHorarioPorDia {
  return {
    fk_professor: data['restricoes_professores_horarios_por_dia_fk_professor'],
    fk_horario_por_dia: data['restricoes_professores_horarios_por_dia_fk_horario_por_dia'],
    horario: deserializeHorarioPorDia(data)
  };
}