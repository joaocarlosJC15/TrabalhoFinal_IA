import { ListRestricaoProfessorHorarioPorDia } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListRestricaoProfessorHorarioPorDiaController implements Controller {
  constructor (
    private readonly listRestricaoProfessorHorarioPorDia: ListRestricaoProfessorHorarioPorDia
  ) {
    this.listRestricaoProfessorHorarioPorDia = listRestricaoProfessorHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restricoesProfessorHorarioPorDia = await this.listRestricaoProfessorHorarioPorDia.list(httpRequest.params.id_grade);
      
      return ok(restricoesProfessorHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
