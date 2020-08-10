import { ListProfessor } from "../../../../domain/usecases/professor/list/list-professor";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListProfessorController implements Controller {
  constructor (
    private readonly listProfessor: ListProfessor
  ) {
    this.listProfessor = listProfessor;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const professores = await this.listProfessor.list(httpRequest.params.id_grade);
      
      return ok(professores);
    } catch (error) {
      return serverError(error);
    }
  }
}
