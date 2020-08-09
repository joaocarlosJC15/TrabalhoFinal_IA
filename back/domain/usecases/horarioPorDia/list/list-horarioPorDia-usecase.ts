import { ListHorarioPorDiaRepository } from "../../../protocols/database/horarioPorDia/list-horarioPorDia-repository";
import { HorarioPorDia } from "../../../entities/horarioPorDia";
import { ListHorarioPorDia } from "./list-horarioPorDia";

export class ListHorarioPorDiaUseCase implements ListHorarioPorDia {
  constructor(
    private readonly listHorarioPorDiaRepository: ListHorarioPorDiaRepository
  ) {
    this.listHorarioPorDiaRepository = listHorarioPorDiaRepository;
  }

  async list (id_grade: number): Promise<HorarioPorDia []> {
    const data = await this.listHorarioPorDiaRepository.list(id_grade);

    return data;
  }
}