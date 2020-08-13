import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface GetRestricaoMateriaSala {
  get(id_materia: number, id_grade: number): Promise<RestricaoMateriaSala []>
}