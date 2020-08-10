import { AddRestricaoProfessorHorarioPorDia } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddRestricaoProfessorHorarioPorDiaController implements Controller {
  constructor (
    private readonly addRestricaoProfessorHorarioPorDia: AddRestricaoProfessorHorarioPorDia
  ) {
    this.addRestricaoProfessorHorarioPorDia = addRestricaoProfessorHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        fk_professor,
        fk_horario_por_dia
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      
      const restricaoProfessorHorarioPorDia = await this.addRestricaoProfessorHorarioPorDia.add({
        fk_professor,
        fk_horario_por_dia
      });

      return ok(restricaoProfessorHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
