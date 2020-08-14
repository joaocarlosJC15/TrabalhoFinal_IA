import { GetRestricaoSalaHorarioPorDiaRepository } from "../../../protocols/database/restricaoSalaHorarioPorDia/get-restricaoSalaHorarioPorDia-repository";
import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";
import { GetRestricaoSalaHorarioPorDia } from "./get-restricaoSalaHorarioPorDia";

export class GetRestricaoSalaHorarioPorDiaUseCase implements GetRestricaoSalaHorarioPorDia {
  constructor(
    private readonly getRestricaoSalaHorarioPorDiaRepository: GetRestricaoSalaHorarioPorDiaRepository
  ) {
    this.getRestricaoSalaHorarioPorDiaRepository = getRestricaoSalaHorarioPorDiaRepository;
  }

  async get(id_sala: number, id_grade: number): Promise<RestricaoSalaHorarioPorDia []> {
    const data = await this.getRestricaoSalaHorarioPorDiaRepository.get(id_sala, id_grade);

    return data;
  }
}