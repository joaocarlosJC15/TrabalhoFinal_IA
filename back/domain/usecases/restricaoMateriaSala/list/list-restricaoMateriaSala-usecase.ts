import { ListRestricaoMateriaSalaRepository } from "../../../protocols/database/restricaoMateriaSala/list-restricaoMateriaSala-repository";
import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";
import { ListRestricaoMateriaSala } from "./list-restricaoMateriaSala";

export class ListRestricaoMateriaSalaUseCase implements ListRestricaoMateriaSala {
  constructor(
    private readonly listRestricaoMateriaSalaRepository: ListRestricaoMateriaSalaRepository
  ) {
    this.listRestricaoMateriaSalaRepository = listRestricaoMateriaSalaRepository;
  }

  async list (id_grade: number): Promise<RestricaoMateriaSala []> {
    const data = await this.listRestricaoMateriaSalaRepository.list(id_grade);

    return data;
  }
}