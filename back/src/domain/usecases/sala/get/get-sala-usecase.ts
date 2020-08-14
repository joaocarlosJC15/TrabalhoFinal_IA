import { GetSalaRepository } from "../../../protocols/database/sala/get-sala-repository";
import { Sala } from "../../../entities/sala";
import { GetSala } from "./get-sala";

export class GetSalaUseCase implements GetSala {
  constructor(
    private readonly GetSalaRepository: GetSalaRepository
  ) {
    this.GetSalaRepository = GetSalaRepository;
  }

  async get(id_sala: number, id_grade: number): Promise<Sala> {
    const data = await this.GetSalaRepository.get(id_sala, id_grade);

    return data;
  }
}