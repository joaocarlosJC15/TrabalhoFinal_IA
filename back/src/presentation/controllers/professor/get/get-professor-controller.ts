import { GetProfessor } from "../../../../domain/usecases/professor/get/get-professor";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetProfessorController implements Controller {
  constructor (
    private readonly getProfessor: GetProfessor
  ) {
    this.getProfessor = getProfessor;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_professor = httpRequest.params.id_professor;
      const id_grade = httpRequest.params.id_grade;

      const professor = await this.getProfessor.get(id_professor, id_grade);
      
      return ok(professor);
    } catch (error) {
      return serverError(error);
    }
  }
}
