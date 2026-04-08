import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';

@Component({
  selector: 'app-stock-table',
  imports: [],
  templateUrl: './stock-table.html',
  styleUrl: './stock-table.css',
})
export class StockTable {
  @Input() StockList: Stock[] = [];
  @Output() productStockDeleted = new EventEmitter<number>();
  @Output() updateProductStock = new EventEmitter<Stock>();

  constructor(private _stockService: StockService){}

  actualizarStock(item: Stock) {
    this.updateProductStock.emit(item);
  }

  eliminarStock(id: number) {
    this._stockService.deleteProductStock(id).subscribe({
      next: (data) => {
        console.log('response exitosa al eliminar', data)
        this.productStockDeleted.emit(data.ID);
      }
    })
  }
}
