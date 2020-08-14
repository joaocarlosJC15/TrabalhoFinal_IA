import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { Professor } from '../models/professor.model';

@Injectable({
  providedIn: 'root'
})

export class ProfessorService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  get(id_professor: number):Observable<Professor> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/professores' + '/' + id_professor)
    .pipe(
      map((data: any[]) => {
        return this.responseDataToProfessor(data);
      })
    );
  }

  list():Observable<Professor[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'professores')
    .pipe(
      map((data: any[]) => {
        
        const professores: Professor[] = []
        for (const element of data) {
          professores.push(this.responseDataToProfessor(element));
        }

        return professores;
      })
    );
  }

  responseDataToProfessor(data: any): Professor {
    return Professor.deserialize(data);
  }
}