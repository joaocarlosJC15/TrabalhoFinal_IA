import { AddProfessorEntity } from "../../../usecases/professor/add/add-professor";
import { Professor } from "../../../entities/professor";

export interface AddProfessorRepository {
  add (addProfessorData: AddProfessorEntity): Promise<Professor>;
}