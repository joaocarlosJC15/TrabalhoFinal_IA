import { Controller } from "../../../../presentation/protocols";
import { GetHorarioPorDiaController } from "../../../../presentation/controllers/horarioPorDia/get/get-horarioPorDia-controller";

import { GetHorarioPorDiaUseCase } from "../../../../domain/usecases/horarioPorDia/get/get-horarioPorDia-usecase";

import { HorarioPorDiaRepository } from "../../../../data/database/postgres/horarioPorDia/horarioPorDia-repository";

export const makeGetHorarioPorDiaController = (): Controller => {
  const horarioPorDiaRepository = new HorarioPorDiaRepository();
  const getHorarioPorDiaUseCase = new GetHorarioPorDiaUseCase(horarioPorDiaRepository);
  return new GetHorarioPorDiaController(getHorarioPorDiaUseCase);
}