import { Periodo } from "../../../entities/periodo";

export interface ListPeriodoRepository {
  list(id_grade: number): Promise<Periodo []>;
}