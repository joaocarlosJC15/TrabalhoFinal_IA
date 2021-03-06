import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { ResultadoAlgoritmoGenetico } from '../models/resultadoAlgoritmoGenetico.model';

@Injectable({
  providedIn: 'root'
})

export class ResultadoAlgoritmoGeneticoService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  list():Observable<ResultadoAlgoritmoGenetico[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'resultadosalgoritmogenetico')
    .pipe(
      map((data: any[]) => {
        
        const resultados: ResultadoAlgoritmoGenetico[] = []
        for (const element of data) {
          resultados.push(this.responseDataToResultadoAlgoritmoGenetico(element));
        }

        return resultados;
      })
    );
  }

  responseDataToResultadoAlgoritmoGenetico(data: any): ResultadoAlgoritmoGenetico {
    return ResultadoAlgoritmoGenetico.deserialize(data);
  }
}