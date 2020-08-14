import { GetProfessorRepository } from "../../../protocols/database/professor/get-professor-repository";
import { Professor } from "../../../entities/professor";
import { GetProfessor } from "./get-professor";

export class GetProfessorUseCase implements GetProfessor {
  constructor(
    private readonly GetProfessorRepository: GetProfessorRepository
  ) {
    this.GetProfessorRepository = GetProfessorRepository;
  }

  async get(id_professor: number, id_grade: number): Promise<Professor> {
    const data = await this.GetProfessorRepository.get(id_professor,id_grade);

    return data;
  }
}