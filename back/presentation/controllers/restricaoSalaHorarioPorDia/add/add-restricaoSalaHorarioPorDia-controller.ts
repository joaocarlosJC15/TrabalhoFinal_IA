import { AddRestricaoSalaHorarioPorDia } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddRestricaoSalaHorarioPorDiaController implements Controller {
  constructor (
    private readonly addRestricaoSalaHorarioPorDia: AddRestricaoSalaHorarioPorDia
  ) {
    this.addRestricaoSalaHorarioPorDia = addRestricaoSalaHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        fk_sala,
        fk_horario_por_dia
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      
      const restricaoSalaHorarioPorDia = await this.addRestricaoSalaHorarioPorDia.add({
        fk_sala,
        fk_horario_por_dia
      });

      return ok(restricaoSalaHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
