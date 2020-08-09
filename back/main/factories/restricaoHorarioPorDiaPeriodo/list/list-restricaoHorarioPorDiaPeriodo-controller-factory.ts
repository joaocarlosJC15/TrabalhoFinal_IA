import { Controller } from "../../../../presentation/protocols";
import { ListRestricaoHorarioPorDiaPeriodoController } from "../../../../presentation/controllers/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo-controller";

import { ListRestricaoHorarioPorDiaPeriodoUseCase } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo-usecase";

import { RestricaoHorarioPorDiaPeriodoRepository } from "../../../../data/database/postgres/restricaoHorarioPorDiaPeriodo/restricaoHorarioPorDiaPeriodo-repository";

export const makeListRestricaoHorarioPorDiaPeriodoController = (): Controller => {
  const restricaoHorarioPorDiaPeriodoRepository = new RestricaoHorarioPorDiaPeriodoRepository();
  const listRestricaoHorarioPorDiaPeriodoUseCase = new ListRestricaoHorarioPorDiaPeriodoUseCase(restricaoHorarioPorDiaPeriodoRepository);
  return new ListRestricaoHorarioPorDiaPeriodoController(listRestricaoHorarioPorDiaPeriodoUseCase);
}