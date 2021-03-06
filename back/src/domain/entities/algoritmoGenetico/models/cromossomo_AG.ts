import clone from 'clone';

import { Horario_AG } from "./horario_AG";
import { Aula_AG } from "./aula_AG";
import { Sala_AG } from "./sala_AG";
import { RestricaoSalaHorarioPorDia_AG } from "./restricoes/restricaoSalaHorarioPorDia_AG";

import { ResultadoCrossOver_AG } from './resultadoCrossover_AG';
import { Materia_AG } from './materia_AG';
import { ValidacaoQuantidadeAulas } from './validacaoQuantidadeAulas_AG';

export class Cromossomo_AG{
  public aptidao: number = 0;
  public horarios: Horario_AG [] = [];

  constructor(
    horarios: Horario_AG [],
    salas: Sala_AG [], 
    restricoesSalaHorarioPorDia: RestricaoSalaHorarioPorDia_AG [],
    aulas: Map<number, Aula_AG []>,
  ) {
    const aulasAux = clone(aulas);

    for (let horario of horarios) {
      const salasAux: Sala_AG [] = [];
      for (let sala of salas) {
        const index = restricoesSalaHorarioPorDia.findIndex(function(element) {
          if(element.id_sala === sala.id && element.id_horario_por_dia === horario.id) {
            return true;
          }
        });

        if (index === -1) {
          const salaAux = new Sala_AG(sala.id);
          salasAux.push(salaAux);
        }
      }
      
      let horarioAux = clone(horario);
      horarioAux.salas = salasAux;

      while (horarioAux.qtde_aulas_simultaneas < horarioAux.max_qtde_aulas_simultaneas) {
        let indexSala: number;
        do {
          indexSala = Math.floor(Math.random() * horarioAux.salas.length);
        } while (horarioAux.salas[indexSala].aula);

        let indexPeriodo: number
        do {
          indexPeriodo =  horarioAux.restricoesHorarioPeriodos[Math.floor(Math.random() * horarioAux.restricoesHorarioPeriodos.length)];
        } while(aulasAux.get(indexPeriodo)?.length === 0 || horarioAux.salas.findIndex(function(element) {
          if (element.aula && element.aula.id_periodo === indexPeriodo) {
            return true;
          }
        }) !== -1)
        
        let indexAula = Math.floor(Math.random() * aulasAux.get(indexPeriodo)!.length);
        
        horarioAux.salas[indexSala].aula = aulasAux.get(indexPeriodo)![indexAula];
        
        aulasAux.get(indexPeriodo)!.splice(indexAula,1);
        
        horarioAux.qtde_aulas_simultaneas = horarioAux.qtde_aulas_simultaneas + 1;
      
      }
    this.horarios.push(horarioAux);
    }
  }

  private static acrescentarAulaSala(
    filho: Cromossomo_AG, 
    validaQtdeMateriasFilho: Map<number, ValidacaoQuantidadeAulas>,
    aulasParaAdicionarFilho: Aula_AG [],
    aulasParaAdicionarOutroFilho: Aula_AG [],
    posicaoHorario: number,
    posicaoSala: number,
    aulaFilho: Aula_AG,
  ): void{
    if (aulaFilho) {
      if (validaQtdeMateriasFilho.get(aulaFilho.id_materia)!.quantidade_aulas >= 
      validaQtdeMateriasFilho.get(aulaFilho.id_materia)!.max_quantidade_aulas
      ) {
        aulasParaAdicionarOutroFilho.push(aulaFilho);
        if (aulasParaAdicionarFilho.length) {
          filho.horarios[posicaoHorario].salas[posicaoSala].aula = aulasParaAdicionarFilho[0];
          filho.horarios[posicaoHorario].qtde_aulas_simultaneas++;

          aulasParaAdicionarFilho.splice(0,1);
        } else {
          filho.horarios[posicaoHorario].salas[posicaoSala].aula = undefined;
        }
        
      } else {
        validaQtdeMateriasFilho.get(aulaFilho.id_materia)!.quantidade_aulas = validaQtdeMateriasFilho.get(aulaFilho.id_materia)!.quantidade_aulas + 1;
        filho.horarios[posicaoHorario].qtde_aulas_simultaneas++
        
        filho.horarios[posicaoHorario].salas[posicaoSala].aula = aulaFilho;
      }
    }
    else {
      filho.horarios[posicaoHorario].salas[posicaoSala].aula = undefined;
    }
  }

  public static crossOverUniforme(
    cromossomo1: Cromossomo_AG, 
    cromossomo2: Cromossomo_AG,
    materias: Materia_AG[]
  ): ResultadoCrossOver_AG {
    const cromossomo1Aux = clone(cromossomo1);
    const cromossomo2Aux = clone(cromossomo2);
    
    const filho1 = clone(cromossomo1);
    const filho2 = clone(cromossomo2);

    const validaQtdeMateriasFilho1: Map<number, ValidacaoQuantidadeAulas> = new Map;
    const validaQtdeMateriasFilho2: Map<number, ValidacaoQuantidadeAulas> = new Map;

    const aulasParaAdicionarFilho1: Aula_AG [] = [];
    const aulasParaAdicionarFilho2: Aula_AG [] = [];

    for (let materia of materias) {
      validaQtdeMateriasFilho1.set(materia.id, new ValidacaoQuantidadeAulas(materia.quantidade_aulas));
      validaQtdeMateriasFilho2.set(materia.id, new ValidacaoQuantidadeAulas(materia.quantidade_aulas));
    }
  
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
          
          this.acrescentarAulaSala(
            filho2,
            validaQtdeMateriasFilho2,
            aulasParaAdicionarFilho2,
            aulasParaAdicionarFilho1,
            i,
            j,
            filho2Aula
          );
          
          let index: number;
          do {
              index = Math.floor(Math.random() * filho2.horarios[i].salas.length);
          } while(filho2.horarios[i].salas[index].aula || index >= j);
          
          this.acrescentarAulaSala(
            filho2,
            validaQtdeMateriasFilho2,
            aulasParaAdicionarFilho2,
            aulasParaAdicionarFilho1,
            i,
            index,
            filho1Aula
          );
          filho1.horarios[i].salas[j].aula = undefined;

        } else if (filho2Aula && filho2.horarios[i].qtde_aulas_simultaneas >= filho2.horarios[i].max_qtde_aulas_simultaneas) {

          this.acrescentarAulaSala(
            filho1,
            validaQtdeMateriasFilho1,
            aulasParaAdicionarFilho1,
            aulasParaAdicionarFilho2,
            i,
            j,
            filho1Aula
          );
          
          let index: number;
          do {
              index = Math.floor(Math.random() * filho1.horarios[i].salas.length);
          } while(filho1.horarios[i].salas[index].aula || index >= j);
       
          this.acrescentarAulaSala(
            filho1,
            validaQtdeMateriasFilho1,
            aulasParaAdicionarFilho1,
            aulasParaAdicionarFilho2,
            i,
            index,
            filho2Aula
          );
          filho2.horarios[i].salas[j].aula = undefined;

        } else {
          this.acrescentarAulaSala(
            filho1,
            validaQtdeMateriasFilho1,
            aulasParaAdicionarFilho1,
            aulasParaAdicionarFilho2,
            i,
            j,
            filho1Aula
          );

          this.acrescentarAulaSala(
            filho2,
            validaQtdeMateriasFilho2,
            aulasParaAdicionarFilho2,
            aulasParaAdicionarFilho1,
            i,
            j,
            filho2Aula
          );
        }
      }
    }

    for (let horario of filho1.horarios) {
      while(horario.qtde_aulas_simultaneas < horario.max_qtde_aulas_simultaneas) {
        let posicaoSala: number;
        do {
          posicaoSala = Math.floor(Math.random() * horario.salas.length);
        } while (horario.salas[posicaoSala].aula);

        horario.salas[posicaoSala].aula = aulasParaAdicionarFilho1[0];
        horario.qtde_aulas_simultaneas = horario.qtde_aulas_simultaneas + 1

        aulasParaAdicionarFilho1.splice(0,1);
      }
    }

    for (let horario of filho2.horarios) {
      while(horario.qtde_aulas_simultaneas < horario.max_qtde_aulas_simultaneas) {
        let posicaoSala: number;
        do {
          posicaoSala = Math.floor(Math.random() * horario.salas.length);
        } while (horario.salas[posicaoSala].aula);

        horario.salas[posicaoSala].aula = aulasParaAdicionarFilho2[0];
        horario.qtde_aulas_simultaneas = horario.qtde_aulas_simultaneas + 1

        aulasParaAdicionarFilho2.splice(0,1);
      }
    }
    
    return new ResultadoCrossOver_AG(filho1, filho2);
  }

  public mutacao() {
    for (let horario of this.horarios) {
      if (!horario.aptidaoCorreta && horario.max_qtde_aulas_simultaneas > 1) {
        let indexSala = horario.salas.findIndex(function(element) {
          if (element.aula && !element.aptidaoCorreta) {
            return true;
          }
        });
        
        if (indexSala === -1) {
          continue;
        }
        
        let opcaoMutacao = Math.floor(Math.random() * 2);
        if (opcaoMutacao == 0) {
          if (horario.salas[indexSala].aula?.restricoesSala.length === 0) {
            continue;
          } else {
            let indexSalaAux:number = -1;
            for (let sala of horario.salas) {
              indexSalaAux = horario.salas[indexSala].aula!.restricoesSala.findIndex(function(id_sala) {
                if (id_sala === sala.id) {
                  return true;
                }
              })

              if (indexSalaAux !== -1) {
                break;
              }
            }

            if (indexSalaAux !== -1) {
              let aulaAux = horario.salas[indexSalaAux].aula;
              horario.salas[indexSalaAux].aula = horario.salas[indexSala].aula;
              horario.salas[indexSala].aula = aulaAux;
            }
          }
        } else if (opcaoMutacao == 1) {
          let indexHorario: number;
          let continuarLoop = true
          do {
            continuarLoop = true;
            indexHorario = Math.floor(Math.random() * this.horarios.length);

            if (horario.salas[indexSala].aula!.restricoesSala.length > 0) {
              let index = this.horarios[indexHorario].salas.findIndex(function(element) {
                if (horario.salas[indexSala].aula!.restricoesSala.findIndex((id_sala) => {
                  if (id_sala === element.id) {
                    return true;
                  }
                }) !== -1) {
                  return true;
                }
              })

              if (index !== -1) {
                continuarLoop = false;
              }
            } else {
              continuarLoop = false;
            }
          } while(this.horarios[indexHorario].id === horario.id ||
            this.horarios[indexHorario].restricoesHorarioPeriodos.findIndex((id_periodo) => {
              if (id_periodo === horario.salas[indexSala].aula?.id_periodo) {
                return true;
              }
            }) === -1 || continuarLoop
          );

          let aulaAux: Aula_AG;
          let indexSalaAux: number;
          if (horario.salas[indexSala].aula!.restricoesSala.length > 0) {
            let indexSalaAleatorio: number
            do {
              indexSalaAleatorio =  horario.salas[indexSala].aula!.restricoesSala[Math.floor(Math.random() * horario.salas[indexSala].aula!.restricoesSala.length)];
              indexSalaAux = this.horarios[indexHorario].salas.findIndex(function(element) {
                if (element.id === indexSalaAleatorio) {
                  return true;
                }
              })
            } while(indexSalaAux === -1);
            
          } else {
            indexSalaAux = Math.floor(Math.random() * this.horarios[indexHorario].salas.length)
          }
          
          aulaAux = this.horarios[indexHorario].salas[indexSalaAux].aula!;
          if (!aulaAux) {
            let indexSalaAux2:number
            do {
              indexSalaAux2 = Math.floor(Math.random() * this.horarios[indexHorario].salas.length);
            } while(this.horarios[indexHorario].salas[indexSalaAux].id === this.horarios[indexHorario].salas[indexSalaAux2].id ||
              !this.horarios[indexHorario].salas[indexSalaAux2].aula);

            aulaAux = this.horarios[indexHorario].salas[indexSalaAux2].aula!;
            this.horarios[indexHorario].salas[indexSalaAux2].aula = undefined;
          }

          this.horarios[indexHorario].salas[indexSalaAux].aula = horario.salas[indexSala].aula;
          horario.salas[indexSala].aula = aulaAux;
        }
      } else {
        continue;
      }
    }
  }

  public calcularAptidao(
    aptidaoInicial: number,
    logs?: boolean
  ) {
    this.aptidao = aptidaoInicial;

    for (let horario of this.horarios) {
      horario.aptidaoCorreta = true;
      for (let sala of horario.salas) {
        if (sala.aula) {

          // Inicio Restricao HorarioPorDiaPeriodo
          const indexRestricaoHorarioPorDiaPeriodo = horario.restricoesHorarioPeriodos.findIndex(function(id_periodo) {
            if( id_periodo === sala.aula?.id_periodo) {
              return true
            }
          })

          if (indexRestricaoHorarioPorDiaPeriodo === -1) {
            if (logs) {
              console.log("Restricao HorarioPorDiaPeriodo - Horario: " + horario.id + " Periodo : " + sala.aula?.id_periodo)
            }
            this.aptidao = this.aptidao - 1;
            horario.aptidaoCorreta = false;
            sala.aptidaoCorreta = false;
            continue;
          }
         
          // Fim Restricao HorarioPorDiaPeriodo

          // Inicio Restricao MateriaSala
          if (sala.aula.restricoesSala.length > 0) {
            const indexRestricaoMateriaSala = sala.aula.restricoesSala.findIndex(function(id_sala) {
              if (id_sala === sala.id) {
                return true;
              }
            })

            if (indexRestricaoMateriaSala === -1) {
              if (logs) {
                console.log("Restricao  MateriaSala - Materia: " + sala.aula?.id_materia + " Sala : " + sala.id)
              }
              this.aptidao = this.aptidao - 1;
              horario.aptidaoCorreta = false;
              sala.aptidaoCorreta = false;
              continue;
            }
          }
          // Fim Restricao MateriaSala

          // Inicio Restricao ProfessorHorarioPorDia
          if (sala.aula.restricoesHorarioProfessor.length > 0) {
            const restricaoProfessorHorarioPorDia = sala.aula.restricoesHorarioProfessor.findIndex(function(id_horario) {
              if (id_horario === horario.id) {
                return true;
              }
            })

            if (restricaoProfessorHorarioPorDia !== -1) {
              if (logs) {
                console.log("Restricao ProfessorHorarioPorDia - Professor: " + sala.aula?.id_professor + " Horario : " + horario.id)
              }
              this.aptidao = this.aptidao - 1;
              horario.aptidaoCorreta = false;
              sala.aptidaoCorreta = false;
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
            horario.aptidaoCorreta = false;
            sala.aptidaoCorreta = false;
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
            horario.aptidaoCorreta = false;
            sala.aptidaoCorreta = false;
            continue;
          }
          // Fim Restricao Materias do mesmo periodo no mesmo horario
          this.aptidao = this.aptidao + 1;
          sala.aptidaoCorreta = true;
        }
      }
    }
  }
}