import { ListMateria } from "../../../../domain/usecases/materia/list/list-materia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListMateriaController implements Controller {
  constructor (
    private readonly listMateria: ListMateria
  ) {
    this.listMateria = listMateria;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const materias = await this.listMateria.list(httpRequest.params.id_grade);
      
      return ok(materias);
    } catch (error) {
      return serverError(error);
    }
  }
}
