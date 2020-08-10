import { Sala } from "../../../entities/sala";

export interface AddSalaEntity {
  fk_grade: number;
  nome: string;
  descricao?: string;
}

export interface AddSala {
  add(addSalaData: AddSalaEntity): Promise<Sala>
}