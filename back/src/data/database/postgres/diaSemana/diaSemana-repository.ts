import { DiaSemana } from "../../../../domain/entities/diaSemana";
import { connection } from '../config/postgres-config';
import { ListDiaSemanaRepository } from "../../../../domain/protocols/database/diaSemana/list-diaSemana-repository";

export class DiaSemanaRepository implements ListDiaSemanaRepository {
  async list(): Promise<DiaSemana []> {
    const data = await connection.select(
      'id',
      'nome'
    ).from('dias_semana');

    const diasSemana = [];

    for (let DiaSemana of data) {
      diasSemana.push(this.diaSemanaSerializer(DiaSemana));
    }

    return diasSemana;
  }

  diaSemanaSerializer(data: any): DiaSemana {
    return {
      id: data.id,
      nome: data.nome
    }  
  }
}