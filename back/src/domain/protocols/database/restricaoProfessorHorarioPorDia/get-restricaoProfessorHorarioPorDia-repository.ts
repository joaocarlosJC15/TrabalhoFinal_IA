import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface GetRestricaoProfessorHorarioPorDiaRepository {
  get(id_professor: number, id_grade: number): Promise<RestricaoProfessorHorarioPorDia []>;
}