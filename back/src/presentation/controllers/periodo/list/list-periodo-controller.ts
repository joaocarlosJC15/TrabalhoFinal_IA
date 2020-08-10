import { ListPeriodo } from "../../../../domain/usecases/periodo/list/list-periodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListPeriodoController implements Controller {
  constructor (
    private readonly listPeriodo: ListPeriodo
  ) {
    this.listPeriodo = listPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const periodos = await this.listPeriodo.list(httpRequest.params.id_grade);
      
      return ok(periodos);
    } catch (error) {
      return serverError(error);
    }
  }
}
