import { HorarioGerado } from "../../../entities/horarioGerado";

export interface ListHorarioGerado {
  list(id_grade: number, id_resultado_algoGen: number): Promise<HorarioGerado []>
}