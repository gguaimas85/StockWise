import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  imports: [],
  templateUrl: './generic-table.html',
  styleUrl: './generic-table.css',
})
export class GenericTable<T> {
  @Input() columns: { key: keyof T; label: string }[] = [];
  //Ejemplo de column
  // stockColumns: {key: keyof Stock; label: string}[] = [
  //   {
  //     key: 'ID',
  //     label: 'ID',
  //   },
  //   {
  //     key: 'ID_PRODUCTO',
  //     label: 'ID_PRODUCTO',
  //   },
  //   {
  //     key: 'CANTIDAD_DEPOSITO',
  //     label: 'CANTIDAD_DEPOSITO',
  //   },
  //   {
  //     key: 'CANTIDAD_SUCURSAL',
  //     label: 'CANTIDAD_SUCURSAL',
  //   },
  // ];
  @Input() rowItems: T[] = [];
}
