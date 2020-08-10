import { Sala } from "../../../entities/sala";

export interface ListSalaRepository {
  list(id_grade: number): Promise<Sala []>;
}