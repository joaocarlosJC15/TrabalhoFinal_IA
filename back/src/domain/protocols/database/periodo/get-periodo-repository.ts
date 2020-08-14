import { Periodo } from "../../../entities/periodo";

export interface GetPeriodoRepository {
  get(id_periodo: number, id_grade: number): Promise<Periodo>;
}