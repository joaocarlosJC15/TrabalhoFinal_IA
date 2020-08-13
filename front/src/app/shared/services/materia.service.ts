import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { Materia } from '../models/materia.model';
import { Professor } from '../models/professor.model';
import { Periodo } from '../models/periodo.model';

@Injectable({
  providedIn: 'root'
})

export class MateriaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  list():Observable<Materia[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'materias')
    .pipe(
      map((data: any[]) => {
        
        const materias: Materia[] = []
        for (const element of data) {
          materias.push(this.responseDataToMateria(element));
        }
        
        return materias;
      })
    );
  }

  responseDataToMateria(data: any): Materia {
    const professor = Professor.deserialize(data.professor);
    const periodo = Periodo.deserialize(data.periodo);
    const materia = Materia.deserialize(data);
   
    materia.professor = professor;
    materia.periodo = periodo;
    
    return materia;
  }
}