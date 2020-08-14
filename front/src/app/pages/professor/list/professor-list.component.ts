import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'app/shared/services/professor.service';
import { Router } from '@angular/router';

import { Professor } from 'app/shared/models/Professor.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';

@Component({
    selector: 'professor-list-cmp',
    templateUrl: 'professor-list.component.html'
})

export class ProfessorListComponent implements OnInit{

  rows: Professor[];
  columns: ColumnDatatable[] = [
      {name: 'ID', prop: 'id', maxWidth: 100},
      {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 200},
      {name: 'Descrição', prop: 'descricao', minWidth: 200, maxWidth: 200},
      {name: 'Data nascimento', prop: 'data_nascimento', minWidth: 200, maxWidth: 200},
      {name: 'Email', prop: 'email', minWidth: 200}
  ];

  constructor(
    public professorService: ProfessorService,
    public router: Router
  ) {
  }

  ngOnInit(){
    this.professorService.list().subscribe(professores => {
      this.rows = professores;
    });
  }

  doubleClick(professor: Professor) {
    this.router.navigate(['professores/'+professor.id+'/editar']);
  }
}
