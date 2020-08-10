import { AddRestricaoSalaHorarioPorDiaEntity } from "../../../usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../../../entities/restricoes/restricaoSalaHorarioPorDia";

export interface AddRestricaoSalaHorarioPorDiaRepository {
  add (addRestricaoSalaHorarioPorDiaData: AddRestricaoSalaHorarioPorDiaEntity): Promise<RestricaoSalaHorarioPorDia>;
}