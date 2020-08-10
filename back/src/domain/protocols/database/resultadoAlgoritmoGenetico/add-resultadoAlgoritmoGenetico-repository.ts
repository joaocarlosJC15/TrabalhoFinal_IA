import { AddResultadoAlgoritmoGeneticoEntity } from "../../../usecases/resultadoAlgoritmoGenetico/add/add-resultadoAlgoritmoGenetico";
import { ResultadoAlgoritmoGenetico } from "../../../entities/resultadoAlgoritmoGenetico";

export interface AddResultadoAlgoritmoGeneticoRepository {
  add (addResultadoAlgoritmoGeneticoData: AddResultadoAlgoritmoGeneticoEntity): Promise<ResultadoAlgoritmoGenetico>;
}