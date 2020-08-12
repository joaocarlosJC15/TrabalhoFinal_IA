import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnDatatable } from 'app/shared/models/columnDatatable';

@Component({
    selector: 'datatable-cmp',
    templateUrl: 'datatable.component.html'
})

export class DatatableComponent{
  @Input() rows: any[];
  @Input() columns: ColumnDatatable[];
  @Input() selectionType: string;

  @Output() eventSelectData = new EventEmitter();
  @Output() eventDoubleClick = new EventEmitter();

  rowsSelected: any[] = []

  ngOnInit(){
    
  }
  onSelect() {
    this.eventSelectData.emit(this.rowsSelected[0]);
  }

  doubleClick() {
    this.eventDoubleClick.emit(this.rowsSelected[0]);
    this.rowsSelected = [];
  }
}