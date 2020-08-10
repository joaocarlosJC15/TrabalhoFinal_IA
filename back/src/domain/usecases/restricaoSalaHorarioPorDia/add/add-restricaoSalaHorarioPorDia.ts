import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";

export interface AddRestricaoSalaHorarioPorDiaEntity {
  fk_sala: number;
  fk_horario_por_dia: number;
}

export interface AddRestricaoSalaHorarioPorDia {
  add(addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia>
}