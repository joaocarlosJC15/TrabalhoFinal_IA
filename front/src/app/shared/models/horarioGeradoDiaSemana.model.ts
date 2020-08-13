import { DiaSemana } from './diaSemana.model';
import { HorarioGerado } from './horarioGerado.model';

export class HorarioGeradoDiaSemana {
  public diaSemana: DiaSemana;
  public horariosGerados: HorarioGerado[] = [];
  constructor(
    diaSemana: DiaSemana
  ) {
    this.diaSemana = diaSemana;
  }

  public setHorariosGeradosByPeriodo(horariosGerados: HorarioGerado[], id_periodo: number): void {
    for (let i = 0; i < horariosGerados.length; i = i + 1) {
      if (horariosGerados[i].horarioPorDia.fk_dia_semana === this.diaSemana.id &&
        horariosGerados[i].materia.fk_periodo === id_periodo) {
          this.horariosGerados.push(horariosGerados[i]);
          horariosGerados.splice(i,1);
          i = i - 1;
        }
    }

    this.horariosGerados.sort(function(horarioA, horarioB) {
      const vetorHoraInicioA = horarioA.horarioPorDia.horario_inicio.split(':');
      const vetorHoraInicioB = horarioB.horarioPorDia.horario_inicio.split(':');

      const resultadoA = Number(vetorHoraInicioA[0] + vetorHoraInicioA[1]);
      const resultadoB = Number(vetorHoraInicioB[0] + vetorHoraInicioB[1]);

      return resultadoA - resultadoB;
    })
  }
}