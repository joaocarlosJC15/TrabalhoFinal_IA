import { HorarioPorDia } from "../horarioPorDia";

export interface RestricaoSalaHorarioPorDia {
  fk_sala: number;
  fk_horario_por_dia: number;
  horario?: HorarioPorDia;
}