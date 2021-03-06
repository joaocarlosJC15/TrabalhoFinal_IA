import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root'
})

export class SalaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(sala: Sala):Observable<Sala> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/salas', sala)
    .pipe(
      map((data) => {
        return this.responseDataToSala(data);
      })
    );
  }

  get(id_sala: number):Observable<Sala> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/salas' + '/' + id_sala)
    .pipe(
      map((data: any[]) => {
        return this.responseDataToSala(data);
      })
    );
  }

  list():Observable<Sala[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/' + 'salas')
    .pipe(
      map((data: any[]) => {
        
        const salas: Sala[] = []
        for (const element of data) {
          salas.push(this.responseDataToSala(element));
        }

        return salas;
      })
    );
  }

  responseDataToSala(data: any): Sala {
    return Sala.deserialize(data);
  }
}