import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface GetRestricaoHorarioPorDiaPeriodo {
  get(id_periodo: number, id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []>
}