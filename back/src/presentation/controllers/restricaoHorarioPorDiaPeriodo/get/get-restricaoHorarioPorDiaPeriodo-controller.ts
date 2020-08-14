import { GetRestricaoHorarioPorDiaPeriodo } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/get/get-restricaoHorarioPorDiaPeriodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetRestricaoHorarioPorDiaPeriodoController implements Controller {
  constructor (
    private readonly getRestricaoHorarioPorDiaPeriodo: GetRestricaoHorarioPorDiaPeriodo
  ) {
    this.getRestricaoHorarioPorDiaPeriodo = getRestricaoHorarioPorDiaPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_periodo = httpRequest.params.id_periodo;
      const id_grade = httpRequest.params.id_grade;

      const restricoesHorarioPorDiaPeriodo = await this.getRestricaoHorarioPorDiaPeriodo.get(id_periodo, id_grade);
      
      return ok(restricoesHorarioPorDiaPeriodo);
    } catch (error) {
      return serverError(error);
    }
  }
}
