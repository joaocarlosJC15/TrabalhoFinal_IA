import { Controller } from "../../../../presentation/protocols";
import { AddPeriodoController } from "../../../../presentation/controllers/periodo/add/add-periodo-controller";

import { AddPeriodoUseCase } from "../../../../domain/usecases/periodo/add/add-periodo-usecase";

import { PeriodoRepository } from "../../../../data/database/postgres/periodo/periodo-repository";

export const makeAddPeriodoController = (): Controller => {
  const periodoRepository = new PeriodoRepository();
  const addPeriodoUseCase = new AddPeriodoUseCase(periodoRepository);
  return new AddPeriodoController(addPeriodoUseCase);
}