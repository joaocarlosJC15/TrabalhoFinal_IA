import { Periodo } from "../../../entities/periodo";

export interface AddPeriodoEntity {
  fk_grade: number;
  nome: string;
  descricao?: string;
}

export interface AddPeriodo {
  add(addPeriodoData: AddPeriodoEntity): Promise<Periodo>
}