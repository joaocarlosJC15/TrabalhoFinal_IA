import { Sala } from "../sala";

export interface RestricaoMateriaSala {
  fk_materia: number;
  fk_sala: number;
  sala: Sala;
}