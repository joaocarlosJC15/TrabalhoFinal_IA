import { connection } from '../config/postgres-config';

import { AddPeriodoRepository } from "../../../../domain/protocols/database/periodo/add-periodo-repository";
import { AddPeriodoEntity } from "../../../../domain/usecases/periodo/add/add-periodo";
import { Periodo } from "../../../../domain/entities/periodo";
import { ListPeriodoRepository } from '../../../../domain/protocols/database/periodo/list-periodo-repository';
import { GetPeriodoRepository } from '../../../../domain/protocols/database/periodo/get-periodo-repository';

export class PeriodoRepository implements AddPeriodoRepository, ListPeriodoRepository, GetPeriodoRepository {
  async add (addPeriodoData: AddPeriodoEntity): Promise<Periodo> {
    const data = await connection('periodos').insert(addPeriodoData).returning('*');
    
    return data && this.periodoSerializer(data[0]);
  }

  async get(id_periodo: number, id_grade: number): Promise<Periodo> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'nome',
      'descricao'
    )
    .from('periodos')
    .where('fk_grade', id_grade)
    .where('id', id_periodo);

    return this.periodoSerializer(data[0]);
  }

  async list(id_grade: number): Promise<Periodo []> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'nome',
      'descricao'
    )
    .from('periodos')
    .where('fk_grade', id_grade);

    const periodos = [];

    for (let periodo of data) {
      periodos.push(this.periodoSerializer(periodo));
    }

    return periodos;
  }

  private periodoSerializer(data: any): Periodo {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      nome: data.nome,
      descricao: data.descricao,
    }  
  }
}