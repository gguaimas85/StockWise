import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductApiService } from '../../../../services/products.service';
import { ProductDB } from '@app/models/productDB.model';

@Component({
  selector: 'app-modal-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit.html',
  styleUrl: './modal-edit.css',
})
export class ModalEdit {
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

  updateProduct() {
    if (this.detailProduct != undefined) {
      const updatedProduct: ProductDB = {
        ID: this.detailProduct.ID,
        NOMBRE:
          this.nombre == '' || this.nombre == null
            ? this.detailProduct.NOMBRE.toLocaleUpperCase()
            : this.nombre.toUpperCase(),
        CATEGORIA:
          this.categoria == ''
            ? this.detailProduct.CATEGORIA?.toUpperCase() ?? ''
            : this.categoria.toUpperCase(),
        DESCRIPCION:
          this.descripcion == '' || this.nombre == null
            ? this.detailProduct?.DESCRIPCION?.toUpperCase() ?? ''
            : this.descripcion.toUpperCase(),
        PRECIO: this.precio == null ? this.detailProduct.PRECIO : this.precio,
        ACTIVE: this.detailProduct.ACTIVE,
      };

      this._apiProducts.udpateProductAPI(updatedProduct).subscribe({
        next: (data) => {
          this.nombre = '';
          this.categoria = '';
          this.descripcion = '';
          this.precio = 0;

          this.close.emit(true);
          this.isVisible = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
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
