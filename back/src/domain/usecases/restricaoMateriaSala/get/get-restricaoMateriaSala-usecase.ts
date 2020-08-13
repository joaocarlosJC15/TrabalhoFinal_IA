import { GetRestricaoMateriaSalaRepository } from "../../../protocols/database/restricaoMateriaSala/get-restricaoMateriaSala-repository";
import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";
import { GetRestricaoMateriaSala } from "./get-restricaoMateriaSala";

export class GetRestricaoMateriaSalaUseCase implements GetRestricaoMateriaSala {
  constructor(
    private readonly getRestricaoMateriaSalaRepository: GetRestricaoMateriaSalaRepository
  ) {
    this.getRestricaoMateriaSalaRepository = getRestricaoMateriaSalaRepository;
  }

  async get (id_materia: number, id_grade: number): Promise<RestricaoMateriaSala []> {
    const data = await this.getRestricaoMateriaSalaRepository.get(id_materia, id_grade);

    return data;
  }
}