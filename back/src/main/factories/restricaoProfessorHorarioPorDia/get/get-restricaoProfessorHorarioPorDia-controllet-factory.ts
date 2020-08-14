import { Controller } from "../../../../presentation/protocols";
import { GetRestricaoProfessorHorarioPorDiaController } from "../../../../presentation/controllers/restricaoProfessorHorarioPorDia/get/get-restricaoProfessorHorarioPorDia-controller";

import { GetRestricaoProfessorHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/get/get-restricaoProfessorHorarioPorDia-usecase";

import { RestricaoProfessorHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoProfessorHorarioPorDia/restricaoProfessorHorarioPorDia-repository";

export const makeGetRestricaoProfessorHorarioPorDiaController = (): Controller => {
  const restricaoProfessorHorarioPorDiaRepository = new RestricaoProfessorHorarioPorDiaRepository();
  const getRestricaoProfessorHorarioPorDiaUseCase = new GetRestricaoProfessorHorarioPorDiaUseCase(restricaoProfessorHorarioPorDiaRepository);
  return new GetRestricaoProfessorHorarioPorDiaController(getRestricaoProfessorHorarioPorDiaUseCase);
}