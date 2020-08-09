import { connection } from '../config/postgres-config';

import { AddRestricaoHorarioPorDiaPeriodoRepository } from "../../../../domain/protocols/database/restricaoHorarioPorDiaPeriodo/add-restricaoHorarioPorDiaPeriodo-repository";
import { AddRestricaoHorarioPorDiaPeriodoEntity } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo";
import { RestricaoHorarioPorDiaPeriodo } from "../../../../domain/entities/restricoes/restricaoHorarioPorDiaPeriodo";

export class RestricaoHorarioPorDiaPeriodoRepository implements AddRestricaoHorarioPorDiaPeriodoRepository {
  async add (addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo> {
    const data = await connection('restricoes_horarios_por_dia_periodos').insert(addRestricaoHorarioPorDiaPeriodoData).returning('*');
    
    return data && this.RestricaoHorarioPorDiaPeriodoSerializer(data[0]);
  }

  RestricaoHorarioPorDiaPeriodoSerializer(data: any): RestricaoHorarioPorDiaPeriodo {
    return {
      fk_horario: data.fk_horario,
      fk_periodo: data.fk_periodo
    }  
  }
}