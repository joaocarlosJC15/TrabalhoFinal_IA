import { ListRestricaoProfessorHorarioPorDiaRepository } from "../../../protocols/database/restricaoProfessorHorarioPorDia/list-restricaoProfessorHorarioPorDia-repository";
import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";
import { ListRestricaoProfessorHorarioPorDia } from "./list-restricaoProfessorHorarioPorDia";

export class ListRestricaoProfessorHorarioPorDiaUseCase implements ListRestricaoProfessorHorarioPorDia {
  constructor(
    private readonly listRestricaoProfessorHorarioPorDiaRepository: ListRestricaoProfessorHorarioPorDiaRepository
  ) {
    this.listRestricaoProfessorHorarioPorDiaRepository = listRestricaoProfessorHorarioPorDiaRepository;
  }

  async list (id_grade: number): Promise<RestricaoProfessorHorarioPorDia []> {
    const data = await this.listRestricaoProfessorHorarioPorDiaRepository.list(id_grade);

    return data;
  }
}