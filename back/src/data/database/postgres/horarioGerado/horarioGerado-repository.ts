import { connection } from '../config/postgres-config';

import { HorarioGerado, deserializeHorarioGerado } from "../../../../domain/entities/horarioGerado";
import { ListHorarioGeradoRepository } from '../../../../domain/protocols/database/horarioGerado/list-horarioGerado-repository';

export class HorarioGeradoRepository implements ListHorarioGeradoRepository {

  async list(id_grade: number, id_resultado_algoGen: number): Promise<HorarioGerado []> {
    const data = await connection.select(
      'fk_resultado_algoritmo_genetico as horarios_gerados_fk_resultado_algoritmo_genetico',
      'fk_horario_por_dia as horarios_gerados_fk_horario_por_dia',
      'fk_sala as horarios_gerados_fk_sala',
      'fk_materia as horarios_gerados_fk_materia',
      'salas.id as salas_id',
      'salas.nome as salas_nome',
      'salas.descricao as salas_descricao',
      'salas.fk_grade as salas_fk_grade',
      'materias.id as materias_id',
      'materias.nome as materias_nome',
      'materias.descricao as materias_descricao',
      'materias.quantidade_aulas as materias_quantidade_aulas',
      'materias.fk_professor as materias_fk_professor',
      'materias.fk_periodo as materias_fk_periodo',
      'materias.fk_grade as materias_fk_grade',
      'horarios_por_dia.id as horarios_por_dia_id',
      'horarios_por_dia.horario_inicio as horarios_por_dia_horario_inicio',
      'horarios_por_dia.horario_termino as horarios_por_dia_horario_termino',
      connection.raw(`(select count(fk_horario) from restricoes_horarios_por_dia_periodos where restricoes_horarios_por_dia_periodos.fk_horario = horarios_por_dia.id) as horarios_por_dia_qtde_aulas_simultaneas`),
      'horarios_por_dia.fk_dia_semana as horarios_por_dia_fk_dia_semana',
      'horarios_por_dia.fk_grade as horarios_por_dia_fk_grade',
      'professores.id as professores_id',
      'professores.nome as professores_nome',
      'professores.descricao as professores_descricao',
      'professores.data_nascimento as professores_data_nascimento',
      'professores.email as professores_email',
      'professores.fk_grade as professores_fk_grade',
    )
    .from('horarios_gerados')
    .join('salas', 'horarios_gerados.fk_sala', 'salas.id')
    .join('materias', 'horarios_gerados.fk_materia', 'materias.id')
    .join('horarios_por_dia', 'horarios_gerados.fk_horario_por_dia', 'horarios_por_dia.id')
    .join('professores', 'materias.fk_professor', 'professores.id')
    .where('fk_resultado_algoritmo_genetico', id_resultado_algoGen)
    .where('materias.fk_grade', id_grade)
    .where('salas.fk_grade', id_grade);

    const horariosGerado = [];

    for (let horario of data) {
      horariosGerado.push(this.HorarioGeradoSerializer(horario));
    }

    return horariosGerado;
  }

  HorarioGeradoSerializer(data: any): HorarioGerado {
    return deserializeHorarioGerado(data);
  }
}