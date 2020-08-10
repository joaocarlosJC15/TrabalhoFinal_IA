import { AddHorarioPorDia } from "../../../../domain/usecases/horarioPorDia/add/add-horarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddHorarioPorDiaController implements Controller {
  constructor (
    private readonly addHorarioPorDia: AddHorarioPorDia
  ) {
    this.addHorarioPorDia = addHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        horario_inicio,
        horario_termino,
        fk_dia_semana,
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      
      const horarioPorDia = await this.addHorarioPorDia.add({
        horario_inicio,
        horario_termino,
        fk_dia_semana,
        fk_grade,
      });

      return ok(horarioPorDia);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}
