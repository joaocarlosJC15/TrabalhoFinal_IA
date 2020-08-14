import { Professor } from "../../../entities/professor";

export interface GetProfessorRepository {
  get(id_professor: number, id_grade: number): Promise<Professor>;
}