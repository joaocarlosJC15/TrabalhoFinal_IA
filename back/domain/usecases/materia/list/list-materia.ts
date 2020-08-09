import { Materia } from "../../../entities/materia";

export interface ListMateria {
  list(id_grade: number): Promise<Materia []>
}