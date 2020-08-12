import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { backEndAcess } from 'environments/backEnd';

import { GradeService } from './grade.service';
import { HorarioGerado } from '../models/horarioGerado.model';
import { Sala } from '../models/sala.model';
import { HorarioPorDia } from '../models/horarioPorDia.model';
import { Professor } from '../models/professor.model';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})

export class HorarioGeradoService {
  url = backEndAcess.url;

  constructor(private http: HttpClient, private gradeService: GradeService) {}

  list(id_resultado: number):Observable<HorarioGerado[]> {
    return this.http.get(this.url + '/' +  'grades' + '/' + 
      this.gradeService.getIdGradeOnStorage() + '/resultadosalgoritmogenetico' + '/' + 
      id_resultado + '/horariosgerados'
    )
    .pipe(
      map((data: any[]) => {
        const horarios: HorarioGerado[] = [];

        for (const element of data) {
          horarios.push(this.responseDataToHorarioGerado(element));
        }
        return horarios;
      })
    );
  }

  responseDataToHorarioGerado(data: any): HorarioGerado {
    const sala = Sala.deserialize(data.sala);
    const horarioPorDia = HorarioPorDia.deserialize(data.horarioPorDia);
    const professor = Professor.deserialize(data.materia.professor);
    const materia = Materia.deserialize(data.materia);

    materia.professor = professor;

    const horarioGerado = HorarioGerado.deserialize(data);
    horarioGerado.materia = materia;
    horarioGerado.horarioPorDia = horarioPorDia;
    horarioGerado.sala = sala;

    return horarioGerado;
  }
}