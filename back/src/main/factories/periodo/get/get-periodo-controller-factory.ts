import { Controller } from "../../../../presentation/protocols";
import { GetPeriodoController } from "../../../../presentation/controllers/periodo/get/get-periodo-controller";

import { GetPeriodoUseCase } from "../../../../domain/usecases/periodo/get/get-periodo-usecase";

import { PeriodoRepository } from "../../../../data/database/postgres/periodo/periodo-repository";

export const makeGetPeriodoController = (): Controller => {
  const periodoRepository = new PeriodoRepository();
  const getPeriodoUseCase = new GetPeriodoUseCase(periodoRepository);
  return new GetPeriodoController(getPeriodoUseCase);
}