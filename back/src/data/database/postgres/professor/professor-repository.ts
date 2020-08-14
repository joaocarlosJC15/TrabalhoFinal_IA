import { connection } from '../config/postgres-config';

import { AddProfessorRepository } from "../../../../domain/protocols/database/professor/add-professor-repository";
import { AddProfessorEntity } from "../../../../domain/usecases/professor/add/add-professor";
import { Professor } from "../../../../domain/entities/professor";
import { ListProfessorRepository } from '../../../../domain/protocols/database/professor/list-professor-repository';
import { GetProfessorRepository } from '../../../../domain/protocols/database/professor/get-professor-repository';

export class ProfessorRepository implements AddProfessorRepository, ListProfessorRepository, GetProfessorRepository {
  async add (addProfessorData: AddProfessorEntity): Promise<Professor> {
    const data = await connection('professores').insert(addProfessorData).returning('*');
    
    return data && this.professorSerializer(data[0]);
  }

  async get(id_professor: number, id_grade: number): Promise<Professor> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'nome',
      'descricao',
      'data_nascimento',
      'email'
    )
    .from('professores')
    .where('fk_grade', id_grade)
    .where('id', id_professor);

    return this.professorSerializer(data[0]);
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
      professores.push(this.professorSerializer(professor));
    }

    return professores;
  }

  private professorSerializer(data: any): Professor {
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