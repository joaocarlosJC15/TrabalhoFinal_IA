import { connection } from '../config/postgres-config';

import { AddResultadoAlgoritmoGeneticoRepository } from "../../../../domain/protocols/database/resultadoAlgoritmoGenetico/add-resultadoAlgoritmoGenetico-repository";
import { AddResultadoAlgoritmoGeneticoEntity } from "../../../../domain/usecases/resultadoAlgoritmoGenetico/add/add-resultadoAlgoritmoGenetico";
import { ResultadoAlgoritmoGenetico } from "../../../../domain/entities/resultadoAlgoritmoGenetico";

export class ResultadoAlgoritmoGeneticoRepository implements AddResultadoAlgoritmoGeneticoRepository {
  async add (addResultadoAlgoritmoGeneticoData: AddResultadoAlgoritmoGeneticoEntity): Promise<ResultadoAlgoritmoGenetico> {
    const horarios = addResultadoAlgoritmoGeneticoData.horariosGerados.slice();

    delete addResultadoAlgoritmoGeneticoData.horariosGerados;

    const data = await connection('resultados_algoritmo_genetico')
    .insert(
      addResultadoAlgoritmoGeneticoData
    )
    .returning('*');
    
    for (let horario of horarios) {
      await connection('horarios_gerados')
      .insert({
        fk_resultado_algoritmo_genetico: data[0].id,
        fk_horario_por_dia: horario.fk_horario_por_dia,
        fk_materia: horario.fk_materia,
        fk_sala: horario.fk_sala
      });
    }

    return data && this.resultadoAlgoritmoGeneticoSerializer(data[0]);
  }

  private resultadoAlgoritmoGeneticoSerializer(data: any): ResultadoAlgoritmoGenetico {
    return {
      id: data.id,
      fk_grade: data.fk_grade,
      tamanho_populacao: data.tamanho_populacao,
      numero_geracoes_necessario: data.numero_geracoes_necessario,
      tamanho_torneio: data.tamanho_torneio,
      taxa_cruzamento: data.taxa_cruzamento,
      taxa_mutacao: data.taxa_mutacao,
      elitismo: data.elitismo,
      tamanho_elitismo: data.tamanho_elitismo,
      aptidao: data.aptidao,
      data_inicio: data.data_inicio,
      data_termino: data.data_termino
    }  
  }
}