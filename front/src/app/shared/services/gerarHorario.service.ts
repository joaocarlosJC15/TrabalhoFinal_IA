import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';

import { GerarHorario } from '../models/gerarHorario.model';

@Injectable({
  providedIn: 'root'
})

export class GerarHorarioService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  generate (params: GerarHorario): Observable<any> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/gerarhorario', params);
  }
}