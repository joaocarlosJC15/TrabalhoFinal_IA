import { GetHorarioPorDia } from "../../../../domain/usecases/horarioPorDia/get/get-horarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetHorarioPorDiaController implements Controller {
  constructor (
    private readonly getHorarioPorDia: GetHorarioPorDia
  ) {
    this.getHorarioPorDia = getHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_horario_por_dia = httpRequest.params.id_horario_por_dia;
      const id_grade = httpRequest.params.id_grade;

      const horarioPorDia = await this.getHorarioPorDia.get(id_horario_por_dia, id_grade);
      
      return ok(horarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
