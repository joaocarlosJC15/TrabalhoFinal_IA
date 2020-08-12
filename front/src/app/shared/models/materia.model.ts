import { Professor } from './professor.model';
import { Periodo } from './periodo.model';

export class Materia {
  constructor(
    public id: number,
    public nome: string,
    public quantidade_aulas: number,
    public fk_professor: number,
    public fk_periodo: number,
    public descricao?: string,
    public professor?: Professor,
    public periodo?: Periodo,
  ) {

  }

  static deserialize(data: any): Materia {
    const id = data.id;
    const nome = data.nome;
    const quantidade_aulas = data.quantidade_aulas;
    const fk_professor = data.fk_professor
    const fk_periodo = data.fk_periodo;
    const descricao = data.descricao;

    return new Materia(
      id, 
      nome, 
      quantidade_aulas, 
      fk_professor, 
      fk_periodo, 
      descricao
    );
  }
}