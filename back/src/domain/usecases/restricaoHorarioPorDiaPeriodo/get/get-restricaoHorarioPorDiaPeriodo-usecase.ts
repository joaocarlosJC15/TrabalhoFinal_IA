import { GetRestricaoHorarioPorDiaPeriodoRepository } from "../../../protocols/database/restricaoHorarioPorDiaPeriodo/get-restricaoHorarioPorDiaPeriodo-repository";
import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";
import { GetRestricaoHorarioPorDiaPeriodo } from "./get-restricaoHorarioPorDiaPeriodo";

export class GetRestricaoHorarioPorDiaPeriodoUseCase implements GetRestricaoHorarioPorDiaPeriodo {
  constructor(
    private readonly getRestricaoHorarioPorDiaPeriodoRepository: GetRestricaoHorarioPorDiaPeriodoRepository
  ) {
    this.getRestricaoHorarioPorDiaPeriodoRepository = getRestricaoHorarioPorDiaPeriodoRepository;
  }

  async get(id_periodo: number, id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []> {
    const data = await this.getRestricaoHorarioPorDiaPeriodoRepository.get(id_periodo, id_grade);

    return data;
  }
}