import { Professor } from "./professor";
import { Periodo } from "./periodo";

export interface Materia {
  id: number;
  nome: string;
  descricao?: string;
  quantidade_aulas: number;
  fk_professor: number;
  fk_periodo: number;
  fk_grade: number;
  professor: Professor;
  periodo: Periodo;
}