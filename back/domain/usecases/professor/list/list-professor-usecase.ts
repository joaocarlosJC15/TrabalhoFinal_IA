import { ListProfessorRepository } from "../../../protocols/database/professor/list-professor-repository";
import { Professor } from "../../../entities/professor";
import { ListProfessor } from "./list-professor";

export class ListProfessorUseCase implements ListProfessor {
  constructor(
    private readonly listProfessorRepository: ListProfessorRepository
  ) {
    this.listProfessorRepository = listProfessorRepository;
  }

  async list (id_grade: number): Promise<Professor []> {
    const data = await this.listProfessorRepository.list(id_grade);

    return data;
  }
}