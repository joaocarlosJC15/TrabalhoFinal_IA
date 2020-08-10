import { HorarioPorDia } from "../../../entities/horarioPorDia";

export interface ListHorarioPorDiaRepository {
  list(id_grade: number): Promise<HorarioPorDia []>;
}