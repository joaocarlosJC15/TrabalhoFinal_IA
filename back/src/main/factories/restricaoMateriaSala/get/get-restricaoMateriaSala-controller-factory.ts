import { Controller } from "../../../../presentation/protocols";
import { GetRestricaoMateriaSalaController } from "../../../../presentation/controllers/restricaoMateriaSala/get/get-restricaoMateriaSala-controller";

import { GetRestricaoMateriaSalaUseCase } from "../../../../domain/usecases/restricaoMateriaSala/get/get-restricaoMateriaSala-usecase";

import { RestricaoMateriaSalaRepository } from "../../../../data/database/postgres/restricaoMateriaSala/restricaoMateriaSala-repository";

export const makeGetRestricaoMateriaSalaController = (): Controller => {
  const restricaoMateriaSalaRepository = new RestricaoMateriaSalaRepository();
  const getRestricaoMateriaSalaUseCase = new GetRestricaoMateriaSalaUseCase(restricaoMateriaSalaRepository);
  return new GetRestricaoMateriaSalaController(getRestricaoMateriaSalaUseCase);
}