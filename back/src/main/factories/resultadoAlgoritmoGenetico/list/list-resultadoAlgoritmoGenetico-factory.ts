import { Controller } from "../../../../presentation/protocols";
import { ListResultadoAlgoritmoGeneticoController } from "../../../../presentation/controllers/resultadoAlgoritmoGenetico/list/list-resultadoAlgoritmoGenetico-controller";

import { ListResultadoAlgoritmoGeneticoUseCase } from "../../../../domain/usecases/resultadoAlgoritmoGenetico/list/list-resultadoAlgoritmoGenetico-usecase";

import { ResultadoAlgoritmoGeneticoRepository } from "../../../../data/database/postgres/resultadoAlgoritmoGenetico/resultadoAlgoritmoGenetico-repository";

export const makeListResultadoAlgoritmoGeneticoController = (): Controller => {
  const resultadoAlgoritmoGeneticoRepository = new ResultadoAlgoritmoGeneticoRepository();
  const listResultadoAlgoritmoGeneticoUseCase = new ListResultadoAlgoritmoGeneticoUseCase(resultadoAlgoritmoGeneticoRepository);
  return new ListResultadoAlgoritmoGeneticoController(listResultadoAlgoritmoGeneticoUseCase);
}