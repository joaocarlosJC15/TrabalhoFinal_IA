import { connection } from '../config/postgres-config';

import { AddMateriaRepository } from "../../../../domain/protocols/database/materia/add-materia-repository";
import { AddMateriaEntity } from "../../../../domain/usecases/materia/add/add-materia";
import { Materia } from "../../../../domain/entities/materia";
import { ListMateriaRepository } from '../../../../domain/protocols/database/materia/list-materia-repository';

export class MateriaRepository implements AddMateriaRepository, ListMateriaRepository {
  async add (addMateriaData: AddMateriaEntity): Promise<Materia> {
    const data = await connection('materias').insert(addMateriaData).returning('*');
    
    return data && this.MateriaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<Materia []> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'fk_professor',
      'fk_periodo',
      'nome',
      'descricao',
      'quantidade_aulas'
    )
    .from('materias')
    .where('fk_grade', id_grade);

    const Materias= [];

    for (let Materia of data) {
      Materias.push(this.MateriaSerializer(Materia));
    }

    return data;
  }

  MateriaSerializer(data: any): Materia {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      fk_professor: data.fk_professor,
      fk_periodo: data.fk_periodo,
      nome: data.nome,
      descricao: data.descricao,
      quantidade_aulas: data.quantidade_aulas
    }  
  }
}