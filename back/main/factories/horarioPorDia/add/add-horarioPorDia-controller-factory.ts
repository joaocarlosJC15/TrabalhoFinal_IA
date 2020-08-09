import { Controller } from "../../../../presentation/protocols";
import { AddHorarioPorDiaController } from "../../../../presentation/controllers/horarioPorDia/add/add-horarioPorDia-controller";

import { AddHorarioPorDiaUseCase } from "../../../../domain/usecases/horarioPorDia/add/add-horarioPorDia-usecase";

import { HorarioPorDiaRepository } from "../../../../data/database/postgres/horarioPorDia/horarioPorDia-repository";

export const makeAddHorarioPorDiaController = (): Controller => {
  const horarioPorDiaRepository = new HorarioPorDiaRepository();
  const addHorarioPorDiaUseCase = new AddHorarioPorDiaUseCase(horarioPorDiaRepository);
  return new AddHorarioPorDiaController(addHorarioPorDiaUseCase);
}