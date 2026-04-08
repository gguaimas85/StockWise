import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Stock } from '@app/models/stock.model';
import { StockService } from '@app/services/stock.service';

@Component({
  selector: 'app-stock-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-modal.html',
  styleUrl: './stock-modal.css',
})
export class StockModal {
  @Input() isVisible: boolean = true;
  @Output() close = new EventEmitter<boolean>();
  @Input() detailProductStock: Stock | null = null;
  loading = signal(false);
  resultMessage = signal<string>('');

  ID_PRODUCTO: number = 0;
  CANTIDAD_DEPOSITO: number = 0;
  CANTIDAD_SUCURSAL: number = 0;

  constructor(private _stockService: StockService, private cdRef: ChangeDetectorRef) {}

  createProductStock() {
    if (this.ID_PRODUCTO) {
      const createdStock = {
        ID: 0,
        ID_PRODUCTO: this.ID_PRODUCTO,
        CANTIDAD_DEPOSITO: this.CANTIDAD_DEPOSITO,
        CANTIDAD_SUCURSAL: this.CANTIDAD_SUCURSAL,
      };

      this._stockService.createProductStock(createdStock).subscribe({
        next: (data) => {
          this.resultMessage.set('EXITO');
          this.loading.set(false);
          setTimeout(() => {
            this.ID_PRODUCTO = 0;
            this.CANTIDAD_DEPOSITO = 0;
            this.CANTIDAD_SUCURSAL = 0;
            this.close.emit(true);
            this.isVisible = false;
          }, 2000);
        },
        error: (err) => {
          console.log('Ocurrio un error: ', err);
          this.resultMessage.set('ERROR');
          this.loading.set(false);
          setTimeout(() => {
            this.close.emit(true);
            this.isVisible = false;
          }, 2000);
        },
      });
    } else {
      console.log('Faltan completar datos');
    }
  }

  closeModal(): void {
    this.ID_PRODUCTO = 0;
    this.CANTIDAD_DEPOSITO = 0;
    this.CANTIDAD_SUCURSAL = 0;
    this.resultMessage.set('');

    this.isVisible = false;
    this.close.emit(true);
  }
}
