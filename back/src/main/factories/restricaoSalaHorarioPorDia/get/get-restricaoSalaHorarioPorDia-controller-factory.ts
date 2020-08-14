import { Controller } from "../../../../presentation/protocols";
import { GetRestricaoSalaHorarioPorDiaController } from "../../../../presentation/controllers/restricaoSalaHorarioPorDia/get/get-restricaoSalaHorarioPorDia-controller";

import { GetRestricaoSalaHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/get/get-restricaoSalaHorarioPorDia-usecase";

import { RestricaoSalaHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoSalaHorarioPorDia/restricaoSalaHorarioPorDia-repository";

export const makeGetRestricaoSalaHorarioPorDiaController = (): Controller => {
  const restricaoSalaHorarioPorDiaRepository = new RestricaoSalaHorarioPorDiaRepository();
  const getRestricaoSalaHorarioPorDiaUseCase = new GetRestricaoSalaHorarioPorDiaUseCase(restricaoSalaHorarioPorDiaRepository);
  return new GetRestricaoSalaHorarioPorDiaController(getRestricaoSalaHorarioPorDiaUseCase);
}