import { Grade } from "../../../entities/grade";

export interface AddGradeEntity {
  nome: string;
  descricao?: string;
}

export interface AddGrade {
  add(addGradeData: AddGradeEntity): Promise<Grade>
}