import { AddPeriodo, AddPeriodoEntity } from "./add-periodo";
import { Periodo } from "../../../entities/periodo";
import { AddPeriodoRepository } from "../../../protocols/database/periodo/add-periodo-repository";

export class AddPeriodoUseCase implements AddPeriodo {
  constructor(
    private readonly addPeriodoRepository: AddPeriodoRepository
  ) {
    this.addPeriodoRepository = addPeriodoRepository
  }

  async add(addPeriodoData: AddPeriodoEntity): Promise<Periodo> {
    const periodo = await this.addPeriodoRepository.add(addPeriodoData);

    return periodo;
  }
}