import { Controller } from "../../../../presentation/protocols";
import { GetMateriaController } from "../../../../presentation/controllers/materia/get/get-materia-controller";

import { GetMateriaUseCase } from "../../../../domain/usecases/materia/get/get-materia-usecase";

import { MateriaRepository } from "../../../../data/database/postgres/materia/materia-repository";

export const makeGetMateriaController = (): Controller => {
  const materiaRepository = new MateriaRepository();
  const getMateriaUseCase = new GetMateriaUseCase(materiaRepository);
  return new GetMateriaController(getMateriaUseCase);
}