import { AddGradeEntity } from "../../../usecases/grade/add/add-grade";
import { Grade } from "../../../entities/grade";

export interface AddGradeRepository {
  add (addGradeData: AddGradeEntity): Promise<Grade>;
}