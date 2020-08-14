import { GetPeriodoRepository } from "../../../protocols/database/periodo/get-periodo-repository";
import { Periodo } from "../../../entities/periodo";
import { GetPeriodo } from "./get-periodo";

export class GetPeriodoUseCase implements GetPeriodo {
  constructor(
    private readonly GetPeriodoRepository: GetPeriodoRepository
  ) {
    this.GetPeriodoRepository = GetPeriodoRepository;
  }

  async get (id_periodo: number, id_grade: number): Promise<Periodo> {
    const data = await this.GetPeriodoRepository.get(id_periodo, id_grade);

    return data;
  }
}