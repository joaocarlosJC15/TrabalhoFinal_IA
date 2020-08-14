import { GetRestricaoSalaHorarioPorDia } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/get/get-restricaoSalaHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GetRestricaoSalaHorarioPorDiaController implements Controller {
  constructor (
    private readonly getRestricaoSalaHorarioPorDia: GetRestricaoSalaHorarioPorDia
  ) {
    this.getRestricaoSalaHorarioPorDia = getRestricaoSalaHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id_sala = httpRequest.params.id_sala;
      const id_grade = httpRequest.params.id_grade;

      const restricoesSalaHorarioPorDia = await this.getRestricaoSalaHorarioPorDia.get(id_sala, id_grade);
      
      return ok(restricoesSalaHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
