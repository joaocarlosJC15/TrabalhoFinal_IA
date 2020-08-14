import { HorarioPorDia } from "../../../entities/horarioPorDia";

export interface GetHorarioPorDiaRepository {
  get(id_horario_por_dia: number, id_grade: number): Promise<HorarioPorDia>;
}