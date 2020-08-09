import { ListRestricaoHorarioPorDiaPeriodoRepository } from "../../../protocols/database/restricaoHorarioPorDiaPeriodo/list-restricaoHorarioPorDiaPeriodo-repository";
import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";
import { ListRestricaoHorarioPorDiaPeriodo } from "./list-restricaoHorarioPorDiaPeriodo";

export class ListRestricaoHorarioPorDiaPeriodoUseCase implements ListRestricaoHorarioPorDiaPeriodo {
  constructor(
    private readonly listRestricaoHorarioPorDiaPeriodoRepository: ListRestricaoHorarioPorDiaPeriodoRepository
  ) {
    this.listRestricaoHorarioPorDiaPeriodoRepository = listRestricaoHorarioPorDiaPeriodoRepository;
  }

  async list (id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []> {
    const data = await this.listRestricaoHorarioPorDiaPeriodoRepository.list(id_grade);

    return data;
  }
}