export interface Professor {
  id: number;
  nome: string;
  descricao?: string;
  data_nascimento?: Date;
  email?: string;
  fk_grade: number;
}

export function deserializeProfessor(data: any): Professor {
  return {
    id: data['professores_id'],
    nome: data['professores_nome'],
    descricao: data['professores_descricao'],
    data_nascimento: data['professores_data_nascimento'],
    email: data['professores_email'],
    fk_grade: data['professores_fk_grade']
  };
}