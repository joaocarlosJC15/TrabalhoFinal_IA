import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface ListRestricaoProfessorHorarioPorDiaRepository {
  list(id_grade: number): Promise<RestricaoProfessorHorarioPorDia []>;
}