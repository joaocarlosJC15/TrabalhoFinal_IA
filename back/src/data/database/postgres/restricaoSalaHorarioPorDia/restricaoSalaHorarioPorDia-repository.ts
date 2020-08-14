import { connection } from '../config/postgres-config';

import { AddRestricaoSalaHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoSalaHorarioPorDia/add-restricaoSalaHorarioPorDia-repository";
import { AddRestricaoSalaHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia";
import { RestricaoSalaHorarioPorDia, deserializeRestricaoSalaHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoSalaHorarioPorDia";
import { ListRestricaoSalaHorarioPorDiaRepository } from '../../../../domain/protocols/database/restricaoSalaHorarioPorDia/list-restricaoSalaHorarioPorDia-repository';
import { GetRestricaoSalaHorarioPorDiaRepository } from '../../../../domain/protocols/database/restricaoSalaHorarioPorDia/get-restricaoSalaHorarioPorDia-repository';

export class RestricaoSalaHorarioPorDiaRepository implements AddRestricaoSalaHorarioPorDiaRepository, ListRestricaoSalaHorarioPorDiaRepository, GetRestricaoSalaHorarioPorDiaRepository {
  async add (addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia> {
    const data = await connection('restricoes_salas_horarios_por_dia').insert(addRestricaoSalaHorarioPorDiaData).returning('*');
    
    const restricao = await connection.select(
      'restricoes_salas_horarios_por_dia.fk_horario_por_dia as restricoes_salas_horarios_por_dia_fk_horario_por_dia',
      'restricoes_salas_horarios_por_dia.fk_sala as restricoes_salas_horarios_por_dia_fk_sala',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade'
    )
    .from('restricoes_salas_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_salas_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('restricoes_salas_horarios_por_dia.fk_sala', data[0].fk_sala)
    .where('restricoes_salas_horarios_por_dia.fk_horario_por_dia', data[0].fk_horario_por_dia);

    return deserializeRestricaoSalaHorarioPorDia(restricao[0]);
  }

  async get(id_sala: number, id_grade: number): Promise<RestricaoSalaHorarioPorDia []> {
    const data = await connection.select(
      'restricoes_salas_horarios_por_dia.fk_horario_por_dia as restricoes_salas_horarios_por_dia_fk_horario_por_dia',
      'restricoes_salas_horarios_por_dia.fk_sala as restricoes_salas_horarios_por_dia_fk_sala',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade'
    )
    .from('restricoes_salas_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_salas_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade)
    .where('restricoes_salas_horarios_por_dia.fk_sala', id_sala);;

    const restricoesSalaHorarioPorDia = [];

    for (let restricaoSalaHorarioPorDia of data) {
      restricoesSalaHorarioPorDia.push(deserializeRestricaoSalaHorarioPorDia(restricaoSalaHorarioPorDia));
    }

    return restricoesSalaHorarioPorDia;
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