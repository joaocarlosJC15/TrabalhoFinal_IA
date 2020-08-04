import clone from 'clone';

import { Cromossomo_AG } from "./models/Cromossomo_AG";
import { RestricaoHorarioPorDiaPeriodo_AG } from './models/restricoes/RestricaoHorarioPorDiaPeriodo_AG';
import { RestricaoMateriaSala_AG } from './models/restricoes/RestricaoMateriaSala_AG';
import { RestricaoProfessorHorarioPorDia_AG } from './models/restricoes/RestricaoProfessorHorarioPorDia_AG';
import { RestricaoSalaHorarioPorDia_AG } from './models/restricoes/RestricaoSalaHorarioPorDia_AG';
import { Horario_AG } from "./models/Horario_AG";
import { Sala_AG } from "./models/Sala_AG";
import { Materia_AG } from "./models/Materia_AG";
import { Aula_AG } from "./models/Aula_AG";
import { ResultadoTorneio_AG } from './models/ResultadoTorneio_AG';

import { HorarioPorDia } from '../interfaces/HorarioPorDia';
import { Materia } from '../interfaces/Materia';
import { Sala } from '../interfaces/Sala';
import { RestricaoHorarioPorDiaPeriodo } from "../interfaces/restricoes/RestricaoHorarioPorDiaPeriodo";
import { RestricaoMateriaSala } from "../interfaces/restricoes/RestricaoMateriaSala";
import { RestricaoProfessorHorarioPorDia } from "../interfaces/restricoes/RestricaoProfessorHorarioPorDia";
import { RestricaoSalaHorarioPorDia } from "../interfaces/restricoes/RestricaoSalaHorarioPorDia";

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
    restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia []
    ) {
      
      this.tamanhoPopulacao = tamanhoPopulacao;
      this.numeroGeracoes = numeroGeracoes;
      this.tamanhoTorneio = tamanhoTorneio;
      this.taxaCruzamento = taxaCruzamento;
      this.taxaMutacao = taxaMutacao;
      this.elitismo = elitismo;
      this.tamanhoElitismo = tamanhoElitismo;

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
      this.gerarHorario();
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

  public gerarHorario() {
    this.populacao.sort(function(elementA, elementB) {
      return elementB.aptidao - elementA.aptidao;
    })
    let z = 0;
    for (let i = 0; i < this.numeroGeracoes; i = i + 1) {
      let filhos: Cromossomo_AG [] = [];

      if (this.elitismo) {
        for (let i = 0; i < this.tamanhoElitismo; i = i + 1) {
          filhos.push(this.populacao[i])
        }
      }

      const melhorCromossomo = clone(this.populacao[0]);
      melhorCromossomo.mutacao();
      melhorCromossomo.calcularAptidao(
        this.qtdeAulas*2
      );
      if (melhorCromossomo.aptidao > this.populacao[0].aptidao) {
        z = z + 1;
        this.populacao[0] = melhorCromossomo;
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

      console.log("GERACAO: "+i)
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
  }
}