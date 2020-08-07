import { HorarioPorDia } from "../horarioPorDia";

export interface RestricaoProfessorHorarioPorDia {
  fk_professor: number;
  fk_horario_por_dia: number;
  horario: HorarioPorDia;
}