import { connection } from '../config/postgres-config';

import { AddProfessorRepository } from "../../../../domain/protocols/database/professor/add-professor-repository";
import { AddProfessorEntity } from "../../../../domain/usecases/professor/add/add-professor";
import { Professor } from "../../../../domain/entities/professor";

export class ProfessorRepository implements AddProfessorRepository {
  async add (addProfessorData: AddProfessorEntity): Promise<Professor> {
    const data = await connection('professores').insert(addProfessorData).returning('*');
    
    return data && this.ProfessorSerializer(data[0]);
  }

  async list(id_grade: number): Promise<Professor []> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'nome',
      'descricao',
      'data_nascimento',
      'email'
    )
    .from('professores')
    .where('fk_grade', id_grade);

    const professores = [];

    for (let professor of data) {
      professores.push(this.ProfessorSerializer(professor));
    }

    return professores;
  }

  private ProfessorSerializer(data: any): Professor {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      nome: data.nome,
      descricao: data.descricao,
      data_nascimento: data.data_nascimento,
      email: data.email
    }  
  }
}