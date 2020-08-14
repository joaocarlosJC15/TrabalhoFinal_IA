import { Sala } from "../../../entities/sala";

export interface GetSalaRepository {
  get(id_sala: number, id_grade: number): Promise<Sala>;
}