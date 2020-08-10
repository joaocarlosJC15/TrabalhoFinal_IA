

import { ResultadoAlgoritmoGeneticoRepository } from "../../../../data/database/postgres/resultadoAlgoritmoGenetico/resultadoAlgoritmoGenetico-repository";

import { GerarHorarioUsecase } from "../../../../domain/usecases/gerarHorario/gerarHorario-usecase"
import { ListHorarioPorDiaUseCase } from "../../../../domain/usecases/horarioPorDia/list/list-horarioPorDia-usecase";
import { HorarioPorDiaRepository } from "../../../../data/database/postgres/horarioPorDia/horarioPorDia-repository";
import { ListSalaUseCase } from "../../../../domain/usecases/sala/list/list-sala-usecase";
import { SalaRepository } from "../../../../data/database/postgres/sala/sala-repository";
import { ListMateriaUseCase } from "../../../../domain/usecases/materia/list/list-materia-usecase";
import { MateriaRepository } from "../../../../data/database/postgres/materia/materia-repository";
import { ListRestricaoHorarioPorDiaPeriodoUseCase } from "../../../../domain/usecases/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo-usecase";
import { RestricaoHorarioPorDiaPeriodoRepository } from "../../../../data/database/postgres/restricaoHorarioPorDiaPeriodo/restricaoHorarioPorDiaPeriodo-repository";
import { ListRestricaoMateriaSalaUseCase } from "../../../../domain/usecases/restricaoMateriaSala/list/list-restricaoMateriaSala-usecase";
import { RestricaoMateriaSalaRepository } from "../../../../data/database/postgres/restricaoMateriaSala/restricaoMateriaSala-repository";
import { ListRestricaoProfessorHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia-usecase";
import { RestricaoProfessorHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoProfessorHorarioPorDia/restricaoProfessorHorarioPorDia-repository";
import { ListRestricaoSalaHorarioPorDiaUseCase } from "../../../../domain/usecases/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia-usecase";
import { RestricaoSalaHorarioPorDiaRepository } from "../../../../data/database/postgres/restricaoSalaHorarioPorDia/restricaoSalaHorarioPorDia-repository";
import { AddResultadoAlgoritmoGeneticoUseCase } from "../../../../domain/usecases/resultadoAlgoritmoGenetico/add/add-resultadoAlgoritmoGenetico-usecase";

import { Controller } from "../../../../presentation/protocols";
import { GerarHorarioGradeController } from "../../../../presentation/controllers/grade/gerarHorario/gerarHorario-grade-controller";

export const makeGerarHorarioGradeController = (): Controller => {
  const gradeRepository = new ResultadoAlgoritmoGeneticoRepository();

  const gerarHorarioUseCase = new GerarHorarioUsecase(
    new ListHorarioPorDiaUseCase(new HorarioPorDiaRepository),
    new ListSalaUseCase(new SalaRepository),
    new ListMateriaUseCase(new MateriaRepository),
    new ListRestricaoHorarioPorDiaPeriodoUseCase(new RestricaoHorarioPorDiaPeriodoRepository),
    new ListRestricaoMateriaSalaUseCase(new RestricaoMateriaSalaRepository),
    new ListRestricaoProfessorHorarioPorDiaUseCase(new RestricaoProfessorHorarioPorDiaRepository),
    new ListRestricaoSalaHorarioPorDiaUseCase(new RestricaoSalaHorarioPorDiaRepository),
    new AddResultadoAlgoritmoGeneticoUseCase(new ResultadoAlgoritmoGeneticoRepository),
  );

  return new GerarHorarioGradeController(gerarHorarioUseCase);
}