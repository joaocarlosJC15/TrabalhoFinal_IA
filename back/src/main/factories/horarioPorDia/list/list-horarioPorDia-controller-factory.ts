import { Controller } from "../../../../presentation/protocols";
import { ListHorarioPorDiaController } from "../../../../presentation/controllers/horarioPorDia/list/list-horarioPorDia-controller";

import { ListHorarioPorDiaUseCase } from "../../../../domain/usecases/horarioPorDia/list/list-horarioPorDia-usecase";

import { HorarioPorDiaRepository } from "../../../../data/database/postgres/horarioPorDia/horarioPorDia-repository";

export const makeListHorarioPorDiaController = (): Controller => {
  const horarioPorDiaRepository = new HorarioPorDiaRepository();
  const listHorarioPorDiaUseCase = new ListHorarioPorDiaUseCase(horarioPorDiaRepository);
  return new ListHorarioPorDiaController(listHorarioPorDiaUseCase);
}