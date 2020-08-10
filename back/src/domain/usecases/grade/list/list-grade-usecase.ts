import { ListGradeRepository } from "../../../protocols/database/grade/list-grade-repository";
import { Grade } from "../../../entities/grade";
import { ListGrade } from "./list-grade";

export class ListGradeUseCase implements ListGrade {
  constructor(
    private readonly listGradeRepository: ListGradeRepository
  ) {
    this.listGradeRepository = listGradeRepository;
  }

  async list (): Promise<Grade []> {
    const data = await this.listGradeRepository.list();

    return data;
  }
}