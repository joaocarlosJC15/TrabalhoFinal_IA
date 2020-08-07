import { Grade } from "../../../entities/grade";

export interface ListGradeRepository {
  list(): Promise<Grade []>;
}