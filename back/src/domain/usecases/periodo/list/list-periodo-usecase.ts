import { ListPeriodoRepository } from "../../../protocols/database/periodo/list-periodo-repository";
import { Periodo } from "../../../entities/periodo";
import { ListPeriodo } from "./list-periodo";

export class ListPeriodoUseCase implements ListPeriodo {
  constructor(
    private readonly listPeriodoRepository: ListPeriodoRepository
  ) {
    this.listPeriodoRepository = listPeriodoRepository;
  }

  async list (id_grade: number): Promise<Periodo []> {
    const data = await this.listPeriodoRepository.list(id_grade);

    return data;
  }
}