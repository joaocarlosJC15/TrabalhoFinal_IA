import { Controller } from "../../../../presentation/protocols";
import { ListRestricaoProfessorHorarioPorDiaController } from "../../../../presentation/controllers/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia-controller";

import { ListRestricaoProfessorHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia-usecase";

import { RestricaoProfessorHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoProfessorHorarioPorDia/restricaoProfessorHorarioPorDia-repository";

export const makeListRestricaoProfessorHorarioPorDiaController = (): Controller => {
  const restricaoProfessorHorarioPorDiaRepository = new RestricaoProfessorHorarioPorDiaRepository();
  const listRestricaoProfessorHorarioPorDiaUseCase = new ListRestricaoProfessorHorarioPorDiaUseCase(restricaoProfessorHorarioPorDiaRepository);
  return new ListRestricaoProfessorHorarioPorDiaController(listRestricaoProfessorHorarioPorDiaUseCase);
}