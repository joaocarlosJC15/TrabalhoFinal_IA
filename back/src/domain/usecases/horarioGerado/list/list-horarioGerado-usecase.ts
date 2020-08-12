import { ListHorarioGeradoRepository } from "../../../protocols/database/horarioGerado/list-horarioGerado-repository";
import { HorarioGerado } from "../../../entities/horarioGerado";
import { ListHorarioGerado } from "./list-horarioGerado";

export class ListHorarioGeradoUseCase implements ListHorarioGerado {
  constructor(
    private readonly listHorarioGeradoRepository: ListHorarioGeradoRepository
  ) {
    this.listHorarioGeradoRepository = listHorarioGeradoRepository;
  }

  async list (id_grade: number, id_resultado_algoGen: number): Promise<HorarioGerado []> {
    const data = await this.listHorarioGeradoRepository.list(id_grade, id_resultado_algoGen);

    return data;
  }
}