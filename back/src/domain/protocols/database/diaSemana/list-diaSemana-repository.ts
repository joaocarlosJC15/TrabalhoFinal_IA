import { DiaSemana } from "../../../entities/diaSemana";

export interface ListDiaSemanaRepository {
  list(): Promise<DiaSemana []>;
}