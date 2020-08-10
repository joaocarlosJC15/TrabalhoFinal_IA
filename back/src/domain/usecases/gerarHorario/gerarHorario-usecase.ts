import { GerarHorario, InputsAlgoritmoGenetico } from "./gerarHorario";
import { ListHorarioPorDia } from "../horarioPorDia/list/list-horarioPorDia";
import { ListSala } from "../sala/list/list-sala";
import { ListMateria } from "../materia/list/list-materia";
import { ListRestricaoHorarioPorDiaPeriodo } from "../restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo";
import { ListRestricaoMateriaSala } from "../restricaoMateriaSala/list/list-restricaoMateriaSala";
import { ListRestricaoProfessorHorarioPorDia } from "../restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia";
import { ListRestricaoSalaHorarioPorDia } from "../restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia";
import { AlgortimoGenetico } from "../../entities/algoritmoGenetico/algoritmoGenetico";
import { AddResultadoAlgoritmoGeneticoEntity, AddResultadoAlgoritmoGenetico } from "../resultadoAlgoritmoGenetico/add/add-resultadoAlgoritmoGenetico";
import { AddHorarioGeradoEntity } from "../horarioGerado/add/add-horarioGerado";
import { ResultadoAlgoritmoGenetico } from "../../entities/resultadoAlgoritmoGenetico";

export class GerarHorarioUsecase implements GerarHorario {
  constructor(
    private readonly listHorarioPorDia: ListHorarioPorDia,
    private readonly listSala: ListSala,
    private readonly listMateria: ListMateria,
    private readonly listRestricaoHorarioPorDiaPeriodo: ListRestricaoHorarioPorDiaPeriodo,
    private readonly listRestricaoMateriaSala: ListRestricaoMateriaSala,
    private readonly listRestricaoProfessorHorarioPorDia: ListRestricaoProfessorHorarioPorDia,
    private readonly listRestricaoSalaHorarioPorDia: ListRestricaoSalaHorarioPorDia,
    private readonly addResultadoAlgoritmoGenetico: AddResultadoAlgoritmoGenetico
  ) {
    this.listHorarioPorDia = listHorarioPorDia;
    this.listSala = listSala;
    this.listMateria = listMateria;
    this.listRestricaoHorarioPorDiaPeriodo = listRestricaoHorarioPorDiaPeriodo;
    this.listRestricaoMateriaSala = listRestricaoMateriaSala;
    this.listRestricaoProfessorHorarioPorDia = listRestricaoProfessorHorarioPorDia;
    this.listRestricaoSalaHorarioPorDia = listRestricaoSalaHorarioPorDia;
    this.addResultadoAlgoritmoGenetico = addResultadoAlgoritmoGenetico
  }

  async gerarHorario (inputsAlgoritmoGenetico: InputsAlgoritmoGenetico): Promise<ResultadoAlgoritmoGenetico> {
    const salas = await this.listSala.list(inputsAlgoritmoGenetico.fk_grade);
    const materias = await this.listMateria.list(inputsAlgoritmoGenetico.fk_grade);
    const horariosPorDia = await this.listHorarioPorDia.list(inputsAlgoritmoGenetico.fk_grade);
    const restricoesHorarioPorDiaPeriodo = await this.listRestricaoHorarioPorDiaPeriodo.list(inputsAlgoritmoGenetico.fk_grade);
    const restricoesMateriaSala = await this.listRestricaoMateriaSala.list(inputsAlgoritmoGenetico.fk_grade);
    const restricoesProfessorHorarioPorDia = await this.listRestricaoProfessorHorarioPorDia.list(inputsAlgoritmoGenetico.fk_grade);
    const restricoesSalaHorarioPorDia = await this.listRestricaoSalaHorarioPorDia.list(inputsAlgoritmoGenetico.fk_grade);

    const algortimoGenetico = new AlgortimoGenetico(
      inputsAlgoritmoGenetico.tamanhoPopulacao,
      inputsAlgoritmoGenetico.numeroGeracoes,
      inputsAlgoritmoGenetico.tamanhoTorneio,
      inputsAlgoritmoGenetico.taxaCruzamento,
      inputsAlgoritmoGenetico.taxaMutacao,
      inputsAlgoritmoGenetico.elitismo,
      inputsAlgoritmoGenetico.tamanhoElitismo,
      salas,
      materias,
      horariosPorDia,
      restricoesHorarioPorDiaPeriodo,
      restricoesMateriaSala,
      restricoesProfessorHorarioPorDia,
      restricoesSalaHorarioPorDia
    );

    const resultado = algortimoGenetico.gerarHorario();

    const horariosGerados: AddHorarioGeradoEntity [] = [];

    const addHorario: AddResultadoAlgoritmoGeneticoEntity = {
      fk_grade: inputsAlgoritmoGenetico.fk_grade,
      tamanho_populacao: inputsAlgoritmoGenetico.tamanhoPopulacao,
      numero_geracoes_necessario: resultado.numero_geracoes_necessario,
      tamanho_torneio: inputsAlgoritmoGenetico.tamanhoTorneio,
      taxa_cruzamento: inputsAlgoritmoGenetico.taxaCruzamento,
      taxa_mutacao: inputsAlgoritmoGenetico.taxaMutacao,
      elitismo: inputsAlgoritmoGenetico.elitismo,
      tamanho_elitismo: inputsAlgoritmoGenetico.tamanhoElitismo,
      aptidao: resultado.aptidao,
      data_inicio: resultado.data_inicio,
      data_termino: resultado.data_termino,
      horariosGerados: []
    }

    for (let horario of resultado.horarios) {
      for (let sala of horario.salas) {
        if (sala.aula) {
          horariosGerados.push({
            fk_horario_por_dia: horario.id,
            fk_materia: sala.aula.id_materia,
            fk_sala: sala.id
          });
        }
      }
    }

    addHorario.horariosGerados = horariosGerados;

    const data = await this.addResultadoAlgoritmoGenetico.add(addHorario)
    
    return data;
  }
}