import { Materia } from "../../../entities/materia";

export interface GetMateria {
  get(id_materia: number, id_grade: number): Promise<Materia>
}