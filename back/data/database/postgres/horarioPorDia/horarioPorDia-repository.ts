import { connection } from '../config/postgres-config';

import { AddHorarioPorDiaRepository } from "../../../../domain/protocols/database/horarioPorDia/add-horarioPorDia-repository";
import { AddHorarioPorDiaEntity } from "../../../../domain/usecases/horarioPorDia/add/add-horarioPorDia";
import { HorarioPorDia } from "../../../../domain/entities/horarioPorDia";

export class HorarioPorDiaRepository implements AddHorarioPorDiaRepository {
  async add (addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia> {
    const data = await connection('horarios_por_dia').insert(addHorarioPorDiaData).returning('*');
    
    return data && this.HorarioPorDiaSerializer(data[0]);
  }

  HorarioPorDiaSerializer(data: any): HorarioPorDia {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      horario_inicio: data.horario_inicio,
      horario_termino: data.horario_termino,
      qtde_aulas_simultaneas: data.qtde_aulas_simultaneas,
      fk_dia_semana: data.fk_dia_semana
    }  
  }
}