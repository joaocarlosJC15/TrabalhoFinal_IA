import { Controller } from "../../../../presentation/protocols";
import { AddGradeController } from "../../../../presentation/controllers/grade/add/add-grade-controller";

import { AddGradeUseCase } from "../../../../domain/usecases/grade/add/add-grade-usecase";

import { GradeRepository } from "../../../../data/database/postgres/grade/grade-repository";

export const makeAddGradeController = (): Controller => {
  const gradeRepository = new GradeRepository();
  const addGradeUseCase = new AddGradeUseCase(gradeRepository);
  return new AddGradeController(addGradeUseCase);
}