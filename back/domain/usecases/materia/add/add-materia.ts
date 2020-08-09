import { Materia} from "../../../entities/materia";

export interface AddMateriaEntity {
  nome: string;
  descricao?: string;
  quantidade_aulas: number;
  fk_professor: number;
  fk_periodo: number;
  fk_grade: number;
}

export interface AddMateria{
  add(addMateriaData: AddMateriaEntity): Promise<Materia>
}