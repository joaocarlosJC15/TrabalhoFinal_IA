import { connection } from '../config/postgres-config';

import { AddMateriaRepository } from "../../../../domain/protocols/database/materia/add-materia-repository";
import { AddMateriaEntity } from "../../../../domain/usecases/materia/add/add-materia";
import { Materia, deserializeMateria } from "../../../../domain/entities/materia";
import { ListMateriaRepository } from '../../../../domain/protocols/database/materia/list-materia-repository';
import { GetMateriaRepository } from '../../../../domain/protocols/database/materia/get-materia-repository';

export class MateriaRepository implements AddMateriaRepository, ListMateriaRepository, GetMateriaRepository {
  async add (addMateriaData: AddMateriaEntity): Promise<Materia> {
    const data = await connection('materias').insert(addMateriaData).returning('*');
    
    return data && this.MateriaSerializer(data[0]);
  }

  async get(id_materia: number, id_grade: number): Promise<Materia> {
    const data = await connection.select(
      'materias.id as materias_id',
      'materias.nome as materias_nome',
      'materias.descricao as materias_descricao',
      'materias.quantidade_aulas as materias_quantidade_aulas',
      'materias.fk_professor as materias_fk_professor',
      'materias.fk_periodo as materias_fk_periodo',
      'materias.fk_grade as materias_fk_grade',
      'professores.id as professores_id',
      'professores.nome as professores_nome',
      'professores.descricao as professores_descricao',
      'professores.data_nascimento as professores_data_nascimento',
      'professores.email as professores_email',
      'professores.fk_grade as professores_fk_grade',
      'periodos.id as periodos_id',
      'periodos.nome as periodos_nome',
      'periodos.descricao as periodos_descricao',
      'periodos.fk_grade as periodos_fk_grade',
    )
    .from('materias')
    .join('professores', 'materias.fk_professor', 'professores.id')
    .join('periodos', 'materias.fk_periodo', 'periodos.id')
    .where('materias.fk_grade', id_grade)
    .where('materias.id', id_materia);
    
    return this.MateriaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<Materia []> {
    const data = await connection.select(
      'materias.id as materias_id',
      'materias.nome as materias_nome',
      'materias.descricao as materias_descricao',
      'materias.quantidade_aulas as materias_quantidade_aulas',
      'materias.fk_professor as materias_fk_professor',
      'materias.fk_periodo as materias_fk_periodo',
      'materias.fk_grade as materias_fk_grade',
      'professores.id as professores_id',
      'professores.nome as professores_nome',
      'professores.descricao as professores_descricao',
      'professores.data_nascimento as professores_data_nascimento',
      'professores.email as professores_email',
      'professores.fk_grade as professores_fk_grade',
      'periodos.id as periodos_id',
      'periodos.nome as periodos_nome',
      'periodos.descricao as periodos_descricao',
      'periodos.fk_grade as periodos_fk_grade',
    )
    .from('materias')
    .join('professores', 'materias.fk_professor', 'professores.id')
    .join('periodos', 'materias.fk_periodo', 'periodos.id')
    .where('materias.fk_grade', id_grade);

    const materias= [];

    for (let materia of data) {
      materias.push(this.MateriaSerializer(materia));
    }

    return materias;
  }

  MateriaSerializer(data: any): Materia {
    return deserializeMateria(data)
  }
}