import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { HorarioPorDia } from '../models/horarioPorDia.model';

@Injectable({
  providedIn: 'root'
})

export class HorarioPorDiaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  list():Observable<HorarioPorDia[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'horariospordia')
    .pipe(
      map((data: any[]) => {
        
        const horarios: HorarioPorDia[] = []
        for (const element of data) {
          horarios.push(this.responseDataToHorarioPorDia(element));
        }

        return horarios;
      })
    );
  }

  responseDataToHorarioPorDia(data: any): HorarioPorDia {
    return HorarioPorDia.deserialize(data);
  }
}