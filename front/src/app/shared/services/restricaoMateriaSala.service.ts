import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { RestricaoMateriaSala } from '../models/restricaoMateriaSala.model';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root'
})

export class RestricaoMateriaSalaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  add(id_materia: number, id_sala: number):Observable<RestricaoMateriaSala> {
    return this.http.post(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoesmateriasala', {
        fk_materia: id_materia,
        fk_sala: id_sala
    })
    .pipe(
      map((data: any) => {
        return this.responseDataToRestricaoMateriaSala(data);
      })
    );
  }

  get(id_materia: number):Observable<RestricaoMateriaSala[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/restricoesmateriasala' + '/' + id_materia)
    .pipe(
      map((data: any[]) => {
        const restricoes: RestricaoMateriaSala[] = [];

        for (let restricao of data) {
          restricoes.push(this.responseDataToRestricaoMateriaSala(restricao));
        }

        return restricoes;
      })
    );
  }

  responseDataToRestricaoMateriaSala(data: any): RestricaoMateriaSala {
    const sala = Sala.deserialize(data.sala);
    const restricao = RestricaoMateriaSala.deserialize(data);
   
    restricao.sala = sala
    
    return restricao;
  }
}