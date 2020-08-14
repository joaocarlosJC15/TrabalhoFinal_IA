import { GetRestricaoProfessorHorarioPorDia } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/get/get-restricaoProfessorHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetRestricaoProfessorHorarioPorDiaController implements Controller {
  constructor (
    private readonly getRestricaoProfessorHorarioPorDia: GetRestricaoProfessorHorarioPorDia
  ) {
    this.getRestricaoProfessorHorarioPorDia = getRestricaoProfessorHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_professor = httpRequest.params.id_professor;
      const id_grade = httpRequest.params.id_grade;
      const restricoesProfessorHorarioPorDia = await this.getRestricaoProfessorHorarioPorDia.get(id_professor, id_grade);
      
      return ok(restricoesProfessorHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
