import { Controller } from "../../../../presentation/protocols";
import { GetSalaController } from "../../../../presentation/controllers/sala/get/get-sala-controller";

import { GetSalaUseCase } from "../../../../domain/usecases/sala/get/get-sala-usecase";

import { SalaRepository } from "../../../../data/database/postgres/sala/sala-repository";

export const makeGetSalaController = (): Controller => {
  const salaRepository = new SalaRepository();
  const getSalaUseCase = new GetSalaUseCase(salaRepository);
  return new GetSalaController(getSalaUseCase);
}