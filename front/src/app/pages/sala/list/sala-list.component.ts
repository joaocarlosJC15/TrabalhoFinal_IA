import { Component, OnInit } from '@angular/core';

import { SalaService } from 'app/shared/services/sala.service';
import { Sala } from 'app/shared/models/sala.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';

@Component({
    selector: 'sala-list-cmp',
    templateUrl: 'sala-list.component.html'
})

export class SalaListComponent implements OnInit{

  rows: Sala[];
  columns: ColumnDatatable[] = [
      {name: 'ID', prop: 'id', maxWidth: 100},
      {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 200},
      {name: 'Descrição', prop: 'descricao', minWidth: 300}
  ];

  constructor(public salaService: SalaService) {
  }

  ngOnInit(){
    this.salaService.list().subscribe(salas => {
      this.rows = salas;
    });
  }
}
