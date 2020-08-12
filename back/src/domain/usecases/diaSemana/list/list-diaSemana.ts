import { DiaSemana } from "../../../entities/diaSemana";

export interface ListDiaSemana {
  list(): Promise<DiaSemana []>
}