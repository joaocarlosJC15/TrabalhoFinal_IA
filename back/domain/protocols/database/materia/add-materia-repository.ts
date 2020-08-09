import { AddMateriaEntity } from "../../../usecases/materia/add/add-materia";
import { Materia } from "../../../entities/materia";

export interface AddMateriaRepository {
  add (addMateriaData: AddMateriaEntity): Promise<Materia>;
}