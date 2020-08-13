import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface GetRestricaoMateriaSalaRepository {
  get(id_materia: number, id_grade: number): Promise<RestricaoMateriaSala []>;
}