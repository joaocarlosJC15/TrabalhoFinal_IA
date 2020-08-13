import { GetMateria } from "../../../../domain/usecases/materia/get/get-materia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetMateriaController implements Controller {
  constructor (
    private readonly getMateria: GetMateria
  ) {
    this.getMateria = getMateria;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_grade = httpRequest.params.id_grade;
      const id_materia = httpRequest.params.id_materia;

      const materia = await this.getMateria.get(id_materia, id_grade);
      
      return ok(materia);
    } catch (error) {
      return serverError(error);
    }
  }
}
