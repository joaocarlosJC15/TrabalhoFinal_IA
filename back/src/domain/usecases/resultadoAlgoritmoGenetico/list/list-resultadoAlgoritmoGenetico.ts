import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";

export interface ListResultadoAlgoritmoGenetico {
  list(id_grade: number): Promise<ResultadoAlgoritmoGenetico []>
}