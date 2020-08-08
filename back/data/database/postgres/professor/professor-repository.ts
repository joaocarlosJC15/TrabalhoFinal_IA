import { connection } from '../config/postgres-config';

import { AddProfessorRepository } from "../../../../domain/protocols/database/professor/add-professor-repository";
import { AddProfessorEntity } from "../../../../domain/usecases/professor/add/add-professor";
import { Professor } from "../../../../domain/entities/professor";

export class ProfessorRepository implements AddProfessorRepository {
  async add (addProfessorData: AddProfessorEntity): Promise<Professor> {
    const data = await connection('professores').insert(addProfessorData).returning('*');
    
    return data && this.ProfessorSerializer(data[0]);
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