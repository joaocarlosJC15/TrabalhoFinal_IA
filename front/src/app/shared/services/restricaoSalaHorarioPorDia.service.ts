import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { RestricaoSalaHorarioPorDia } from '../models/restricaoSalaHorarioPorDia.model';
import { Sala } from '../models/sala.model';
import { HorarioPorDia } from '../models/horarioPorDia.model';

@Injectable({
  providedIn: 'root'
})

export class RestricaoSalaHorarioPorDiaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(id_sala: number, id_horario: number):Observable<RestricaoSalaHorarioPorDia> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoessalahorariopordia', {
        fk_sala: id_sala,
        fk_horario_por_dia: id_horario
    })
    .pipe(
      map((data: any) => {
        return this.responseDataToRestricaoSalaHorarioPorDia(data);
      })
    );
  }

  get(id_sala: number):Observable<RestricaoSalaHorarioPorDia[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoessalahorariopordia' + '/' + id_sala)
    .pipe(
      map((data: any[]) => {
        const restricoes: RestricaoSalaHorarioPorDia[] = [];

        for (let restricao of data) {
          restricoes.push(this.responseDataToRestricaoSalaHorarioPorDia(restricao));
        }

        return restricoes;
      })
    );
  }

  responseDataToRestricaoSalaHorarioPorDia(data: any): RestricaoSalaHorarioPorDia {
    const horario = HorarioPorDia.deserialize(data.horario);
    const restricao = RestricaoSalaHorarioPorDia.deserialize(data);
   
    restricao.horario = horario
    
    return restricao;
  }
}