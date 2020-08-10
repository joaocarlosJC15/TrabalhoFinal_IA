import { AddRestricaoMateriaSala } from "../../../../domain/usecases/restricaoMateriaSala/add/add-restricaoMateriaSala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddRestricaoMateriaSalaController implements Controller {
  constructor (
    private readonly addRestricaoMateriaSala: AddRestricaoMateriaSala
  ) {
    this.addRestricaoMateriaSala = addRestricaoMateriaSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        fk_sala,
        fk_materia,
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      
      const restricaoMateriaSala = await this.addRestricaoMateriaSala.add({
        fk_sala,
        fk_materia
      });

      return ok(restricaoMateriaSala);
    } catch (error) {
      return serverError(error);
    }
  }
}
