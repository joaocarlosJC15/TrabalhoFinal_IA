import { Professor } from "../../../entities/professor";

export interface GetProfessor {
  get(id_professor: number, id_grade: number): Promise<Professor>
}