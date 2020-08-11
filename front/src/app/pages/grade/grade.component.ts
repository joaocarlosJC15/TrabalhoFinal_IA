import { Component, OnInit } from '@angular/core';
import { GradeService } from 'app/shared/services/grade.service';
import { ColumnDatatable } from 'app/shared/models/columnDatatable';
import { Grade } from 'app/shared/models/grade.model';

@Component({
  selector: 'grade-cmp',
  templateUrl: 'grade.component.html'
})

export class GradeComponent implements OnInit{

  rows: Grade[];
  columns: ColumnDatatable[] = [
    {name: 'ID', prop: 'id', maxWidth: 100},
    {name: 'Nome', prop: 'nome'}
  ];

  constructor(private gradeService: GradeService) {}

  ngOnInit(){
    this.gradeService.list().subscribe(result => {
      this.rows = result;
    });
  }

  doubleClick(grade: Grade) {
    this.gradeService.setIdGradeOnStorage(grade.id);
  }
}
