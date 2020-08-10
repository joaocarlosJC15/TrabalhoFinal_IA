import { Professor } from "../../../entities/professor";

export interface ListProfessor {
  list(id_grade: number): Promise<Professor []>
}