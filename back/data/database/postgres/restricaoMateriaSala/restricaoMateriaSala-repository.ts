import { connection } from '../config/postgres-config';

import { AddRestricaoMateriaSalaRepository } from "../../../../domain/protocols/database/restricaoMateriaSala/add-restricaoMateriaSala-repository";
import { AddRestricaoMateriaSalaEntity } from "../../../../domain/usecases/restricaoMateriaSala/add/add-restricaoMateriaSala";
import { RestricaoMateriaSala } from "../../../../domain/entities/restricoes/restricaoMateriaSala";

export class RestricaoMateriaSalaRepository implements AddRestricaoMateriaSalaRepository {
  async add (addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala> {
    const data = await connection('restricoes_materias_salas').insert(addRestricaoMateriaSalaData).returning('*');
    
    return data && this.RestricaoMateriaSalaSerializer(data[0]);
  }

  RestricaoMateriaSalaSerializer(data: any): RestricaoMateriaSala {
    return {
      fk_sala: data.fk_sala,
      fk_materia: data.fk_materia
    }  
  }
}