import { PipeTransform } from '@angular/core';

export interface ColumnDatatable {
  name: string;
  prop: string;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  flexGrow?: number;
  canAutoResize?: boolean;
  sortable?: boolean;
  resizeable?: boolean;
  draggable?: boolean;
  headerClass?: string|Function;
  cellClass?: string|Function;
  pipe?: PipeTransform;
}