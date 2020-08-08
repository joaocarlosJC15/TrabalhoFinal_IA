import { AddPeriodo } from "../../../../domain/usecases/periodo/add/add-periodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddPeriodoController implements Controller {
  constructor (
    private readonly addPeriodo: AddPeriodo
  ) {
    this.addPeriodo = addPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, descricao } = httpRequest.body;
      const fk_grade = httpRequest.params.id_grade;
      
      const periodo = await this.addPeriodo.add({
        fk_grade,
        nome,
        descricao
      });

      return ok(periodo);
    } catch (error) {
      return serverError(error);
    }
  }
}
