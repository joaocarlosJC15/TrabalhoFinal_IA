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
import { Materia } from '../../interfaces/Materia';
import { ValidacaoQuantidadeAulas } from './ValidacaoQuantidadeAulas_AG';

export class Cromossomo_AG{
  public aptidao: number = 0;
  public horarios: Horario_AG [] = [];

  constructor(
    horarios: Horario_AG [],
    salas: Sala_AG [], 
    restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia_AG [],
    aulas?: Aula_AG []
  ) {
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
       
        let horarioAux = clone(horario);
        horarioAux.salas = salasAux;

        if (aulas) {
          const aulasAux = clone(aulas);
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

  public static crossOverUniforme(
    cromossomo1: Cromossomo_AG, 
    cromossomo2: Cromossomo_AG
  ): ResultadoCrossOver_AG {
    const cromossomo1Aux = clone(cromossomo1);
    const cromossomo2Aux = clone(cromossomo2);

    const filho1 = clone(cromossomo1);
    const filho2 = clone(cromossomo2);

    
  
    for (let i = 0; i < cromossomo1Aux.horarios.length; i = i + 1) { 
      filho1.horarios[i].qtde_aulas_simultaneas = 0;
      filho2.horarios[i].qtde_aulas_simultaneas = 0;
     
      for(let j = 0; j < cromossomo1Aux.horarios[i].salas.length; j = j + 1) {
        const numeroSorteio = Math.floor(Math.random() * 2);

        let filho1Aula: Aula_AG;
        let filho2Aula: Aula_AG;

        if (numeroSorteio == 0) {
          filho1Aula = cromossomo1Aux.horarios[i].salas[j].aula!;
          filho2Aula =  cromossomo2Aux.horarios[i].salas[j].aula!;  
        }
        else {
          filho1Aula = cromossomo2Aux.horarios[i].salas[j].aula!;
          filho2Aula =  cromossomo1Aux.horarios[i].salas[j].aula!; 
        }

        if (filho1Aula && filho1.horarios[i].qtde_aulas_simultaneas >= filho1.horarios[i].max_qtde_aulas_simultaneas) {
          
          if (filho2Aula) {
            filho2.horarios[i].qtde_aulas_simultaneas++
          }
          filho2.horarios[i].salas[j].aula = filho2Aula
          filho1.horarios[i].salas[j].aula = undefined;

          let index: number;
          do {
            index = Math.floor(Math.random() * filho2.horarios[i].salas.length);
          } while(filho2.horarios[i].salas[index].aula || index >= j);

          if (filho1Aula) {
            filho2.horarios[i].qtde_aulas_simultaneas++
          }
          filho2.horarios[i].salas[index].aula = filho1Aula;
          
        } else if (filho2Aula && filho2.horarios[i].qtde_aulas_simultaneas >= filho2.horarios[i].max_qtde_aulas_simultaneas) {

          if (filho1Aula) {
            filho1.horarios[i].qtde_aulas_simultaneas++
          }
          filho1.horarios[i].salas[j].aula = filho1Aula
          filho2.horarios[i].salas[j].aula = undefined;
          
          let index: number;
          do {
            index = Math.floor(Math.random() * filho1.horarios[i].salas.length);
          } while(filho1.horarios[i].salas[index].aula || index >= j);

          if (filho2Aula) {
            filho1.horarios[i].qtde_aulas_simultaneas++;
          }
          filho1.horarios[i].salas[index].aula = filho2Aula;

        } else {
          filho1.horarios[i].salas[j].aula = filho1Aula;
          if (filho1Aula) {
            filho1.horarios[i].qtde_aulas_simultaneas++;
          }
  
          filho2.horarios[i].salas[j].aula = filho2Aula
          if (filho2Aula) {
            filho2.horarios[i].qtde_aulas_simultaneas++;
          }
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