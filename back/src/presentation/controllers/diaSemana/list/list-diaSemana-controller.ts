import { ListDiaSemana } from "../../../../domain/usecases/diaSemana/list/list-diaSemana";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListDiaSemanaController implements Controller {
  constructor (
    private readonly listDiaSemana: ListDiaSemana
  ) {
    this.listDiaSemana = listDiaSemana;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const diasSemana = await this.listDiaSemana.list();

      return ok(diasSemana);
    } catch (error) {
      return serverError(error);
    }
  }
}
