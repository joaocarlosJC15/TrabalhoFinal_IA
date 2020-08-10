import { GerarHorario } from "../../../../domain/usecases/gerarHorario/gerarHorario";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class GerarHorarioGradeController implements Controller {
  constructor (
    private readonly gerarHorario: GerarHorario
  ) {
    this.gerarHorario = gerarHorario;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        tamanhoPopulacao,
        numeroGeracoes,
        tamanhoTorneio,
        taxaCruzamento,
        taxaMutacao,
        elitismo,
        tamanhoElitismo
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;

      const resultadoAlgoritmoGenetico = await this.gerarHorario.gerarHorario({
        tamanhoPopulacao,
        numeroGeracoes,
        tamanhoTorneio,
        taxaCruzamento,
        taxaMutacao,
        elitismo,
        tamanhoElitismo,
        fk_grade,
      });

      return ok(resultadoAlgoritmoGenetico);
    } catch (error) {
      return serverError(error);
    }
  }
}
