import { ListRestricaoHorarioPorDiaPeriodo } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListRestricaoHorarioPorDiaPeriodoController implements Controller {
  constructor (
    private readonly listRestricaoHorarioPorDiaPeriodo: ListRestricaoHorarioPorDiaPeriodo
  ) {
    this.listRestricaoHorarioPorDiaPeriodo = listRestricaoHorarioPorDiaPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restricoesHorarioPorDiaPeriodo = await this.listRestricaoHorarioPorDiaPeriodo.list(httpRequest.params.id_grade);
      
      return ok(restricoesHorarioPorDiaPeriodo);
    } catch (error) {
      return serverError(error);
    }
  }
}
