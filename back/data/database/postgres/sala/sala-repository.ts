import { connection } from '../config/postgres-config';

import { AddSalaRepository } from "../../../../domain/protocols/database/sala/add-sala-repository";
import { AddSalaEntity } from "../../../../domain/usecases/sala/add/add-sala";
import { Sala } from "../../../../domain/entities/sala";

export class SalaRepository implements AddSalaRepository {
  async add (addSalaData: AddSalaEntity): Promise<Sala> {
    const data = await connection('salas').insert(addSalaData).returning('*');
    
    return data && this.salaSerializer(data[0]);
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