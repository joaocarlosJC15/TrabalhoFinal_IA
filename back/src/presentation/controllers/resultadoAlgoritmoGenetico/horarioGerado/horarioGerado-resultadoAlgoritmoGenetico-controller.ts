import { ListHorarioGerado } from "../../../../domain/usecases/horarioGerado/list/list-horarioGerado";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListHorarioGeradoController implements Controller {
  constructor (
    private readonly listHorarioGerado: ListHorarioGerado
  ) {
    this.listHorarioGerado = listHorarioGerado;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_grade = httpRequest.params.id_grade;
      const id_resultado_algoritmo_genetico = httpRequest.params.id_resultado_algoritmo_genetico;
      
      const horariosGerado = await this.listHorarioGerado.list(id_grade, id_resultado_algoritmo_genetico);
      
      return ok(horariosGerado);
    } catch (error) {
      return serverError(error);
    }
  }
}
