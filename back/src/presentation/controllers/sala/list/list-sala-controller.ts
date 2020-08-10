import { ListSala } from "../../../../domain/usecases/sala/list/list-sala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListSalaController implements Controller {
  constructor (
    private readonly listSala: ListSala
  ) {
    this.listSala = listSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const salas = await this.listSala.list(httpRequest.params.id_grade);
      
      return ok(salas);
    } catch (error) {
      return serverError(error);
    }
  }
}
