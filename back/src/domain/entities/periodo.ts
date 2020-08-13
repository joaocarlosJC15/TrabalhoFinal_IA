export interface Periodo {
  id: number;
  nome: string;
  descricao?: string;
  fk_grade: number;
}

export function deserializePeriodo(data: any): Periodo {
  return {
    id: data['periodos_id'],
    nome: data['periodos_nome'],
    descricao: data['periodos_descricao'],
    fk_grade: data['periodos_fk_grade']
  };
}