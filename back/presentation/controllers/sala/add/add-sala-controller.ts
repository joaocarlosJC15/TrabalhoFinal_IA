import { AddSala } from "../../../../domain/usecases/sala/add/add-sala";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddSalaController implements Controller {
  constructor (
    private readonly addSala: AddSala
  ) {
    this.addSala = addSala;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, descricao } = httpRequest.body;
      const fk_grade = httpRequest.params.id_grade;
      
      const sala = await this.addSala.add({
        fk_grade,
        nome,
        descricao
      });

      return ok(sala);
    } catch (error) {
      return serverError(error);
    }
  }
}
