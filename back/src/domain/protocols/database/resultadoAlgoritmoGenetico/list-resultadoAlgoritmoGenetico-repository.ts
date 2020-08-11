import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";

export interface ListResultadoAlgoritmoGeneticoRepository {
  list(id_grade: number): Promise<ResultadoAlgoritmoGenetico []>;
}