import { Grade } from "../../../entities/grade";

export interface ListGrade {
  list(): Promise<Grade []>
}