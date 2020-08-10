import { AddRestricaoMateriaSala, AddRestricaoMateriaSalaEntity } from "./add-restricaoMateriaSala";
import { RestricaoMateriaSala } from "../../../entities/restricoes/restricaoMateriaSala";
import { AddRestricaoMateriaSalaRepository } from "../../../protocols/database/restricaoMateriaSala/add-restricaoMateriaSala-repository";

export class AddRestricaoMateriaSalaUseCase implements AddRestricaoMateriaSala {
  constructor(
    private readonly addRestricaoMateriaSalaRepository: AddRestricaoMateriaSalaRepository
  ) {
    this.addRestricaoMateriaSalaRepository = addRestricaoMateriaSalaRepository
  }

  async add(addRestricaoMateriaSalaData: AddRestricaoMateriaSalaEntity): Promise<RestricaoMateriaSala> {
    const restricaoMateriaSala = await this.addRestricaoMateriaSalaRepository.add(addRestricaoMateriaSalaData);

    return restricaoMateriaSala;
  }
}