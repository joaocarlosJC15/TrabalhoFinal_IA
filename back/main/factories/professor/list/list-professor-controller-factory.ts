import { Controller } from "../../../../presentation/protocols";
import { ListProfessorController } from "../../../../presentation/controllers/professor/list/list-professor-controller";

import { ListProfessorUseCase } from "../../../../domain/usecases/professor/list/list-professor-usecase";

import { ProfessorRepository } from "../../../../data/database/postgres/professor/professor-repository";

export const makeListProfessorController = (): Controller => {
  const professorRepository = new ProfessorRepository();
  const listProfessorUseCase = new ListProfessorUseCase(professorRepository);
  return new ListProfessorController(listProfessorUseCase);
}