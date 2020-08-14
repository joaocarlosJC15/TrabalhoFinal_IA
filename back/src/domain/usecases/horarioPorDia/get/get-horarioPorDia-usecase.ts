import { GetHorarioPorDiaRepository } from "../../../protocols/database/horarioPorDia/get-horarioPorDia-repository";
import { HorarioPorDia } from "../../../entities/horarioPorDia";
import { GetHorarioPorDia } from "./get-horarioPorDia";

export class GetHorarioPorDiaUseCase implements GetHorarioPorDia {
  constructor(
    private readonly getHorarioPorDiaRepository: GetHorarioPorDiaRepository
  ) {
    this.getHorarioPorDiaRepository = getHorarioPorDiaRepository;
  }

  async get(id_horario_por_dia: number, id_grade: number): Promise<HorarioPorDia> {
    const data = await this.getHorarioPorDiaRepository.get(id_horario_por_dia, id_grade);

    return data;
  }
}