import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { Grade } from '../models/grade.model';
@Injectable({
  providedIn: 'root'
})

export class GradeService {
  url = backEndAcess.url;

  constructor(private http: HttpClient) {}

  setIdGradeOnStorage(id_grade: number): void {
    localStorage.setItem('id_grade', id_grade.toString());
  }

  getIdGradeOnStorage(): Number {
    const id_grade = localStorage.getItem('id_grade');

    if (id_grade && Number(id_grade)) {
      return new Number(id_grade);
    } else {
      return null;
    }
  }

  list():Observable<Grade[]> {
    return this.http.get(this.url + '/' + 'grades').pipe(
      map((data: any[]) => {
        
        const grades: Grade[] = []
        for (const element of data) {
          grades.push(this.responseDataToGrade(element));
        }

        return grades;
      })
    );
  }

  responseDataToGrade(data: any): Grade {
    return Grade.deserialize(data);
  }
}