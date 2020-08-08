import { connection } from '../config/postgres-config';

import { AddSalaRepository } from "../../../../domain/protocols/database/sala/add-sala-repository";
import { AddSalaEntity } from "../../../../domain/usecases/sala/add/add-sala";
import { Sala } from "../../../../domain/entities/sala";

export class SalaRepository implements AddSalaRepository {
  async add (addSalaData: AddSalaEntity): Promise<Sala> {
    const data = await connection('salas').insert(addSalaData).returning('*');
    
    return data && this.salaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<Sala []> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'nome',
      'descricao'
    )
    .from('salas')
    .where('fk_grade', id_grade);

    const salas= [];

    for (let sala of data) {
      salas.push(this.salaSerializer(sala));
    }

    return data;
  }

  salaSerializer(data: any): Sala {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      nome: data.nome,
      descricao: data.descricao,
    }  
  }
}