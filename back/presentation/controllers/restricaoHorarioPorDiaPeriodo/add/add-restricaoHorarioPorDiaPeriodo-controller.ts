import { AddRestricaoHorarioPorDiaPeriodo } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddRestricaoHorarioPorDiaPeriodoController implements Controller {
  constructor (
    private readonly addRestricaoHorarioPorDiaPeriodo: AddRestricaoHorarioPorDiaPeriodo
  ) {
    this.addRestricaoHorarioPorDiaPeriodo = addRestricaoHorarioPorDiaPeriodo;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        fk_horario,
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      const fk_periodo = httpRequest.params.id_periodo;
      
      const restricaoHorarioPorDiaPeriodo = await this.addRestricaoHorarioPorDiaPeriodo.add({
        fk_periodo,
        fk_horario
      });

      return ok(restricaoHorarioPorDiaPeriodo);
    } catch (error) {
      return serverError(error);
    }
  }
}
