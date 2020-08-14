import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SalaService } from 'app/shared/services/sala.service';
import { Sala } from 'app/shared/models/sala.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';

@Component({
    selector: 'sala-list-cmp',
    templateUrl: 'sala-list.component.html'
})

export class SalaListComponent implements OnInit{

  @Input() selectData: boolean;

  @Output() eventSelectData = new EventEmitter();

  rows: Sala[];
  columns: ColumnDatatable[] = [
      {name: 'ID', prop: 'id', maxWidth: 100},
      {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 200},
      {name: 'Descrição', prop: 'descricao', minWidth: 300, maxWidth: 300}
  ];

  constructor(
    public salaService: SalaService,
    public router: Router
  ) {
  }

  ngOnInit(){
    this.salaService.list().subscribe(salas => {
      this.rows = salas;
      console.log(salas)
    });
  }

  doubleClick(sala: Sala) {
    if (this.selectData) {
      this.eventSelectData.emit(sala);
    } else {
      this.router.navigate(['salas/'+sala.id+'/editar']);
    }
  }
}
