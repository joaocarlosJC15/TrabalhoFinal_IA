import { ListRestricaoSalaHorarioPorDia } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class ListRestricaoSalaHorarioPorDiaController implements Controller {
  constructor (
    private readonly listRestricaoSalaHorarioPorDia: ListRestricaoSalaHorarioPorDia
  ) {
    this.listRestricaoSalaHorarioPorDia = listRestricaoSalaHorarioPorDia;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const restricoesSalaHorarioPorDia = await this.listRestricaoSalaHorarioPorDia.list(httpRequest.params.id_grade);
      
      return ok(restricoesSalaHorarioPorDia);
    } catch (error) {
      return serverError(error);
    }
  }
}
