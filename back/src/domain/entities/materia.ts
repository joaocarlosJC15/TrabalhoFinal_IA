import { Professor, deserializeProfessor } from "./professor";
import { Periodo } from "./periodo";

export interface Materia {
  id: number;
  nome: string;
  descricao?: string;
  quantidade_aulas: number;
  fk_professor: number;
  fk_periodo: number;
  fk_grade: number;
  professor?: Professor;
  periodo?: Periodo;
}

export function deserializeMateria(data: any): Materia {
  return {
    id: data['materias_id'],
    nome: data['materias_nome'],
    descricao: data['materias_descricao'],
    quantidade_aulas: data['materias_quantidade_aulas'],
    fk_professor: data['materias_fk_professor'],
    fk_periodo: data['materias_fk_periodo'],
    fk_grade: data['materias_fk_grade'],
    professor: deserializeProfessor(data)
  };
}