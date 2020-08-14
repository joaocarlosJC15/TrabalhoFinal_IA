import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";

export interface GetRestricaoSalaHorarioPorDia {
  get(id_sala: number, id_grade: number): Promise<RestricaoSalaHorarioPorDia []>
}