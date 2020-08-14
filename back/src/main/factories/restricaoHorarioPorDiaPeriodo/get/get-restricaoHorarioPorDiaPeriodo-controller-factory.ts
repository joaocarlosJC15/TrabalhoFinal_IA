import { Controller } from "../../../../presentation/protocols";
import { GetRestricaoHorarioPorDiaPeriodoController } from "../../../../presentation/controllers/restricaoHorarioPorDiaPeriodo/get/get-restricaoHorarioPorDiaPeriodo-controller";

import { GetRestricaoHorarioPorDiaPeriodoUseCase } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/get/get-restricaoHorarioPorDiaPeriodo-usecase";

import { RestricaoHorarioPorDiaPeriodoRepository } from "../../../../data/database/postgres/restricaoHorarioPorDiaPeriodo/restricaoHorarioPorDiaPeriodo-repository";

export const makeGetRestricaoHorarioPorDiaPeriodoController = (): Controller => {
  const restricaoHorarioPorDiaPeriodoRepository = new RestricaoHorarioPorDiaPeriodoRepository();
  const getRestricaoHorarioPorDiaPeriodoUseCase = new GetRestricaoHorarioPorDiaPeriodoUseCase(restricaoHorarioPorDiaPeriodoRepository);
  return new GetRestricaoHorarioPorDiaPeriodoController(getRestricaoHorarioPorDiaPeriodoUseCase);
}