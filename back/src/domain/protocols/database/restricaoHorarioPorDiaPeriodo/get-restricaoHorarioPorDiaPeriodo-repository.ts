import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface GetRestricaoHorarioPorDiaPeriodoRepository {
  get(id_periodo: number, id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []>;
}