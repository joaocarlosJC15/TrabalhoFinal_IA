import { ListResultadoAlgoritmoGenetico } from "../../../../domain/usecases/resultadoAlgoritmoGenetico/list/list-resultadoAlgoritmoGenetico";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListResultadoAlgoritmoGeneticoController implements Controller {
  constructor (
    private readonly listResultadoAlgoritmoGenetico: ListResultadoAlgoritmoGenetico
  ) {
    this.listResultadoAlgoritmoGenetico = listResultadoAlgoritmoGenetico;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const resultados = await this.listResultadoAlgoritmoGenetico.list(httpRequest.params.id_grade);
      
      return ok(resultados);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}
