import { Controller } from "../../../../presentation/protocols";
import { GetProfessorController } from "../../../../presentation/controllers/professor/get/get-professor-controller";

import { GetProfessorUseCase } from "../../../../domain/usecases/professor/get/get-professor-usecase";

import { ProfessorRepository } from "../../../../data/database/postgres/professor/professor-repository";

export const makeGetProfessorController = (): Controller => {
  const professorRepository = new ProfessorRepository();
  const getProfessorUseCase = new GetProfessorUseCase(professorRepository);
  return new GetProfessorController(getProfessorUseCase);
}