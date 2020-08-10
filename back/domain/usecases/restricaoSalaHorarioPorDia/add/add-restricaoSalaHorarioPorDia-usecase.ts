import { AddRestricaoSalaHorarioPorDia, AddRestricaoSalaHorarioPorDiaEntity } from "./add-restricaoSalaHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";
import { AddRestricaoSalaHorarioPorDiaRepository } from "../../../protocols/database/restricaoSalaHorarioPorDia/add-restricaoSalaHorarioPorDia-repository";

export class AddRestricaoSalaHorarioPorDiaUseCase implements AddRestricaoSalaHorarioPorDia {
  constructor(
    private readonly addRestricaoSalaHorarioPorDiaRepository: AddRestricaoSalaHorarioPorDiaRepository
  ) {
    this.addRestricaoSalaHorarioPorDiaRepository = addRestricaoSalaHorarioPorDiaRepository
  }

  async add(addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia> {
    const restricaoSalaHorarioPorDia = await this.addRestricaoSalaHorarioPorDiaRepository.add(addRestricaoSalaHorarioPorDiaData);

    return restricaoSalaHorarioPorDia;
  }
}