import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { DiaSemana } from '../models/diaSemana.model';
@Injectable({
  providedIn: 'root'
})

export class DiaSemanaService {
  url = backEndAcess.url;

  constructor(private http: HttpClient) {}

  list():Observable<DiaSemana[]> {
    return this.http.get(this.url + '/' + 'diassemana').pipe(
      map((data: any[]) => {
        
        const dias: DiaSemana[] = []
        for (const element of data) {
          dias.push(this.responseDataToDiaSemana(element));
        }

        return dias;
      })
    );
  }

  responseDataToDiaSemana(data: any): DiaSemana {
    return DiaSemana.deserialize(data);
  }
}