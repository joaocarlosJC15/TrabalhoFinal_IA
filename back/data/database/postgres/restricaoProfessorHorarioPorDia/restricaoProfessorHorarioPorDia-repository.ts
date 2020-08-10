import { connection } from '../config/postgres-config';

import { AddRestricaoProfessorHorarioPorDiaRepository } from "../../../../domain/protocols/database/restricaoProfessorHorarioPorDia/add-restricaoProfessorHorarioPorDia-repository";
import { AddRestricaoProfessorHorarioPorDiaEntity } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia";
import { RestricaoProfessorHorarioPorDia } from "../../../../domain/entities/restricoes/restricaoProfessorHorarioPorDia";

export class RestricaoProfessorHorarioPorDiaRepository implements AddRestricaoProfessorHorarioPorDiaRepository {
  async add (addRestricaoProfessorHorarioPorDiaData: AddRestricaoProfessorHorarioPorDiaEntity): Promise<RestricaoProfessorHorarioPorDia> {
    const data = await connection('restricoes_professores_horarios_por_dia').insert(addRestricaoProfessorHorarioPorDiaData).returning('*');
    
    return data && this.RestricaoProfessorHorarioPorDiaSerializer(data[0]);
  }

  RestricaoProfessorHorarioPorDiaSerializer(data: any): RestricaoProfessorHorarioPorDia {
    return {
      fk_horario_por_dia: data.fk_horario_por_dia,
      fk_professor: data.fk_professor
    }  
  }
}