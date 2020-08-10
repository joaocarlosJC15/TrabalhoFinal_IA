import { connection } from '../config/postgres-config';

import { AddRestricaoSalaHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoSalaHorarioPorDia/add-restricaoSalaHorarioPorDia-repository";
import { AddRestricaoSalaHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoSalaHorarioPorDia";
import { ListRestricaoSalaHorarioPorDia } from '../../../../domain/usecases/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia';

export class RestricaoSalaHorarioPorDiaRepository implements AddRestricaoSalaHorarioPorDiaRepository, ListRestricaoSalaHorarioPorDia {
  async add (addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia> {
    const data = await connection('restricoes_salas_horarios_por_dia').insert(addRestricaoSalaHorarioPorDiaData).returning('*');
    
    return data && this.RestricaoSalaHorarioPorDiaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<RestricaoSalaHorarioPorDia []> {
    const data = await connection.select(
      'fk_horario_por_dia',
      'fk_sala'
    )
    .from('restricoes_salas_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_salas_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade);

    const restricoesSalaHorarioPorDia = [];

    for (let restricaoSalaHorarioPorDia of data) {
      restricoesSalaHorarioPorDia.push(this.RestricaoSalaHorarioPorDiaSerializer(restricaoSalaHorarioPorDia));
    }

    return restricoesSalaHorarioPorDia;
  }

  RestricaoSalaHorarioPorDiaSerializer(data: any): RestricaoSalaHorarioPorDia {
    return {
      fk_sala: data.fk_sala,
      fk_horario_por_dia: data.fk_horario_por_dia
    }  
  }
}