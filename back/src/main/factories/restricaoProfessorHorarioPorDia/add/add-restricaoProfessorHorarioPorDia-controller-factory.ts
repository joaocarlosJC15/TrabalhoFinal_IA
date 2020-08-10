import { Controller } from "../../../../presentation/protocols";
import { AddRestricaoProfessorHorarioPorDiaController } from "../../../../presentation/controllers/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia-controller";

import { AddRestricaoProfessorHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia-usecase";

import { RestricaoProfessorHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoProfessorHorarioPorDia/restricaoProfessorHorarioPorDia-repository";

export const makeAddRestricaoProfessorHorarioPorDiaController = (): Controller => {
  const restricaoProfessorHorarioPorDiaRepository = new RestricaoProfessorHorarioPorDiaRepository();
  const addRestricaoProfessorHorarioPorDiaUseCase = new AddRestricaoProfessorHorarioPorDiaUseCase(restricaoProfessorHorarioPorDiaRepository);
  return new AddRestricaoProfessorHorarioPorDiaController(addRestricaoProfessorHorarioPorDiaUseCase);
}