import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { RestricaoProfessorHorarioPorDia } from '../models/restricaoProfessorHorarioPorDia.model';
import { Sala } from '../models/sala.model';
import { HorarioPorDia } from '../models/horarioPorDia.model';

@Injectable({
  providedIn: 'root'
})

export class RestricaoProfessorHorarioPorDiaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(id_professor: number, id_horario: number):Observable<RestricaoProfessorHorarioPorDia> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoesprofessorhorariopordia', {
        fk_professor: id_professor,
        fk_horario_por_dia: id_horario
    })
    .pipe(
      map((data: any) => {
        return this.responseDataToRestricaoProfessorHorarioPorDia(data);
      })
    );
  }

  get(id_professor: number):Observable<RestricaoProfessorHorarioPorDia[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoesprofessorhorariopordia' + '/' + id_professor)
    .pipe(
      map((data: any[]) => {
        const restricoes: RestricaoProfessorHorarioPorDia[] = [];

        for (let restricao of data) {
          restricoes.push(this.responseDataToRestricaoProfessorHorarioPorDia(restricao));
        }

        return restricoes;
      })
    );
  }

  responseDataToRestricaoProfessorHorarioPorDia(data: any): RestricaoProfessorHorarioPorDia {
    const horario = HorarioPorDia.deserialize(data.horario);
    const restricao = RestricaoProfessorHorarioPorDia.deserialize(data);
   
    restricao.horario = horario
    
    return restricao;
  }
}