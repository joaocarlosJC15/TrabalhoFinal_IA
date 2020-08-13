import { Sala, deserializeSala } from "../sala";

export interface RestricaoMateriaSala {
  fk_materia: number;
  fk_sala: number;
  sala?: Sala;
}

export function deserializeRestricaoMateriaSala(data: any): RestricaoMateriaSala {
  return {
    fk_materia: data['restricoes_materias_salas_fk_materia'],
    fk_sala: data['restricoes_materias_salas_fk_sala'],
    sala: deserializeSala(data)
  };
}