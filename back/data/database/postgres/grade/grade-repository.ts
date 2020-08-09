import { AddGradeRepository } from "../../../../domain/protocols/database/grade/add-grade-repository";
import { AddGradeEntity } from "../../../../domain/usecases/grade/add/add-grade";
import { Grade } from "../../../../domain/entities/grade";
import { connection } from '../config/postgres-config';
import { ListGradeRepository } from "../../../../domain/protocols/database/grade/list-grade-repository";

export class GradeRepository implements AddGradeRepository, ListGradeRepository {
  async add (addGradeData: AddGradeEntity): Promise<Grade> {
    const data = await connection('grades').insert(addGradeData).returning('*');
    
    return data && this.gradeSerializer(data[0]);
  }

  async list(): Promise<Grade []> {
    const data = await connection.select(
      'id',
      'nome',
      'descricao'
    ).from('grades');

    const grades = [];

    for (let grade of data) {
      grades.push(this.gradeSerializer(grade));
    }

    return grades;
  }

  gradeSerializer(data: any): Grade {
    return {
      id: data.id,
      nome: data.nome,
      descricao: data.descricao,
    }  
  }
}