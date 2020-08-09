import { AddRestricaoHorarioPorDiaPeriodo, AddRestricaoHorarioPorDiaPeriodoEntity } from "./add-restricaoHorarioPorDiaPeriodo";
import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";
import { AddRestricaoHorarioPorDiaPeriodoRepository } from "../../../protocols/database/restricaoHorarioPorDiaPeriodo/add-restricaoHorarioPorDiaPeriodo-repository";

export class AddRestricaoHorarioPorDiaPeriodoUseCase implements AddRestricaoHorarioPorDiaPeriodo {
  constructor(
    private readonly addRestricaoHorarioPorDiaPeriodoRepository: AddRestricaoHorarioPorDiaPeriodoRepository
  ) {
    this.addRestricaoHorarioPorDiaPeriodoRepository = addRestricaoHorarioPorDiaPeriodoRepository
  }

  async add(addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo> {
    const restricaoHorarioPorDiaPeriodo = await this.addRestricaoHorarioPorDiaPeriodoRepository.add(addRestricaoHorarioPorDiaPeriodoData);

    return restricaoHorarioPorDiaPeriodo;
  }
}