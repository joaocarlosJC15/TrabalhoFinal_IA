import { HorarioPorDia } from "../../../entities/horarioPorDia";

export interface AddHorarioPorDiaEntity {
  horario_inicio: string;
  horario_termino: string;
  fk_dia_semana: number;
  fk_grade: number;
}

export interface AddHorarioPorDia {
  add(addHorarioPorDiaData: AddHorarioPorDiaEntity): Promise<HorarioPorDia>
}