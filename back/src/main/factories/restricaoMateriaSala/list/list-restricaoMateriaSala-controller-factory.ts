import { Controller } from "../../../../presentation/protocols";
import { ListRestricaoMateriaSalaController } from "../../../../presentation/controllers/restricaoMateriaSala/list/list-restricaoMateriaSala-controller";

import { ListRestricaoMateriaSalaUseCase } from "../../../../domain/usecases/restricaoMateriaSala/list/list-restricaoMateriaSala-usecase";

import { RestricaoMateriaSalaRepository } from "../../../../data/database/postgres/restricaoMateriaSala/restricaoMateriaSala-repository";

export const makeListRestricaoMateriaSalaController = (): Controller => {
  const restricaoMateriaSalaRepository = new RestricaoMateriaSalaRepository();
  const listRestricaoMateriaSalaUseCase = new ListRestricaoMateriaSalaUseCase(restricaoMateriaSalaRepository);
  return new ListRestricaoMateriaSalaController(listRestricaoMateriaSalaUseCase);
}