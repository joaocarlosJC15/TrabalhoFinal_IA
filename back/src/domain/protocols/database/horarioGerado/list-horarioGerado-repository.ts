import { HorarioGerado } from "../../../entities/horarioGerado";

export interface ListHorarioGeradoRepository {
  list(id_grade: number, id_resultado_algoGen: number): Promise<HorarioGerado []>;
}