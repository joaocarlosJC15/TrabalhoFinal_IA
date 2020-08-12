import { ListDiaSemanaRepository } from "../../../protocols/database/diaSemana/list-diaSemana-repository";
import { DiaSemana } from "../../../entities/diaSemana";
import { ListDiaSemana } from "./list-diaSemana";

export class ListDiaSemanaUseCase implements ListDiaSemana {
  constructor(
    private readonly listDiaSemanaRepository: ListDiaSemanaRepository
  ) {
    this.listDiaSemanaRepository = listDiaSemanaRepository;
  }

  async list (): Promise<DiaSemana []> {
    const data = await this.listDiaSemanaRepository.list();

    return data;
  }
}