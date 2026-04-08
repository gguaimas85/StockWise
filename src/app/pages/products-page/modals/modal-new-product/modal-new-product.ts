import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../../../services/products.service';
import { ProductDB } from '@app/models/productDB.model';

@Component({
  selector: 'app-modal-new-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-new-product.html',
  styleUrl: './modal-new-product.css',
})
export class ModalNewProduct {
  // Input que indica si se debe mostrar o no el modal por parte del componente padre
  @Input() isVisible: boolean = true;
  // Output para notificar al componente padre que se debe cerrar
  @Output() close = new EventEmitter<boolean>();
  @Input() detailProduct: ProductDB | undefined;

  nombre: string = '';
  categoria: string = '';
  descripcion: string = '';
  precio: number = 0;

  constructor(private _apiProducts: ProductApiService, private cdRef: ChangeDetectorRef) {}

  createProduct() {
    if (this.nombre) {
      const createdProduct = {
        NOMBRE: this.nombre.toUpperCase(),
        CATEGORIA: this.categoria.toUpperCase(),
        DESCRIPCION: this.descripcion.toUpperCase(),
        PRECIO: this.precio == null ? (this.precio = 0) : this.precio,
        ACTIVE: true,
      };

      this._apiProducts.createProductAPI(createdProduct).subscribe({
        next: (data) => {
          this.nombre = '';
          this.categoria = '';
          this.descripcion = '';
          this.precio = 0;

          this.close.emit(true);
          this.isVisible = false;
        },
        error: (error) => {},
      });
    } else {
      console.log('Producto necesita un nombre');
    }
  }

  /**
   * Cierra el modal y emite el evento 'close'.
   */
  closeModal(): void {
    this.nombre = '';
    this.categoria = '';
    this.descripcion = '';
    this.precio = 0;

    this.isVisible = false;
    this.close.emit(true);
  }
}
