import { Sala } from "./sala";
import { Materia } from "./materia";

export interface HorarioGerado {
  fk_resultado_algoritmo_genetico: number;
  fk_horario_por_dia: number;
  fk_sala: number;
  fk_materia: number;
  sala: Sala;
  materia: Materia;
}