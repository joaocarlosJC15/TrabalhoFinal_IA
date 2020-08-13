import { Materia } from "../../../entities/materia";

export interface GetMateriaRepository {
  get(id_materia:number, id_grade: number): Promise<Materia>;
}