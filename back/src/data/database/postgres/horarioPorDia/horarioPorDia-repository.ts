import { connection } from '../config/postgres-config';

import { AddHorarioPorDiaRepository } from "../../../../domain/protocols/database/horarioPorDia/add-horarioPorDia-repository";
import { AddHorarioPorDiaEntity } from "../../../../domain/usecases/horarioPorDia/add/add-horarioPorDia";
import { HorarioPorDia } from "../../../../domain/entities/horarioPorDia";
import { ListHorarioPorDiaRepository } from '../../../../domain/protocols/database/horarioPorDia/list-horarioPorDia-repository';
import { GetHorarioPorDiaRepository } from '../../../../domain/protocols/database/horarioPorDia/get-horarioPorDia-repository';

export class HorarioPorDiaRepository implements AddHorarioPorDiaRepository, ListHorarioPorDiaRepository, GetHorarioPorDiaRepository {
  async add (addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia> {
    const data = await connection('horarios_por_dia').insert(addHorarioPorDiaData).returning('*');
    
    return data && this.horarioPorDiaSerializer(data[0]);
  }

  async get(id_horario_por_dia: number, id_grade: number): Promise<HorarioPorDia> {
    const data = await connection.select(
      'id',
      'fk_grade',
      'horario_inicio',
      'horario_termino',
      'fk_dia_semana',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as qtde_aulas_simultaneas`)
    )
    .from('horarios_por_dia')
    .where('fk_grade', id_grade)
    .where('id', id_horario_por_dia);

    return this.horarioPorDiaSerializer(data[0]);
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
      horariosPorDia.push(this.horarioPorDiaSerializer(horario));
    }

    return horariosPorDia;
  }

  private horarioPorDiaSerializer(data: any): HorarioPorDia {
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