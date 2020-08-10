import { AddRestricaoProfessorHorarioPorDia, AddRestricaoProfessorHorarioPorDiaEntity } from "./add-restricaoProfessorHorarioPorDia";
import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";
import { AddRestricaoProfessorHorarioPorDiaRepository } from "../../../protocols/database/restricaoProfessorHorarioPorDia/add-restricaoProfessorHorarioPorDia-repository";

export class AddRestricaoProfessorHorarioPorDiaUseCase implements AddRestricaoProfessorHorarioPorDia {
  constructor(
    private readonly addRestricaoProfessorHorarioPorDiaRepository: AddRestricaoProfessorHorarioPorDiaRepository
  ) {
    this.addRestricaoProfessorHorarioPorDiaRepository = addRestricaoProfessorHorarioPorDiaRepository
  }

  async add(addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia> {
    const restricaoProfessorHorarioPorDia = await this.addRestricaoProfessorHorarioPorDiaRepository.add(addRestricaoProfessorHorarioPorDiaData);

    return restricaoProfessorHorarioPorDia;
  }
}