import { connection } from '../config/postgres-config';

import { AddRestricaoHorarioPorDiaPeriodoRepository } from "../../../../domain/protocols/database/restricaoHorarioPorDiaPeriodo/add-restricaoHorarioPorDiaPeriodo-repository";
import { AddRestricaoHorarioPorDiaPeriodoEntity } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo";
import { RestricaoHorarioPorDiaPeriodo, deserializeRestricaoHorarioPorDiaPeriodo } from "../../../../domain/entities/restricoes/restricaoHorarioPorDiaPeriodo";
import { ListRestricaoHorarioPorDiaPeriodoRepository } from '../../../../domain/protocols/database/restricaoHorarioPorDiaPeriodo/list-restricaoHorarioPorDiaPeriodo-repository';
import { GetRestricaoHorarioPorDiaPeriodoRepository } from '../../../../domain/protocols/database/restricaoHorarioPorDiaPeriodo/get-restricaoHorarioPorDiaPeriodo-repository';

export class RestricaoHorarioPorDiaPeriodoRepository implements AddRestricaoHorarioPorDiaPeriodoRepository, ListRestricaoHorarioPorDiaPeriodoRepository, GetRestricaoHorarioPorDiaPeriodoRepository {
  async add (addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo> {
    const data = await connection('restricoes_horarios_por_dia_periodos').insert(addRestricaoHorarioPorDiaPeriodoData).returning('*');
    
    const restricao = await connection.select(
      'restricoes_horarios_por_dia_periodos.fk_horario as restricoes_horarios_por_dia_periodos_fk_horario',
      'restricoes_horarios_por_dia_periodos.fk_periodo as restricoes_horarios_por_dia_periodos_fk_periodo',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade',
    )
    .from('restricoes_horarios_por_dia_periodos')
    .join('horarios_por_dia', 'restricoes_horarios_por_dia_periodos.fk_horario', 'horarios_por_dia.id')
    .where('restricoes_horarios_por_dia_periodos.fk_periodo', data[0].fk_periodo)
    .where('restricoes_horarios_por_dia_periodos.fk_horario', data[0].fk_horario);
      
    return deserializeRestricaoHorarioPorDiaPeriodo(restricao[0]);
  }

  async get(id_periodo: number, id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []> {
    const data = await connection.select(
      'restricoes_horarios_por_dia_periodos.fk_horario as restricoes_horarios_por_dia_periodos_fk_horario',
      'restricoes_horarios_por_dia_periodos.fk_periodo as restricoes_horarios_por_dia_periodos_fk_periodo',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade',
    )
    .from('restricoes_horarios_por_dia_periodos')
    .join('horarios_por_dia', 'restricoes_horarios_por_dia_periodos.fk_horario', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade)
    .where('restricoes_horarios_por_dia_periodos.fk_periodo', id_periodo);

    const restricoesHorarioPorDiaPeriodo = [];

    for (let restricaoHorarioPorDiaPeriodo of data) {
      restricoesHorarioPorDiaPeriodo.push(deserializeRestricaoHorarioPorDiaPeriodo(restricaoHorarioPorDiaPeriodo));
    }

    return restricoesHorarioPorDiaPeriodo;
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