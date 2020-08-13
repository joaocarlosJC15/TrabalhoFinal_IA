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