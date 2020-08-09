import { Controller } from "../../../../presentation/protocols";
import { AddRestricaoHorarioPorDiaPeriodoController } from "../../../../presentation/controllers/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo-controller";

import { AddRestricaoHorarioPorDiaPeriodoUseCase } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo-usecase";

import { RestricaoHorarioPorDiaPeriodoRepository } from "../../../../data/database/postgres/restricaoHorarioPorDiaPeriodo/restricaoHorarioPorDiaPeriodo-repository";

export const makeAddRestricaoHorarioPorDiaPeriodoController = (): Controller => {
  const restricaoHorarioPorDiaPeriodoRepository = new RestricaoHorarioPorDiaPeriodoRepository();
  const addRestricaoHorarioPorDiaPeriodoUseCase = new AddRestricaoHorarioPorDiaPeriodoUseCase(restricaoHorarioPorDiaPeriodoRepository);
  return new AddRestricaoHorarioPorDiaPeriodoController(addRestricaoHorarioPorDiaPeriodoUseCase);
}