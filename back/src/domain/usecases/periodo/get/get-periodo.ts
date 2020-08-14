import { Periodo } from "../../../entities/periodo";

export interface GetPeriodo {
  get(id_periodo: number, id_grade: number): Promise<Periodo>
}