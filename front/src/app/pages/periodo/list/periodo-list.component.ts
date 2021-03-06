import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { PeriodoService } from 'app/shared/services/periodo.service';

import { Periodo } from 'app/shared/models/periodo.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';

@Component({
    selector: 'periodo-list-cmp',
    templateUrl: 'periodo-list.component.html'
})

export class PeriodoListComponent implements OnInit{

  @Input() selectData: boolean;

  @Output() eventSelectData = new EventEmitter();

  rows: Periodo[];
  columns: ColumnDatatable[] = [
      {name: 'ID', prop: 'id', maxWidth: 100},
      {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 300},
      {name: 'Descrição', prop: 'descricao', minWidth: 300}
  ];

  constructor(
    public periodoService: PeriodoService,
    public router: Router
  ) {
  }

  ngOnInit(){
    this.periodoService.list().subscribe(periodos => {
      this.rows = periodos;
    });
  }

  doubleClick(periodo: Periodo) {
    if (this.selectData) {
      this.eventSelectData.emit(periodo);
    } else {
      this.router.navigate(['periodos/'+periodo.id+'/editar']);
    }
  }
}
