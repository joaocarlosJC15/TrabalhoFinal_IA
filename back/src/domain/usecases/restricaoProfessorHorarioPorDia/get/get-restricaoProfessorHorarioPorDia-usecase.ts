import { GetRestricaoProfessorHorarioPorDiaRepository } from "../../../protocols/database/restricaoProfessorHorarioPorDia/get-restricaoProfessorHorarioPorDia-repository";
import { RestricaoProfessorHorarioPorDia } from "../../../entities/restricoes/restricaoProfessorHorarioPorDia";
import { GetRestricaoProfessorHorarioPorDia } from "./get-restricaoProfessorHorarioPorDia";

export class GetRestricaoProfessorHorarioPorDiaUseCase implements GetRestricaoProfessorHorarioPorDia {
  constructor(
    private readonly getRestricaoProfessorHorarioPorDiaRepository: GetRestricaoProfessorHorarioPorDiaRepository
  ) {
    this.getRestricaoProfessorHorarioPorDiaRepository = getRestricaoProfessorHorarioPorDiaRepository;
  }

  async get(id_professor: number, id_grade: number): Promise<RestricaoProfessorHorarioPorDia []> {
    const data = await this.getRestricaoProfessorHorarioPorDiaRepository.get(id_professor, id_grade);

    return data;
  }
}