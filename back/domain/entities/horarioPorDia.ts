export interface HorarioPorDia {
  id: number;
  horario_inicio: string;
  horario_termino: string;
  qtde_aulas_simultaneas: number;
  fk_dia_semana: number;
  fk_grade: number;
}