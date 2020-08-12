import { Controller } from "../../../../presentation/protocols";
import { ListDiaSemanaController } from "../../../../presentation/controllers/diaSemana/list/list-diaSemana-controller";

import { ListDiaSemanaUseCase } from "../../../../domain/usecases/diaSemana/list/list-diaSemana-usecase";

import { DiaSemanaRepository } from "../../../../data/database/postgres/diaSemana/diaSemana-repository";

export const makeListDiaSemanaController = (): Controller => {
  const diaSemanaRepository = new DiaSemanaRepository();
  const listDiaSemanaUseCase = new ListDiaSemanaUseCase(diaSemanaRepository);
  return new ListDiaSemanaController(listDiaSemanaUseCase);
}