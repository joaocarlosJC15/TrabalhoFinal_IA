import { Materia } from "../../../entities/materia";

export interface ListMateriaRepository {
  list(id_grade: number): Promise<Materia []>;
}