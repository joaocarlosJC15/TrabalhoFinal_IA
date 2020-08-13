import { GetMateriaRepository } from "../../../protocols/database/materia/get-materia-repository";
import { Materia } from "../../../entities/materia";
import { GetMateria } from "./get-materia";

export class GetMateriaUseCase implements GetMateria {
  constructor(
    private readonly getMateriaRepository: GetMateriaRepository
  ) {
    this.getMateriaRepository = getMateriaRepository;
  }

  async get (id_materia: number, id_grade: number): Promise<Materia> {
    const data = await this.getMateriaRepository.get(id_materia, id_grade);

    return data;
  }
}