import clone from 'clone';

import { Cromossomo_AG } from "./models/cromossomo_AG";
import { RestricaoHorarioPorDiaPeriodo_AG } from './models/restricoes/restricaoHorarioPorDiaPeriodo_AG';
import { RestricaoMateriaSala_AG } from './models/restricoes/restricaoMateriaSala_AG';
import { RestricaoProfessorHorarioPorDia_AG } from './models/restricoes/restricaoProfessorHorarioPorDia_AG';
import { RestricaoSalaHorarioPorDia_AG } from './models/restricoes/restricaoSalaHorarioPorDia_AG';
import { Horario_AG } from "./models/horario_AG";
import { Sala_AG } from "./models/sala_AG";
import { Materia_AG } from "./models/materia_AG";
import { Aula_AG } from "./models/aula_AG";
import { ResultadoTorneio_AG } from './models/resultadoTorneio_AG';

import { HorarioPorDia } from '../horarioPorDia';
import { Materia } from '../materia';
import { Sala } from '../sala';
import { RestricaoHorarioPorDiaPeriodo } from "../restricoes/restricaoHorarioPorDiaPeriodo";
import { RestricaoMateriaSala } from "../restricoes/restricaoMateriaSala";
import { RestricaoProfessorHorarioPorDia } from "../restricoes/restricaoProfessorHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../restricoes/restricaoSalaHorarioPorDia";

export class AlgortimoGenetico{
  private dataInicio: Date = new Date;
  
  private tamanhoPopulacao: number;
  private numeroGeracoes: number;
  private tamanhoTorneio: number;
  private taxaCruzamento: number;
  private taxaMutacao: number;
  private elitismo: boolean;
  private tamanhoElitismo: number;
  private populacao: Cromossomo_AG [] = [];

  private numeroGeracoesExecutadas: number = 0;
  private id_grade: number;

  private salas: Sala_AG [] = [];
  private materias: Materia_AG [] = [];
  private aulas: Map<number, Aula_AG []> = new Map;
  private qtdeAulas: number = 0;
  private horarios: Horario_AG [] = [];
  private restricoesHorarioPorDiaPeriodo: RestricaoHorarioPorDiaPeriodo_AG [] = [];
  private restricoesMateriaSala: RestricaoMateriaSala_AG [] = [];
  private restricoesProfessorHorarioPorDia: RestricaoProfessorHorarioPorDia_AG [] = [];
  private restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia_AG [] = [];

  constructor(
    tamanhoPopulacao: number,
    numeroGeracoes: number,
    tamanhoTorneio: number,
    taxaCruzamento: number,
    taxaMutacao: number,
    elitismo: boolean,
    tamanhoElitismo: number,
    salas: Sala [],
    materias: Materia [],
    horariosPorDia: HorarioPorDia [],
    restricoesHorarioPorDiaPeriodo: RestricaoHorarioPorDiaPeriodo [],
    restricoesMateriaSala: RestricaoMateriaSala [],
    restricoesProfessorHorarioPorDia: RestricaoProfessorHorarioPorDia [],
    restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia [],
    id_grade: number
    ) {
      
      this.tamanhoPopulacao = tamanhoPopulacao;
      this.numeroGeracoes = numeroGeracoes;
      this.tamanhoTorneio = tamanhoTorneio;
      this.taxaCruzamento = taxaCruzamento;
      this.taxaMutacao = taxaMutacao;
      this.elitismo = elitismo;
      this.tamanhoElitismo = tamanhoElitismo;

      this.id_grade = id_grade;

      for (let sala of salas) {
        this.salas.push(new Sala_AG(sala.id));
      }

      for (let restricao of restricoesHorarioPorDiaPeriodo) {
        this.restricoesHorarioPorDiaPeriodo.push(new RestricaoHorarioPorDiaPeriodo_AG(
          restricao.fk_horario,
          restricao.fk_periodo)
        )
      }

      const restricoesHorarioPorDiaPeriodoAux = clone(this.restricoesHorarioPorDiaPeriodo);
      for (let horario of horariosPorDia) {
        const restricoes: number[] = [];

        for (let i = 0; i < restricoesHorarioPorDiaPeriodoAux.length; i = i + 1) {
          if (restricoesHorarioPorDiaPeriodoAux[i].id_horario === horario.id) {
            restricoes.push(restricoesHorarioPorDiaPeriodoAux[i].id_periodo);
            restricoesHorarioPorDiaPeriodoAux.splice(i,1);
            i = i - 1;
          }
        }
        
        this.horarios.push(new Horario_AG(horario.id,horario.qtde_aulas_simultaneas, restricoes))
      }

      for (let restricao of restricoesMateriaSala) {
        this.restricoesMateriaSala.push(new RestricaoMateriaSala_AG(
          restricao.fk_materia,
          restricao.fk_sala)
        )
      }

      const restricoesMateriaSalaAux = clone(restricoesMateriaSala);
      for (let materia of materias) {
        this.materias.push(new Materia_AG(materia.id, materia.quantidade_aulas, materia.fk_periodo, materia.fk_professor))

        const restricoesSala: number[] = [];
        for (let i = 0; i < restricoesMateriaSalaAux.length; i = i + 1) {
          if (restricoesMateriaSalaAux[i].fk_materia === materia.id) {
            restricoesSala.push(restricoesMateriaSalaAux[i].fk_sala);
            restricoesMateriaSalaAux.splice(i,1);
            i = i - 1;
          }
        }

        const restricoesHorarioProfessor: number[] = [];
        for (let i = 0; i < restricoesProfessorHorarioPorDia.length; i = i + 1) {
          if (restricoesProfessorHorarioPorDia[i].fk_professor === materia.fk_professor) {
            restricoesHorarioProfessor.push(restricoesProfessorHorarioPorDia[i].fk_horario_por_dia);
          }
        }
        
        const aulasAux: Aula_AG [] = [];
        for (let i = 0; i < materia.quantidade_aulas; i = i + 1) {
          aulasAux.push(new Aula_AG(materia.id, materia.fk_periodo, materia.fk_professor, restricoesSala, restricoesHorarioProfessor))
          this.qtdeAulas = this.qtdeAulas + 1;
        }

        let aulasPorPeriodo = this.aulas.get(materia.fk_periodo);
        if (!aulasPorPeriodo) {
          aulasPorPeriodo = []
        }

        this.aulas.set(materia.fk_periodo, aulasPorPeriodo.concat(aulasAux))
      }

      for (let restricao of restricoesProfessorHorarioPorDia) {
        this.restricoesProfessorHorarioPorDia.push(new RestricaoProfessorHorarioPorDia_AG(
          restricao.fk_professor,
          restricao.fk_horario_por_dia)
        )
      }

      for (let restricao of restricoesSalaHorarioPorDia) {
        this.restricoesSalaHorarioPorDia.push(new RestricaoSalaHorarioPorDia_AG(
          restricao.fk_sala,
          restricao.fk_horario_por_dia)
        )
      }
      
      this.gerarPopulacaoInicial();
  }

  private gerarPopulacaoInicial() {
    while (this.populacao.length < this.tamanhoPopulacao) {
      const cromossomo = new Cromossomo_AG(
        this.horarios, 
        this.salas,  
        this.restricoesSalaHorarioPorDia,
        this.aulas
      );
      cromossomo.calcularAptidao(
        this.qtdeAulas*2
      );
      this.populacao.push(cromossomo);
    }
  }

  private torneio(): ResultadoTorneio_AG {
    const populacaoCopia = clone(this.populacao);
    let participantesTorneio: Cromossomo_AG [] = [];

    for (let i = 0; i < populacaoCopia.length; i = i + 1) {
      const posicao = Math.floor(Math.random() * populacaoCopia.length);
      const copia = populacaoCopia[posicao];
      populacaoCopia[posicao] = populacaoCopia[i];
      populacaoCopia[i] = copia;
    }

    for (let i = 0; i < this.tamanhoTorneio; i = i + 1) {
      const posicao = Math.floor(Math.random() * populacaoCopia.length);
      participantesTorneio.push(populacaoCopia[posicao]);
      populacaoCopia.splice(posicao,1);
    }

    participantesTorneio.sort(function(elementA, elementB) {
      return elementB.aptidao - elementA.aptidao;
    })

    return new ResultadoTorneio_AG(participantesTorneio[0], participantesTorneio[1]);
  }

  public gerarHorario(): Cromossomo_AG {
    this.populacao.sort(function(elementA, elementB) {
      return elementB.aptidao - elementA.aptidao;
    })
    let z = 0;
    for (this.numeroGeracoesExecutadas = 0; 
      this.numeroGeracoesExecutadas < this.numeroGeracoes; 
      this.numeroGeracoesExecutadas = this.numeroGeracoesExecutadas + 1
    ) {
      let filhos: Cromossomo_AG [] = [];

      const melhorCromossomo = clone(this.populacao[0]);
      melhorCromossomo.mutacao();
      melhorCromossomo.calcularAptidao(
        this.qtdeAulas*2
      );
      if (melhorCromossomo.aptidao > this.populacao[0].aptidao) {
        z = z + 1;
        this.populacao[0] = melhorCromossomo;
      }

      if (this.elitismo) {
        for (let x = 0; x < this.tamanhoElitismo; x = x + 1) {
          filhos.push(this.populacao[x])
        }
      }

      while (filhos.length < this.populacao.length) {
        let cromossomo1: Cromossomo_AG;
        let cromossomo2: Cromossomo_AG;

        const resultadoTorneio = this.torneio();

        cromossomo1 = resultadoTorneio.cromossomo1;
        cromossomo2 = resultadoTorneio.cromossomo2;

        const taxaSorteada = Math.random();

        let filho1: Cromossomo_AG;
        let filho2: Cromossomo_AG;
        if (taxaSorteada <= this.taxaCruzamento) {
          const resultadoCrossOver = Cromossomo_AG.crossOverUniforme(
            cromossomo1,
            cromossomo2,
            this.materias
          );

          filho1 = resultadoCrossOver.filho1;
          filho2 = resultadoCrossOver.filho2;
          
          filho1.calcularAptidao(
            this.qtdeAulas*2
          );

          filho2.calcularAptidao(
            this.qtdeAulas*2
          );
        } else {
          filho1 = clone(cromossomo1);
          filho2 = clone(cromossomo2);
        }

        if (Math.random() < this.taxaMutacao) {
          filho1.mutacao();
        }
        if (Math.random() < this.taxaMutacao) {
          filho2.mutacao();
        }
        
        filho1.calcularAptidao(
          this.qtdeAulas*2
        );

        filho2.calcularAptidao(
          this.qtdeAulas*2
        );

        if ((filhos.length - this.populacao.length) >= 2) {
          filhos.push(filho1);
          filhos.push(filho2);
        } else {
          const numeroSorteio = Math.floor(Math.random() * 2);
          if(numeroSorteio == 0)
          {
            filhos.push(filho1)
          }
          else if(numeroSorteio == 1)
          {
            filhos.push(filho2)
          }
        }
      }
      this.populacao = filhos.slice();

      this.populacao.sort(function(elementA, elementB) {
        return elementB.aptidao - elementA.aptidao;
      })
      
      console.log("GERACAO: "+this.numeroGeracoesExecutadas)
      console.log("MELHOR GERACAO: "+ this.populacao[0].aptidao)
      console.log("AJUDA: "+z)
      console.log("PORCENTAGEM: "+((this.populacao[0].aptidao/(this.qtdeAulas*3))*100)+"%")
      console.log("-------------------------------------------------------------------")

      if (this.populacao[0].aptidao === this.qtdeAulas*3) {
        break;
      }
    }

    console.log("DATA INICIO: "+ this.dataInicio);
    console.log("DATA TERMINO: "+ new Date);

    return this.populacao[0]
  }
}