import { AddRestricaoProfessorHorarioPorDiaEntity } from "../../../usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia";
import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";

export interface AddRestricaoProfessorHorarioPorDiaRepository {
  add (addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia>;
}