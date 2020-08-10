import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";

export interface ListRestricaoSalaHorarioPorDia {
  list(id_grade: number): Promise<RestricaoSalaHorarioPorDia []>
}