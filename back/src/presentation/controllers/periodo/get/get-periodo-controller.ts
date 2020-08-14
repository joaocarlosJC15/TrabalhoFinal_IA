import { GetPeriodo } from "../../../../domain/usecases/periodo/get/get-periodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetPeriodoController implements Controller {
  constructor (
    private readonly getPeriodo: GetPeriodo
  ) {
    this.getPeriodo = getPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_periodo = httpRequest.params.id_periodo;
      const id_grade = httpRequest.params.id_grade;

      const periodo = await this.getPeriodo.get(id_periodo, id_grade);
      
      return ok(periodo);
    } catch (error) {
      return serverError(error);
    }
  }
}
