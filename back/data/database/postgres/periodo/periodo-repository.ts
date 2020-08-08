import { connection } from '../config/postgres-config';

import { AddPeriodoRepository } from "../../../../domain/protocols/database/periodo/add-periodo-repository";
import { AddPeriodoEntity } from "../../../../domain/usecases/periodo/add/add-periodo";
import { Periodo } from "../../../../domain/entities/periodo";

export class PeriodoRepository implements AddPeriodoRepository {
  async add (addPeriodoData: AddPeriodoEntity): Promise<Periodo> {
    const data = await connection('periodos').insert(addPeriodoData).returning('*');
    
    return data && this.PeriodoSerializer(data[0]);
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

    const Periodos= [];

    for (let Periodo of data) {
      Periodos.push(this.PeriodoSerializer(Periodo));
    }

    return data;
  }

  private PeriodoSerializer(data: any): Periodo {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      nome: data.nome,
      descricao: data.descricao,
    }  
  }
}