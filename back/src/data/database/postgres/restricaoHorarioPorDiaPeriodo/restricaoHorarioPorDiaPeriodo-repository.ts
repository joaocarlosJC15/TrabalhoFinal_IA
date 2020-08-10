import { connection } from '../config/postgres-config';

import { AddRestricaoHorarioPorDiaPeriodoRepository } from "../../../../domain/protocols/database/restricaoHorarioPorDiaPeriodo/add-restricaoHorarioPorDiaPeriodo-repository";
import { AddRestricaoHorarioPorDiaPeriodoEntity } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo";
import { RestricaoHorarioPorDiaPeriodo } from "../../../../domain/entities/restricoes/restricaoHorarioPorDiaPeriodo";
import { ListRestricaoHorarioPorDiaPeriodo } from '../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo';

export class RestricaoHorarioPorDiaPeriodoRepository implements AddRestricaoHorarioPorDiaPeriodoRepository, ListRestricaoHorarioPorDiaPeriodo {
  async add (addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo> {
    const data = await connection('restricoes_horarios_por_dia_periodos').insert(addRestricaoHorarioPorDiaPeriodoData).returning('*');
    
    return data && this.RestricaoHorarioPorDiaPeriodoSerializer(data[0]);
  }

  async list(id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []> {
    const data = await connection.select(
      'fk_horario',
      'fk_periodo'
    )
    .from('restricoes_horarios_por_dia_periodos')
    .join('horarios_por_dia', 'restricoes_horarios_por_dia_periodos.fk_horario', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade);

    const restricoesHorarioPorDiaPeriodo = [];

    for (let restricaoHorarioPorDiaPeriodo of data) {
      restricoesHorarioPorDiaPeriodo.push(this.RestricaoHorarioPorDiaPeriodoSerializer(restricaoHorarioPorDiaPeriodo));
    }

    return restricoesHorarioPorDiaPeriodo;
  }

  RestricaoHorarioPorDiaPeriodoSerializer(data: any): RestricaoHorarioPorDiaPeriodo {
    return {
      fk_horario: data.fk_horario,
      fk_periodo: data.fk_periodo
    }  
  }
}