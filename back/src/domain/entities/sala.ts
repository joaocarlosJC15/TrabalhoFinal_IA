export interface Sala {
  id: number;
  nome: string;
  descricao?: string;
  fk_grade: number;
}


export function deserializeSala(data: any): Sala {
  return {
    id: data['salas_id'],
    nome: data['salas_nome'],
    descricao: data['salas_descricao'],
    fk_grade: data['salas_fk_grade'],
  };
}