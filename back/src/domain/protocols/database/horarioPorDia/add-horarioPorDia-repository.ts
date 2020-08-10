import { AddHorarioPorDiaEntity } from "../../../usecases/horarioPorDia/add/add-horarioPorDia";
import { HorarioPorDia } from "../../../entities/horarioPorDia";

export interface AddHorarioPorDiaRepository {
  add (addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia>;
}