import { ListRestricaoMateriaSala } from "../../../../domain/usecases/restricaoMateriaSala/list/list-restricaoMateriaSala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListRestricaoMateriaSalaController implements Controller {
  constructor (
    private readonly listRestricaoMateriaSala: ListRestricaoMateriaSala
  ) {
    this.listRestricaoMateriaSala = listRestricaoMateriaSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restricoesMateriaSala = await this.listRestricaoMateriaSala.list(httpRequest.params.id_grade);
      
      return ok(restricoesMateriaSala);
    } catch (error) {
      return serverError(error);
    }
  }
}
