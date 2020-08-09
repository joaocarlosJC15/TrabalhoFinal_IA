import { Controller } from "../../../../presentation/protocols";
import { ListMateriaController } from "../../../../presentation/controllers/materia/list/list-materia-controller";

import { ListMateriaUseCase } from "../../../../domain/usecases/materia/list/list-materia-usecase";

import { MateriaRepository } from "../../../../data/database/postgres/materia/materia-repository";

export const makeListMateriaController = (): Controller => {
  const materiaRepository = new MateriaRepository();
  const listMateriaUseCase = new ListMateriaUseCase(materiaRepository);
  return new ListMateriaController(listMateriaUseCase);
}