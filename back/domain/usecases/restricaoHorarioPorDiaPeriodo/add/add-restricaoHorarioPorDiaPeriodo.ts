import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface AddRestricaoHorarioPorDiaPeriodoEntity {
  fk_horario: number;
  fk_periodo: number;
}

export interface AddRestricaoHorarioPorDiaPeriodo {
  add(addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo>
}