import { connection } from '../config/postgres-config';

import { AddRestricaoSalaHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoSalaHorarioPorDia/add-restricaoSalaHorarioPorDia-repository";
import { AddRestricaoSalaHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoSalaHorarioPorDia";

export class RestricaoSalaHorarioPorDiaRepository implements AddRestricaoSalaHorarioPorDiaRepository {
  async add (addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia> {
    const data = await connection('restricoes_salas_horarios_por_dia').insert(addRestricaoSalaHorarioPorDiaData).returning('*');
    
    return data && this.RestricaoSalaHorarioPorDiaSerializer(data[0]);
  }

  RestricaoSalaHorarioPorDiaSerializer(data: any): RestricaoSalaHorarioPorDia {
    return {
      fk_sala: data.fk_sala,
      fk_horario_por_dia: data.fk_horario_por_dia
    }  
  }
}