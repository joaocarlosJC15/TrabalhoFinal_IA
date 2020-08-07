import { Sala } from "../../../entities/sala";

export interface ListSala {
  list(): Promise<Sala []>
}