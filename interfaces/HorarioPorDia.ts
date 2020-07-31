export interface HorarioPorDia {
  id: number;
  horario_inicio: Date;
  horario_termino: Date;
  qtde_aulas_simultaneas: number;
  fk_dia_semana: number;
  fk_grade: number;
}