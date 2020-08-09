import { ListMateriaRepository } from "../../../protocols/database/materia/list-materia-repository";
import { Materia } from "../../../entities/materia";
import { ListMateria } from "./list-materia";

export class ListMateriaUseCase implements ListMateria {
  constructor(
    private readonly listMateriaRepository: ListMateriaRepository
  ) {
    this.listMateriaRepository = listMateriaRepository;
  }

  async list (id_grade: number): Promise<Materia []> {
    const data = await this.listMateriaRepository.list(id_grade);

    return data;
  }
}