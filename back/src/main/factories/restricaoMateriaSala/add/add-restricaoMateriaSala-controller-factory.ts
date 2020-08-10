import { Controller } from "../../../../presentation/protocols";
import { AddRestricaoMateriaSalaController } from "../../../../presentation/controllers/restricaoMateriaSala/add/add-restricaoMateriaSala-controller";

import { AddRestricaoMateriaSalaUseCase } from "../../../../domain/usecases/restricaoMateriaSala/add/add-restricaoMateriaSala-usecase";

import { RestricaoMateriaSalaRepository } from "../../../../data/database/postgres/restricaoMateriaSala/restricaoMateriaSala-repository";

export const makeAddRestricaoMateriaSalaController = (): Controller => {
  const restricaoMateriaSalaRepository = new RestricaoMateriaSalaRepository();
  const addRestricaoMateriaSalaUseCase = new AddRestricaoMateriaSalaUseCase(restricaoMateriaSalaRepository);
  return new AddRestricaoMateriaSalaController(addRestricaoMateriaSalaUseCase);
}