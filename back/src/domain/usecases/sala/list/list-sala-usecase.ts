import { ListSalaRepository } from "../../../protocols/database/sala/list-sala-repository";
import { Sala } from "../../../entities/sala";
import { ListSala } from "./list-sala";

export class ListSalaUseCase implements ListSala {
  constructor(
    private readonly listSalaRepository: ListSalaRepository
  ) {
    this.listSalaRepository = listSalaRepository;
  }

  async list (id_grade: number): Promise<Sala []> {
    const data = await this.listSalaRepository.list(id_grade);

    return data;
  }
}