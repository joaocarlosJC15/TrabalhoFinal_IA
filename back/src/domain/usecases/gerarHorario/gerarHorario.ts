import { ResultadoAlgoritmoGenetico } from "../../entities/resultadoAlgoritmoGenetico";

export interface InputsAlgoritmoGenetico {
  tamanhoPopulacao: number,
  numeroGeracoes: number,
  tamanhoTorneio: number,
  taxaCruzamento: number,
  taxaMutacao: number,
  elitismo: boolean,
  tamanhoElitismo: number,
  fk_grade: number,
}


export interface GerarHorario {
  gerarHorario(inputsAlgoritmoGenetico: InputsAlgoritmoGenetico): Promise<ResultadoAlgoritmoGenetico>
}