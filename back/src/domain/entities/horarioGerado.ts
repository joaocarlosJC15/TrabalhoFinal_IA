import { Sala, deserializeSala } from "./sala";
import { Materia, deserializeMateria } from "./materia";
import { HorarioPorDia, deserializeHorarioPorDia } from "./horarioPorDia";

export interface HorarioGerado {
  fk_resultado_algoritmo_genetico: number;
  fk_horario_por_dia: number;
  fk_sala: number;
  fk_materia: number;
  horarioPorDia: HorarioPorDia;
  sala: Sala;
  materia: Materia;
}

export function deserializeHorarioGerado(data: any): HorarioGerado {
  return {
    fk_resultado_algoritmo_genetico: data['horarios_gerados_fk_resultado_algoritmo_genetico'],
    fk_horario_por_dia: data['horarios_gerados_fk_horario_por_dia'],
    fk_sala: data['horarios_gerados_fk_sala'],
    fk_materia: data['horarios_gerados_fk_materia'],
    horarioPorDia: deserializeHorarioPorDia(data),
    sala: deserializeSala(data),
    materia: deserializeMateria(data)
  };
}