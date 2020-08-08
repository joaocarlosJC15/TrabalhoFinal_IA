import { Sala } from "../../../entities/sala";

export interface ListSala {
  list(id_grade: number): Promise<Sala []>
}