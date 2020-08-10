import { Periodo } from "../../../entities/periodo";

export interface ListPeriodo {
  list(id_grade: number): Promise<Periodo []>
}