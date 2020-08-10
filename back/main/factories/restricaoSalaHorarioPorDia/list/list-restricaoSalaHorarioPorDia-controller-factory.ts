import { Controller } from "../../../../presentation/protocols";
import { ListRestricaoSalaHorarioPorDiaController } from "../../../../presentation/controllers/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia-controller";

import { ListRestricaoSalaHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia-usecase";

import { RestricaoSalaHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoSalaHorarioPorDia/restricaoSalaHorarioPorDia-repository";

export const makeListRestricaoSalaHorarioPorDiaController = (): Controller => {
  const restricaoSalaHorarioPorDiaRepository = new RestricaoSalaHorarioPorDiaRepository();
  const listRestricaoSalaHorarioPorDiaUseCase = new ListRestricaoSalaHorarioPorDiaUseCase(restricaoSalaHorarioPorDiaRepository);
  return new ListRestricaoSalaHorarioPorDiaController(listRestricaoSalaHorarioPorDiaUseCase);
}