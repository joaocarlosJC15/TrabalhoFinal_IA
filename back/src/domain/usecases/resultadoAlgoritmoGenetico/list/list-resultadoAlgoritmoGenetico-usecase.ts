import { ListResultadoAlgoritmoGeneticoRepository } from "../../../protocols/database/resultadoAlgoritmoGenetico/list-resultadoAlgoritmoGenetico-repository";
import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";
import { ListResultadoAlgoritmoGenetico } from "./list-resultadoAlgoritmoGenetico";

export class ListResultadoAlgoritmoGeneticoUseCase implements ListResultadoAlgoritmoGenetico {
  constructor(
    private readonly listResultadoAlgoritmoGeneticoRepository: ListResultadoAlgoritmoGeneticoRepository
  ) {
    this.listResultadoAlgoritmoGeneticoRepository = listResultadoAlgoritmoGeneticoRepository;
  }

  async list (id_grade: number): Promise<ResultadoAlgoritmoGenetico []> {
    const data = await this.listResultadoAlgoritmoGeneticoRepository.list(id_grade);

    return data;
  }
}