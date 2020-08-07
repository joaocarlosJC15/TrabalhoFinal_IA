import { ListGrade } from "../../../../domain/usecases/grade/list/list-grade";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListGradeController implements Controller {
  constructor (
    private readonly listGrade: ListGrade
  ) {
    this.listGrade = listGrade;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, descricao } = httpRequest.body;

      const grade = await this.listGrade.list();

      return ok(grade);
    } catch (error) {
      return serverError(error);
    }
  }
}
