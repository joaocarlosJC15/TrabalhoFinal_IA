import { Periodo } from './periodo.model';
import { HorarioGeradoDiaSemana } from './horarioGeradoDiaSemana.model';

export class HorarioGeradoPeriodo {
  constructor(
    public periodo: Periodo,
    public horariosGeradosDiaSemana: HorarioGeradoDiaSemana[]
  ) {
  }
}