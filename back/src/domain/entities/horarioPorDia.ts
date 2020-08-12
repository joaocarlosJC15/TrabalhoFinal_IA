export interface HorarioPorDia {
  id: number;
  horario_inicio: string;
  horario_termino: string;
  qtde_aulas_simultaneas: number;
  fk_dia_semana: number;
  fk_grade: number;
}

export function deserializeHorarioPorDia(data: any): HorarioPorDia {
  return {
    id: data['horarios_por_dia_id'],
    horario_inicio: data['horarios_por_dia_horario_inicio'],
    horario_termino: data['horarios_por_dia_horario_termino'],
    qtde_aulas_simultaneas: data['horarios_por_dia_qtde_aulas_simultaneas'],
    fk_dia_semana: data['horarios_por_dia_fk_dia_semana'],
    fk_grade: data['horarios_por_dia_fk_grade'],
  };
}