import { Sala } from "../../../entities/sala";

export interface GetSala {
  get(id_sala: number, id_grade: number): Promise<Sala>
}