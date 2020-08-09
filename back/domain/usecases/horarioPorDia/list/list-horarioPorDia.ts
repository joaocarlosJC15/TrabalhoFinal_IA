import { HorarioPorDia } from "../../../entities/horarioPorDia";

export interface ListHorarioPorDia {
  list(id_grade: number): Promise<HorarioPorDia []>
}