import { Controller } from "../../../protocols/controller"
import { AddGrade } from "../../../../domain/usecases/grade/add/add-grade"
import { HttpRequest, HttpResponse } from "../../../protocols/http"
import { ok, serverError } from "../../../helpers/http"

export class AddGradeController implements Controller {
  constructor (
    private readonly addGrade: AddGrade
  ) {
    this.addGrade = addGrade
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { nome, descricao } = httpRequest.body

      const account = await this.addGrade.add({
        nome,
        descricao
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
