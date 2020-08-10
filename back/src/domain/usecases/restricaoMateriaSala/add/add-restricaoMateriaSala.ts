import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";

export interface AddRestricaoMateriaSalaEntity {
  fk_materia: number;
  fk_sala: number;
}

export interface AddRestricaoMateriaSala {
  add(addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala>
}