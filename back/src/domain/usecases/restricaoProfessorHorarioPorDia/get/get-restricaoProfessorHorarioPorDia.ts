import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface GetRestricaoProfessorHorarioPorDia {
  get(id_professor: number, id_grade: number): Promise<RestricaoProfessorHorarioPorDia []>
}