import { Controller } from "../../../../presentation/protocols";
import { AddMateriaController } from "../../../../presentation/controllers/materia/add/add-materia-controller";

import { AddMateriaUseCase } from "../../../../domain/usecases/materia/add/add-materia-usecase";

import { MateriaRepository } from "../../../../data/database/postgres/materia/materia-repository";

export const makeAddMateriaController = (): Controller => {
  const materiaRepository = new MateriaRepository();
  const addMateriaUseCase = new AddMateriaUseCase(materiaRepository);
  return new AddMateriaController(addMateriaUseCase);
}