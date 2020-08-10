import { Controller } from "../../../../presentation/protocols";
import { AddRestricaoSalaHorarioPorDiaController } from "../../../../presentation/controllers/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia-controller";

import { AddRestricaoSalaHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia-usecase";

import { RestricaoSalaHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoSalaHorarioPorDia/restricaoSalaHorarioPorDia-repository";

export const makeAddRestricaoSalaHorarioPorDiaController = (): Controller => {
  const restricaoSalaHorarioPorDiaRepository = new RestricaoSalaHorarioPorDiaRepository();
  const addRestricaoSalaHorarioPorDiaUseCase = new AddRestricaoSalaHorarioPorDiaUseCase(restricaoSalaHorarioPorDiaRepository);
  return new AddRestricaoSalaHorarioPorDiaController(addRestricaoSalaHorarioPorDiaUseCase);
}