import { HorarioPorDia } from './horarioPorDia.model';

export class RestricaoProfessorHorarioPorDia {
  public fk_professor: number;
  public fk_horario_por_dia: number;
  public horario?: HorarioPorDia;

  constructor(fk_professor: number, fk_horario_por_dia) {
    this.fk_professor = fk_professor;
    this.fk_horario_por_dia = fk_horario_por_dia;
  }

  static deserialize(data: any): RestricaoProfessorHorarioPorDia {
    const fk_professor = data.fk_professor;
    const fk_horario_por_dia = data.fk_horario_por_dia;
  
    return new RestricaoProfessorHorarioPorDia(fk_professor, fk_horario_por_dia);
  }
}