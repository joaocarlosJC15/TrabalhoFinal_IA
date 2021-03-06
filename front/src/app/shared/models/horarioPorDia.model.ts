import { Professor } from './professor.model';
import { Periodo } from './periodo.model';

export class HorarioPorDia {
  constructor(
    public id: number,
    public horario_inicio: string,
    public horario_termino: string,
    public fk_dia_semana: number,
    public qtde_aulas_simultaneas?: number,
  ) {

  }

  static deserialize(data: any): HorarioPorDia {
    const id = data.id;
    const horario_inicio = data.horario_inicio;
    const horario_termino = data.horario_termino;
    const qtde_aulas_simultaneas = data.qtde_aulas_simultaneas
    const fk_dia_semana = data.fk_dia_semana;

    return new HorarioPorDia(
      id, 
      horario_inicio,
      horario_termino,
      fk_dia_semana,
      qtde_aulas_simultaneas
    );
  }
}