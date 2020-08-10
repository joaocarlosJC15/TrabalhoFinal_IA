import { connection } from '../config/postgres-config';

import { AddRestricaoMateriaSalaRepository } from "../../../../domain/protocols/database/restricaoMateriaSala/add-restricaoMateriaSala-repository";
import { AddRestricaoMateriaSalaEntity } from "../../../../domain/usecases/restricaoMateriaSala/add/add-restricaoMateriaSala";
import { RestricaoMateriaSala } from "../../../../domain/entities/restricoes/restricaoMateriaSala";
import { ListRestricaoMateriaSalaRepository } from '../../../../domain/protocols/database/restricaoMateriaSala/list-restricaoMateriaSala-repository';

export class RestricaoMateriaSalaRepository implements AddRestricaoMateriaSalaRepository, ListRestricaoMateriaSalaRepository {
  async add (addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala> {
    const data = await connection('restricoes_materias_salas').insert(addRestricaoMateriaSalaData).returning('*');
    
    return data && this.RestricaoMateriaSalaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<RestricaoMateriaSala []> {
    const data = await connection.select(
      'fk_materia',
      'fk_sala'
    )
    .from('restricoes_materias_salas')
    .join('materias', 'restricoes_materias_salas.fk_materia', 'materias.id')
    .where('materias.fk_grade', id_grade);

    const restricoesMateriaSala = [];

    for (let restricaoMateriaSala of data) {
      restricoesMateriaSala.push(this.RestricaoMateriaSalaSerializer(restricaoMateriaSala));
    }

    return restricoesMateriaSala;
  }

  RestricaoMateriaSalaSerializer(data: any): RestricaoMateriaSala {
    return {
      fk_sala: data.fk_sala,
      fk_materia: data.fk_materia
    }  
  }
}