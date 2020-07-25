import clone from 'clone';

import { Horario_AG } from "./Horario_AG";
import { Sala } from "../../interfaces/Sala";
import { Aula_AG } from "./Aula_AG";
import { Sala_AG } from "./Sala_AG";
import { RestricaoSalaHorarioPorDia_AG } from "./restricoes/RestricaoSalaHorarioPorDia_AG";
import { RestricaoProfessorHorarioPorDia_AG } from "./restricoes/RestricaoProfessorHorarioPorDia_AG";
import { RestricaoMateriaSala_AG } from "./restricoes/RestricaoMateriaSala_AG";
import { RestricaoHorarioPorDiaPeriodo_AG } from "./restricoes/RestricaoHorarioPorDiaPeriodo_AG";
import { ResultadoCrossOver_AG } from './ResultadoCrossover_AG';

export class Cromossomo_AG{
  public aptidao: number = 0;
  public horarios: Horario_AG [] = [];

  constructor(
    horarios: Horario_AG [],
    salas: Sala_AG [], 
    aulas: Aula_AG [], 
    restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia_AG []) {

      const aulasAux = clone(aulas);

      for (let horario of horarios) {
        const salasAux: Sala_AG [] = [];
        for (let sala of salas) {
          const index = restricoesSalaHorarioPorDia.findIndex(function(element) {
            if(element.id_sala === sala.id && element.id_horario_por_dia === horario.id) {
              return true;
            }
          });

          if (index == -1) {
            const salaAux = new Sala_AG(sala.id);
            salasAux.push(salaAux);
          }
        }
       
        let horarioAux = new Horario_AG(horario.id,2);
        horarioAux.salas = salasAux;

        while (horarioAux.qtde_aulas_simultaneas < horarioAux.max_qtde_aulas_simultaneas) {
          let indexSala: number;
          do {
            indexSala = Math.floor(Math.random() * horarioAux.salas.length);

          } while (horarioAux.salas[indexSala].aula);

          const indexAula = Math.floor(Math.random() * aulasAux.length);

          horarioAux.salas[indexSala].aula = aulasAux[indexAula];

          aulasAux.splice(indexAula,1);

          horarioAux.qtde_aulas_simultaneas = horarioAux.qtde_aulas_simultaneas + 1;
        }

        this.horarios.push(horarioAux);
      }
      // for(let horario of this.horarios) {
      //   console.log("ID horario: " + horario.id)
      //   console.log("!!")
      //   for (let sala of horario.salas) {
      //     console.log("ID SALA: " + sala.id)
      //     console.log("SALA AULA: "+ sala.aula?.id_materia)
      //     console.log("AULA PERIODO: "+ sala.aula?.id_periodo)
      //     console.log("AULA Professor: "+ sala.aula?.id_professor)
      //     console.log("?????????")
      //   }
      //   console.log("-----------------------------------------------------")
      // }
  }

  public static crossOverUniforme(cromossomo1: Cromossomo_AG, cromossomo2: Cromossomo_AG): ResultadoCrossOver_AG {
    const cromossomo1Aux = clone(cromossomo1)
    const cromossomo2Aux = clone(cromossomo2)

    const filho1 = clone(cromossomo1)
    const filho2 = clone(cromossomo2)

    for (let i = 0; i < cromossomo1Aux.horarios.length; i = i + 1) { 
      filho1.horarios[i].qtde_aulas_simultaneas = 0;
      filho2.horarios[i].qtde_aulas_simultaneas = 0;
      for(let j = 0; j < cromossomo1Aux.horarios[i].salas.length; j = j + 1) {
        const numeroSorteio = Math.floor(Math.random() * 2);

        if (numeroSorteio == 0) {
          filho1.horarios[i].salas[j].aula =  cromossomo1Aux.horarios[i].salas[j].aula;
          filho2.horarios[i].salas[j].aula =  cromossomo2Aux.horarios[i].salas[j].aula;  
        }
        else if (numeroSorteio == 1) {
          filho1.horarios[i].salas[j].aula =  cromossomo2Aux.horarios[i].salas[j].aula;
          filho2.horarios[i].salas[j].aula =  cromossomo1Aux.horarios[i].salas[j].aula;
        }
      }
    }

    return new ResultadoCrossOver_AG(filho1, filho2);
  }

  public mutacao() {
    
  }

  public calcularAptidao(
    aptidaoInicial: number,
    restricoesHorarioPorDiaPeriodo: RestricaoHorarioPorDiaPeriodo_AG [],
    restricoesMateriaSala: RestricaoMateriaSala_AG [],
    restricoesProfessorHorarioPorDia: RestricaoProfessorHorarioPorDia_AG [],
    logs?: boolean
    ) {
    this.aptidao = aptidaoInicial;

    for (let horario of this.horarios) {
      for (let sala of horario.salas) {
        if (sala.aula) {

          // Inicio Restricao HorarioPorDiaPeriodo
          const indexRestricaoHorarioPorDiaPeriodo = restricoesHorarioPorDiaPeriodo.findIndex(function(element) {
            if(element.id_horario === horario.id && element.id_periodo === sala.aula?.id_periodo) {
              return true
            }
          })

          if (indexRestricaoHorarioPorDiaPeriodo === -1) {
            if (logs) {
              console.log("Restricao HorarioPorDiaPeriodo - Horario: " + horario.id + " Periodo : " + sala.aula?.id_periodo)
            }
            this.aptidao = this.aptidao - 1;
            continue;
          }
         
          // Fim Restricao HorarioPorDiaPeriodo

          // Inicio Restricao MateriaSala
          if (restricoesMateriaSala.findIndex(function(element) {
            if (element.id_materia === sala.aula?.id_materia) {
              return true;
            }
          }) != -1) {
            const indexRestricaoMateriaSala = restricoesMateriaSala.findIndex(function(element) {
              if (element.id_materia === sala.aula?.id_materia && element.id_sala === sala.id) {
                return true;
              }
            })

            if (indexRestricaoMateriaSala === -1) {
              if (logs) {
                console.log("Restricao  MateriaSala - Materia: " + sala.aula?.id_materia + " Sala : " + sala.id)
              }
              this.aptidao = this.aptidao - 1;
              continue;
            }
          }
          // Fim Restricao MateriaSala

          // Inicio Restricao ProfessorHorarioPorDia
          if (restricoesProfessorHorarioPorDia.findIndex(function(element) {
            if (element.id_professor === sala.aula?.id_professor) {
              return true;
            }
          }) != -1 ) {
            const restricaoProfessorHorarioPorDia = restricoesProfessorHorarioPorDia.findIndex(function(element) {
              if (element.id_professor === sala.aula?.id_professor && element.id_horario_por_dia === horario.id) {
                return true;
              }
            })

            if (restricaoProfessorHorarioPorDia !== -1) {
              if (logs) {
                console.log("Restricao ProfessorHorarioPorDia - Professor: " + sala.aula?.id_professor + " Horario : " + horario.id)
              }
              this.aptidao = this.aptidao - 1;
              continue;
            }
          }
          // Fim Restricao ProfessorHorarioPorDia

          // Inicio Restricao Materias do mesmo periodo no mesmo horario e
          // professores com aulas no mesmo horário
          const salasAux = clone(horario.salas)

          const indexToRemove = salasAux.findIndex(function(element) {
            if (element.id === sala.id) {
              return true;
            }
          })

          salasAux.splice(indexToRemove,1);
          
          if (salasAux.findIndex(function(element) {
            if (element.aula?.id_periodo === sala.aula?.id_periodo) {
              return true
            }
          }) !== -1) {
            if (logs) {
              console.log("Restricao PeriodoMesmoHorario - Horario: " + horario.id + " Periodo : " + sala.aula?.id_periodo)
            }
            
            this.aptidao = this.aptidao - 1;
            continue;
          }

          if (salasAux.findIndex(function(element) {
            if (element.aula?.id_professor === sala.aula?.id_professor) {
              return true
            }
          }) !== -1) {
            if (logs) {
              console.log("Restricao ProfessorMesmoHorario - Horario: " + horario.id + " Professor : " + sala.aula?.id_professor)
            }
            
            this.aptidao = this.aptidao - 1;
            continue;
          }
          // Fim Restricao Materias do mesmo periodo no mesmo horario
          this.aptidao = this.aptidao + 1;
        }
      }
    }
  }
}