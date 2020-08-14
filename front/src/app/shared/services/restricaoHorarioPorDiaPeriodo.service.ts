import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { RestricaoHorarioPorDiaPeriodo } from '../models/restricaoHorarioPorDiaPeriodo.model';
import { Sala } from '../models/sala.model';
import { HorarioPorDia } from '../models/horarioPorDia.model';

@Injectable({
  providedIn: 'root'
})

export class RestricaoHorarioPorDiaPeriodoService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(id_periodo: number, id_horario: number):Observable<RestricaoHorarioPorDiaPeriodo> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoeshorariopordiaperiodo', {
        fk_periodo: id_periodo,
        fk_horario: id_horario
    })
    .pipe(
      map((data: any) => {
        return this.responseDataToRestricaoHorarioPorDiaPeriodo(data);
      })
    );
  }

  get(id_periodo: number):Observable<RestricaoHorarioPorDiaPeriodo[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoeshorariopordiaperiodo' + '/' + id_periodo)
    .pipe(
      map((data: any[]) => {
        const restricoes: RestricaoHorarioPorDiaPeriodo[] = [];

        for (let restricao of data) {
          restricoes.push(this.responseDataToRestricaoHorarioPorDiaPeriodo(restricao));
        }

        return restricoes;
      })
    );
  }

  responseDataToRestricaoHorarioPorDiaPeriodo(data: any): RestricaoHorarioPorDiaPeriodo {
    const horario = HorarioPorDia.deserialize(data.horario);
    const restricao = RestricaoHorarioPorDiaPeriodo.deserialize(data);
   
    restricao.horario = horario
    
    return restricao;
  }
}