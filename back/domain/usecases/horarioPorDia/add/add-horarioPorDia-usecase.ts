import { AddHorarioPorDia, AddHorarioPorDiaEntity } from "./add-horarioPorDia";
import { HorarioPorDia } from "../../../entities/horarioPorDia";
import { AddHorarioPorDiaRepository } from "../../../protocols/database/horarioPorDia/add-horarioPorDia-repository";

export class AddHorarioPorDiaUseCase implements AddHorarioPorDia {
  constructor(
    private readonly addHorarioPorDiaRepository: AddHorarioPorDiaRepository
  ) {
    this.addHorarioPorDiaRepository = addHorarioPorDiaRepository
  }

  async add(addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia> {
    const horarioPorDia = await this.addHorarioPorDiaRepository.add(addHorarioPorDiaData);

    return horarioPorDia;
  }
}