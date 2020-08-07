import { AddGrade, AddGradeEntity } from "./add-grade";
import { Grade } from "../../../entities/grade";
import { AddGradeRepository } from "../../../protocols/database/grade/add-grade-repository";

export class AddGradeUseCase implements AddGrade {
  constructor(
    private readonly addGradeRepository: AddGradeRepository
  ) {
    this.addGradeRepository = addGradeRepository;
  }

  async add(addGrade: AddGradeEntity): Promise<Grade> {
    const grade = await this.addGradeRepository.add(addGrade);

    return grade;
  }
}