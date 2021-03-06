import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { Periodo } from '../models/periodo.model';

@Injectable({
  providedIn: 'root'
})

export class PeriodoService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(periodo: Periodo):Observable<Periodo> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/periodos', periodo)
    .pipe(
      map((data: any) => {
        return this.responseDataToPeriodo(data);
      })
    );
  }

  get(id_periodo: number):Observable<Periodo> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/periodos' + '/' + id_periodo)
    .pipe(
      map((data: any) => {
        return this.responseDataToPeriodo(data);
      })
    );
  }

  list():Observable<Periodo[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'periodos')
    .pipe(
      map((data: any[]) => {
        
        const periodos: Periodo[] = []
        for (const element of data) {
          periodos.push(this.responseDataToPeriodo(element));
        }

        return periodos;
      })
    );
  }

  responseDataToPeriodo(data: any): Periodo {
    return Periodo.deserialize(data);
  }
}