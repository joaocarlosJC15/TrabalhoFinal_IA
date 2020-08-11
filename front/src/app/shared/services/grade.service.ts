import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor() {}

  setIdGradeOnStorage(id_grade: number): void {
    localStorage.setItem('id_grade', id_grade.toString());
  }

  getIdGradeOnStorage(): Number {
    const id_grade = localStorage.getItem('id_grade');

    if (id_grade && new Number(id_grade)) {
      return new Number(id_grade);
    } else {
      return null;
    }
  }
}