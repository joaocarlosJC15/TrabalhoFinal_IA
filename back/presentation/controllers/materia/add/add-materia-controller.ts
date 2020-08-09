import { AddMateria } from "../../../../domain/usecases/materia/add/add-materia";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddMateriaController implements Controller {
  constructor (
    private readonly addMateria: AddMateria
  ) {
    this.addMateria = addMateria;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        fk_professor,
        fk_periodo,
        nome, 
        descricao,
        quantidade_aulas
      } = httpRequest.body;

      const fk_grade = httpRequest.params.id_grade;
      
      const materia = await this.addMateria.add({
        fk_grade,
        fk_professor,
        fk_periodo,
        nome,
        descricao,
        quantidade_aulas
      });

      return ok(materia);
    } catch (error) {
      return serverError(error);
    }
  }
}
