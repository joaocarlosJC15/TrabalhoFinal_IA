import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DiaSemanaService } from 'app/shared/services/diaSemana.service';
import { PeriodoService } from 'app/shared/services/periodo.service';
import { HorarioGeradoService } from 'app/shared/services/horarioGerado.service';

import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';

import { DiaSemana } from 'app/shared/models/diaSemana.model';
import { Periodo } from 'app/shared/models/periodo.model';
import { HorarioGerado } from 'app/shared/models/horarioGerado.model';
import { HorarioGeradoPeriodo } from 'app/shared/models/horariosGeradoPeriodo.model';
import { HorarioGeradoDiaSemana } from 'app/shared/models/horarioGeradoDiaSemana.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';

@Component({
  selector: 'horario-cmp',
  templateUrl: 'horario.component.html'
})

export class HorarioComponent implements OnInit{

  horariosGeradosPeriodos: HorarioGeradoPeriodo[] = []

  columns: ColumnDatatable[] = [
    { name: 'Horário início', prop: 'horarioPorDia.horario_inicio', minWidth: 150, maxWidth: 150, pipe: this.formatTimePipe},
    { name: 'Horário término', prop: 'horarioPorDia.horario_termino', minWidth: 150, maxWidth: 150, pipe: this.formatTimePipe},
    { name: 'Matéria', prop: 'materia.nome', minWidth: 200, maxWidth: 200},
    { name: 'Professor', prop: 'materia.professor.nome', minWidth: 150, maxWidth: 150},
    { name: 'Sala', prop: 'sala.nome', minWidth: 100}
  ];

  constructor(
    private route: ActivatedRoute,
    private diaSemanaService: DiaSemanaService,
    private periodoService: PeriodoService,
    private horarioGeradoService: HorarioGeradoService,
    private formatTimePipe: FormatTimePipe
  ) {}

  ngOnInit(){
    this.route.params.subscribe(params => {
      let id_resultado: number;
      let diasSemana: DiaSemana[];
      let periodos: Periodo[];
      let horariosGerados: HorarioGerado[];

      id_resultado = params['id_resultado'];
      
      this.diaSemanaService.list().toPromise()
      .then(result => {
        diasSemana = result;

        return this.periodoService.list().toPromise();
      })
      .then(result => {
        periodos = result;

        return this.horarioGeradoService.list(id_resultado).toPromise();
      })
      .then(result => {
        horariosGerados = result;

        this.horariosGeradosPeriodos = this.generateHorarios(diasSemana, periodos, horariosGerados);
      })
    });
  }

  generateHorarios(diasSemana: DiaSemana[], periodos: Periodo[], horariosGerados: HorarioGerado[]): HorarioGeradoPeriodo[] {
    const horariosGeradosPeriodos: HorarioGeradoPeriodo[] = []
    for (const periodo of periodos) {
      const horariosDiaSemana: HorarioGeradoDiaSemana[] = []
      for (const diaSemana of diasSemana) {
        const horarioDiaSemana = new HorarioGeradoDiaSemana(diaSemana);
        horarioDiaSemana.setHorariosGeradosByPeriodo(horariosGerados,periodo.id);
        
        horariosDiaSemana.push(horarioDiaSemana);
      }
      horariosGeradosPeriodos.push(new HorarioGeradoPeriodo(periodo, horariosDiaSemana));
    }
    return horariosGeradosPeriodos;
  }
}
