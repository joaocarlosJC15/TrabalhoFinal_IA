import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { HorarioPorDiaService } from 'app/shared/services/horarioPorDia.service';

import { FormatTimePipe } from 'app/shared/pipes/format-time.pipe';

import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { HorarioPorDiaDiaSemana } from 'app/shared/models/horarioPorDiaDiaSemana';
import { HorarioPorDia } from 'app/shared/models/horarioPorDia.model';
import { DiaSemana } from 'app/shared/models/diaSemana.model';
import { DiaSemanaService } from 'app/shared/services/diaSemana.service';

@Component({
    selector: 'horarioPorDia-list-cmp',
    templateUrl: 'horarioPorDia-list.component.html'
})

export class HorarioPorDiaListComponent implements OnInit{

  @Input() selectData: boolean;

  @Output() eventSelectData = new EventEmitter();

  horariosPorDia: HorarioPorDiaDiaSemana[];
  columns: ColumnDatatable[] = [
    { name: 'ID', prop: 'id', maxWidth: 100},
    { name: 'Horário início', prop: 'horario_inicio', minWidth: 150, maxWidth: 150, pipe: this.formarTimePipe},
    { name: 'Horário término', prop: 'horario_termino', minWidth: 150, maxWidth: 150, pipe: this.formarTimePipe},
    { name: 'Qtde aulas simultâneas', prop: 'qtde_aulas_simultaneas', minWidth: 250, maxWidth: 250}
  ];

  constructor(
    public horarioPorDiaService: HorarioPorDiaService,
    private diaSemanaService: DiaSemanaService,
    public router: Router,
    private formarTimePipe: FormatTimePipe) {
  }

  ngOnInit(){
    this.horarioPorDiaService.list().subscribe(horarios => {
      this.diaSemanaService.list().toPromise()
      .then(diasSemana => {
        this.horariosPorDia = this.generateHorarios(horarios, diasSemana);
      })
    });
  }

  doubleClick(horario: HorarioPorDia) {
    if (this.selectData) {
      this.eventSelectData.emit(horario);
    } else {
      this.router.navigate(['horariospordia/'+horario.id+'/editar']);
    }
  }

  generateHorarios(horariosPorDia: HorarioPorDia[], diasSemana: DiaSemana []): HorarioPorDiaDiaSemana[] {
    const horarios: HorarioPorDiaDiaSemana[] = [];

    for (const dia of diasSemana){
      const horariosPorDiaDiaSemana = new HorarioPorDiaDiaSemana(dia);
      horariosPorDiaDiaSemana.setHorarios(horariosPorDia);
      horarios.push(horariosPorDiaDiaSemana);
    }

    return horarios;
  }
}
