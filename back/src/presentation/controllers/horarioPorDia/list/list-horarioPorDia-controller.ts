import { ListHorarioPorDia } from "../../../../domain/usecases/horarioPorDia/list/list-horarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListHorarioPorDiaController implements Controller {
  constructor (
    private readonly listHorarioPorDia: ListHorarioPorDia
  ) {
    this.listHorarioPorDia = listHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const horariosPorDia = await this.listHorarioPorDia.list(httpRequest.params.id_grade);
      
      return ok(horariosPorDia);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}
