import { Controller } from "../../../../presentation/protocols";
import { ListSalaController } from "../../../../presentation/controllers/sala/list/list-sala-controller";

import { ListSalaUseCase } from "../../../../domain/usecases/sala/list/list-sala-usecase";

import { SalaRepository } from "../../../../data/database/postgres/sala/sala-repository";

export const makeListSalaController = (): Controller => {
  const salaRepository = new SalaRepository();
  const listSalaUseCase = new ListSalaUseCase(salaRepository);
  return new ListSalaController(listSalaUseCase);
}