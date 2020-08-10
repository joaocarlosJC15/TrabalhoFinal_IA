import { AddSalaEntity } from "../../../usecases/sala/add/add-sala";
import { Sala } from "../../../entities/sala";

export interface AddSalaRepository {
  add (addSalaData: AddSalaEntity): Promise<Sala>;
}