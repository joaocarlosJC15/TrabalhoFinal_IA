import { connection } from '../config/postgres-config';

import { AddPeriodoRepository } from "../../../../domain/protocols/database/periodo/add-periodo-repository";
import { AddPeriodoEntity } from "../../../../domain/usecases/periodo/add/add-periodo";
import { Periodo } from "../../../../domain/entities/periodo";

export class PeriodoRepository implements AddPeriodoRepository {
  async add (addPeriodoData: AddPeriodoEntity): Promise<Periodo> {
    const data = await connection('periodos').insert(addPeriodoData).returning('*');
    
    return data && this.PeriodoSerializer(data[0]);
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