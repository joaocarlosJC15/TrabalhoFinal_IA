import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface ListRestricaoMateriaSala {
  list(id_grade: number): Promise<RestricaoMateriaSala []>
}