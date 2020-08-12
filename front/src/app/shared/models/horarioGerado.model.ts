import { HorarioPorDia } from './horarioPorDia.model';
import { Sala } from './sala.model';
import { Materia } from './materia.model';

export class HorarioGerado {
  constructor(
    public fk_resultado_algoritmo_genetico: number,
    public fk_horario_por_dia: number,
    public fk_sala: number,
    public fk_materia: number,
    public horarioPorDia?: HorarioPorDia,
    public sala?: Sala,
    public materia?: Materia
  ) {

  }

  static deserialize(data: any): HorarioGerado {
    const fk_resultado_algoritmo_genetico = data.fk_resultado_algoritmo_genetico;
    const fk_horario_por_dia = data.fk_horario_por_dia;
    const fk_sala = data.fk_sala;
    const fk_materia = data.fk_materia;

    return new HorarioGerado(
      fk_resultado_algoritmo_genetico,
      fk_horario_por_dia,
      fk_sala,
      fk_materia
    );
  }
}