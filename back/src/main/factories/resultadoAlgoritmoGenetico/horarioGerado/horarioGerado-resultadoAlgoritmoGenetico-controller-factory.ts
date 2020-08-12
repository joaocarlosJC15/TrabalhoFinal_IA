import { Controller } from "../../../../presentation/protocols";
import { ListHorarioGeradoController } from "../../../../presentation/controllers/resultadoAlgoritmoGenetico/horarioGerado/horarioGerado-resultadoAlgoritmoGenetico-controller";

import { ListHorarioGeradoUseCase } from "../../../../domain/usecases/horarioGerado/list/list-horarioGerado-usecase";

import { HorarioGeradoRepository } from "../../../../data/database/postgres/horarioGerado/horarioGerado-repository";

export const makeListHorarioGeradoController = (): Controller => {
  const horarioGeradoRepository = new HorarioGeradoRepository();
  const listHorarioGeradoUseCase = new ListHorarioGeradoUseCase(horarioGeradoRepository);
  return new ListHorarioGeradoController(listHorarioGeradoUseCase);
}