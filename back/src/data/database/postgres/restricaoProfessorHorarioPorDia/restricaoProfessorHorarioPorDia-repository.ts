import { connection } from '../config/postgres-config';

import { AddRestricaoProfessorHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoProfessorHorarioPorDia/add-restricaoProfessorHorarioPorDia-repository";
import { AddRestricaoProfessorHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia";
import { RestricaoProfessorHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoProfessorHorarioPorDia";
import { ListRestricaoProfessorHorarioPorDia } from '../../../../domain/usecases/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia';

export class RestricaoProfessorHorarioPorDiaRepository implements AddRestricaoProfessorHorarioPorDiaRepository, ListRestricaoProfessorHorarioPorDia {
  async add (addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia> {
    const data = await connection('restricoes_professores_horarios_por_dia').insert(addRestricaoProfessorHorarioPorDiaData).returning('*');
    
    return data && this.RestricaoProfessorHorarioPorDiaSerializer(data[0]);
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