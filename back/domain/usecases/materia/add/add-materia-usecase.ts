import { AddMateria, AddMateriaEntity } from "./add-materia";
import { Materia } from "../../../entities/materia";
import { AddMateriaRepository } from "../../../protocols/database/materia/add-materia-repository";

export class AddMateriaUseCase implements AddMateria {
  constructor(
    private readonly addMateriaRepository: AddMateriaRepository
  ) {
    this.addMateriaRepository = addMateriaRepository
  }

  async add(addMateriaData: AddMateriaEntity): Promise<Materia> {
    const materia = await this.addMateriaRepository.add(addMateriaData);

    return materia;
  }
}