import { connection } from '../config/postgres-config';

import { AddRestricaoMateriaSalaRepository } from "../../../../domain/protocols/database/restricaoMateriaSala/add-restricaoMateriaSala-repository";
import { AddRestricaoMateriaSalaEntity } from "../../../../domain/usecases/restricaoMateriaSala/add/add-restricaoMateriaSala";
import { RestricaoMateriaSala, deserializeRestricaoMateriaSala } from "../../../../domain/entities/restricoes/restricaoMateriaSala";
import { ListRestricaoMateriaSalaRepository } from '../../../../domain/protocols/database/restricaoMateriaSala/list-restricaoMateriaSala-repository';
import { GetRestricaoMateriaSalaRepository } from '../../../../domain/protocols/database/restricaoMateriaSala/get-restricaoMateriaSala-repository';

export class RestricaoMateriaSalaRepository implements AddRestricaoMateriaSalaRepository, ListRestricaoMateriaSalaRepository, GetRestricaoMateriaSalaRepository {
  async add (addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala> {
    const data = await connection('restricoes_materias_salas').insert(addRestricaoMateriaSalaData).returning('*');
    
    return data && this.restricaoMateriaSalaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<RestricaoMateriaSala []> {
    const data = await connection.select(
      'fk_materia as restricoes_materias_salas_fk_materia',
      'fk_sala as restricoes_materias_salas_fk_sala',
      'salas.id as salas_id',
      'salas.nome as salas_nome',
      'salas.descricao as salas_descricao',
      'salas.fk_grade as salas_fk_grade'
    )
    .from('restricoes_materias_salas')
    .join('materias', 'restricoes_materias_salas.fk_materia', 'materias.id')
    .join('salas', 'restricoes_materias_salas.fk_sala', 'salas.id')
    .where('materias.fk_grade', id_grade);

    const restricoesMateriaSala = [];

    for (let restricaoMateriaSala of data) {
      restricoesMateriaSala.push(this.restricaoMateriaSalaSerializer(restricaoMateriaSala));
    }

    return restricoesMateriaSala;
  }

  async get(id_materia: number, id_grade: number): Promise<RestricaoMateriaSala []> {
    const data = await connection.select(
      'fk_materia as restricoes_materias_salas_fk_materia',
      'fk_sala as restricoes_materias_salas_fk_sala',
      'salas.id as salas_id',
      'salas.nome as salas_nome',
      'salas.descricao as salas_descricao',
      'salas.fk_grade as salas_fk_grade'
    )
    .from('restricoes_materias_salas')
    .join('materias', 'restricoes_materias_salas.fk_materia', 'materias.id')
    .join('salas', 'restricoes_materias_salas.fk_sala', 'salas.id')
    .where('materias.fk_grade', id_grade)
    .where('restricoes_materias_salas.fk_materia', id_materia);

    const restricoesMateriaSala = [];

    for (let restricaoMateriaSala of data) {
      restricoesMateriaSala.push(this.restricaoMateriaSalaSerializer(restricaoMateriaSala));
    }

    return restricoesMateriaSala;
  }

  private restricaoMateriaSalaSerializer(data: any): RestricaoMateriaSala {
    return deserializeRestricaoMateriaSala(data);
  }
}