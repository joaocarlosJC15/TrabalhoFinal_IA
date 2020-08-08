import { AddProfessor, AddProfessorEntity } from "./add-professor";
import { Professor } from "../../../entities/professor";
import { AddProfessorRepository } from "../../../protocols/database/professor/add-professor-repository";

export class AddProfessorUseCase implements AddProfessor {
  constructor(
    private readonly addProfessorRepository: AddProfessorRepository
  ) {
    this.addProfessorRepository = addProfessorRepository
  }

  async add(addProfessorData: AddProfessorEntity): Promise<Professor> {
    const professor = await this.addProfessorRepository.add(addProfessorData);

    return professor;
  }
}