import { Professor } from "../../../entities/professor";

export interface ListProfessorRepository {
  list(id_grade: number): Promise<Professor []>;
}