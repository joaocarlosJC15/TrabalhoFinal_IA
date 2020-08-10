import { AddResultadoAlgoritmoGenetico, AddResultadoAlgoritmoGeneticoEntity } from "./add-resultadoAlgoritmoGenetico";
import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";
import { AddResultadoAlgoritmoGeneticoRepository } from "../../../protocols/database/resultadoAlgoritmoGenetico/add-resultadoAlgoritmoGenetico-repository";

export class AddResultadoAlgoritmoGeneticoUseCase implements AddResultadoAlgoritmoGenetico {
  constructor(
    private readonly addResultadoAlgoritmoGeneticoRepository: AddResultadoAlgoritmoGeneticoRepository
  ) {
    this.addResultadoAlgoritmoGeneticoRepository = addResultadoAlgoritmoGeneticoRepository
  }

  async add(addResultadoAlgoritmoGeneticoData: AddResultadoAlgoritmoGeneticoEntity): Promise<ResultadoAlgoritmoGenetico> {
    const resultadoAlgoritmoGenetico = await this.addResultadoAlgoritmoGeneticoRepository.add(addResultadoAlgoritmoGeneticoData);

    return resultadoAlgoritmoGenetico;
  }
}