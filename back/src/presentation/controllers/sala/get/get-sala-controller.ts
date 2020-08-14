import { GetSala } from "../../../../domain/usecases/sala/get/get-sala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetSalaController implements Controller {
  constructor (
    private readonly getSala: GetSala
  ) {
    this.getSala = getSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_grade = httpRequest.params.id_grade;
      const id_sala = httpRequest.params.id_sala;

      const sala = await this.getSala.get(id_sala, id_grade);
      
      return ok(sala);
    } catch (error) {
      return serverError(error);
    }
  }
}
