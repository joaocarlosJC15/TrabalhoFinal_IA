import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GradeService } from 'app/shared/services/grade.service';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { Grade } from 'app/shared/models/grade.model';

@Component({
  selector: 'grade-list-cmp',
  templateUrl: 'grade-list.component.html'
})

export class GradeListComponent implements OnInit{

  rows: Grade[];
  columns: ColumnDatatable[] = [
    {name: 'ID', prop: 'id', maxWidth: 100},
    {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 300},
    {name: 'Descrição', prop: 'descricao', minWidth: 300}
  ];

  constructor(
    private gradeService: GradeService,
    public router: Router
  ) {}

  ngOnInit(){
    this.gradeService.list().subscribe(result => {
      this.rows = result;
    });
  }

  doubleClick(grade: Grade) {
    this.gradeService.setIdGradeOnStorage(grade.id);
  }
}
