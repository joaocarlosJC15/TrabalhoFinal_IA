import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";

export interface ListRestricaoSalaHorarioPorDiaRepository {
  list(id_grade: number): Promise<RestricaoSalaHorarioPorDia []>;
}