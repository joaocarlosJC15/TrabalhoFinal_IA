import { Controller } from "../../../../presentation/protocols";
import { ListGradeController } from "../../../../presentation/controllers/grade/list/list-grade-controller";

import { ListGradeUseCase } from "../../../../domain/usecases/grade/list/list-grade-usecase";

import { GradeRepository } from "../../../../data/database/postgres/grade/grade-repository";

export const makeListGradeController = (): Controller => {
  const gradeRepository = new GradeRepository();
  const listGradeUseCase = new ListGradeUseCase(gradeRepository);
  return new ListGradeController(listGradeUseCase);
}