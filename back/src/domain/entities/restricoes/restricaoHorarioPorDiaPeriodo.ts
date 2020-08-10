import { HorarioPorDia } from "../horarioPorDia";

export interface RestricaoHorarioPorDiaPeriodo {
  fk_horario: number;
  fk_periodo: number;
  horario?: HorarioPorDia;
}