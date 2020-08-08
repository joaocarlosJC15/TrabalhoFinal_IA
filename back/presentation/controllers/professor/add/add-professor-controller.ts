import { AddProfessor } from "../../../../domain/usecases/professor/add/add-professor";

import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { ok, serverError } from "../../../helpers/http";

export class AddProfessorController implements Controller {
  constructor (
    private readonly addProfessor: AddProfessor
  ) {
    this.addProfessor = addProfessor;
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { 
        nome, 
        descricao,
        data_nascimento,
        email
      } = httpRequest.body;
      const fk_grade = httpRequest.params.id_grade;
      
      const professor = await this.addProfessor.add({
        fk_grade,
        nome,
        descricao
      });

      return ok(professor);
    } catch (error) {
      return serverError(error);
    }
  }
}
