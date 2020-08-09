import { AddRestricaoHorarioPorDiaPeriodoEntity } from "../../../usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo";
import { RestricaoHorarioPorDiaPeriodo } from "../../../entities/restricoes/restricaoHorarioPorDiaPeriodo";

export interface AddRestricaoHorarioPorDiaPeriodoRepository {
  add (addRestricaoHorarioPorDiaPeriodoData: AddRestricaoHorarioPorDiaPeriodoEntity): Promise<RestricaoHorarioPorDiaPeriodo>;
}