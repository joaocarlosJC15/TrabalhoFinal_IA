import { Controller } from "../../../../presentation/protocols";
import { AddProfessorController } from "../../../../presentation/controllers/professor/add/add-professor-controller";

import { AddProfessorUseCase } from "../../../../domain/usecases/professor/add/add-professor-usecase";

import { ProfessorRepository } from "../../../../data/database/postgres/professor/professor-repository";

export const makeAddProfessorController = (): Controller => {
  const professorRepository = new ProfessorRepository();
  const addProfessorUseCase = new AddProfessorUseCase(professorRepository);
  return new AddProfessorController(addProfessorUseCase);
}