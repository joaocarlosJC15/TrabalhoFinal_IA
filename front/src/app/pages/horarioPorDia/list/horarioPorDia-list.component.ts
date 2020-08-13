import { Component, OnInit } from '@angular/core';
import { HorarioPorDiaService } from 'app/shared/services/horarioPorDia.service';

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

  horariosPorDia: HorarioPorDiaDiaSemana[];
  columns: ColumnDatatable[] = [
    { name: 'Horário início', prop: 'horario_inicio', minWidth: 150, maxWidth: 150},
    { name: 'Horário término', prop: 'horario_termino', minWidth: 150, maxWidth: 150},
    { name: 'Qtde aulas simultâneas', prop: 'qtde_aulas_simultaneas', minWidth: 250, maxWidth: 250}
  ];


  constructor(
    public horarioPorDiaService: HorarioPorDiaService,
    private diaSemanaService: DiaSemanaService) {
  }

  ngOnInit(){
    this.horarioPorDiaService.list().subscribe(horarios => {
      this.diaSemanaService.list().toPromise()
      .then(diasSemana => {
        this.horariosPorDia = this.generateHorarios(horarios, diasSemana);
      })
    });
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
