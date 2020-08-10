import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface ListRestricaoHorarioPorDiaPeriodo {
  list(id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []>
}