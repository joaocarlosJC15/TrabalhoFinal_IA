import clone from 'clone';

import { Horario_AG } from "./Horario_AG";
import { Sala } from "../../interfaces/Sala";
import { Aula_AG } from "./Aula_AG";
import { Sala_AG } from "./Sala_AG";
import { RestricaoSalaHorarioPorDia_AG } from "./restricoes/RestricaoSalaHorarioPorDia_AG";

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
}