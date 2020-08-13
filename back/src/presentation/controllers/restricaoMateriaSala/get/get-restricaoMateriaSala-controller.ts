import { GetRestricaoMateriaSala } from "../../../../domain/usecases/restricaoMateriaSala/get/get-restricaoMateriaSala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetRestricaoMateriaSalaController implements Controller {
  constructor (
    private readonly getRestricaoMateriaSala: GetRestricaoMateriaSala
  ) {
    this.getRestricaoMateriaSala = getRestricaoMateriaSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_grade = httpRequest.params.id_grade;
      const id_materia =httpRequest.params.id_materia;

      const restricoesMateriaSala = await this.getRestricaoMateriaSala.get(id_materia, id_grade);
      
      return ok(restricoesMateriaSala);
    } catch (error) {
      return serverError(error);
    }
  }
}
