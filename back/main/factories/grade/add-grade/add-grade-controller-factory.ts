import { Controller } from "../../../../presentation/protocols";
import { AddGradeController } from "../../../../presentation/controllers/grade/add-grade/add-grade-controller";
import { GradeRepository } from "../../../../data/database/postgres/grade/grade-repository";

import { AddGradeUsecase } from "../../../../domain/usecases/grade/add/add-grade-usecase";

export const makeAddGradeController = (): Controller => {
  const gradeRepository = new GradeRepository();
  const addGradeUseCase = new AddGradeUsecase(gradeRepository);
  return new AddGradeController(addGradeUseCase);
}