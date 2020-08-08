import { Controller } from "../../../../presentation/protocols";
import { ListPeriodoController } from "../../../../presentation/controllers/periodo/list/list-periodo-controller";

import { ListPeriodoUseCase } from "../../../../domain/usecases/periodo/list/list-periodo-usecase";

import { PeriodoRepository } from "../../../../data/database/postgres/periodo/periodo-repository";

export const makeListPeriodoController = (): Controller => {
  const periodoRepository = new PeriodoRepository();
  const listPeriodoUseCase = new ListPeriodoUseCase(periodoRepository);
  return new ListPeriodoController(listPeriodoUseCase);
}