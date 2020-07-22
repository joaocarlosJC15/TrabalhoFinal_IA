export interface Professor {
  id: number;
  nome: string;
  descricao?: string;
  data_nascimento?: Date;
  email?: string;
  fk_grade: number;
}