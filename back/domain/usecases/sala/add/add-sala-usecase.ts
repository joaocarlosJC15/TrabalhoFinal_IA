import { AddSala, AddSalaEntity } from "./add-sala";
import { Sala } from "../../../entities/sala";
import { AddSalaRepository } from "../../../protocols/database/sala/add-sala-repository";

export class AddSalaUseCase implements AddSala {
  constructor(
    private readonly addSalaRepository: AddSalaRepository
  ) {
    this.addSalaRepository = addSalaRepository
  }

  async add(addSalaData: AddSalaEntity): Promise<Sala> {
    const sala = await this.addSalaRepository.add(addSalaData);

    return sala;
  }
}