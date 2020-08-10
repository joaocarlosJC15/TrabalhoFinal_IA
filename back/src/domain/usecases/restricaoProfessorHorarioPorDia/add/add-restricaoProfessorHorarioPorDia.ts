import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface AddRestricaoProfessorHorarioPorDiaEntity {
  fk_professor: number;
  fk_horario_por_dia: number;
}

export interface AddRestricaoProfessorHorarioPorDia {
  add(addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia>
}