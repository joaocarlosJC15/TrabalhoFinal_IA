import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface ListRestricaoProfessorHorarioPorDia {
  list(id_grade: number): Promise<RestricaoProfessorHorarioPorDia []>
}