import { connection } from '../config/postgres-config';

import { AddRestricaoProfessorHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoProfessorHorarioPorDia/add-restricaoProfessorHorarioPorDia-repository";
import { AddRestricaoProfessorHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia";
import { RestricaoProfessorHorarioPorDia, deserializeRestricaoProfessorHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoProfessorHorarioPorDia";
import { ListRestricaoProfessorHorarioPorDiaRepository } from '../../../../domain/protocols/database/restricaoProfessorHorarioPorDia/list-restricaoProfessorHorarioPorDia-repository';
import { GetRestricaoProfessorHorarioPorDiaRepository } from '../../../../domain/protocols/database/restricaoProfessorHorarioPorDia/get-restricaoProfessorHorarioPorDia-repository';

export class RestricaoProfessorHorarioPorDiaRepository implements AddRestricaoProfessorHorarioPorDiaRepository, ListRestricaoProfessorHorarioPorDiaRepository, GetRestricaoProfessorHorarioPorDiaRepository {
  async add (addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia> {
    const data = await connection('restricoes_professores_horarios_por_dia').insert(addRestricaoProfessorHorarioPorDiaData).returning('*');
    
    const restricao = await connection.select(
      'restricoes_professores_horarios_por_dia.fk_horario_por_dia as restricoes_professores_horarios_por_dia_fk_horario_por_dia',
      'restricoes_professores_horarios_por_dia.fk_professor as restricoes_professores_horarios_por_dia_fk_professor',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade',
    )
    .from('restricoes_professores_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_professores_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('restricoes_professores_horarios_por_dia.fk_professor', data[0].fk_professor)
    .where('restricoes_professores_horarios_por_dia.fk_horario_por_dia', data[0].fk_horario_por_dia);

    return deserializeRestricaoProfessorHorarioPorDia(restricao[0]);
  }

  async get(id_professor: number, id_grade: number): Promise<RestricaoProfessorHorarioPorDia []> {
    const data = await connection.select(
      'restricoes_professores_horarios_por_dia.fk_horario_por_dia as restricoes_professores_horarios_por_dia_fk_horario_por_dia',
      'restricoes_professores_horarios_por_dia.fk_professor as restricoes_professores_horarios_por_dia_fk_professor',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade',
    )
    .from('restricoes_professores_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_professores_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade)
    .where('restricoes_professores_horarios_por_dia.fk_professor', id_professor);

    const restricoesProfessorHorarioPorDia = [];

    for (let restricaoProfessorHorarioPorDia of data) {
      restricoesProfessorHorarioPorDia.push(deserializeRestricaoProfessorHorarioPorDia(restricaoProfessorHorarioPorDia));
    }

    return restricoesProfessorHorarioPorDia;
  }

  async list(id_grade: number): Promise<RestricaoProfessorHorarioPorDia []> {
    const data = await connection.select(
      'fk_horario_por_dia',
      'fk_professor'
    )
    .from('restricoes_professores_horarios_por_dia')
    .join('horarios_por_dia', 'restricoes_professores_horarios_por_dia.fk_horario_por_dia', 'horarios_por_dia.id')
    .where('horarios_por_dia.fk_grade', id_grade);

    const restricoesProfessorHorarioPorDia = [];

    for (let restricaoProfessorHorarioPorDia of data) {
      restricoesProfessorHorarioPorDia.push(this.RestricaoProfessorHorarioPorDiaSerializer(restricaoProfessorHorarioPorDia));
    }

    return restricoesProfessorHorarioPorDia;
  }

  RestricaoProfessorHorarioPorDiaSerializer(data: any): RestricaoProfessorHorarioPorDia {
    return {
      fk_horario_por_dia: data.fk_horario_por_dia,
      fk_professor: data.fk_professor
    }  
  }
}