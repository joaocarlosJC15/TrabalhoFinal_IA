import { AddPeriodoEntity } from "../../../usecases/periodo/add/add-periodo";
import { Periodo } from "../../../entities/periodo";

export interface AddPeriodoRepository {
  add (addPeriodoData: AddPeriodoEntity): Promise<Periodo>;
}