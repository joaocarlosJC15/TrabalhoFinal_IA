import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface ListRestricaoMateriaSalaRepository {
  list(id_grade: number): Promise<RestricaoMateriaSala []>;
}