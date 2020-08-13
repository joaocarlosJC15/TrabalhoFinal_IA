import { DiaSemana } from './diaSemana.model';
import { HorarioPorDia } from './horarioPorDia.model';

export class HorarioPorDiaDiaSemana {
  public diaSemana: DiaSemana;
  public horariosGeradosDiaSemana: HorarioPorDia[] = [];
  constructor(
    diaSemana: DiaSemana
  ) {
    this.diaSemana = diaSemana;
  }

  setHorarios(horarios: HorarioPorDia[]) {
    for (let i = 0; i < horarios.length; i = i + 1) {
      if (horarios[i].fk_dia_semana === this.diaSemana.id) {
        this.horariosGeradosDiaSemana.push(horarios[i]);
        horarios.splice(i,1);
        i = i - 1;
      }
    }

    this.horariosGeradosDiaSemana.sort(function(horarioA, horarioB) {
      const vetorHoraInicioA = horarioA.horario_inicio.split(':');
      const vetorHoraInicioB = horarioB.horario_inicio.split(':');

      const resultadoA = Number(vetorHoraInicioA[0] + vetorHoraInicioA[1]);
      const resultadoB = Number(vetorHoraInicioB[0] + vetorHoraInicioB[1]);

      return resultadoA - resultadoB;
    });
  }
}