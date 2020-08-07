import { Sala } from "../../../entities/sala";

export interface ListSalaRepository {
  list(): Promise<Sala []>;
}