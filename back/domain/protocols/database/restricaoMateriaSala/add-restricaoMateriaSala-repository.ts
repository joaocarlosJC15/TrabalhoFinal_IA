import { AddRestricaoMateriaSalaEntity } from "../../../usecases/restricaoMateriaSala/add/add-restricaoMateriaSala";
import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface AddRestricaoMateriaSalaRepository {
  add (addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala>;
}