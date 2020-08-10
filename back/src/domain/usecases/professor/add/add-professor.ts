import { Professor } from "../../../entities/professor";

export interface AddProfessorEntity {
  fk_grade: number;
  nome: string;
  descricao?: string;
  data_nascimento?: Date,
  email?: string
}

export interface AddProfessor {
  add(addProfessorData: AddProfessorEntity): Promise<Professor>
}