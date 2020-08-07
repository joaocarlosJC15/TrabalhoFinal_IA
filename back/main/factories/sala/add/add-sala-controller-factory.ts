import { Controller } from "../../../../presentation/protocols";
import { AddSalaController } from "../../../../presentation/controllers/sala/add/add-sala-controller";

import { AddSalaUseCase } from "../../../../domain/usecases/sala/add/add-sala-usecase";

import { SalaRepository } from "../../../../data/database/postgres/sala/sala-repository";

export const makeAddSalaController = (): Controller => {
  const salaRepository = new SalaRepository();
  const addSalaUseCase = new AddSalaUseCase(salaRepository);
  return new AddSalaController(addSalaUseCase);
}