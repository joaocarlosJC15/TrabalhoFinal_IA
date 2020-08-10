import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface ListRestricaoHorarioPorDiaPeriodoRepository {
  list(id_grade: number): Promise<RestricaoHorarioPorDiaPeriodo []>;
}