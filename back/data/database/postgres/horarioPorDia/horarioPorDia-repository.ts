import { connection } from '../config/postgres-config';

import { AddHorarioPorDiaRepository } from "../../../../domain/protocols/database/horarioPorDia/add-horarioPorDia-repository";
import { AddHorarioPorDiaEntity } from "../../../../domain/usecases/horarioPorDia/add/add-horarioPorDia";
import { HorarioPorDia } from "../../../../domain/entities/horarioPorDia";
import { ListHorarioPorDiaRepository } from '../../../../domain/protocols/database/horarioPorDia/list-horarioPorDia-repository';

export class HorarioPorDiaRepository implements AddHorarioPorDiaRepository, ListHorarioPorDiaRepository {
  async add (addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia> {
    const data = await connection('horarios_por_dia').insert(addHorarioPorDiaData).returning('*');
    
    return data && this.HorarioPorDiaSerializer(data[0]);
  }

  async list(id_grade: number): Promise<HorarioPorDia []> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'horario_inicio',
      'horario_termino',
      'fk_dia_semana',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as qtde_aulas_simultaneas`)
    )
    .from('horarios_por_dia')
    .where('fk_grade', id_grade);

    const horariosPorDia = [];

    for (let horario of data) {
      horariosPorDia.push(this.HorarioPorDiaSerializer(horario));
    }

    return horariosPorDia;
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