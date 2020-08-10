import { ListRestricaoSalaHorarioPorDiaRepository } from "../../../protocols/database/restricaoSalaHorarioPorDia/list-restricaoSalaHorarioPorDia-repository";
import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";
import { ListRestricaoSalaHorarioPorDia } from "./list-restricaoSalaHorarioPorDia";

export class ListRestricaoSalaHorarioPorDiaUseCase implements ListRestricaoSalaHorarioPorDia {
  constructor(
    private readonly listRestricaoSalaHorarioPorDiaRepository: ListRestricaoSalaHorarioPorDiaRepository
  ) {
    this.listRestricaoSalaHorarioPorDiaRepository = listRestricaoSalaHorarioPorDiaRepository;
  }

  async list (id_grade: number): Promise<RestricaoSalaHorarioPorDia []> {
    const data = await this.listRestricaoSalaHorarioPorDiaRepository.list(id_grade);

    return data;
  }
}